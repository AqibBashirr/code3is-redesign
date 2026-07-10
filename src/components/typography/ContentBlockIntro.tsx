import { CaseStudy } from "@/types/payload-types";
import BodyText from "./BodyText";
import HeadingPill from "./headingPill";
import HeadingText from "./headingText";

interface ContentBlockIntroProps {
  pill: string;
  heading: {
    text?: string;
    highlight: string;
  };
  description: string ;
}

function ContentBlockIntro({
  pill,
  heading,
  description,
}: ContentBlockIntroProps) {
  return (
    <section className="max-w-max mx-auto px-x py-y ">
      {pill && <HeadingPill>{pill}</HeadingPill>}
      <div className="flex flex-col  md:flex-row gap-grid-content mt-between-content ">
        {heading.highlight && (
          <HeadingText highlightText={heading.highlight} className="flex-1 ">
            {heading.text}
          </HeadingText>
        )}
        {description && (
          <div className="flex-1 flex flex-col gap-space-content">
            <BodyText className="first:mt-0 whitespace-pre-line">{description}</BodyText>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContentBlockIntro;
