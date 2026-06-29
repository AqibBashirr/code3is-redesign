"use client";

import { cn } from "@/constants/utils";

import type { CarouselDocument,CarouselOverlayOptions } from "../types";

interface DefaultTitleProps {
  item: CarouselDocument;
  overlay:CarouselOverlayOptions;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export default function DefaultTitle({
  item,
  overlay,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: DefaultTitleProps) {
  const {
    title,
    subtitle,
    description,
  } = item;

  if (!title && !subtitle && !description) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {overlay.title && title && (
        <h2
          className={cn(
            `
            max-w-full
            md:max-w-fit-content
            text-[clamp(12px,2vw,16px)]
            font-raleway
            leading-[calc(clamp(12px,2vw,16px)+12px)]
            font-semibold
            uppercase
            tracking-[40%]
            
            text-secondary-background
            `,
            titleClassName,
          )}
        >
          {title}
        </h2>
      )}

      {overlay.subtitle && subtitle && (
        <h3
          className={cn(
            `
            text-[clamp(16px,2vw,24px)]
            font-medium
            uppercase
            tracking-[0.08em]
            text-white/90
            `,
            subtitleClassName,
          )}
        >
          {subtitle}
        </h3>
      )}

      {overlay.description && description && (
        <p
          className={cn(
            `
            max-w-2xl
            text-[15px]
            leading-7
            text-white/85
            `,
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}