"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type ArcadeButtonVariant =
  | "magenta"
  | "cyan"
  | "blue"
  | "theme"
  | "pink"
  | "purple"
  | "green"
  | "gold"
  | "silver"
  // Backwards-compatible aliases
  | "breakout-start"
  | "breakout-action"
  | "breakout-blue"
  | "candy-pink"
  | "arcade-magenta"
  | "neon-cyan"
  | "arcade-green"
  | "cyber-purple"
  | "amber-gold"
  | "retro-silver";

export type ArcadeButtonSize = "sm" | "md" | "lg" | "xl";
export type ArcadeButtonShape = "rounded" | "pill" | "square";
export type ArcadeButtonShineMode = "starburst" | "sweep" | "none";

export interface ArcadeButtonProps
  extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ArcadeButtonVariant;
  size?: ArcadeButtonSize;
  shape?: ArcadeButtonShape;
  // Border Controls (Border defaults to a deep shade of the background color)
  border?: boolean;
  borderWidth?: number | string;
  borderColor?: string;
  borderRadius?: number | string;
  // Specular Mask Controls (concentric top glass reflection cap)
  mask?: boolean;
  maskHeight?: number | string;
  maskOpacity?: number;
  maskInset?: number | string;
  maskBorderRadius?: number | string;
  maskMatchParent?: boolean;
  maskClassName?: string;
  // Shine & Glow Controls
  shine?: boolean;
  shineMode?: ArcadeButtonShineMode;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  customGradient?: string;
  children?: React.ReactNode;
}

const VARIANT_CONFIGS: Record<
  string,
  { bg: string; textShadow: string; glow: string; border: string }
