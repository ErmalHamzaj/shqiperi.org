"use client";

import { useEffect, useState } from "react";

/**
 * Full-bleed hero background that auto-crossfades through many photos.
 * Keeps only the current + previous image mounted and preloads the next,
 * so memory stays low even with 20+ slides.
 */
export function HeroSlider({
  images,
  interval = 6000,
}: {
  images: string[];
  interval?: number;
}) {
  const [{ idx, prev }, setState] = useState<{ idx: number; prev: number }>({
    idx: 0,
    prev: -1,
  });

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setState((s) => ({ idx: (s.idx + 1) % images.length, prev: s.idx }));
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  // Preload the next image so the crossfade never shows a blank frame.
  useEffect(() => {
    if (images.length < 2) return;
    const next = (idx + 1) % images.length;
    const img = new Image();
    img.src = images[next];
  }, [idx, images]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-slate-900" aria-hidden="true">
      {prev >= 0 && prev !== idx && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <img
        key={`cur-${idx}`}
        src={images[idx]}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="hero-slide-active absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
