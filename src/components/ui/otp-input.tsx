"use client";

import React, { useEffect, useRef, useState } from "react";

export interface OtpInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  status?: "idle" | "error" | "success";
  errorMessage?: string;
  hint?: string;
  masked?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  status = "idle",
  errorMessage,
  hint,
  masked = false,
  className = "",
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => {
    const initial = (value !== undefined ? value : defaultValue).split("").slice(0, length);
    while (initial.length < length) initial.push("");
    return initial;
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync external controlled value
  useEffect(() => {
    if (value !== undefined) {
      const arr = value.split("").slice(0, length);
      while (arr.length < length) arr.push("");
      setDigits(arr);
    }
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const updateDigit = (index: number, char: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = char;
    setDigits(nextDigits);

    const fullCode = nextDigits.join("");
    onChange?.(fullCode);

    if (fullCode.length === length && nextDigits.every((d) => d !== "")) {
      onComplete?.(fullCode);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1); // Take only the latest entered character
    if (!char) {
      updateDigit(index, "");
      return;
    }

    updateDigit(index, char);

    // Auto advance to next input
    if (index < length - 1 && char) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current is already empty, move to previous and clear it
        e.preventDefault();
        updateDigit(index - 1, "");
        inputRefs.current[index - 1]?.focus();
      } else {
        updateDigit(index, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").trim().slice(0, length);
    if (!pasted) return;

    const nextDigits = [...digits];
    for (let i = 0; i < length; i++) {
      nextDigits[i] = pasted[i] || "";
    }
    setDigits(nextDigits);

    const fullCode = nextDigits.join("");
    onChange?.(fullCode);

    const firstEmptyIndex = nextDigits.findIndex((d) => d === "");
    const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    if (pasted.length === length) {
      onComplete?.(fullCode);
    }
  };

  const isError = status === "error";
  const isSuccess = status === "success";

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`flex items-center gap-2 sm:gap-2.5 ${
          isError ? "animate-shake" : ""
        }`}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type={masked ? "password" : "text"}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`Digit ${i + 1} of ${length}`}
            className={`size-11 sm:size-12 text-center text-lg font-semibold font-mono rounded-[var(--radius)] border bg-surface transition-all duration-150 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed ${
              isError
                ? "border-destructive text-destructive ring-2 ring-destructive/20"
                : isSuccess
                  ? "border-success text-success ring-2 ring-success/20"
                  : "border-border text-foreground hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
            }`}
          />
        ))}
      </div>

      {isError && errorMessage && (
        <p className="text-xs text-destructive font-medium text-center animate-in fade-in">
          {errorMessage}
        </p>
      )}

      {!isError && hint && (
        <p className="text-xs text-muted-foreground text-center">{hint}</p>
      )}
    </div>
  );
}
