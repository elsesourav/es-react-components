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

export type ComponentTheme = "dark" | "light";

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
  theme = "dark",
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
          theme === "dark"
            ? "bg-[#181818] border-neutral-700 text-white hover:bg-neutral-800"
            : "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50"
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
              theme === "dark"
                ? "bg-[#181818] border-neutral-700"
                : "bg-white border-neutral-200"
            )}
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleEditAction}
              className={cn(
                "flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer border-0 select-none transition-colors",
                theme === "dark"
                  ? "text-white hover:bg-neutral-800"
                  : "text-neutral-900 hover:bg-neutral-100"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" />
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

// Alias for clean naming
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
  theme = "dark",
  text = "Helpful tooltip preview text",
  className,
}: QuestionTooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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
              theme === "dark"
                ? "bg-[#222] border-neutral-700 text-neutral-200"
                : "bg-neutral-900 border-neutral-800 text-white"
            )}
          >
            {text}
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b",
                theme === "dark"
                  ? "bg-[#222] border-neutral-700"
                  : "bg-neutral-900 border-neutral-800"
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
          "w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer shadow-md select-none",
          theme === "dark"
            ? "bg-[#1e1e1e] border-neutral-700 text-[#0a84ff]"
            : "bg-white border-neutral-200 text-[#0071e3]"
        )}
      >
        <HelpCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Icon 1: Bouncing Download Arrow */}
      <motion.button
        type="button"
        aria-label="Download asset (animated bounce)"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTriggerDownload}
        className={cn(
          "w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer select-none",
          theme === "dark"
            ? "bg-[#181818] border-neutral-700 text-white"
            : "bg-white border-neutral-200 text-neutral-900"
        )}
      >
        <motion.div
          animate={isDownloading ? { y: [0, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <Download className="w-5 h-5 text-[#0a84ff]" />
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
            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
            : theme === "dark"
            ? "bg-[#181818] border-neutral-700 text-neutral-300"
            : "bg-white border-neutral-200 text-neutral-700"
        )}
      >
        {isDownloading ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <Download className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}

// Alias for clean naming
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
  theme = "dark",
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
          ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
          : theme === "dark"
          ? "bg-[#1e1e1e] border-neutral-700 text-neutral-400"
          : "bg-white border-neutral-200 text-neutral-600",
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
            className="absolute bottom-1.5 right-1.5 w-4 h-3 rounded-sm bg-blue-500 border border-white shadow-sm"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Alias for clean naming
export const PipToggleButton = PipModeIcons;

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
  theme = "dark",
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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.button
        type="button"
        aria-label="Decrease value"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleDecrement}
        className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm cursor-pointer select-none",
          theme === "dark"
            ? "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white"
            : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900"
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
          "w-9 h-9 rounded-xl border flex items-center justify-center shadow-md cursor-pointer select-none",
          theme === "dark"
            ? "bg-neutral-200 border-white text-neutral-900"
            : "bg-neutral-900 border-neutral-900 text-white"
        )}
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <div
      role="tablist"
      className={cn(
        "relative flex items-center p-1 rounded-2xl border shadow-inner",
        theme === "dark"
          ? "bg-[#181818] border-neutral-700"
          : "bg-neutral-100 border-neutral-200",
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
                className={cn(
                  "absolute inset-0 rounded-xl shadow-md",
                  theme === "dark" ? "bg-neutral-200" : "bg-neutral-900"
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors",
                isSelected
                  ? theme === "dark"
                    ? "text-neutral-900"
                    : "text-white"
                  : theme === "dark"
                  ? "text-neutral-500"
                  : "text-neutral-400"
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

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-1.5 rounded-full border shadow-sm select-none",
        theme === "dark"
          ? "bg-[#181818] border-neutral-700 text-white"
          : "bg-white border-neutral-200 text-neutral-900",
        className
      )}
    >
      <motion.button
        type="button"
        aria-label="Decrease quantity"
        whileTap={{ scale: 0.88 }}
        onClick={handleDecreaseQuantity}
        className="w-7 h-7 rounded-full bg-neutral-500/15 flex items-center justify-center cursor-pointer border-0 text-inherit hover:bg-neutral-500/25 transition-colors"
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
        className="w-7 h-7 rounded-full bg-neutral-500/15 flex items-center justify-center cursor-pointer border-0 text-inherit hover:bg-neutral-500/25 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={handleToggleView}
      aria-label={`Switch to ${currentViewMode === "grid" ? "list" : "grid"} view`}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-semibold shadow-sm cursor-pointer select-none transition-colors",
        theme === "dark"
          ? "bg-[#181818] border-neutral-700 text-white hover:bg-neutral-800"
          : "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50",
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
          <Grid className="w-4 h-4 text-[#0a84ff]" />
        ) : (
          <List className="w-4 h-4 text-[#0a84ff]" />
        )}
      </motion.div>
      <span>{currentViewMode === "grid" ? "Grid View" : "List View"}</span>
    </motion.button>
  );
}

