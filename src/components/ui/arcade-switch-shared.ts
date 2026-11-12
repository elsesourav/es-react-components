"use client";

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
    padding: 1.5,
    fontSize: "text-[10px]",
    sliderWidth: 220,
  },
  md: {
    width: 82,
    height: 42,
    thumbWidth: 34,
    thumbHeight: 32,
    border: 3,
    padding: 2,
    fontSize: "text-xs",
    sliderWidth: 280,
  },
  lg: {
    width: 106,
    height: 52,
    thumbWidth: 44,
    thumbHeight: 40,
    border: 3.5,
    padding: 2.5,
    fontSize: "text-sm",
    sliderWidth: 360,
  },
};

/**
 * Calculates mathematically concentric border radii between outer bezel,
 * inner sunken track, and the sliding tactile thumb.
 * Rule: R_inner = max(0, R_outer - Offset) ensures 100% geometric concentricity.
 */
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
