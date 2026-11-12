"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const INDICATOR = { type: "spring", stiffness: 620, damping: 42, mass: 0.35 } as const;

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const PANEL = { type: "spring", stiffness: 460, damping: 38, mass: 0.8 } as const;

import { useTabs, type TabItem, type TabsActivation, type UseTabsOptions, type UseTabsReturn } from "./use-tabs";
export type { TabItem, TabsActivation, UseTabsOptions, UseTabsReturn } from "./use-tabs";
export { useTabs };

export type TabsProps = {
  /** Tab list items. Supports TabItem with value or id */
  items?: TabItem[];
  /** Legacy alias for items */
  tabs?: TabItem[];
  /** Controlled active tab value */
  value?: string;
  /** Legacy alias for value */
  activeTab?: string;
  defaultValue?: string;
  /** Value change callback */
  onValueChange?: (value: string) => void;
  /** Legacy alias for onValueChange */
  onChange?: (value: string) => void;
  activation?: TabsActivation;
  variant?: "plateau" | "pills" | "underline" | "segmented";
  renderPanel?: (value: string) => ReactNode;
  label?: string;
  panelClassName?: string;
  className?: string;
  children?: ReactNode;
};

export function Tabs({
  items: propItems,
  tabs: legacyTabs,
  value: propValue,
  activeTab: legacyActiveTab,
  defaultValue,
  onValueChange: propOnValueChange,
  onChange: legacyOnChange,
  activation = "automatic",
  variant = "plateau",
  renderPanel,
  label = "Tabs",
  panelClassName = "",
  className = "",
  children,
}: TabsProps) {
  // Normalize items from either `items` or legacy `tabs`
  const rawItems = propItems ?? legacyTabs ?? [];
  const normalizedItems = rawItems.map((item) => ({
    ...item,
    value: item.value ?? item.id ?? "",
  }));

  const value = propValue ?? legacyActiveTab;
  const onValueChange = propOnValueChange ?? legacyOnChange;

  const tabs = useTabs({
    items: normalizedItems,
    value,
    defaultValue,
    onValueChange,
    activation,
  });

  const reduced = useReducedMotion();
  const rowRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [plateau, setPlateau] = useState({ x: 0, width: 0, ready: false });

  const selectedIndex = normalizedItems.findIndex((item) => item.value === tabs.value);

  useIsoLayoutEffect(() => {
    if (variant !== "plateau") return;
    const node = tabRefs.current[selectedIndex];
    if (!node) return;

    const read = () => {
      setPlateau((prev) =>
        prev.x === node.offsetLeft &&
        prev.width === node.offsetWidth &&
        prev.ready
          ? prev
          : { x: node.offsetLeft, width: node.offsetWidth, ready: true },
      );
    };

    read();
    const row = rowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(read);
    observer.observe(row);
    return () => observer.disconnect();
  }, [selectedIndex, normalizedItems, variant]);

  // Segmented variant
  if (variant === "segmented") {
    return (
      <div className={cn("w-full overflow-x-auto scrollbar-none py-1", className)}>
        <div className="inline-flex items-center p-1 rounded-xl bg-surface border border-border min-w-max shadow-well">
          {normalizedItems.map((tab) => {
            const isActive = tab.value === tabs.value;
            return (
              <button
                key={tab.value}
                onClick={() => tabs.select(tab.value)}
                disabled={tab.disabled}
                className={cn(
                  "flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 select-none whitespace-nowrap outline-none",
                  isActive
                    ? "bg-surface-elevated text-foreground shadow-lift font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle/50",
                  tab.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-subtle text-muted-foreground"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {renderPanel ? (
          <div className={cn("mt-3", panelClassName)}>
            {renderPanel(tabs.value)}
          </div>
        ) : children}
      </div>
    );
  }

  // Underline variant
  if (variant === "underline") {
    return (
      <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
        <div className="flex items-center gap-6 border-b border-border min-w-max">
          {normalizedItems.map((tab) => {
            const isActive = tab.value === tabs.value;
            return (
              <button
                key={tab.value}
                onClick={() => tabs.select(tab.value)}
                disabled={tab.disabled}
                className={cn(
                  "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors select-none -mb-px whitespace-nowrap outline-none",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                  tab.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-surface-subtle text-muted-foreground">
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
        {renderPanel ? (
          <div className={cn("mt-3", panelClassName)}>
            {renderPanel(tabs.value)}
          </div>
        ) : children}
      </div>
    );
  }

  // Pills variant
  if (variant === "pills") {
    return (
      <div className={cn("w-full overflow-x-auto scrollbar-none py-1", className)}>
        <div className="flex items-center gap-2 min-w-max">
          {normalizedItems.map((tab) => {
            const isActive = tab.value === tabs.value;
            return (
              <button
                key={tab.value}
                onClick={() => tabs.select(tab.value)}
                disabled={tab.disabled}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 select-none whitespace-nowrap outline-none",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground border border-border/60",
                  tab.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-surface-subtle text-muted-foreground">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {renderPanel ? (
          <div className={cn("mt-3", panelClassName)}>
            {renderPanel(tabs.value)}
          </div>
        ) : children}
      </div>
    );
  }

  // Default: Spring-plateau indicator with animated directional panel
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated shadow-sm transition-colors",
        className
      )}
    >
      <div
        {...tabs.tabListProps}
        ref={rowRef}
        aria-label={label}
        className="relative flex w-full gap-1 border-b border-border bg-surface-subtle px-1.5 pt-1.5 overflow-x-auto scrollbar-none"
      >
        <motion.span
          layout
          aria-hidden
          style={{
            borderTopLeftRadius: "var(--radius)",
            borderTopRightRadius: "var(--radius)",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            left: plateau.x,
            width: plateau.width,
            opacity: plateau.ready ? 1 : 0,
          }}
          className="absolute bottom-[-1px] top-1.5 bg-surface-elevated"
          transition={reduced ? { duration: 0 } : INDICATOR}
        >
          <motion.span
            layout
            aria-hidden
            style={{
              borderTopLeftRadius: "var(--radius)",
              borderTopRightRadius: "var(--radius)",
            }}
            transition={reduced ? { duration: 0 } : INDICATOR}
            className="absolute inset-0 border border-b-0 border-border"
          />
        </motion.span>

        {normalizedItems.map((item, index) => {
          const selected = item.value === tabs.value;
          return (
            <button
              key={item.value}
              {...tabs.getTabProps(item, index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              className={cn(
                "relative flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-t-[var(--radius)] px-3.5 text-xs outline-none transition-colors duration-150 select-none",
                "focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1",
                item.disabled
                  ? "cursor-not-allowed opacity-40 text-muted-foreground"
                  : selected
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-surface-subtle/80 hover:text-foreground"
              )}
            >
              {item.icon && <span className="h-3.5 w-3.5 shrink-0">{item.icon}</span>}
              <span className="relative grid place-items-center leading-[1.4]">
                <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold">
                  {item.label}
                </span>
                <span
                  className={cn("col-start-1 row-start-1", selected ? "font-semibold" : "")}
                >
                  {item.label}
                </span>
              </span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-sunken text-muted-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {renderPanel ? (
        <motion.div
          key={tabs.value}
          custom={tabs.direction}
          {...tabs.getPanelProps(tabs.value)}
          initial={reduced ? false : { opacity: 0, x: tabs.direction * 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduced ? { duration: 0 } : PANEL}
          className={cn(
            "p-4 text-xs sm:text-sm leading-relaxed text-foreground outline-none",
            panelClassName
          )}
        >
          {renderPanel(tabs.value)}
        </motion.div>
      ) : children ? (
        <div className={cn("p-4", panelClassName)}>{children}</div>
      ) : null}
    </div>
  );
}
