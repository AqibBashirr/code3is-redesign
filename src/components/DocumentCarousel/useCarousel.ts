"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { UseCarouselProps, UseCarouselReturn } from "./types";

export default function useCarousel({
  totalSlides,

  initialSlide = 0,

  loop = false,

  autoPlay = false,

  autoPlayDelay = 5000,

  pauseOnHover = true,

  onSlideChange,
}: UseCarouselProps): UseCarouselReturn {
  /* -------------------------------------------------------------------------- */
  /*                                   REFS                                     */
  /* -------------------------------------------------------------------------- */

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const activeIndexRef = useRef(initialSlide);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const intervalRef = useRef<number | null>(null);

  const ignoreScrollRef = useRef(false);

  const hoverRef = useRef(false);

  const touchRef = useRef(false);

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */

  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const isFirstSlide = activeIndex <= 0;

  const isLastSlide = totalSlides <= 1 || activeIndex >= totalSlides - 1;
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /* -------------------------------------------------------------------------- */
  /*                              SCROLL TO INDEX                               */
  /* -------------------------------------------------------------------------- */

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;

      if (!container) return;

      let nextIndex = index;

      if (loop) {
        if (nextIndex < 0) {
          nextIndex = totalSlides - 1;
        }

        if (nextIndex >= totalSlides) {
          nextIndex = 0;
        }
      } else {
        nextIndex = Math.max(0, Math.min(nextIndex, totalSlides - 1));
      }

      ignoreScrollRef.current = true;

      activeIndexRef.current = nextIndex;

      container.scrollTo({
        left: nextIndex * container.clientWidth,
        behavior,
      });
    },
    [loop, totalSlides],
  );

  /* -------------------------------------------------------------------------- */
  /*                                   NEXT                                     */
  /* -------------------------------------------------------------------------- */

  const next = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  /* -------------------------------------------------------------------------- */
  /*                                  PREV                                      */
  /* -------------------------------------------------------------------------- */

  const prev = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  /* -------------------------------------------------------------------------- */
  /*                              HANDLE SCROLL                                 */
  /* -------------------------------------------------------------------------- */

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);

    if (ignoreScrollRef.current) {
      ignoreScrollRef.current = false;
    }

    if (index === activeIndexRef.current) {
      return;
    }

    activeIndexRef.current = index;

    setActiveIndex(index);

    onSlideChange?.(index);
  }, [onSlideChange]);

  /* -------------------------------------------------------------------------- */
  /*                          INITIAL POSITION                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    requestAnimationFrame(() => {
      goTo(initialSlide, "auto");
    });
  }, [goTo, initialSlide]);
  /* -------------------------------------------------------------------------- */
  /*                                 AUTOPLAY                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) {
      return;
    }

    const startAutoplay = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        if (pauseOnHover && hoverRef.current) {
          return;
        }

        if (touchRef.current) {
          return;
        }

        next();
      }, autoPlayDelay);
    };

    startAutoplay();

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, autoPlayDelay, pauseOnHover, next, totalSlides]);

  /* -------------------------------------------------------------------------- */
  /*                             RESIZE OBSERVER                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        goTo(activeIndexRef.current, "auto");
      });
    });

    resizeObserverRef.current.observe(container);

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [goTo]);

  /* -------------------------------------------------------------------------- */
  /*                           CONTAINER EVENTS                                 */
  /* -------------------------------------------------------------------------- */

  const containerProps = useMemo(
    () => ({
      onMouseEnter() {
        hoverRef.current = true;
      },

      onMouseLeave() {
        hoverRef.current = false;
      },

      onTouchStart() {
        touchRef.current = true;
      },

      onTouchEnd() {
        touchRef.current = false;
      },
    }),
    [],
  );


const canGoPrevious = loop || !isFirstSlide;

const canGoNext = loop || !isLastSlide;
  /* -------------------------------------------------------------------------- */
  /*                                  RETURN                                    */
  /* -------------------------------------------------------------------------- */

 return {
   scrollRef,

   activeIndex,

   isFirstSlide,

   isLastSlide,

   canGoPrevious,

   canGoNext,

   next,

   prev,

   goTo,

   handleScroll,

   containerProps,
 };
}
