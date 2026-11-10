import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if current screen viewport width is below a given breakpoint.
 * Defaults to 768px (standard mobile threshold).
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(window.innerWidth < breakpoint);

    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
