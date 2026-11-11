/**
 * Centralized, reference-counted document scroll locking utility.
 * Prevents body scroll freeze bugs when multiple modals/sheets/dialogs mount or unmount.
 */

let lockCount = 0;
let previousHtmlOverflow = '';
let previousBodyOverflow = '';
let previousTouchAction = '';
let previousMainOverflow = '';

export function lockScroll(): () => void {
  if (typeof document === 'undefined') return () => {};

  lockCount++;
  if (lockCount === 1) {
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    previousTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const main = document.getElementById('main-scroll-container');
    if (main) {
      previousMainOverflow = main.style.overflow;
      main.style.overflow = 'hidden';
    }
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      const main = document.getElementById('main-scroll-container');
      if (main) {
        main.style.overflow = previousMainOverflow;
      }
    }
  };
}

/**
 * Force-resets any stale scroll locks on document/body.
 */
export function forceUnlockScroll(): void {
  if (typeof document === 'undefined') return;
  lockCount = 0;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.touchAction = '';

  const main = document.getElementById('main-scroll-container');
  if (main) {
    main.style.overflow = '';
  }
}
