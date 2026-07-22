import Hero from "@/components/common/hero";
import Sections from "@/features/our-work/components/sections";
import { getWorkSections } from "@/lib/cache/work-sections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Code3 Innovative Solutions",
  description: "A collection of websites, brands, campaigns & creative assets crafted for businesses across industries",
};

async function Page() {
  const workSections = await getWorkSections();

  return (
    <>
      <Hero
        title={
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold">Visible</span>
          </>
        }
        buttons={{
          firstButton: { text: "Start A Project", href: "/#contact" },
          secondButton: {
            text: "View Our Work",
            href: "#website",
            arrow: false,
            variant: "outline",
          },
        }}
        subtitle="Real websites, brand systems, and campaigns, built for real businesses across hospitality, education, and agriculture"
      />
      {/* Pass the retrieved documents array to your Sections component */}
      <Sections sections={workSections} />
    </>
  );
}

export default Page;
