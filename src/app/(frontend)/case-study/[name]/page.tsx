import { baseUrl } from "@/constants/BaseUrl";
import CaseStudy from "@/features/case-study/components/CaseStudy";

// 1. Define the params prop type
interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function Page({ params }: PageProps) {
  // 2. Await the params (Required in Next.js 15+)
  const resolvedParams = await params;
  console.log("Current case study name:", resolvedParams.name);

  // 3. ISR Implementation: Fetch with a revalidation timer
  // 3600 = revalidate every 1 hour. Change this number as needed.
  const res = await fetch(`${baseUrl}/data/case-study.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch case study data");
  }

  const data = await res.json();

  // Note: Depending on your CaseStudy component, you might want to pass
  // only the specific case study data (e.g., data[resolvedParams.name])
  return <CaseStudy data={data} />;
}
