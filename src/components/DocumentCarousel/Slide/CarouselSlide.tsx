


import { cn } from "@/constants/utils";

import DefaultOverlay from "./DefaultOverlay";

import type {
  CarouselDocument,
  CarouselImageOptions,
  CarouselOverlayOptions,
  CarouselSlots,
} from "../types";

import AdvanceImage from "@/components/AdvancedImage";

interface CarouselSlideProps {
  item: CarouselDocument;

  priority?: boolean;

  image: CarouselImageOptions;

  overlay: CarouselOverlayOptions;

  slots?: CarouselSlots;

  className?: string;
}

// const fallbackSrc="/images/what-we-build/slides/harmain.png";

export default function CarouselSlide({
  item,

  priority = false,

  image,

  overlay,

  slots,

  className,
}: CarouselSlideProps) {
  const Overlay = slots?.Overlay;

  return (
    <div className={cn("w-full shrink-0 snap-center", className)}>
      <div className="relative">
        {/* ---------------- Image ---------------- */}

        <div
          className={cn(
            "relative overflow-hidden",
            `h-auto md:${image.height}`,
            image.className,
          )}
        >
          <AdvanceImage
            src={item.image}
            // onError={() => {
            //   // Switch to the backup image when the primary source fails
            //   setImgSrc(fallbackSrc);
            // }}
            alt={item.alt ?? item.title ?? ""}
            width={item.width ?? 1400}
            height={item.height ?? 676}
            priority={priority && image.priorityFirstImage}
            loading={priority && image.priorityFirstImage ? "eager" : "lazy"}
            className={cn(
              "h-full w-full",
              image.fit === "contain" ? "object-contain" : "object-contain lg:object-cover",
            )}
          />
        </div>

        {/* ---------------- Overlay ---------------- */}

        {Overlay ? (
          <Overlay item={item} />
        ) : (
          <DefaultOverlay
            item={item}
            overlay={overlay}
            className="md:top-[clamp(28px,2.6vw,36px)]  md:bottom-[clamp(28px,2.6vw,36px)]  bottom-[clamp(28px,2.6vw,36px)] md:right-[clamp(24px,6.2vw,88px)] right-[clamp(24px,6.2vw,88px)]  md:left-[clamp(24px,6.2vw,88px)] left-[clamp(24px,6.2vw,88px)]"
          />
        )}
      </div>
    </div>
  );
}
