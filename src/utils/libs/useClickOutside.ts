import { useRef, useEffect, SetStateAction, Dispatch, MutableRefObject, RefObject, useState } from 'react';

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { boolean } from 'yup';

// import { sideBarState } from '../store/sidebar';

export const useClickOutSide = (
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  ref: RefObject<HTMLElement>,
  initialValue: boolean,
  containRef: RefObject<HTMLElement>,
): boolean => {
  const router = useRouter();
  const isOpenValue = useRef(initialValue);

  const handleOutSide = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (e.path.includes(containRef.current) || isOpenValue.current) {
        setIsOpen((prev) => {
          isOpenValue.current = !prev;
          return !prev;
        });
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutSide);
    return () => {
      document.removeEventListener('click', handleOutSide);
    };
  }, []);

  useEffect(() => {
    console.log('clicked state', isOpen);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return isOpen;
};
