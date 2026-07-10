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
}

export default function CornerGlow({
  position = "top-left",
  color = "bg-foreground",
  duration = "16s",
  className,
  style,
  ...props
}: CornerGlowProps) {
  const positionClasses =
    position !== "custom"
      ? {
          "top-left": "top-0 left-0",
          "top-right": "top-0 right-0",
          "bottom-left": "bottom-0 left-0",
          "bottom-right": "bottom-0 right-0",
        }[position]
      : "";

  const animationName =
    position === "custom" ? "float-custom" : `float-${position}`;

  return (
    <>
      <style>{`
        @keyframes float-top-left {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(-35%, -60%) scale(1.08) rotate(8deg);
          }
          50% {
            transform: translate(-20%, -35%) scale(0.96) rotate(16deg);
          }
          75% {
            transform: translate(-45%, -15%) scale(1.05) rotate(8deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes float-top-right {
          0% {
            transform: translate(50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(35%, -60%) scale(1.08) rotate(-8deg);
          }
          50% {
            transform: translate(20%, -35%) scale(0.96) rotate(-16deg);
          }
          75% {
            transform: translate(45%, -15%) scale(1.05) rotate(-8deg);
          }
          100% {
            transform: translate(50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes float-bottom-left {
          0% {
            transform: translate(-50%, 50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(-35%, 65%) scale(1.08) rotate(-8deg);
          }
          50% {
            transform: translate(-20%, 35%) scale(0.95) rotate(-16deg);
          }
          75% {
            transform: translate(-45%, 15%) scale(1.05) rotate(-8deg);
          }
          100% {
            transform: translate(-50%, 50%) scale(1) rotate(0deg);
          }
        }

        @keyframes float-bottom-right {
          0% {
            transform: translate(50%, 50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(35%, 65%) scale(1.08) rotate(8deg);
          }
          50% {
            transform: translate(20%, 35%) scale(0.95) rotate(16deg);
          }
          75% {
            transform: translate(45%, 15%) scale(1.05) rotate(8deg);
          }
          100% {
            transform: translate(50%, 50%) scale(1) rotate(0deg);
          }
        }

        @keyframes float-custom {
          0% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.08);
          }
          50% {
            transform: translate(60px, 10px) scale(0.95);
          }
          75% {
            transform: translate(20px, 40px) scale(1.05);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>

      <div
        className={`absolute w-58 h-59 rounded-full blur-[160px] pointer-events-none z-0 will-change-transform ${positionClasses} ${className ?? ""}`}
        style={{
          backgroundColor: color,
          animation: `${animationName} ${duration} cubic-bezier(0.42,0,0.58,1) infinite`,
          ...style,
        }}
        {...props}
      />
    </>
  );
}
