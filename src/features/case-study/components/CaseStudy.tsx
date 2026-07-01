import Hero from "@/components/common/hero";
import { CaseStudyData } from "../types/caseStudy.types";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import BodyText from "@/components/typography/BodyText";

import Steps from "./Steps";
import Contact from "@/features/home/components/contact";
import AvailService from "@/features/home/components/Availservice";

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
      ></Hero>
      <section className="max-w-max mx-auto px-x py-y">
        <HeadingPill>Case Study {padded}</HeadingPill>
        <div className="flex flex-col md:flex-row mt-between-content">
          <HeadingText
            highlightText={main["Heading-h2"].highlight}
            className="flex-1 "
          >
            {main["Heading-h2"].title}
          </HeadingText>
          <div className="flex-1">
            {main.description.map((des) => (
              <BodyText key={des}>{des}</BodyText>
            ))}
          </div>
        </div>
      </section>
      <Steps Data={Data} />
      <AvailService />
      <Contact />
    </>
  );
}

export default CaseStudy;
