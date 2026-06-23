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
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold font-inter">
              Visible
            </span>
          </>
        }
        subtitle="A collection of websites, brands, campaigns & creative assets crafted for businesses across industries"
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