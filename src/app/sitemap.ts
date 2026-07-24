import { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

import { SITE_URL } from "@/lib/site";

// Fetch and cache sitemap database records under the "sitemap" tag
const getCachedSitemapData = unstable_cache(
  async () => {
    const payload = await getPayload({
      config: configPromise,
    });

    const [blogs, caseStudies] = await Promise.all([
      payload.find({
        collection: "blogs",
        pagination: false,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),

      payload.find({
        collection: "case-studies",
        pagination: false,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ]);

    return { blogs, caseStudies };
  },
  ["sitemap-data-key"],
  {
    tags: ["sitemap"],
  },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogs, caseStudies } = await getCachedSitemapData();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/our-services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/our-work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  routes.push(
    ...blogs.docs.map((blog) => ({
      url: `${SITE_URL}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  routes.push(
    ...caseStudies.docs.map((project) => ({
      url: `${SITE_URL}/case-studies/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return routes;
}
