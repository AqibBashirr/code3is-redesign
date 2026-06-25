import type { SVGProps } from "react";
const SvgX = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
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
      className="fill-black  transition-colors duration-300"
      d="m16.272 13.942 4.973-5.784h-1.177L15.75 13.18 12.3 8.158H8.322l5.219 7.591-5.219 6.062H9.5l4.564-5.3 3.644 5.3h3.979l-5.414-7.875zm-1.611 1.876-.529-.755-4.205-6.018h1.813l3.393 4.853.529.756 4.412 6.313h-1.813z"
    />
  </svg>
);
export default SvgX;
