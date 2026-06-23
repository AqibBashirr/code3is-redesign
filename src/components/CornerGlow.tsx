import React from "react";

interface CornerGlowProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  duration?: string;
}

export default function CornerGlow({
  position = "top-left",
  color = "#1096C7",
  duration = "12s",
}: CornerGlowProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

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
      `}</style>

      <div
        className={`absolute w-[232px] h-[236px] blur-[110px] rounded-full pointer-events-none z-0 ${positionClasses}`}
        style={{
          backgroundColor: color,
          animation: `float-${position} ${duration} ease-in-out infinite`,
        }}
      />
    </>
  );
}
