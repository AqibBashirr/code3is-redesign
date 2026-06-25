import { cn } from "@/constants/utils";
import React from "react";

interface HighlightTextProps{
  children:React.ReactNode;
  className?:string;
}
function HeadingText({ children,className }: HighlightTextProps) {
  return (
    <h2
      className={cn(
        "font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[calc(clamp(28px,3vw,40px)+12px)]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export default HeadingText