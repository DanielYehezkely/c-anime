import { useRef, useCallback } from "react";

export const useDebounce = (func: Function, delay: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]    //*todo - understand this much better ... 
  );
};
