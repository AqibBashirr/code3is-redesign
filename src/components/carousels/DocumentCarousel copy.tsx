"use client";

import { useRef, useState, useMemo, useCallback, useEffect, Fragment } from "react";
import Image from "next/image";
import { Arrow2 } from "../icons";
import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import { CarouselDocument } from "@/app/(frontend)/our-work/page";
import { STACKS } from "@/constants/stacks";



export interface DocumentCarouselProps {
  items: CarouselDocument[];
  category?: string;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  
}

const IMAGE_HEIGHT = "h-[clamp(380px,47vw,676px)]";

export default function DocumentCarousel({
  items,
  category = "AGRICULTURE",
  loop = true,
  autoPlay = false,
  autoPlayDelay = 5000,
  showControls = true,
  showIndicators = true,
}: DocumentCarouselProps) {

  console.log(items);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const totalPages = useMemo(() => items.length, [items]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex === 0) {
      if (loop) scrollToIndex(totalPages - 1);
      return;
    }

    scrollToIndex(activeIndex - 1);
  }, [activeIndex, loop, scrollToIndex, totalPages]);

  const handleNext = useCallback(() => {
    if (activeIndex === totalPages - 1) {
      if (loop) scrollToIndex(0);
      return;
    }

    scrollToIndex(activeIndex + 1);
  }, [activeIndex, loop, scrollToIndex, totalPages]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const index = Math.round(
      container.scrollLeft / container.getBoundingClientRect().width,
    );

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex =
          current === totalPages - 1 ? (loop ? 0 : current) : current + 1;

        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: nextIndex * scrollRef.current.clientWidth,
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, loop, totalPages]);

  if (!items?.length) {
    return null;
  }

  return (
    <section className="w-full py-y">
      <div className="mx-auto w-full max-w-max px-x">
        <div className="relative">
          {/* Mobile Previous */}
          {showControls && (
            <Button
              type="button"
              onClick={handlePrev}
              disabled={!loop && activeIndex === 0}
              className="absolute left-0 top-1/2 z-30 inline-flex  -translate-x-1/2 -translate-y-1/2  bg-white md:hidden disabled:opacity-30 rotate-180 px-3 border border-[#909090]"
              aria-label="Previous Slide"
            ></Button>
          )}

          {/* Mobile Next */}
          {showControls && (
            <Button
              variant="dark"
              onClick={handleNext}
              disabled={!loop && activeIndex === totalPages - 1}
              className="absolute right-0 top-1/2 px-3 z-30 inline-flex translate-x-1/2 -translate-y-1/2   md:hidden disabled:opacity-30"
              aria-label="Next Slide"
            ></Button>
          )}

          {/* Card */}
          <div className="rounded-lg border border-[#cfcfc8] bg-[#f4f3ee] shadow-sm">
            {/* Only carousel should hide overflow */}
            <div className="overflow-hidden rounded-lg">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto scroll-smooth touch-pan-x"
              >
                {items.map((item, index) => (
                  <div key={item.id} className="w-full shrink-0 snap-center">
                    <div className="relative">
                      {item.urlLink && (
                        <ButtonLink
                          target="_blank"
                          href={item.urlLink}
                          variant="outline"
                          className="absolute bottom-4 text-[clamp(12px,1.5vw,16px)] right-3 z-20 hidden lg:inline-flex border-secondary-background text-secondary-background hover:border-black hover:text-black md:bottom-6 md:right-12"
                        >
                          Visit Site
                        </ButtonLink>
                      )}
                      {item.type && (
                        <div className="absolute hidden md:block right-3 top-4 z-20 border border-[#cfcfc8] bg-white px-6 py-2 text-[clamp(12px,1.5vw,16px)] font-medium uppercase tracking-[0.2em] text-[#2a2c26] md:right-12 md:top-6 rounded-[5px]">
                          {item.type}
                        </div>
                      )}
                      {item.stacks?.length !== 0 &&
                        item.stacks?.length !== undefined && (
                          <div className="absolute flex gap-[clamp(14px,1.6vw,18px)] right-6 bottom-4 z-20  py-1 text-[#2a2c26] md:left-12 md:bottom-6 max-w-[50%]">
                            {item.stacks.map((stack) => (
                              <Image
                                key={stack}
                                src={STACKS[stack as keyof typeof STACKS]}
                                alt={item.title}
                                width={39}
                                height={39}
                                className="w-[clamp(20px,4vw,39px)] h-auto"
                              />
                            ))}
                          </div>
                        )}
                      {item.title && (
                        <h3 className="absolute flex items-center justify-center left-6 bottom-4 z-20 max-w-[50%] text-[clamp(12px,1.5vw,16px)] leading-[calc(clamp(12px,1.5vw,16px)+12px)] text-[#212121] md:left-12 md:top-6 md:bottom-auto font-raleway font-medium tracking-[20%] uppercase">
                          {item.title}
                        </h3>
                      )}

                      <div
                        className={`flex items-center justify-center overflow-hidden ${IMAGE_HEIGHT}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt || item.title}
                          width={item.width || 1400}
                          height={item.height || 676}
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA for active slide only */}
        {items[activeIndex]?.urlLink && (
          <div className="mt-4 flex justify-center lg:hidden">
            <ButtonLink
              href={items[activeIndex].urlLink!}
              variant="outline"
              className="border-secondary-background text-secondary-background hover:border-black hover:text-black uppercase"
            >
              Visit Site
            </ButtonLink>
          </div>
        )}

        {(showControls || showIndicators) && (
          <div className="mt-6 flex items-center justify-center gap-6">
            {showControls && (
              <Button
                onClick={handlePrev}
                disabled={!loop && activeIndex === 0}
                variant="outline"
                arrow={false}
                className="hidden md:inline-flex border-[#909090] text-[#909090] hover:border-black hover:text-black capitalize disabled:opacity-30"
              >
                Prev
              </Button>
            )}

            {showIndicators && (
              <div className="flex items-center gap-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-10 bg-[#2a2c26]"
                        : "w-6 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {showControls && (
              <Button
                onClick={handleNext}
                disabled={!loop && activeIndex === totalPages - 1}
                variant="dark"
                arrow={false}
                className="hidden md:inline-flex capitalize disabled:opacity-80"
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
