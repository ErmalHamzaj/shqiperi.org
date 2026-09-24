import type { Lang } from "./i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  YOUR ONLINE REPRESENTATIVE / CONCIERGE
 *  Visitors who want a custom plan (a multi-leg tour, buying a house, a car
 *  transfer, etc.) can reach this person directly and for free.
 *
 *  Set the WhatsApp number and email below. Leave a field empty to hide that
 *  button.
 *    - whatsapp: international format, DIGITS ONLY, no "+" or spaces.
 *                e.g. Albania +355 69 123 4567  →  "355691234567"
 *    - email:    e.g. "concierge@shqiperi.org"
 * ─────────────────────────────────────────────────────────────────────────
 */
export const REPRESENTATIVE = {
  name: "Shqipëri",
  whatsapp: "905320521899", // +90 532 052 18 99
  email: "", // e.g. "concierge@shqiperi.org"
};

/** Pre-filled message the visitor sends to the representative. */
function message(query: string, lang: Lang): string {
  const q = query.trim();
  if (!q) {
    const generic: Record<Lang, string> = {
      sq: "Përshëndetje! Dua ndihmë për të organizuar një plan në Shqipëri. Faleminderit!",
      en: "Hello! I'd like help organizing a plan in Albania. Thank you!",
      tr: "Merhaba! Arnavutluk'ta bir plan organize etmek için yardım istiyorum. Teşekkürler!",
      it: "Ciao! Vorrei aiuto per organizzare un piano in Albania. Grazie!",
      ar: "مرحبًا! أريد المساعدة في تنظيم خطة في ألبانيا. شكرًا!",
    };
    return generic[lang] ?? generic.en;
  }
  const withQuery: Record<Lang, string> = {
    sq: `Përshëndetje! Dua ndihmë për: "${q}". A mund të më ndihmoni ta organizoj? Faleminderit!`,
    en: `Hello! I'd like help with: "${q}". Could you help me organize it? Thank you!`,
    tr: `Merhaba! Şu konuda yardım istiyorum: "${q}". Organize etmeme yardımcı olabilir misiniz? Teşekkürler!`,
    it: `Ciao! Vorrei aiuto per: "${q}". Potete aiutarmi a organizzarlo? Grazie!`,
    ar: `مرحبًا! أريد المساعدة بخصوص: "${q}". هل يمكنكم مساعدتي في تنظيمه؟ شكرًا!`,
  };
  return withQuery[lang] ?? withQuery.en;
}

export function whatsappLink(query: string, lang: Lang): string | null {
  const num = REPRESENTATIVE.whatsapp.replace(/\D/g, "");
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message(query, lang))}`;
}

export function emailLink(query: string, lang: Lang): string | null {
  if (!REPRESENTATIVE.email) return null;
  const subjects: Record<Lang, string> = {
    sq: "Kërkesë për plan të personalizuar",
    en: "Custom plan request",
    tr: "Kişiye özel plan talebi",
    it: "Richiesta di piano personalizzato",
    ar: "طلب خطة مخصصة",
  };
  return `mailto:${REPRESENTATIVE.email}?subject=${encodeURIComponent(
    subjects[lang] ?? subjects.en,
  )}&body=${encodeURIComponent(message(query, lang))}`;
}

export function hasContact(): boolean {
  return Boolean(REPRESENTATIVE.whatsapp || REPRESENTATIVE.email);
}

/** Enquiry to verify/claim a business listing. */
function verifyMessage(lang: Lang): string {
  const msgs: Record<Lang, string> = {
    sq: "Përshëndetje! Dua të verifikoj / pretendoj listimin e një biznesi në Shqipëri.",
    en: "Hello! I'd like to verify / claim a business listing on Shqipëri.",
    tr: "Merhaba! Shqipëri'deki bir işletme kaydını doğrulamak / sahiplenmek istiyorum.",
    it: "Ciao! Vorrei verificare / rivendicare la scheda di un'attività su Shqipëri.",
    ar: "مرحبًا! أريد التحقق من / المطالبة بإدراج نشاط تجاري على Shqipëri.",
  };
  return msgs[lang] ?? msgs.en;
}

export function verifyLink(lang: Lang): string | null {
  const num = REPRESENTATIVE.whatsapp.replace(/\D/g, "");
  if (num) return `https://wa.me/${num}?text=${encodeURIComponent(verifyMessage(lang))}`;
  if (REPRESENTATIVE.email) {
    return `mailto:${REPRESENTATIVE.email}?subject=${encodeURIComponent(
      "Verify business listing",
    )}&body=${encodeURIComponent(verifyMessage(lang))}`;
  }
  return null;
}

/** Advertising / "get listed" enquiry from a business. */
function adsMessage(lang: Lang): string {
  const msgs: Record<Lang, string> = {
    sq: "Përshëndetje! Dua të reklamoj / listoj biznesin tim në Shqipëri. Më tregoni opsionet dhe çmimet, ju lutem.",
    en: "Hello! I'd like to advertise / list my business on Shqipëri. Please tell me the options and pricing.",
    tr: "Merhaba! İşletmemi Shqipëri'de tanıtmak / listelemek istiyorum. Lütfen seçenekleri ve fiyatları söyleyin.",
    it: "Ciao! Vorrei pubblicizzare / inserire la mia attività su Shqipëri. Ditemi le opzioni e i prezzi, per favore.",
    ar: "مرحبًا! أريد الإعلان عن / إدراج نشاطي التجاري على Shqipëri. من فضلكم أخبروني بالخيارات والأسعار.",
  };
  return msgs[lang] ?? msgs.en;
}

/** Best available link for a business to reach out about advertising. */
export function adsLink(lang: Lang): string | null {
  const num = REPRESENTATIVE.whatsapp.replace(/\D/g, "");
  if (num) return `https://wa.me/${num}?text=${encodeURIComponent(adsMessage(lang))}`;
  if (REPRESENTATIVE.email) {
    const subjects: Record<Lang, string> = {
      sq: "Reklamim / Listim biznesi",
      en: "Advertising / Business listing",
      tr: "Reklam / İşletme kaydı",
      it: "Pubblicità / Inserimento attività",
      ar: "إعلان / إدراج نشاط تجاري",
    };
    const subject = subjects[lang] ?? subjects.en;
    return `mailto:${REPRESENTATIVE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(adsMessage(lang))}`;
  }
  return null;
}
