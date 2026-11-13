"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDropdown, type DropdownItem } from '../dropdown';
import { useFloatingPosition } from '../dropdown-position';

export type TactileSelectOption = {
  value: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface TactileSelectProps {
  items?: DropdownItem[];
  options?: TactileSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  emptyLabel?: string;
  className?: string;
  fullWidth?: boolean;
  error?: string;
  helperText?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  searchPlaceholder?: string;
  native?: boolean;
  id?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;
const EXIT = [0.4, 0, 1, 1] as const;
const CELL = { type: 'spring', stiffness: 520, damping: 34, mass: 0.45 } as const;
const NUDGE = { type: 'spring', stiffness: 700, damping: 46, mass: 0.5 } as const;
const NONE = { duration: 0 } as const;
const SLIDE = { type: 'spring', stiffness: 700, damping: 46, mass: 0.5 } as const;
const ROW_H = 34;
const OPEN = { type: 'spring', stiffness: 620, damping: 38, mass: 0.6 } as const;

export const TactileSelect = React.forwardRef<HTMLDivElement, TactileSelectProps>(
  (
    {
      items,
      options,
      value,
      defaultValue,
      onChange,
      label,
      placeholder = 'Select an option',
      disabled = false,
      emptyLabel = 'No matching options',
      className = '',
      fullWidth = true,
      error,
      helperText,
      sizeVariant = 'md',
      searchable = false,
      searchPlaceholder = 'Filter options...',
      native = false,
      id,
    },
    ref
  ) => {
    // 1. Normalize items / options
    const rawItems: DropdownItem[] = useMemo(() => {
      if (items && items.length > 0) return items;
      if (options && options.length > 0) {
        return options.map((opt) => ({
          value: opt.value,
          label: opt.label,
          hint: opt.hint,
          icon: opt.icon,
          disabled: opt.disabled,
        }));
      }
      return [];
    }, [items, options]);

    // Search filter state
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredItems = useMemo(() => {
      if (!searchable || !searchQuery.trim()) return rawItems;
      const q = searchQuery.toLowerCase().trim();
      return rawItems.filter(
        (it) =>
          it.label.toLowerCase().includes(q) ||
          (it.hint && it.hint.toLowerCase().includes(q))
      );
    }, [rawItems, searchable, searchQuery]);

    const reduced = useReducedMotion();
    const {
      open,
      activeIndex,
      selectedIndex,
      selectedItem,
      rootRef,
      triggerRef,
      menuRef,
      triggerProps,
      listProps,
      getItemProps,
    } = useDropdown({
      items: filteredItems,
      value,
      defaultValue,
      onChange,
      disabled,
    });

    const { style: floatingStyle, placement, ready } = useFloatingPosition({
      triggerRef,
      open,
      minWidth: fullWidth ? 0 : 220,
    });

    useEffect(() => {
      if (open && searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (!open) {
        setSearchQuery('');
      }
    }, [open, searchable]);

    const sizes = {
      sm: 'h-8 px-2.5 text-xs rounded-[calc(var(--radius,0.75rem)*0.75)] gap-2',
      md: 'h-10 px-3.5 text-sm rounded-[var(--radius,0.75rem)] gap-2.5',
      lg: 'h-12 px-4 text-base rounded-[calc(var(--radius,0.75rem)*1.25)] gap-3',
    };

    // If native fallback requested
    if (native) {
      return (
        <div className={cn('w-full space-y-1.5', fullWidth ? 'w-full' : 'inline-block', className)}>
          {label && (
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
              {label}
            </label>
          )}
          <div className="relative flex items-center">
            <select
              id={id}
              disabled={disabled}
              value={value}
              defaultValue={defaultValue}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'w-full appearance-none transition-all pr-9 cursor-pointer mat-cap border border-border/80 text-foreground hover:bg-surface active:translate-y-px',
                'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                sizes[sizeVariant],
                error && 'border-destructive focus:border-destructive'
              )}
            >
              {rawItems.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-surface-elevated text-foreground">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          {error ? (
            <p className="text-xs text-destructive animate-fade-in font-medium">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
      );
    }

    return (
      <div
        ref={ref || rootRef}
        className={cn(
          'relative text-left space-y-1.5',
          fullWidth ? 'w-full' : 'inline-block',
          className
        )}
      >
        {label && (
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
            {label}
          </label>
        )}

        {/* 3D Tactile Keycap Trigger Button */}
        <button
          {...triggerProps}
          className={cn(
            'flex w-full select-none items-center justify-between whitespace-nowrap text-left font-medium',
            'transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out',
            'border border-border/80 text-foreground outline-none cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
            sizes[sizeVariant],
            open
              ? 'translate-y-[1.5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] bg-surface-sunken border-primary/70 ring-1 ring-primary/30'
              : 'mat-cap hover:bg-surface active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]',
            error && 'border-destructive focus:border-destructive'
          )}
        >
          <span className="flex items-center gap-2.5 truncate">
            {selectedItem?.icon && (
              <span className="text-muted-foreground shrink-0">{selectedItem.icon}</span>
            )}
            <span className={selectedItem ? 'text-foreground' : 'text-muted-foreground font-normal'}>
              {selectedItem ? selectedItem.label : placeholder}
            </span>
          </span>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {selectedItem?.hint && (
              <span className="font-mono text-[11px] text-muted-foreground/70 hidden sm:inline">
                {selectedItem.hint}
              </span>
            )}
            <motion.div
              aria-hidden
              initial={false}
              animate={{ rotate: open ? 180 : 0 }}
              transition={reduced ? NONE : NUDGE}
              className="text-muted-foreground/80 flex items-center justify-center"
            >
              <ChevronDown className="size-4 shrink-0" />
            </motion.div>
          </div>
        </button>

        {error ? (
          <p className="text-xs text-destructive animate-fade-in font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}

        {/* Floating Tactile Dropdown Panel (.mat-float) */}
        {typeof document !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {open && ready && (
                <motion.div
                  ref={menuRef}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          y: placement === 'top' ? 6 : -6,
                        }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                    y: placement === 'top' ? 4 : -4,
                    transition: reduced ? NONE : { duration: 0.12, ease: EXIT },
                  }}
                  transition={
                    reduced
                      ? NONE
                      : { ...OPEN, opacity: { duration: 0.12, ease: EASE } }
                  }
                  style={{
                    ...floatingStyle,
                    transformOrigin: placement === 'top' ? 'bottom' : 'top',
                  }}
                  className="fixed z-[9999] rounded-[var(--radius)] border border-border/80 bg-surface-elevated/98 p-1.5 mat-float backdrop-blur-xl flex flex-col overflow-hidden"
                >
                  {/* Optional Sunken Well Search Box */}
                  {searchable && (
                    <div className="p-1 mb-1 border-b border-border/50">
                      <div className="relative flex items-center">
                        <Search className="absolute left-2.5 size-3.5 text-muted-foreground/70 pointer-events-none" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={searchPlaceholder}
                          className="w-full mat-well border border-border/80 text-foreground text-xs rounded-md pl-8 pr-2.5 py-1.5 placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  )}

                  <ul
                    {...listProps}
                    aria-label={label || placeholder}
                    style={{
                      maxHeight: `calc(${floatingStyle.maxHeight ?? '240px'} - ${searchable ? '50px' : '12px'})`,
                    }}
                    className="relative w-full overflow-y-auto outline-none [scrollbar-gutter:stable] py-0.5 space-y-0.5"
                  >
                    {/* Sliding indicator pill */}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-1 top-0 h-[34px] rounded-[calc(var(--radius)-4px)] bg-primary/10 dark:bg-primary/20 border border-primary/20 shadow-xs"
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

                    {filteredItems.map((item, i) => {
                      const active = i === activeIndex && !item.disabled;
                      const picked = i === selectedIndex;
                      return (
                        <li
                          key={item.value}
                          {...getItemProps(i)}
                          className={cn(
                            'relative flex h-[34px] cursor-pointer select-none items-center rounded-[calc(var(--radius)-4px)] px-3 text-sm transition-colors',
                            item.disabled
                              ? 'cursor-not-allowed opacity-40 text-muted-foreground'
                              : active
                              ? 'text-primary font-medium'
                              : picked
                              ? 'text-foreground font-medium'
                              : 'text-foreground/90 hover:text-foreground'
                          )}
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
                            transition={CELL}
                            className="relative ml-2.5 flex size-4 shrink-0 items-center justify-center text-primary"
                          >
                            <Check className="size-3.5 stroke-[2.5]" />
                          </motion.span>
                        </li>
                      );
                    })}

                    {filteredItems.length === 0 && (
                      <li
                        role="presentation"
                        className="flex h-8 items-center px-3 text-xs text-muted-foreground"
                      >
                        {emptyLabel}
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    );
  }
);

TactileSelect.displayName = 'TactileSelect';
