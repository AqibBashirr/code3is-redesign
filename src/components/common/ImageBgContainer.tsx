import { cn } from "@/constants/utils"
import Image, { ImageProps } from "next/image"


interface ImageBgContainerProps extends ImageProps {
  className?:string;
  bgClass?:string;
}


function ImageBgContainer({className,bgClass,src,alt,...props}:ImageBgContainerProps) {
  return (
    <div className={cn(" overflow-clip rounded-[10px] bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB]  border border-overlay-card/5", bgClass)}>
    
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("w-full h-auto  object-contain", className)}
      ></Image>
    </div>
  );
}

export default ImageBgContainer