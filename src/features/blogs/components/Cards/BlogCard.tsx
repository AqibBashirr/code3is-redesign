import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import Link from "next/link";
import { Blog } from "@/types/payload-types";
import { formatDate } from "@/lib/formatDate";
import AdvanceImage from "@/components/AdvancedImage";

interface BlogCardProps {
  project: Omit<Blog, "content"| "updatedAt">;
  index: number;
}


function BlogCard({ project, index }: BlogCardProps) {
  const logoAlt =
    typeof project.heroImage === "string"
      ? (project.slug?.replace(/\s/g, " ").toUpperCase() ?? "")
      : (project.heroImage?.alt ??
        project.slug?.replace(/\s/g, " ").toUpperCase() ??
        "");

        const Data = formatDate(project.createdAt)
  return (
    <Reveal key={logoAlt} delay={index * 0.25}>
      <article
        aria-labelledby={`card-title-${logoAlt}`}
        className=" group flex h-full cursor-pointer flex-col gap-space-content rounded-[10px] bg-white p-[clamp(18px,1.6vw,30px)] shadow-[0px_4px_20px_4px_#00000021] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:shadow-[0px_14px_36px_6px_#00000030] active:scale-[0.985] active:translate-y-0 active:shadow-[0px_4px_14px_2px_#00000025] active:duration-150 relative"
      >
        <figure className="relative mb-2.5 flex max-h-45.75 aspect-video items-center justify-center overflow-hidden rounded-lg border border-[#bdbdbd] ">
          <AdvanceImage
            src={project.heroImage}
            alt={logoAlt}
            height={183}
            width={319}
            className=" w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </figure>

        <div className="flex flex-1 flex-col gap-space-content">
          <time
            dateTime={project.createdAt}
            className="uppercase text-[clamp(12px,1.5vw,16px)] leading-[calc(clamp(12px,1.5vw,16px)+12px)] tracking-[10%]"
          >
            {Data}
          </time>

          <h3
            id={`card-title-${logoAlt}`}
            className="font-raleway text-[clamp(16px,2vw,22px)] font-semibold leading-[calc(clamp(16px,2vw,22px)+12px)] transition-colors duration-500 group-hover:text-black/90 capitalize"
          >
            {project.title}
          </h3>
          <BodyText className="mb-2.5 line-clamp-3 text-form-text-size leading-[calc(var(--form-label-size)+12px)]">
            {project.excerpt}
          </BodyText>

          <Link
            href={`/blogs/${project.slug}`}
            aria-label="Read more about How To Know If Your Website Is Mobile Friendly"
            className="mt-auto  inline-flex w-fit items-center gap-1.5 font-normal text-black text-content-font  before:absolute before:inset-0"
          >
            Read More
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export default BlogCard;
