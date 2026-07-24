import type { Metadata } from "next";
import { Media } from "@/types/payload-types";
import { SITE_URL } from "@/lib/site";

interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  image?: Media | string | null;
  fallbackImage?: string;
  type?: "website" | "article";
}

export function createMetadata({
  title,
  description,
  canonical,
  image,
  fallbackImage = "/og-default.png",
  type = "website",
}: SeoOptions): Metadata {
  let imageUrl = `${SITE_URL}${fallbackImage}`;

  if (typeof image === "string") {
    imageUrl = image;
  } else if (
    image &&
    typeof image === "object" &&
    "url" in image &&
    image.url
  ) {
    imageUrl = image.url.startsWith("http")
      ? image.url
      : `${SITE_URL}${image.url}`;
  }

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
