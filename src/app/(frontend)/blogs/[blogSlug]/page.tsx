import { Blog } from "@/types/payload-types";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";
import BlogPage from "@/features/blogs/components/BlogPage";

interface PageProps {
  params: Promise<{ blogSlug: string }>;
}

// 1. Create the ISR Cached Fetcher
const getCachedBlog = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.find({
      collection: "blogs",
      limit: 1,
      depth: 1,
      where: {
        slug: { equals: slug },
      },
    });

    return data.docs[0] as Blog | undefined;
  },
  ["blog-details"], // Cache key prefix
  {
    revalidate: 3600, // ISR: Revalidate every 1 hour (in seconds)
    tags: ["blogs"], // Allows for on-demand revalidation later
  },
);

// 2. Generate Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;

  // Next.js uses the cache here, so it doesn't double-query the database!
  const post = await getCachedBlog(resolvedParams.blogSlug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  // Safely extract the image URL if heroImage is populated
  const ogImage =
    typeof post.heroImage === "object" && post.heroImage?.url
      ? post.heroImage.url
      : "/default-blog-og.jpg";

  return {
    // Falls back to the standard title/excerpt if specific SEO fields are empty
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt,
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt||'',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

// 3. Render the Page
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  // Call the cached function to get the data for rendering
  const post = await getCachedBlog(resolvedParams.blogSlug);

  if (!post) {
    notFound();
  }
  

  return (
    <BlogPage Blog={post}/>
  );
}
