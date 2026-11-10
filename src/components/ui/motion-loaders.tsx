"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SquareSnakeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  duration?: number;
  label?: string;
  colorClassName?: string;
}

const SQUARE_COORDINATES: Array<[number, number]> = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2],
];

export const SquareSnake: React.FC<SquareSnakeProps> = ({
  size = "md",
  className,
  duration = 1.5,
  label = "Loading...",
  colorClassName = "bg-primary",
}) => {
  const sizeClasses = {
    sm: "w-7 h-7 gap-0.5",
    md: "w-10 h-10 gap-1",
    lg: "w-14 h-14 gap-1.5",
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("grid grid-cols-3 select-none", sizeClasses[size], className)}
    >
      {SQUARE_COORDINATES.map(([columnIndex, rowIndex], cellIndex) => (
        <motion.div
          key={cellIndex}
          className={cn("rounded-sm w-full h-full", colorClassName)}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration,
            repeat: Infinity,
            delay: (columnIndex + rowIndex) * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export interface BobbingDotsProps {
  size?: "sm" | "md" | "lg";
  count?: number;
  className?: string;
  duration?: number;
  bounceHeight?: number;
  label?: string;
  colorClassName?: string;
}

export const BobbingDots: React.FC<BobbingDotsProps> = ({
  size = "md",
  count = 3,
  className,
  duration = 1.2,
  bounceHeight = 10,
  label = "Loading...",
  colorClassName = "bg-primary",
}) => {
  const dotSizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const gapClasses = {
    sm: "space-x-1.5",
    md: "space-x-2",
    lg: "space-x-3",
  };

  const dotsArray = Array.from({ length: Math.max(1, count) }, (_, index) => index);

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center select-none", gapClasses[size], className)}
    >
      {dotsArray.map((dotIndex) => (
        <motion.div
          key={dotIndex}
          className={cn("rounded-full", dotSizeClasses[size], colorClassName)}
          animate={{ y: [0, -bounceHeight, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            delay: dotIndex * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
};
