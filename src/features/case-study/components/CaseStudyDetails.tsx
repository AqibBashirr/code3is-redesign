import Hero from "@/components/common/hero";
import { CaseStudy } from "@/types/payload-types"; 
import HighlightTextHero from "@/components/common/HighlightTextHero";


import Steps from "./Steps";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";
interface caseStudyDetailsProps{
  data:CaseStudy;
}

function CaseStudyDetails({ data }: caseStudyDetailsProps) {
  const mainField = data.main;
  const padded =
    data.number !== undefined && data.number !== null && data.number < 10
      ? "0" + data.number
      : String(data.number);
  return (
    <>
      <Hero
        title={
          <>
            {data.title}{" "}
            {data.titleHighlight !== undefined &&
              data.titleHighlight !== null && (
                <HighlightTextHero HighlightText={data.titleHighlight} />
              )}
          </>
        }
        subtitle={data.description || ""}
        buttons={{
          firstButton: { text: "Start A Project", href: "#contact" },
          secondButton: {
            text: "View Our Work",
            href: `/our-work#website`,
            arrow: false,
            variant: "outline",
          },
        }}
      ></Hero>
      <ContentBlockIntro
        pill={`Case Study ${padded}`}
        heading={{
          text: "Project at a ",
          highlight: "Glance",
        }}
        description={mainField?.projectAtAGlance || ""}
      />
      <Steps dataProject={data} />
    </>
  );
}

export default CaseStudyDetails;
