"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type ArcadeButtonVariant =
  | "candy-pink"
  | "arcade-magenta"
  | "neon-cyan"
  | "arcade-green"
  | "cyber-purple"
  | "amber-gold"
  | "retro-silver";

export type ArcadeButtonSize = "sm" | "md" | "lg" | "xl";
export type ArcadeButtonShape = "pill" | "rounded" | "square";

export interface ArcadeButtonProps
  extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ArcadeButtonVariant;
  size?: ArcadeButtonSize;
  shape?: ArcadeButtonShape;
  shine?: boolean;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const VARIANT_GRADIENTS: Record<
  ArcadeButtonVariant,
  { bg: string; textShadow: string; glow: string; border: string }
> = {
  "candy-pink": {
    bg: "linear-gradient(180deg, #ffc7e6 0%, #ff8ec4 50%, #f6539e 100%)",
    textShadow: "0 1px 2px rgba(150, 20, 80, 0.45)",
    glow: "rgba(246, 83, 158, 0.45)",
    border: "rgba(255, 255, 255, 0.6)",
  },
  "arcade-magenta": {
    bg: "linear-gradient(180deg, #ff59c8 0%, #ea4cda 50%, #fb2175 100%)",
    textShadow: "0 1px 2px rgba(80, 0, 40, 0.6)",
    glow: "rgba(251, 33, 117, 0.45)",
    border: "rgba(255, 200, 240, 0.6)",
  },
  "neon-cyan": {
    bg: "linear-gradient(180deg, #6eefff 0%, #21f4fb 50%, #0099cc 100%)",
    textShadow: "0 1px 2px rgba(0, 60, 90, 0.6)",
    glow: "rgba(33, 244, 251, 0.45)",
    border: "rgba(220, 255, 255, 0.6)",
  },
  "arcade-green": {
    bg: "linear-gradient(180deg, #5eff64 0%, #04ef00 50%, #039e00 100%)",
    textShadow: "0 1px 2px rgba(0, 70, 0, 0.6)",
    glow: "rgba(4, 239, 0, 0.45)",
    border: "rgba(210, 255, 210, 0.6)",
  },
  "cyber-purple": {
    bg: "linear-gradient(180deg, #d39cff 0%, #b773ff 50%, #7028e4 100%)",
    textShadow: "0 1px 2px rgba(50, 10, 90, 0.6)",
    glow: "rgba(112, 40, 228, 0.45)",
    border: "rgba(240, 210, 255, 0.6)",
  },
  "amber-gold": {
    bg: "linear-gradient(180deg, #ffea6b 0%, #ffd000 50%, #ff6a00 100%)",
    textShadow: "0 1px 2px rgba(90, 40, 0, 0.6)",
    glow: "rgba(255, 106, 0, 0.45)",
    border: "rgba(255, 250, 210, 0.6)",
  },
  "retro-silver": {
    bg: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)",
    textShadow: "0 1px 2px rgba(50, 50, 60, 0.4)",
    glow: "rgba(148, 163, 184, 0.35)",
    border: "rgba(255, 255, 255, 0.9)",
  },
};

const SIZE_STYLES: Record<
  ArcadeButtonSize,
  { padding: string; fontSize: string; height: string; minWidth: string }
> = {
  sm: {
    padding: "px-4 py-1.5",
    fontSize: "text-xs tracking-wider",
    height: "h-8",
    minWidth: "min-w-[80px]",
  },
  md: {
    padding: "px-6 py-2.5",
    fontSize: "text-sm tracking-wider",
    height: "h-11",
    minWidth: "min-w-[120px]",
  },
  lg: {
    padding: "px-8 py-3.5",
    fontSize: "text-base tracking-widest",
    height: "h-14",
    minWidth: "min-w-[160px]",
  },
  xl: {
    padding: "px-10 py-4.5",
    fontSize: "text-lg tracking-widest",
    height: "h-16",
    minWidth: "min-w-[200px]",
  },
};

const SHAPE_STYLES: Record<ArcadeButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-xl aspect-square !px-0",
};

/**
 * ArcadeButton Component
 *
 * Glossy 3D jelly/arcade button inspired by Breakout Ball game physics with
 * specular glass highlights, spring tap recoil, optional diagonal shine sweep,
 * and high-contrast embossed text.
 */
export const ArcadeButton = React.forwardRef<
  HTMLButtonElement,
  ArcadeButtonProps
>(
  (
    {
      variant = "candy-pink",
      size = "md",
      shape = "rounded",
      shine = true,
      glow = true,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      className,
      children,
      onClick,
      ...motionProps
    },
    ref
  ) => {
    const config = VARIANT_GRADIENTS[variant];
    const sizeConfig = SIZE_STYLES[size];
    const shapeClass = SHAPE_STYLES[shape];

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.035, y: -1 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.96, y: 2 } : undefined}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        onClick={onClick}
        style={{
          background: config.bg,
          boxShadow: glow
            ? `0 6px 14px -2px ${config.glow}, 0 2px 4px rgba(0,0,0,0.2), inset 0 -3px 4px rgba(0,0,0,0.25)`
            : "0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 4px rgba(0,0,0,0.25)",
        }}
        className={cn(
          "relative select-none overflow-hidden inline-flex items-center justify-center font-black uppercase text-white cursor-pointer transition-shadow border",
          sizeConfig.padding,
          sizeConfig.fontSize,
          sizeConfig.height,
          shape !== "square" && sizeConfig.minWidth,
          shapeClass,
          disabled && "opacity-50 cursor-not-allowed filter grayscale",
          className
        )}
        {...motionProps}
      >
        {/* Top Glossy Glass Reflection Highlight */}
        <span
          className="pointer-events-none absolute left-1 top-1 right-1 h-[42%] rounded-[inherit] opacity-80"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        />

        {/* Diagonal Shiny Gleam Animation (from Breakout Ball shiny-btn1) */}
        {shine && !disabled && (
          <span
            className="pointer-events-none absolute -left-[100%] top-0 h-full w-[60%] -skew-x-25 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine-sweep_3.5s_ease-in-out_infinite]"
          />
        )}

        {/* Inner Border Rim */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] border"
          style={{ borderColor: config.border }}
        />

        {/* Content Container */}
        <span
          className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm"
          style={{ textShadow: config.textShadow }}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
          )}

          <span>{children}</span>

          {!isLoading && rightIcon && (
            <span className="inline-flex shrink-0">{rightIcon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

ArcadeButton.displayName = "ArcadeButton";

export default ArcadeButton;
