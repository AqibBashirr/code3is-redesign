import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
import { baseUrl } from "@/constants/BaseUrl";
import CaseStudies from "@/features/case-study/components/CaseStudies";
import CaseStudyPage from "@/features/case-study/components/CaseStudyPage";


import SelectedWork from "@/features/home/components/SelectedWork";

export const dynamic = "force-dynamic";

export default async function Page() {
  
    // 2. Await the fetch call properly
    const res = await fetch(`${baseUrl}/data/case-study.json`);

    if (!res.ok) {
      throw new Error("Failed to fetch case study data");
    }

    // 3. Await the JSON parsing
    const data = await res.json();

    
  

   return (
     <CaseStudyPage data={data} />
   );
   // <CaseStudy data={data} />
}
