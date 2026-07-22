import AdCard from "../../../components/Cards/addCard";
import ButtonLink from "@/components/Buttons/ButtonLink";
import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import HeadingText from "@/components/typography/headingText";
import { cards } from "@/constants/what-we-build";

export default function WhatWeBuild() {
  

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

              <BodyText className="sm:mb-content-gap max-w-md text-center md:text-start mt-between-content">
                A look at the websites, brands, and campaigns we’ve built for
                clients across India and beyond
              </BodyText>

              <ButtonLink
                href="#contact"
                variant="dark"
                className="hidden md:flex"
              >
                Start a Project
              </ButtonLink>
            </div>
          </Reveal>

          {/* Render Cards with Staggered Reveal */}
          {cards.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index >= 2 ? (index - 2) * 0.25 : index * 0.25} // Multiplies the index (0, 0.15s, 0.30s, etc.)
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
          <ButtonLink href="/#contact" variant="dark">
            Start a Project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
