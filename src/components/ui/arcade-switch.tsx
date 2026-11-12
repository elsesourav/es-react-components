"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArcadeSlider, type ArcadeSliderProps } from "./arcade-slider";

export type ArcadeSwitchVariant =
  | "neon-green"
  | "candy-pink"
  | "neon-cyan"
  | "amber-gold"
  | "cyber-purple";

export type ArcadeSwitchSize = "sm" | "md" | "lg";

export const VARIANT_COLORS: Record<
  ArcadeSwitchVariant,
  { activeBg: string; activeText: string; glow: string }
> = {
  "neon-green": {
    activeBg: "#00e16d",
    activeText: "#00994a",
    glow: "rgba(0, 225, 109, 0.45)",
  },
  "candy-pink": {
    activeBg: "#fb2175",
    activeText: "#d00958",
    glow: "rgba(251, 33, 117, 0.45)",
  },
  "neon-cyan": {
    activeBg: "#00d4ff",
    activeText: "#0088aa",
    glow: "rgba(0, 212, 255, 0.45)",
  },
  "amber-gold": {
    activeBg: "#ffaa00",
    activeText: "#cc7700",
    glow: "rgba(255, 170, 0, 0.45)",
  },
  "cyber-purple": {
    activeBg: "#9933ff",
    activeText: "#6611cc",
    glow: "rgba(153, 51, 255, 0.45)",
  },
};

export const ARCADE_SIZES: Record<
  ArcadeSwitchSize,
  {
    width: number;
    height: number;
    thumbWidth: number;
    thumbHeight: number;
    border: number;
    padding: number;
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
    padding: 2,
    fontSize: "text-[10px]",
    sliderWidth: 220,
  },
  md: {
    width: 82,
    height: 42,
    thumbWidth: 34,
    thumbHeight: 32,
    border: 3,
    padding: 2.5,
    fontSize: "text-xs",
    sliderWidth: 280,
  },
  lg: {
    width: 106,
    height: 52,
    thumbWidth: 44,
    thumbHeight: 40,
    border: 3.5,
    padding: 3,
    fontSize: "text-sm",
    sliderWidth: 360,
  },
};

export function getConcentricRadii({
  height,
  borderWidth,
  borderPadding,
  customRadius,
}: {
  height: number;
  borderWidth: number;
  borderPadding: number;
  customRadius?: number;
}) {
  const isPill = customRadius === undefined || customRadius >= height / 2;
  const outerRadius = isPill ? height / 2 : Math.max(0, customRadius);

  const trackRadius = isPill
    ? Math.max(0, (height - borderWidth * 2) / 2)
    : Math.max(0, outerRadius - borderWidth);

  const thumbRadius = isPill
    ? Math.max(0, (height - borderWidth * 2 - borderPadding * 2) / 2)
    : Math.max(2, trackRadius - borderPadding);

  return {
    outerRadius,
    trackRadius,
    thumbRadius,
  };
}

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
  borderRadius?: number;
  borderPadding?: number;
  showShadow?: boolean;
  showGlow?: boolean;
  showBezel?: boolean;
  // Backwards compatibility for sliderMode
  sliderMode?: boolean;
  sliderValue?: number;
  onSliderChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

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
  borderRadius,
  borderPadding: customPadding,
  showShadow = true,
  showGlow = true,
  showBezel = true,
  sliderMode = false,
  sliderValue = 82,
  onSliderChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  id,
  ariaLabel = "Tactile Bezel Switch",
}) => {
  if (sliderMode) {
    return (
      <ArcadeSlider
        id={id}
        value={sliderValue}
        onChange={onSliderChange}
        min={min}
        max={max}
        step={step}
        size={size}
        variant={variant}
        borderRadius={borderRadius}
        borderPadding={customPadding}
        showShadow={showShadow}
        showGlow={showGlow}
        showBezel={showBezel}
        disabled={disabled}
        className={className}
        ariaLabel={ariaLabel}
      />
    );
  }

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const active = isControlled ? checked : internalChecked;

  const dims = ARCADE_SIZES[size] || ARCADE_SIZES.md;
  const color = VARIANT_COLORS[variant] || VARIANT_COLORS["neon-green"];
  const borderPadding = customPadding ?? dims.padding;
  const borderWidth = showBezel ? dims.border : 1;

  // Exact mathematical centering on Y-axis and X-axis
  const innerHeight = dims.height - borderWidth * 2;
  const innerWidth = dims.width - borderWidth * 2;
  const thumbHeight = Math.max(12, innerHeight - borderPadding * 2);
  const thumbWidth = Math.round(thumbHeight * (dims.thumbWidth / (dims.height - dims.border * 2 - dims.padding * 2)));

  const { outerRadius, thumbRadius } = getConcentricRadii({
    height: dims.height,
    borderWidth,
    borderPadding,
    customRadius: borderRadius,
  });

  const handleToggle = () => {
    if (disabled) return;
    const next = !active;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const travelDistance = Math.max(0, innerWidth - borderPadding * 2 - thumbWidth);

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
        width: `${dims.width}px`,
        height: `${dims.height}px`,
        borderRadius: `${outerRadius}px`,
        backgroundColor: active ? color.activeBg : "#9ca3af",
        border: showBezel ? `${borderWidth}px solid #d4d4d8` : "1px solid rgba(255,255,255,0.2)",
        boxShadow: showShadow
          ? active
            ? showGlow
              ? `inset 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3), 0 0 14px ${color.glow}`
              : "inset 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3)"
            : "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(0,0,0,0.3)"
          : undefined,
      }}
      className={cn(
        "relative flex items-center select-none transition-colors duration-250 ease-out outline-none cursor-pointer overflow-hidden",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed filter grayscale",
        className
      )}
    >
      {/* Outer Metallic Bevel Specular Gradient */}
      {showBezel && (
        <span
          className="pointer-events-none absolute inset-[-1px] opacity-75 z-20"
          style={{
            borderRadius: `${outerRadius}px`,
            boxShadow: showShadow
              ? "0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8)"
              : undefined,
          }}
        />
      )}

      {/* 3D Tactile Sliding Thumb: Mathematically centered on Y & X */}
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
          position: "absolute",
          top: 0,
          bottom: 0,
          marginTop: "auto",
          marginBottom: "auto",
          left: `${borderPadding}px`,
          width: `${thumbWidth}px`,
          height: `${thumbHeight}px`,
          borderRadius: `${thumbRadius}px`,
          background: "linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d4d4d8 100%)",
          boxShadow: showShadow
            ? "0 2px 5px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px #ffffff, inset 0 -1px 2px rgba(0,0,0,0.15)"
            : undefined,
          border: "1px solid rgba(255,255,255,0.9)",
        }}
        className="z-10 flex items-center justify-center shrink-0 pointer-events-none"
      >
        {/* Thumb Top Glossy Reflection */}
        <span
          className="pointer-events-none absolute top-0.5 left-1 right-1 h-[35%] opacity-70"
          style={{
            borderRadius: `${thumbRadius}px`,
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
