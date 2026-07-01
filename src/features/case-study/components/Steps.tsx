import Image from "next/image";
import ChallengeSection from "./CommonSection";
import HeadingTextH3 from "@/components/typography/HeadingTextH3";
import HeadingPill from "@/components/typography/headingPill";
import { CaseStudySection } from "../types/caseStudy.types";

interface StepsProps{
  Data:CaseStudySection[]
}

function Steps({ Data }: StepsProps) {
  return (
    <>
      {Data.map((data, index) => {
        return (
          <section
            id={data.pill.toLowerCase().split(" ")[1]}
            key={data.pill}
            className={`flex flex-col md:flex-row gap-grid-content max-w-max mx-auto px-x pb-y scroll-mt-24 ${index % 2 == 1 ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"}`}
          >
            <div className="left-side flex-1">
              <HeadingPill>{data.pill}</HeadingPill>
              <HeadingTextH3
                highlightText={data.heading.highlight}
                className="mt-between-content"
              >
                {data.heading.title}
              </HeadingTextH3>
              <div>
                <ChallengeSection challange={data} />
              </div>
            </div>
            <div className="right-side flex-1">
              <Image
                src={data.image.src}
                width={600}
                height={600}
                className="h-full w-auto"
                alt={data.image.alt}
              />
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Steps