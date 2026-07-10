import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
import CaseStudies from "./CaseStudies";
import { PaginatedDocs } from "payload";
import { CaseStudy } from "@/types/payload-types";
import Link from "next/link";

export type CaseStudyPageProps = { data: PaginatedDocs<CaseStudy> };

function CaseStudyPage({ data }: CaseStudyPageProps) {
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
        {data.hasPrevPage ? (
          <Link
            href={`?page=${data.prevPage}#caseStudies`} // Jumps past the Hero
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            &larr; Previous
          </Link>
        ) : (
          // Keep the layout stable by rendering a disabled state
          <span className="px-4 py-2 border border-gray-200 text-gray-400 rounded cursor-not-allowed">
            &larr; Previous
          </span>
        )}

        <span className="font-medium text-gray-600">
          Page {data.page} of {data.totalPages}
        </span>

        {data.hasNextPage ? (
          <Link
            href={`?page=${data.nextPage}#caseStudies`}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Next &rarr;
          </Link>
        ) : (
          <span className="px-4 py-2 border border-gray-200 text-gray-400 rounded cursor-not-allowed">
            Next &rarr;
          </span>
        )}
      </div>
    </>
  );
}

export default CaseStudyPage