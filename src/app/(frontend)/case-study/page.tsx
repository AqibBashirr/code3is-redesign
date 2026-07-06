import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import { baseUrl } from "@/constants/BaseUrl";


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
    console.log("data", data); // This will log in your terminal, not the browser console

    
  

   return (
     <>
       <Hero
         title={
           <>
             Digital Experiences Built
             <br /> for <HighlightTextHero HighlightText="Impact" />
           </>
         }
         subtitle="High-performance web applications featuring minimalist design and scalable architectures. Explore our latest work."
         buttons={{
           firstButton: { text: "Start A Project", href: "#contact" },
           secondButton: {
             text: "View Our Work",
             href: `/#our-work`,
             arrow: false,
             variant: "outline",
           },
         }}
       />
       <SelectedWork />;
     </>
   );
   // <CaseStudy data={data} />
}
