"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import type { CommandPaletteProps } from "./types";
import { useCommandPalette } from "./useCommandPalette";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const ROW = 38;
const GAP = 2;
const PAD = 6;

const LAYER_EASE = [0.23, 1, 0.32, 1] as const;
const LAYER_OUT = [0.4, 0, 1, 1] as const;
const PANEL = { type: "spring", stiffness: 420, damping: 36, mass: 0.9 } as const;

export function CommandPalette({
  items,
  onSelect,
  onDismiss,
  open,
  placeholder = "Search actions or navigation...",
  emptyLabel = "No matching commands found",
  label = "Command palette",
  maxRows = 8,
  autoFocus = false,
  className = "",
}: CommandPaletteProps) {
  const uid = useId();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  const {
    query,
    setQuery,
    results,
    activeId,
    listRef,
    onKeyDown,
    pointerActivate,
    run,
  } = useCommandPalette({ items, onSelect, onDismiss });

  const rows = Math.max(1, Math.min(maxRows, Math.max(items.length, 1)));
  const height = PAD * 2 + rows * ROW + (rows - 1) * GAP;
  const count = results.length;

  useEffect(() => {
    if (open) {
      setQuery("");
      const raf = requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
      });
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 40);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [open, setQuery]);

  useEffect(() => {
    if (autoFocus && !open) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [autoFocus, open]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!liveRef.current) return;
      liveRef.current.textContent =
        count === 0
          ? emptyLabel
          : `${count} ${count === 1 ? "command" : "commands"} available`;
    }, 400);
    return () => clearTimeout(id);
  }, [count, emptyLabel]);

  const spring = reduced ? { duration: 0 } : CELL;
  const overlaid = open !== undefined;

  const surface = (
    <div
      ref={panelRef}
      className={`overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated text-foreground ${
        overlaid
          ? "w-full max-w-[560px] shadow-2xl backdrop-blur-xl"
          : "w-full"
      } ${className}`}
    >
      <div className="flex h-12 items-center gap-2.5 border-b border-border/60 px-3.5 bg-surface/30">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={label}
          aria-expanded
          aria-controls={`${uid}-list`}
          aria-autocomplete="list"
          aria-activedescendant={activeId ? `${uid}-${activeId}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="size-5 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="size-3" />
          </button>
        ) : null}
        <span className="min-w-[2.5ch] shrink-0 text-right font-mono text-[10px] tabular-nums text-muted-foreground px-1.5 py-0.5 rounded bg-surface/60 border border-border/50">
          {count}
        </span>
      </div>
      <div className="relative" style={{ height: Math.min(height, PAD * 2 + Math.min(count || 1, maxRows) * ROW + Math.max(0, Math.min(count || 1, maxRows) - 1) * GAP) }}>
        <ul
          ref={listRef}
          id={`${uid}-list`}
          role="listbox"
          aria-label={label}
          className="absolute inset-0 flex flex-col gap-[2px] overflow-y-auto overscroll-contain p-1.5 [scrollbar-gutter:stable] scrollbar-thin"
        >
          {results.map((item) => {
            const active = item.id === activeId;
            return (
              <motion.li
                key={item.id}
                id={`${uid}-${item.id}`}
                role="option"
                aria-selected={active}
                layout={reduced ? false : "position"}
                transition={spring}
                onPointerMove={(e) => pointerActivate(item.id, e)}
                onClick={() => run(item)}
                className="relative flex h-[38px] shrink-0 cursor-pointer items-center rounded-xl px-3 select-none"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={reduced ? { duration: 0 } : CROSSFADE}
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20 dark:bg-primary/20"
                />
                <span className="relative flex min-w-0 flex-1 items-center gap-2.5">
                  {item.icon && (
                    <span className={`size-4 shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {item.icon}
                    </span>
                  )}
                  <span className={`truncate text-sm font-medium ${active ? "text-primary font-semibold" : "text-foreground"}`}>
                    {item.label}
                  </span>

                  {item.hint && (
                    <span className="hidden shrink-0 text-[11px] text-muted-foreground/80 sm:inline px-1.5 py-0.5 rounded bg-surface/80 border border-border/50">
                      {item.hint}
                    </span>
                  )}

                  {item.shortcut && (
                    <span className="ml-auto flex shrink-0 items-center gap-1">
                      {item.shortcut.map((key) => (
                        <span
                          key={key}
                          className="flex h-5 min-w-5 items-center justify-center rounded border border-border bg-surface px-1.5 font-mono text-[10px] tabular-nums text-muted-foreground shadow-2xs"
                        >
                          {key}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </motion.li>
            );
          })}
        </ul>

        {count === 0 && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : CROSSFADE}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          >
            <p className="text-sm font-medium text-foreground mb-1">{emptyLabel}</p>
            <p className="text-xs text-muted-foreground">Try searching with a different keyword or category name.</p>
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border/60 bg-surface/30 px-3.5 py-2 text-[11px] text-muted-foreground select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <kbd className="flex h-4 min-w-4 items-center justify-center rounded border border-border/80 bg-surface px-1 font-mono text-[9px] text-foreground/80">↑↓</kbd>
            <span className="hidden sm:inline">Navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="flex h-4 min-w-4 items-center justify-center rounded border border-border/80 bg-surface px-1 font-mono text-[9px] text-foreground/80">↵</kbd>
            <span className="hidden sm:inline">Select</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="flex h-4 min-w-4 items-center justify-center rounded border border-border/80 bg-surface px-1 font-mono text-[9px] text-foreground/80">esc</kbd>
            <span className="hidden sm:inline">Close</span>
          </span>
        </div>
        {results.length > 0 && activeId && (
          <span className="truncate max-w-[200px] font-mono text-[10px] text-muted-foreground/90">
            {results.find((r) => r.id === activeId)?.hint || ''}
          </span>
        )}
      </div>
      <span ref={liveRef} role="status" aria-live="polite" className="sr-only" />
    </div>
  );

  if (!overlaid) return surface;
  return (
    <PaletteLayer
      open={open}
      onDismiss={onDismiss}
      reduced={Boolean(reduced)}
      panelRef={panelRef}
    >
      {surface}
    </PaletteLayer>
  );
}

