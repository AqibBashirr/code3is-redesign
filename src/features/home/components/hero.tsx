import Button from "@/components/Buttons/Button";
import GlowSection from "@/components/GlowSection"; // Adjust path as needed
import React from "react";

export default function HeroSection() {
  return (
    <GlowSection
      // 1. Pass the glows as an array of objects
      glows={[
        { position: "top-left", color: "#1096C7", duration: "12s" },
        { position: "bottom-right", color: "#1096C7", duration: "15s" },
      ]}
      // 2. Pass the title (Using a React Fragment <> to allow HTML like <br /> and <span>)
      title={
        <>
          Everything Your Brand Needs <br />
          One <span className="text-highlight-text-color font-bold font-inter">System</span>
        </>
      }
      // 3. Pass the subtitle
      subtitle="Web Development • Branding • Performance Marketing"
      // 4. Pass the buttons you want to use
      buttons={
        <>
          <Button href="/#contact" className="w-full flex items-center justify-center">
            START A PROJECT
          </Button>

          <Button
            href="/our-work"
            variant="outline"
            arrow={false}
            className="w-full flex items-center justify-center"
          >
            VIEW OUR WORK
          </Button>
        </>
      }
    />
  );
}
