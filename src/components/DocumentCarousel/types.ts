import type { RefObject } from "react";
import type { STACKS } from "@/constants/stacks";

/* -------------------------------------------------------------------------- */
/*                                   STACKS                                   */
/* -------------------------------------------------------------------------- */

export type StackKey = keyof typeof STACKS;

export interface CustomStack {
  id: string;
  icon: string;
  name?: string;
}

export type CarouselStack = StackKey | CustomStack;

/* -------------------------------------------------------------------------- */
/*                                     CTA                                    */
/* -------------------------------------------------------------------------- */

export interface CarouselCTA {
  href: string;
  label?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

/* -------------------------------------------------------------------------- */
/*                                  DOCUMENT                                  */
/* -------------------------------------------------------------------------- */

export interface CarouselDocument {
  id: string | number;

  title?: string;

  subtitle?: string;

  description?: string;

  image: string;

  alt?: string;

  width?: number;

  height?: number;

  badge?: string;

  category?: string;

  stacks?: readonly CarouselStack[];

  /**
   * New API
   */
  cta?: CarouselCTA;

  /**
   * Backward compatibility
   */
  urlLink?: string;

  ctaLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   IMAGE                                    */
/* -------------------------------------------------------------------------- */

export type ImageFit = "cover" | "contain";

export interface CarouselImageOptions {
  fit?: ImageFit;

  height?: string;

  className?: string;

  priorityFirstImage?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  OVERLAY                                   */
/* -------------------------------------------------------------------------- */

export type OverlayPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

export interface CarouselOverlayOptions {
  enabled?: boolean;

  title?: boolean;

  subtitle?: boolean;

  description?: boolean;

  category?: boolean;

  badge?: boolean;

  stacks?: boolean;

  visitButton?: boolean;

  gradient?: boolean;

  position?: OverlayPosition;
  
}

/* -------------------------------------------------------------------------- */
/*                                NAVIGATION                                  */
/* -------------------------------------------------------------------------- */

export type IndicatorVariant = "bars" | "dots" | "numbers";

export interface CarouselNavigationOptions {
  desktop?: boolean;

  mobile?: boolean;

  indicators?: boolean;

  indicatorVariant?: IndicatorVariant;
}

/* -------------------------------------------------------------------------- */
/*                                 BEHAVIOUR                                  */
/* -------------------------------------------------------------------------- */

export interface CarouselBehaviorOptions {
  loop?: boolean;

  autoPlay?: boolean;

  autoPlayDelay?: number;

  pauseOnHover?: boolean;

  initialSlide?: number;
}

/* -------------------------------------------------------------------------- */
/*                                   THEME                                    */
/* -------------------------------------------------------------------------- */

export interface CarouselTheme {
  background?: string;

  border?: string;

  controls?: string;

  indicators?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

export interface CarouselEvents {
  onSlideChange?: (index: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   SLOTS                                    */
/* -------------------------------------------------------------------------- */

// export interface CarouselRenderProps {
//   item: CarouselDocument;

//   index: number;

//   active: boolean;
// }
export interface CarouselOverlaySlotProps {
  item: CarouselDocument;
}

export interface CarouselSlots {
  Overlay?: (props: CarouselOverlaySlotProps) => React.ReactNode;
}

// export interface CarouselSlots {
//   Overlay?: (props: CarouselRenderProps) => React.ReactNode;
// }

/* -------------------------------------------------------------------------- */
/*                                   PROPS                                    */
/* -------------------------------------------------------------------------- */

export interface DocumentCarouselProps {
  items: CarouselDocument[];

  className?: string;

  wrapperClassName?: string;

  image?: CarouselImageOptions;

  overlay?: CarouselOverlayOptions;

  navigation?: CarouselNavigationOptions;

  behavior?: CarouselBehaviorOptions;

  theme?: CarouselTheme;

  slots?: CarouselSlots;

  events?: CarouselEvents;
}

/* -------------------------------------------------------------------------- */
/*                                 CONTROLS                                   */
/* -------------------------------------------------------------------------- */

export interface CarouselControlProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;

  disabled?: boolean;

  variant?: "desktop" | "mobile";

  className?: string;

  label?: string;
}

/* -------------------------------------------------------------------------- */
/*                               INDICATORS                                   */
/* -------------------------------------------------------------------------- */

export interface CarouselIndicatorsProps {
  totalSlides: number;

  activeIndex: number;

  onSelect: (index: number) => void;

  variant?: IndicatorVariant;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                USE CAROUSEL                                */
/* -------------------------------------------------------------------------- */

export interface UseCarouselProps {
  totalSlides: number;

  initialSlide?: number;

  loop?: boolean;

  autoPlay?: boolean;

  autoPlayDelay?: number;

  pauseOnHover?: boolean;

  onSlideChange?: (index: number) => void;
}



export interface UseCarouselReturn {
  scrollRef: RefObject<HTMLDivElement | null>;

  activeIndex: number;

  isFirstSlide: boolean;

  isLastSlide: boolean;

  canGoPrevious: boolean;

  canGoNext: boolean;

  next: () => void;

  prev: () => void;

  goTo: (index: number, behavior?: ScrollBehavior) => void;

  handleScroll: () => void;

  containerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  };
}
