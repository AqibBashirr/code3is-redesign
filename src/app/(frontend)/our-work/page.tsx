import ButtonLink from "@/components/Buttons/ButtonLink";
import Hero from "@/components/common/hero";
import DocumentCarousel, {
  CarouselDocument,
} from "@/components/DocumentCarousel";
import GlowSection from "@/components/GlowSection";
import BodyText from "@/components/typography/BodyText";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import { OUR_WORK } from "@/constants/our-work";
import Sections from "@/features/what-we-do/components/sections";

function page() {
  // const projects:CarouselDocument[] = [
  //   {
  //     id: 1,
  //     title: "GreyMax",
  //     category: "Web Development",
  //     description: "Corporate Website",

  //     image: "/images/what-we-build/slides/greymax.png",

  //     badge: "FEATURED",

  //     stacks: ["nextjs"],

  //     cta: {
  //       label: "Visit Website",
  //       href: "https://greymax.ae",
  //     },
  //   },
  //   {
  //     id: 3,
  //     title: "Harmain Service Provider",
  //     category: "Web Development",
  //     description: "Corporate Website",

  //     image: "/images/what-we-build/slides/harmain.png",

  //     badge: "FEATURED",

  //     stacks: ["nextjs", "figma", "react"],

  //     cta: {
  //       label: "Visit Website",
  //       href: "https://harmain.in",
  //     },
  //   },

  //   {
  //     id: 2,
  //     title: "C3IS",

  //     image: "/images/what-we-build/slides/harmain.png",
  //     urlLink: "#",
  //     category: "Software",

  //     stacks: ["nextjs"],
  //   },
  // ];

  return (
    <>
      <Hero
        title={
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold font-inter">
              Visible
            </span>
          </>
        }
        subtitle="A collection of websites, brands, campaigns & creative assets crafted for businesses across industries"
      />
      <Sections />
    </>
  );
}

export default page;
