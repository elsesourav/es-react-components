"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className={`w-full h-full min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden select-none bg-zinc-950/40 rounded-2xl p-4 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* 3D Coverflow Container */}
      <div className="w-full flex justify-center items-center relative h-[140px] [transform-style:preserve-3d]">
        {images.map((item, index) => {
          const isCurrentActive = activeSlideIndex === index;
          const slideOffset = index - activeSlideIndex;
          const distanceFromCenter = Math.abs(slideOffset);
          const isPreceding = index < activeSlideIndex;

          return (
            <motion.div
              key={index}
              className="absolute w-[80px] aspect-[3/4] cursor-pointer"
              initial={false}
              animate={{
                x: slideOffset * 32,
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
                <div className="w-full h-full rounded-xl bg-neutral-400 dark:bg-neutral-800 border border-neutral-200/20 shadow-2xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-sm">
                  {index + 1}
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10"
                />
              )}
              <motion.div
                className="absolute -bottom-6 left-[-20px] right-[-20px] text-center text-[10px] font-semibold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis"
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
      <div className="mt-8 w-fit px-2 py-1 flex items-center gap-2 justify-center text-zinc-300 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm z-20">
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          disabled={activeSlideIndex === 0}
          className="p-1 cursor-pointer hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
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
              className={`rounded-full cursor-pointer h-1 border-0 p-0 transition-all duration-300 ${
                activeSlideIndex === index
                  ? "w-4 bg-white"
                  : "w-1 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next slide"
          disabled={activeSlideIndex === images.length - 1}
          className="p-1 cursor-pointer hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors border-0 bg-transparent text-neutral-300 hover:text-white"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});
