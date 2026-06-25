import { cn } from "@/constants/utils";
import React from "react";

interface HighlightTextProps{
  children:React.ReactNode;
  className?:string;
}
function HighlightText({ children,className }: HighlightTextProps) {
  return (
    <span className={cn("underline decoration-[#a3e635] decoration-4 underline-offset-8 font-semibold",className)}>
      {children}
    </span>
  );
}

export default HighlightText