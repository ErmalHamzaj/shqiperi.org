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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sq");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && LANGS.includes(saved)) {
        setLangState(saved);
        applyDir(saved);
      }
    } catch {
      /* ignore */
    }
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
