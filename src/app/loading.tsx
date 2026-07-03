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
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#1e1e1e] mx-5 md:mx-6.25 mt-5.5 rounded-[10px] px-4 py-[112px] md:py-29.75 animate-pulse">
      <div className="relative z-10 flex flex-col items-center w-full mx-auto">
        {/* Skeleton for Title */}
        <div className="h-[60px] md:h-[80px] w-full max-w-[600px] bg-gray-700/50 rounded-md mb-5 md:mb-6"></div>

        {/* Skeleton for Subtitle */}
        <div className="h-[22px] w-full max-w-[500px] bg-gray-800/50 rounded-md mb-[40px] md:mb-[57px]"></div>

        {/* Skeleton for Buttons */}
        <div className="grid gap-4 w-full max-w-[220px] mx-auto md:max-w-none md:w-fit md:grid-flow-col items-center">
          <div className="h-[48px] w-[220px] md:w-[180px] bg-gray-700/50 rounded"></div>
          <div className="h-[48px] w-[220px] md:w-[180px] bg-gray-700/50 rounded"></div>
        </div>
      </div>
    </section>
  );
}