function PaletteLayer({
  open,
  onDismiss,
  reduced,
  panelRef,
  children,
}: {
  open: boolean;
  onDismiss?: () => void;
  reduced: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const downedOutside = useRef(false);
  const leave = useRef(onDismiss);
  leave.current = onDismiss;

  useEffect(() => setHost(document.body), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        leave.current?.();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    const padding = body.style.paddingRight;
    const gutter = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;
    return () => {
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
      body.style.paddingRight = padding;
    };
  }, [open]);

  if (!host) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette-layer"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4"
          initial="closed"
          animate="open"
          exit="gone"
          variants={{ closed: {}, open: {}, gone: {} }}
          onPointerDown={(event) => {
            const panel = panelRef.current;
            downedOutside.current = !panel?.contains(event.target as Node);
          }}
          onClick={(event) => {
            const panel = panelRef.current;
            if (panel?.contains(event.target as Node)) return;
            if (!downedOutside.current) return;
            downedOutside.current = false;
            leave.current?.();
          }}
        >
          <motion.div
            aria-hidden
            style={{ touchAction: "none" }}
            onTouchMove={(e) => e.preventDefault()}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            variants={{
              closed: { opacity: 0 },
              open: {
                opacity: 1,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: 0.2, ease: LAYER_EASE },
              },
              gone: {
                opacity: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: 0.15, ease: LAYER_OUT },
              },
            }}
          />
          <motion.div
            className="relative flex w-full justify-center"
            variants={{
              closed: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 },
              open: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { ...PANEL, opacity: { duration: 0.16, ease: LAYER_EASE } },
              },
              gone: reduced
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    scale: 0.98,
                    y: -6,
                    transition: { duration: 0.15, ease: LAYER_OUT },
                  },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}
