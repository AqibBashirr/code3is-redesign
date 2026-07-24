import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { getCaseStudy } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";

// FIX: Added the absolute URL helper to ensure social sharing works perfectly
function getAbsoluteUrl(url?: string | null): string {
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

  if (!url) return `${baseUrl}/default-og.jpg`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;

  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
}

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;

  const project = await getCaseStudy(name);

  if (!project) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  const title = project.metaTitle || project.title;

  const description = project.metaDescription || project.description || "";

  // 1. Extract the raw image URL from your CMS
  const rawImageUrl =
    typeof project.metaImage === "object" && project.metaImage?.url
      ? project.metaImage.url
      : typeof project.mainImage === "object" && project.mainImage?.url
        ? project.mainImage.url
        : null;

  // 2. Pass it through the helper to ensure it's absolute
  const image = getAbsoluteUrl(rawImageUrl);

  const canonical = `${SITE_URL}/case-studies/${project.slug}`;

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
      type: "article",

      images: [
        {
          url: image, // Guaranteed to be absolute now
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
      images: [image], // Guaranteed to be absolute now
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;

  const project = await getCaseStudy(name);

  if (!project) {
    notFound();
  }

  return <CaseStudyDetails data={project} />;
}
