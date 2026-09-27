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
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIdx((cur) => {
        setPrev(cur);
        return (cur + 1) % images.length;
      });
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
      {prev !== null && prev !== idx && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <img
        key={`cur-${idx}`}
        src={images[idx]}
        alt=""
        fetchPriority="high"
        className="hero-slide-active absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
