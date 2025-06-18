import { renderHook, act } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  // Mock IntersectionObserver
  const mockIntersectionObserver = vi.fn();
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup IntersectionObserver mock
    mockIntersectionObserver.mockImplementation(() => {
      return {
        observe: () => {
          mockObserve();
        },
        unobserve: () => {
          mockUnobserve();
        },
        disconnect: () => {
          mockDisconnect();
        },
      };
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should initialize with correct default values', () => {
    const mockFetcher = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll(mockFetcher));

    expect(result.current[0].current).toBeNull(); // observerTargetRef
    expect(result.current[1]).toBe(1); // nextPage
    expect(result.current[2]).toBe(false); // isLoading
    expect(result.current[3]).toBe(false); // isError
  });

  it('should not fetch on initial render', () => {
    const mockFetcher = vi.fn();
    renderHook(() => useInfiniteScroll(mockFetcher));

    expect(mockFetcher).not.toHaveBeenCalled();
  });

  it('should fetch when intersection is observed', async () => {
    const mockFetcher = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useInfiniteScroll(mockFetcher));

    // Simulate intersection
    const [callback] = mockIntersectionObserver.mock.calls[0];
    await act(async () => {
      callback([{ isIntersecting: true }]);
      // Wait for the fetch to complete
      await Promise.resolve();
    });

    expect(mockFetcher).toHaveBeenCalledWith(2, expect.any(AbortSignal));
    expect(result.current[1]).toBe(2); // nextPage should increment
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Fetch failed');
    const mockFetcher = vi.fn().mockRejectedValue(mockError);
    const originalConsoleError = console.error;
    console.error = vi.fn();

    const { result } = renderHook(() => useInfiniteScroll(mockFetcher));

    // Simulate intersection
    const [callback] = mockIntersectionObserver.mock.calls[0];
    await act(async () => {
      callback([{ isIntersecting: true }]);
      // Wait for the fetch to complete
      await Promise.resolve();
    });

    expect(result.current[3]).toBe(true); // isError should be true
    expect(console.error).toHaveBeenCalledWith(
      'Error in infinite scroll fetch:',
      mockError,
    );

    // Restore console.error
    console.error = originalConsoleError;
  });

  it('should handle loading state correctly', async () => {
    const mockFetcher = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );
    const { result } = renderHook(() => useInfiniteScroll(mockFetcher));

    // Simulate intersection
    const [callback] = mockIntersectionObserver.mock.calls[0];

    // Trigger intersection and check loading state
    await act(async () => {
      callback([{ isIntersecting: true }]);
      // Wait for the next tick to allow state updates
      await Promise.resolve();
    });

    // Loading should be true immediately after intersection
    expect(result.current[2]).toBe(true); // isLoading should be true

    // Wait for the fetch to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Loading should be false after fetch completes
    expect(result.current[2]).toBe(false); // isLoading should be false
  });

  it('should abort previous fetch when new fetch starts', async () => {
    const mockAbort = vi.fn();
    const mockFetcher = vi.fn().mockImplementation((_, signal) => {
      signal.addEventListener('abort', mockAbort);
      return new Promise((resolve) => setTimeout(resolve, 100));
    });
    renderHook(() => useInfiniteScroll(mockFetcher));

    // Simulate multiple intersections
    const [callback] = mockIntersectionObserver.mock.calls[0];
    act(() => {
      callback([{ isIntersecting: true }]);
    });
    act(() => {
      callback([{ isIntersecting: true }]);
    });

    // Wait for the fetches to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockAbort).toHaveBeenCalled();
  });

  it('should cleanup observer on unmount', () => {
    const mockFetcher = vi.fn();
    const { result, unmount } = renderHook(() =>
      useInfiniteScroll(mockFetcher),
    );

    // Create a mock element and assign it to the ref
    const mockElement = document.createElement('div');
    result.current[0].current = mockElement;

    // Unmount the hook
    unmount();

    // Verify cleanup was called
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
