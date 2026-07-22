"use client";

import { SERVICES_OFFERED } from "@/constants/services";
import { cn } from "@/constants/utils";
import React, { useState } from "react";
import { toast } from "sonner";
import { Arrow2 } from "../icons";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastSubmitTime = localStorage.getItem("lastSubmitTime");
    if (lastSubmitTime) {
      const timePassed = Date.now() - parseInt(lastSubmitTime);
      if (timePassed < 60000) {
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
    } catch (_error) {
      // Changed to _error to satisfy the ESLint unused variable rule
      console.log("Error sending contact form:", _error);
      toast.error("Failed to send. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      

      {/* Applied Tailwind canonical class suggestions (e.g. max-w-139.5) */}
      <div className="relative max-w-139.5 lg:w-[84%] w-full font-sans">
        <div className="relative bg-[radial-gradient(circle,#3D3D3D,#1F1F1F)] p-7 md:p-9 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">
          <div
            className="absolute top-0 left-[-40%] w-58 h-59 bg-foreground blur-[160px] pointer-events-none rounded-full z-0"
            aria-hidden="true"
          ></div>
          <div
            className="absolute bottom-0 right-[-40%] w-58 h-59 bg-foreground blur-[160px] pointer-events-none rounded-full z-0"
            aria-hidden="true"
          ></div>

          <form
            className="relative z-10 flex flex-col gap-[clamp(27px,2.3vw,30px)]"
            onSubmit={handleSubmit}
            noValidate // Optional: Allows custom error handling instead of default browser tooltips
          >
            {/* THE HONEYPOT FIELD */}
            <input
              type="text"
              name="subject_honey"
              className="absolute opacity-0 -z-10 w-0 h-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="name">Name</GetLabel>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                disabled={isSubmitting}
                className="w-full bg-[#1e1e1e] border border-[#5C5C5C] rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                aria-required="true"
                disabled={isSubmitting}
                className="w-full bg-[#1e1e1e] border border-[#5C5C5C] rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col gap-1.5">
              <GetLabel id="phone">Phone Number</GetLabel>
              <input
                type="tel"
                id="phone"
                name="phone"
                disabled={isSubmitting}
                className="w-full bg-[#1e1e1e] border border-[#5C5C5C] rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  aria-required="true"
                  disabled={isSubmitting}
                  className="w-full bg-[#1e1e1e] border border-[#5C5C5C] rounded-md px-3.5 py-3 pr-10 text-white/40 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all appearance-none cursor-pointer capitalize disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    Select an option...
                  </option>
                  {SERVICES_OFFERED.map((service) => (
                    <option key={service} value={service.toLowerCase()}>
                      {service.toLocaleUpperCase()}
                    </option>
                  ))}
                  <option value="Other">OTHER</option>
                </select>
                {/* Decorative Arrow for Select */}
                <div
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                  aria-hidden="true"
                >
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
              <GetLabel id="details">What are you hoping to achieve?</GetLabel>
              <textarea
                id="details"
                name="details"
                rows={4}
                required
                aria-required="true"
                disabled={isSubmitting}
                className="w-full bg-[#1e1e1e] border border-[#5C5C5C] rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed scrollbar-thumb-secondary-background"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="mt-1.5 md:mt-5 w-full bg-[#f0f0f0] hover:bg-white text-[#111111] group disabled:opacity-70 disabled:cursor-not-allowed rounded-sm inline-flex items-center justify-center text-center font-inter font-medium uppercase text-content-font transition-all duration-300 gap-[clamp(8px,2vw,12px)] px-[clamp(20px,4vw,28px)] h-[clamp(48px,6vw,60px)]"
            >
              {isSubmitting ? "SENDING..." : "START A PROJECT"}
              {!isSubmitting && (
                <Arrow2
                  className="w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
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