> = {
  // Rich Magenta (Deep Wine Border)
  magenta: {
    bg: "linear-gradient(0deg, #ea4cda 0%, #fb2175 100%)",
    textShadow: "0 1px 1px #000000",
    glow: "rgba(251, 33, 117, 0.45)",
    border: "#850540",
  },
  "breakout-start": {
    bg: "linear-gradient(0deg, #ea4cda 0%, #fb2175 100%)",
    textShadow: "0 1px 1px #000000",
    glow: "rgba(251, 33, 117, 0.45)",
    border: "#850540",
  },
  "arcade-magenta": {
    bg: "linear-gradient(180deg, #ff59c8 0%, #ea4cda 50%, #fb2175 100%)",
    textShadow: "0 1px 2px rgba(80, 0, 40, 0.6)",
    glow: "rgba(251, 33, 117, 0.45)",
    border: "#7a0435",
  },

  // Electric Cyan (Deep Teal Border)
  cyan: {
    bg: "linear-gradient(0deg, #21f4fb 0%, #c04cea 100%)",
    textShadow: "0 1px 2px #000000",
    glow: "rgba(33, 244, 251, 0.45)",
    border: "#0e616c",
  },
  "breakout-action": {
    bg: "linear-gradient(0deg, #21f4fb 0%, #c04cea 100%)",
    textShadow: "0 1px 2px #000000",
    glow: "rgba(33, 244, 251, 0.45)",
    border: "#0e616c",
  },
  "neon-cyan": {
    bg: "linear-gradient(180deg, #6eefff 0%, #21f4fb 50%, #0099cc 100%)",
    textShadow: "0 1px 2px rgba(0, 60, 90, 0.6)",
    glow: "rgba(33, 244, 251, 0.45)",
    border: "#004859",
  },

  // Deep Blue (Midnight Navy Border)
  blue: {
    bg: "linear-gradient(0deg, #0015ff 0%, #7c7cff 100%)",
    textShadow: "0 1px 2px #000000",
    glow: "rgba(0, 21, 255, 0.4)",
    border: "#000b80",
  },
  "breakout-blue": {
    bg: "linear-gradient(0deg, #0015ff 0%, #7c7cff 100%)",
    textShadow: "0 1px 2px #000000",
    glow: "rgba(0, 21, 255, 0.4)",
    border: "#000b80",
  },

  // Theme Adaptive Mode (Binds to Active Theme Tokens with Deep Border)
  theme: {
    bg: "linear-gradient(0deg, hsl(var(--primary)) 0%, hsl(var(--accent, var(--primary)) / 0.88) 100%)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.7)",
    glow: "hsl(var(--primary) / 0.45)",
    border: "color-mix(in srgb, hsl(var(--primary)) 60%, black 40%)",
  },

  // Candy Pink (Deep Rose Border)
  pink: {
    bg: "linear-gradient(180deg, #ffc7e6 0%, #ff8ec4 50%, #f6539e 100%)",
    textShadow: "0 1px 2px rgba(150, 20, 80, 0.45)",
    glow: "rgba(246, 83, 158, 0.45)",
    border: "#8a0f44",
  },
  "candy-pink": {
    bg: "linear-gradient(180deg, #ffc7e6 0%, #ff8ec4 50%, #f6539e 100%)",
    textShadow: "0 1px 2px rgba(150, 20, 80, 0.45)",
    glow: "rgba(246, 83, 158, 0.45)",
    border: "#8a0f44",
  },

  // Emerald Green (Deep Forest Green Border)
  green: {
    bg: "linear-gradient(180deg, #5eff64 0%, #04ef00 50%, #039e00 100%)",
    textShadow: "0 1px 2px rgba(0, 70, 0, 0.6)",
    glow: "rgba(4, 239, 0, 0.45)",
    border: "#004700",
  },
  "arcade-green": {
    bg: "linear-gradient(180deg, #5eff64 0%, #04ef00 50%, #039e00 100%)",
    textShadow: "0 1px 2px rgba(0, 70, 0, 0.6)",
    glow: "rgba(4, 239, 0, 0.45)",
    border: "#004700",
  },

  // Cyber Purple (Deep Violet Border)
  purple: {
    bg: "linear-gradient(180deg, #d39cff 0%, #b773ff 50%, #7028e4 100%)",
    textShadow: "0 1px 2px rgba(50, 10, 90, 0.6)",
    glow: "rgba(112, 40, 228, 0.45)",
    border: "#35086b",
  },
  "cyber-purple": {
    bg: "linear-gradient(180deg, #d39cff 0%, #b773ff 50%, #7028e4 100%)",
    textShadow: "0 1px 2px rgba(50, 10, 90, 0.6)",
    glow: "rgba(112, 40, 228, 0.45)",
    border: "#35086b",
  },

  // Amber Gold (Deep Burnt Amber Border)
  gold: {
    bg: "linear-gradient(180deg, #ffea6b 0%, #ffd000 50%, #ff6a00 100%)",
    textShadow: "0 1px 2px rgba(90, 40, 0, 0.6)",
    glow: "rgba(255, 106, 0, 0.45)",
    border: "#782e00",
  },
  "amber-gold": {
    bg: "linear-gradient(180deg, #ffea6b 0%, #ffd000 50%, #ff6a00 100%)",
    textShadow: "0 1px 2px rgba(90, 40, 0, 0.6)",
    glow: "rgba(255, 106, 0, 0.45)",
    border: "#782e00",
  },

  // Retro Silver (Deep Slate Border)
  silver: {
    bg: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)",
    textShadow: "0 1px 2px rgba(50, 50, 60, 0.4)",
    glow: "rgba(148, 163, 184, 0.35)",
    border: "#334155",
  },
  "retro-silver": {
    bg: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)",
    textShadow: "0 1px 2px rgba(50, 50, 60, 0.4)",
    glow: "rgba(148, 163, 184, 0.35)",
    border: "#334155",
  },
};

const SIZE_STYLES: Record<
  ArcadeButtonSize,
  { padding: string; fontSize: string; height: string; minWidth: string }
> = {
  sm: {
    padding: "px-3.5 py-1.5",
    fontSize: "text-xs tracking-wider",
    height: "h-8",
    minWidth: "min-w-[80px]",
  },
  md: {
    padding: "px-5 py-2",
    fontSize: "text-sm tracking-wider",
    height: "h-11",
    minWidth: "min-w-[120px]",
  },
  lg: {
    padding: "px-7 py-3",
    fontSize: "text-base tracking-widest",
    height: "h-13",
    minWidth: "min-w-[160px]",
  },
  xl: {
    padding: "px-9 py-4",
    fontSize: "text-lg tracking-widest",
    height: "h-16",
    minWidth: "min-w-[200px]",
  },
};

const SHAPE_STYLES: Record<ArcadeButtonShape, string> = {
  rounded: "rounded-2xl",
  pill: "rounded-full",
  square: "rounded-xl aspect-square !px-0",
};

/**
 * ArcadeButton Component
 *
 * Glossy 3D push button with specular glass highlight, deep beveled border (always matching
 * a deep tone of the background color), starburst gleam animation, and theme reactivity.
 */
