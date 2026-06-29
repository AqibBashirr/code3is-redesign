"use client";

import { cn } from "@/constants/utils";

import type { CarouselDocument } from "../types";


interface DefaultCategoryProps {
  item: CarouselDocument;

  className?: string;

  position?: "left" | "right";
}

export default function DefaultCategory({
  item,
  className,
  position='right'
}: DefaultCategoryProps) {
  if (!item.category) {
    return null;
  }

  return (
    <div
      className={cn(
        `
        absolute
        ${position==='left'?'left-4':'right-4'}
        top-4
        w-fit
        z-20
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
        md:right-6
        md:top-6
        `,
        className,
      )}
    >
      {item.category}
    </div>
  );
}
