import { Metadata } from "next";
import { notFound } from "next/navigation";

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

function getCanonical(page: number) {
  return page > 1
    ? `${SITE_URL}/case-studies?page=${page}`
    : `${SITE_URL}/case-studies`;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const title =
    currentPage > 1
      ? `Our Work & Case Studies - Page ${currentPage}`
      : "Portfolio & Case Studies: Web Apps, Branding & SEO";

  const description =
    "Explore Code3IS's portfolio of custom web applications, brand identity systems, and digital marketing campaigns for clients across India, the UAE, and globally.";

  const canonical = getCanonical(currentPage);

  const defaultOgImage =
    getAbsoluteUrl("/og/og-default.png") || `${SITE_URL}/og/og-default.png`;

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
      // page 1 indexed; deeper pages noindex,follow to avoid thin-content dilution
      // change to `true` unconditionally if you'd rather index every page
      index: currentPage === 1,
      follow: true,
      googleBot: {
        index: currentPage === 1,
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

  // guard against out-of-range pages (e.g. ?page=999) returning an empty
  // but 200-status page — only applies to page > 1 so an empty first
  // page still renders normally
  if (currentPage > 1 && data.docs.length === 0) {
    notFound();
  }

  const canonical = getCanonical(currentPage);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    name: "Code3IS Portfolio & Case Studies",
    description:
      "Explore our latest case studies, client success stories, and digital transformation projects.",
    url: canonical,
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
