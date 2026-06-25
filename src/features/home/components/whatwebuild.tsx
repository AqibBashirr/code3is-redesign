import AdCard from "../../../components/Cards/addCard";
import Button from "@/components/Buttons/Button";
import BodyText from "@/components/typography/BodyText";
import HighlightText from "@/components/typography/Highlight";
import HeadingText from "@/components/typography/headingText";

export default function WhatWeBuild() {
  const cards = [
    {
      title: "Websites",
      imageSrc: "/images/what-we-build/websites.png",
      href: "1",
    },
    {
      title: "Creatives",
      imageSrc: "/images/what-we-build/creatives.png",
      href: "2",
    },
    {
      title: "Branding",
      imageSrc: "/images/what-we-build/branding.png",
      href: "3",
    },
    {
      title: "Stationery",
      imageSrc: "/images/what-we-build/stationery.png",
      href: "4",
    },
    {
      title: "Print Design",
      imageSrc: "/images/what-we-build/print-design.png",
      href: "5",
    },
    { title: "Ads", imageSrc: "/images/what-we-build/ads.png", href: "6" },
  ];

  return (
    <section className=" py-y px-x font-sans min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[clamp(20px,3.4vw,44px)] relative">
          {/* Header Block */}
          <div className="col-span-2 flex flex-col justify-center items-center md:items-start mb-6 md:mb-0 pr-0 md:pr-8">
            <HeadingText className="text-center">
              What We <HighlightText className="italic">Build</HighlightText>
            </HeadingText>

            <BodyText className="sm:mb-content-gap max-w-sm text-center md:text-start">
              A glimpse into the digital products and brand systems we&apos;ve
              built for our clients
            </BodyText>

            <Button href="#" variant="dark" className="hidden md:flex">
              Start a Project
            </Button>
          </div>

          {/* Render Cards */}
          {cards.map((card) => (
            <AdCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button href="#" variant="dark">
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
}
