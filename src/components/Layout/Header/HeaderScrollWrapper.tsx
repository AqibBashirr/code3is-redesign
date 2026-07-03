"use client";

import { useState, useEffect, ReactNode } from "react";

interface HeaderScrollWrapperProps {
  children: ReactNode;
}

export default function HeaderScrollWrapper({
  children,
}: HeaderScrollWrapperProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 50);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        bg-secondary-background text-off-white-color font-inter [anchor-name:--header] 
        sticky top-0 z-100 w-full
        transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        ${!isAtTop && isVisible ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-none"}
      `}
    >
      {children}
    </header>
  );
}
