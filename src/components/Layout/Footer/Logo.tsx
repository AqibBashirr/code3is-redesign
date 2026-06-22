import Image, { type ImageProps } from "next/image";
import { cn } from "@/constants/utils";

type LogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  width?: number;
  height?: number;
  variant?: "default" | "white";
};

export default function Logo({
  variant = "default",
  width = 80,
  height = 100,
  className,
  ...props
}: LogoProps) {
  const logoSrc =
    variant === "white"
      ? "/logos/company-logos/code3is-logo-white.svg"
      : "/logos/company-logos/code3is-logo-footer.svg";

  return (
    <Image
      src={logoSrc}
      alt="Code3 Innovative Solutions"
      width={width}
      height={height}
      className={cn(
        " w-[clamp(48px,12vw,80px)] shrink-0 object-contain",
        className,
      )}
      {...props}
    />
  );
}
