import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import { Blog } from "@/types/payload-types";

export async function getBlog(slug: string): Promise<Blog | undefined> {
  "use cache";

  cacheLife("max");
  cacheTag("blogs");

  const payload = await getPayload({
    config: configPromise,
  });

  const { docs } = await payload.find({
    collection: "blogs",
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return docs[0] as Blog | undefined;
}

export async function getBlogs(page: number) {
  "use cache";

  cacheLife("max");
  cacheTag("blogs");

  const payload = await getPayload({
    config: configPromise,
  });

  return payload.find({
    collection: "blogs",
    page,
    limit: 9,
    depth: 1,
    sort: "-createdAt",

    select: {
      id: true,
      slug: true,
      title: true,
      heroImage: true,
      createdAt: true,
      excerpt: true,
    },
  });
}
