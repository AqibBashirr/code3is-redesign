import Hero from "@/components/common/hero";
import Sections from "@/features/our-work/components/sections";

function page() {
  

  return (
    <>
      <Hero
        title={
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold font-inter">
              Visible
            </span>
          </>
        }
        subtitle="A collection of websites, brands, campaigns & creative assets crafted for businesses across industries"
      />
      <Sections />
    </>
  );
}

export default page;
