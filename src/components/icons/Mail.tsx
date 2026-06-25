import type { SVGProps } from "react";
const SvgMail = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 16"
    {...props}
    className={`group ${className || ""}`}
  >
    <path
      fill="currentColor"
      d="M18.605 1.395H1.395v12.481a.08.08 0 0 0 .078.078h17.054a.08.08 0 0 0 .078-.078zM20 13.876a1.473 1.473 0 0 1-1.473 1.473H1.473A1.47 1.47 0 0 1 0 13.876V.698C0 .312.312 0 .698 0h18.604c.386 0 .698.312.698.698z"
    />
    <path
      fill="currentColor"
      d="M18.83.183a.698.698 0 0 1 .944 1.029L10.47 9.739a.7.7 0 0 1-.943 0L.226 1.212A.698.698 0 0 1 1.17.183L10 8.278z"
    />
  </svg>
);
export default SvgMail;
