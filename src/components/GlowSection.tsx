import CornerGlow from "@/components/CornerGlow";
import { cn } from "@/constants/utils";
import  { ReactNode } from "react";

// Define the shape of a single glow object
export interface GlowConfig {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  duration?: string;
}

// Define the shape of the GlowSection props
interface GlowSectionProps {
  title: ReactNode;
  subtitle?: string | ReactNode;
  buttons?: ReactNode;
  glows?: GlowConfig[]; // Tells TS: This is an array of GlowConfig objects
  className?: string;
  subTitleClass?: string;
}

export default function GlowSection({
  title,
  subtitle,
  buttons,
  glows = [],
  className = "",
  subTitleClass='',
}: GlowSectionProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center text-center overflow-hidden bg-[radial-gradient(69.14%_82.48%_at_56.01%_21.24%,#3D3D3D_0%,#212121_100%),radial-gradient(7.99%_50.06%_at_0.95%_50%,rgba(0,0,0,0.2)_0%,rgba(102,102,102,0)_100%)] mx-5 md:mx-6.25 mt-5.5 rounded-[10px] px-4 py-28 md:py-29.75",
        className,
      )}
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
      <div className="absolute inset-0 bg-black/30"></div>
      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center w-full  mx-auto text-white">
        <h1 className=" text-[clamp(2.25rem,4.3vw,3.75rem)] leading-[calc(clamp(2.25rem,5vw,3.75rem)+12px)] font-semibold mb-5 md:mb-6   font-raleway capitalize">
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              `max-w-147.5 text-[clamp(18px,1.5vw,22px)]  mb-[clamp(20px,4.4vw,57px)] font-light font-inter`,
              subTitleClass,
            )}
          >
            {subtitle}
          </p>
        )}

        {buttons && (
          <div className="grid gap-4 w-full max-w-55 mx-auto md:max-w-none md:w-fit md:grid-flow-col md:auto-cols-fr items-center text-center">
            {buttons}
          </div>
        )}
      </div>
    </section>
  );
}
