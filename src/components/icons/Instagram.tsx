import type { SVGProps } from "react";
const SvgInstagram = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
    className={`group ${className || ""}`}
  >
    <path
      fill="currentColor"
      d="M15 30c8.284 0 15-6.716 15-15S23.284 0 15 0 0 6.716 0 15s6.716 15 15 15"
    />
    <path
      className="fill-black group-hover:fill- transition-colors duration-300"
      d="M19.13 9.983a.913.913 0 1 0 0 1.827.913.913 0 0 0 0-1.827M15.063 11.154A3.85 3.85 0 0 0 11.217 15a3.85 3.85 0 0 0 3.846 3.846A3.85 3.85 0 0 0 18.909 15a3.85 3.85 0 0 0-3.846-3.846m0 6.307A2.465 2.465 0 0 1 12.602 15a2.47 2.47 0 0 1 2.46-2.461 2.47 2.47 0 0 1 2.462 2.46 2.47 2.47 0 0 1-2.461 2.462"
    />
    <path
      className="fill-black group-hover:fill- transition-colors duration-300"
      d="M18.116 22.805h-6.231a4.693 4.693 0 0 1-4.69-4.69v-6.231a4.693 4.693 0 0 1 4.69-4.69h6.231a4.693 4.693 0 0 1 4.69 4.69v6.231a4.693 4.693 0 0 1-4.69 4.69M11.885 8.66a3.23 3.23 0 0 0-3.223 3.223v6.231a3.23 3.23 0 0 0 3.223 3.223h6.231a3.23 3.23 0 0 0 3.223-3.223v-6.231a3.23 3.23 0 0 0-3.223-3.223z"
    />
  </svg>
);
export default SvgInstagram;
