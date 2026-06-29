"use client";

import Image from "next/image";

import { cn } from "@/constants/utils";

import DefaultOverlay from "./DefaultOverlay";

import type {
  CarouselDocument,
  CarouselImageOptions,
  CarouselOverlayOptions,
  CarouselSlots,
} from "../types";
import { useEffect, useState } from "react";

interface CarouselSlideProps {
  item: CarouselDocument;

  priority?: boolean;

  image: CarouselImageOptions;

  overlay: CarouselOverlayOptions;

  slots?: CarouselSlots;

  className?: string;
}

const fallbackSrc="/images/what-we-build/slides/harmain.png";

export default function CarouselSlide({
  item,

  priority = false,

  image,

  overlay,

  slots,

  className,
}: CarouselSlideProps) {
  const Overlay = slots?.Overlay;
 const [imgSrc, setImgSrc] = useState(item.image);

  return (
    <div className={cn("w-full shrink-0 snap-center", className)}>
      <div className="relative">
        {/* ---------------- Image ---------------- */}

        <div
          className={cn(
            "relative overflow-hidden",
            image.height,
            image.className,
          )}
        >
          <Image
            src={imgSrc}
            onError={() => {
              // Switch to the backup image when the primary source fails
              setImgSrc(fallbackSrc);
            }}
            alt={item.alt ?? item.title ?? ""}
            width={item.width ?? 1400}
            height={item.height ?? 676}
            priority={priority && image.priorityFirstImage}
            loading={priority && image.priorityFirstImage ? "eager" : "lazy"}
            className={cn(
              "h-full w-full",
              image.fit === "contain" ? "object-contain" : "object-cover",
            )}
          />
        </div>

        {/* ---------------- Overlay ---------------- */}

        {Overlay ? (
          <Overlay item={item} />
        ) : (
          <DefaultOverlay item={item} overlay={overlay} className="md:top-6 bottom-6 md:right-8 right-3 left-3 md:left-6" />
        )}
      </div>
    </div>
  );
}
