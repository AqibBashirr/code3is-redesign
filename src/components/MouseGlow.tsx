'use client'
import React, { useEffect, useRef } from "react";

interface MouseGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: string;
}

export default function MouseGlow({
  color = "rgba(139, 92, 246, 0.15)", // Kept slightly more transparent so it doesn't wash out text
  size = "w-[500px] h-[500px]",
  className,
  ...props
}: MouseGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    // Track where the mouse actually is
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    // Track where the glow currently is
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // The "0.08" determines the lag/smoothness.
      // Closer to 1 = snaps instantly. Closer to 0 = very floaty/delayed.
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        // translate3d forces GPU acceleration for zero-lag rendering
        // calc(px - 50%) keeps the glow perfectly centered on the cursor
        glowRef.current.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className={`fixed top-0 left-0 rounded-full blur-[120px] pointer-events-none z-0 will-change-transform mix-blend-screen ${size} ${className ?? ""}`}
      style={{
        backgroundColor: color,
      }}
      {...props}
    />
  );
}
