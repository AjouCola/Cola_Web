import { useRef, useEffect, SetStateAction, Dispatch, RefObject, MutableRefObject } from 'react';

import { useRouter } from 'next/router';

export const useClickOutSide = (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  containerRef: RefObject<HTMLElement>,
): { ref: RefObject<HTMLElement> } => {
  const router = useRouter();

  const elRef = useRef<HTMLElement>(null);

  const handleOutSide = (e: any) => {
    if (containerRef.current?.contains(e.target)) {
      setIsOpen(true);
      return;
    }
    if (elRef?.current && !elRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutSide);
    return () => {
      document.removeEventListener('click', handleOutSide);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return { ref: elRef };
};
