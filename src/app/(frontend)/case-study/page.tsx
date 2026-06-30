import { baseUrl } from "@/constants/BaseUrl";
import CaseStudy from "@/features/case-study/components/CaseStudy";

export const dynamic = "force-dynamic";

export default async function Page() {
  
    // 2. Await the fetch call properly
    const res = await fetch(`${baseUrl}/data/case-study.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch case study data");
    }

    // 3. Await the JSON parsing
    const data = await res.json();
    console.log("data", data); // This will log in your terminal, not the browser console

    
  

   return (
      <CaseStudy data={data} />
    );
}
