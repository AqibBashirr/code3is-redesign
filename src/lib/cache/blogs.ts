import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import { Blog } from "@/types/payload-types";

const getCachedBlog = unstable_cache(
  async (slug: string): Promise<Blog | undefined> => {
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
  },
  ["blog-detail"],
  {
    tags: ["blogs"],
  },
);

const getCachedBlogs = unstable_cache(
  async (page: number) => {
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
  },
  ["blogs-list"],
  {
    tags: ["blogs"],
  },
);

export async function getBlog(slug: string) {
  return getCachedBlog(slug);
}

export async function getBlogs(page: number) {
  return getCachedBlogs(page);
}
