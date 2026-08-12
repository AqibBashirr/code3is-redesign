"use client";

import { cn } from "@/constants/utils";
import type { CarouselStack } from "../types";
import AdvanceImage from "@/components/AdvancedImage";

interface DefaultStacksProps {
  item: {
    stacks?: CarouselStack[] | null;
  };
  className?: string;
  iconClassName?: string;
  showTextWhenNoIcon?: boolean;
}

export default function DefaultStacks({
  item,
  className,
  iconClassName,
  showTextWhenNoIcon = false,
}: DefaultStacksProps) {
  if (!item.stacks?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex shrink-0 flex-1 flex-wrap items-end md:items-center gap-3",
        className,
      )}
    >
      {item.stacks.map((stack, index) => {
        if (typeof stack === "string") {
          console.warn(
            `Stack relationship not fully populated. Found ID: ${stack}`,
          );
          return null;
        }

        const icon = stack.icon;
        const altText = stack.name || "technology stack";
        const key = stack.id || `stack-${index}`;

        // No image available
        if (!icon) {
          if (!showTextWhenNoIcon) {
            return null;
          }

          return (
            <div
              key={key}
              className={cn(
                "flex items-center justify-center px-2 py-1 rounded-md bg-offblack text-white text-xs font-medium",
                iconClassName,
              )}
              title={altText}
            >
              {altText}
            </div>
          );
        }

        // Image available
        return (
          <div key={key} title={altText} className="group relative">
            <AdvanceImage
              src={icon}
              alt={altText}
              format="svg"
              width={40}
              height={40}
              className={cn(
                "h-auto w-[clamp(20px,3vw,39px)] shrink-0 object-contain",
                iconClassName,
              )}
            />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-offBlack-color/60 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
              {altText}
            </div>
          </div>
        );
      })}
    </div>
  );
}
