import Hero from "@/components/common/hero";
import { CaseStudyData } from "../types/caseStudy.types";
import HighlightTextHero from "@/components/common/HighlightTextHero";


import Steps from "./Steps";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";


function CaseStudy({ data }: CaseStudyData) {

  const main = data.main
  const padded = data.number < 10 ? "0" + data.number : String(data.number);
  const Data = [main.challenge,main.approach,main.outcome]
  return (
    <>
      <Hero
        title={
          <>
            {data.Heading?.title}{" "}
            <HighlightTextHero HighlightText={data.Heading.highlight} />
          </>
        }
        subtitle={data.description}
        buttons={{
          firstButton: { text: "Start A Project", href: "#contact" },
          secondButton: {
            text: "View Our Work",
            href: `/#our-work`,
            arrow: false,
            variant: "outline",
          },
        }}
      ></Hero>
       <ContentBlockIntro pill={`Case Study ${padded}`} heading={{text:main["Heading-h2"].title, highlight: main["Heading-h2"].highlight}} description={main.description} />
      <Steps Data={Data} />
      
    </>
  );
}

export default CaseStudy;
