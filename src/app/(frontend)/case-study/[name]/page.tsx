import { notFound } from "next/navigation";
import CaseStudyDetails from "@/features/case-study/components/CaseStudyDetails";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { CaseStudy } from "@/types/payload-types";


//  'force-dynamic' so your { revalidate: 3600 } actually works
export const dynamic = "force-dynamic";


interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "case-studies",
    depth: 1,
    where: { slug: { equals: resolvedParams.name } },
  });

  if (!data.docs || data.docs.length === 0) {
    notFound();
  }

  const project = data.docs[0] as CaseStudy;
;  return <CaseStudyDetails data={project} />;
}
