"use client";

import React, { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ParameterSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  format?: (value: number) => string;
  ticks?: number;
  disabled?: boolean;
  className?: string;
};

export function ParameterSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  format,
  ticks = 11,
  disabled = false,
  className = "",
}: ParameterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clampValue = useCallback(
    (val: number) => {
      const clamped = Math.min(max, Math.max(min, val));
      const stepped = min + Math.round((clamped - min) / step) * step;
      // Precision rounding to avoid floating point anomalies (e.g. 0.30000000000000004)
      const precision = step.toString().split(".")[1]?.length ?? 0;
      return Number(stepped.toFixed(precision));
    },
    [min, max, step]
  );

  const thumbWidth = 5;
  const inset = 14; // px-3.5 matches padding

  const updateFromPosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current || disabled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availableWidth = Math.max(1, rect.width - 2 * inset);
      const relativeX = clientX - rect.left - inset;
      const ratio = Math.min(1, Math.max(0, relativeX / availableWidth));
      const rawValue = min + ratio * (max - min);
      onChange(clampValue(rawValue));
    },
    [min, max, clampValue, onChange, disabled, inset]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    e.currentTarget.focus({ preventScroll: true });
    setIsDragging(true);
    updateFromPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPosition(e.clientX);
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
      onChange(clampValue(value + step * mult));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(clampValue(value - step * mult));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  const range = max - min || 1;
  const percent = Math.min(1, Math.max(0, (value - min) / range));
  const displayVal = format ? format(value) : `${value}${unit}`;

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={displayVal}
      aria-disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex items-center justify-between h-11 px-3.5 rounded-xl bg-surface border border-border/80 shadow-xs transition-all duration-150 select-none cursor-ew-resize outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 overflow-hidden",
        isDragging && "border-primary/60 shadow-sm ring-1 ring-primary/20",
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:border-border-strong",
        className
      )}
    >
      {/* Layer 1: Ruler Detents / Ticks spanning the WHOLE card width */}
      <div className="absolute inset-x-3.5 inset-y-0 flex items-center justify-between pointer-events-none z-0">
        {Array.from({ length: ticks }).map((_, i) => (
          <span
            key={i}
            className="w-[1px] h-2.5 rounded-full bg-foreground/15 dark:bg-white/12 transition-colors"
          />
        ))}
      </div>

      {/* Layer 2: Labels and Value Overlay */}
      <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
        <span className="text-xs font-medium text-foreground/75 dark:text-zinc-400 truncate max-w-[55%]">
          {label}
        </span>
        <span className="text-xs font-mono font-bold text-foreground dark:text-zinc-100 tabular-nums shrink-0">
          {displayVal}
        </span>
      </div>

      {/* Layer 3: Needle Thumb Indicator Bar travelling across the WHOLE card */}
      <div
        style={{
          left: `calc(${inset}px - ${thumbWidth / 2}px + ${percent} * (100% - ${2 * inset}px))`,
        }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 h-7 w-[5px] rounded-full pointer-events-none z-20 transition-transform duration-75",
          "bg-foreground dark:bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] dark:shadow-[0_0_8px_rgba(255,255,255,0.7)]",
          isDragging && "scale-y-105 shadow-[0_0_12px_rgba(255,255,255,0.85)] dark:shadow-[0_0_14px_rgba(255,255,255,0.95)]"
        )}
      />
    </div>
  );
}

export type ParameterSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function ParameterSwitch({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}: ParameterSwitchProps) {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={checked}
      aria-label={label}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "group relative flex items-center justify-between gap-3 h-11 px-3.5 rounded-xl bg-surface border border-border/80 shadow-xs transition-all duration-150 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:border-border-strong",
        className
      )}
    >
      <span className="text-xs font-medium text-foreground/75 dark:text-zinc-400 shrink-0 truncate">
        {label}
      </span>

      {/* Pill Switch */}
      <span
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out",
          checked ? "bg-primary" : "bg-muted-foreground/30 dark:bg-zinc-700/60"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </span>
    </div>
  );
}

export type ParameterColorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function ParameterColor({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}: ParameterColorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Color ${label}: ${value}`}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "group relative flex items-center justify-between gap-3 h-11 px-3.5 rounded-xl bg-surface border border-border/80 shadow-xs transition-all duration-150 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:border-border-strong",
        className
      )}
    >
      <span className="text-xs font-medium text-foreground/75 dark:text-zinc-400 shrink-0 truncate">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {/* Circular Color Preview Swatch (Matches Image 2) */}
        <span
          style={{ backgroundColor: value }}
          className="size-5 rounded-full border border-black/15 dark:border-white/20 shadow-xs shrink-0 transition-transform group-hover:scale-105"
        />

        {/* Hex Text Pill Badge (Matches Image 2) */}
        <span className="font-mono text-xs font-semibold text-foreground dark:text-zinc-100 uppercase px-2.5 py-0.5 rounded-full bg-surface-subtle border border-border/80 tracking-wide">
          {value}
        </span>

        {/* Hidden Native Picker */}
        <input
          ref={inputRef}
          type="color"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
      </div>
    </div>
  );
}

export type ParameterGridProps = {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

export function ParameterGrid({
  children,
  columns = 3,
  className = "",
}: ParameterGridProps) {
  const colsClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-2.5 w-full", colsClass, className)}>
      {children}
    </div>
  );
}
