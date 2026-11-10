"use client";

import { useState, useEffect, useCallback, type RefObject, type CSSProperties } from "react";

export type FloatingPlacement = "bottom" | "top";

export type UseFloatingPositionOptions = {
  triggerRef: RefObject<HTMLElement | null>;
  open: boolean;
  offset?: number;
  margin?: number;
  minWidth?: number;
};

export type FloatingPositionResult = {
  style: CSSProperties;
  placement: FloatingPlacement;
  ready: boolean;
};

export function useFloatingPosition({
  triggerRef,
  open,
  offset = 6,
  margin = 12,
  minWidth = 180,
}: UseFloatingPositionOptions): FloatingPositionResult {
  const [coords, setCoords] = useState<{
    left: number;
    width: number;
    maxHeight: number;
    top?: number;
    bottom?: number;
    placement: FloatingPlacement;
  } | null>(null);

  const update = useCallback(() => {
    if (!open || !triggerRef.current || typeof window === "undefined") {
      setCoords(null);
      return;
    }

    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Available space above and below the trigger button
    const spaceBelow = vh - rect.bottom - offset - margin;
    const spaceAbove = rect.top - offset - margin;

    // Flip upward into free space if bottom space is cramped (< 220px) and above has more room
    const shouldFlip = spaceBelow < 220 && spaceAbove > spaceBelow;
    const placement: FloatingPlacement = shouldFlip ? "top" : "bottom";

    // Dynamic max height tailored to free viewport space
    const availableSpace = shouldFlip ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(120, Math.min(320, availableSpace));

    // Match trigger width or minWidth, clamped to screen boundaries
    const targetWidth = Math.max(rect.width, minWidth);
    const width = Math.min(targetWidth, vw - 2 * margin);

    // Viewport edge clamping: never bleed off screen horizontally
    let left = rect.left;
    if (left + width > vw - margin) {
      left = vw - width - margin;
    }
    left = Math.max(margin, left);

    if (placement === "top") {
      setCoords({
        left: Math.round(left),
        width: Math.round(width),
        maxHeight: Math.round(maxHeight),
        bottom: Math.round(vh - rect.top + offset),
        placement: "top",
      });
    } else {
      setCoords({
        left: Math.round(left),
        width: Math.round(width),
        maxHeight: Math.round(maxHeight),
        top: Math.round(rect.bottom + offset),
        placement: "bottom",
      });
    }
  }, [open, triggerRef, offset, margin, minWidth]);

  useEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    update();

    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { capture: true, passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, { capture: true });
    };
  }, [open, update]);

  if (!open || !coords) {
    return {
      style: { display: "none" },
      placement: "bottom",
      ready: false,
    };
  }

  const style: CSSProperties = {
    position: "fixed",
    left: `${coords.left}px`,
    width: `${coords.width}px`,
    maxHeight: `${coords.maxHeight}px`,
    zIndex: 9999,
    ...(coords.placement === "top"
      ? { bottom: `${coords.bottom}px` }
      : { top: `${coords.top}px` }),
  };

  return {
    style,
    placement: coords.placement,
    ready: true,
  };
}
