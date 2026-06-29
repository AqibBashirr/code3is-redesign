"use client";

import Image from "next/image";

import { STACKS } from "@/constants/stacks";
import { cn } from "@/constants/utils";

import type { CarouselDocument, CarouselStack, CustomStack } from "../types";

interface DefaultStacksProps {
  item: CarouselDocument;

  className?: string;

  iconClassName?: string;
}

function isCustomStack(stack: CarouselStack): stack is CustomStack {
  return typeof stack !== "string";
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
        const custom = isCustomStack(stack);

        const icon = custom ? stack.icon : (STACKS[stack] ?? null);

        if (!icon) {
          console.warn(`Unknown stack: ${custom ? stack.id : stack}`);

          return null;
        }

        const alt = custom ? (stack.name ?? stack.id) : stack;

        const key = custom ? stack.id : `${stack}-${index}`;

        return (
          <Image
            key={key}
            src={icon}
            alt={alt}
            width={40}
            height={40}
            className={cn(
              `
              h-auto
              w-[clamp(20px,3vw,39px)]
              shrink-0
              object-contain
              `,
              iconClassName,
            )}
          />
        );
      })}
    </div>
  );
}
