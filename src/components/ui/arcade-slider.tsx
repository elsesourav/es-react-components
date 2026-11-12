"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArcadeSwitchVariant,
  ArcadeSwitchSize,
  VARIANT_COLORS,
  ARCADE_SIZES,
  getConcentricRadii,
} from "./arcade-switch-shared";

export type ArcadeSliderVariant = ArcadeSwitchVariant;
export type ArcadeSliderSize = ArcadeSwitchSize;

export interface ArcadeSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: ArcadeSwitchSize;
  variant?: ArcadeSwitchVariant;
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
  defaultValue = 75,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  variant = "neon-green",
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
  ariaLabel = "Arcade Paddle Slider",
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const dims = ARCADE_SIZES[size] || ARCADE_SIZES.md;
  const color = VARIANT_COLORS[variant] || VARIANT_COLORS["neon-green"];
  const borderPadding = customPadding ?? dims.padding;
  const borderWidth = showBezel ? dims.border : 1;

  const { outerRadius, trackRadius, thumbRadius } = getConcentricRadii({
    height: dims.height,
    borderWidth,
    borderPadding,
    customRadius: borderRadius,
  });

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
      const travelDistance = rect.width - dims.thumbWidth;
      if (travelDistance <= 0) return;

      const relativeX = clientX - rect.left - dims.thumbWidth / 2;
      const ratio = Math.min(1, Math.max(0, relativeX / travelDistance));
      const nextValue = clampAndStep(min + ratio * (max - min));

      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [disabled, dims.thumbWidth, min, max, clampAndStep, isControlled, onChange]
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

  const percent = max > min ? (value - min) / (max - min) : 0;
  const displayVal = formatValue ? formatValue(value) : value.toString();

  return (
    <div
      ref={trackRef}
      id={id}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{
        width: width ?? `${dims.sliderWidth}px`,
        height: `${dims.height}px`,
        borderRadius: `${outerRadius}px`,
        padding: `${borderPadding}px`,
        borderWidth: `${borderWidth}px`,
        borderColor: showBezel ? "#c2c2c2" : "transparent",
        backgroundColor: "#1e1e24",
        boxShadow: showShadow
          ? [
              showBezel ? "0 2px 4px rgba(0,0,0,0.3)" : "",
              "inset 0 3px 6px rgba(0,0,0,0.45)",
              "inset 0 1px 2px rgba(0,0,0,0.6)",
              showGlow && percent > 0 ? `0 0 16px ${color.glow}` : "",
            ]
              .filter(Boolean)
              .join(", ")
          : undefined,
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
      {percent > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none transition-all duration-75 z-0"
          style={{
            width: `calc(${borderPadding}px + ${percent} * (100% - ${dims.thumbWidth + borderPadding * 2}px) + ${dims.thumbWidth / 2}px)`,
            backgroundColor: color.activeBg,
            borderRadius: `${trackRadius}px`,
            boxShadow: showShadow ? "inset 0 2px 4px rgba(0,0,0,0.25)" : undefined,
          }}
        />
      )}

      {/* 3D Tactile Sliding Thumb Knob */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center z-10 transition-all duration-75"
        style={{
          top: `${borderPadding}px`,
          left: `calc(${borderPadding}px + ${percent} * (100% - ${dims.thumbWidth + borderPadding * 2}px))`,
          width: `${dims.thumbWidth}px`,
          height: `${dims.thumbHeight}px`,
          borderRadius: `${thumbRadius}px`,
          background: "linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d4d4d8 100%)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: showShadow
            ? isDragging
              ? "0 4px 8px rgba(0,0,0,0.4), 0 2px 3px rgba(0,0,0,0.25), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.2)"
              : "0 2px 5px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.15)"
            : undefined,
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
