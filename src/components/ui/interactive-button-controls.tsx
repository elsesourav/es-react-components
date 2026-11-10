"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Edit3,
  Trash2,
  HelpCircle,
  Download,
  Check,
  Layers,
  Plus,
  Minus,
  Grid,
  List,
  MoreHorizontal,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ComponentTheme = "dark" | "light" | "auto";

// Helper to resolve theme styles
export function getThemeClasses(
  theme: ComponentTheme = "auto",
  darkClasses: string,
  lightClasses: string,
  autoClasses: string
) {
  if (theme === "dark") return darkClasses;
  if (theme === "light") return lightClasses;
  return autoClasses;
}

// ==========================================
// 10. Context Menu Actions (ContextMenuEditDelete)
// ==========================================
export interface ContextMenuActionsProps {
  theme?: ComponentTheme;
  buttonLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ContextMenuEditDelete({
  theme = "auto",
  buttonLabel = "Actions Menu",
  onEdit,
  onDelete,
  className,
}: ContextMenuActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEditAction = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleDeleteAction = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  const buttonThemeClasses = getThemeClasses(
    theme,
    "bg-surface border-border text-foreground hover:bg-surface-subtle",
    "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50",
    "bg-surface border-border text-foreground hover:bg-surface-subtle"
  );

  const menuThemeClasses = getThemeClasses(
    theme,
    "bg-surface-elevated border-border shadow-xl",
    "bg-white border-neutral-200 shadow-xl",
    "bg-surface-elevated border-border shadow-xl"
  );

  const itemThemeClasses = getThemeClasses(
    theme,
    "text-foreground hover:bg-surface-subtle",
    "text-neutral-900 hover:bg-neutral-100",
    "text-foreground hover:bg-surface-subtle"
  );

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "px-4 py-2 rounded-2xl border text-xs font-semibold shadow-sm cursor-pointer select-none transition-colors",
          buttonThemeClasses
        )}
      >
        {buttonLabel}
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.88, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 6 }}
            exit={{ opacity: 0, scale: 0.88, y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full z-30 w-32 p-1 rounded-2xl border shadow-xl flex flex-col gap-0.5",
              menuThemeClasses
            )}
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleEditAction}
              className={cn(
                "flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer border-0 select-none transition-colors",
                itemThemeClasses
              )}
            >
              <Edit3 className="w-3.5 h-3.5 text-primary" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleDeleteAction}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 cursor-pointer border-0 select-none transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ActionContextMenu = ContextMenuEditDelete;

// ==========================================
// 11. Tooltip (QuestionTooltip)
// ==========================================
export interface QuestionTooltipProps {
  theme?: ComponentTheme;
  text?: string;
  className?: string;
}

export function QuestionTooltip({
  theme = "auto",
  text = "Helpful tooltip preview text",
  className,
}: QuestionTooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipBoxThemeClasses = getThemeClasses(
    theme,
    "bg-surface-elevated border-border text-foreground shadow-lg",
    "bg-neutral-900 border-neutral-800 text-white shadow-lg",
    "bg-surface-elevated border-border text-foreground shadow-lg"
  );

  const tooltipArrowThemeClasses = getThemeClasses(
    theme,
    "bg-surface-elevated border-border",
    "bg-neutral-900 border-neutral-800",
    "bg-surface-elevated border-border"
  );

  const buttonThemeClasses = getThemeClasses(
    theme,
    "bg-surface border-border text-primary hover:bg-surface-subtle",
    "bg-white border-neutral-200 text-primary hover:bg-neutral-50",
    "bg-surface border-border text-primary hover:bg-surface-subtle"
  );

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}
            className={cn(
              "absolute -top-9 px-3 py-1.5 rounded-xl border text-[11px] shadow-xl whitespace-nowrap z-20 pointer-events-none select-none",
              tooltipBoxThemeClasses
            )}
          >
            {text}
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b",
                tooltipArrowThemeClasses
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Help information"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer shadow-md select-none transition-colors",
          buttonThemeClasses
        )}
      >
        <HelpCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

export const HelpTooltip = QuestionTooltip;

// ==========================================
// 12. Download Animated Buttons (DownloadAnimatedIcons)
// ==========================================
export interface DownloadAnimatedIconsProps {
  theme?: ComponentTheme;
  onDownload?: () => Promise<void> | void;
  className?: string;
}

export function DownloadAnimatedIcons({
  theme = "auto",
  onDownload,
  className,
}: DownloadAnimatedIconsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(downloadTimerRef.current);
  }, []);

  const handleTriggerDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    await onDownload?.();
    clearTimeout(downloadTimerRef.current);
    downloadTimerRef.current = setTimeout(() => setIsDownloading(false), 2000);
  };

  const buttonBaseThemeClasses = getThemeClasses(
    theme,
    "bg-surface border-border text-foreground hover:bg-surface-subtle",
    "bg-white border-neutral-200 text-neutral-900",
    "bg-surface border-border text-foreground hover:bg-surface-subtle"
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Icon 1: Bouncing Download Arrow */}
      <motion.button
        type="button"
        aria-label="Download asset (animated bounce)"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTriggerDownload}
        className={cn(
          "w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer select-none transition-colors",
          buttonBaseThemeClasses
        )}
      >
        <motion.div
          animate={isDownloading ? { y: [0, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <Download className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.button>

      {/* Icon 2: Success Check on Download */}
      <motion.button
        type="button"
        aria-label="Download status check"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTriggerDownload}
        className={cn(
          "w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer select-none transition-colors",
          isDownloading
            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-500"
            : buttonBaseThemeClasses
        )}
      >
        {isDownloading ? (
          <Check className="w-5 h-5 text-emerald-500" />
        ) : (
          <Download className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.button>
    </div>
  );
}

export const AnimatedDownloadButton = DownloadAnimatedIcons;

// ==========================================
// 13. Picture-in-Picture Icons (PipModeIcons)
// ==========================================
export interface PipModeIconsProps {
  theme?: ComponentTheme;
  isPip?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

export function PipModeIcons({
  theme = "auto",
  isPip: controlledPip,
  onToggle,
  className,
}: PipModeIconsProps) {
  const isControlled = controlledPip !== undefined;
  const [internalPipActive, setInternalPipActive] = useState(false);
  const isPipActive = isControlled ? controlledPip : internalPipActive;

  const handleTogglePip = () => {
    const nextState = !isPipActive;
    if (!isControlled) {
      setInternalPipActive(nextState);
    }
    onToggle?.(nextState);
  };

  const buttonBaseThemeClasses = getThemeClasses(
    theme,
    "bg-surface border-border text-muted-foreground hover:bg-surface-subtle",
    "bg-white border-neutral-200 text-neutral-600",
    "bg-surface border-border text-muted-foreground hover:bg-surface-subtle"
  );

  return (
    <motion.button
      type="button"
      aria-label="Toggle Picture-in-Picture mode"
      aria-pressed={isPipActive}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleTogglePip}
      className={cn(
        "relative w-16 h-12 rounded-2xl border-2 flex items-center justify-center shadow-md cursor-pointer select-none transition-colors",
        isPipActive
          ? "bg-primary/20 border-primary text-primary"
          : buttonBaseThemeClasses,
        className
      )}
    >
      <Layers className="w-5 h-5" />
      <AnimatePresence>
        {isPipActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 5, y: -5 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-1.5 right-1.5 w-4 h-3 rounded-sm bg-primary border border-background shadow-sm"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export const PipToggleButton = PipModeIcons;

