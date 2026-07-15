"use client";

import Image from "next/image";
import { cn } from "@/constants/utils";
import type { CarouselStack } from "../types";

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

        // Safely pull the URL from the populated media object or icon string
        const iconUrl = typeof stack.icon === "object" 
          ? stack.icon?.url 
          : typeof stack.icon === "string"
          ? stack.icon
          : null;
        const altText = stack.name || "technology stack";

        if (!iconUrl) {
          console.warn(`Missing icon image for stack: ${stack.name || stack.id}`);
          return null;
        }

        return (
          <Image
            key={stack.id || `stack-${index}`}
            src={iconUrl}
            alt={altText}
            width={40}
            height={40}
            className={cn(
              "h-auto w-[clamp(20px,3vw,39px)] shrink-0 object-contain",
              iconClassName,
            )}
          />
        );
      })}
    </div>
  );
}
