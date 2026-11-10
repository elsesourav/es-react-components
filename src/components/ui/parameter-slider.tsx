"use client";

import React, { useCallback, useId, useRef, useState } from "react";
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
  ticks = 7,
  disabled = false,
  className = "",
}: ParameterSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const id = useId();

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

  const updateFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const thumbWidth = 36;
      const availableWidth = Math.max(1, rect.width - thumbWidth);
      const relativeX = clientX - rect.left - thumbWidth / 2;
      const ratio = Math.min(1, Math.max(0, relativeX / availableWidth));
      const rawValue = min + ratio * (max - min);
      onChange(clampValue(rawValue));
    },
    [min, max, clampValue, onChange, disabled]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
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
      e.currentTarget.releasePointerCapture?.(e.pointerId);
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
      className={cn(
        "group relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-surface border border-border shadow-xs transition-all duration-150 select-none",
        isDragging && "border-primary/50 shadow-sm",
        disabled ? "opacity-50 pointer-events-none" : "hover:border-border-strong",
        className
      )}
    >
      {/* Parameter Label */}
      <label
        htmlFor={id}
        className="text-xs font-medium text-foreground/85 shrink-0 min-w-[70px] truncate cursor-pointer"
      >
        {label}
      </label>

      {/* Scrubber Track & Carriage */}
      <div
        ref={trackRef}
        id={id}
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
        className="relative flex-1 h-7 flex items-center cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-lg px-0.5"
      >
        {/* Subtle Track Background with Vertical Ticks */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-surface-subtle/80 border border-border/40 overflow-hidden flex items-center justify-between px-2">
          {Array.from({ length: ticks }).map((_, i) => (
            <span
              key={i}
              className="w-[1px] h-1.5 bg-border-strong/40 rounded-full"
            />
          ))}
        </div>

        {/* Floating Thumb Carriage with Inner Vertical Notch */}
        <div
          style={{
            left: `calc(${percent * 100}% - ${percent * 36}px)`,
          }}
          className={cn(
            "absolute top-0.5 h-6 w-9 rounded-md bg-surface-elevated border border-border shadow-md flex items-center justify-center transition-transform duration-75",
            isDragging
              ? "scale-105 border-primary shadow-primary/20 cursor-grabbing ring-1 ring-primary/40"
              : "hover:border-border-strong cursor-grab"
          )}
        >
          {/* Inner Notch Indicator Bar */}
          <span
            className={cn(
              "w-0.5 h-3 rounded-full transition-colors",
              isDragging ? "bg-primary" : "bg-muted-foreground/60"
            )}
          />
        </div>
      </div>

      {/* Value Readout */}
      <span className="text-xs font-mono font-bold text-foreground text-right shrink-0 min-w-[50px] tabular-nums">
        {displayVal}
      </span>
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
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "group relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-surface border border-border shadow-xs transition-all duration-150 select-none cursor-pointer",
        disabled ? "opacity-50 pointer-events-none" : "hover:border-border-strong",
        className
      )}
    >
      <span className="text-xs font-medium text-foreground/85 shrink-0 truncate">
        {label}
      </span>

      {/* Pill Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          checked ? "bg-primary" : "bg-surface-subtle border border-border/80"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
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
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "group relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-surface border border-border shadow-xs transition-all duration-150 select-none cursor-pointer",
        disabled ? "opacity-50 pointer-events-none" : "hover:border-border-strong",
        className
      )}
    >
      <span className="text-xs font-medium text-foreground/85 shrink-0 truncate">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {/* Color Preview Swatch */}
        <span
          style={{ backgroundColor: value }}
          className="size-4 rounded-md border border-black/20 shadow-xs shrink-0"
        />

        {/* Hex Text Box */}
        <span className="font-mono text-xs font-semibold text-foreground uppercase px-2 py-0.5 rounded-md bg-surface-subtle border border-border/60">
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
