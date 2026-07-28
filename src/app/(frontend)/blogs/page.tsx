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

function getCanonical(page: number) {
  return page > 1 ? `${SITE_URL}/blogs?page=${page}` : `${SITE_URL}/blogs`;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const title =
    currentPage > 1
      ? `Blog & Insights - Page ${currentPage}`
      : "Agency Blog: Web Apps, Branding & SEO Insights";

  const description =
    "Read the latest from Code3IS on custom web apps, UI/UX design, performance marketing, automation, and scaling your digital presence.";

  const canonical = getCanonical(currentPage);

  const fallbackImage =
    getAbsoluteUrl("/og/og-default.png") || `${SITE_URL}/og/og-default.png`;

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
      index: currentPage === 1,
      follow: true,
      googleBot: {
        index: currentPage === 1,
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

  // only 404 empty *deeper* pages — page 1 with zero posts still renders
  // (an empty-state UI), rather than 404ing a brand-new/emptied blog section
  if (currentPage > 1 && !data.docs.length) {
    notFound();
  }

  const canonical = getCanonical(currentPage);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${canonical}#blog`,
    name: "Code3IS Blog",
    description:
      "Expert insights on custom web apps, UI/UX, SEO, and automation.",
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Code3 Innovative Solutions",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/company-logos/code3is-logo.svg`,
      },
    },
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
