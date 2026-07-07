import { notFound } from "next/navigation";
import { baseUrl } from "@/constants/BaseUrl";
import CaseStudy from "@/features/case-study/components/CaseStudyDetails";

//  'force-dynamic' so your { revalidate: 3600 } actually works
export const dynamic = "force-dynamic";


interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function Page({ params }: PageProps) {

  const resolvedParams = await params;


  const res = await fetch(`${baseUrl}/data/case-study.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch case study data");
  }

  const response = await res.json();
  const data = response[resolvedParams.name];

  if (data === undefined) {
    
    notFound();
  }

  return <CaseStudy data={data} />;
}
