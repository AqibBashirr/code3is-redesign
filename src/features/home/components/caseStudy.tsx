import { CASE_STUDY } from "@/constants/casestudy";
import { ProcessCard } from "../../../components/Cards/caseStudyCard";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Image from "next/image";
import HeadingPill from "@/components/typography/headingPill";
import BigBgText from "@/components/typography/BigBgText";
import BodyText from "@/components/typography/BodyText";
import HeadingText from "@/components/typography/headingText";
import { Reveal } from "@/components/Reveal";

function CaseStudy() {
  return (
    <section className="overflow-hidden pb-y ">
      <BigBgText>CASE STUDY</BigBgText>
      <div className="flex flex-col-reverse lg:flex-row gap-[clamp(30px,4vw,84px)] px-x mt-content-gap max-w-max mx-auto">
        <Reveal
          y={0}
          x={"-40px"}
          className="casestudy-img hidden lg:block flex-1 mt-[calc(var(--space-content)+46px)]"
        >
          <div className="h-48.5 md:h-full  w-full rounded-[10px] bg-black shadow-[-5px_-5px_0_0px_#BBFD58] overflow-hidden">
            <Image
              src={CASE_STUDY.img}
              width={1600}
              height={700}
              alt={CASE_STUDY.projectName}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal y={0} x={"40px"} className="casestudy-text flex-1 ">
          <HeadingPill className="border border-secondary-background rounded-[10px] px-4 py-1">
            Case Study
          </HeadingPill>
          <div className="main-casestudy-text mt-between-content">
            <div>
              <HeadingText highlightText="Experience">
                From Complex Backend to Seamless
              </HeadingText>
              <BodyText>
                We redesign fragmented digital experiences into scalable systems
                focused on usability, performance, and clarity.
              </BodyText>
            </div>
            <div className="mt-content-gap">
              <h3 className="text-h3-font my-5 font-raleway">
                {CASE_STUDY.projectName}
              </h3>
              <div className="cards-container lg:flex lg:flex-col grid sm:grid-cols-2  grid-cols-1 gap-5 mb-content-gap">
                <div className="block lg:hidden h-full  w-full rounded-[10px] bg-black shadow-[-5px_-5px_0_0px_#BBFD58] overflow-hidden">
                  <Image
                    src={CASE_STUDY.img}
                    width={1600}
                    height={700}
                    alt={CASE_STUDY.projectName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {CASE_STUDY.processes.map((process) => {
                  return (
                    <Reveal
                      
                      key={process.title}>
                         
                      <ProcessCard
                        process={{
                          ...process,
                          href: `case-study/${CASE_STUDY.projectName.toLowerCase().replaceAll(" ", "-")}`,
                        }}
                      />
                    </Reveal>
                  );
                })}
              </div>
              <div className="flex items-center justify-center lg:justify-start md:justify-items-start">
                <ButtonLink
                  variant="dark"
                  href={`case-study/${CASE_STUDY.projectName.toLowerCase().replaceAll(" ", "-")}`}
                  className=""
                >
                  VIEW FULL CASE STUDY
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CaseStudy;
