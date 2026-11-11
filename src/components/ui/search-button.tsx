"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSearchPlaceholder } from "./animated-search-placeholder";

export interface SearchButtonProps {
  onClick?: () => void;
  prefix?: string;
  words?: string[];
  interval?: number;
  shortcutText?: string;
  sectionLabel?: string;
  size?: "sm" | "md" | "lg";
  variant?: "pill" | "rounded";
  disabled?: boolean;
  enableGlobalShortcut?: boolean;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export function SearchButton({
  onClick,
  prefix = "Search ",
  words,
  interval = 2400,
  shortcutText = "⌘ K",
  sectionLabel,
  size = "md",
  variant = "pill",
  disabled = false,
  enableGlobalShortcut = true,
  className,
  placeholder,
  children,
}: SearchButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Global Cmd+K / Ctrl+K and '/' shortcut
  useEffect(() => {
    if (!enableGlobalShortcut || disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") ||
        (!e.metaKey && !e.ctrlKey && !e.altKey && e.key === "/")
      ) {
        e.preventDefault();
        buttonRef.current?.focus({ preventScroll: true });
        onClick?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableGlobalShortcut, disabled, onClick]);

  const sizeClasses = {
    sm: "h-8 px-2.5 py-1 text-xs gap-2",
    md: "h-9 px-3.5 py-1.5 text-xs gap-2.5",
    lg: "h-10 px-4 py-2 text-sm gap-3",
  };

  const iconSizes = {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
  };

  const roundedClasses = {
    pill: "rounded-full",
    rounded: "rounded-xl",
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between w-full select-none cursor-pointer",
        "border border-border/80 bg-surface/85 backdrop-blur-md shadow-2xs",
        "hover:bg-surface hover:border-primary/50 text-foreground transition-all duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/60",
        sizeClasses[size],
        roundedClasses[variant],
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
      aria-label={sectionLabel ? `Search in ${sectionLabel}` : "Search components and commands"}
    >
      <div className="flex items-center gap-2 min-w-0 overflow-hidden flex-1">
        <Search
          className={cn(
            "shrink-0 text-muted-foreground group-hover:text-primary transition-colors",
            iconSizes[size]
          )}
        />

        {sectionLabel && (
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-foreground/80 shrink-0 select-none bg-surface-subtle px-1.5 py-0.5 rounded-md border border-border/60">
            {sectionLabel}
          </span>
        )}

        {children ? (
          children
        ) : words && words.length > 0 ? (
          <AnimatedSearchPlaceholder
            prefix={prefix}
            words={words}
            interval={interval}
            className="inline-flex text-muted-foreground group-hover:text-foreground transition-colors truncate"
          />
        ) : (
          <span className="truncate text-muted-foreground group-hover:text-foreground transition-colors">
            {placeholder || `${prefix}components...`}
          </span>
        )}
      </div>

      {shortcutText && (
        <kbd className="hidden sm:inline-flex shrink-0 items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground bg-surface-subtle border border-border/80 rounded shadow-2xs group-hover:text-foreground group-hover:border-primary/30 transition-colors">
          {shortcutText}
        </kbd>
      )}
    </motion.button>
  );
}
