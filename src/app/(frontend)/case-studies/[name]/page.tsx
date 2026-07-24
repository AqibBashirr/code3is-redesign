import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { getCaseStudy } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";
import { getAbsoluteUrl } from "@/lib/url";
import JsonLd from "@/components/JsonLd"; // Added JSON-LD import

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

  // 2. Pass it through the helper with a safe fallback
  // This ensures social cards don't break if a project lacks a cover image
  const image = getAbsoluteUrl(rawImageUrl) || `${SITE_URL}/og/og-default.png`;

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
          url: image, // Guaranteed to be absolute and valid now
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
      images: [image], // Guaranteed to be absolute and valid now
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;

  const project = await getCaseStudy(name);

  if (!project) {
    notFound();
  }

  // 3. Extract image again for the Schema
  const rawImageUrl =
    typeof project.metaImage === "object" && project.metaImage?.url
      ? project.metaImage.url
      : typeof project.mainImage === "object" && project.mainImage?.url
        ? project.mainImage.url
        : null;

  const image = getAbsoluteUrl(rawImageUrl) || `${SITE_URL}/og/og-default.png`;
  const canonical = `${SITE_URL}/case-studies/${project.slug}`;

  // 4. Generate Schema for Google
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.metaTitle || project.title,
    description: project.metaDescription || project.description || "",
    image: image,
    author: {
      "@type": "Organization",
      name: "Code3 Innovative Solutions",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Code3 Innovative Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/company-logos/code3is-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <CaseStudyDetails data={project} />
    </>
  );
}
