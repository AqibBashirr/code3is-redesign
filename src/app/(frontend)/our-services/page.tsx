import AdvanceImage from "@/components/AdvancedImage";
import ButtonLink from "@/components/Buttons/ButtonLink";
import Hero from "@/components/common/hero";
import ImageBgContainer from "@/components/common/ImageBgContainer";
import { Reveal } from "@/components/Reveal";
import BodyText from "@/components/typography/BodyText";
import HeadingPill from "@/components/typography/headingPill";
import HeadingText from "@/components/typography/headingText";
import WhatWeDoSections from "@/features/our-services/components/WhatWeDoSections";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
// Import getAbsoluteUrl if you have it available, otherwise we use the hardcoded domain for OG images
// import { getAbsoluteUrl } from "@/lib/url";

export const metadata: Metadata = {
  // Optimized to highlight high-value services beyond basic development
  title: "Services: Web Apps, Branding, SEO & Automation",
  description:
    "Code3IS offers full-stack digital services: custom web applications, UI/UX design, corporate branding, SEO, Meta/Google Ads, and business automation.",
  alternates: {
    canonical: "https://www.code3is.com/our-services",
  },
  openGraph: {
    type: "website",
    url: "https://www.code3is.com/our-services",
    title: "Code3IS Services | Web Apps, Branding, SEO & Ads",
    description:
      "Explore our complete suite of digital services. We build custom web apps, design brand identities, and scale businesses with performance marketing.",
    images: [
      {
        url: "https://www.code3is.com/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Code3IS Services - Web Apps, Branding, SEO & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code3IS Services | Web Apps, Branding, SEO & Ads",
    description:
      "Explore our complete suite of digital services. We build custom web apps, design brand identities, and scale businesses with performance marketing.",
    images: ["https://www.code3is.com/og/og-default.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Full-Stack Digital Agency Services",
  provider: { "@id": "https://www.code3is.com/#organization" },
  areaServed: ["India", "Jammu and Kashmir", "United Arab Emirates"],
  // Optimized catalog to perfectly match your Build, Design, Grow, Scale pillars
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Code3IS Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Application Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "UI/UX & Website Design" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Identity & Corporate Branding",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Search Engine Optimization (SEO)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Marketing (Meta & Google Ads)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Automation & API Integration",
        },
      },
    ],
  },
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
      name: "Our Services",
      item: "https://www.code3is.com/our-services",
    },
  ],
};

// 1. The type for the individual items (what we used in the component)
export type SectionDataProps =
  | {
      heading: {
        text?: string; // Optional: covers both {text, highlight} and {highlight only}
        highlight: string;
      };
      description: string[];
      image?: never;
    }
  | {
      heading: {
        text: string; // Required: images always need a fallback text
        highlight?: never;
      };
      image: {
        alt: string;
        src: string;
      };
      description?: never;
    };

// 2. The type for the entire WHAT_WE_DO_DATA array
export type WhatWeDoCategory = {
  title: string;
  childrens: SectionDataProps[];
};

export type WhatWeDoDataArray = WhatWeDoCategory[];

function page() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero
        title={
          <>
            Services That Build Your{" "}
            <span className="text-highlight-text-color font-bold">Brand</span>
          </>
        }
        subtitle="From web development and branding to SEO and marketing, explore every service that grows your business online"
      />
      <section className="pt-y max-w-max mx-auto px-x flex flex-col items-center lg:flex-row gap-space-content">
        <div className="flex-1 max-w-full lg:max-w-143.75">
          <Reveal y={0} x={"-40px"} threshold={0.4}>
            <HeadingPill>Services</HeadingPill>
            <HeadingText highlightText="Growth" className="mt-between-content">
              Built Around Strategy, Speed, And
            </HeadingText>
            <div className="mt-between-content">
              <BodyText>
                We work across design, development, marketing, and technical
                infrastructure.
              </BodyText>
              <BodyText className="mt-between-content">
                The goal is always the same, whether it&apos;s a five-page site
                or a full booking platform: solve the actual problem, not just
                deliver a nice-looking file.
              </BodyText>
            </div>
          </Reveal>
          <Reveal
            y={0}
            x={"40px"}
            threshold={0.6}
            className="lg:hidden bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB] rounded-[10px] border border-overlay-card mt-between-content"
          >
            <AdvanceImage
              src="/images/our-services/services.avif"
              alt="service Image feel Good Travels"
              width={678}
              height={475}
            />
          </Reveal>
          <Reveal y={0} x={"-40px"} threshold={0.4} className="">
            <ButtonLink
              href="/#contact"
              className="mt-content-gap"
              variant="dark"
            >
              Start A Project
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal
          y={0}
          x={"40px"}
          threshold={0.4}
          className="flex-1 hidden lg:block"
        >
          <ImageBgContainer
            src="/images/our-services/services.avif"
            alt="service Image feel Good Travels"
            width={678}
            height={475}
            bgClass="bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB]  border
      border-overlay-card"
          ></ImageBgContainer>
        </Reveal>
      </section>
      <WhatWeDoSections />
    </>
  );
}

export default page;
