"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageProps {
  src: string;
  height: number;
  width: number;
  alt?: string;
}

export const ImageComp = ({ src, alt = "", width, height }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc("/networks/dex.png");
  };

  return (
    <Image
      src={imageSrc}
      onError={handleError}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
