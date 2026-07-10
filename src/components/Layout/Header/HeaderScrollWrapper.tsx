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

      // 1. Check if we are at the top of the page
      setIsAtTop(currentScrollY < 50);

      // 2. Check scroll direction (Down = Hide, Up = Show)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
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
         top-0 z-100 w-full sticky
        /* The safe, premium transition */
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
        
        /* The Auto-Hide Logic */
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        
        /* The Glassmorphism/Shadow Logic */
        ${
          !isAtTop && isVisible
            ? "shadow-[0_4px_20px_rgba(0,0,0,0.08)] bg-secondary-background/95 backdrop-blur-md"
            : "shadow-none"
        }
      `}
    >
      {children}
    </header>
  );
}
