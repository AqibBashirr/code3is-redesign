// src/components/ui/ButtonLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/constants/utils";
import { CTAButtonLinkProps } from "@/types/ButtonProps.types";
import { variants } from "@/constants/ButtonVariants";
import { arrowVariants } from "@/constants/ArrowVariants";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
  prefetch = false,
  onClick,
  ...props
}: CTAButtonLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof href === "string" && href.includes("#")) {
      const [path, hash] = href.split("#");

      if (path === "" || path === pathname) {
        e.preventDefault();
        const element = document.getElementById(hash);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);

          // Make the target element programmatically focusable
          element.setAttribute("tabindex", "-1");
          // Move the focus to the new section without breaking the smooth scroll
          element.focus({ preventScroll: true });
        }
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      {...props}
      prefetch={prefetch}
      href={href}
      onClick={handleClick}
      className={cn(
        "group rounded-sm inline-flex items-center justify-center text-center font-inter font-medium uppercase text-content-font transition-all duration-300 gap-[clamp(8px,2vw,12px)] px-[clamp(20px,4vw,28px)] h-[clamp(48px,6vw,60px)] hover:scale-[1.2] ",
        variants[variant as keyof typeof variants],
        className,
      )}
    >
      <span>{children}</span>

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
    </Link>
  );
}
