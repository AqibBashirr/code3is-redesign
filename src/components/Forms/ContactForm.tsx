"use client";

import { SERVICES_OFFERED } from "@/constants/services";
import { cn } from "@/constants/utils";
import React, { useState } from "react";
// 1. UPDATED IMPORT
import { Toaster, toast } from "sonner";
import { Arrow2 } from "../icons";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // --- 1. FRONTEND COOLDOWN CHECK ---
    const lastSubmitTime = localStorage.getItem("lastSubmitTime");
    if (lastSubmitTime) {
      const timePassed = Date.now() - parseInt(lastSubmitTime);
      if (timePassed < 60000) {
        // 2. UPDATED SONNER TOAST
        toast.error("Please wait a minute before sending another message.");
        return;
      }
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // --- 3. THE SONNER SUCCESS POP-UP ---
        // Sonner allows beautiful descriptions under the main title!
        toast.success("Message sent successfully!", {
          description:
            "We will review your project details and be in touch soon.",
        });

        localStorage.setItem("lastSubmitTime", Date.now().toString());
        form.reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to send. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 4. THE SONNER TOASTER COMPONENT */}
      {/* richColors makes the success green and error red automatically. theme="dark" matches your UI! */}
      <Toaster richColors theme="dark" position="bottom-center" />

      <div className="relative max-w-[558px] lg:w-[84%] w-full font-sans">
        <div className="relative bg-[#1e1e1e] p-7 md:p-9 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">
          <div className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>
          <div className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>

          <form
            className="relative z-10 flex flex-col gap-[clamp(27px,2.3vw,30px)]"
            onSubmit={handleSubmit}
          >
            {/* --- THE HONEYPOT FIELD --- */}
            <input
              type="text"
              name="subject_honey"
              className="absolute opacity-0 -z-10 w-0 h-0"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="name">Name</GetLabel>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="email">Email</GetLabel>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="phone">Phone Number</GetLabel>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Select Project Type Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="projectType">Select Project Type</GetLabel>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue=""
                  required
                  className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 pr-10 text-white/80 text-sm focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer capitalize"
                >
                  <option value="" disabled>
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
                name="details"
                rows={4}
                required
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1.5 md:mt-5 w-full bg-[#f0f0f0] hover:bg-white text-[#111111] font-semibold py-3.5 rounded-md flex items-center justify-center gap-2 transition-all duration-200 tracking-wide group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "SENDING..." : "START A PROJECT"}
              {!isSubmitting && (
                <Arrow2 className="w-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// --- HELPER COMPONENT ---
interface GetLabelProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

function GetLabel({ children, id, className }: GetLabelProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "font-inter text-form-text-size leading-[100%] text-form-text-color font-normal",
        className,
      )}
    >
      {children}
    </label>
  );
}
