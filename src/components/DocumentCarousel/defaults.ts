import type {
  CarouselBehaviorOptions,
  CarouselImageOptions,
  CarouselNavigationOptions,
  CarouselOverlayOptions,
} from "./types";

export const DEFAULT_IMAGE: CarouselImageOptions = {
  fit: "cover",

  height: "h-[clamp(380px,47vw,676px)]",

  className: "",

  priorityFirstImage: true,
};

export const DEFAULT_OVERLAY: CarouselOverlayOptions = {
  enabled: true,

  title: true,

  subtitle: true,

  description: true,

  category: true,

  badge: true,

  stacks: true,

  visitButton: true,

  gradient: false,

  position: "bottom-left",
};

export const DEFAULT_NAVIGATION: CarouselNavigationOptions = {
  desktop: true,

  mobile: true,

  indicators: true,

  indicatorVariant: "bars",
};

export const DEFAULT_BEHAVIOR: CarouselBehaviorOptions = {
  loop: false,

  autoPlay: false,

  autoPlayDelay: 5000,

  pauseOnHover: true,

  initialSlide: 0,
};
