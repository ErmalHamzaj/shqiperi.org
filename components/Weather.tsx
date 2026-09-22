"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

type WeatherData = { temp: number; code: number };

export function Weather() {
  const { lang } = useLang();
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch("/api/weather", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => {
          if (active && typeof d?.temp === "number") setData(d);
        })
        .catch(() => {});
    load();
    // Refresh every 10 minutes to keep it live.
    const id = setInterval(load, 600_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!data) return null;

  const cityName: Record<string, string> = {
    sq: "Tiranë",
    en: "Tirana",
    tr: "Tiran",
    it: "Tirana",
    ar: "تيرانا",
  };
  const city = cityName[lang] ?? "Tirana";

  return (
    <span
      title={`${city} · ${data.temp}°C`}
      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
    >
      <WeatherIcon code={data.code} />
      <span className="tabular-nums font-medium text-zinc-700 dark:text-zinc-200">
        {data.temp}°
      </span>
      <span className="hidden sm:inline text-zinc-400">{city}</span>
    </span>
  );
}

/** Minimal line icon by WMO weather code group. */
function WeatherIcon({ code }: { code: number }) {
  const cls = "h-4 w-4";
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  // Clear
  if (code === 0)
    return (
      <svg viewBox="0 0 24 24" className={`${cls} text-amber-500`} {...stroke}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    );
  // Partly cloudy
  if (code === 1 || code === 2)
    return (
      <svg viewBox="0 0 24 24" className={`${cls} text-amber-500`} {...stroke}>
        <circle cx="8" cy="8" r="3" />
        <path d="M8 2v1.5M2 8h1.5M3.8 3.8l1 1" />
        <path
          d="M9 18h8a3 3 0 0 0 0-6 4 4 0 0 0-7.7-1.3A3 3 0 0 0 9 18z"
          className="text-zinc-400"
          stroke="currentColor"
        />
      </svg>
    );
  // Thunderstorm
  if (code >= 95)
    return (
      <svg viewBox="0 0 24 24" className={`${cls} text-zinc-500`} {...stroke}>
        <path d="M7 15h9a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 6.7 9 3.5 3.5 0 0 0 7 15z" />
        <path d="M12 13l-2 4h3l-2 4" className="text-amber-500" stroke="currentColor" />
      </svg>
    );
  // Snow
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return (
      <svg viewBox="0 0 24 24" className={`${cls} text-sky-400`} {...stroke}>
        <path d="M7 14h9a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 6.7 8 3.5 3.5 0 0 0 7 14z" />
        <path d="M9 18h.01M13 18h.01M11 21h.01" />
      </svg>
    );
  // Rain / drizzle / showers
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return (
      <svg viewBox="0 0 24 24" className={`${cls} text-sky-500`} {...stroke}>
        <path d="M7 14h9a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 6.7 8 3.5 3.5 0 0 0 7 14z" />
        <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" />
      </svg>
    );
  // Cloud / fog / overcast (3, 45, 48, default)
  return (
    <svg viewBox="0 0 24 24" className={`${cls} text-zinc-400`} {...stroke}>
      <path d="M7 17h9a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 6.7 11 3.5 3.5 0 0 0 7 17z" />
    </svg>
  );
}
