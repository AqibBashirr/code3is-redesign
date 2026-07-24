"use client";

import Button from "@/components/Buttons/Button";
import { Arrow2 } from "@/components/icons";
import { cn } from "@/constants/utils";

import type { CarouselControlProps } from "../types";

interface CarouselNextProps extends CarouselControlProps {
  canGoNext: boolean;
  totalSlides:number;
}

export default function CarouselNext({
  onClick,
  disabled,
  totalSlides,
  variant = "desktop",
  canGoNext,
  className,

  label = "Next",
}: CarouselNextProps) {
  
  if (totalSlides <= 1) {
    return null;
  }
  const isDisabled = disabled ?? !canGoNext;

  if (variant === "mobile") {
    return (
      <button
        type="button"
        aria-label="Next Slide"
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          `
          absolute
          right-0
          top-1/2
          z-30
          flex
          h-8
          w-8
          translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded
          bg-[#1a1c18]
          shadow-md
          transition-all
          duration-300
          disabled:cursor-not-allowed
          disabled:opacity-30
          `,
          className,
        )}
      >
        <Arrow2 className="w-3 text-highlight-text-color" />
      </button>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant="dark"
      arrow={false}
      className={cn(
        `
        capitalize
        disabled:cursor-not-allowed
        disabled:opacity-80
        `,
        className,
      )}
    >
      {label}
    </Button>
  );
}
