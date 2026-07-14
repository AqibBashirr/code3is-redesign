import Image from "next/image";
import { CldImageProps } from "next-cloudinary";
import { Media } from "@/types/payload-types";
import CldImageWrapper from "./CldImageWrapper";

const SHIMMER_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88P9fAAn0AulS9mYMAAAAAElFTkSuQmCC";

type ImageVariant =
  | "default"
  | "hero"
  | "card"
  | "avatar"
  | "logo"
  | "thumbnail"
  | "gallery";

export interface AdvanceImageProps {
  src: string | Media | null | undefined;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallback?: string;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  variant?: ImageVariant;
  quality?: CldImageProps["quality"];
  crop?: CldImageProps["crop"];
  gravity?: CldImageProps["gravity"];
  format?: CldImageProps["format"];
  dpr?: CldImageProps["dpr"];
}

const variants: Record<
  ImageVariant,
  {
    quality: NonNullable<CldImageProps["quality"]>;
    crop: NonNullable<CldImageProps["crop"]>;
    gravity: NonNullable<CldImageProps["gravity"]>;
    sizes: string;
  }
> = {
  default: {
    quality: "auto:good",
    crop: "fill",
    gravity: "auto",
    sizes: "100vw",
  },
  hero: {
    quality: "auto:best",
    crop: "fill",
    gravity: "auto",
    sizes: "100vw",
  },
  card: {
    quality: "auto:good",
    crop: "fill",
    gravity: "auto",
    sizes: "(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw",
  },
  avatar: {
    quality: "auto:good",
    crop: "thumb",
    gravity: "face",
    sizes: "120px",
  },
  logo: {
    quality: "100",
    crop: "fit",
    gravity: "auto",
    sizes: "200px",
  },
  thumbnail: {
    quality: "auto:eco",
    crop: "fill",
    gravity: "auto",
    sizes: "200px",
  },
  gallery: {
    quality: "auto:good",
    crop: "fill",
    gravity: "auto",
    sizes: "(max-width:768px) 100vw,(max-width:1200px) 50vw,25vw",
  },
};

interface ResolvedImage {
  optimizedSrc: string;
  resolvedAlt: string;
  isCloudinary: boolean;
  isGoogle: boolean;
  isSvg: boolean;
}

function resolveImage(
  src: string | Media | null | undefined,
  alt?: string,
  fallback = "/images/hero/6.webp",
): ResolvedImage {
  let optimizedSrc = fallback;
  let resolvedAlt = alt || "Code3 Innovative Solutions Asset";

  let isCloudinary = false;
  let isGoogle = false;
  let isSvg = false;

  if (!src) {
    return {
      optimizedSrc,
      resolvedAlt,
      isCloudinary,
      isGoogle,
      isSvg,
    };
  }

  let workingUrl = "";

  // Payload Media
  if (typeof src === "object" && src !== null) {
    const media = src as Media;

    resolvedAlt = alt || media.alt || resolvedAlt;

    if (media.cloudinary?.public_id) {
      return {
        optimizedSrc: media.cloudinary.public_id,
        resolvedAlt,
        isCloudinary: true,
        isGoogle: false,
        isSvg: media.url?.toLowerCase().endsWith(".svg") ?? false,
      };
    }

    workingUrl = media.url || fallback;
  }
  // String
  else {
    workingUrl = src;
  }

  if (!workingUrl.trim()) {
    return {
      optimizedSrc,
      resolvedAlt,
      isCloudinary,
      isGoogle,
      isSvg,
    };
  }

  optimizedSrc = workingUrl;

  isSvg = optimizedSrc.split("?")[0].toLowerCase().endsWith(".svg");

  // Local Payload API
  if (optimizedSrc.startsWith("/api/media/file/")) {
    isCloudinary = false;
  }
  // Cloudinary Public ID
  else if (!optimizedSrc.startsWith("/") && !optimizedSrc.startsWith("http")) {
    isCloudinary = true;
  }

  isGoogle = optimizedSrc.includes("googleusercontent.com");

  if (isGoogle && !optimizedSrc.includes("=")) {
    optimizedSrc += "=w1200-rw";
  }

  return {
    optimizedSrc,
    resolvedAlt,
    isCloudinary,
    isGoogle,
    isSvg,
  };
}

export default function AdvanceImage({
  src,
  alt,
  width = 400,
  height = 300,
  fill = false,
  className = "",
  fallback = "/images/hero/6.webp",
  variant = "default",
  quality,
  format = "auto",
  crop,
  gravity,
  sizes,
  loading,
  fetchPriority,
  dpr = "auto",
  priority = false,
  ...props
}: AdvanceImageProps) {
  const image = resolveImage(src, alt, fallback);
  const settings = variants[variant];
// console.log(src)
  const finalQuality = quality ?? settings.quality;
  const finalCrop = crop ?? settings.crop;
  const finalGravity = gravity ?? settings.gravity;
  const finalSizes = sizes ?? settings.sizes;

  if (!image.optimizedSrc) {
    return (
      <Image
        src={fallback}
        alt={image.resolvedAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={className}
        priority={priority}
        sizes={finalSizes}
      />
    );
  }

  // -----------------------------
  // Cloudinary Image
  // -----------------------------
  if (image.isCloudinary) {
    return (
      <CldImageWrapper
        src={image.optimizedSrc}
        alt={image.resolvedAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={className}
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        sizes={finalSizes}
        format={format}
        quality={finalQuality}
        crop={finalCrop}
        gravity={finalGravity}
        dpr={dpr}
        placeholder={image.isSvg ? undefined : "blur"}
        blurDataURL={image.isSvg ? undefined : SHIMMER_BLUR}
        {...props}
      />
    );
  }

  // -----------------------------
  // Next.js Image
  // -----------------------------
  return (
    <Image
      src={image.optimizedSrc}
      alt={image.resolvedAlt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={finalSizes}
      placeholder={image.isSvg ? undefined : "blur"}
      blurDataURL={image.isSvg ? undefined : SHIMMER_BLUR}
      referrerPolicy={image.isGoogle ? "no-referrer" : undefined}
      unoptimized={image.isGoogle || image.isSvg}
      {...props}
    />
  );
}
