// src/components/ui/ButtonLink.tsx
import { ArrowRight } from "lucide-react";
import { cn } from "@/constants/utils";
import { CTAButtonProps } from "@/types/ButtonProps.types";
import { variants } from "@/constants/ButtonVariants";
import { arrowVariants } from "@/constants/ArrowVariants";






export default function Button({
  children,
  variant = "primary",
  arrow = true,
  className,
  ...props
}: CTAButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group rounded-sm inline-flex items-center justify-center text-center font-inter font-medium uppercase text-content-font transition-all duration-300 gap-[clamp(8px,2vw,12px)] px-[clamp(20px,4vw,28px)]  hover:scale-[1.02] ",
        variants[variant as keyof typeof variants],
        className,
      )}
    >
      {children && <span>{children}</span>}

      {arrow && (
        <ArrowRight
          aria-hidden="true"
          role="presentation"
          className={cn(
            "size-4 transition-transform duration-300 group-hover:translate-x-1",
            arrowVariants[variant as keyof typeof arrowVariants],
          )}
        />
      )}
    </button>
  );
}
