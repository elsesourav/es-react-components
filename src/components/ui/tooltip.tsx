"use client";

import React, {
  cloneElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createTooltipStore,
  TooltipGroupContext,
  useDismissOnBlur,
  TooltipGroup,
  type TooltipStore,
  type TooltipTiming,
  type TooltipGroupProps,
} from "./tooltip-store";

export type { TooltipStore, TooltipTiming, TooltipGroupProps };
export { createTooltipStore, TooltipGroupContext, TooltipGroup };

const LEAVE = [0.4, 0, 1, 1] as const;
const RISE = { type: "spring", stiffness: 560, damping: 34, mass: 0.6 } as const;
const WARM = { type: "spring", stiffness: 900, damping: 48, mass: 0.5 } as const;
const GLIDE = { type: "spring", stiffness: 520, damping: 40, mass: 0.75 } as const;
const SWAP = { type: "spring", stiffness: 700, damping: 44, mass: 0.5 } as const;

export type UseTooltipOptions = {
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  skipDelay?: number;
};

export type TooltipTriggerProps = {
  onPointerEnter: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export type UseTooltipReturn = {
  open: boolean;
  warm: boolean;
  skipped: boolean;
  travel: number;
  tooltipId: string;
  seat: string;
  triggerProps: TooltipTriggerProps;
};

function isKeyboardFocus(el: HTMLElement) {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

export function useTooltip({
  disabled = false,
  openDelay = 200,
  closeDelay = 120,
  skipDelay = 400,
}: UseTooltipOptions = {}): UseTooltipReturn {
  const tooltipId = `tt-${useId()}`;
  const group = useContext(TooltipGroupContext);

  const timing = useRef<TooltipTiming>({ openDelay, closeDelay, skipDelay });
  timing.current = { openDelay, closeDelay, skipDelay };

  const solo = useRef<TooltipStore | null>(null);
  if (group === null && solo.current === null) {
    solo.current = createTooltipStore(() => timing.current);
  }
  const store = group ?? (solo.current as TooltipStore);

  useEffect(() => {
    const own = solo.current;
    return () => {
      store.close(tooltipId, true);
      own?.dispose();
    };
  }, [store, tooltipId]);
  useDismissOnBlur(store, group === null);

  const open = useSyncExternalStore(
    store.subscribe,
    () => store.getActive() === tooltipId,
    () => false,
  );
  const warm = useSyncExternalStore(
    store.subscribe,
    store.getWarm,
    () => false,
  );
  const skipped = useSyncExternalStore(
    store.subscribe,
    store.getSkipped,
    () => false,
  );
  const travel = useSyncExternalStore(
    store.subscribe,
    store.getTravel,
    () => 0,
  );

  useEffect(() => {
    if (!disabled) return;
    store.close(tooltipId, true);
  }, [disabled, store, tooltipId]);

  const triggerProps: TooltipTriggerProps = {
    onPointerEnter: (event) => {
      if (!disabled) store.open(tooltipId, false, event.clientX);
    },
    onPointerLeave: () => {
      store.unblock(tooltipId);
      store.close(tooltipId, false);
    },
    onPointerDown: () => store.dismiss(tooltipId),
    onPointerCancel: () => {
      store.unblock(tooltipId);
      store.close(tooltipId, true);
    },
    onFocus: (event) => {
      if (disabled) return;
      if (!isKeyboardFocus(event.currentTarget)) return;
      store.open(tooltipId, true);
    },
    onBlur: () => {
      store.unblock(tooltipId);
      store.close(tooltipId, true);
    },
    onKeyDown: (event) => {
      if (event.key === "Escape") store.dismiss(tooltipId);
    },
  };

  return { open, warm, skipped, travel, tooltipId, seat: store.seat, triggerProps };
}

type TriggerChild = React.ReactElement<
  React.HTMLAttributes<HTMLElement> & { "aria-describedby"?: string }
>;

export type TooltipProps = UseTooltipOptions & {
  label: React.ReactNode;
  children: TriggerChild;
  side?: "top" | "bottom";
  className?: string;
  contentClassName?: string;
};

function chain<E>(
  theirs: ((event: E) => void) | undefined,
  ours: (event: E) => void,
) {
  return (event: E) => {
    theirs?.(event);
    ours(event);
  };
}

export function Tooltip({
  label,
  children,
  side = "top",
  disabled = false,
  openDelay,
  closeDelay,
  skipDelay,
  className = "",
  contentClassName = "",
}: TooltipProps) {
  const { open, skipped, travel, tooltipId, seat, triggerProps } = useTooltip({
    disabled,
    openDelay,
    closeDelay,
    skipDelay,
  });
  const reduced = useReducedMotion();

  const described = [children.props["aria-describedby"], open ? tooltipId : null]
    .filter(Boolean)
    .join(" ");

  const trigger = cloneElement(children, {
    "aria-describedby": described.length > 0 ? described : undefined,
    onPointerEnter: chain(
      children.props.onPointerEnter,
      triggerProps.onPointerEnter,
    ),
    onPointerLeave: chain(
      children.props.onPointerLeave,
      triggerProps.onPointerLeave,
    ),
    onPointerDown: chain(
      children.props.onPointerDown,
      triggerProps.onPointerDown,
    ),
    onPointerCancel: chain(
      children.props.onPointerCancel,
      triggerProps.onPointerCancel,
    ),
    onFocus: chain(children.props.onFocus, triggerProps.onFocus),
    onBlur: chain(children.props.onBlur, triggerProps.onBlur),
    onKeyDown: chain(children.props.onKeyDown, triggerProps.onKeyDown),
  });

  const lift = side === "top" ? 7 : -7;

  return (
    <span className={`relative inline-flex ${className}`}>
      {trigger}

      <span
        aria-hidden={!open}
        className="pointer-events-none absolute left-1/2 z-50 flex w-0 justify-center"
        style={
          side === "top"
            ? { bottom: "calc(100% + 7px)" }
            : { top: "calc(100% + 7px)" }
        }
      >
        <AnimatePresence>
          {open && (
            <motion.span
              role="tooltip"
              id={tooltipId}
              layoutId={reduced ? undefined : seat}
              initial={
                reduced
                  ? false
                  : skipped
                    ? { opacity: 0, scale: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.9, y: lift, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduced
                  ? { opacity: 0, transition: { duration: 0 } }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: lift * 0.35,
                      filter: "blur(2px)",
                      transition: { duration: 0.12, ease: LEAVE },
                    }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { ...(skipped ? WARM : RISE), layout: GLIDE }
              }
              style={{ transformOrigin: side === "top" ? "50% 100%" : "50% 0%" }}
              className={`relative w-max max-w-[240px] shrink-0 overflow-hidden rounded-[calc(var(--radius)-4px)] px-2.5 py-1 text-xs font-medium leading-snug text-foreground shadow-lg ${contentClassName}`}
            >
              <motion.span
                aria-hidden
                layout={!reduced}
                transition={reduced ? { duration: 0 } : GLIDE}
                className="absolute inset-0 rounded-[calc(var(--radius)-4px)] border border-border bg-surface-elevated/95 backdrop-blur-md shadow-md"
              />
              <motion.span
                layout={reduced ? false : "position"}
                initial={
                  reduced
                    ? false
                    : skipped
                      ? { opacity: 0, x: travel * 14, y: 0 }
                      : { opacity: 0, x: 0, y: 9 }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={reduced ? { duration: 0 } : SWAP}
                className="relative block whitespace-nowrap"
              >
                {label}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
