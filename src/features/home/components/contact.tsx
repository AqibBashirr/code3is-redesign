import BigBgText from "@/components/typography/BigBgText";
import BodyText from "@/components/typography/BodyText";
import ContactForm from "@/components/Forms/ContactForm";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import { Reveal } from "@/components/Reveal";


function Contact() {
  return (
    <section id="contact" className=" py-y overflow-x-hidden w-dvw">
      {/* <h2 className="text-[min(16.4vw,250px)] font-extrabold whitespace-nowrap leading-[15vw]  text-big-text-font-color uppercase text-center mb-content-gap font-vanguard"> */}
      <BigBgText>Contact</BigBgText>
      <div className="max-w-max mx-auto md:px-x text-center md:text-start lg:mt-[-9%]">
        <div className="main-text mt-between-content flex flex-col  lg:flex-row lg:items-center gap-6 ">
          <Reveal
            threshold={0.6}
            y={0}
            x={"-40px"}
            className="flex-1 px-x md:px-0 lg:max-w-112.5"
          >
            <HeadingPill className="border border-secondary-background rounded-[10px] px-4 py-1">
              Contact
            </HeadingPill>
            <HeadingText
              highlightText="WORKS."
              className="mt-between-content capitalize"
            >
              Let’s Build Something That
            </HeadingText>

            <BodyText className="capitalize ">
              Whether it’s branding, web development, or performance marketing,
              we help businesses build digital systems that actually move
              results.
            </BodyText>
          </Reveal>
          <Reveal
            threshold={0.6}
            y={0}
            x={"40px"}
            className="form-container flex-1 flex items-end lg:justify-end justify-center text-start"
          >
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
