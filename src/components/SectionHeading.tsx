import React from "react";

interface SectionHeadingProps{
  children:React.ReactNode;
}
function SectionHeading({ children }: SectionHeadingProps) {
  return <div>{children}</div>;
}

export default SectionHeading