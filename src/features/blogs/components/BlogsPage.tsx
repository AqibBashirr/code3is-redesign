import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
import { Blog } from "@/types/payload-types";
import BlogCard from "./Cards/BlogCard";
import { PaginatedDocs } from "payload";
import Link from "next/link"; // 1. Imported Link

export interface BlogsPageProps {
  projects: Pick<
    Blog,
    "id" | "createdAt" | "heroImage" | "slug" | "title" | "excerpt"
  >[];

  paginationData: Pick<
    PaginatedDocs,
    | "totalPages"
    | "hasNextPage"
    | "hasPrevPage"
    | "nextPage"
    | "prevPage"
    | "page"
  >;
}

function BlogsPage({ projects, paginationData }: BlogsPageProps) {
  // 2. Destructure the pagination data for cleaner code
  const { hasPrevPage, prevPage, hasNextPage, nextPage, page, totalPages } =
    paginationData;

  return (
    <>
      <Hero
        title={
          <>
            Popular <HighlightTextHero HighlightText="Reads" />
          </>
        }
        subtitle="Fresh insights, practical tips, and proven strategies to help your business stay ahead."
        buttons={{
          firstButton: { text: "Start A Project", href: "#contact" },
          secondButton: {
            text: "View Our Work",
            href: `/our-work#website`,
            arrow: false,
            variant: "outline",
          },
        }}
      />
      <div className="mb-y">
        <ContentBlockIntro
          pill="blogs"
          heading={{
            text: "Stay Ahead of Digital ",
            highlight: "Trends",
          }}
          description={
            "Get practical insights, marketing tips, website optimization strategies, and industry updates delivered to your inbox."
          }
        />

        <section
          id="blogs"
          className="mx-auto scroll-mt-(--scroll-mt-between-content) grid max-w-max grid-cols-1 gap-[clamp(16px,2vw,24px)] px-x  md:grid-cols-2 lg:grid-cols-3 "
        >
          {projects.map((project, index) => {
            return (
              <BlogCard key={project.id} project={project} index={index} />
            );
          })}
        </section>

        {/* 3. The Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 pb-16">
            {hasPrevPage ? (
              <Link
                href={`?page=${prevPage}#blogs`}
                className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                &larr; Previous
              </Link>
            ) : (
              <span className="px-5 py-2.5 text-sm font-medium border border-gray-200 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50/50">
                &larr; Previous
              </span>
            )}

            <span className="text-sm font-medium text-gray-600">
              Page {page} of {totalPages}
            </span>

            {hasNextPage ? (
              <Link
                href={`?page=${nextPage}#blogs`}
                className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                Next &rarr;
              </Link>
            ) : (
              <span className="px-5 py-2.5 text-sm font-medium border border-gray-200 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50/50">
                Next &rarr;
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default BlogsPage;
