"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ArcadeSliderVariant =
  | "neon-green"
  | "candy-pink"
  | "neon-cyan"
  | "amber-gold"
  | "cyber-purple";

export type ArcadeSliderSize = "sm" | "md" | "lg";
export type ArcadeSliderFillMode = "full" | "progress";

export const ARCADE_SLIDER_COLORS: Record<
  ArcadeSliderVariant,
  { activeBg: string; activeText: string; glow: string }
> = {
  "neon-green": {
    activeBg: "#00e16d",
    activeText: "#00994a",
    glow: "rgba(0, 225, 109, 0.45)",
  },
  "candy-pink": {
    activeBg: "#fb2175",
    activeText: "#d00958",
    glow: "rgba(251, 33, 117, 0.45)",
  },
  "neon-cyan": {
    activeBg: "#00d4ff",
    activeText: "#0088aa",
    glow: "rgba(0, 212, 255, 0.45)",
  },
  "amber-gold": {
    activeBg: "#ffaa00",
    activeText: "#cc7700",
    glow: "rgba(255, 170, 0, 0.45)",
  },
  "cyber-purple": {
    activeBg: "#9933ff",
    activeText: "#6611cc",
    glow: "rgba(153, 51, 255, 0.45)",
  },
};

export const ARCADE_SLIDER_SIZES: Record<
  ArcadeSliderSize,
  {
    height: number;
    thumbWidth: number;
    border: number;
    padding: number;
    fontSize: string;
    sliderWidth: number;
  }
> = {
  sm: {
    height: 32,
    thumbWidth: 26,
    border: 2.5,
    padding: 2,
    fontSize: "text-[10px]",
    sliderWidth: 220,
  },
  md: {
    height: 42,
    thumbWidth: 34,
    border: 3,
    padding: 2.5,
    fontSize: "text-xs",
    sliderWidth: 280,
  },
  lg: {
    height: 52,
    thumbWidth: 44,
    border: 3.5,
    padding: 3,
    fontSize: "text-sm",
    sliderWidth: 360,
  },
};

