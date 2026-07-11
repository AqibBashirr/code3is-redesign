import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { CaseStudy } from "@/types/payload-types";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

const getCachedCaseStudy = unstable_cache(
  async (slug: string): Promise<CaseStudy | undefined> => {
    const payload = await getPayload({
      config: configPromise,
    });

    const { docs } = await payload.find({
      collection: "case-studies",
      limit: 1,
      depth: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return docs[0] as CaseStudy | undefined;
  },
  ["case-study-details"],
  {
    tags: ["case-studies"],
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;

  const project = await getCachedCaseStudy(name);

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
        : "/default-og.jpg";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
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
  };
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;

  const project = await getCachedCaseStudy(name);

  if (!project) {
    notFound();
  }

  return <CaseStudyDetails data={project} />;
}
