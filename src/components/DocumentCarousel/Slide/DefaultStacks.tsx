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
}

export default function DefaultStacks({
  item,
  className,
  iconClassName,
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
        // Defensive check: If depth wasn't deep enough, Payload returns just the ID string
        if (typeof stack === "string") {
          console.warn(
            `Stack relationship not fully populated. Found ID: ${stack}`,
          );
          return null;
        }

        // Use the full Media object or icon string
        const icon = stack.icon;
        const altText = stack.name || "technology stack";

        // If icon is missing, show stack name as text fallback
        if (!icon) {
          console.warn(`Missing icon image for stack: ${stack.name || stack.id}`);
          return (
            <div
              key={stack.id || `stack-${index}`}
              className={cn(
                "flex items-center justify-center px-2 py-1 rounded-md bg-offBlack-color text-white text-xs font-medium",
                iconClassName,
              )}
              title={altText}
            >
              {stack.name || stack.id}
            </div>
          );
        }

        return (
          <div
            key={stack.id || `stack-${index}`}
            title={altText}
            className="group relative"
          >
            <AdvanceImage
              src={icon}
              alt={altText}
              width={40}
              height={40}
              className={cn(
                "h-auto w-[clamp(20px,3vw,39px)] shrink-0 object-contain",
                iconClassName,
              )}
            />
            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
              {altText}
            </div>
          </div>
        );
      })}
    </div>
  );
}
