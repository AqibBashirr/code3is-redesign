"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MAIN_NAV } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/constants/utils";

interface HeaderNavLinksProps {
  className?: string;
  onClick?: () => void;
}

// Set how many links show on desktop before the "More" dropdown kicks in
const VISIBLE_LIMIT = 3;

function HeaderNavLinks({ className = "", onClick }: HeaderNavLinksProps) {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Grab the items that will go inside the "More" dropdown
  const overflowItems =
    MAIN_NAV.length > VISIBLE_LIMIT ? MAIN_NAV.slice(VISIBLE_LIMIT - 1) : [];

  // 1. FIXED ROUTE MATCHING: Prevents "/" from highlighting on every page
  const checkIsActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isAnyOverflowActive = overflowItems.some((item) =>
    checkIsActive(item.href),
  );

  // 2. CLOSE DROPDOWN ON OUTSIDE CLICK (Desktop & Touch)
  useEffect(() => {
    if (!isMoreOpen) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [isMoreOpen]);

  const handleLinkClick = () => {
    setIsMoreOpen(false);
    onClick?.();
  };

  return (
    <>
      {/* 3. MAIN LINKS 
        Mobile: Shows all links.
        Desktop (md:): Hides links past the limit.
      */}
      {MAIN_NAV.map((item, index) => {
        const isActive = checkIsActive(item.href);
        const isOverflowItem = index >= VISIBLE_LIMIT - 1;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            onClick={handleLinkClick}
            className={cn(
              "transition-colors duration-300 hover:text-highlight-color",
              isActive ? "text-highlight-color font-medium" : "",
              // Hydration-safe hiding: CSS handles the layout, not JS
              isOverflowItem ? "md:hidden" : "",
              className,
            )}
          >
            {item.label}
          </Link>
        );
      })}

      {/* 4. DESKTOP "MORE" DROPDOWN
        Mobile: Completely hidden.
      */}
      {overflowItems.length > 0 && (
        <div
          ref={moreRef}
          className="relative group hidden md:block"
          onMouseEnter={() => setIsMoreOpen(true)}
          onMouseLeave={() => setIsMoreOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsMoreOpen((prev) => !prev)}
            aria-expanded={isMoreOpen}
            aria-haspopup="true"
            className={cn(
              "inline-flex items-center gap-1 w-fit transition-colors duration-300 hover:text-highlight-color",
              isAnyOverflowActive || isMoreOpen
                ? "text-highlight-color font-medium"
                : "",
              className,
            )}
          >
            More
            <span
              className={cn(
                "transition-transform duration-300",
                isMoreOpen && "rotate-180",
              )}
            >
              ▾
            </span>
          </button>

          {/* 5. THE GRID HEIGHT ANIMATION */}
          <div
            className={cn(
              "absolute left-0 top-full pt-3 min-w-45 z-50",
              isMoreOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            {/* Animates from 0fr to 1fr */}
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isMoreOpen
                  ? "grid-rows-[1fr] opacity-100 translate-y-0"
                  : "grid-rows-[0fr] opacity-0 -translate-y-2",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col rounded-xl bg-offBlack-color shadow-[0px_14px_36px_6px_#00000015] py-2 border border-white-color/50">
                  {overflowItems.map((item) => {
                    const isActive = checkIsActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        onClick={handleLinkClick}
                        className={cn(
                          "block px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-highlight-text-color/80 hover:text-off-white-color-color",
                          isActive
                            ? " font-medium bg-highlight-text-color/50"
                            : "text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderNavLinks;
