import { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

import { SITE_URL } from "@/lib/site";

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
  ["sitemap"],
  {
    tags: ["sitemap"],
  },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogs, caseStudies } = await getCachedSitemapData();

  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    // Main pages
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
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // HTML sitemap
    {
      url: `${SITE_URL}/sitemap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // Legal
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

  // Blog posts
  routes.push(
    ...blogs.docs
      .filter((blog) => blog.slug)
      .map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );

  // Case studies
  routes.push(
    ...caseStudies.docs
      .filter((caseStudy) => caseStudy.slug)
      .map((caseStudy) => ({
        url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
        lastModified: caseStudy.updatedAt ? new Date(caseStudy.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );

  return routes;
}
