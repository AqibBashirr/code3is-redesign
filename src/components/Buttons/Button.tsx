// src/components/ui/Button.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/constants/utils";

type CTAProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  arrow?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-off-white-color text-black hover:bg-neutral-200",

  outline:
    "border border-white/20 text-white hover:border-white hover:bg-white/5",

  dark: "bg-offBlack-color text-white hover:bg-black",
} as const;

const arrowVariants = {
  primary: "text-current",
  outline: "text-current",
  dark: "text-lime-400",
} as const;

export default function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
}: CTAProps) {
  return (
    <Link
      href={href}
      className={cn(
          "group rounded-sm inline-flex items-center justify-center text-center font-inter font-medium uppercase text-content-font transition-all duration-300 gap-[clamp(8px,2vw,12px)] px-[clamp(20px,4vw,28px)] h-[clamp(48px,6vw,60px)]",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>

      {arrow && (
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-300 group-hover:translate-x-1",
            arrowVariants[variant],
          )}
        />
      )}
    </Link>
  );
}
