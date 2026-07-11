import HeadingText from "@/components/typography/headingText";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import BlogCard from "./Cards/BlogCard";

interface RelatedBlogsProps {
  currentBlogId: string;
  categoryId: string;
}

export default async function RelatedBlogs({
  currentBlogId,
  categoryId,
}: RelatedBlogsProps) {
  const payload = await getPayload({ config: configPromise });

  // --------------------------------------------------------------------------
  // Fetch blogs from the same category
  // --------------------------------------------------------------------------

  const relatedBlogs = await payload.find({
    collection: "blogs",
    depth: 1,
    limit: 3,
    sort: "-createdAt",
    where: {
      and: [
        {
          category: {
            equals: categoryId,
          },
        },
        {
          id: {
            not_equals: currentBlogId,
          },
        },
      ],
    },
  });

  let blogs = [...relatedBlogs.docs];

  // --------------------------------------------------------------------------
  // Fill remaining slots with latest blogs
  // --------------------------------------------------------------------------

  if (blogs.length < 3) {
    const latestBlogs = await payload.find({
      collection: "blogs",
      depth: 1,
      limit: 3 - blogs.length,
      sort: "-createdAt",
      where: {
        id: {
          not_in: [currentBlogId, ...blogs.map((blog) => blog.id)],
        },
      },
    });

    blogs = [...blogs, ...latestBlogs.docs];
  }

  // --------------------------------------------------------------------------
  // No blogs found
  // --------------------------------------------------------------------------

  if (!blogs.length) {
    return (
      <section className="mx-auto max-w-max px-x py-y">
        <HeadingText className="text-center" highlightText="Read">
          Also
        </HeadingText>

        <p className="mt-10 text-center text-secondary-color">
          No related articles found.
        </p>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  return (
    <section className="mx-auto max-w-max px-x py-y">
      <HeadingText className="text-center" highlightText="Read">
        Also
      </HeadingText>

      <div className="mt-content-gap grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id} project={blog} index={index} />
        ))}
      </div>
    </section>
  );
}
