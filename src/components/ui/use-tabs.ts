"use client";

import React, { useCallback, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export type TabItem = {
  /** Tab identifier value */
  value?: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  /** Legacy alias for value */
  id?: string;
};

export type TabsActivation = "automatic" | "manual";

export type UseTabsOptions = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activation?: TabsActivation;
};

export function useTabs({
  items: rawItems,
  value: controlled,
  defaultValue,
  onValueChange,
  activation = "automatic",
}: UseTabsOptions) {
  const items = React.useMemo(
    () => rawItems.map((i) => ({ ...i, value: i.value ?? i.id ?? "" })),
    [rawItems]
  );
  const base = useId();
  const nodes = useRef(new Map<string, HTMLButtonElement>());
  const direction = useRef(1);

  const [internal, setInternal] = useState(
    () => defaultValue ?? items.find((i) => !i.disabled)?.value ?? items[0]?.value ?? "",
  );

  const value = controlled ?? internal;

  const emit = useRef(onValueChange);
  emit.current = onValueChange;

  const select = useCallback(
    (next: string) => {
      if (next === value) return;
      const from = items.findIndex((i) => i.value === value);
      const to = items.findIndex((i) => i.value === next);
      direction.current = to < from ? -1 : 1;
      if (controlled === undefined) setInternal(next);
      emit.current?.(next);
    },
    [controlled, items, value],
  );

  const focusAt = useCallback(
    (i: number) => {
      const item = items[i];
      if (!item) return;
      nodes.current.get(item.value)?.focus();
    },
    [items],
  );

  const nextEnabled = useCallback(
    (from: number, dir: number) => {
      const n = items.length;
      let i = from < 0 ? 0 : from;
      for (let k = 0; k < n; k += 1) {
        i = (i + dir + n) % n;
        if (!items[i].disabled) return i;
      }
      return from;
    },
    [items],
  );

  const endStop = useCallback(
    (dir: number) => {
      const n = items.length;
      if (dir > 0) {
        for (let i = 0; i < n; i += 1) if (!items[i].disabled) return i;
      } else {
        for (let i = n - 1; i >= 0; i -= 1) if (!items[i].disabled) return i;
      }
      return 0;
    },
    [items],
  );

  const getTabProps = useCallback(
    (item: TabItem, index: number) => {
      const tabValue = item.value ?? item.id ?? "";
      return {
        id: `${base}-tab-${tabValue}`,
        role: "tab" as const,
        type: "button" as const,
        "aria-selected": tabValue === value,
        "aria-controls": `${base}-panel-${tabValue}`,
        "aria-disabled": item.disabled ? (true as const) : undefined,
        tabIndex: tabValue === value ? 0 : -1,
        ref: (node: HTMLButtonElement | null) => {
          if (node) nodes.current.set(tabValue, node);
          else nodes.current.delete(tabValue);
        },
        onClick: () => {
          if (!item.disabled) select(tabValue);
        },
        onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            const to = nextEnabled(index, e.key === "ArrowRight" ? 1 : -1);
            focusAt(to);
            if (activation === "automatic") select(items[to].value);
            return;
          }
          if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            const to = endStop(e.key === "Home" ? 1 : -1);
            focusAt(to);
            if (activation === "automatic") select(items[to].value);
            return;
          }
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!item.disabled) select(tabValue);
          }
        },
      };
    },
    [activation, base, endStop, focusAt, items, nextEnabled, select, value],
  );

  const getPanelProps = useCallback(
    (panelValue: string) => ({
      id: `${base}-panel-${panelValue}`,
      role: "tabpanel" as const,
      "aria-labelledby": `${base}-tab-${panelValue}`,
      tabIndex: 0,
    }),
    [base],
  );

  const tabListProps = {
    role: "tablist" as const,
    "aria-orientation": "horizontal" as const,
  };

  return {
    value,
    select,
    direction: direction.current,
    tabListProps,
    getTabProps,
    getPanelProps,
  };
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
