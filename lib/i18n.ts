export type Lang = "sq" | "en" | "tr" | "it" | "ar";

export const LANGS: Lang[] = ["sq", "en", "tr", "it", "ar"];

export const LANG_LABEL: Record<Lang, string> = {
  sq: "SQ",
  en: "EN",
  tr: "TR",
  it: "IT",
  ar: "AR",
};

export const LANG_NAME: Record<Lang, string> = {
  sq: "Shqip",
  en: "English",
  tr: "Türkçe",
  it: "Italiano",
  ar: "العربية",
};

/** Right-to-left languages. */
export const RTL_LANGS: Lang[] = ["ar"];
export const isRtl = (lang: Lang) => RTL_LANGS.includes(lang);

export type Dict = {
  tagline: string;
  placeholder: string;
  search: string;
  searching: string;
  overview: string;
  sources: string;
  noSources: string;
  error: string;
  disclaimer: string;
  webVia: string;
  related: string;
  detailedBtn: string;
  detailedHint: string;
  noWebResults: string;
  readMore: string;
  examplesTitle: string;
  examples: string[];
  newsTitle: string;
  newsVia: string;
  newsAll: string;
  newsError: string;
  refineHint: string;
  dirTitle: string;
  dirEmpty: string;
  dirListCta: string;
  repTitle: string;
  repBody: string;
  repWhatsapp: string;
  repEmail: string;
  repSoon: string;
  repFree: string;
  topicsTitle: string;
  topics: { label: string; query: string }[];
  featuredTitle: string;
  featuredListCta: string;
  footerAbout: string;
  footerPrivacy: string;
  footerContact: string;
  adCta: string;
  resultsFor: string;
};

