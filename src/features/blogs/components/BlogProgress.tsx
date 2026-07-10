"use client";

import { useEffect, useRef } from "react";

// These constants now define the internal coordinate system for the viewBox.
// They no longer dictate the physical pixel size on the screen.
const SIZE = 110;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BlogProgress() {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const article = document.querySelector(
        "#main-content",
      ) as HTMLElement | null;

      if (!article || !circleRef.current || !textRef.current) return;

      const rect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scroll = -rect.top + viewportHeight * 0.25;
      const total = article.offsetHeight - viewportHeight * 0.5;

      const percent = Math.min(100, Math.max(0, (scroll / total) * 100));
      const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

      circleRef.current.style.strokeDashoffset = `${offset}`;
      textRef.current.textContent = `${Math.round(percent)}%`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        // 1. Replaced width/height with viewBox so it scales proportionally
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        // 2. Added Tailwind responsive widths/heights (e.g., 64px on mobile, 110px on desktop)
        className="-rotate-90 w-16 h-16 md:w-27.5 md:h-27.5"
      >
        {/* Background */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#2b2b2b"
          strokeWidth={STROKE}
          fill="transparent"
        />

        {/* Progress */}
        <circle
          ref={circleRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#93D62F"
          strokeWidth={STROKE}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>

      {/* 3. Scaled the text to match the responsive circle */}
      <div ref={textRef} className="absolute text-sm font-semibold md:text-lg">
        0%
      </div>
    </div>
  );
}
