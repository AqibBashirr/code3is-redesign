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
import { getAbsoluteUrl } from "@/lib/AbsoluteUrl";

export const metadata: Metadata = {
  // Next.js will automatically append " | Code3IS" from your layout.tsx template
  title:
    "Web Apps, Branding & Performance Marketing Agency | Code3 Innovative Solutions",
  description:
    "Code3IS build, design, and scale businesses. Expert custom web apps, UI/UX, brand identity systems, SEO, and ad campaigns based in Kashmir, serving clients globally.",
  alternates: {
    canonical: "https://www.code3is.com/",
  },
  openGraph: {
    url: "https://www.code3is.com/",
    title: "Code3IS | Web Apps, Branding & Performance Marketing",
    description:
      "Transforming complex challenges into seamless digital systems. We offer custom web development, UI/UX design, SEO, and automation from Kashmir to the UAE.",
    images: [
      {
        url: getAbsoluteUrl("/og/og-default.png"),
        width: 1200,
        height: 630,
        alt: "Code3IS Privacy Policy",
      },
    ],
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
