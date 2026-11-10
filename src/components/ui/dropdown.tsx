"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const EXIT = [0.4, 0, 1, 1] as const;
const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const NUDGE = { type: "spring", stiffness: 700, damping: 46, mass: 0.5 } as const;
const NONE = { duration: 0 } as const;
const SLIDE = { type: "spring", stiffness: 700, damping: 46, mass: 0.5 } as const;
const ROW_H = 34;
const OPEN = { type: "spring", stiffness: 620, damping: 38, mass: 0.6 } as const;

export type DropdownItem = {
  value: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type UseDropdownOptions = {
  items: DropdownItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  typeaheadDelay?: number;
};

export function useDropdown({
  items,
  value,
  defaultValue,
  onChange,
  disabled = false,
  typeaheadDelay = 600,
}: UseDropdownOptions) {
  const uid = useId();
  const listId = `${uid}-list`;
  const itemId = useCallback((i: number) => `${uid}-opt-${i}`, [uid]);

  const [uncontrolled, setUncontrolled] = useState<string | null>(
    defaultValue ?? null,
  );
  const selectedValue = value !== undefined ? value : uncontrolled;
  const selectedIndex = items.findIndex((it) => it.value === selectedValue);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const viaKey = useRef(false);
  const buffer = useRef("");
  const bufferTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emit = useRef(onChange);
  emit.current = onChange;

  const step = useCallback(
    (from: number, dir: 1 | -1) => {
      const n = items.length;
      if (n === 0) return -1;
      let i = from;
      for (let k = 0; k < n; k++) {
        i = (i + dir + n) % n;
        if (!items[i].disabled) return i;
      }
      return from;
    },
    [items],
  );

  const edge = useCallback(
    (dir: 1 | -1) => step(dir === 1 ? -1 : items.length, dir),
    [step, items.length],
  );

  const openMenu = useCallback(
    (index?: number) => {
      if (disabled || items.length === 0) return;
      const usable = selectedIndex >= 0 && !items[selectedIndex].disabled;
      viaKey.current = true;
      setActiveIndex(index ?? (usable ? selectedIndex : edge(1)));
      setOpen(true);
    },
    [disabled, items, selectedIndex, edge],
  );

  const close = useCallback((restoreFocus = true) => {
    buffer.current = "";
    setOpen(false);
    setActiveIndex(-1);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const select = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item || item.disabled) return;
      if (value === undefined) setUncontrolled(item.value);
      emit.current?.(item.value);
      close();
    },
    [items, value, close],
  );

  const typeahead = useCallback(
    (char: string) => {
      if (bufferTimer.current) clearTimeout(bufferTimer.current);
      buffer.current += char.toLowerCase();
      bufferTimer.current = setTimeout(() => {
        buffer.current = "";
      }, typeaheadDelay);

      const q = buffer.current;
      const n = items.length;
      const from = activeIndex < 0 ? 0 : activeIndex;
      const start = q.length > 1 ? from : from + 1;
      for (let k = 0; k < n; k++) {
        const i = (start + k) % n;
        const it = items[i];
        if (!it.disabled && it.label.toLowerCase().startsWith(q)) {
          viaKey.current = true;
          setActiveIndex(i);
          return;
        }
      }
    },
    [items, activeIndex, typeaheadDelay],
  );

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    const onWindowBlur = () => close(false);
    document.addEventListener("pointerdown", onDown, true);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || activeIndex < 0 || !viaKey.current) return;
    viaKey.current = false;
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(
    () => () => {
      if (bufferTimer.current) clearTimeout(bufferTimer.current);
    },
    [],
  );

  const triggerProps = {
    ref: triggerRef,
    type: "button" as const,
    disabled,
    "aria-haspopup": "listbox" as const,
    "aria-expanded": open,
    "aria-controls": open ? listId : undefined,
    onClick: () => (open ? close() : openMenu()),
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        openMenu(edge(-1));
      }
    },
  };

  const listProps = {
    ref: listRef,
    id: listId,
    role: "listbox" as const,
    tabIndex: -1,
    "aria-activedescendant": activeIndex >= 0 ? itemId(activeIndex) : undefined,
    onKeyDown: (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        viaKey.current = true;
        setActiveIndex((i) => step(i, dir));
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        viaKey.current = true;
        setActiveIndex(edge(e.key === "Home" ? 1 : -1));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activeIndex >= 0) select(activeIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        close();
      } else if (
        e.key.length === 1 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault();
        typeahead(e.key);
      }
    },
  };

  const getItemProps = useCallback(
    (index: number) => ({
      id: itemId(index),
      role: "option" as const,
      "aria-selected": index === selectedIndex,
      "aria-disabled": items[index]?.disabled ? (true as const) : undefined,
      ref: (el: HTMLLIElement | null) => {
        itemRefs.current[index] = el;
      },
      onPointerMove: () => {
        if (items[index]?.disabled) return;
        viaKey.current = false;
        setActiveIndex(index);
      },
      onClick: () => select(index),
    }),
    [itemId, items, selectedIndex, select],
  );

  return {
    open,
    openMenu,
    close,
    select,
    activeIndex,
    selectedIndex,
    selectedItem: selectedIndex >= 0 ? items[selectedIndex] : null,
    itemId,
    rootRef,
    triggerProps,
    listProps,
    getItemProps,
  };
}

