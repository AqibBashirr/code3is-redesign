import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import BlogPage from "@/features/blogs/components/BlogPage";
import { Blog } from "@/types/payload-types";

interface PageProps {
  params: Promise<{
    blogSlug: string;
  }>;
}

const getBlog = unstable_cache(
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
  ["blog-details"],
  {
    tags: ["blogs"],
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { blogSlug } = await params;

  const post = await getBlog(blogSlug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  const seoImage =
    typeof post.meta?.image === "object" && post.meta.image?.url
      ? post.meta.image.url
      : typeof post.heroImage === "object" && post.heroImage?.url
        ? post.heroImage.url
        : "/default-blog-og.jpg";

  const title = post.meta?.title || post.title;
  const description = post.meta?.description || post.excerpt || "";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { blogSlug } = await params;

  const post = await getBlog(blogSlug);

  if (!post) {
    notFound();
  }

  return <BlogPage Blog={post} />;
}
