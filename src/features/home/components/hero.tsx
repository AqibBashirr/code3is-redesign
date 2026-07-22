import ButtonLink from "@/components/Buttons/ButtonLink";
import GlowSection from "@/components/GlowSection"; 

export default function HeroSection() {
  return (
    <GlowSection
      // 1. Pass the glows as an array of objects
      glows={[
        { position: "top-left", color: "#1096C7", duration: "15s" },
        { position: "bottom-right", color: "#1096C7", duration: "20s" },
      ]}
      // 2. Pass the title (Using a React Fragment <> to allow HTML like <br /> and <span>)
      title={
        <>
          Everything Your Brand Needs <br />
          One{" "}
          <span className="text-highlight-text-color font-bold">System</span>
        </>
      }
      // 3. Pass the subtitle
      subtitle="Web Development, Branding & Performance Marketing  Kashmir to the UAE"
      // 4. Pass the buttons you want to use
      buttons={
        <>
          <ButtonLink
            href="/#contact"
            className="w-full flex items-center justify-center"
          >
            GET FREE ESTIMATE
          </ButtonLink>

          <ButtonLink
            href="/our-work#website"
            variant="outline"
            arrow={false}
            className="w-full flex items-center justify-center"
          >
            VIEW OUR WORK
          </ButtonLink>
        </>
      }
    />
  );
}
