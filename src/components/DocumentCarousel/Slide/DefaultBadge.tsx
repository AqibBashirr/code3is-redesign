"use client";

import { cn } from "@/constants/utils";

import type { CarouselDocument } from "../types";

interface DefaultBadgeProps {
  item: CarouselDocument;

  className?: string;
}

export default function DefaultBadge({ item, className }: DefaultBadgeProps) {
  if (!item.badge) {
    return null;
  }

  return (
    <div
      className={cn(
        `
        absolute
        left-4
        top-4
        z-20
        inline-flex
        items-center
        rounded-md
        border
        border-[#cfcfc8]
        bg-white
        px-3
        py-1
        text-[10px]
        font-medium
        uppercase
        tracking-[0.2em]
        text-[#2a2c26]
        shadow-sm
        md:left-6
        md:top-6
        `,
        className,
      )}
    >
      {item.badge}
    </div>
  );
}
