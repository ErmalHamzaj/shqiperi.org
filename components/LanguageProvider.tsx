"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Lang, t, type Dict, LANGS, isRtl } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "shqiperi.lang";

function applyDir(l: Lang) {
  document.documentElement.lang = l;
  document.documentElement.dir = isRtl(l) ? "rtl" : "ltr";
}

// Arabic-speaking countries → Arabic UI.
const ARAB = new Set([
  "SA", "AE", "EG", "QA", "KW", "JO", "OM", "BH", "IQ", "LB", "LY", "DZ",
  "MA", "TN", "SD", "SY", "YE", "PS", "MR", "SO", "DJ", "KM",
]);

function countryToLang(code?: string): Lang | null {
  if (!code) return null;
  const c = code.toUpperCase();
  if (c === "AL" || c === "XK") return "sq";
  if (c === "TR") return "tr";
  if (c === "IT") return "it";
  if (ARAB.has(c)) return "ar";
  return "en";
}

/** Detect language from IP country, then browser language. */
async function detectLang(): Promise<Lang | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch("https://ipwho.is/?fields=country_code", {
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    const data = await res.json();
    const byGeo = countryToLang(data?.country_code);
    if (byGeo) return byGeo;
  } catch {
    /* geo unavailable — fall back to browser language */
  }
  try {
    const prefs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || ""];
    for (const p of prefs) {
      const code = p.slice(0, 2).toLowerCase();
      if ((LANGS as string[]).includes(code)) return code as Lang;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sq");

  useEffect(() => {
    let saved: Lang | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    } catch {
      /* ignore */
    }
    // A manual choice always wins.
    if (saved && LANGS.includes(saved)) {
      setLangState(saved);
      applyDir(saved);
      return;
    }
    // Otherwise auto-detect by location (not persisted, so a later toggle wins).
    let active = true;
    detectLang().then((detected) => {
      if (active && detected) {
        setLangState(detected);
        applyDir(detected);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    applyDir(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
