"use client";

import { cn } from "@/constants/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  tag: string;
}

interface BlogTocProps {
  headings: Heading[];
  className?: string;
}

export default function BlogToc({ headings, className }: BlogTocProps) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? "");

  const listRef = useRef<HTMLUListElement>(null);

  // Observe headings
  useEffect(() => {
    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible.length) return;

        const id = visible[0].target.id;

        setActiveHeading((prev) => (prev === id ? prev : id));
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [headings]);

  // Keep active TOC item visible without scrolling the page
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const activeLink = container.querySelector<HTMLAnchorElement>(
      `a[href="#${activeHeading}"]`,
    );

    if (!activeLink) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const targetScroll =
      container.scrollTop +
      (linkRect.top - containerRect.top) -
      container.clientHeight / 2 +
      linkRect.height / 2;

    container.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  }, [activeHeading]);

  return (
    <ul
      ref={listRef}
      className={cn(
        "sticky top-(--padding-y) max-h-[calc(100svh-var(--padding-y)-2rem)] max-w-51 overflow-y-auto pr-2 scrollbar-thin",
        className,
      )}
    >
      {headings.map((heading) => {
        const isActive = activeHeading === heading.id;

        return (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-sm leading-7.5 transition-colors duration-300",
                isActive
                  ? "text-primary-color underline underline-offset-4"
                  : "text-[#7C7C7C] hover:text-primary-color hover:underline",
              )}
            >
              {heading.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
