import Link from "next/link";

/** Text wordmark — the Albanian flag red on the letters (no eagle). */
export function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const text = size === "lg" ? "text-6xl sm:text-7xl" : "text-2xl";
  return (
    <Link href="/" className="inline-flex items-center select-none" aria-label="Shqipëri">
      <span className={`font-bold tracking-tight ${text}`}>
        <span className="text-flag-red">Shq</span>
        <span className="text-flag-black dark:text-zinc-100">ip</span>
        <span className="text-flag-red">ëri</span>
      </span>
    </Link>
  );
}

/** Standalone eagle logo mark (Albanian_eagle.png), links home. */
export function EagleMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Shqipëri" className="inline-flex select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Albanian_eagle.png"
        alt="Shqipëri"
        className={`${className} object-contain dark:invert`}
      />
    </Link>
  );
}
