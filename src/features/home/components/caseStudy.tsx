import { CASE_STUDY } from "@/constants/casestudy";
import { ProcessCard } from "../../../components/Cards/caseStudyCard";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import HeadingPill from "@/components/headingPill";

function CaseStudy() {
  return (
    <section className="overflow-hidden pb-y ">
      <h2 className="text-[16.4vw] font-extrabold uppercase whitespace-nowrap leading-none  text-big-text-font font-vaguard">
        CASE STUDY
      </h2>
      <div className="flex flex-col-reverse lg:flex-row gap-[clamp(30px,4vw,84px)] px-x mt-content-gap max-w-max mx-auto">
        <div className="casestudy-img hidden lg:block flex-1 mt-[calc(var(--space-content)+46px)]">
          <div className="h-48.5 md:h-full  w-full rounded-[10px] bg-black shadow-[-5px_-5px_0_0px_#BBFD58] overflow-hidden">
            <Image
              src={CASE_STUDY.img}
              width={1600}
              height={700}
              alt={CASE_STUDY.projectName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="casestudy-text flex-1 ">
          <HeadingPill>Case Study</HeadingPill>
          <div className="main-casestudy-text mt-between-content">
            <div>
              <h2 className="font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[120%]">
                From Complex Backend to Seamless{" "}
                <span className="underline underline-offset-7 decoration-highlight-text-color">
                  Experience
                </span>
              </h2>
              <p className="mt-3.5 text-secondary-color text-content-font leading-content-font">
                We redesign fragmented digital experiences into scalable systems
                focused on usability, performance, and clarity.
              </p>
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
                    <ProcessCard
                      key={process.title}
                      process={{
                        ...process,
                        href: `case-study/${CASE_STUDY.projectName.toLowerCase().replaceAll(" ", "-")}`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-center lg:justify-start md:justify-items-start">
                <Button
                  variant="dark"
                  href={`case-study/${CASE_STUDY.projectName.toLowerCase().replaceAll(" ", "-")}`}
                  className=""
                >
                  VIEW FULL CASE STUDY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;
