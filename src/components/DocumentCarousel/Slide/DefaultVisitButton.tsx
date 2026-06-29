"use client";

import ButtonLink from "@/components/Buttons/ButtonLink";
import { cn } from "@/constants/utils";

import type { CarouselDocument } from "../types";

interface DefaultVisitButtonProps {
  item: CarouselDocument;

  className?: string;

  label?: string;
}

export default function DefaultVisitButton({
  item,

  className,

  label,
}: DefaultVisitButtonProps) {
  const href = item.cta?.href ?? item.urlLink;

  if (!href) {
    return null;
  }

  return (
    <ButtonLink
      href={href}
      target={item.cta?.target ?? "_blank"}
      variant="outline"
      className={cn(
        `
        border-secondary-background
        text-secondary-background
        hover:border-black
        hover:text-black
        uppercase
        text-[clamp(12px,2vw,16px)]
        `,
        className,
      )}
    >
      {label ?? item.cta?.label ?? item.ctaLabel ?? "Visit Site"}
    </ButtonLink>
  );
}
