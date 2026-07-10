import CaseStudyPage from "@/features/case-study/components/CaseStudyPage";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";

// 1. Define Props (used by both Metadata and Page)
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 2. Generate SEO Metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  // You can also fetch data here if you need dynamic SEO based on the DB,
  // but for a list page, static string interpolation is usually enough.
  return {
    title: `Our Case Studies ${currentPage > 1 ? `- Page ${currentPage}` : ""} | Harmain Services`,
    description: "Explore our latest projects and success stories.",
    openGraph: {
      title: "Case Studies | Harmain Services",
      description: "Explore our latest projects and success stories.",
      url: `https://yourdomain.com/case-studies${currentPage > 1 ? `?page=${currentPage}` : ""}`,
    },
  };
}

// 3. Create a cached fetch function for the Payload Local API
// This is how you achieve ISR with the Local API in Next.js 15
const getCachedCaseStudies = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({ config: configPromise });

    return payload.find({
      collection: "case-studies",
      limit: 9, 
      page,
      sort:'number',
      depth: 1,
      select: {
        id: true,
        slug: true,
        title: true,
        titleHighlight: true,
        description: true,
        logo: true,
        number: true,
      },
    });
  },
  ["case-studies-list"], // Base cache key
  {
    revalidate: 3600, // ISR: Revalidate every hour (in seconds)
    tags: ["case-studies"], // Allows for on-demand revalidation later
  },
);

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  // 4. Call the cached function instead of hitting Payload directly
  const data2 = await getCachedCaseStudies(currentPage);

  if (!data2.docs || data2.docs.length === 0) {
    notFound();
  }

  return <CaseStudyPage data={data2} />;
}
