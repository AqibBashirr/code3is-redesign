import { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { getCaseStudy } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";

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

  const image =
    typeof project.metaImage === "object" && project.metaImage?.url
      ? project.metaImage.url
      : typeof project.mainImage === "object" && project.mainImage?.url
        ? project.mainImage.url
        : `${SITE_URL}/default-og.jpg`;

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
