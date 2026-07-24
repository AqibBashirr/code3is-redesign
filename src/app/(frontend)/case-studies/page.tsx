import { Metadata } from "next";

import CaseStudyPage from "@/features/case-study/components/CaseStudyPage";
import { getCaseStudies } from "@/lib/cache/caseStudies";
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
    currentPage > 1 ? `Case Studies - Page ${currentPage}` : "Case Studies"; // Removed the trailing space

  const description =
    "Explore our latest case studies, client success stories, and digital transformation projects.";

  const canonical =
    currentPage > 1
      ? `${SITE_URL}/case-studies?page=${currentPage}`
      : `${SITE_URL}/case-studies`;

  // Provide a default image for social sharing (WhatsApp, LinkedIn, Twitter)
  const defaultOgImage = `${SITE_URL}/default-og.jpg`;

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
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: "Harmain Services Case Studies",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
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
