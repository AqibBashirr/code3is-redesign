import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogsPage from "@/features/blogs/components/BlogsPage";
import { Blog } from "@/types/payload-types";
import { getBlogs } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { getAbsoluteUrl } from "@/lib/url";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  // Optimized: Moved away from generic "Our Blog" to capture search intent for your services
  const title =
    currentPage > 1
      ? `Blog & Insights - Page ${currentPage}`
      : "Agency Blog: Web Apps, Branding & SEO Insights";

  // Optimized: Aligned with your 4 pillars (Build, Design, Grow, Scale)
  const description =
    "Read the latest from Code3IS on custom web apps, UI/UX design, performance marketing, automation, and scaling your digital presence.";

  const canonical =
    currentPage > 1
      ? `${SITE_URL}/blogs?page=${currentPage}`
      : `${SITE_URL}/blogs`;

  // Optimized: Changed to match the /og/og-default.png used in your layout.tsx to prevent missing file 404s
  const fallbackImage = getAbsoluteUrl("/og/og-default.png");

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: fallbackImage,
          width: 1200,
          height: 630,
          alt: "Code3IS Blog & Insights",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fallbackImage],
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

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  const data = await getBlogs(currentPage);

  if (!data.docs.length) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blogs#blog`,
    name: "Code3IS Blog",
    description:
      "Expert insights on custom web apps, UI/UX, SEO, and automation.",
    url: `${SITE_URL}/blogs`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blogs`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogsPage
        projects={data.docs as Blog[]}
        paginationData={{
          page: data.page,
          totalPages: data.totalPages,
          hasNextPage: data.hasNextPage,
          hasPrevPage: data.hasPrevPage,
          nextPage: data.nextPage,
          prevPage: data.prevPage,
        }}
      />
    </>
  );
}
