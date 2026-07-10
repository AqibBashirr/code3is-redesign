// src/components/ui/Logo.tsx
import Image, { type ImageProps } from "next/image";
import { cn } from "@/constants/utils";

type LogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  width?: number;
  height?: number;
  variant?: "default" | "white";
  preload?: boolean; 
};

export default function Logo({
  variant = "default",
  width = 180,
  height = 48,
  className,
  preload = true, // Defaults to true since a header logo is always above-the-fold
  ...props
}: LogoProps) {
  const logoSrc =
    variant === "white"
      ? "/logos/company-logos/code3is-logo-white.svg"
      : "/logos/company-logos/code3is-logo.svg";

  return (
    <Image
      src={logoSrc}
      alt="Code3 Innovative Solutions"
      width={width}
      height={height}
      priority
      preload={preload} 
      className={cn(
        "h-full w-full max-w-[clamp(80px,12vw,164px)] shrink-0 object-contain",
        className,
      )}
      {...props}
    />
  );
}
