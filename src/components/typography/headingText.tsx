import { cn } from "@/constants/utils";
import React from "react";
import HighlightText from "./Highlight";

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  highlightText?: string;
  highlightClassName?:string;
}
function HeadingText({ children,highlightText,highlightClassName ,className }: HighlightTextProps) {
  return (
    <h2
      className={cn(
        "font-raleway font-semibold text-[clamp(28px,3vw,40px)] leading-[calc(clamp(28px,3vw,40px)+12px)]",
        className,
      )}
    >
      {children}{" "}
      <HighlightText className={highlightClassName}>
        {highlightText}
      </HighlightText>
    </h2>
  );
}

export default HeadingText