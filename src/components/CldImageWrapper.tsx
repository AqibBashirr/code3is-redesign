"use client";

import { CldImage, CldImageProps, getCldImageUrl } from "next-cloudinary";

export default function CldImageWrapper({
  src,
  format,
  dpr,
  width,
  height,
  crop,
  gravity,
  quality,
  fill,
  ...rest
}: CldImageProps) {
  // In fill mode, width/height are intentionally undefined —
  // only build a transformed URL when we actually have dimensions.
  const resolvedSrc =
    !fill && width && height
      ? getCldImageUrl({
          src: src as string,
          width: width as number,
          height: height as number,
          crop,
          gravity,
          quality,
          format,
          dpr,
        })
      : src;

  return (
    <CldImage
      src={resolvedSrc}
      width={width}
      height={height}
      crop={crop}
      gravity={gravity}
      quality={quality}
      fill={fill}
      {...rest}
    />
  );
}
