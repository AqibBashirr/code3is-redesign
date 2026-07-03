import AdCard from "../../../components/Cards/addCard";
import ButtonLink from "@/components/Buttons/ButtonLink";
import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import HeadingText from "@/components/typography/headingText";

export default function WhatWeBuild() {
  const cards = [
    {
      title: "Websites",
      imageSrc: "/images/what-we-build/websites.png",
      href: "website",
    },
    {
      title: "Creatives",
      imageSrc: "/images/what-we-build/creatives.png",
      href: "creatives",
    },
    {
      title: "Branding",
      imageSrc: "/images/what-we-build/branding.png",
      href: "branding",
    },
    {
      title: "Stationery",
      imageSrc: "/images/what-we-build/stationery.png",
      href: "stationery",
    },
    {
      title: "Print Design",
      imageSrc: "/images/what-we-build/print-design.png",
      href: "print-design",
    },
    { title: "ads", imageSrc: "/images/what-we-build/ads.png", href: "ads" },
  ];

  return (
    <section className=" py-y px-x font-sans min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[clamp(20px,3.4vw,44px)] relative">
          {/* Header Block */}
          <Reveal className="col-span-2">
            <div className="flex flex-col justify-center items-center md:items-start mb-6 md:mb-0 pr-0 md:pr-8">
              <HeadingText
                highlightText="Build"
                highlightClassName="italic"
                className="text-center"
              >
                What We
              </HeadingText>

              <BodyText className="sm:mb-content-gap max-w-sm text-center md:text-start">
                A glimpse into the digital products and brand systems we&apos;ve
                built for our clients
              </BodyText>

              <ButtonLink href="#" variant="dark" className="hidden md:flex">
                Start a Project
              </ButtonLink>
            </div>
          </Reveal>

          {/* Render Cards with Staggered Reveal */}
          {cards.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index * 0.25} // Multiplies the index (0, 0.15s, 0.30s, etc.)
              y="40px" // Slides up slightly
              scale={0.9} // Pops in from 90% size
              duration="0.6s" // Fast, snappy duration
              className="w-full h-full" // Ensures the grid dimensions don't collapse
            >
              <AdCard card={card} />
            </Reveal>
          ))}
        </div>

        {/* Mobile ButtonLink */}
        <div className="mt-10 flex justify-center md:hidden">
          <ButtonLink href="#contact" variant="dark">
            Start a Project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
