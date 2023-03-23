import React from 'react';
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export function useCountProducts(query: string) {
  const matches = useMediaQuery(query);

  if (matches) return 10;
  else return 9;
}

export function useCountRelatedProducts(query: string) {
  const matches = useMediaQuery(query);

  if (matches) return 4;
  else return 3;
}

export interface ILocalStore {
  /**
   * Любой локальный store должен реализовывать метод destroy,
   * в котором реализована логика разрушения стора при демонтировании компонента
   */
  destroy(): void;
}

// сделаем функцию дженериком <T>, это значит что она принимает
// функцию creator, которая возвращает что-то типа T и сама
// функция useLocalStore возвращает это что-то типа T
export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  // повторили логику создания из компонента
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};

export const getPageFromQuery = (value: string | null) => {
  return value && !isNaN(+value) ? Math.max(0, +value - 1) : 0;
};

export const getNumberFromQuery = (value: string | null, fallback: number) => {
  return value && !isNaN(+value) ? +value : fallback;
};

export const useOnClickOutside = (ref: any, handler: (event: any) => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
