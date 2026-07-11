import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPage from "@/features/blogs/components/BlogPage";
import { getBlog } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{
    blogSlug: string;
  }>;
}

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

  const title = post.meta?.title || post.title;

  const description = post.meta?.description || post.excerpt || "";

  const image =
    typeof post.meta?.image === "object" && post.meta.image?.url
      ? post.meta.image.url
      : typeof post.heroImage === "object" && post.heroImage?.url
        ? post.heroImage.url
        : "/default-blog-og.jpg";

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}/blogs/${blogSlug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: image,
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
      images: [image],
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
