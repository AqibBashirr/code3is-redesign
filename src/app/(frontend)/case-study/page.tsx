import { Metadata } from "next";

import CaseStudyPage from "@/features/case-study/components/CaseStudyPage";
import { getCaseStudies } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";
import { notFound } from "next/navigation";

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
      ? `Case Studies - Page ${currentPage} | CODE3IS`
      : "Case Studies | CODE3IS";

  const description =
    "Explore our latest projects, success stories and digital transformation case studies.";

  const canonical =
    currentPage > 1
      ? `${SITE_URL}/case-studies?page=${currentPage}`
      : `${SITE_URL}/case-studies`;

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

  const data = await getCaseStudies(currentPage);

  if (!data.docs.length) {
    notFound();
  }

  return (
    <CaseStudyPage
      data={data}
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
