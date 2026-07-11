import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import { CaseStudy } from "@/types/payload-types";

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
  ["case-study-detail"],
  {
    tags: ["case-studies"],
  },
);

const getCachedCaseStudies = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({
      config: configPromise,
    });

    return payload.find({
      collection: "case-studies",
      page,
      limit: 9,
      depth: 1,
      sort: "number",

      select: {
        id: true,
        slug: true,
        title: true,
        titleHighlight: true,
        description: true,
        logo: true,
        number: true,
      },
    });
  },
  ["case-studies-list"],
  {
    tags: ["case-studies"],
  },
);

export async function getCaseStudy(slug: string) {
  return getCachedCaseStudy(slug);
}

export async function getCaseStudies(page: number) {
  return getCachedCaseStudies(page);
}
