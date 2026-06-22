import Link from "next/link";
import AdCard from "../../../components/Cards/addCard";
import Button from "@/components/Buttons/Button";

export default function WhatWeBuild() {
  const cards = [
    {
      title: "Websites",
      imageSrc: "/images/what-we-build/branding.png",
      href: "#",
    },
    {
      title: "Creatives",
      imageSrc: "/images/what-we-build/branding.png",
      href: "#",
    },
    {
      title: "Branding",
      imageSrc: "/images/what-we-build/branding.png",
      href: "#",
    },
    {
      title: "Stationery",
      imageSrc: "/images/what-we-build/branding.png",
      href: "#",
    },
    {
      title: "Print Design",
      imageSrc: "/images/what-we-build/branding.png",
      href: "#",
    },
    { title: "Ads", imageSrc: "/images/what-we-build/branding.png", href: "#" },
  ];

  return (
    <section className=" py-y px-x font-sans min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 relative">
          {/* Header Block */}
          <div className="col-span-2 flex flex-col justify-center items-start mb-6 md:mb-0 pr-0 md:pr-8">
            <h2 className="font-raleway font-semibold text-center text-[clamp(28px,3vw,40px)]">
              What We{" "}
              <span className="italic underline decoration-[#a3e635] decoration-4 underline-offset-8">
                Build
              </span>
            </h2>
            <p className=" text-secondary-color mt-6 sm:mb-content-gap max-w-sm  ">
              A glimpse into the digital products and brand systems we&apos;ve
              built for our clients
            </p>
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
