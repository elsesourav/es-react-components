"use client";

import React, { useId, useState } from "react";

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
  invalid?: boolean;
  className?: string;
}

export function FloatingLabelInput({
  label,
  value,
  defaultValue,
  onChange,
  hint,
  invalid = false,
  className = "",
  disabled,
  id,
  type = "text",
  maxLength,
  ...props
}: FloatingLabelInputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue || "");
  const [focused, setFocused] = useState(false);

  const currentValue = value !== undefined ? value : uncontrolled;
  const isFloating = focused || Boolean(currentValue && currentValue.length > 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setUncontrolled(e.target.value);
    }
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative flex min-h-[52px] w-full rounded-[var(--radius)] border transition-all duration-200 ${
          disabled
            ? "border-border/60 bg-surface/50 opacity-60 cursor-not-allowed"
            : invalid
              ? "border-destructive bg-surface focus-within:ring-2 focus-within:ring-destructive/20"
              : focused
                ? "border-primary bg-surface ring-2 ring-primary/20 shadow-sm"
                : "border-border bg-surface hover:border-border-strong shadow-xs"
        }`}
      >
        <input
          {...props}
          id={inputId}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          placeholder=" "
          className="peer block w-full rounded-[var(--radius)] bg-transparent px-3.5 pt-5 pb-1 text-sm text-foreground outline-none transition-colors placeholder:opacity-0 focus:outline-none disabled:cursor-not-allowed"
        />

        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-3.5 transition-all duration-150 ease-out select-none ${
            isFloating
              ? "top-1.5 text-[11px] font-semibold"
              : "top-3.5 text-sm"
          } ${
            invalid
              ? "text-destructive"
              : focused
                ? "text-primary"
                : "text-muted-foreground"
          }`}
        >
          {label}
        </label>

        {maxLength && (
          <span className="absolute bottom-1.5 right-3 font-mono text-[10px] text-muted-foreground">
            {currentValue.length}/{maxLength}
          </span>
        )}
      </div>

      {hint && (
        <p
          className={`mt-1.5 px-0.5 text-xs transition-colors ${
            invalid ? "text-destructive font-medium" : "text-muted-foreground"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
