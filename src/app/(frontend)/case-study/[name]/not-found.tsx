import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";

export default function CaseStudyNotFound() {
  return (
    <>
      <Hero
        className="mb-between-content"
        title={
          <>
            <HighlightTextHero HighlightText="Project Not Found" />
          </>
        }
        subtitle=" We couldn't find the case study you were looking for. It may have
          been moved, renamed, or doesn't exist."
        buttons={{
          firstButton: { text: "Start A Project", href: "#contact" },
          secondButton: {
            text: "View Our Work",
            href: `/#our-work`,
            arrow: false,
            variant: "outline",
            disabled: true,
          },
        }}
      />
  
        <br/>
    
    </>
  );
}
