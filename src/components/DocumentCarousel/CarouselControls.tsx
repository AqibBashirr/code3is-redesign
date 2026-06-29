"use client";

import { memo } from "react";
import clsx from "clsx";

import Button from "../Buttons/Button";
import { Arrow2 } from "../icons";

export type CarouselControlsVariant = "desktop" | "mobile" | "minimal";

interface CarouselControlsProps {
  variant?: CarouselControlsVariant;

  loop?: boolean;

  activeIndex: number;

  totalSlides: number;

  showPrev?: boolean;

  showNext?: boolean;

  previousLabel?: string;

  nextLabel?: string;

  previousAriaLabel?: string;

  nextAriaLabel?: string;

  onPrevious(): void;

  onNext(): void;
}

function CarouselControls({
  variant = "desktop",

  loop = true,

  activeIndex,

  totalSlides,

  showPrev = true,

  showNext = true,

  previousLabel = "Prev",

  nextLabel = "Next",

  previousAriaLabel = "Previous Slide",

  nextAriaLabel = "Next Slide",

  onPrevious,

  onNext,
}: CarouselControlsProps) {
  const disablePrev = !loop && activeIndex === 0;

  const disableNext = !loop && activeIndex === totalSlides - 1;

  // --------------------------------------------
  // MOBILE FLOATING CONTROLS
  // --------------------------------------------

  if (variant === "mobile") {
    return (
      <>
        {showPrev && (
          <button
            type="button"
            aria-label={previousAriaLabel}
            disabled={disablePrev}
            onClick={onPrevious}
            className="
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
            md:hidden
          "
          >
            <Arrow2 className="w-3 rotate-180" />
          </button>
        )}

        {showNext && (
          <button
            type="button"
            aria-label={nextAriaLabel}
            disabled={disableNext}
            onClick={onNext}
            className="
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
            md:hidden
          "
          >
            <Arrow2 className="w-3 text-highlight-text-color" />
          </button>
        )}
      </>
    );
  }

  // --------------------------------------------
  // MINIMAL
  // --------------------------------------------

  if (variant === "minimal") {
    return (
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={disablePrev}
          aria-label={previousAriaLabel}
          className="rounded border px-3 py-2 disabled:opacity-30"
        >
          ←
        </button>

        <button
          onClick={onNext}
          disabled={disableNext}
          aria-label={nextAriaLabel}
          className="rounded border px-3 py-2 disabled:opacity-30"
        >
          →
        </button>
      </div>
    );
  }

  // --------------------------------------------
  // DESKTOP
  // --------------------------------------------

  return (
    <>
      {showPrev && (
        <Button
          onClick={onPrevious}
          disabled={disablePrev}
          variant="outline"
          arrow={false}
          className="hidden lg:inline-flex border-[#909090] text-[#909090] hover:border-black hover:text-black capitalize disabled:cursor-not-allowed disabled:opacity-30"
        >
          {previousLabel}
        </Button>
      )}

      {showNext && (
        <Button
          onClick={onNext}
          disabled={disableNext}
          variant="dark"
          arrow={false}
          className="hidden lg:inline-flex capitalize disabled:cursor-not-allowed disabled:opacity-80"
        >
          {nextLabel}
        </Button>
      )}
    </>
  );
}

export default memo(CarouselControls);
