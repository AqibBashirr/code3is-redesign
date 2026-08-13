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
  ...rest
}: CldImageProps) {
  // Bake format + dpr into the URL itself so they never become
  // live props on CldImage (which forwards unrecognized props to <img>)
  const resolvedSrc = getCldImageUrl({
    src: src as string,
    width: width as number | undefined,
    height: height as number | undefined,
    crop,
    gravity,
    quality,
    format,
    dpr,
  });

  return (
    <CldImage
      src={resolvedSrc}
      width={width}
      height={height}
      crop={crop}
      gravity={gravity}
      quality={quality}
      {...rest}
    />
  );
}