// Alias for clean naming
export const ViewModeToggle = ListColumnToggle;

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
  theme = "dark",
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

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      aria-pressed={isFollowingUser}
      onClick={handleToggleFollow}
      className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold shadow-md transition-all cursor-pointer select-none",
        isFollowingUser
          ? theme === "dark"
            ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
            : "bg-blue-50 border-blue-200 text-blue-700"
          : theme === "dark"
          ? "bg-neutral-200 border-white text-neutral-900"
          : "bg-neutral-900 border-neutral-900 text-white",
        className
      )}
    >
      {isFollowingUser ? (
        <Check className="w-3.5 h-3.5 text-[#0a84ff]" />
      ) : (
        <Plus className="w-3.5 h-3.5" />
      )}
      <span>{isFollowingUser ? "Following" : "+ Follow"}</span>
    </motion.button>
  );
}

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <motion.button
      type="button"
      aria-label="More actions"
      whileTap={{ scale: 0.88 }}
      onClick={handleTriggerPulse}
      className={cn(
        "w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer select-none",
        theme === "dark"
          ? "bg-[#181818] border-neutral-700 text-white"
          : "bg-white border-neutral-200 text-neutral-900",
        className
      )}
    >
      <motion.div
        animate={isPulsing ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <MoreHorizontal
          className={cn(
            "w-5 h-5 transition-colors",
            theme === "dark"
              ? "text-neutral-400 hover:text-white"
              : "text-neutral-500 hover:text-neutral-900"
          )}
        />
      </motion.div>
    </motion.button>
  );
}

// Alias for clean naming
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
  theme = "dark",
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

  return (
    <div
      role="group"
      aria-label="Layout mode switch"
      className={cn(
        "relative flex items-center p-1 rounded-2xl border",
        theme === "dark"
          ? "bg-[#181818] border-neutral-700"
          : "bg-neutral-100 border-neutral-200",
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
            className={cn(
              "absolute inset-0 rounded-xl",
              theme === "dark" ? "bg-neutral-700" : "bg-white shadow-sm"
            )}
          />
        )}
        <LayoutGrid
          className={cn(
            "relative z-10 w-4 h-4 transition-colors",
            activeLayoutMode === "grid"
              ? theme === "dark"
                ? "text-white"
                : "text-black"
              : "text-neutral-400"
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
            className={cn(
              "absolute inset-0 rounded-xl",
              theme === "dark" ? "bg-neutral-700" : "bg-white shadow-sm"
            )}
          />
        )}
        <LayoutList
          className={cn(
            "relative z-10 w-4 h-4 transition-colors",
            activeLayoutMode === "list"
              ? theme === "dark"
                ? "text-white"
                : "text-black"
              : "text-neutral-400"
          )}
        />
      </button>
    </div>
  );
}

// Alias for clean naming
export const GridListSwitch = CompactModeSwitch;
