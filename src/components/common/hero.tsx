import { ReactNode } from "react";
import ButtonLink from "../Buttons/ButtonLink";
import GlowSection, { GlowConfig } from "../GlowSection";
import { CTAButtonLinkProps } from "@/types/ButtonProps.types";
import HighlightTextHero from "./HighlightTextHero";

interface button extends CTAButtonLinkProps {
  text?: string;
  href: string;
  disabled?: boolean;
}

interface buttons {
  firstButton:button;
  secondButton:button;
}



export interface HeroProps {
  glows?: GlowConfig[];
  title: ReactNode;
  subtitle: string;
  buttons?: buttons;
}

function Hero({
  glows = [
    { position: "bottom-left", color: "#1096C7", duration: "12s" },
    { position: "top-right", color: "#1096C7", duration: "15s" },
  ],
  title,
  subtitle = "A collection of websites, brands, campaigns & creative assets crafted for businesses across industries",
  buttons = {
    firstButton: { text: "Start A Project", href: "/#contact"},
    secondButton: { text: "View Our Work", href: "/our-work#website",arrow:false,variant:"outline" },
  },
}: HeroProps) {
  return (
    <GlowSection
      glows={glows}
      title={
        title || (
          <>
            Ideas Made{" "}
            <HighlightTextHero HighlightText="Visible"></HighlightTextHero>
          </>
        )
      }
      subtitle={subtitle}
      buttons={
        <>
          {!buttons.firstButton.disabled && (
            <ButtonLink
              href={buttons.firstButton.href}
              className={`w-full uppercase ${buttons.firstButton.className}`}
            >
              {buttons.firstButton.text}
            </ButtonLink>
          )}
          {!buttons.secondButton.disabled && (
            <ButtonLink
              href={buttons.secondButton.href}
              variant={buttons.secondButton.variant}
              arrow={buttons.secondButton.arrow}
              className={`w-full flex items-center justify-center uppercase ${buttons.secondButton.className}`}
            >
              {buttons.secondButton.text}
            </ButtonLink>
          )}
        </>
      }
    ></GlowSection>
  );
}

export default Hero;
