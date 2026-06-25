import type { SVGProps } from "react";

const SvgFacebook = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    // 1. FIXED: Safely merge the incoming className with the "group" class
    className={`group ${className || ""}`}
    {...props}
  >
    {/* Outer Circle */}
    <path
      // This will take on whatever text color you give the SVG component
      fill="currentColor"
      d="M15 30c8.284 0 15-6.716 15-15S23.284 0 15 0 0 6.716 0 15s6.716 15 15 15"
      className="transition-colors duration-300"
    />

    {/* The "f" Logo */}
    <path
      d="M16.662 24.555v-8.359h2.788l.529-3.456h-3.317v-2.247c0-.944.465-1.87 1.951-1.87h1.51V5.679s-1.372-.233-2.675-.233c-2.731 0-4.519 1.655-4.519 4.652v2.637h-3.04v3.456h3.04v8.359h3.739z"
      // 2. ADDED: transition-colors duration-300 for a smooth fade
      className="fill-black group-hover:fill- transition-colors duration-300"
    />
  </svg>
);

export default SvgFacebook;
