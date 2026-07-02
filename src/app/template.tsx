// app/template.tsx
"use client";
import { usePathname } from "next/dist/client/components/navigation";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    // The class triggers the CSS keyframes instantly when the new page mounts
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
