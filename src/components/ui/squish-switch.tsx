"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const FLOW_SPRING = { stiffness: 320, damping: 40, mass: 0.6 };
const SWELL_SPRING = { stiffness: 520, damping: 34, mass: 0.6 };
const MAX_STRETCH = 0.45;
const STRETCH_SPEED = 600;
const TAP_SLOP = { fine: 4, coarse: 8 };

export const SQUISH_SWITCH_SIZES = {
  sm: { width: 46, height: 24, radius: 12 },
  md: { width: 60, height: 30, radius: 15 },
  lg: { width: 76, height: 38, radius: 19 },
} as const;

export type SquishSwitchSize = keyof typeof SQUISH_SWITCH_SIZES;
export type SquishSwitchVariant = "primary" | "success" | "warning" | "danger" | "neutral";

export interface SquishSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  size?: SquishSwitchSize;
  variant?: SquishSwitchVariant;
  showOnOffText?: boolean;
  onLabel?: string;
  offLabel?: string;
  width?: number;
  height?: number;
  radius?: number;
  speed?: number;
  stretch?: number;
  hoverScale?: number;
  ariaLabel?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

interface GripState {
  id: number;
  grab: number | null;
  moved: boolean;
  startX: number;
  onAtPress: boolean;
  slop: number;
}

