import Button from "@/components/Buttons/Button";
import GlowSection from "@/components/GlowSection"

function page() {
  return (
    <>
      <GlowSection
        glows={[
          { position: "bottom-left", color: "#1096C7", duration: "12s" },
          { position: "top-right", color: "#1096C7", duration: "15s" },
        ]}
        title={
          <>
            What We
            <span className="text-highlight-text-color font-bold font-inter">
               {' '} Build
            </span>
          </>
        }
        subtitle="From design and development to marketing and automation, explore the services that support every stage of digital growth"
        buttons={
          <>
            <Button href="/#contact" className="w-full">
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
      ></GlowSection>
    </>
  );
}

export default page