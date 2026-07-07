import Hero from "@/components/common/hero";
import HighlightTextHero from "@/components/common/HighlightTextHero";
import ContentBlockIntro from "@/components/typography/ContentBlockIntro";


function BlogsPage() {
  return (
    <>
      <Hero
        title={
          <>
            Popular <HighlightTextHero HighlightText="Reads" />
          </>
        }
        subtitle="Fresh insights, practical tips, and proven strategies to help your business stay ahead."
        buttons={{
          firstButton: { text: "Start A Project", href: "#contact" },
          secondButton: {
            text: "View Our Work",
            href: `/our-work#website`,
            arrow: false,
            variant: "outline",
          },
        }}
      />
      <ContentBlockIntro
        pill="blogs"
        heading={{
          text: "Stay Ahead of Digital ",
          highlight: "Trends",
        }}
        description={[
          "Get practical insights, marketing tips, website optimization strategies, and industry updates delivered to your inbox.",
        ]}
      />
    </>
  );
}

export default BlogsPage