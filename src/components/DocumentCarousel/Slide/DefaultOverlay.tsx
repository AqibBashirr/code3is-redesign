"use client";

import { cn } from "@/constants/utils";

import DefaultBadge from "./DefaultBadge";
import DefaultCategory from "./DefaultCategory";
import DefaultStacks from "./DefaultStacks";
import DefaultTitle from "./DefaultTitle";
import DefaultVisitButton from "./DefaultVisitButton";

import type { CarouselDocument, CarouselOverlayOptions } from "../types";

interface DefaultOverlayProps {
  item: CarouselDocument;

  overlay: CarouselOverlayOptions;

  className?: string;
}

const POSITION_CLASSES = {
  "top-left": "top-6 left-6 md:top-10 md:left-10",

  "top-right": "top-6 right-6 md:top-10 md:right-10",

  "bottom-left": "bottom-6 left-6 md:bottom-10 md:left-10",

  "bottom-right": "bottom-6 right-6 md:bottom-10 md:right-10",

  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
} as const;

export default function DefaultOverlay({
  item,

  overlay,

  className,
}: DefaultOverlayProps) {
  if (!overlay.enabled) {
    return null;
  }

  return (
    <>
      {/* ---------------- Badge ---------------- */}

      {overlay.badge && <DefaultBadge item={item} />}

      {/* ---------------- Category ---------------- */}

      {overlay.category && <DefaultCategory item={item} />}

      {/* ---------------- Gradient ---------------- */}

      {overlay.gradient && (
        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/60
            via-black/20
            to-transparent
            pointer-events-none
          "
        />
      )}

      {/* ---------------- Content ---------------- */}

      <div
        className={cn(
          `
          absolute
          z-20
          flex
          justify-between
          md:items-start
          md:flex-col
          `,
          POSITION_CLASSES[overlay.position ?? "bottom-left"],
          className,
        )}
      >
        {/* Title */}

        {(overlay.title || overlay.subtitle || overlay.description) && (
          <DefaultTitle item={item} overlay={overlay} />
        )}

        {/* Stacks */}
        <div className="flex flex-col md:flex-row justify-end md:justify-between md:items-center shrink-0 md:w-full">
          {overlay.stacks && (
            <DefaultStacks
              item={item}
              className=" gap-[clamp(13px,1.8vw,18px)] shrink-0"
            />
          )}

          {/* Desktop Visit Button */}

          {overlay.visitButton && (
            <DefaultVisitButton
              item={item}
              className=" hidden lg:inline-flex"
            />
          )}
        </div>
      </div>
    </>
  );
}
