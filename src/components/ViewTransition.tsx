// components/ViewTransition.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ViewTransition() {
  const pathname = usePathname();

  useEffect(() => {
    // This triggers the native browser transition
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // This callback happens instantly when the route changes
      });
    }
  }, [pathname]);

  return null;
}
