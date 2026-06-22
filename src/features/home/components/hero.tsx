import Button from "@/components/Buttons/Button";


export default function HeroSection() {
  return (
    <section
      className=" flex flex-col justify-center items-center text-center px-4 py-[84px_112px] md:py-29.75  my-5.5 rounded-[10px] mx-5 md:mx-6.25 bg-[#1e1e1e] text-white font-sans"
      style={{
        // Recreating the subtle cyan glows using inline CSS radial gradients
        backgroundImage: `
          radial-gradient(circle at 0% 50%, rgba(14, 116, 144, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 100% 50%, rgba(14, 116, 144, 0.15) 0%, transparent 40%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-[2.5rem] md:text-5xl lg:text-6xl font-semibold leading-[1.2] mb-6 tracking-tight font-raleway">
        Everything Your Brand Needs
        <br />
        One <span className="text-[#a3e635] font-bold">System</span>
      </h1>

      <p className="text-gray-300 text-base md:text-lg mb-10 font-normal font-inter">
        Web Development &bull; Branding &bull; Performance Marketing
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-75 md:max-w-none items-center md:justify-center">
        <Button href="#">Start a Project</Button>
        <Button href="#" variant="outline" arrow={false}>
          View Our Work
        </Button>
      </div>
    </section>
  );
}
