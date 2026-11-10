"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, X, AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";

export interface CollapsibleBannerProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  dismissible?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
  action?: React.ReactNode;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  variant?: "default" | "warning" | "destructive" | "info" | "success";
  icon?: React.ReactNode;
  className?: string;
}

export function CollapsibleBanner({
  title,
  description,
  dismissible = true,
  dismissLabel = "Dismiss banner",
  onDismiss,
  action,
  defaultCollapsed = false,
  collapsible = true,
  variant = "warning",
  icon,
  className = "",
}: CollapsibleBannerProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const variantStyles = {
    default: "border-border bg-surface text-foreground",
    warning: "border-warning/30 bg-warning/10 text-foreground",
    destructive: "border-destructive/30 bg-destructive/10 text-foreground",
    info: "border-info/30 bg-info/10 text-foreground",
    success: "border-success/30 bg-success/10 text-foreground",
  };

  const iconColors = {
    default: "text-muted-foreground",
    warning: "text-warning",
    destructive: "text-destructive",
    info: "text-info",
    success: "text-success",
  };

  const defaultIcons = {
    default: <Info className="size-4" />,
    warning: <AlertTriangle className="size-4" />,
    destructive: <AlertCircle className="size-4" />,
    info: <Info className="size-4" />,
    success: <CheckCircle2 className="size-4" />,
  };

  const activeIcon = icon ?? defaultIcons[variant];

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-[var(--radius)] border transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center justify-between p-3 sm:px-4">
        {/* Left side: Icon + Title */}
        <div
          onClick={collapsible && description ? () => setCollapsed((c) => !c) : undefined}
          className={`flex items-center gap-2.5 min-w-0 flex-1 ${
            collapsible && description ? "cursor-pointer select-none" : ""
          }`}
        >
          <span className={`shrink-0 ${iconColors[variant]}`}>{activeIcon}</span>
          <span className="text-xs sm:text-sm font-semibold tracking-tight truncate">
            {title}
          </span>
          {collapsible && description && (
            <motion.div
              animate={{ rotate: collapsed ? -90 : 0 }}
              transition={{ duration: 0.15 }}
              className="text-muted-foreground ml-1"
            >
              <ChevronDown className="size-3.5" />
            </motion.div>
          )}
        </div>

        {/* Right side: Actions & Dismiss */}
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {action && <div className="text-xs">{action}</div>}

          {dismissible && (
            <button
              type="button"
              onClick={() => {
                setDismissed(true);
                onDismiss?.();
              }}
              aria-label={dismissLabel}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Foldable Description */}
      <AnimatePresence initial={false}>
        {!collapsed && description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-3 pb-3 sm:px-4 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-2 ml-6">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
