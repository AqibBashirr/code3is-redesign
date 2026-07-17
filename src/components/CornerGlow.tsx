import React from "react";

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
  color = "rgba(139, 92, 246, 0.4)", // A nice default purple
  duration = "18s",
  delay = "0s",
  size = "w-80 h-80", // Using standard Tailwind sizes
  className,
  style,
  ...props
}: CornerGlowProps) {
  // Pull the elements slightly off-screen initially for a natural bleed
  const positionClasses = {
    "top-left": "-top-20 -left-20",
    "top-right": "-top-20 -right-20",
    "bottom-left": "-bottom-20 -left-20",
    "bottom-right": "-bottom-20 -right-20",
    custom: "",
  }[position];

  // Define sweeping paths using CSS variables.
  // tx/ty = translate X/Y, r = rotation
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
    <>
      <style>{`
        @keyframes organic-drift {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(var(--tx1), var(--ty1)) scale(1.25) rotate(var(--r1));
          }
          66% {
            transform: translate(var(--tx2), var(--ty2)) scale(0.8) rotate(var(--r2));
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }
      `}</style>

      <div
        className={`absolute rounded-full blur-[180px] pointer-events-none z-0 will-change-transform mix-blend-screen ${size} ${positionClasses} ${className ?? ""}`}
        style={{
          backgroundColor: color,
          // Using alternate keeps the path looping smoothly back and forth
          animation: `organic-drift ${duration} ease-in-out ${delay} infinite alternate`,
          ...(pathVars as React.CSSProperties),
          ...style,
        }}
        {...props}
      />
    </>
  );
}
