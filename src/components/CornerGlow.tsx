import React from "react";

// 1. Extend standard div attributes so we can pass className and style
interface CornerGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "custom";
  color?: string;
  duration?: string;
}

export default function CornerGlow({
  position = "top-left",
  color = "bg-foreground",
  duration = "12s",
  className, // Extract className
  style, // Extract style
  ...props // Extract any other standard props
}: CornerGlowProps) {
  // 2. Only apply hardcoded Tailwind classes if we are NOT in custom mode
  const positionClasses =
    position !== "custom"
      ? {
          "top-left": "top-0 left-0",
          "top-right": "top-0 right-0",
          "bottom-left": "bottom-0 left-0",
          "bottom-right": "bottom-0 right-0",
        }[position]
      : "";

  // 3. Pick the right animation based on the mode
  const animationName =
    position === "custom" ? "float-custom" : `float-${position}`;

  return (
    <>
      <style>{`
        @keyframes float-top-left {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-35%, -35%); }
        }
        @keyframes float-top-right {
          0%, 100% { transform: translate(50%, -50%); }
          50% { transform: translate(35%, -35%); }
        }
        @keyframes float-bottom-left {
          0%, 100% { transform: translate(-50%, 50%); }
          50% { transform: translate(-35%, 35%); }
        }
        @keyframes float-bottom-right {
          0%, 100% { transform: translate(50%, 50%); }
          50% { transform: translate(35%, 35%); }
        }
        /* ADDED: A generic subtle floating animation for custom placements */
        @keyframes float-custom {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15%, 15%); }
        }
      `}</style>

      <div
        // Safely append any custom classes passed from the parent
        className={`absolute w-[232px] h-[236px] blur-[160px] rounded-full pointer-events-none z-0 ${positionClasses} ${className || ""}`}
        style={{
          backgroundColor: color,
          animation: `${animationName} ${duration} ease-in-out infinite`,
          // Safely append any custom inline styles passed from the parent
          ...style,
        }}
        {...props}
      />
    </>
  );
}
