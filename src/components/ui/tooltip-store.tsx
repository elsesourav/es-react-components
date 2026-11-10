"use client";

import React, {
  createContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

let groups = 0;

type Timer = ReturnType<typeof setTimeout> | null;

const stop = (t: Timer): Timer => {
  if (t !== null) clearTimeout(t);
  return null;
};

export type TooltipTiming = {
  openDelay: number;
  closeDelay: number;
  skipDelay: number;
};

export type TooltipStore = {
  seat: string;
  subscribe: (fn: () => void) => () => void;
  getActive: () => string | null;
  getWarm: () => boolean;
  getSkipped: () => boolean;
  getTravel: () => number;
  open: (id: string, immediate: boolean, x?: number) => void;
  close: (id: string, immediate: boolean) => void;
  dismiss: (id: string) => void;
  unblock: (id: string) => void;
  reset: () => void;
  dispose: () => void;
};

export function createTooltipStore(getTiming: () => TooltipTiming): TooltipStore {
  const listeners = new Set<() => void>();

  let active: string | null = null;
  let pending: string | null = null;
  let blocked: string | null = null;
  let warm = false;
  let skipped = false;
  let lastX: number | null = null;
  let travel = 0;

  let openTimer: Timer = null;
  let closeTimer: Timer = null;
  let coolTimer: Timer = null;

  const notify = () => {
    for (const fn of listeners) fn();
  };

  const setActive = (next: string | null) => {
    if (active === next) return;
    if (next !== null) {
      skipped = warm;
      warm = true;
    }
    active = next;
    notify();
  };

  const cool = () => {
    coolTimer = stop(coolTimer);
    const { skipDelay } = getTiming();
    if (skipDelay <= 0) {
      if (warm) {
        warm = false;
        notify();
      }
      return;
    }
    coolTimer = setTimeout(() => {
      coolTimer = null;
      warm = false;
      notify();
    }, skipDelay);
  };

  groups += 1;
  const seat = `tooltip-seat-${groups}`;

  return {
    seat,
    subscribe(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    getActive: () => active,
    getWarm: () => warm,
    getSkipped: () => skipped,
    getTravel: () => travel,
    open(id, immediate, x) {
      if (blocked === id) return;
      closeTimer = stop(closeTimer);
      coolTimer = stop(coolTimer);
      if (active === id) {
        openTimer = stop(openTimer);
        pending = null;
        return;
      }
      const arrive = () => {
        travel = lastX !== null && x !== undefined ? Math.sign(x - lastX) : 0;
        lastX = x ?? null;
        setActive(id);
      };
      if (immediate || warm) {
        openTimer = stop(openTimer);
        pending = null;
        arrive();
        return;
      }
      openTimer = stop(openTimer);
      pending = id;
      openTimer = setTimeout(() => {
        openTimer = null;
        pending = null;
        arrive();
      }, getTiming().openDelay);
    },
    close(id, immediate) {
      if (pending === id) {
        openTimer = stop(openTimer);
        pending = null;
      }
      if (active !== id) return;
      closeTimer = stop(closeTimer);
      const finish = () => {
        closeTimer = null;
        setActive(null);
        cool();
      };
      if (immediate || getTiming().closeDelay <= 0) {
        finish();
        return;
      }
      closeTimer = setTimeout(finish, getTiming().closeDelay);
    },
    dismiss(id) {
      blocked = id;
      openTimer = stop(openTimer);
      closeTimer = stop(closeTimer);
      coolTimer = stop(coolTimer);
      pending = null;
      const wasWarm = warm;
      warm = false;
      if (active === id) setActive(null);
      else if (wasWarm) notify();
    },
    unblock(id) {
      if (blocked === id) blocked = null;
    },
    reset() {
      openTimer = stop(openTimer);
      closeTimer = stop(closeTimer);
      coolTimer = stop(coolTimer);
      pending = null;
      blocked = null;
      lastX = null;
      travel = 0;
      const wasWarm = warm;
      warm = false;
      if (active !== null) setActive(null);
      else if (wasWarm) notify();
    },
    dispose() {
      openTimer = stop(openTimer);
      closeTimer = stop(closeTimer);
      coolTimer = stop(coolTimer);
      listeners.clear();
    },
  };
}

export const TooltipGroupContext = createContext<TooltipStore | null>(null);

export function useDismissOnBlur(store: TooltipStore, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const bail = () => store.reset();
    const onVisibility = () => {
      if (document.hidden) store.reset();
    };
    window.addEventListener("blur", bail);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("blur", bail);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [store, enabled]);
}

export type TooltipGroupProps = {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  skipDelay?: number;
  onWarmChange?: (warm: boolean) => void;
  className?: string;
};

export function TooltipGroup({
  children,
  openDelay = 200,
  closeDelay = 120,
  skipDelay = 400,
  onWarmChange,
  className = "",
}: TooltipGroupProps) {
  const timing = useRef<TooltipTiming>({ openDelay, closeDelay, skipDelay });
  timing.current = { openDelay, closeDelay, skipDelay };

  const held = useRef<TooltipStore | null>(null);
  if (held.current === null) {
    held.current = createTooltipStore(() => timing.current);
  }
  const store = held.current;

  const warm = useSyncExternalStore(
    store.subscribe,
    store.getWarm,
    () => false,
  );

  const report = useRef(onWarmChange);
  report.current = onWarmChange;

  useEffect(() => {
    report.current?.(warm);
  }, [warm]);

  useEffect(() => () => store.dispose(), [store]);
  useDismissOnBlur(store, true);

  return (
    <TooltipGroupContext.Provider value={store}>
      {className ? <div className={className}>{children}</div> : children}
    </TooltipGroupContext.Provider>
  );
}