export type DropdownProps = {
  items: DropdownItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  emptyLabel?: string;
  className?: string;
  fullWidth?: boolean;
};

export function Dropdown({
  items,
  value,
  defaultValue,
  onChange,
  label,
  placeholder = "Select an option",
  disabled = false,
  emptyLabel = "Nothing to choose",
  className = "",
  fullWidth = false,
}: DropdownProps) {
  const reduced = useReducedMotion();
  const {
    open,
    activeIndex,
    selectedIndex,
    selectedItem,
    rootRef,
    triggerProps,
    listProps,
    getItemProps,
  } = useDropdown({ items, value, defaultValue, onChange, disabled });

  const cell = reduced ? NONE : CELL;

  return (
    <div
      ref={rootRef}
      className={`relative ${fullWidth ? "w-full" : "inline-block"} text-left ${className}`}
    >
      {label && (
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <button
        {...triggerProps}
        className={`flex h-10 w-full select-none items-center justify-between gap-2.5 whitespace-nowrap rounded-[var(--radius)] border border-border bg-surface px-3.5 text-sm font-medium text-foreground outline-none transition-[box-shadow,border-color,background-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/50 hover:bg-surface-subtle focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 ${
          open
            ? "border-primary ring-2 ring-primary/20 shadow-sm"
            : "shadow-sm"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedItem?.icon && (
            <span className="text-muted-foreground shrink-0">{selectedItem.icon}</span>
          )}
          <span className={selectedItem ? "text-foreground" : "text-muted-foreground font-normal"}>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
        </span>
        <motion.svg
          aria-hidden
          viewBox="0 0 12 12"
          className="size-3.5 shrink-0 text-muted-foreground"
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduced ? NONE : NUDGE}
        >
          <path
            d="M2.5 4.5 L6 8 L9.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: -4,
              transition: reduced ? NONE : { duration: 0.12, ease: EXIT },
            }}
            transition={
              reduced
                ? NONE
                : { ...OPEN, opacity: { duration: 0.12, ease: EASE } }
            }
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-full w-max max-w-sm rounded-[var(--radius)] border border-border bg-surface-elevated p-1.5 shadow-xl backdrop-blur-md"
          >
            <ul
              {...listProps}
              aria-label={label || placeholder}
              className="relative max-h-60 overflow-y-auto outline-none [scrollbar-gutter:stable]"
            >
              {/* Animated active pill */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[34px] rounded-[calc(var(--radius)-4px)] bg-primary/10 dark:bg-primary/20"
                initial={false}
                animate={{
                  y: activeIndex < 0 ? 0 : activeIndex * ROW_H,
                  opacity: activeIndex < 0 ? 0 : 1,
                }}
                transition={
                  reduced
                    ? NONE
                    : { ...SLIDE, opacity: { duration: 0.1, ease: EASE } }
                }
              />
              {items.map((item, i) => {
                const active = i === activeIndex && !item.disabled;
                const picked = i === selectedIndex;
                return (
                  <li
                    key={item.value}
                    {...getItemProps(i)}
                    className={`relative flex h-[34px] cursor-pointer select-none items-center rounded-[calc(var(--radius)-4px)] px-3 text-sm transition-colors ${
                      item.disabled
                        ? "cursor-not-allowed opacity-40 text-muted-foreground"
                        : active
                          ? "text-primary font-medium"
                          : picked
                            ? "text-foreground font-medium"
                            : "text-foreground/90"
                    }`}
                  >
                    <span className="relative flex min-w-0 flex-1 items-center gap-2.5">
                      {item.icon && (
                        <span className="size-4 shrink-0 text-muted-foreground">{item.icon}</span>
                      )}
                      <span className="truncate">{item.label}</span>
                      {item.hint && (
                        <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground/80">
                          {item.hint}
                        </span>
                      )}
                    </span>
                    <motion.span
                      aria-hidden
                      initial={false}
                      animate={{ opacity: picked ? 1 : 0, scale: picked ? 1 : 0.6 }}
                      transition={cell}
                      className="relative ml-2.5 flex size-4 shrink-0 items-center justify-center text-primary"
                    >
                      <svg viewBox="0 0 14 14" className="size-3.5">
                        <path
                          d="M2.5 7.2 L5.5 10.2 L11.5 3.8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </li>
                );
              })}

              {items.length === 0 && (
                <li
                  role="presentation"
                  className="flex h-8 items-center px-3 text-sm text-muted-foreground"
                >
                  {emptyLabel}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
