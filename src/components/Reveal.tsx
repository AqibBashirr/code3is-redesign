"use client";

import { cn } from "@/constants/utils";
import { useIntersection } from "@/hooks/useIntersection";

interface RevealProps {
  children: React.ReactNode;
  threshold?: number;
  duration?: string | number;
  delay?: string | number;
  x?: string | number;
  y?: string | number;
  scale?: number;
  opacity?: number;
  className?: string;
  role?: React.AriaRole;
}

// Utility to ensure time has 's' and distance has 'px'
const formatTime = (val: string | number) =>
  typeof val === "number" || !String(val).match(/[a-z]/i) ? `${val}s` : val;
const formatPx = (val: string | number) =>
  typeof val === "number" || !String(val).match(/[a-z]/i) ? `${val}px` : val;

export function Reveal({
  children,
  threshold = 0.1,
  duration = "0.8s",
  delay = "0s",
  x = "0px",
  y = "30px",
  scale = 1,
  opacity = 0,
  role,
  className,
}: RevealProps) {
  const { elementRef, isIntersecting } = useIntersection({ threshold });

  return (
    <div
    
      role={role}
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        `reveal-wrapper ${isIntersecting ? "is-visible" : ""}`,
        className,
      )}
      style={
        {
          "--duration": formatTime(duration),
          "--delay": formatTime(delay),
          "--x": formatPx(x),
          "--y": formatPx(y),
          "--scale": scale,
          "--opacity": opacity,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