export const ArcadeButton = React.forwardRef<
  HTMLButtonElement,
  ArcadeButtonProps
>(
  (
    {
      variant = "magenta",
      size = "md",
      shape = "rounded",
      border = true,
      borderWidth,
      borderColor,
      borderRadius,
      mask = true,
      maskHeight = "40%",
      maskOpacity = 0.2,
      maskInset = 4,
      maskBorderRadius,
      maskMatchParent = true,
      maskClassName,
      shine = true,
      shineMode = "starburst",
      glow = true,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      customGradient,
      className,
      style,
      children,
      onClick,
      ...motionProps
    },
    ref
  ) => {
    const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.magenta;
    const sizeConfig = SIZE_STYLES[size];
    const shapeClass = SHAPE_STYLES[shape];

    // 1. Resolve parent button border radius
    const resolvedBorderRadius =
      borderRadius !== undefined
        ? typeof borderRadius === "number"
          ? `${borderRadius}px`
          : borderRadius
        : undefined;

    // 2. Resolve child mask border radius (matching parent to child)
    const resolvedMaskRadius =
      maskBorderRadius !== undefined
        ? typeof maskBorderRadius === "number"
          ? `${maskBorderRadius}px`
          : maskBorderRadius
        : maskMatchParent
        ? resolvedBorderRadius || "inherit"
        : undefined;

    // 3. Resolve mask inset
    const resolvedMaskInset =
      typeof maskInset === "number" ? `${maskInset}px` : maskInset;

    // 4. Resolve border properties: default border color is ALWAYS a deep shade of the bg
    const hasBorder = border !== false;
    const resolvedBorderWidth =
      borderWidth !== undefined
        ? typeof borderWidth === "number"
          ? `${borderWidth}px`
          : borderWidth
        : hasBorder
        ? "1.5px"
        : "0px";

    const resolvedBorderColor = borderColor || config.border;

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.035, y: -1 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.96, y: 1.5 } : undefined}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        onClick={onClick}
        style={{
          background: customGradient || config.bg,
          boxShadow: glow
            ? `0 6px 14px -2px ${config.glow}, 0 2px 4px rgba(0,0,0,0.25), inset 0 -3px 4px rgba(0,0,0,0.25)`
            : "0 4px 8px rgba(0,0,0,0.25), inset 0 -3px 4px rgba(0,0,0,0.25)",
          borderRadius: resolvedBorderRadius,
          borderWidth: resolvedBorderWidth,
          borderStyle: hasBorder ? "solid" : "none",
          borderColor: hasBorder ? resolvedBorderColor : "transparent",
          outline: "none",
          ...style,
        }}
        className={cn(
          "relative select-none overflow-hidden inline-flex items-center justify-center font-black uppercase text-white cursor-pointer transition-all outline-none",
          sizeConfig.padding,
          sizeConfig.fontSize,
          sizeConfig.height,
          shape !== "square" && sizeConfig.minWidth,
          !resolvedBorderRadius && shapeClass,
          disabled && "opacity-50 cursor-not-allowed filter grayscale",
          className
        )}
        {...motionProps}
      >
        {/* Specular Mask Cap (Top highlight matching parent border radius) */}
        {mask && (
          <span
            className={cn(
              "pointer-events-none absolute transition-all duration-200 z-[3]",
              maskClassName
            )}
            style={{
              left: resolvedMaskInset,
              top: resolvedMaskInset,
              width: `calc(100% - (${resolvedMaskInset} * 2))`,
              height: typeof maskHeight === "number" ? `${maskHeight}%` : maskHeight,
              background: `rgba(255, 255, 255, ${maskOpacity})`,
              borderRadius: resolvedMaskRadius,
            }}
          />
        )}

        {/* Starburst Gleam Animation */}
        {shine && shineMode === "starburst" && !disabled && (
          <span className="pointer-events-none absolute -top-[110%] left-0 w-[20%] h-full bg-white z-[5] animate-[shiny-btn1_3s_ease-in-out_infinite]" />
        )}

        {/* Diagonal Ray Sweep Animation */}
        {shine && shineMode === "sweep" && !disabled && (
          <span className="pointer-events-none absolute -left-[100%] top-0 h-full w-[60%] -skew-x-25 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine-sweep_3.5s_ease-in-out_infinite] z-[4]" />
        )}

        {/* Content Container */}
        <span
          className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm font-black"
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

          <span className="truncate">{children}</span>

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
