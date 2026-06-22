"use client";

import Link from "next/link";
import { MAIN_NAV } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/constants/utils";

interface HeaderNavLinksProps {
  className?: string;
}

function HeaderNavLinks({ className = "" }: HeaderNavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {MAIN_NAV.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-opacity hover:opacity-70",
              isActive && "text-highlight-color",
              className,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default HeaderNavLinks;
