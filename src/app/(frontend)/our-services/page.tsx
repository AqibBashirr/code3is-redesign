import AdvanceImage from "@/components/AdvancedImage";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Hero from "@/components/common/hero";
import ImageBgContainer from "@/components/common/ImageBgContainer";
import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import WhatWeDoSections from "@/features/our-services/components/WhatWeDoSections";


// 1. The type for the individual items (what we used in the component)
export type SectionDataProps =
  | {
      heading: {
        text?: string; // Optional: covers both {text, highlight} and {highlight only}
        highlight: string;
      };
      description: string[];
      image?: never;
    }
  | {
      heading: {
        text: string; // Required: images always need a fallback text
        highlight?: never;
      };
      image: {
        alt: string;
        src: string;
      };
      description?: never;
    };

// 2. The type for the entire WHAT_WE_DO_DATA array
export type WhatWeDoCategory = {
  title: string;
  childrens: SectionDataProps[];
};

export type WhatWeDoDataArray = WhatWeDoCategory[];

function page() {
  return (
    <>
      <Hero
        title={
          <>
            What We{" "}
            <span className="text-highlight-text-color font-bold">Build</span>
          </>
        }
        subtitle="From design and development to marketing and automation, explore the services that support every stage of digital growth"
      />
      <section className="pt-y max-w-max mx-auto px-x flex flex-col items-center lg:flex-row gap-space-content">
        <div className="flex-1 max-w-full lg:max-w-143.75">
          <Reveal y={0} x={"-40px"} threshold={0.4}>
            <HeadingPill>Services</HeadingPill>
            <HeadingText highlightText="Growth" className="mt-between-content">
              Built Around Clarity, Performance, And
            </HeadingText>
            <div className="mt-between-content">
              <BodyText>
                We work across design, development, marketing, and digital
                infrastructure to help businesses create better experiences
                online.
              </BodyText>
              <BodyText>
                Every service is approached with the same focus: solving real
                problems through thoughtful execution and attention to detail.
              </BodyText>
            </div>
          </Reveal>
          <Reveal
            y={0}
            x={"40px"}
            threshold={0.6}
            className="lg:hidden bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB] rounded-[10px] border border-overlay-card mt-between-content"
          >
            <AdvanceImage
              src="/images/our-services/services.avif"
              alt="service Image feel Good Travels"
              width={678}
              height={475}
            />
          </Reveal>
          <Reveal y={0} x={"-40px"} threshold={0.4} className="">
            <ButtonLink
              href="/#contact"
              className="mt-content-gap"
              variant="dark"
            >
              Start A Project
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal
          y={0}
          x={"40px"}
          threshold={0.4}
          className="flex-1 hidden lg:block"
        >
          <ImageBgContainer
            src="/images/our-services/services.avif"
            alt="service Image feel Good Travels"
            width={678}
            height={475}
            bgClass="bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB]  border
      border-overlay-card"
          ></ImageBgContainer>
        </Reveal>
      </section>
      <WhatWeDoSections />
    </>
  );
}

export default page;
