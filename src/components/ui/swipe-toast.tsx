'use client';

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { CheckCircle2, AlertCircle, TriangleAlert, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SwipeToastCloseReason = 'timeout' | 'swipe' | 'action' | 'close' | 'escape' | 'programmatic';
export type SwipeToastFuse = 'bottom' | 'top' | 'none';
export type SwipeToastPhase = 'open' | 'closing' | 'gone';
export type SwipeToastType = 'info' | 'success' | 'warning' | 'error';

export interface SwipeToastProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  type?: SwipeToastType;
  actionLabel?: ReactNode;
  onAction?: () => void;
  open?: boolean;
  onClose?: (reason: SwipeToastCloseReason) => void;
  background?: string;
  color?: string;
  fuseColor?: string;
  width?: number;
  radius?: number;
  slideMs?: number;
  settleBounce?: number;
  swipeDistance?: number;
  duration?: number;
  fuse?: SwipeToastFuse;
  pauseOnHover?: boolean;
  closeButton?: boolean;
  inline?: boolean;
  dismissible?: boolean;
  className?: string;
  // Stack and height measurement integration
  isPaused?: boolean;
  onHeightChange?: (height: number) => void;
}

type Sample = [number, number];

interface Drag {
  id: number;
  startY: number;
  grab: number | null;
  moved: boolean;
  hist: Sample[];
}

interface Latest {
  onClose?: (reason: SwipeToastCloseReason) => void;
  onAction?: () => void;
  slideMs: number;
  inline: boolean;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const FLICK = 0.11;
const DEAD_ZONE = 3;
const RESIST_PX = 24;
const COLLAPSE_MS = 200;
const EXIT = 0.7;
const BURN = [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }];
const HAS_STARTING_STYLE = typeof window !== 'undefined' && 'CSSStartingStyleRule' in window;

