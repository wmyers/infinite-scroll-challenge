import { RefObject, useEffect, useRef, useState } from 'react';

interface Fetcher {
  (page: number, abortSignal: AbortSignal): Promise<void>;
}

export function useInfiniteScroll<T extends Element>(
  fetcher: Fetcher,
  startPage = 1,
): [RefObject<T | null>, number, boolean, boolean] {
  const [nextPage, setNextPage] = useState(startPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const observerTargetRef = useRef(null);

  // need separate effect hook for fetcher because of https://stackoverflow.com/a/74479580/4097475

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      // NB first page is fetched on the server
      if (nextPage && nextPage !== startPage) {
        try {
          setIsLoading(true);
          setIsError(false);
          await fetcher(nextPage, signal);
          setIsLoading(false);
        } catch (error) {
          console.error('Error in infinite scroll fetch:', error);
          setIsError(true);
        }
      }
    };

    void fetchData();

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [fetcher, nextPage, startPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNextPage((prevPage) => {
            const nextPage = prevPage + 1;
            return nextPage;
          });
        }
      },
      { threshold: 1 },
    );
    let observerTargetRefCurrent: T;
    if (observerTargetRef.current) {
      observerTargetRefCurrent = observerTargetRef.current;
      observer.observe(observerTargetRefCurrent);
    }
    return () => {
      if (observerTargetRefCurrent) {
        observer.unobserve(observerTargetRefCurrent);
      }
    };
  }, [fetcher, observerTargetRef]);

  return [observerTargetRef, nextPage, isLoading, isError];
}
