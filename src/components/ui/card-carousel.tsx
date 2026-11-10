"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselImageItem {
  src: string;
  title: string;
  subtitle?: string;
}

export const DEFAULT_CAROUSEL_IMAGES: CarouselImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    title: "Alpine Summit",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    title: "Azure Shoreline",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    title: "Misty Highlands",
  },
  {
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80",
    title: "Aurora Lights",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    title: "Starry Peak",
  },
];

export interface CardCarouselProps {
  hovered?: boolean;
  className?: string;
  images?: CarouselImageItem[];
  isMonochrome?: boolean;
  initialIndex?: number;
  slideWidth?: number;
  onIndexChange?: (index: number) => void;
}

export const CardCarousel = React.memo(function CardCarousel({
  hovered,
  className = "",
  images = DEFAULT_CAROUSEL_IMAGES,
  isMonochrome = false,
  initialIndex = 2,
  slideWidth = 150,
  onIndexChange,
}: CardCarouselProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    Math.min(Math.max(0, initialIndex), images.length - 1)
  );
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const isInteractiveActive =
    hovered !== undefined ? hovered : isContainerHovered;

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
      onMouseEnter={() => setIsContainerHovered(true)}
      onMouseLeave={() => setIsContainerHovered(false)}
      className={cn(
        "w-full h-full min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden select-none bg-surface-subtle/50 border border-border text-foreground rounded-2xl p-4 sm:p-6 transition-colors",
        className
      )}
    >
      {/* Carousel Track Wrapper */}
      <div
        className="relative h-[180px] flex items-center justify-start overflow-visible"
        style={{ width: `${slideWidth}px` }}
      >
        {/* Slides Track */}
        <motion.div
          className="flex w-fit items-center"
          animate={{ x: -activeSlideIndex * slideWidth }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
        >
          {images.map((item, index) => {
            const isCurrentActive = activeSlideIndex === index;
            const offsetDistance = index - activeSlideIndex;

            const calculatedRotation = isInteractiveActive
              ? offsetDistance * 20
              : offsetDistance * 5;
            const calculatedScale = isCurrentActive
              ? 1.05
              : isInteractiveActive
              ? 0.65
              : 0.8;
            const calculatedOffsetY = isInteractiveActive ? offsetDistance * 24 : 0;

            return (
              <motion.div
                key={index}
                className="shrink-0 flex flex-col items-center gap-1.5 will-change-[transform,scale]"
                style={{ width: `${slideWidth}px` }}
                animate={{
                  rotate: calculatedRotation,
                  scale: calculatedScale,
                  y: calculatedOffsetY,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              >
                {/* Title tooltip above card */}
                <div
                  className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 drop-shadow-sm ${
                    isCurrentActive
                      ? "opacity-100 scale-100 text-foreground"
                      : "opacity-0 scale-75 text-muted-foreground"
                  }`}
                >
                  {isMonochrome ? `Card ${index + 1}` : item.title}
                </div>

                {/* Card Tile */}
                {isMonochrome ? (
                  <div
                    onClick={(event) => handleSelectSlide(event, index)}
                    className="w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] rounded-xl bg-surface border border-border shadow-lg flex items-center justify-center text-foreground font-bold text-sm cursor-pointer"
                  >
                    {index + 1}
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] object-cover rounded-xl shadow-lg border border-border/60 cursor-pointer"
                    onClick={(event) => handleSelectSlide(event, index)}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-5 px-2 py-1 flex items-center gap-2 justify-center text-foreground rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-md z-20">
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
