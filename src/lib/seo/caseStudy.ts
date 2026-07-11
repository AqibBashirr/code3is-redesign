import { Metadata } from "next";

import { getCaseStudy } from "@/lib/cache/caseStudies";
import { createMetadata } from "./index";
import { SITE_URL } from "@/lib/site";

export async function generateCaseStudyMetadata(
  slug: string,
): Promise<Metadata> {
  const project = await getCaseStudy(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return createMetadata({
    title: project.metaTitle || project.title,
    description: project.metaDescription || project.description || "",
    canonical: `${SITE_URL}/case-studies/${slug}`,
    image:
      typeof project.metaImage === "object"
        ? project.metaImage
        : project.mainImage,
    type: "article",
  });
}
