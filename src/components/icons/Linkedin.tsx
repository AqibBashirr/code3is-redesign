import type { SVGProps } from "react";
const SvgLinkedin = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
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
      d="M8.989 11.488h2.58v8.283H8.99zm1.29-4.117a1.49 1.49 0 1 1 0 2.984 1.492 1.492 0 1 1 0-2.984M13.182 11.488h2.467v1.133h.032c.346-.655 1.183-1.341 2.436-1.341 2.606 0 3.09 1.712 3.09 3.947v4.544h-2.574v-4.028c0-.963-.019-2.197-1.34-2.197s-1.543 1.045-1.543 2.127v4.098h-2.574v-8.283z"
    />
  </svg>
);
export default SvgLinkedin;
