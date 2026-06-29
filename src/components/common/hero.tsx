import { ReactNode } from "react";
import ButtonLink from "../Buttons/ButtonLink";
import GlowSection, { GlowConfig } from "../GlowSection";


export interface HeroProps {
  glows?: GlowConfig[];
  title: ReactNode;
  subtitle:string;
}

function Hero({
  glows = [
    { position: "bottom-left", color: "#1096C7", duration: "12s" },
    { position: "top-right", color: "#1096C7", duration: "15s" },
  ],
  title,
  subtitle = "A collection of websites, brands, campaigns & creative assets crafted for businesses across industries",
}: HeroProps) {
  return (
    <GlowSection
      glows={glows}
      title={
        title || (
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold font-inter">
              Visible
            </span>
          </>
        )
      }
      subtitle={subtitle}
      buttons={
        <>
          <ButtonLink href="/#contact" className="w-full">
            START A PROJECT
          </ButtonLink>

          <ButtonLink
            href="/our-work"
            variant="outline"
            arrow={false}
            className="w-full flex items-center justify-center"
          >
            VIEW OUR WORK
          </ButtonLink>
        </>
      }
    ></GlowSection>
  );
}

export default Hero