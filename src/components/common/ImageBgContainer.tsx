import { cn } from "@/constants/utils"
import AdvanceImage, { AdvanceImageProps } from "../AdvancedImage";


interface ImageBgContainerProps extends AdvanceImageProps {
  className?: string;
  bgClass?: string;
}


function ImageBgContainer({className,bgClass,src,alt,...props}:ImageBgContainerProps) {
  return (
    <div className={cn(" overflow-clip rounded-[10px] bg-linear-to-b from-[#EAE9E5] to-[#FBFBFB]  border border-overlay-card/5", bgClass)}>
    
      <AdvanceImage
        src={src}
        alt={alt}
        {...props}
        className={cn("w-full h-auto  object-contain", className)}
      ></AdvanceImage>
    </div>
  );
}

export default ImageBgContainer