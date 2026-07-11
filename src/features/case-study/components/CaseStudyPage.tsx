import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
import CaseStudies from "./CaseStudies";
import { PaginatedDocs } from "payload";
import { CaseStudy } from "@/types/payload-types";
import Link from "next/link";

export type CaseStudyPageProps = {
  data: PaginatedDocs<CaseStudy>;
  paginationData: Pick<
    PaginatedDocs,
    | "totalPages"
    | "hasNextPage"
    | "hasPrevPage"
    | "nextPage"
    | "prevPage"
    | "page"
  >;
};

function CaseStudyPage({ data, paginationData }: CaseStudyPageProps) {
   const { hasPrevPage, prevPage, hasNextPage, nextPage, page, totalPages } =
     paginationData;
  return (
    <>
      <Hero
        title={
          <>
            Success <HighlightTextHero HighlightText="Stories" />
          </>
        }
        subtitle="Discover how strategy, design, and technology came together to solve real business challenges."
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
      <ContentBlockIntro
        pill="CASE STUDIES"
        heading={{
          text: "Real Projects Real Business",
          highlight: "Impact",
        }}
        description={
          "Explore how we help businesses solve complex challenges through strategy, branding, web development, and digital marketing. \n Every project is built around measurable outcomes, not just attractive designs."
        }
      />
      <CaseStudies data={data.docs} />

      <div className="flex items-center justify-center gap-4 mt-content-gap pb-y">
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 pb-16">
            {hasPrevPage ? (
              <Link
                href={`?page=${prevPage}#caseStudies`}
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
                href={`?page=${nextPage}#caseStudies`}
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

export default CaseStudyPage