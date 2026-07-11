import { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SITE_URL } from "@/lib/site";
import { cacheLife, cacheTag } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";


  cacheLife("max");
  cacheTag("blogs");
  cacheTag("case-studies");

  const payload = await getPayload({
    config: configPromise,
  });

  const [blogs, caseStudies] = await Promise.all([
    payload.find({
      collection: "blogs",
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    payload.find({
      collection: "case-studies",
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ]);

  return [
    // Static Pages
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/our-work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/our-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/case-study`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // {
    //   url: `${SITE_URL}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },

    // Blog Posts
    ...blogs.docs.map((blog) => ({
      url: `${SITE_URL}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Case Studies
    ...caseStudies.docs.map((project) => ({
      url: `${SITE_URL}/case-studies/${project.slug}`,
      lastModified: project.updatedAt
        ? new Date(project.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