export function SquishSwitch({
  checked,
  defaultChecked = false,
  onChange,
  onCheckedChange,
  label,
  description,
  disabled = false,
  size = "md",
  variant = "primary",
  showOnOffText = false,
  onLabel = "ON",
  offLabel = "OFF",
  width: widthProp,
  height: heightProp,
  radius: radiusProp,
  speed = 50,
  stretch = 36,
  hoverScale = 1.04,
  ariaLabel,
  className = "",
  id,
  style,
}: SquishSwitchProps) {
  const sizePreset = SQUISH_SWITCH_SIZES[size] || SQUISH_SWITCH_SIZES.md;
  const width = widthProp ?? sizePreset.width;
  const height = heightProp ?? sizePreset.height;
  const radius = radiusProp ?? sizePreset.radius;

  const reduce = useReducedMotion();
  const inset = Math.max(3, Math.round(height * 0.1));
  const thumb = height - inset * 2;
  const min = inset;
  const max = width - inset - thumb;
  const mid = (min + max) / 2;
  const trackRadius = Math.min(radius, height / 2);
  const thumbRadius = Math.max(2, trackRadius - inset);

  const isControlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const on = isControlled ? Boolean(checked) : inner;
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const grip = useRef<GripState | null>(null);
  const onRef = useRef(on);
  onRef.current = on;
  const skipClick = useRef(false);
  const autoId = useId();
  const buttonId = id ?? autoId;

  const x = useMotionValue(on ? max : min);
  const flow = useSpring(useVelocity(x), FLOW_SPRING);
  const swell = useSpring(1, SWELL_SPRING);
  const gain = reduce ? 0 : clamp(stretch, 0, 100) / 100;

  const stretchOf = (v: number): number =>
    1 + Math.min(MAX_STRETCH, Math.abs(v) / STRETCH_SPEED) * gain;

  const scaleX = useTransform([flow, swell], ([v, h]: number[]) =>
    stretchOf(v ?? 0) * (h ?? 1)
  );
  const scaleY = useTransform([flow, swell], ([v, h]: number[]) =>
    (h ?? 1) / stretchOf(v ?? 0)
  );

  const commit = (next: boolean): void => {
    if (next === onRef.current) return;
    onRef.current = next;
    if (!isControlled) setInner(next);
    onChange?.(next);
    onCheckedChange?.(next);
  };

  useEffect(() => {
    if (dragging) return undefined;
    const target = on ? max : min;
    if (reduce) {
      x.jump(target);
      return undefined;
    }
    const controls = animate(x, target, {
      type: "spring",
      stiffness: 170 - (50 - clamp(speed, 0, 100)) * 1.1,
      damping: 21.5,
      mass: 0.9,
      restDelta: 0.001,
      restSpeed: 0.01,
    });
    return () => controls.stop();
  }, [on, dragging, min, max, speed, reduce, x]);

  const localX = (clientX: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scale = rect.width / (el.offsetWidth || rect.width) || 1;
    return (clientX - rect.left) / scale;
  };

  const down = (e: React.PointerEvent<HTMLButtonElement>): void => {
    if (disabled || grip.current || e.button !== 0) return;
    grip.current = {
      id: e.pointerId,
      grab: null,
      moved: false,
      startX: e.clientX,
      onAtPress: onRef.current,
      slop: e.pointerType === "touch" ? TAP_SLOP.coarse : TAP_SLOP.fine,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    setDragging(true);
  };

  const move = (e: React.PointerEvent<HTMLButtonElement>): void => {
    const g = grip.current;
    if (!g || g.id !== e.pointerId) return;
    const lx = localX(e.clientX);
    if (g.grab === null) {
      g.grab = lx - x.get();
      return;
    }
    if (!g.moved && Math.abs(e.clientX - g.startX) > g.slop) g.moved = true;
    if (!g.moved) return;
    const nx = clamp(lx - g.grab, min, max);
    x.set(nx);
    commit(nx > mid);
  };

  const up = (
    e: { pointerId: number; currentTarget?: HTMLElement | null },
    cancelled: boolean
  ): void => {
    const g = grip.current;
    if (!g || g.id !== e.pointerId) return;
    grip.current = null;
    try {
      if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore */
    }
    if (cancelled) commit(g.onAtPress);
    else if (!g.moved) commit(!onRef.current);
    skipClick.current = true;
    setTimeout(() => {
      skipClick.current = false;
    }, 0);
    setDragging(false);
  };

  const click = (): void => {
    if (skipClick.current) {
      skipClick.current = false;
      return;
    }
    if (!disabled) commit(!onRef.current);
  };

  const variantOnStyles: Record<SquishSwitchVariant, string> = {
    primary: "bg-primary border-primary/90 text-primary-foreground shadow-sm shadow-primary/25",
    success: "bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-600/25",
    warning: "bg-amber-500 border-amber-500 text-black shadow-sm shadow-amber-500/25",
    danger: "bg-rose-600 border-rose-600 text-white shadow-sm shadow-rose-600/25",
    neutral: "bg-foreground border-foreground text-background shadow-sm",
  };

  const variantThumbOnStyles: Record<SquishSwitchVariant, string> = {
    primary: "bg-primary-foreground text-primary",
    success: "bg-white text-emerald-700",
    warning: "bg-black text-amber-500",
    danger: "bg-white text-rose-700",
    neutral: "bg-background text-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-start gap-3 select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={style}
    >
      <div className="relative inline-flex items-center shrink-0 mt-0.5">
        <button
          id={buttonId}
          type="button"
          role="switch"
          aria-checked={on}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
          disabled={disabled}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={(e) => up({ pointerId: e.pointerId, currentTarget: e.currentTarget }, false)}
          onPointerCancel={(e) =>
            up({ pointerId: e.pointerId, currentTarget: e.currentTarget }, true)
          }
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse" && !disabled) swell.set(hoverScale);
          }}
          onPointerLeave={() => swell.set(1)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && grip.current) {
              up({ pointerId: grip.current.id, currentTarget: e.currentTarget }, true);
            }
          }}
          onClick={click}
          className={cn(
            "relative inline-flex items-center justify-center p-0 border outline-none cursor-pointer transition-[border-color,background-color,box-shadow] duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            dragging && "cursor-grabbing",
            on
              ? variantOnStyles[variant]
              : "bg-surface-elevated border-border text-muted-foreground shadow-2xs hover:border-primary/40"
          )}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${trackRadius}px`,
            touchAction: "pan-y",
          }}
        >
          <span
            ref={trackRef}
            className="relative w-full h-full overflow-hidden pointer-events-none"
            style={{ borderRadius: `${trackRadius}px` }}
          >
            {/* Embedded ON / OFF micro labels */}
            {showOnOffText && (
              <>
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold tracking-tight transition-opacity duration-150 pointer-events-none select-none",
                    on ? "opacity-90" : "opacity-0"
                  )}
                >
                  {onLabel}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold tracking-tight transition-opacity duration-150 pointer-events-none select-none text-muted-foreground",
                    !on ? "opacity-90" : "opacity-0"
                  )}
                >
                  {offLabel}
                </span>
              </>
            )}

            {/* Kinetic Squishing Thumb */}
            <motion.span
              className={cn(
                "absolute rounded-full shadow-md transition-colors duration-200 pointer-events-none flex items-center justify-center",
                on
                  ? variantThumbOnStyles[variant]
                  : "bg-foreground/90 text-background dark:bg-foreground dark:text-background"
              )}
              aria-hidden="true"
              style={{
                top: `${inset}px`,
                left: 0,
                width: `${thumb}px`,
                height: `${thumb}px`,
                borderRadius: `${thumbRadius}px`,
                x,
                scaleX,
                scaleY,
              }}
            />
          </span>
        </button>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={buttonId}
              className={cn(
                "text-sm font-medium text-foreground transition-colors cursor-pointer select-none",
                !disabled && "hover:text-primary"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-muted-foreground select-none mt-0.5 leading-relaxed">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export const OnOffSwitch = SquishSwitch;
export default SquishSwitch;
