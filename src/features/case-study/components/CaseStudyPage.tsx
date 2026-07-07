import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
import CaseStudies from "./CaseStudies";
import { CaseStudyData } from "../types/caseStudy.types";



interface CaseStudyPageProps {
  data:CaseStudyData;
}

function CaseStudyPage({ data }: CaseStudyPageProps) {


  return (
    <>
      <Hero
        title={
          <>
            Success <HighlightTextHero HighlightText="Stories" />
          </>
        }
        subtitle="Discover how strategy, design, and technology came together to solve real business challenges."
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
      <ContentBlockIntro
        pill="CASE STUDIES"
        heading={{
          text: "Real Projects Real Business",
          highlight: "Impact",
        }}
        description={[
          "Explore how we help businesses solve complex challenges through strategy, branding, web development, and digital marketing.",
          " Every project is built around measurable outcomes, not just attractive designs.",
        ]}
      />
      <CaseStudies data={data} />
    </>
  );
}

export default CaseStudyPage