const rubberband = (over: number, dim: number, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
const velocityOf = (hist: Sample[]) => {
  if (hist.length < 2) return 0;
  const [t0, y0] = hist[0];
  const [t1, y1] = hist[hist.length - 1];
  return performance.now() - t1 > 100 ? 0 : (y1 - y0) / Math.max(1, t1 - t0);
};

export const SwipeToast: React.FC<SwipeToastProps> = ({
  title = 'Notification',
  description = '',
  icon,
  type = 'info',
  actionLabel = '',
  onAction,
  open = true,
  onClose,
  background,
  color,
  fuseColor,
  width = 356,
  radius = 12,
  slideMs = 380,
  settleBounce = 0.2,
  swipeDistance = 40,
  duration = 4000,
  fuse = 'bottom',
  pauseOnHover = true,
  closeButton = true,
  inline = false,
  dismissible = true,
  className = '',
  isPaused = false,
  onHeightChange,
}) => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<SwipeToastPhase>('open');
  const [instant, setInstant] = useState(false);
  const [mounted, setMounted] = useState(HAS_STARTING_STYLE);
  const cardRef = useRef<HTMLDivElement>(null);
  const fuseRef = useRef<HTMLElement>(null);
  const anim = useRef<Animation | null>(null);
  const drag = useRef<Drag | null>(null);
  const flags = useRef({ hover: false, interacting: false, focus: false, hidden: false, paused: false });
  const lastInput = useRef<'pointer' | 'keyboard'>('pointer');
  const pendingClose = useRef<SwipeToastCloseReason | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reason = useRef<SwipeToastCloseReason>('timeout');
  const leaving = useRef(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const latest = useRef<Latest>({} as Latest);
  latest.current = { onClose, onAction, slideMs, inline };

  const y = useMotionValue(0);
  const fade = useMotionValue(1);
  const transform = useTransform(y, (v) => `translateY(${v}px)`);

  const syncFuse = () => {
    const a = anim.current;
    if (!a) return;
    const f = flags.current;
    if (f.hover || f.interacting || f.focus || f.hidden || f.paused) a.pause();
    else if (a.playState === 'paused') a.play();
  };

  const finish = (why: SwipeToastCloseReason) => {
    setPhase('gone');
    leaving.current = false;
    if (latest.current.inline) {
      closeTimer.current = setTimeout(() => latest.current.onClose?.(why), COLLAPSE_MS);
    } else {
      latest.current.onClose?.(why);
    }
  };

  const close = (why: SwipeToastCloseReason) => {
    if (phaseRef.current !== 'open' || leaving.current) return;
    if (drag.current) {
      pendingClose.current = why;
      return;
    }
    anim.current?.pause();
    reason.current = why;
    const now = why === 'escape' || ((why === 'action' || why === 'close') && lastInput.current === 'keyboard');
    setInstant(now);
    setPhase('closing');
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => finish(why), now ? 0 : latest.current.slideMs * EXIT + 60);
  };

  const rescue = () => {
    clearTimeout(closeTimer.current);
    setInstant(false);
    y.set(0);
    fade.set(1);
    setPhase('open');
  };

  useEffect(() => {
    flags.current.paused = isPaused;
    syncFuse();
  }, [isPaused]);

  useEffect(() => {
    if (!open) close('programmatic');
    else if (phaseRef.current !== 'open') rescue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!HAS_STARTING_STYLE) requestAnimationFrame(() => setMounted(true));
  }, []);

  // Measure and report height for stack arithmetic
  useEffect(() => {
    if (!cardRef.current || !onHeightChange) return;
    onHeightChange(cardRef.current.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        if (h > 0) onHeightChange(h);
      }
    });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [onHeightChange, title, description, actionLabel]);

  useEffect(() => {
    if (phase !== 'open' || duration <= 0 || !fuseRef.current) return undefined;
    anim.current?.cancel();
    const a = fuseRef.current.animate(BURN, { duration, easing: 'linear', fill: 'forwards' });
    a.onfinish = () => close('timeout');
    anim.current = a;
    syncFuse();
    return () => {
      a.onfinish = null;
      a.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, duration]);

  useEffect(() => {
    if (!pauseOnHover) {
      flags.current.hover = false;
      syncFuse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseOnHover]);

  useEffect(() => {
    const onVisibility = () => {
      flags.current.hidden = document.hidden;
      syncFuse();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(closeTimer.current);
      anim.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swipeOut = (dy: number, v: number) => {
    anim.current?.pause();
    leaving.current = true;
    pendingClose.current = null;
    if (!reduce && cardRef.current) {
      animate(y, dy + cardRef.current.offsetHeight + 16, {
        type: 'spring',
        duration: 0.3,
        bounce: 0,
        velocity: v * 1000,
      });
    }
    animate(fade, 0, { duration: 0.2, ease: EASE_OUT }).then(() => finish('swipe'));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastInput.current = 'pointer';
    if (
      e.button !== 0 ||
      !dismissible ||
      drag.current ||
      leaving.current ||
      (e.target as HTMLElement).closest('button')
    ) {
      return;
    }
    if (phaseRef.current === 'closing') rescue();
    try {
      cardRef.current?.setPointerCapture(e.pointerId);
    } catch {}
    y.stop();
    drag.current = {
      id: e.pointerId,
      startY: e.clientY,
      grab: null,
      moved: false,
      hist: [[performance.now(), y.get()]],
    };
    flags.current.interacting = true;
    syncFuse();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.grab === null) {
      if (Math.abs(e.clientY - d.startY) < DEAD_ZONE) return;
      d.grab = e.clientY - y.get();
      if (cardRef.current) cardRef.current.dataset.swiping = '';
    }
    const raw = e.clientY - d.grab;
    const next = raw >= 0 ? raw : rubberband(raw, RESIST_PX);
    y.set(next);
    d.moved = true;
    d.hist.push([performance.now(), next]);
    if (d.hist.length > 4) d.hist.shift();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (cardRef.current) delete cardRef.current.dataset.swiping;
    try {
      cardRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    flags.current.interacting = false;
    const dy = y.get();
    const v = velocityOf(d.hist);
    if (dy > 0 && (v > FLICK || (dy >= swipeDistance && v >= 0))) {
      swipeOut(dy, v);
      return;
    }
    if (d.moved) {
      animate(
        y,
        0,
        reduce
          ? { duration: 0.2, ease: EASE_OUT }
          : { type: 'spring', duration: 0.5, bounce: settleBounce, velocity: v * 1000 }
      );
    }
    const queued = pendingClose.current;
    pendingClose.current = null;
    if (queued) close(queued);
    else syncFuse();
  };

  const renderStatusIcon = () => {
    if (icon) {
      return (
        <div className="shrink-0 pt-0.5">
          <span className="inline-flex size-6 flex-none items-center justify-center [&_svg]:size-full" aria-hidden="true">
            {icon}
          </span>
        </div>
      );
    }
    const iconStyle = "size-7 rounded-full flex items-center justify-center border shadow-xs shrink-0 mt-0.5";
    if (type === 'success') {
      return <div className={cn(iconStyle, "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25")}><CheckCircle2 className="size-4 stroke-[2.5]" /></div>;
    }
    if (type === 'error') {
      return <div className={cn(iconStyle, "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25")}><AlertCircle className="size-4 stroke-[2.5]" /></div>;
    }
    if (type === 'warning') {
      return <div className={cn(iconStyle, "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25")}><TriangleAlert className="size-4 stroke-[2.5]" /></div>;
    }
    return <div className={cn(iconStyle, "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25")}><Info className="size-4 stroke-[2.5]" /></div>;
  };

  return (
    <div
      className={cn(
        "group grid w-[min(var(--st-w),100%)] text-[13px] leading-normal [grid-template-rows:1fr]",
        // Standalone fixed positioning when not inline and not stacked
        !inline && "fixed right-6 bottom-[calc(24px+env(safe-area-inset-bottom,0px))] z-[999999] max-sm:right-3 max-sm:left-3 max-sm:w-[calc(100vw-24px)]",
        inline && "data-[mounted=false]:[grid-template-rows:0fr] data-[phase=closing]:[grid-template-rows:0fr] data-[phase=gone]:[grid-template-rows:0fr] [transition:grid-template-rows_var(--st-slide)_cubic-bezier(0.23,1,0.32,1)]",
        className
      )}
      data-phase={phase}
      data-inline={inline ? 'true' : 'false'}
      data-fuse={duration > 0 ? fuse : 'none'}
      data-dismissible={dismissible ? 'true' : 'false'}
      data-instant={instant ? '' : undefined}
      data-mounted={mounted ? 'true' : 'false'}
      style={
        {
          '--st-w': `${width}px`,
          '--st-radius': `${radius}px`,
          '--st-slide': `${slideMs}ms`,
        } as CSSProperties
      }
    >
      <div className="min-h-0">
        <div className="opacity-100 [transform:translateY(0)] [transition:transform_var(--st-slide)_cubic-bezier(0.23,1,0.32,1),opacity_calc(var(--st-slide)*0.6)_ease] starting:opacity-0 starting:[transform:translateY(100%)] group-data-[mounted=false]:opacity-0 group-data-[mounted=false]:[transform:translateY(100%)] group-data-[phase=closing]:opacity-0 group-data-[phase=closing]:[transform:translateY(100%)] group-data-[phase=closing]:[transition:transform_calc(var(--st-slide)*0.7)_cubic-bezier(0.23,1,0.32,1),opacity_calc(var(--st-slide)*0.5)_ease] group-data-[phase=gone]:invisible group-data-[phase=gone]:opacity-0 group-data-[phase=gone]:[transform:translateY(100%)] group-data-[instant]:[transition-duration:0s] motion-reduce:[transform:none]! motion-reduce:[transition:opacity_200ms_ease]">
          <motion.div
            ref={cardRef}
            className={cn(
              "relative flex cursor-grab touch-none items-start gap-3 overflow-hidden p-3.5 sm:p-4 outline-none select-none",
              // Guaranteed solid, 100% opaque surface with crisp micro-depth shadows
              "bg-white dark:bg-[#18181b] border border-border/80 dark:border-border/60 text-foreground",
              "shadow-[0_10px_30px_-5px_rgba(0,0,0,0.14),0_2px_8px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.6),0_4px_12px_-2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]",
              "[-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]",
              "data-[swiping]:cursor-grabbing group-data-[dismissible=false]:cursor-default group-data-[dismissible=false]:touch-auto"
            )}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            style={{
              borderRadius: radius,
              transform,
              opacity: fade,
              ...(background ? { backgroundColor: background } : {}),
              ...(color ? { color } : {}),
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerEnter={(e) => {
              if (pauseOnHover && e.pointerType === 'mouse') {
                flags.current.hover = true;
                syncFuse();
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') {
                flags.current.hover = false;
                syncFuse();
              }
            }}
            onFocus={() => {
              flags.current.focus = true;
              syncFuse();
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                flags.current.focus = false;
                syncFuse();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') lastInput.current = 'keyboard';
              if (e.key === 'Escape' && dismissible) {
                e.stopPropagation();
                close('escape');
              }
            }}
          >
            {renderStatusIcon()}

            <div className="flex min-w-0 flex-auto flex-col gap-0.5">
              <span className="leading-snug font-semibold text-foreground text-[13.5px] select-text">
                {title}
              </span>
              {description ? (
                <span className="leading-relaxed font-normal text-muted-foreground text-xs select-text">
                  {description}
                </span>
              ) : null}
            </div>

            {actionLabel ? (
              <button
                type="button"
                className="h-7 px-2.5 flex-none cursor-pointer touch-manipulation rounded-md border border-border/80 bg-surface hover:bg-surface-subtle text-foreground text-xs font-semibold outline-none transition-all duration-150 active:scale-[0.96] shadow-xs inline-flex items-center justify-center whitespace-nowrap self-center"
                onClick={() => {
                  latest.current.onAction?.();
                  close('action');
                }}
              >
                {actionLabel}
              </button>
            ) : null}

            {closeButton ? (
              <button
                type="button"
                className="size-6 -mr-1 -mt-0.5 flex-none cursor-pointer touch-manipulation place-items-center rounded-md border-0 bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/5 outline-none transition-colors self-start inline-flex items-center justify-center"
                aria-label="Close notification"
                onClick={() => close('close')}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={2.5} />
              </button>
            ) : null}

            {/* Burning Fuse Progress Bar */}
            <i
              ref={fuseRef}
              className={cn(
                "pointer-events-none absolute right-0 bottom-0 left-0 h-[2.5px] origin-left group-data-[fuse=top]:top-0 group-data-[fuse=top]:bottom-auto group-data-[fuse=none]:opacity-0",
                !fuseColor && type === 'success' && "bg-gradient-to-r from-emerald-500 to-emerald-400",
                !fuseColor && type === 'error' && "bg-gradient-to-r from-rose-500 to-rose-400",
                !fuseColor && type === 'warning' && "bg-gradient-to-r from-amber-500 to-amber-400",
                !fuseColor && (!type || type === 'info') && "bg-gradient-to-r from-primary to-primary/80"
              )}
              style={fuseColor ? { background: fuseColor } : undefined}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SwipeToast;
