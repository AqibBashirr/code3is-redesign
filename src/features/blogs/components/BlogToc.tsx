"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  tag: string;
}

interface BlogTocProps {
  headings: Heading[];
}

export default function BlogToc({ headings }: BlogTocProps) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!listRef.current) return;

    const activeLink = listRef.current.querySelector(
      `a[href="#${activeHeading}"]`,
    );

    if (activeLink instanceof HTMLElement) {
      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeHeading]);

  return (
    <ul
      ref={listRef}
      className=" sticky top-(--padding-y) max-h-[calc(100svh-var(--padding-y)-2rem)] overflow-y-auto scrollbar-thin max-w-51 pr-2 flex flex-col gap-4"
    >
      {headings.map((heading) => {
        const active = activeHeading === heading.id;

        return (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={`block py-1 text-sm leading-7.5 transition-all duration-300 ${
                active
                  ? " text-primary-color underline underline-offset-4"
                  : "text-[#7C7C7C] hover:text-primary-color hover:underline"
              }`}
            >
              {heading.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
