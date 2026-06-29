import { cn } from "@/constants/utils"
import Image, { ImageProps } from "next/image"


interface ImageBgContainerProps extends ImageProps {
  className?:string;
  bgClass?:string;
}


function ImageBgContainer({className,bgClass,src,alt,...props}:ImageBgContainerProps) {
  return (
    <div
      className={cn(
        "bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB] rounded-[10px] border border-overlay-card overflow-clip",
        bgClass,
      )}
    >
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("w-auto h-full object-contain", className)}
      ></Image>
    </div>
  );
}

export default ImageBgContainer