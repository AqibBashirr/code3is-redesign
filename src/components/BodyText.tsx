import { cn } from "@/constants/utils";
import React from "react";

interface BodyTextProps{
children:React.ReactNode;
className?:string;
}
function BodyText({ children,className }: BodyTextProps) {
  return (
    <p
      className={cn(
        "mt-between-content text-content-font leading-[calc(var(--content-font-size)+12px)] font-poppins text-secondary-color ",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default BodyText