"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Plus,
  MoreHorizontal,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type ComponentTheme, getThemeClasses } from "./interactive-button-controls";

// ==========================================
// 18. Follow Button (FollowCheckButton)
// ==========================================
export interface FollowCheckButtonProps {
  theme?: ComponentTheme;
  isFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
}

export function FollowCheckButton({
  theme = "auto",
  isFollowing: controlledFollowing,
  onToggle,
  className,
}: FollowCheckButtonProps) {
  const isControlled = controlledFollowing !== undefined;
  const [internalFollowing, setInternalFollowing] = useState(false);
  const isFollowingUser = isControlled ? controlledFollowing : internalFollowing;

  const handleToggleFollow = () => {
    const nextState = !isFollowingUser;
    if (!isControlled) {
      setInternalFollowing(nextState);
    }
    onToggle?.(nextState);
  };

  const activeThemeClasses = getThemeClasses(
    theme,
    "bg-blue-500/20 border-blue-500/40 text-blue-300",
    "bg-blue-50 border-blue-200 text-blue-700",
    "bg-primary/15 border-primary/40 text-primary"
  );

  const idleThemeClasses = getThemeClasses(
    theme,
    "bg-neutral-200 border-white text-neutral-900",
    "bg-neutral-900 border-neutral-900 text-white",
    "bg-primary border-primary text-primary-foreground shadow-sm hover:opacity-90"
  );

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      aria-pressed={isFollowingUser}
      onClick={handleToggleFollow}
      className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold shadow-md transition-all cursor-pointer select-none",
        isFollowingUser ? activeThemeClasses : idleThemeClasses,
        className
      )}
    >
      {isFollowingUser ? (
        <Check className="w-3.5 h-3.5 text-primary" />
      ) : (
        <Plus className="w-3.5 h-3.5" />
      )}
      <span>{isFollowingUser ? "Following" : "+ Follow"}</span>
    </motion.button>
  );
}

export const FollowButton = FollowCheckButton;

// ==========================================
// 19. Menu Dots Button (MenuDotsExpand)
// ==========================================
export interface MenuDotsExpandProps {
  theme?: ComponentTheme;
  onClick?: () => void;
  className?: string;
}

export function MenuDotsExpand({
  theme = "auto",
  onClick,
  className,
}: MenuDotsExpandProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(pulseTimerRef.current);
  }, []);

  const handleTriggerPulse = () => {
    setIsPulsing(true);
    clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = setTimeout(() => setIsPulsing(false), 500);
    onClick?.();
  };

  const buttonThemeClasses = getThemeClasses(
    theme,
    "bg-[#181818] border-neutral-700 text-white",
    "bg-white border-neutral-200 text-neutral-900",
    "bg-surface border-border text-foreground hover:bg-surface-subtle"
  );

  return (
    <motion.button
      type="button"
      aria-label="More actions"
      whileTap={{ scale: 0.88 }}
      onClick={handleTriggerPulse}
      className={cn(
        "w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer select-none transition-colors",
        buttonThemeClasses,
        className
      )}
    >
      <motion.div
        animate={isPulsing ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <MoreHorizontal className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
      </motion.div>
    </motion.button>
  );
}

export const PulseMenuDots = MenuDotsExpand;

// ==========================================
// 20. Compact Mode Switch (CompactModeSwitch)
// ==========================================
export interface CompactModeSwitchProps {
  theme?: ComponentTheme;
  mode?: "grid" | "list";
  onChange?: (mode: "grid" | "list") => void;
  className?: string;
}

export function CompactModeSwitch({
  theme = "auto",
  mode: controlledMode,
  onChange,
  className,
}: CompactModeSwitchProps) {
  const isControlled = controlledMode !== undefined;
  const [internalMode, setInternalMode] = useState<"grid" | "list">("grid");
  const activeLayoutMode = isControlled ? controlledMode : internalMode;
  const uniquePillId = useId();

  const handleSelectMode = (nextMode: "grid" | "list") => {
    if (!isControlled) {
      setInternalMode(nextMode);
    }
    onChange?.(nextMode);
  };

  const containerThemeClasses = getThemeClasses(
    theme,
    "bg-[#181818] border-neutral-700",
    "bg-neutral-100 border-neutral-200",
    "bg-surface-subtle border-border"
  );

  const pillThemeClasses = getThemeClasses(
    theme,
    "bg-neutral-700",
    "bg-white shadow-sm",
    "bg-surface shadow-sm border border-border/50"
  );

  return (
    <div
      role="group"
      aria-label="Layout mode switch"
      className={cn(
        "relative flex items-center p-1 rounded-2xl border transition-colors",
        containerThemeClasses,
        className
      )}
    >
      <button
        type="button"
        aria-label="Grid layout"
        aria-pressed={activeLayoutMode === "grid"}
        onClick={() => handleSelectMode("grid")}
        className="relative p-2 rounded-xl cursor-pointer border-0 bg-transparent select-none"
      >
        {activeLayoutMode === "grid" && (
          <motion.div
            layoutId={`mode-switch-pill-${uniquePillId}`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            className={cn("absolute inset-0 rounded-xl", pillThemeClasses)}
          />
        )}
        <LayoutGrid
          className={cn(
            "relative z-10 w-4 h-4 transition-colors",
            activeLayoutMode === "grid" ? "text-primary" : "text-muted-foreground"
          )}
        />
      </button>

      <button
        type="button"
        aria-label="List layout"
        aria-pressed={activeLayoutMode === "list"}
        onClick={() => handleSelectMode("list")}
        className="relative p-2 rounded-xl cursor-pointer border-0 bg-transparent select-none"
      >
        {activeLayoutMode === "list" && (
          <motion.div
            layoutId={`mode-switch-pill-${uniquePillId}`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            className={cn("absolute inset-0 rounded-xl", pillThemeClasses)}
          />
        )}
        <LayoutList
          className={cn(
            "relative z-10 w-4 h-4 transition-colors",
            activeLayoutMode === "list" ? "text-primary" : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  );
}

export const GridListSwitch = CompactModeSwitch;
