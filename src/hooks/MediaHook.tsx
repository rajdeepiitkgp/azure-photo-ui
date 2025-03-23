import { useRef, useSyncExternalStore } from 'react';

export const useMediaQuery = (query: string) => {
  const mediaQuery = useRef(
    typeof window !== 'undefined' ? window.matchMedia(query) : null
  );

  return useSyncExternalStore(
    (callback) => {
      if (!mediaQuery.current) return () => {};
      mediaQuery.current.addEventListener('change', callback);
      return () => {
        mediaQuery.current?.removeEventListener('change', callback);
      };
    },
    () => mediaQuery.current?.matches ?? false
  );
};
