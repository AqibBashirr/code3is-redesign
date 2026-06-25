import CornerGlow from "@/components/CornerGlow";
import React, { ReactNode } from "react";

// Define the shape of a single glow object
export interface GlowConfig {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  duration?: string;
}

// Define the shape of the GlowSection props
interface GlowSectionProps {
  title: ReactNode;
  subtitle?: string;
  buttons?: ReactNode;
  glows?: GlowConfig[]; // Tells TS: This is an array of GlowConfig objects
  className?: string;
}

export default function GlowSection({
  title,
  subtitle,
  buttons,
  glows = [],
  className = "",
}: GlowSectionProps) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center overflow-hidden bg-[#1e1e1e] mx-5 md:mx-6.25 mt-5.5 rounded-[10px] px-4 py-[112px] md:py-29.75 ${className}`}
    >
      {/* --- DYNAMIC GLOWS --- */}
      {glows.map((glow, index) => (
        <CornerGlow
          key={index}
          position={glow.position}
          color={glow.color || "#1096C7"}
          duration={glow.duration || "12s"}
        />
      ))}

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center w-full  mx-auto text-white">
        <h1 className=" text-[clamp(2.25rem,4.3vw,3.75rem)] leading-[calc(clamp(2.25rem,5vw,3.75rem)+12px)] font-semibold mb-5 md:mb-6   font-raleway capitalize">
          {title}
        </h1>

        {subtitle && (
          <p className="max-w-147.5 text-[clamp(18px,1.5vw,22px)] mb-[clamp(20px,4.4vw,57px)] font-light font-inter">
            {subtitle}
          </p>
        )}

        {buttons && (
          <div className="grid gap-4 w-full max-w-[220px] mx-auto md:max-w-none md:w-fit md:grid-flow-col md:auto-cols-fr items-center text-center">
            {buttons}
          </div>
        )}
      </div>
    </section>
  );
}
