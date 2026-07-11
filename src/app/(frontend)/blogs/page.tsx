import BlogsPage from "@/features/blogs/components/BlogsPage";
import { Blog } from "@/types/payload-types";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Our Blog | CODE3IS",
  description:
    "Read our latest insights on web design, development, and digital strategy.",
  openGraph: {
    title: "Our Blog | CODE3IS",
    description:
      "Read our latest insights on web design, development, and digital strategy.",
  },
};

const getCachedBlogs = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({
      config: configPromise,
    });

    return payload.find({
      collection: "blogs",
      page,
      limit: 9,
      depth: 1,
      sort: "-createdAt",
      select: {
        id: true,
        slug: true,
        title: true,
        heroImage: true,
        createdAt: true,
        excerpt: true,
      },
    });
  },
  ["blogs-list"],
  {
    tags: ["blogs"],
  },
);

export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;

  const data = await getCachedBlogs(currentPage);

  if (!data.docs || data.docs.length === 0) {
    notFound();
  }

  const blogs = data.docs as Blog[];

  return (
    <BlogsPage
      projects={blogs}
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
