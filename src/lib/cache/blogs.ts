import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Blog } from "@/types/payload-types";

// 1. Get Single Blog Article (Cached by Slug)
export async function getBlog(slug: string): Promise<Blog | undefined> {
  const fetchCached = unstable_cache(
    async () => {
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
    [`blog-detail-${slug}`],
    {
      tags: ["blogs", `blog-${slug}`],
    },
  );

  return fetchCached();
}

// 2. Get Blog Grid (Cached by Page Number)
export async function getBlogs(page: number) {
  const fetchCached = unstable_cache(
    async () => {
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
    [`blogs-list-page-${page}`],
    {
      tags: ["blogs"],
    },
  );

  return fetchCached();
}
