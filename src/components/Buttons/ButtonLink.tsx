// src/components/ui/ButtonLink.tsx
"use client"; // Required for usePathname and onClick

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
  onClick, // Extract onClick so we can chain it
  ...props
}: CTAButtonLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Check if it's a string href containing a hash anchor
    if (typeof href === "string" && href.includes("#")) {
      const [path, hash] = href.split("#");

      // 2. If the link targets the page we are currently on
      if (path === "" || path === pathname) {
        e.preventDefault(); // Stop Next.js from ignoring the click
        const element = document.getElementById(hash);

        if (element) {
          // Smoothly scroll to the element
          element.scrollIntoView({ behavior: "smooth" });

          // Update the URL in the browser without causing a page reload
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }

    // 3. Fire any external onClick handlers passed to the component
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
        "group rounded-sm inline-flex items-center justify-center text-center font-inter font-medium uppercase text-content-font transition-all duration-300 gap-[clamp(8px,2vw,12px)] px-[clamp(20px,4vw,28px)] h-[clamp(48px,6vw,60px)] ",
        variants[variant as keyof typeof variants],
        className,
      )}
    >
      <span>{children}</span>

      {arrow && (
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-300 group-hover:translate-x-1",
            arrowVariants[variant as keyof typeof arrowVariants],
          )}
        />
      )}
    </Link>
  );
}
