// import Image from "next/image";
import Availservice from "@/features/home/components/Availservice";
import CaseStudy from "@/features/home/components/caseStudy";
import Contact from "@/features/home/components/contact";
import HeroSection from "@/features/home/components/hero";
import SelectedWork from "@/features/home/components/SelectedWork";
import Service from "@/features/home/components/service";
import TrustedBy from "@/features/home/components/trustedby";
import WhatWeBuild from "@/features/home/components/whatwebuild";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Web Development & Branding Agency | Code3IS, Kashmir",
  description:
    "Websites, brand identity & ad campaigns — based in Kashmir, serving clients across India, the UAE, and internationally. Free estimate.",
  alternates: {
    canonical: "https://www.code3is.com/",
  },
  keywords: [
    "web development company Kashmir",
    "web development company India",
    "branding agency India",
    "digital marketing agency",
    "SEO agency Kashmir",
    "custom software development",
    "UI/UX design agency",
    "SEO services",
    "brand identity system",
    "performance marketing agency",
    "remote software development team",
    "scalable web systems",
  ],
  openGraph: {
    url: "https://www.code3is.com/",
    title: "Code3IS — Web Development & Branding, Kashmir to Global",
    description:
      "Websites, brand systems, and ad campaigns for businesses based in Kashmir, serving clients across India, the UAE, and beyond.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depends on scope — quoted after a quick call, fixed price before we start.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most business websites take 3 to 5 weeks. Apps and branding systems take longer.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we currently work with clients in the UAE, with calls set to the client's time zone, shared project tracking, and English contracts. We're also open to new clients in the US and UK.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the site and code after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The client owns all files and access, handed over at project completion.",
      },
    },
  ],
};
export default function Main() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <HeroSection />
      <WhatWeBuild />
      <TrustedBy />
      <SelectedWork />
      <Service />
      <CaseStudy />
      <Availservice />
      <Contact />
    </>
  );
}
