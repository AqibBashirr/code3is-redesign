import BodyText from "@/components/BodyText";
import Button from "@/components/Buttons/Button";
import HeadingText from "@/components/headingText";

const SERVICES = [
  "INTEGRATION",
  "LANDING PAGES",
  "GOOGLE / META ADS",
  "AI VIDEOS",
  "WEB DEVELOPMENT",
  "WEB DESIGN",
  "GRAPHIC DESIGN",
  "BRANDING SYSTEM",
  "CORPORATE IDENTITY",
  "AD CREATIVES",
  "AUTOMATION",
];

export default function AvailService() {
  return (
    <section className="bg-(image:--gradiant-background) overflow-hidden">
      <div className="mx-auto max-w-max px-x ">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] text-center md:text-start">
          {/* Left Content */}
          <div className="max-w-[476px] py-y md:py-0">
            <HeadingText className="font-bold text-[clamp(36px,4vw,50px)] leading-none text-highlight-text-color">
              Avail a
              <br />
              Service Now!
            </HeadingText>

            <BodyText className="text-white">Share your idea with us and we&apos;ll turn it into a custom
              solution that drives results.</BodyText>

            <Button href="#contact" className="mt-content-gap">
              Start A Project
            </Button>
          </div>

          {/* Right Animated Services */}
          <div className="services-mask hidden h-[464px] overflow-hidden md:block">
            <div className="flex flex-col animate-services-scroll">
              {[...SERVICES, ...SERVICES].map((service, index) => (
                <span
                  key={`${service}-${index}`}
                  className="whitespace-nowrap text-[clamp(21px,3vw,38px)] font-black leading-none text-white/25 uppercase font-montserrat text-center"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
