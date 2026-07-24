import { Metadata } from "next";

import CaseStudyPage from "@/features/case-study/components/CaseStudyPage";
import { getCaseStudies } from "@/lib/cache/caseStudies";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { getAbsoluteUrl } from "@/lib/url";

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

  // Optimized: Stronger SEO title highlighting your actual deliverables
  const title =
    currentPage > 1
      ? `Our Work & Case Studies - Page ${currentPage}`
      : "Portfolio & Case Studies: Web Apps, Branding & SEO";

  const description =
    "Explore Code3IS's portfolio of custom web applications, brand identity systems, and digital marketing campaigns for clients across India, the UAE, and globally.";

  const canonical =
    currentPage > 1
      ? `${SITE_URL}/case-studies?page=${currentPage}`
      : `${SITE_URL}/case-studies`;

  // Optimized: Changed to match your global /og/og-default.jpg path
  const defaultOgImage = getAbsoluteUrl("/og/og-default.jpg");

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
          // Fixed: Removed the hardcoded client name (Harmain Services)
          alt: "Code3IS Portfolio & Case Studies",
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
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  const data = await getCaseStudies(currentPage);

  // Generate Collection schema for the portfolio
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/case-studies#webpage`,
    name: "Code3IS Portfolio & Case Studies",
    description:
      "Explore our latest case studies, client success stories, and digital transformation projects.",
    url: `${SITE_URL}/case-studies`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE_URL}/case-studies`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={portfolioSchema} />
      <JsonLd data={breadcrumbSchema} />
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
    </>
  );
}
