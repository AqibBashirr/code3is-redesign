"use client";

import Button from "@/components/Buttons/Button";
import { Arrow2 } from "@/components/icons";
import { cn } from "@/constants/utils";

import type { CarouselControlProps } from "../types";

interface CarouselPreviousProps extends CarouselControlProps {
  canGoPrevious: boolean;
}

export default function CarouselPrevious({
  onClick,
  disabled,
  canGoPrevious,
  variant = "desktop",

  className,

  label = "Prev",
}: CarouselPreviousProps) {
  const isDisabled = disabled ?? !canGoPrevious;

  if (variant === "mobile") {
    return (
      <button
        type="button"
        aria-label="Previous Slide"
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          `
          absolute
          left-0
          top-1/2
          z-30
          flex
          h-8
          w-8
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded
          bg-white
          shadow-md
          transition-all
          duration-300
          disabled:cursor-not-allowed
          disabled:opacity-30
          `,
          className,
        )}
      >
        <Arrow2 className="w-3 rotate-180" />
      </button>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant="outline"
      arrow={false}
      className={cn(
        `
        border-[#909090]
        text-[#909090]
        hover:border-black
        hover:text-black
        capitalize
        disabled:cursor-not-allowed
        disabled:opacity-30
        `,
        className,
      )}
    >
      {label}
    </Button>
  );
}
