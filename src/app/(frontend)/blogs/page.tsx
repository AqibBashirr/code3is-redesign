import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogsPage from "@/features/blogs/components/BlogsPage";
import { Blog } from "@/types/payload-types";
import { getBlogs } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

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

  const title =
    currentPage > 1
      ? `Our Blog - Page ${currentPage} `
      : "Our Blog ";

  const description =
    "Read our latest insights on web development, UI/UX, SEO, AI, cloud technologies, and digital transformation.";

  const canonical =
    currentPage > 1
      ? `${SITE_URL}/blogs?page=${currentPage}`
      : `${SITE_URL}/blogs`;

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
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://www.code3is.com/blogs#blog",
  name: "Code3IS Blog",
  url: "https://www.code3is.com/blogs",
  publisher: { "@id": "https://www.code3is.com/#organization" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.code3is.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.code3is.com/blogs",
    },
  ],
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  const data = await getBlogs(currentPage);

  if (!data.docs.length) {
    notFound();
  }

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
