import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Blog } from "@/types/payload-types";


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
    // FIX: Unique key for each blog
    [`blog-detail-${slug}`],
    {
      // FIX: Dynamic tags for Next.js On-Demand Revalidation
      tags: ["blogs", `blog-${slug}`],
    },
  );

  return fetchCached();
}

// ----------------------------------------------------
// 2. Get Blog Grid (Cached by Page Number)
// ----------------------------------------------------
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
    // FIX: Unique key for each page number! (e.g., "blogs-list-page-1")
    [`blogs-list-page-${page}`],
    {
      // We only need the general "blogs" tag here.
      // If a new blog is published, it clears all paginated lists so the new post appears.
      tags: ["blogs"],
    },
  );

  return fetchCached();
}
