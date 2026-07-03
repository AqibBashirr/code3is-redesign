"use client";
import { useEffect, useRef, useState } from "react";

interface ObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersection({
  once = true,
  ...options
}: ObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (once && elementRef.current) observer.unobserve(elementRef.current);
      } else if (!once) {
        setIsIntersecting(false);
      }
    }, options);

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [once, options]);

  return { elementRef, isIntersecting };
}
