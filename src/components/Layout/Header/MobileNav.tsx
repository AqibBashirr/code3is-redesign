"use client";

import { useEffect, useRef, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import HeaderNavLinks from "./HeaderNavLinks";
import { usePathname } from "next/dist/client/components/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // Inside your component
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only proceed if isOpen is true AND the pathname has changed
    if (isOpen && pathname !== prevPathname.current) {
      setIsOpen(false);
    }

    // Update the ref to the current pathname after the check
    prevPathname.current = pathname;
  }, [pathname, isOpen]);

  return (
    // 1. Replaced <> with a relative div. Moved md:hidden here.
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((val) => !val)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="block bg-white/10 p-1.5 rounded "
      >
        {isOpen ? (
          <X width={13} height={13} />
        ) : (
          <MenuIcon width={13} height={13} />
        )}
      </button>

      {isOpen && (
        <aside className="absolute top-full -right-(--padding-x) mt-4 w-fit bg-off-white-color rounded-bl-[20px] text-offBlack-color z-50 shadow-[-4px_4px_14px_0px_rgba(0,0,0,0.45)]">
          <nav className="flex flex-col items-start shrink-0 pl-8.5 pr-10 py-7">
            <HeaderNavLinks
              className={
                "block w-full py-4 border-b-[0.5px] border-[#bdbdbd] font-inter text-[clamp(14px,3vw,16px)] whitespace-nowrap first:pt-0 last:border-0 last:pb-0 "
              }
            />
          </nav>
        </aside>
      )}
    </div>
  );
}
