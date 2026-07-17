"use client";

import { useEffect, useRef, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import HeaderNavLinks from "./HeaderNavLinks";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

 useEffect(() => {
   // 1. Updated type to include TouchEvent
   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
       setIsOpen(false);
     }
   };

   if (isOpen) {
     document.addEventListener("mousedown", handleClickOutside);
     // 2. Added touchstart for mobile screens
     document.addEventListener("touchstart", handleClickOutside);
   }
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
     // 3. Cleanup touchstart
     document.removeEventListener("touchstart", handleClickOutside);
   };
 }, [isOpen]);

  
  return (
    <div className="relative md:hidden" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex items-center justify-center bg-white/10 p-2 rounded hover:bg-white/20 transition-colors"
      >
        {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
      </button>

      <aside
        className={`
          absolute top-full -right-(--padding-x) mt-4 w-max 
          min-w-40 
          /* CHANGED: Swapped bg-off-white-color to bg-offBlack-color and set text to white */
          bg-offBlack-color text-white z-50 rounded-bl-[20px] 
          shadow-[-4px_4px_14px_0px_rgba(0,0,0,0.45)]
          transform origin-top-right transition-all duration-200 ease-in-out
          ${isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        <nav className="flex flex-col items-start shrink-0 pl-8 pr-10 py-7">
          <HeaderNavLinks
            className={
              /* CHANGED: Swapped border-[#bdbdbd] to border-white/20 so the dividers look good on dark bg */
              "block w-full py-4 border-b border-white/20 font-inter text-[clamp(14px,3vw,16px)] whitespace-nowrap first:pt-0 last:border-0 last:pb-0 hover:opacity-70 transition-opacity"
            }
          />
        </nav>
      </aside>
    </div>
  );
}
