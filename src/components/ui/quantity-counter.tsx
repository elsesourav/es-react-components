"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityCounterProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange?: (quantity: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function QuantityCounter({
  value: controlledValue,
  defaultValue = 1,
  min = 1,
  max = 99,
  step = 1,
  unit = "",
  onChange,
  size = "md",
  disabled = false,
  className,
}: QuantityCounterProps) {
  const isControlled = controlledValue !== undefined;
  const [internalQuantity, setInternalQuantity] = useState(defaultValue);
  const currentQuantity = isControlled ? controlledValue : internalQuantity;

  const handleDecrease = () => {
    if (disabled || currentQuantity <= min) return;
    const next = Math.max(min, currentQuantity - step);
    if (!isControlled) {
      setInternalQuantity(next);
    }
    onChange?.(next);
  };

  const handleIncrease = () => {
    if (disabled || currentQuantity >= max) return;
    const next = Math.min(max, currentQuantity + step);
    if (!isControlled) {
      setInternalQuantity(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      handleIncrease();
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      handleDecrease();
    } else if (e.key === "Home") {
      e.preventDefault();
      if (!isControlled) setInternalQuantity(min);
      onChange?.(min);
    } else if (e.key === "End") {
      e.preventDefault();
      if (!isControlled) setInternalQuantity(max);
      onChange?.(max);
    }
  };

  const isAtMin = currentQuantity <= min;
  const isAtMax = currentQuantity >= max;

  const sizeStyles = {
    sm: {
      container: "h-8 px-2 gap-2 text-xs",
      btn: "size-6",
      icon: "size-3",
      val: "min-w-[1.25rem] text-xs",
    },
    md: {
      container: "h-10 px-3 gap-3 text-sm",
      btn: "size-7",
      icon: "size-3.5",
      val: "min-w-[1.5rem] text-sm",
    },
    lg: {
      container: "h-12 px-4 gap-4 text-base",
      btn: "size-8",
      icon: "size-4",
      val: "min-w-[2rem] text-base",
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      role="spinbutton"
      tabIndex={disabled ? -1 : 0}
      aria-valuenow={currentQuantity}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface shadow-sm select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        currentSize.container,
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {/* Decrement Button */}
      <motion.button
        type="button"
        tabIndex={-1}
        aria-label="Decrease quantity"
        disabled={disabled || isAtMin}
        whileTap={{ scale: 0.88 }}
        onClick={handleDecrease}
        className={cn(
          "rounded-full bg-surface-subtle flex items-center justify-center border border-border/50 text-foreground transition-all cursor-pointer",
          currentSize.btn,
          isAtMin
            ? "opacity-35 cursor-not-allowed"
            : "hover:bg-surface-subtle/80 hover:border-primary/40 active:bg-primary/10"
        )}
      >
        <Minus className={currentSize.icon} />
      </motion.button>

      {/* Animated Numeric Counter Value */}
      <div className={cn("relative flex items-center justify-center overflow-hidden font-mono font-bold tabular-nums text-foreground", currentSize.val)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentQuantity}
            initial={{ y: 8, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 600, damping: 32 }}
            className="inline-block"
          >
            {currentQuantity}
            {unit ? <span className="text-xs font-normal opacity-70 ml-0.5">{unit}</span> : null}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Increment Button */}
      <motion.button
        type="button"
        tabIndex={-1}
        aria-label="Increase quantity"
        disabled={disabled || isAtMax}
        whileTap={{ scale: 0.88 }}
        onClick={handleIncrease}
        className={cn(
          "rounded-full bg-surface-subtle flex items-center justify-center border border-border/50 text-foreground transition-all cursor-pointer",
          currentSize.btn,
          isAtMax
            ? "opacity-35 cursor-not-allowed"
            : "hover:bg-surface-subtle/80 hover:border-primary/40 active:bg-primary/10"
        )}
      >
        <Plus className={currentSize.icon} />
      </motion.button>
    </div>
  );
}

export const PillQuantityCounter = QuantityCounter;
