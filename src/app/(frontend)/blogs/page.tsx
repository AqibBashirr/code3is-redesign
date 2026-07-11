import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogsPage from "@/features/blogs/components/BlogsPage";
import { Blog } from "@/types/payload-types";
import { getBlogs } from "@/lib/cache/blogs";
import { SITE_URL } from "@/lib/site";

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
      ? `Our Blog - Page ${currentPage} | CODE3IS`
      : "Our Blog | CODE3IS";

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

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  const data = await getBlogs(currentPage);

  if (!data.docs.length) {
    notFound();
  }

  return (
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
  );
}
