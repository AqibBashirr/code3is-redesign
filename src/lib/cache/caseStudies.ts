import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import { CaseStudy } from "@/types/payload-types";

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  "use cache";

  cacheLife("max");
  cacheTag("case-studies");

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
}

export async function getCaseStudies(page: number) {
  "use cache";

  cacheLife("max");
  cacheTag("case-studies");

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
}
