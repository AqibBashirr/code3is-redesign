// import Image from "next/image";
import Availservice from "@/features/home/components/Availservice";
import CaseStudy from "@/features/home/components/caseStudy";
import Contact from "@/features/home/components/contact";
import HeroSection from "@/features/home/components/hero";
import SelectedWork from "@/features/home/components/SelectedWork";
import Service from "@/features/home/components/service";
import TrustedBy from "@/features/home/components/trustedby";
import WhatWeBuild from "@/features/home/components/whatwebuild";


export default function Main() {
  return (
    <>
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
