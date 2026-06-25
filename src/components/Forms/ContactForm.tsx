import { SERVICES_OFFERED } from "@/constants/services";
import { cn } from "@/constants/utils";
import React from "react";
import { Arrow2 } from "../icons";

export default function ContactForm() {
  return (
    <div className="relative max-w-[558px] lg:w-[84%] w-full font-sans">
      {/* --- THE MAIN FORM CARD --- */}
      <div className="relative bg-[#1e1e1e] p-7 md:p-9 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">
        {/* --- THE DUAL RADIAL GRADIENTS --- */}
        <div className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>
        <div className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>

        {/* --- FORM CONTENT --- */}
        <form
          className="relative z-10 flex flex-col gap-5"
          // onSubmit={(e) => e.preventDefault()}
        >
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <GetLabel id="name">Name</GetLabel>
            <input
              type="text"
              id="name"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <GetLabel id="email">Email</GetLabel>
            <input
              type="email"
              id="email"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-1.5">
            <GetLabel id="phone">Phone Number</GetLabel>
            <input
              type="tel"
              id="phone"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Select Project Type Field */}
          <div className="flex flex-col gap-1.5">
            <GetLabel id="projectType">Select Project Type</GetLabel>
            <div className="relative">
              <select
                id="projectType"
                defaultValue=""
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 pr-10 text-white/80 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer shadow-inner capitalize"
              >
                <option value="" disabled className="text-gray-500">
                  Select an option...
                </option>
                {SERVICES_OFFERED.map((service) => (
                  <option key={service} value={service.toLowerCase()}>
                    {service.toLocaleUpperCase()}
                  </option>
                ))}
              </select>

              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Brief Project Details Field */}
          <div className="flex flex-col gap-1.5">
            <GetLabel id="details">Brief Project Details</GetLabel>
            <textarea
              id="details"
              rows={4}
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none shadow-inner"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-[#f0f0f0] hover:bg-white text-[#111111] font-semibold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors duration-200 text-form-text-size tracking-wide group px-[clamp(20px,4vw,28px)] h-[clamp(48px,6vw,60px)]"
          >
            START A PROJECT
            <Arrow2 className="w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// --- FIXED HELPER COMPONENT ---

interface GetLabelProps {
  children:React.ReactNode;
  id: string;
  className?: string;
}

// Destructure the props object here instead of passing sequential arguments
function GetLabel({ children ,id, className }: GetLabelProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "font-inter text-form-text-size leading-[100%] text-form-text-color",
        className,
      )}
    >
      {children}
    </label>
  );
}
