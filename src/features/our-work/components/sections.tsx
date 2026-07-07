import DocumentCarousel, {
  CarouselDocument,
} from "@/components/DocumentCarousel";
import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import { OUR_WORK } from "@/constants/our-work";

function Sections() {
  return (
    <>
      {OUR_WORK.map((data, index) => {
        const projects: CarouselDocument[] =
          data.projects as unknown as CarouselDocument[];
        return (
          <section
            id={data.title.toLowerCase().replaceAll(" ", "-")}
            key={data.title}
            className={`max-w-max px-x pb-y ${index === 0 ? "pt-y" : ""}  mx-auto scroll-m-20`}
          >
            <Reveal threshold={0.7} y={0} x={'-40px'} className="mb-content-gap">
            <HeadingPill className="">{data.title}</HeadingPill>
            <div className="flex flex-col md:flex-row gap-[clamp(20px,5.8vw,82px)] mb-content-gap mt-between-content">
              <div className="flex-1">
                <HeadingText
                  highlightText={data.heading.highlight}
                  className="capitalize text-pretty"
                >
                  {data.heading.text}
                </HeadingText>
              </div>
              <div className="max-w-full md:max-w-125.5 flex-1">
                {data.description.map((des, index) => (
                  <BodyText
                    key={des}
                    className={`${index === 0 ? "mt-0" : "mt-between-content"}`}
                  >
                    {des}
                  </BodyText>
                ))}
              </div>
            </div>
            </Reveal>
            <DocumentCarousel
              overlay={{
                subtitle: false,
                badge: false,
                description: false,
                title: index === 0 ? true : false,
                stacks: index === 0 ? true : false,
                visitButton: index === 0 ? true : false,
              }}
              behavior={{ autoPlay: false, loop: true }}
              items={projects}
            />
          </section>
        );
      })}
    </>
  );
}

export default Sections;
