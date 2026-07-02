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
        "uppercase font-raleway text-[clamp(12px,1.5vw,16px)] leading-[calc(clamp(12px,1.5vw,16px)+12px)]  tracking-[40%] ",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default HeadingPill