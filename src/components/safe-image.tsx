"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
};

const fallback = "/assets/fallback-potter.svg";

export function SafeImage({
  src,
  alt,
  className,
  fill,
  width = 600,
  height = 800,
  priority,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      sizes={fill ? "(max-width: 768px) 100vw, 33vw" : undefined}
      className={className}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
