"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ArcadeSwitchVariant =
  | "neon-green"
  | "candy-pink"
  | "neon-cyan"
  | "amber-gold"
  | "cyber-purple";

export type ArcadeSwitchSize = "sm" | "md" | "lg";

export interface ArcadeSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ArcadeSwitchSize;
  variant?: ArcadeSwitchVariant;
  showText?: boolean;
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
  sliderMode?: boolean;
  sliderValue?: number; // 0 to 100 for sliderMode
  onSliderChange?: (val: number) => void;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

const VARIANT_COLORS: Record<
  ArcadeSwitchVariant,
  { activeBg: string; activeText: string; glow: string }
> = {
  "neon-green": {
    activeBg: "#00e16d",
    activeText: "#00994a",
    glow: "rgba(0, 225, 109, 0.4)",
  },
  "candy-pink": {
    activeBg: "#fb2175",
    activeText: "#d00958",
    glow: "rgba(251, 33, 117, 0.4)",
  },
  "neon-cyan": {
    activeBg: "#00d4ff",
    activeText: "#0088aa",
    glow: "rgba(0, 212, 255, 0.4)",
  },
  "amber-gold": {
    activeBg: "#ffaa00",
    activeText: "#cc7700",
    glow: "rgba(255, 170, 0, 0.4)",
  },
  "cyber-purple": {
    activeBg: "#9933ff",
    activeText: "#6611cc",
    glow: "rgba(153, 51, 255, 0.4)",
  },
};

const SWITCH_SIZES: Record<
  ArcadeSwitchSize,
  {
    width: number;
    height: number;
    thumbWidth: number;
    thumbHeight: number;
    border: number;
    fontSize: string;
    sliderWidth: number;
  }
> = {
  sm: {
    width: 64,
    height: 32,
    thumbWidth: 26,
    thumbHeight: 24,
    border: 2.5,
    fontSize: "text-[10px]",
    sliderWidth: 160,
  },
  md: {
    width: 82,
    height: 42,
    thumbWidth: 34,
    thumbHeight: 32,
    border: 3,
    fontSize: "text-xs",
    sliderWidth: 240,
  },
  lg: {
    width: 106,
    height: 52,
    thumbWidth: 44,
    thumbHeight: 40,
    border: 3.5,
    fontSize: "text-sm",
    sliderWidth: 320,
  },
};

/**
 * ArcadeSwitch Component
 *
 * Authentic arcade & retro game toggle switch inspired by Breakout Ball's
 * profile settings, featuring a beveled silver metallic rim, sunken inset
 * shadow track, tactile 3D squircle thumb, and engraved ON/OFF status text.
 */
export const ArcadeSwitch: React.FC<ArcadeSwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  size = "md",
  variant = "neon-green",
  showText = true,
  onLabel = "ON",
  offLabel = "OFF",
  disabled = false,
  sliderMode = false,
  sliderValue = 50,
  onSliderChange,
  className,
  id,
  ariaLabel = "Arcade Toggle Switch",
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const active = isControlled ? checked : internalChecked;

  const dims = SWITCH_SIZES[size];
  const color = VARIANT_COLORS[variant];
  const actualWidth = sliderMode ? dims.sliderWidth : dims.width;

  const handleToggle = () => {
    if (disabled) return;
    const next = !active;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const travelDistance = actualWidth - dims.thumbWidth - dims.border * 2 - 4;

  return (
    <div
      role="switch"
      id={id}
      aria-label={ariaLabel}
      aria-checked={active}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
      style={{
        width: actualWidth,
        height: dims.height,
        borderRadius: dims.height / 2,
        backgroundColor: active ? color.activeBg : "#9ca3af",
        border: `${dims.border}px solid #d4d4d8`,
        boxShadow: active
          ? `inset 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3), 0 0 12px ${color.glow}`
          : "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(0,0,0,0.3)",
      }}
      className={cn(
        "relative flex items-center p-0.5 select-none transition-colors duration-250 ease-out outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed filter grayscale",
        className
      )}
    >
      {/* Outer Metallic Bevel Specular Gradient */}
      <span
        className="pointer-events-none absolute inset-[-1px] rounded-[inherit] opacity-75"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8)",
        }}
      />

      {/* 3D Tactile Sliding Thumb */}
      <motion.div
        animate={{
          x: active ? travelDistance : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 32,
          mass: 0.8,
        }}
        style={{
          width: dims.thumbWidth,
          height: dims.thumbHeight,
          borderRadius: Math.round(dims.thumbHeight * 0.38),
          background: "linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d4d4d8 100%)",
          boxShadow:
            "0 2px 5px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
        className="relative z-10 flex items-center justify-center shrink-0"
      >
        {/* Thumb Top Glossy Reflection */}
        <span
          className="pointer-events-none absolute top-0.5 left-1 right-1 h-[35%] rounded-[inherit] opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        {/* Engraved ON/OFF Status Text on Thumb */}
        {showText && (
          <span
            className={cn(
              "font-serif font-black tracking-tight select-none transition-colors duration-200",
              dims.fontSize
            )}
            style={{
              color: active ? color.activeText : "#52525b",
              textShadow: active
                ? "0 1px 0 rgba(255,255,255,0.6)"
                : "0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {active ? onLabel : offLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default ArcadeSwitch;
