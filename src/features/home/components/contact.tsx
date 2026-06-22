import ContactForm from "@/components/Forms/ContactForm";

function Contact() {
  return (
    <section className="max-w-max mx-auto md:px-x py-y">
      <h2 className="text-[min(16.4vw,250px)] font-extrabold whitespace-nowrap leading-[15vw]  text-big-text-font uppercase text-center mb-content-gap font-vanguard">
        Contact
      </h2>
      <div className="text-center md:text-start lg:-mt-[11%]">
        <div className="main-text mt-between-content flex flex-col  lg:flex-row lg:items-center gap-6 ">
          <div className="flex-1 px-x md:px-0 lg:max-w-[450px]">
            <span className="uppercase font-raleway text-base leading-7 border border-secondary-background rounded-[10px] px-4 py-1 tracking-[30%] ">
              Contact
            </span>
            <h2 className="font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[120%] mt-between-content">
              LET’S BUILD SOMETHING THAT
              <span className="underline underline-offset-7 decoration-highlight-text-color">
                WORKS.
              </span>
            </h2>
            <p className="mt-3.5 text-secondary-color text-content-font leading-content-font capitalize font-medium mt-between-content">
              Whether it’s branding, web development, or performance marketing,
              we help businesses build digital systems that actually move
              results.
            </p>
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
