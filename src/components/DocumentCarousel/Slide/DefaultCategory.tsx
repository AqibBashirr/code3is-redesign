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
        ${position === "left" ? "left-[clamp(24px,6.2vw,88px)]" : "right-[clamp(24px,6.2vw,88px)]"}
        top-[clamp(28px,2.6vw,36px)]
        w-fit
        z-20
        border-[1.5px]
        border-offBlack-color
        rounded-[5px]
        px-5
        leading-[calc(var(--font-size-form-text-size)*12px)]
        py-1
        font-raleway
        text-form-text-size
        font-semibold
        uppercase
        hidden md:block
        tracking-[20%]
        text-offBlack-color
         md:right-[clamp(24px,6.2vw,88px)] 
         md:top-[clamp(28px,2.6vw,36px)]
        `,
        className,
      )}
    >
      {item.category}
    </div>
  );
}
