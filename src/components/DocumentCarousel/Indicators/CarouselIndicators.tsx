"use client";

import { cn } from "@/constants/utils";

import type { CarouselIndicatorsProps } from "../types";

export default function CarouselIndicators({
  totalSlides,

  activeIndex,

  onSelect,

  variant = "bars",

  className,
}: CarouselIndicatorsProps) {
  if (totalSlides <= 1) {
    return null;
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {Array.from({
          length: totalSlides,
        }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "bg-[#2A2C26] scale-110"
                : "bg-gray-300 hover:bg-gray-400",
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "numbers") {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <span className="font-medium">{activeIndex + 1}</span>

        <span className="text-gray-400">/</span>

        <span>{totalSlides}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({
        length: totalSlides,
      }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            index === activeIndex
              ? "w-10 bg-[#2A2C26]"
              : "w-6 bg-gray-300 hover:bg-gray-400",
          )}
        />
      ))}
    </div>
  );
}
