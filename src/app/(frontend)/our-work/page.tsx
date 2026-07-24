import Hero from "@/components/common/hero";
import Sections from "@/features/our-work/components/sections";
import { getWorkSections } from "@/lib/cache/work-sections";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  // Next.js will automatically append " | Code3IS" from your layout template
  title: "Our Work: Websites, Branding & Ads Portfolio",
  description:
    "Explore our portfolio of custom web apps, brand identities, ad campaigns, and creative assets built for businesses across hospitality, education, agriculture, and more.",
  alternates: {
    canonical: "https://www.code3is.com/our-work",
  },
  openGraph: {
    type: "website",
    url: "https://www.code3is.com/our-work",
    title: "Code3IS Portfolio | Websites, Branding & Ads",
    description:
      "A collection of websites, brands, campaigns & creative assets crafted for businesses in Kashmir, India, the UAE, and globally.",
    images: [
      {
        url: "https://www.code3is.com/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Code3IS Work & Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code3IS Portfolio | Websites, Branding & Ads",
    description:
      "A collection of websites, brands, campaigns & creative assets crafted for businesses globally.",
    images: ["https://www.code3is.com/og/og-default.png"],
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.code3is.com/our-work#webpage",
  name: "Code3IS Portfolio & Work Gallery",
  description:
    "A collection of custom web applications, brand identities, and digital marketing campaigns.",
  url: "https://www.code3is.com/our-work",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.code3is.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Our Work",
      item: "https://www.code3is.com/our-work",
    },
  ],
};

async function Page() {
  const workSections = await getWorkSections();

  return (
    <>
      <JsonLd data={portfolioSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero
        title={
          <>
            Ideas Made{" "}
            <span className="text-highlight-text-color font-bold">Visible</span>
          </>
        }
        buttons={{
          firstButton: { text: "Start A Project", href: "/#contact" },
          secondButton: {
            text: "View Our Work",
            href: "#website",
            arrow: false,
            variant: "outline",
          },
        }}
        subtitle="Real websites, brand systems, and campaigns, built for real businesses across hospitality, education, and agriculture"
      />
      {/* Pass the retrieved documents array to your Sections component */}
      <Sections sections={workSections} />
    </>
  );
}

export default Page;
