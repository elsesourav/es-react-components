"use client";

import React, { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SegmentedABTabsProps {
  options?: [string, string] | string[];
  value?: string;
  defaultValue?: string;
  onChange?: (selectedTab: string) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function SegmentedABTabs({
  options = ["A", "B"],
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  disabled = false,
  className,
}: SegmentedABTabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalTab, setInternalTab] = useState(
    defaultValue || options[0] || "A"
  );
  const activeTab = isControlled ? controlledValue : internalTab;
  const uniqueId = useId();

  const handleSelect = (item: string) => {
    if (disabled || item === activeTab) return;
    if (!isControlled) {
      setInternalTab(item);
    }
    onChange?.(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % options.length;
      handleSelect(options[nextIndex]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + options.length) % options.length;
      handleSelect(options[prevIndex]);
    }
  };

  const sizeClasses = {
    sm: "h-8 p-1 text-xs",
    md: "h-10 p-1 text-xs",
    lg: "h-12 p-1.5 text-sm",
  };

  const buttonPadding = {
    sm: "px-4 py-1",
    md: "px-6 py-1.5",
    lg: "px-8 py-2",
  };

  return (
    <div
      role="tablist"
      aria-disabled={disabled}
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-surface-subtle shadow-inner select-none transition-colors",
        sizeClasses[size],
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {options.map((item, index) => {
        const isSelected = activeTab === item;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => handleSelect(item)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "relative flex-1 rounded-full font-bold transition-colors cursor-pointer border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              buttonPadding[size]
            )}
          >
            {isSelected && (
              <motion.div
                layoutId={`segmented-ab-pill-${uniqueId}`}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-full bg-primary ring-2 ring-white/90 dark:ring-white/95 shadow-md"
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors duration-150 tabular-nums",
                isSelected
                  ? "text-primary-foreground font-extrabold"
                  : "text-muted-foreground hover:text-foreground font-semibold"
              )}
            >
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const SegmentedPillToggle = SegmentedABTabs;
