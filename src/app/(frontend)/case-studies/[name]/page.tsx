import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { getCaseStudy } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";
import { getCaseStudyImageSource, getOgImageUrl } from "@/lib/helpers/media";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: Promise<{
    name: string; // confirm this matches your actual folder segment name
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

  const imageSource = getCaseStudyImageSource(project);
  const image = getOgImageUrl(imageSource) || `${SITE_URL}/og/og-default.png`;

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
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      images: [
        {
          url: image,
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
      images: [image],
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

  const imageSource = getCaseStudyImageSource(project);
  const image = getOgImageUrl(imageSource) || `${SITE_URL}/og/og-default.png`;
  const canonical = `${SITE_URL}/case-studies/${project.slug}`;

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.metaTitle || project.title,
    description: project.metaDescription || project.description || "",
    image: image,
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
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
