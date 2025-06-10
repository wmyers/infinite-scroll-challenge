import { RefObject, useEffect, useRef, useState } from 'react';

interface Fetcher {
  (page: number, abortSignal: AbortSignal): Promise<void>;
}

export function useInfiniteScroll(
  fetcher: Fetcher,
  startPage = 1,
): [RefObject<HTMLDivElement | null>, number] {
  const [nextPage, setNextPage] = useState(startPage);
  const observerTargetRef = useRef(null);

  // need separate effect hook for fetcher because of https://stackoverflow.com/a/74479580/4097475
  // and also because it is cleaner
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // NB first page is fetched on the server
    if (nextPage && nextPage !== startPage) {
      fetcher(nextPage, signal);
    }
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
    let observerTargetRefCurrent: HTMLDivElement;
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

  return [observerTargetRef, nextPage];
}
