import BigBgText from "@/components/BigBgText";
import BodyText from "@/components/BodyText";
import ContactForm from "@/components/Forms/ContactForm";
import HeadingPill from "@/components/headingPill";
import HeadingText from "@/components/headingText";
import HighlightText from "@/components/Highlight";

function Contact() {
  return (
    <section id="contact" className=" py-y">
      {/* <h2 className="text-[min(16.4vw,250px)] font-extrabold whitespace-nowrap leading-[15vw]  text-big-text-font-color uppercase text-center mb-content-gap font-vanguard"> */}
      <BigBgText>Contact</BigBgText>
      <div className="max-w-max mx-auto md:px-x text-center md:text-start lg:-mt-[9%]">
        <div className="main-text mt-between-content flex flex-col  lg:flex-row lg:items-center gap-6 ">
          <div className="flex-1 px-x md:px-0 lg:max-w-[450px]">
            <HeadingPill>Contact</HeadingPill>
            <HeadingText className="mt-between-content">
              LET’S BUILD SOMETHING THAT{" "}
              <HighlightText>
                WORKS.
              </HighlightText>
            </HeadingText>

            <BodyText className="capitalize ">
              Whether it’s branding, web development, or performance marketing,
              we help businesses build digital systems that actually move
              results.
            </BodyText>
          </div>
          <div className="form-container flex-1 flex items-end lg:justify-end justify-center text-start">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
