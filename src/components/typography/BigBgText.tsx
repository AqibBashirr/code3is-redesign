import React from "react";

interface BigBgTextProps {
  children: React.ReactNode;
}

function BigBgText({ children }: BigBgTextProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="text-[27.4vw] font-extrabold uppercase whitespace-nowrap leading-[calc(23.5vw)] h-[20.6vw] font-bebas text-center text-big-text-font-color select-none pointer-events-none font-bebas_neue"
    >
      {children}
    </div>
  );
}

export default BigBgText;
