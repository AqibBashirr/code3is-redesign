import { cn } from "@/constants/utils";
import React from "react";

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
}
function HighlightText({ children, className }: HighlightTextProps) {
  return (
    <strong
      className={cn(
        "relative font-semibold italic",
        "before:absolute before:inset-x-0 before:-bottom-1 before:-z-10 before:h-1 not-italic before:bg-[#a3e635] before:content-['']",
        className,
      )}
    >
      {children}
    </strong>
  );
}

export default HighlightText;
