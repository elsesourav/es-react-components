"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoverflowImageItem {
  src: string;
  title: string;
  subtitle?: string;
}

export const DEFAULT_COVERFLOW_IMAGES: CoverflowImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80",
    title: "Nordic Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    title: "Spiral Geometry",
  },
  {
    src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    title: "Tokyo Skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    title: "Sahara Dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    title: "Glass Monolith",
  },
];

export interface CardCoverFlowProps {
  hovered?: boolean;
  className?: string;
  images?: CoverflowImageItem[];
  isMonochrome?: boolean;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const CardCoverFlow = React.memo(function CardCoverFlow({
  className = "",
  images = DEFAULT_COVERFLOW_IMAGES,
  isMonochrome = false,
  initialIndex = 2,
  onIndexChange,
}: CardCoverFlowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    Math.min(Math.max(0, initialIndex), images.length - 1)
  );

  const handlePrevSlide = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSlideIndex((prevIndex) => {
      const nextIndex = Math.max(0, prevIndex - 1);
      onIndexChange?.(nextIndex);
      return nextIndex;
    });
  };

  const handleNextSlide = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSlideIndex((prevIndex) => {
      const nextIndex = Math.min(images.length - 1, prevIndex + 1);
      onIndexChange?.(nextIndex);
      return nextIndex;
    });
  };

  const handleSelectSlide = (event: React.MouseEvent, targetIndex: number) => {
    event.stopPropagation();
    setActiveSlideIndex(targetIndex);
    onIndexChange?.(targetIndex);
  };

  return (
    <div
      className={cn(
        "w-full h-full min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden select-none bg-surface-subtle/50 border border-border text-foreground rounded-2xl p-4 sm:p-6 transition-colors",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* 3D Coverflow Container */}
      <div className="w-full flex justify-center items-center relative h-[140px] sm:h-[150px] [transform-style:preserve-3d]">
        {images.map((item, index) => {
          const isCurrentActive = activeSlideIndex === index;
          const slideOffset = index - activeSlideIndex;
          const distanceFromCenter = Math.abs(slideOffset);
          const isPreceding = index < activeSlideIndex;

          return (
            <motion.div
              key={index}
              className="absolute w-[75px] sm:w-[85px] aspect-[3/4] cursor-pointer"
              initial={false}
              animate={{
                x: slideOffset * 34,
                rotateY: isCurrentActive ? 0 : isPreceding ? 38 : -38,
                z: isCurrentActive ? 50 : -distanceFromCenter * 50,
                scale: isCurrentActive ? 1.1 : 1 - distanceFromCenter * 0.08,
                opacity: distanceFromCenter > 2 ? 0 : 1 - distanceFromCenter * 0.25,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{ zIndex: 100 - distanceFromCenter }}
              onClick={(event) => handleSelectSlide(event, index)}
            >
              {isMonochrome ? (
                <div className="w-full h-full rounded-xl bg-surface border border-border shadow-xl flex items-center justify-center text-foreground font-bold text-sm">
                  {index + 1}
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl shadow-xl border border-border/60"
                />
              )}
              <motion.div
                className="absolute -bottom-6 left-[-20px] right-[-20px] text-center text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-sm"
                animate={{
                  opacity: isCurrentActive ? 1 : 0,
                  y: isCurrentActive ? 0 : -5,
                }}
              >
                {isMonochrome ? `Card ${index + 1}` : item.title}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Control pill bar */}
      <div className="mt-8 w-fit px-2 py-1 flex items-center gap-2 justify-center text-foreground rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-md z-20">
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          disabled={activeSlideIndex === 0}
          className="p-1 cursor-pointer hover:bg-surface-subtle disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors border-0 bg-transparent text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex justify-center items-center gap-1.5 px-1">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={(event) => handleSelectSlide(event, index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "rounded-full cursor-pointer h-1.5 border-0 p-0 transition-all duration-300",
                activeSlideIndex === index
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next slide"
          disabled={activeSlideIndex === images.length - 1}
          className="p-1 cursor-pointer hover:bg-surface-subtle disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors border-0 bg-transparent text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});
