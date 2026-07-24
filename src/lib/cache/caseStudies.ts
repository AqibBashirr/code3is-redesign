import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { CaseStudy } from "@/types/payload-types";

// ----------------------------------------------------
// 1. Get Single Case Study (Cached by Slug)
// ----------------------------------------------------
export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  const fetchCached = unstable_cache(
    async () => {
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
    // Unique key for each case study
    [`case-study-detail-${slug}`],
    {
      // Dynamic tags for Next.js On-Demand Revalidation
      tags: ["case-studies", `case-study-${slug}`],
    },
  );

  return fetchCached();
}

// ----------------------------------------------------
// 2. Get Case Studies Grid (Cached by Page Number)
// ----------------------------------------------------
export async function getCaseStudies(page: number) {
  const fetchCached = unstable_cache(
    async () => {
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
    // FIX: Unique key for each page number! (e.g., "case-studies-list-page-1")
    [`case-studies-list-page-${page}`],
    {
      // The general tag that your Payload hook will clear on publish
      tags: ["case-studies"],
    },
  );

  return fetchCached();
}
