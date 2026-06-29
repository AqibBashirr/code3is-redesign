import ButtonLink from "@/components/Buttons/ButtonLink";
import Hero from "@/components/common/hero";
import BodyText from "@/components/typography/BodyText";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import Image from "next/image";

function page() {
  return (
    <>
      <Hero
        title={
          <>
            What We{" "}
            <span className="text-highlight-text-color font-bold font-inter">
              Build
            </span>
          </>
        }
        subtitle="From design and development to marketing and automation, explore the services that support every stage of digital growth"
      />
      <section className="py-y max-w-max mx-auto px-x flex flex-col items-center lg:flex-row gap-space-content">
        <div className="flex-1 max-w-full lg:max-w-143.75">
          <HeadingPill>Services</HeadingPill>
          <HeadingText highlightText="Growth" className="mt-between-content">
            Built Around Clarity, Performance, And
          </HeadingText>
          <BodyText>
            We work across design, development, marketing, and digital
            infrastructure to help businesses create better experiences online.
          </BodyText>
          <BodyText>
            Every service is approached with the same focus: solving real
            problems through thoughtful execution and attention to detail.
          </BodyText>
          <div className="lg:hidden bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB] rounded-[10px] border border-overlay-card mt-between-content">
            <Image
              src="/images/what-we-do/services.avif"
              alt="service Image feel Good Travels"
              width={678}
              height={475}
            ></Image>
          </div>
          <ButtonLink href="#" className="mt-content-gap" variant="dark">
            Start A Project
          </ButtonLink>
        </div>
        <div className="flex-1 hidden lg:block">
          <div className="bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB] rounded-[10px] border border-overlay-card">
            <Image
              src="/images/what-we-do/services.avif"
              alt="service Image feel Good Travels"
              width={678}
              height={475}
            ></Image>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
