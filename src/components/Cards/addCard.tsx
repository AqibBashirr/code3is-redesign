import React from "react";
import Image from "next/image";
import Link from "next/link";


interface cardProps{
  card:{title: string;
  imageSrc: string;
  href: string;}
}
export default function PortfolioCard({ card }: cardProps ) {
  const pageBackgroundColor = "bg-background";
  const textColor = "text-background";
  return (
    <Link
      href={card.href ? `/our-work/#${card.href}` : "#"}
      className="relative w-full font-sans group aspect-square shrink-0 scroll-p-50"
    >
      {/* --- 1. MAIN CARD --- */}
      <div className="absolute inset-0 bg-[#1e2525] rounded-3xl overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={card.imageSrc ?? "/images/what-we-build/branding1.png"}
            alt={`${card.title} Project Mockup`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 transition-colors duration-300 group-hover:bg-black/40"></div>
        </div>
      </div>

      {/* --- TITLE --- */}
      {/* Mobile left-[52px] to safely clear the tighter 40px wrapper */}
      <h3 className="absolute left-[52px] md:left-[94px] bottom-1 md:bottom-5 text-white text-[clamp(14px,1.8vw,22px)] font-semibold z-20 pointer-events-none font-raleway tracking-wide max-w-[60%] text-nowrap overflow-hidden  text-ellipsis">
        {card.title}
      </h3>

      {/* --- 2. THE CUTOUT GAP WRAPPER --- */}
      {/* Mobile: 40px Wrapper. Desktop: 74px Wrapper. */}
      <div
        className={`absolute bottom-0 left-0 w-[40px] h-[40px] md:w-[74px] md:h-[74px] ${pageBackgroundColor} rounded-tr-[16px] md:rounded-tr-[24px] z-10`}
      ></div>

      {/* --- 3. SMOOTHING CORNERS --- */}
      {/* Mobile: 16px curve. Desktop: 24px curve. */}
      <svg
        className={`absolute left-0 bottom-[40px] md:bottom-[74px] w-[16px] h-[16px] md:w-[24px] md:h-[24px] ${textColor} z-10`}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M 0 0 V 100 H 100 C 44.77 100 0 55.23 0 0 Z" />
      </svg>

      <svg
        className={`absolute bottom-0 left-[40px] md:left-[74px] w-[16px] h-[16px] md:w-[24px] md:h-[24px] ${textColor} z-10`}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M 0 0 V 100 H 100 C 44.77 100 0 55.23 0 0 Z" />
      </svg>

      {/* --- 4. THE BUTTON --- */}
      {/* Mobile: 32px button (8px radius). Desktop: 64px button (14px radius). */}
      <button
        className="absolute bottom-0 left-0 w-[32px] h-[32px] md:w-[64px] md:h-[64px] bg-overlay-card rounded-[8px] md:rounded-[14px] flex items-center justify-center shadow-md z-20 group-hover:bg-[#404144] transition-all duration-300"
        aria-label={`View ${card.title} Projects`}
      >
        <svg
          className="w-4 h-4 md:w-8 md:h-8 text-[#bfff00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </button>
    </Link>
  );
}
