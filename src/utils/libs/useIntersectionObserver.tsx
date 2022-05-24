import { RefObject, useState, useEffect } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export default function useIntersectionObserver(
  elRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elRef.current;
    const hasIntersectionObserver = !!window.IntersectionObserver;

    if (!hasIntersectionObserver || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return entry;
}
