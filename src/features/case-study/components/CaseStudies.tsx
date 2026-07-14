import { Reveal } from "@/components/Reveal";

import Link from "next/link";
import HeadingPill from "@/components/typography/headingPill";
import BodyText from "@/components/typography/BodyText";
import { casestudyPropsPick } from "@/types/case-study-props.types";
import AdvancedImage from "@/components/AdvancedImage";

interface CaseStudiesProps {
  data: casestudyPropsPick[];
}

function CaseStudies({ data }: CaseStudiesProps) {
  return (
    <div
      id="caseStudies"
      className="mx-auto scroll-mt-(--scroll-mt-between-content) grid max-w-max grid-cols-1 gap-[clamp(16px,2vw,24px)] px-x  sm:grid-cols-2 lg:grid-cols-3"
    >
      {data?.map((project, index) => {
        let padded;
        if (project.number !== null && project.number !== undefined) {
          padded =
            project.number < 10 ? "0" + project.number : String(project.number);
        }
        const logoAlt =
          typeof project.logo === "string"
            ? (project.slug?.replace(/\s/g, " ").toUpperCase() ?? "")
            : (project.logo?.alt ??
              project.slug?.replace(/\s/g, " ").toUpperCase() ??
              "");
        console.log(project.logo);
        return (
          <Reveal
            key={project.title + project.titleHighlight}
            delay={index * 0.25}
          >
            {/* 2. Article takes over the card styling, hover effects, and flex layout */}
            <article className="group flex h-full cursor-pointer flex-col gap-space-content rounded-[10px] bg-white p-[clamp(18px,1.6vw,30px)] shadow-[0px_4px_20px_4px_#00000021] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:shadow-[0px_14px_36px_6px_#00000030] active:scale-[0.985] active:translate-y-0 active:shadow-[0px_4px_14px_2px_#00000025] active:duration-150 relative">
              {/* The Image Section */}
              <figure className="relative mb-2.5 flex max-h-45.75 items-center justify-center overflow-hidden rounded-lg border border-[#bdbdbd] p-6 aspect-video">
                <AdvancedImage
                  sizes="card"
                  src={project.logo || ""}
                  alt={logoAlt}
                  height={183}
                  width={319}
                  className=" w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </figure>

              {/* The Text Content (flex-1 forces it to push the link down) */}
              <div className="flex flex-1 flex-col">
                <HeadingPill className="font-poppins">
                  Case Study {padded}
                </HeadingPill>
                <h3 className="font-raleway text-[clamp(16px,2vw,22px)] font-semibold leading-[calc(clamp(16px,2vw,22px)+12px)] transition-colors duration-500 group-hover:text-black/90 capitalize">
                  {project.title} {project.titleHighlight}
                </h3>
                <BodyText className="mb-0.5 line-clamp-3 text-form-text-size leading-[calc(var(--form-label-size)+12px)]">
                  {project.description}
                </BodyText>
              </div>

              {/* The Link (mt-auto aligns all buttons to the exact bottom) */}
              <Link
                href={`/case-studies/${project.slug}`}
                className="mt-auto  inline-flex w-fit items-center gap-1.5 font-normal text-black text-content-font before:absolute before:inset-0"
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
