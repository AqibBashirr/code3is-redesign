import { cn } from "@/constants/utils";
import React from "react";
import HighlightText from "./Highlight";

interface HighlightTextProps {
  children?: React.ReactNode;
  className?: string;
  highlightText: string;
  highlightClassName?:string;
}
function HeadingTextH3({ children,highlightText,highlightClassName ,className }: HighlightTextProps) {
  return (
    <h2
      className={cn(
        "font-raleway font-semibold text-h3-font leading-font-h3",
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

export default HeadingTextH3