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
    return lang === "sq"
      ? "Përshëndetje! Dua ndihmë për të organizuar një plan në Shqipëri. Faleminderit!"
      : "Hello! I'd like help organizing a plan in Albania. Thank you!";
  }
  return lang === "sq"
    ? `Përshëndetje! Dua ndihmë për: "${q}". A mund të më ndihmoni ta organizoj? Faleminderit!`
    : `Hello! I'd like help with: "${q}". Could you help me organize it? Thank you!`;
}

export function whatsappLink(query: string, lang: Lang): string | null {
  const num = REPRESENTATIVE.whatsapp.replace(/\D/g, "");
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message(query, lang))}`;
}

export function emailLink(query: string, lang: Lang): string | null {
  if (!REPRESENTATIVE.email) return null;
  const subject =
    lang === "sq" ? "Kërkesë për plan të personalizuar" : "Custom plan request";
  return `mailto:${REPRESENTATIVE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message(query, lang))}`;
}

export function hasContact(): boolean {
  return Boolean(REPRESENTATIVE.whatsapp || REPRESENTATIVE.email);
}

/** Enquiry to verify/claim a business listing. */
function verifyMessage(lang: Lang): string {
  return lang === "sq"
    ? "Përshëndetje! Dua të verifikoj / pretendoj listimin e një biznesi në Shqipëri."
    : "Hello! I'd like to verify / claim a business listing on Shqipëri.";
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
  return lang === "sq"
    ? "Përshëndetje! Dua të reklamoj / listoj biznesin tim në Shqipëri. Më tregoni opsionet dhe çmimet, ju lutem."
    : "Hello! I'd like to advertise / list my business on Shqipëri. Please tell me the options and pricing.";
}

/** Best available link for a business to reach out about advertising. */
export function adsLink(lang: Lang): string | null {
  const num = REPRESENTATIVE.whatsapp.replace(/\D/g, "");
  if (num) return `https://wa.me/${num}?text=${encodeURIComponent(adsMessage(lang))}`;
  if (REPRESENTATIVE.email) {
    const subject = lang === "sq" ? "Reklamim / Listim biznesi" : "Advertising / Business listing";
    return `mailto:${REPRESENTATIVE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(adsMessage(lang))}`;
  }
  return null;
}
