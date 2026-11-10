"use client";

import React, { useState, useId } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Minus,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type ComponentTheme, getThemeClasses } from "./interactive-button-controls";

// ==========================================
// 14. Simple Plus / Minus Stepper (SimplePlusMinusBtn)
// ==========================================
export interface SimplePlusMinusBtnProps {
  theme?: ComponentTheme;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (count: number) => void;
  className?: string;
}

export function SimplePlusMinusBtn({
  theme = "auto",
  value: controlledValue,
  min = 0,
  max = 999,
  onChange,
  className,
}: SimplePlusMinusBtnProps) {
  const isControlled = controlledValue !== undefined;
  const [internalCount, setInternalCount] = useState(1);
  const currentCount = isControlled ? controlledValue : internalCount;

  const handleDecrement = () => {
    const nextCount = Math.max(min, currentCount - 1);
    if (!isControlled) {
      setInternalCount(nextCount);
    }
    onChange?.(nextCount);
  };

  const handleIncrement = () => {
    const nextCount = Math.min(max, currentCount + 1);
    if (!isControlled) {
      setInternalCount(nextCount);
    }
    onChange?.(nextCount);
  };

  const decThemeClasses = getThemeClasses(
    theme,
    "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white",
    "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900",
    "bg-surface-subtle border-border text-muted-foreground hover:text-foreground"
  );

  const incThemeClasses = getThemeClasses(
    theme,
    "bg-neutral-200 border-white text-neutral-900",
    "bg-neutral-900 border-neutral-900 text-white",
    "bg-primary border-primary text-primary-foreground shadow-sm hover:opacity-90"
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.button
        type="button"
        aria-label="Decrease value"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleDecrement}
        className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm cursor-pointer select-none transition-colors",
          decThemeClasses
        )}
      >
        <Minus className="w-4 h-4" />
      </motion.button>

      <motion.button
        type="button"
        aria-label="Increase value"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleIncrement}
        className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center shadow-md cursor-pointer select-none transition-all",
          incThemeClasses
        )}
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

export const SimpleStepper = SimplePlusMinusBtn;

// ==========================================
// 15. A / B Segmented Tabs (SegmentedABTabs)
// ==========================================
export interface SegmentedABTabsProps {
  theme?: ComponentTheme;
  options?: ["A", "B"] | [string, string];
  value?: string;
  onChange?: (selectedTab: string) => void;
  className?: string;
}

