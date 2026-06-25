import { cn } from "@/constants/utils";
import React from "react";

interface HeadingPillProps {
  children: React.ReactNode;
  className?:string;
}
function HeadingPill({ children, className }: HeadingPillProps) {
  return (
    <span
      className={cn(
        "uppercase font-raleway text-[clamp(12px,1.5vw,16px)] leading-[calc(clamp(12px,1.5vw,16px)+12px)] border border-secondary-background rounded-[10px] px-4 py-1 tracking-[30%] ",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default HeadingPill