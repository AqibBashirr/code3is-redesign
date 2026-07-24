import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPage from "@/features/blogs/components/BlogPage";
import { getBlog } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";
import { getAbsoluteUrl } from "@/lib/url";
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

  // 1. Extract the raw image URL from your CMS
  const rawImageUrl =
    typeof post.meta?.image === "object" && post.meta.image?.url
      ? post.meta.image.url
      : typeof post.heroImage === "object" && post.heroImage?.url
        ? post.heroImage.url
        : null;

  // 2. Pass it through the helper, with a safe fallback to your default OG image
  // This prevents Twitter/LinkedIn cards from breaking if a blog has no cover image
  const image = getAbsoluteUrl(rawImageUrl) || `${SITE_URL}/og/og-default.jpg`;

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
      // Note: If your CMS provides publish dates, you can add `publishedTime: post.createdAt` here
      publishedTime: post.createdAt,
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

  // 3. Extract image again for the Schema (or handle it in a shared helper function)
  const rawImageUrl =
    typeof post.meta?.image === "object" && post.meta.image?.url
      ? post.meta.image.url
      : typeof post.heroImage === "object" && post.heroImage?.url
        ? post.heroImage.url
        : null;

  const image = getAbsoluteUrl(rawImageUrl) || `${SITE_URL}/og/og-default.jpg`;

  // 4. Generate BlogPosting Schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || "",
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
    // If your CMS returns a date, uncomment and map it like this:
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogPage Blog={post} />
    </>
  );
}