export interface ArcadeSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: ArcadeSliderSize;
  variant?: ArcadeSliderVariant;
  fillMode?: ArcadeSliderFillMode;
  width?: number | string;
  borderRadius?: number;
  borderPadding?: number;
  showShadow?: boolean;
  showGlow?: boolean;
  showBezel?: boolean;
  showValue?: boolean;
  formatValue?: (val: number) => string;
  disabled?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export const ArcadeSlider: React.FC<ArcadeSliderProps> = ({
  value: controlledValue,
  defaultValue = 82,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  variant = "neon-green",
  fillMode = "progress",
  width,
  borderRadius,
  borderPadding: customPadding,
  showShadow = true,
  showGlow = true,
  showBezel = true,
  showValue = false,
  formatValue,
  disabled = false,
  className,
  id,
  ariaLabel = "Wide Paddle Slider Track",
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const dims = ARCADE_SLIDER_SIZES[size] || ARCADE_SLIDER_SIZES.md;
  const color = ARCADE_SLIDER_COLORS[variant] || ARCADE_SLIDER_COLORS["neon-green"];
  const borderPadding = customPadding ?? dims.padding;
  const borderWidth = showBezel ? dims.border : 1;

  // Exact mathematical centering on Y-axis for ANY borderPadding (even high 5px)
  const innerHeight = dims.height - borderWidth * 2;
  const thumbHeight = Math.max(12, innerHeight - borderPadding * 2);
  const baseInner = dims.height - dims.border * 2 - dims.padding * 2;
  const thumbWidth = Math.round(
    thumbHeight * (dims.thumbWidth / (baseInner > 0 ? baseInner : 32))
  );

  // Concentric radii calculation: R_track = R_outer - B, R_thumb = R_track - P
  const isPill = borderRadius === undefined || borderRadius >= dims.height / 2;
  const outerRadius = isPill ? dims.height / 2 : Math.max(0, borderRadius);
  const trackRadius = isPill
    ? Math.max(0, (dims.height - borderWidth * 2) / 2)
    : Math.max(0, outerRadius - borderWidth);
  const thumbRadius = isPill
    ? Math.max(0, thumbHeight / 2)
    : Math.max(2, trackRadius - borderPadding);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clampAndStep = useCallback(
    (raw: number): number => {
      const clamped = Math.min(max, Math.max(min, raw));
      const stepped = min + Math.round((clamped - min) / step) * step;
      const precision = step.toString().split(".")[1]?.length ?? 0;
      return Number(stepped.toFixed(precision));
    },
    [min, max, step]
  );

  const updateFromPointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const availableDistance = rect.width - thumbWidth - borderPadding * 2;
      if (availableDistance <= 0) return;

      const relativeX = clientX - rect.left - borderPadding - thumbWidth / 2;
      const ratio = Math.min(1, Math.max(0, relativeX / availableDistance));
      const nextValue = clampAndStep(min + ratio * (max - min));

      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [disabled, thumbWidth, borderPadding, min, max, clampAndStep, isControlled, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const mult = e.shiftKey ? 5 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = clampAndStep(value + step * mult);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = clampAndStep(value - step * mult);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    } else if (e.key === "Home") {
      e.preventDefault();
      if (!isControlled) setInternalValue(min);
      onChange?.(min);
    } else if (e.key === "End") {
      e.preventDefault();
      if (!isControlled) setInternalValue(max);
      onChange?.(max);
    }
  };

  const percent = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  const isEngaged = percent > 0;
  const isMaxLock = percent >= 0.99;
  const displayVal = formatValue ? formatValue(value) : `${Math.round(percent * 100)}%`;

  // Sunken background track:
  // In default "progress" mode: background is dark sunken track, not full green.
  // Active glowing fill travels from left to thumb. Only when thumb is at maximum (100%)
  // does the active green fill expand across 100% of the back part ("slide max lock").
  const isFullFill = fillMode === "full";
  const trackBgColor = isFullFill
    ? isEngaged
      ? color.activeBg
      : "hsl(var(--surface-sunken, 240 20% 5%))"
    : "hsl(var(--surface-sunken, 240 20% 5%))";

  return (
    <div
      ref={trackRef}
      id={id}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={displayVal}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{
        width: width ?? "100%",
        maxWidth: typeof width === "number" ? `${width}px` : "100%",
        height: `${dims.height}px`,
        borderRadius: `${outerRadius}px`,
        border: showBezel ? `${borderWidth}px solid #d4d4d8` : "1px solid rgba(255,255,255,0.2)",
        backgroundColor: trackBgColor,
        boxShadow: showShadow
          ? showGlow && isEngaged
            ? `inset 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(0,0,0,0.6), 0 0 16px ${color.glow}`
            : "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(0,0,0,0.6)"
          : undefined,
        touchAction: "none",
      }}
      className={cn(
        "relative flex items-center select-none outline-none cursor-pointer overflow-hidden transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed filter grayscale",
        className
      )}
    >
      {/* Outer Metallic Bevel Specular Gradient */}
      {showBezel && (
        <span
          className="pointer-events-none absolute inset-[-1px] opacity-75 z-20"
          style={{
            borderRadius: `${outerRadius}px`,
            boxShadow: showShadow
              ? "0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8)"
              : undefined,
          }}
        />
      )}

      {/* Sunken Active Glowing Fill Level Track */}
      {!isFullFill && isEngaged && (
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none z-0"
          style={{
            width: isMaxLock
              ? "100%"
              : `calc(${borderPadding}px + ${percent} * (100% - ${thumbWidth + borderPadding * 2}px) + ${thumbWidth / 2}px)`,
            backgroundColor: color.activeBg,
            borderRadius: `${trackRadius}px`,
            boxShadow: showShadow ? "inset 0 2px 4px rgba(0,0,0,0.25)" : undefined,
            transition: isDragging ? "none" : "width 75ms ease-out",
          }}
        />
      )}

      {/* 3D Tactile Sliding Thumb Knob: 100% Subpixel Centered on Y-Axis and X-Axis */}
      <div
        className="absolute pointer-events-none flex items-center justify-center z-10"
        style={{
          top: 0,
          bottom: 0,
          marginTop: "auto",
          marginBottom: "auto",
          left: `calc(${borderPadding}px + ${percent} * (100% - ${thumbWidth + borderPadding * 2}px))`,
          width: `${thumbWidth}px`,
          height: `${thumbHeight}px`,
          borderRadius: `${thumbRadius}px`,
          background: "linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d4d4d8 100%)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: showShadow
            ? isDragging
              ? "0 4px 8px rgba(0,0,0,0.4), 0 2px 3px rgba(0,0,0,0.25), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.2)"
              : "0 2px 5px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.15)"
            : undefined,
          transition: isDragging ? "none" : "left 75ms ease-out, width 75ms ease-out, height 75ms ease-out",
        }}
      >
        {/* Thumb Top Specular Reflection Highlight */}
        <span
          className="pointer-events-none absolute top-0.5 left-1 right-1 h-[38%] opacity-75"
          style={{
            borderRadius: `${thumbRadius}px`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        {/* Optional Embedded Numeric Value */}
        {showValue && (
          <span
            className={cn(
              "font-mono font-bold tracking-tight select-none text-[9px] text-zinc-700",
              dims.fontSize
            )}
          >
            {displayVal}
          </span>
        )}
      </div>
    </div>
  );
};

export default ArcadeSlider;
