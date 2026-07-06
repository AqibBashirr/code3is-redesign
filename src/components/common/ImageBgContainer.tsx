import { cn } from "@/constants/utils"
import Image, { ImageProps } from "next/image"


interface ImageBgContainerProps extends ImageProps {
  className?:string;
  bgClass?:string;
}


function ImageBgContainer({className,bgClass,src,alt,...props}:ImageBgContainerProps) {
  return (
    <div className={cn(" overflow-clip rounded-[10px]", bgClass)}>
      {/* bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB]  border
      border-overlay-card */}
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("w-full md:w-auto h-auto md:h-full  object-contain", className)}
      ></Image>
    </div>
  );
}

export default ImageBgContainer