export const dict: Record<Lang, Dict> = {
  sq: {
    tagline: "Kërko. Zbulo. Lidhu.",
    placeholder: "Kërko çdo gjë për Shqipërinë…",
    search: "Kërko",
    searching: "Duke kërkuar…",
    overview: "Përmbledhje",
    sources: "Burimet",
    noSources: "Nuk u gjetën burime për këtë kërkim.",
    error: "Ndodhi një gabim gjatë kërkimit. Provoni përsëri.",
    disclaimer: "Rezultatet mund të përmbajnë pasaktësi — verifikoni gjithmonë burimet.",
    webVia: "Nga Wikipedia",
    related: "Artikuj të lidhur",
    detailedBtn: "Merr përgjigje të detajuar",
    detailedHint: "Për pyetje specifike, merr një përgjigje të përpunuar.",
    noWebResults: "Nuk u gjetën rezultate të drejtpërdrejta për këtë kërkim.",
    readMore: "Lexo më shumë",
    examplesTitle: "Provoni:",
    examples: [
      "Lajmet e fundit nga Shqipëria",
      "Investo në Shqipëri",
      "Bli pronë në Shqipëri",
      "Makinë me qira në Tiranë",
    ],
    newsTitle: "Lajmet e fundit",
    newsVia: "Burimi",
    newsAll: "Shiko të gjitha",
    newsError: "Lajmet nuk mund të ngarkohen për momentin.",
    refineHint: "Zgjidhni një opsion:",
    dirTitle: "Kompani & kontakte",
    dirEmpty: "Ende nuk ka kompani të listuara në këtë kategori.",
    dirListCta: "Jeni kompani? Listohuni këtu.",
    repTitle: "Dëshironi një plan të personalizuar?",
    repBody:
      "Përfaqësuesi ynë online e organizon gjithçka për ju — tura, transferta, makina me qira, vizita pronash e më shumë. Na tregoni çfarë ju nevojitet.",
    repWhatsapp: "Shkruaji në WhatsApp",
    repEmail: "Dërgo email",
    repSoon: "Kontakti i përfaqësuesit do të shtohet së shpejti.",
    repFree: "Falas",
    topicsTitle: "Eksploro",
    featuredTitle: "Biznese të përzgjedhura",
    featuredListCta: "Listo biznesin tënd",
    topics: [
      { label: "Lajme", query: "Lajmet e fundit nga Shqipëria" },
      { label: "Investo në Shqipëri", query: "Investo në Shqipëri" },
      { label: "Bli pronë", query: "Bli pronë në Shqipëri" },
      { label: "Makina me qira", query: "Makinë me qira në Shqipëri" },
      { label: "Shtëpi me qira", query: "Shtëpi me qira në Shqipëri" },
      { label: "Guida turistike", query: "Guida turistike në Shqipëri" },
      { label: "Avokat", query: "Avokat në Shqipëri" },
      { label: "Biznese shqiptare", query: "Biznese shqiptare" },
    ],
    footerAbout: "Rreth nesh",
    footerPrivacy: "Privatësia",
    footerContact: "Kontakt",
    adCta: "Reklamo biznesin tënd",
    resultsFor: "Rezultatet për",
  },
  en: {
    tagline: "Search. Discover. Connect.",
    placeholder: "Search anything about Albania…",
    search: "Search",
    searching: "Searching…",
    overview: "Overview",
    sources: "Sources",
    noSources: "No sources were found for this search.",
    error: "Something went wrong during the search. Please try again.",
    disclaimer: "Results may contain inaccuracies — always verify the sources.",
    webVia: "From Wikipedia",
    related: "Related articles",
    detailedBtn: "Get a detailed answer",
    detailedHint: "For specific questions, get a synthesized answer.",
    noWebResults: "No direct results were found for this search.",
    readMore: "Read more",
    examplesTitle: "Try:",
    examples: [
      "Latest news from Albania",
      "Invest in Albania",
      "Buy property in Albania",
      "Rent a car in Tirana",
    ],
    newsTitle: "Latest news",
    newsVia: "Source",
    newsAll: "View all",
    newsError: "News can't be loaded right now.",
    refineHint: "Choose an option:",
    dirTitle: "Companies & contacts",
    dirEmpty: "No companies are listed in this category yet.",
    dirListCta: "Are you a company? Get listed here.",
    repTitle: "Want a custom plan?",
    repBody:
      "Our online representative organizes everything for you — tours, transfers, car rentals, property viewings and more. Just tell us what you need.",
    repWhatsapp: "Message on WhatsApp",
    repEmail: "Send email",
    repSoon: "Representative contact will be added soon.",
    repFree: "Free",
    topicsTitle: "Explore",
    featuredTitle: "Featured businesses",
    featuredListCta: "List your business",
    topics: [
      { label: "News", query: "Latest news from Albania" },
      { label: "Invest in Albania", query: "Invest in Albania" },
      { label: "Buy property", query: "Buy property in Albania" },
      { label: "Car rental", query: "Rent a car in Albania" },
      { label: "Home rental", query: "Rent a home in Albania" },
      { label: "Tour guides", query: "Tour guides in Albania" },
      { label: "Lawyer", query: "Lawyer in Albania" },
      { label: "Albanian businesses", query: "Albanian businesses" },
    ],
    footerAbout: "About",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
    adCta: "Advertise your business",
    resultsFor: "Results for",
  },
  tr: {
    tagline: "Ara. Keşfet. Bağlan.",
    placeholder: "Arnavutluk hakkında her şeyi ara…",
    search: "Ara",
    searching: "Aranıyor…",
    overview: "Özet",
    sources: "Kaynaklar",
    noSources: "Bu arama için kaynak bulunamadı.",
    error: "Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    disclaimer: "Sonuçlar hatalar içerebilir — kaynakları her zaman doğrulayın.",
    webVia: "Wikipedia'dan",
    related: "İlgili makaleler",
    detailedBtn: "Ayrıntılı yanıt al",
    detailedHint: "Belirli sorular için derlenmiş bir yanıt alın.",
    noWebResults: "Bu arama için doğrudan sonuç bulunamadı.",
    readMore: "Devamını oku",
    examplesTitle: "Deneyin:",
    examples: [
      "Arnavutluk'tan son haberler",
      "Arnavutluk'a yatırım yap",
      "Arnavutluk'ta mülk satın al",
      "Tiran'da araba kirala",
    ],
    newsTitle: "Son haberler",
    newsVia: "Kaynak",
    newsAll: "Tümünü gör",
    newsError: "Haberler şu anda yüklenemiyor.",
    refineHint: "Bir seçenek seçin:",
    dirTitle: "Şirketler ve iletişim",
    dirEmpty: "Bu kategoride henüz şirket listelenmedi.",
    dirListCta: "Şirket misiniz? Buraya kaydolun.",
    repTitle: "Özel bir plan mı istiyorsunuz?",
    repBody:
      "Çevrimiçi temsilcimiz her şeyi sizin için düzenler — turlar, transferler, araç kiralama, mülk gezileri ve daha fazlası. Ne istediğinizi bize söyleyin.",
    repWhatsapp: "WhatsApp'tan yaz",
    repEmail: "E-posta gönder",
    repSoon: "Temsilci iletişim bilgileri yakında eklenecek.",
    repFree: "Ücretsiz",
    topicsTitle: "Keşfet",
    featuredTitle: "Öne çıkan işletmeler",
    featuredListCta: "İşletmenizi kaydedin",
    topics: [
      { label: "Haberler", query: "Arnavutluk'tan son haberler" },
      { label: "Arnavutluk'a yatırım", query: "Arnavutluk'a yatırım yap" },
      { label: "Mülk satın al", query: "Arnavutluk'ta mülk satın al" },
      { label: "Araç kiralama", query: "Arnavutluk'ta araba kirala" },
      { label: "Kiralık ev", query: "Arnavutluk'ta kiralık ev" },
      { label: "Tur rehberleri", query: "Arnavutluk'ta tur rehberi" },
      { label: "Avukat", query: "Arnavutluk'ta avukat" },
      { label: "Arnavut işletmeleri", query: "Arnavut işletmeleri" },
    ],
    footerAbout: "Hakkında",
    footerPrivacy: "Gizlilik",
    footerContact: "İletişim",
    adCta: "İşletmenizin reklamını yapın",
    resultsFor: "Sonuçlar:",
  },
  it: {
    tagline: "Cerca. Scopri. Connetti.",
    placeholder: "Cerca qualsiasi cosa sull'Albania…",
    search: "Cerca",
    searching: "Ricerca in corso…",
    overview: "Panoramica",
    sources: "Fonti",
    noSources: "Nessuna fonte trovata per questa ricerca.",
    error: "Si è verificato un errore durante la ricerca. Riprova.",
    disclaimer: "I risultati possono contenere imprecisioni — verifica sempre le fonti.",
    webVia: "Da Wikipedia",
    related: "Articoli correlati",
    detailedBtn: "Ottieni una risposta dettagliata",
    detailedHint: "Per domande specifiche, ottieni una risposta elaborata.",
    noWebResults: "Nessun risultato diretto trovato per questa ricerca.",
    readMore: "Leggi di più",
    examplesTitle: "Prova:",
    examples: [
      "Ultime notizie dall'Albania",
      "Investire in Albania",
      "Comprare casa in Albania",
      "Noleggiare un'auto a Tirana",
    ],
    newsTitle: "Ultime notizie",
    newsVia: "Fonte",
    newsAll: "Vedi tutto",
    newsError: "Le notizie non possono essere caricate ora.",
    refineHint: "Scegli un'opzione:",
    dirTitle: "Aziende e contatti",
    dirEmpty: "Nessuna azienda ancora elencata in questa categoria.",
    dirListCta: "Sei un'azienda? Registrati qui.",
    repTitle: "Vuoi un piano personalizzato?",
    repBody:
      "Il nostro rappresentante online organizza tutto per te — tour, trasferimenti, noleggio auto, visite immobiliari e altro. Dicci di cosa hai bisogno.",
    repWhatsapp: "Scrivi su WhatsApp",
    repEmail: "Invia email",
    repSoon: "Il contatto del rappresentante sarà aggiunto presto.",
    repFree: "Gratis",
    topicsTitle: "Esplora",
    featuredTitle: "Aziende in evidenza",
    featuredListCta: "Registra la tua azienda",
    topics: [
      { label: "Notizie", query: "Ultime notizie dall'Albania" },
      { label: "Investire in Albania", query: "Investire in Albania" },
      { label: "Comprare casa", query: "Comprare casa in Albania" },
      { label: "Noleggio auto", query: "Noleggiare un'auto in Albania" },
      { label: "Affitto casa", query: "Affittare una casa in Albania" },
      { label: "Guide turistiche", query: "Guida turistica in Albania" },
      { label: "Avvocato", query: "Avvocato in Albania" },
      { label: "Aziende albanesi", query: "Aziende albanesi" },
    ],
    footerAbout: "Chi siamo",
    footerPrivacy: "Privacy",
    footerContact: "Contatti",
    adCta: "Pubblicizza la tua azienda",
    resultsFor: "Risultati per",
  },
  ar: {
    tagline: "ابحث. اكتشف. تواصل.",
    placeholder: "ابحث عن أي شيء عن ألبانيا…",
    search: "بحث",
    searching: "جارٍ البحث…",
    overview: "ملخّص",
    sources: "المصادر",
    noSources: "لم يتم العثور على مصادر لهذا البحث.",
    error: "حدث خطأ أثناء البحث. حاول مرة أخرى.",
    disclaimer: "قد تحتوي النتائج على أخطاء — تحقّق دائمًا من المصادر.",
    webVia: "من ويكيبيديا",
    related: "مقالات ذات صلة",
    detailedBtn: "احصل على إجابة مفصّلة",
    detailedHint: "للأسئلة المحددة، احصل على إجابة مُعدّة.",
    noWebResults: "لم يتم العثور على نتائج مباشرة لهذا البحث.",
    readMore: "اقرأ المزيد",
    examplesTitle: "جرّب:",
    examples: [
      "آخر الأخبار من ألبانيا",
      "الاستثمار في ألبانيا",
      "شراء عقار في ألبانيا",
      "استئجار سيارة في تيرانا",
    ],
    newsTitle: "آخر الأخبار",
    newsVia: "المصدر",
    newsAll: "عرض الكل",
    newsError: "تعذّر تحميل الأخبار حاليًا.",
    refineHint: "اختر خيارًا:",
    dirTitle: "الشركات وجهات الاتصال",
    dirEmpty: "لا توجد شركات مدرجة في هذه الفئة بعد.",
    dirListCta: "هل أنت شركة؟ سجّل هنا.",
    repTitle: "هل تريد خطة مخصّصة؟",
    repBody:
      "ينظّم ممثّلنا عبر الإنترنت كل شيء من أجلك — الجولات، النقل، تأجير السيارات، زيارات العقارات والمزيد. أخبرنا بما تحتاجه.",
    repWhatsapp: "راسلنا على واتساب",
    repEmail: "أرسل بريدًا إلكترونيًا",
    repSoon: "ستتم إضافة معلومات الاتصال بالممثّل قريبًا.",
    repFree: "مجانًا",
    topicsTitle: "استكشف",
    featuredTitle: "شركات مميّزة",
    featuredListCta: "أدرج شركتك",
    topics: [
      { label: "الأخبار", query: "آخر الأخبار من ألبانيا" },
      { label: "الاستثمار في ألبانيا", query: "الاستثمار في ألبانيا" },
      { label: "شراء عقار", query: "شراء عقار في ألبانيا" },
      { label: "تأجير السيارات", query: "استئجار سيارة في ألبانيا" },
      { label: "تأجير منزل", query: "استئجار منزل في ألبانيا" },
      { label: "مرشدون سياحيون", query: "دليل سياحي في ألبانيا" },
      { label: "محامٍ", query: "محامٍ في ألبانيا" },
      { label: "شركات ألبانية", query: "شركات ألبانية" },
    ],
    footerAbout: "من نحن",
    footerPrivacy: "الخصوصية",
    footerContact: "اتصل بنا",
    adCta: "أعلن عن شركتك",
    resultsFor: "نتائج البحث عن",
  },
};

export function t(lang: Lang): Dict {
  return dict[lang] ?? dict.sq;
}
