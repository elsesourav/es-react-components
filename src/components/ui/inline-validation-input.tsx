"use client";

import React, { useId, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface InlineValidationProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  validate?: (value: string) => string | null;
  hint?: string;
  validateOn?: "change" | "blur";
  className?: string;
}

export function InlineValidation({
  label,
  value,
  defaultValue,
  onChange,
  validate,
  hint,
  validateOn = "change",
  className = "",
  disabled,
  id,
  type = "text",
  ...props
}: InlineValidationProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue || "");
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentValue = value !== undefined ? value : uncontrolled;

  const runValidation = (val: string) => {
    if (!validate) return null;
    const err = validate(val);
    setErrorMessage(err);
    return err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (value === undefined) {
      setUncontrolled(next);
    }
    onChange?.(next);
    if (validateOn === "change" && touched) {
      runValidation(next);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    runValidation(currentValue);
    props.onBlur?.(e);
  };

  const isInvalid = touched && Boolean(errorMessage);
  const isValid = touched && !errorMessage && currentValue.length > 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={type}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`h-10 w-full rounded-[var(--radius)] border bg-surface px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-150 disabled:opacity-50 ${
            isInvalid
              ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
              : isValid
                ? "border-success focus:border-success focus:ring-2 focus:ring-success/20"
                : "border-border hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
          }`}
        />

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          {isInvalid && <AlertCircle className="size-4 text-destructive animate-in fade-in" />}
          {isValid && <CheckCircle2 className="size-4 text-success animate-in fade-in" />}
        </div>
      </div>

      {(isInvalid && errorMessage) ? (
        <p className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1 animate-in fade-in">
          {errorMessage}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
