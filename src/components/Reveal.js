"use client";
import { useRef, useEffect, useState } from "react";

/**
 * Reveal: animates children when scrolled into view.
 * Props:
 *  - once (default true): animate only first time.
 *  - offset (rootMargin) default '0px 0px -10% 0px'
 *  - as: wrapper element (default 'div')
 */
export default function Reveal({
  children,
  once = true,
  offset = "0px 0px -10% 0px",
  as: Tag = "div",
  className = "",
  /**
   * variant: preset animation styles
   * - 'fade' (default)
   * - 'up' (classic rise)
   * - 'down' (drop in)
   * - 'scale' (small scale)
   * - 'none' (disable animation)
   */
  variant = "fade",
  distance = 24, // px distance for translate variants
  initialClass,
  showClass,
  duration = 700,
  delay = 0,
  easing = "ease-out",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: offset, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, offset]);

  // Compute default classes only if user didn't override
  let computedInitial = initialClass;
  let computedShow = showClass;
  if (!initialClass || !showClass) {
    switch (variant) {
      case "up":
        computedInitial = `opacity-0 translate-y-${distance > 0 ? 6 : 0}`; // tailwind integer steps; fallback 6
        computedShow = "opacity-100 translate-y-0";
        break;
      case "down":
        computedInitial = `opacity-0 -translate-y-${distance > 0 ? 6 : 0}`;
        computedShow = "opacity-100 translate-y-0";
        break;
      case "scale":
        computedInitial = "opacity-0 scale-95";
        computedShow = "opacity-100 scale-100";
        break;
      case "none":
        computedInitial = "";
        computedShow = "";
        break;
      case "fade":
      default:
        computedInitial = "opacity-0";
        computedShow = "opacity-100";
    }
  }

  return (
    <Tag
      ref={ref}
      className={`${className} will-change-transform transition-all ${computedInitial} ${
        visible ? computedShow : ""
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
