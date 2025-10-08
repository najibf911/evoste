"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// Simple swipeable reviews carousel (no external deps)
const reviews = [
  {
    author: "Jessen",
    text: "I bought Citrine Flame — fresh, citrusy, with a warm base that’s super addictive. I wish the projection lasted just a bit longer on my skin, but it’s perfect for layering or reapplying mid-day. Still a fave!",
    stars: 5,
  },
  {
    author: "Ellen",
    text: "I’ve never been so emotionally connected to a fragrance before. I wore Ivory Bloom on my anniversary, and my husband said it reminded him of when we first met.",
    stars: 5,
  },
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const pointer = useRef({ startX: 0, delta: 0, dragging: false });
  const autoRef = useRef(null);

  const clamp = (i) => (i + reviews.length) % reviews.length;

  const goTo = useCallback((i) => setIndex(clamp(i)), []);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Auto rotate (pause on hover / focus)
  useEffect(() => {
    autoRef.current && clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIndex((i) => clamp(i + 1));
    }, 6000);
    return () => clearInterval(autoRef.current);
  }, []);

  const onPointerDown = (e) => {
    pointer.current.dragging = true;
    pointer.current.startX = e.clientX || e.touches?.[0]?.clientX || 0;
    pointer.current.delta = 0;
  };

  const onPointerMove = (e) => {
    if (!pointer.current.dragging) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    pointer.current.delta = x - pointer.current.startX;
    // translate track
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${pointer.current.delta}px))`;
    }
  };

  const onPointerUp = () => {
    if (!pointer.current.dragging) return;
    const threshold = 60; // px
    if (pointer.current.delta > threshold) {
      prev();
    } else if (pointer.current.delta < -threshold) {
      next();
    }
    pointer.current.dragging = false;
    pointer.current.delta = 0;
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.35s ease";
      trackRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  // Reset transform on index change (non-drag)
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.5s ease";
      trackRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
  }, [index]);

  // Keyboard support
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const stars = (n) => (
    <div className="mb-6 flex justify-center gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg
          key={i}
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-[#f5c518] drop-shadow-sm"
            aria-hidden="true"
        >
          <path d="M12 2.25 14.97 8l6.28.91-4.53 4.42 1.07 6.25L12 16.98 6.21 19.6l1.07-6.25L2.75 8.91 9.03 8 12 2.25Z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section id="reviews" className=" bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl py-24 mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl text-black font-semibold tracking-tight mb-10">
          What Our Customers Say
        </h2>

        <div
          className="relative select-none"
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          {/* Track Wrapper */}
          <div
            className="overflow-hidden"
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseLeave={onPointerUp}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            <div ref={trackRef} className="flex w-full">
              {reviews.map((r, i) => (
                <figure
                  key={r.author}
                  className="shrink-0 w-full px-2"
                  aria-hidden={i !== index}
                  aria-label={`Slide ${i + 1} of ${reviews.length}`}
                >
                  {stars(r.stars)}
                  <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-gray-800">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-medium text-gray-600">
                    — {r.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? "bg-gray-900" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white shadow border text-sm"
            aria-label="Previous review"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white shadow border text-sm"
            aria-label="Next review"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
