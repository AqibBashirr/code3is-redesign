import BlogsPage from "@/features/blogs/components/BlogsPage";
import { Blog } from "@/types/payload-types";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 1. Generate Static SEO Metadata
export const metadata: Metadata = {
  title: "Our Blog | Harmain Services",
  description:
    "Read our latest insights on web design, development, and digital strategy.",
  openGraph: {
    title: "Our Blog | Harmain Services",
    description:
      "Read our latest insights on web design, development, and digital strategy.",
  },
};

// 2. Create the ISR Cached Fetcher
const getCachedBlogs = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({ config: configPromise });

    return payload.find({
      collection: "blogs",
      page,
      limit: 9, //  for a 3-column grid
      depth: 1,
      sort: "-createdAt", // Added a minus sign (-) to sort Newest to Oldest!
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
    revalidate: 3600, // ISR: Revalidate every hour
    tags: ["blogs"],
  },
);

// 3. Render the Page Component (Capitalized!)
export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;

  // Call the cached function
  const data = await getCachedBlogs(currentPage);

  if (!data.docs || data.docs.length === 0) {
    notFound();
  }

  // Cast the docs to your Blog type
  const blogs = data.docs as unknown as Blog[];

  return (
    // Note: I changed 'projects' to 'blogs' here for clarity.
    // You will need to update your BlogsPage component props to match!
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
