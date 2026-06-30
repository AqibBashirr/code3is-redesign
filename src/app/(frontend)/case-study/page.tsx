import CaseStudy from "@/features/case-study/components/CaseStudy";

export default async function Page() {
  // 1. Define your base URL.
  // In development, this is localhost. Later, it will be your real backend URL.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  

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
