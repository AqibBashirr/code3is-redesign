import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPage from "@/features/blogs/components/BlogPage";
import { getBlog } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";
import { getBlogImageSource, getOgImageUrl } from "@/lib/helpers/media";
import JsonLd from "@/components/JsonLd";

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

  const imageSource = getBlogImageSource(post);
  const image = getOgImageUrl(imageSource) || `${SITE_URL}/og/og-default.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/blogs/${blogSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${blogSlug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { blogSlug } = await params;

  const post = await getBlog(blogSlug);

  if (!post) {
    notFound();
  }

  const imageSource = getBlogImageSource(post);
  const image = getOgImageUrl(imageSource) || `${SITE_URL}/og/og-default.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.meta?.title || post?.title,
    description: post?.meta?.description || post?.excerpt || "",
    image: image,
    author: {
      "@type": "Organization",
      name: "Code3 Innovative Solutions",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Code3 Innovative Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/company-logos/code3is-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blogSlug}`,
    },
    datePublished: post?.createdAt,
    dateModified: post?.updatedAt,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogPage Blog={post} />
    </>
  );
}
