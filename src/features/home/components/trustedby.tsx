import { CLIENT_LOGOS } from "@/constants/trustedby";
import Image from "next/image";

function TrustedBy() {
  const logos_length = CLIENT_LOGOS.length;
  const time = logos_length*4;
  return (
    <div className=" bg-secondary-background  py-4 lg:py-12">
      <div
        className="max-w-[1920px] mx-auto scroller"
        data-animated="true"
        style={
          {
            "--_animation-duration": `${time}s`,
          } as React.CSSProperties
        }
      >
        <ul className="scroller__inner">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => {
            return (
              <li
                key={logo.title + index}
                aria-hidden={index > logos_length - 1}
                className="flex items-center justify-center shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.title}
                  width={80}
                  height={60}
                  className="h-[clamp(30px,4vw,60px)] w-auto object-contain"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TrustedBy