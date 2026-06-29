"use client";

import { createContext, useMemo, type ReactNode, type RefObject } from "react";

import type {
  CarouselBehaviorOptions,
  CarouselDocument,
  CarouselImageOptions,
  CarouselNavigationOptions,
  CarouselOverlayOptions,
  CarouselSlots,
  CarouselTheme,
} from "../types";

export interface CarouselContextValue {
  /* ---------------- Data ---------------- */

  items: CarouselDocument[];

  activeIndex: number;

  totalSlides: number;

  activeItem?: CarouselDocument;

  /* ---------------- State ---------------- */

  scrollRef: RefObject<HTMLDivElement | null>;

  /* ---------------- Navigation ---------------- */

  next(): void;

  prev(): void;

  goTo(index: number): void;

  /* ---------------- Config ---------------- */

  overlay: CarouselOverlayOptions;

  image: CarouselImageOptions;

  navigation: CarouselNavigationOptions;

  behavior: CarouselBehaviorOptions;

  theme?: CarouselTheme;

  slots?: CarouselSlots;
}

export const CarouselContext = createContext<CarouselContextValue | null>(null);

interface ProviderProps {
  value: CarouselContextValue;

  children: ReactNode;
}

export function CarouselProvider({ value, children }: ProviderProps) {
  /**
   * Prevent unnecessary rerenders of
   * every consumer.
   */
  const contextValue = useMemo(() => value, [value]);

  return (
    <CarouselContext.Provider value={contextValue}>
      {children}
    </CarouselContext.Provider>
  );
}
