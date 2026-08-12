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
    <section role="status" aria-label="Loading content" aria-busy="true">
      {/* Accessible loading announcement */}
      <span className="sr-only">Loading content, please wait.</span>

      <div aria-hidden="true">
        {/* Skeleton for Title */}
        <div className="h-10 w-full max-w-175 bg-gray-800/50 rounded-md mb-5" />

        {/* Skeleton for Subtitle */}
        <div className="h-5.5 w-full max-w-125 bg-gray-800/50 rounded-md mb-10 md:mb-14.25" />

        {/* Skeleton for Buttons */}
        <div className="grid gap-4 w-full max-w-55 mx-auto md:max-w-none md:w-fit md:grid-flow-col items-center">
          <div className="h-12 w-55 md:w-45 bg-gray-700/50 rounded" />
          <div className="h-12 w-55 md:w-45 bg-gray-700/50 rounded" />
        </div>
      </div>
    </section>
  );
}
