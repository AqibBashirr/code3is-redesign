import React from "react";
// import "./corner-glow.css";

interface CornerGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "custom";
  color?: string;
  duration?: string;
  delay?: string;
  size?: string;
}

export default function CornerGlow({
  position = "top-left",
  color = "rgba(139, 92, 246, 0.4)",
  duration = "18s",
  delay = "0s",
  size = "w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96",
  className,
  style,
  ...props
}: CornerGlowProps) {
  const positionClasses = {
    "top-left": "-top-10 -left-10 md:-top-20 md:-left-20",
    "top-right": "-top-10 -right-10 md:-top-20 md:-right-20",
    "bottom-left": "-bottom-10 -left-10 md:-bottom-20 md:-left-20",
    "bottom-right": "-bottom-10 -right-10 md:-bottom-20 md:-right-20",
    custom: "",
  }[position];

  const pathVars = {
    "top-left": {
      "--tx1": "25vw",
      "--ty1": "15vh",
      "--tx2": "10vw",
      "--ty2": "35vh",
      "--r1": "45deg",
      "--r2": "90deg",
    },
    "top-right": {
      "--tx1": "-25vw",
      "--ty1": "15vh",
      "--tx2": "-10vw",
      "--ty2": "35vh",
      "--r1": "-45deg",
      "--r2": "-90deg",
    },
    "bottom-left": {
      "--tx1": "30vw",
      "--ty1": "-15vh",
      "--tx2": "15vw",
      "--ty2": "-40vh",
      "--r1": "45deg",
      "--r2": "90deg",
    },
    "bottom-right": {
      "--tx1": "-30vw",
      "--ty1": "-20vh",
      "--tx2": "-15vw",
      "--ty2": "-45vh",
      "--r1": "-45deg",
      "--r2": "-90deg",
    },
    custom: {
      "--tx1": "40px",
      "--ty1": "-40px",
      "--tx2": "-40px",
      "--ty2": "40px",
      "--r1": "15deg",
      "--r2": "-15deg",
    },
  }[position];

  return (
    <div
      // ADDED 'glow-orb' CLASS HERE to trigger the mobile math in CSS
      className={`glow-orb absolute rounded-full blur-[90px] md:blur-[140px] lg:blur-[180px] pointer-events-none z-0 will-change-transform mix-blend-screen ${size} ${positionClasses} ${className ?? ""}`}
      style={{
        backgroundColor: color,
        animation: `organic-drift ${duration} ease-in-out ${delay} infinite alternate`,
        ...(pathVars as React.CSSProperties),
        ...style,
      }}
      {...props}
    />
  );
}
