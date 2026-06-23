import BigBgText from "@/components/BigBgText";
import BodyText from "@/components/BodyText";
import ContactForm from "@/components/Forms/ContactForm";
import HeadingPill from "@/components/headingPill";

function Contact() {
  return (
    <section id="contact" className=" py-y">
      {/* <h2 className="text-[min(16.4vw,250px)] font-extrabold whitespace-nowrap leading-[15vw]  text-big-text-font-color uppercase text-center mb-content-gap font-vanguard"> */}
      <BigBgText>Contact</BigBgText>
      <div className="max-w-max mx-auto md:px-x text-center md:text-start lg:-mt-[9%]">
        <div className="main-text mt-between-content flex flex-col  lg:flex-row lg:items-center gap-6 ">
          <div className="flex-1 px-x md:px-0 lg:max-w-[450px]">
            <HeadingPill>Contact</HeadingPill>
            <h2 className="font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[120%] mt-between-content">
              LET’S BUILD SOMETHING THAT{" "}
              <span className="underline underline-offset-7 decoration-highlight-text-color">
                WORKS.
              </span>
            </h2>

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
