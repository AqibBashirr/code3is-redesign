"use client";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    // Instantly snap the user to the top of the page when the loading skeleton mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      {/* Hero image skeleton */}
      <div className="pt-4 px-5.5 max-w-max mx-auto">
        <div
          className="
            w-full
            h-55
            sm:h-80
            md:h-105
            lg:h-135
            rounded-[10px]
            border border-[#3A3B3A]
            bg-gray-200
            animate-pulse
          "
        />
      </div>

      <div className="mx-auto flex flex-col-reverse md:flex-row max-w-max items-start gap-[clamp(38px,5vw,78px)] px-x py-y relative">
        {/* Left Sidebar (TOC) skeleton */}
        <div className="hidden md:flex flex-col gap-4 w-51">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded bg-gray-200 animate-pulse"
              style={{ width: `${70 - i * 6}%` }}
            />
          ))}
        </div>

        {/* Main Content skeleton */}
        <article className="flex-1 w-full">
          {/* Date */}
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />

          {/* Title */}
          <div className="mt-3 flex flex-col gap-3">
            <div className="h-[clamp(28px,3vw,40px)] w-4/5 rounded bg-gray-200 animate-pulse" />
            <div className="h-[clamp(28px,3vw,40px)] w-2/5 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Share buttons */}
          <div className="relative mt-6 inline-flex">
            <div
              className="h-10.5 w-26 animate-pulse rounded-full border border-[#3A3B3A] bg-gray-200"
              aria-hidden="true"
            />
          </div>

          {/* Body content */}
          <div className="mt-between-content flex flex-col gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-gray-200 animate-pulse"
                style={{ width: `${95 - (i % 4) * 15}%` }}
              />
            ))}
          </div>
        </article>

        {/* Right Sidebar skeleton */}
        <aside className="w-full pointer-events-none md:w-51 sticky top-[76svh] md:top-[70dvh] md:mt-0 -mt-32 flex justify-end">
          <div className="h-32 w-1.5 rounded-full bg-gray-200 animate-pulse" />
        </aside>
      </div>


    </div>
  );
}
