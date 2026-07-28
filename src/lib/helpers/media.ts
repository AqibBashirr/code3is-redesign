// lib/helpers/media.ts
import { getCldImageUrl } from "next-cloudinary";
import { Media } from "@/types/payload-types";
import { SITE_URL } from "@/lib/site";
import { getAbsoluteUrl } from "@/lib/url";

export type MediaField = Media | string | number | null | undefined;

interface ResolvedSource {
  kind: "cloudinary" | "local" | "none";
  value: string | null; // public_id for cloudinary, absolute URL for local
}

// Figures out what kind of image source we actually have, regardless of
// whether it's a populated Payload Media relation (Cloudinary or local
// upload), an unpopulated relation ID, or a raw string path/URL (e.g. a
// /public asset used as a fallback).
function resolveSource(media: MediaField): ResolvedSource {
  if (!media) return { kind: "none", value: null };

  // Populated Payload Media object
  if (typeof media === "object") {
    if (media.cloudinary?.public_id) {
      return { kind: "cloudinary", value: media.cloudinary.public_id };
    }
    if (media.url) {
      return { kind: "local", value: media.url };
    }
    return { kind: "none", value: null };
  }

  // Unpopulated relation ID (number) — nothing usable
  if (typeof media === "number") {
    return { kind: "none", value: null };
  }

  // Raw string — either a full URL or a /public path (e.g. "/images/x.webp")
  if (typeof media === "string" && media.trim()) {
    return { kind: "local", value: media };
  }

  return { kind: "none", value: null };
}

export function getBlogImageSource(post: {
  meta?: { image?: MediaField };
  heroImage?: MediaField;
}): ResolvedSource {
  const metaSource = resolveSource(post.meta?.image);
  if (metaSource.kind !== "none") return metaSource;
  return resolveSource(post.heroImage);
}

export function getCaseStudyImageSource(project: {
  metaImage?: MediaField;
  mainImage?: MediaField;
}): ResolvedSource {
  const metaSource = resolveSource(project.metaImage);
  if (metaSource.kind !== "none") return metaSource;
  return resolveSource(project.mainImage);
}

// Builds an absolute, 1200x630 OG/Twitter-ready URL from a resolved source.
// Cloudinary sources get a proper transform via next-cloudinary's SDK.
// Local sources (public folder assets, or non-Cloudinary uploads) are just
// absolute-ified as-is — no crop/resize available for those.
export function getOgImageUrl(source: ResolvedSource): string | null {
  if (source.kind === "cloudinary" && source.value) {
    return getCldImageUrl({
      src: source.value,
      width: 1200,
      height: 630,
      crop: "fill",
      gravity: "auto",
      quality: "auto:good",
      format: "auto",
    });
  }

  if (source.kind === "local" && source.value) {
    return getAbsoluteUrl(source.value) || `${SITE_URL}${source.value}`;
  }

  return null;
}
