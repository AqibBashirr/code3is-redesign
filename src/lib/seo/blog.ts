import { Metadata } from "next";

import { getBlog } from "@/lib/cache/blogs";
import { createMetadata } from "./index";
import { SITE_URL } from "@/lib/site";

export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return createMetadata({
    title: blog.meta?.title || blog.title,
    description: blog.meta?.description || blog.excerpt || "",
    canonical: `${SITE_URL}/blogs/${slug}`,
    image:
      typeof blog.meta?.image === "object" ? blog.meta.image : blog.heroImage,
    type: "article",
  });
}
