"use client";

import { useCallback, useMemo } from "react";
import { cn } from "@/constants/utils";
import ButtonLink from "../Buttons/ButtonLink";
import CarouselSlide from "./Slide/CarouselSlide";
import { CarouselPrevious, CarouselNext } from "./controls";
import { CarouselIndicators } from "./Indicators";
import useCarousel from "./useCarousel";

import {
  DEFAULT_BEHAVIOR,
  DEFAULT_IMAGE,
  DEFAULT_NAVIGATION,
  DEFAULT_OVERLAY,
} from "./defaults";

import type { DocumentCarouselProps } from "./types";
import { Reveal } from "../Reveal";

export default function DocumentCarousel({
  items,
  className,
  wrapperClassName,
  image,
  overlay,
  navigation,
  behavior,
  theme,
  slots,
  events,
}: DocumentCarouselProps) {



  /* -------------------------------------------------------------------------- */
  /*                              MERGED CONFIG                                 */
  /* -------------------------------------------------------------------------- */

  const mergedImage = useMemo(
    () => ({
      ...DEFAULT_IMAGE,
      ...image,
    }),
    [image],
  );

  const mergedOverlay = useMemo(
    () => ({
      ...DEFAULT_OVERLAY,
      ...overlay,
    }),
    [overlay],
  );

  const mergedNavigation = useMemo(
    () => ({
      ...DEFAULT_NAVIGATION,
      ...navigation,
    }),
    [navigation],
  );

  const mergedBehavior = useMemo(
    () => ({
      ...DEFAULT_BEHAVIOR,
      ...behavior,
    }),
    [behavior],
  );

  /* -------------------------------------------------------------------------- */
  /*                                CAROUSEL                                    */
  /* -------------------------------------------------------------------------- */

  // Destructure everything immediately to avoid ESLint ref false-positives
  const {
    activeIndex,
    scrollRef,
    handleScroll,
    containerProps,
    prev,
    next,
    canGoPrevious,
    canGoNext,
    goTo,
  } = useCarousel({
    totalSlides: items?.length || 0,
    initialSlide: mergedBehavior.initialSlide,
    loop: mergedBehavior.loop,
    autoPlay: mergedBehavior.autoPlay,
    autoPlayDelay: mergedBehavior.autoPlayDelay,
    pauseOnHover: mergedBehavior.pauseOnHover,
    onSlideChange: events?.onSlideChange,
  });

  const currentItem = items?.[activeIndex];

  /* -------------------------------------------------------------------------- */
  /*                          KEYBOARD NAVIGATION                               */
  /* -------------------------------------------------------------------------- */

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    },
    [prev, next], // Updated dependency array to use the destructured functions
  );

  if (!items?.length) {
    return null;
  }

  return (
    <Reveal className={cn("w-full", className)} threshold={0.3}>
      <div className={cn("relative mx-auto w-full", wrapperClassName)}>
        {/* ---------------- Mobile Controls ---------------- */}
        {mergedNavigation.mobile && (
          <>
            <div className="lg:hidden">
              <CarouselPrevious
                totalSlides={items.length}
                variant="mobile"
                onClick={prev}
                canGoPrevious={canGoPrevious}
              />
            </div>

            <div className="lg:hidden">
              <CarouselNext
                totalSlides={items.length}
                variant="mobile"
                onClick={next}
                canGoNext={canGoNext}
              />
            </div>
          </>
        )}

        {/* ---------------- Carousel ---------------- */}
        <div
          className={cn(
            "overflow-hidden rounded-lg border border-[#D8D8D8] bg-[#F4F3EE] shadow-sm",
            theme?.background,
            theme?.border,
          )}
        >
          <div
            {...containerProps}
            ref={scrollRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className=" scrollbar-none flex snap-x snap-mandatory overflow-x-auto scroll-smooth touch-auto outline-none"
          >
            {items.map((item, index) => (
              <CarouselSlide
                key={item.id}
                item={item}
                image={mergedImage}
                overlay={mergedOverlay}
                slots={slots}
                priority={index === 0}
              />
            ))}
          </div>
        </div>

        {/* ---------------- Mobile CTA ---------------- */}
        {mergedOverlay.visitButton &&
          (currentItem?.cta?.href || currentItem?.urlLink) && (
            <div className="mt-5 flex justify-center lg:hidden">
              <ButtonLink
                href={currentItem.cta?.href ?? currentItem.urlLink!}
                target={currentItem.cta?.target ?? "_blank"}
                variant="outline"
                className=" border-secondary-background text-secondary-background hover:border-black hover:text-black uppercase text-[clamp(12px,2vw,16px)]"
              >
                {currentItem.cta?.label ?? currentItem.ctaLabel ?? "Visit Site"}
              </ButtonLink>
            </div>
          )}

        {/* ---------------- Bottom Navigation ---------------- */}
        {(mergedNavigation.desktop || mergedNavigation.indicators) && (
          <div className="mt-6 flex items-center justify-center gap-6">
            {/* Previous */}
            {mergedNavigation.desktop && (
              <div className="hidden lg:block">
                <CarouselPrevious
                  totalSlides={items.length}
                  onClick={prev}
                  canGoPrevious={canGoPrevious}
                />
              </div>
            )}

            {/* Indicators */}
            {mergedNavigation.indicators && (
              <CarouselIndicators
                totalSlides={items.length}
                activeIndex={activeIndex}
                onSelect={goTo}
                variant={mergedNavigation.indicatorVariant}
              />
            )}

            {/* Next */}
            {mergedNavigation.desktop && (
              <div className="hidden lg:block">
                <CarouselNext
                  totalSlides={items.length}
                  onClick={next}
                  canGoNext={canGoNext}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}
