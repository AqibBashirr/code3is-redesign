import { SERVICES_OFFERED } from "@/constants/services";


export default function ContactForm() {
  return (
    <div className="relative max-w-[558px] lg:w-[84%] w-full font-sans">
      {/* --- THE MAIN FORM CARD --- */}
      {/* Added overflow-hidden so the internal glow doesn't spill out of the rounded corners */}
      <div className="relative bg-[#1e1e1e] p-7 md:p-9 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">
        {/* --- THE DUAL RADIAL GRADIENTS --- */}
        {/* Top-Left Blue Glow */}
        <div className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>

        {/* Bottom-Right Blue Glow */}
        <div className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] bg-[#216b7a]/40 blur-[70px] pointer-events-none rounded-full z-0"></div>

        {/* --- FORM CONTENT --- */}
        {/* Wrapped in relative z-10 so the inputs and text sit ON TOP of the glow */}
        <form
          className="relative z-10 flex flex-col gap-5"
          // onSubmit={(e) => e.preventDefault()}
        >
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-[13px] font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[13px] font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-[13px] font-medium text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>

          {/* Select Project Type Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="projectType"
              className="text-[13px] font-medium text-gray-300"
            >
              Select Project Type
            </label>

            {/* New wrapper specifically for centering the input and icon */}
            <div className="relative">
              <select
                id="projectType"
                defaultValue=""
                // Added pr-10 here to prevent text overlapping the arrow
                className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 pr-10 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer shadow-inner capitalize"
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

              {/* Mathematically perfectly centered arrow */}
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
            <label
              htmlFor="details"
              className="text-[13px] font-medium text-gray-300"
            >
              Brief Project Details
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full bg-[#141414] border border-white/5 rounded-md px-3.5 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none shadow-inner"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-[#f0f0f0] hover:bg-white text-[#111111] font-semibold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors duration-200 text-[13px] tracking-wide group"
          >
            START A PROJECT
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