export function SegmentedABTabs({
  theme = "auto",
  options = ["A", "B"],
  value: controlledValue,
  onChange,
  className,
}: SegmentedABTabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalTab, setInternalTab] = useState(options[0]);
  const activeTab = isControlled ? controlledValue : internalTab;
  const uniquePillId = useId();

  const handleTabSelect = (item: string) => {
    if (!isControlled) {
      setInternalTab(item);
    }
    onChange?.(item);
  };

  const containerThemeClasses = getThemeClasses(
    theme,
    "bg-[#181818] border-neutral-700",
    "bg-neutral-100 border-neutral-200",
    "bg-surface-subtle border-border"
  );

  const pillThemeClasses = getThemeClasses(
    theme,
    "bg-neutral-200",
    "bg-neutral-900",
    "bg-primary shadow-sm"
  );

  return (
    <div
      role="tablist"
      className={cn(
        "relative flex items-center p-1 rounded-2xl border shadow-inner",
        containerThemeClasses,
        className
      )}
    >
      {options.map((item) => {
        const isSelected = activeTab === item;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => handleTabSelect(item)}
            className="relative px-6 py-2 rounded-xl text-xs font-bold cursor-pointer border-0 bg-transparent select-none"
          >
            {isSelected && (
              <motion.div
                layoutId={`ab-tab-pill-${uniquePillId}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                className={cn("absolute inset-0 rounded-xl", pillThemeClasses)}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors",
                isSelected
                  ? theme === "auto"
                    ? "text-primary-foreground font-semibold"
                    : theme === "dark"
                    ? "text-neutral-900"
                    : "text-white"
                  : "text-muted-foreground hover:text-foreground"
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

// ==========================================
// 16. Quantity Counter Pill (QuantityCounter)
// ==========================================
export interface QuantityCounterProps {
  theme?: ComponentTheme;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
  className?: string;
}

export function QuantityCounter({
  theme = "auto",
  value: controlledValue,
  min = 1,
  max = 99,
  onChange,
  className,
}: QuantityCounterProps) {
  const isControlled = controlledValue !== undefined;
  const [internalQuantity, setInternalQuantity] = useState(3);
  const currentQuantity = isControlled ? controlledValue : internalQuantity;

  const handleDecreaseQuantity = () => {
    const nextQuantity = Math.max(min, currentQuantity - 1);
    if (!isControlled) {
      setInternalQuantity(nextQuantity);
    }
    onChange?.(nextQuantity);
  };

  const handleIncreaseQuantity = () => {
    const nextQuantity = Math.min(max, currentQuantity + 1);
    if (!isControlled) {
      setInternalQuantity(nextQuantity);
    }
    onChange?.(nextQuantity);
  };

  const containerThemeClasses = getThemeClasses(
    theme,
    "bg-[#181818] border-neutral-700 text-white",
    "bg-white border-neutral-200 text-neutral-900",
    "bg-surface border-border text-foreground"
  );

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-1.5 rounded-full border shadow-sm select-none transition-colors",
        containerThemeClasses,
        className
      )}
    >
      <motion.button
        type="button"
        aria-label="Decrease quantity"
        whileTap={{ scale: 0.88 }}
        onClick={handleDecreaseQuantity}
        className="w-7 h-7 rounded-full bg-surface-subtle flex items-center justify-center cursor-pointer border border-border/40 text-foreground hover:bg-surface-subtle/80 transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </motion.button>

      <motion.span
        key={currentQuantity}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-xs font-mono font-bold w-4 text-center tabular-nums"
      >
        {currentQuantity}
      </motion.span>

      <motion.button
        type="button"
        aria-label="Increase quantity"
        whileTap={{ scale: 0.88 }}
        onClick={handleIncreaseQuantity}
        className="w-7 h-7 rounded-full bg-surface-subtle flex items-center justify-center cursor-pointer border border-border/40 text-foreground hover:bg-surface-subtle/80 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}

export const PillQuantityCounter = QuantityCounter;

// ==========================================
// 17. List / Column View Toggle (ListColumnToggle)
// ==========================================
export interface ListColumnToggleProps {
  theme?: ComponentTheme;
  view?: "grid" | "list";
  onChange?: (view: "grid" | "list") => void;
  className?: string;
}

export function ListColumnToggle({
  theme = "auto",
  view: controlledView,
  onChange,
  className,
}: ListColumnToggleProps) {
  const isControlled = controlledView !== undefined;
  const [internalView, setInternalView] = useState<"grid" | "list">("grid");
  const currentViewMode = isControlled ? controlledView : internalView;

  const handleToggleView = () => {
    const nextView = currentViewMode === "grid" ? "list" : "grid";
    if (!isControlled) {
      setInternalView(nextView);
    }
    onChange?.(nextView);
  };

  const buttonThemeClasses = getThemeClasses(
    theme,
    "bg-[#181818] border-neutral-700 text-white hover:bg-neutral-800",
    "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50",
    "bg-surface border-border text-foreground hover:bg-surface-subtle"
  );

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={handleToggleView}
      aria-label={`Switch to ${currentViewMode === "grid" ? "list" : "grid"} view`}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-semibold shadow-sm cursor-pointer select-none transition-colors",
        buttonThemeClasses,
        className
      )}
    >
      <motion.div
        key={currentViewMode}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {currentViewMode === "grid" ? (
          <Grid className="w-4 h-4 text-primary" />
        ) : (
          <List className="w-4 h-4 text-primary" />
        )}
      </motion.div>
      <span>{currentViewMode === "grid" ? "Grid View" : "List View"}</span>
    </motion.button>
  );
}

export const ViewModeToggle = ListColumnToggle;

