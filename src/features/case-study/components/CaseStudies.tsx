import { Reveal } from "@/components/Reveal";
import { CaseStudyData } from "../types/caseStudy.types";
import Image from "next/image";
import Link from "next/link";
import HeadingPill from "@/components/typography/headingPill";
import BodyText from "@/components/typography/BodyText";

interface CaseStudiesProps {
  data: CaseStudyData;
}

function CaseStudies({ data }: CaseStudiesProps) {
  const projects = Object.values(data);
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[clamp(16px,2vw,24px)] px-x pb-y md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const padded =
          project.number < 10 ? "0" + project.number : String(project.number);
        
        return (
          <Reveal
            key={project.Heading.title + project.Heading.highlight}
            delay={index * 0.25}
          >
            {/* 2. Article takes over the card styling, hover effects, and flex layout */}
            <article className="group flex h-full cursor-pointer flex-col gap-3 rounded-[10px] bg-white p-[clamp(18px,1.6vw,30px)] shadow-[0px_4px_20px_4px_#00000021] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:shadow-[0px_14px_36px_6px_#00000030] active:scale-[0.985] active:translate-y-0 active:shadow-[0px_4px_14px_2px_#00000025] active:duration-150">
              {/* The Image Section */}
              <figure className="relative mb-[clamp(18px,1.6vw,30px)] flex max-h-45.75 items-center justify-center overflow-hidden rounded-lg border border-[#bdbdbd] p-6">
                <Image
                  src={project.logo.src}
                  alt={
                    project.logo.alt ??
                    project.Heading.title?.concat(project.Heading.highlight)
                  }
                  height={183}
                  width={319}
                  className=" w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </figure>

              {/* The Text Content (flex-1 forces it to push the link down) */}
              <div className="flex flex-1 flex-col">
                <HeadingPill>Case Study {padded}</HeadingPill>
                <h3 className="font-raleway text-[clamp(16px,2vw,22px)] font-semibold leading-[calc(clamp(16px,2vw,22px)+12px)] transition-colors duration-500 group-hover:text-black/90 capitalize">
                  {project.Heading.title} {project.Heading.highlight}
                </h3>
                <BodyText className="mb-0.5 line-clamp-3 text-form-text-size leading-[calc(var(--form-label-size)+12px)]">
                  {project.description}
                </BodyText>
              </div>

              {/* The Link (mt-auto aligns all buttons to the exact bottom) */}
              <Link
                href={`/case-study/${(project.Heading.title?.replace(/\s/g, "-") + "-" + project.Heading.highlight.replace(/\s/g, "-")).toLowerCase()}`}
                className="mt-auto relative inline-flex w-fit items-center gap-1.5 font-normal text-black text-content-font "
              >
                {/* after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 after:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100 */}
                Read Case Study
                {/* <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  →
                </span> */}
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export default CaseStudies;