"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * FadeImage wraps next/image and adds a fade + optional blur transition.
 * Props: same as next/image plus optional duration (ms) and easing.
 */
export default function FadeImage({
  duration = 700,
  easing = "ease-out",
  className = "",
  onLoad,
  ...imgProps
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...imgProps}
      onLoad={(img) => {
        setLoaded(true);
        onLoad?.(img);
      }}
      className={`transition-opacity ${className}`}
      style={{
        opacity: loaded ? 1 : 0,
        transition: `opacity ${duration}ms ${easing}`,
        ...imgProps.style,
      }}
    />
  );
}
