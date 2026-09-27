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

export type HomeDict = {
  nav: { visit: string; live: string; invest: string; discover: string; ask: string };
  heroTitle: string;
  heroSub: string;
  heroLede: string;
  ctaExplore: string;
  ctaAsk: string;
  pillarsTitle: string;
  pillars: {
    visit: { title: string; items: string[] };
    live: { title: string; items: string[] };
    invest: { title: string; items: string[] };
    discover: { title: string; items: string[] };
  };
  nowTitle: string;
  nowSub: string;
  exploreTitle: string;
  exploreSub: string;
  askTitle: string;
  askLede: string;
  askPlaceholder: string;
  askButton: string;
  actionsTitle: string;
  actions: string[];
  guidesTitle: string;
  guidesSub: string;
  guides: string[];
  finalCtaLine: string;
  seeAll: string;
};

export type Dict = {
  home: HomeDict;
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
  notAlbania: string;
  verified: string;
  verifyLine: string;
  verifyCta: string;
  examplesTitle: string;
  examples: string[];
  newsTitle: string;
  newsVia: string;
  newsAll: string;
  newsError: string;
  refineHint: string;
  dirTitle: string;
  blogTitle: string;
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
  brandTitle: string;
  brandBody: string;
  brandCta: string;
  brandNote: string;
  footerAbout: string;
  footerPrivacy: string;
  footerContact: string;
  adCta: string;
  resultsFor: string;
};

export const dict: Record<Lang, Dict> = {
  sq: {
    home: {
      nav: { visit: "Vizito", live: "Jeto", invest: "Investo", discover: "Zbulo", ask: "Pyet Shqipërinë" },
      heroTitle: "Pika jote e nisjes për Shqipërinë.",
      heroSub: "Udhëto. Jeto. Investo. Bëj biznes.",
      heroLede: "Nga planifikimi i udhëtimit te blerja e pronës, hapja e biznesit dhe jeta këtu, ne të ndihmojmë të vendosësh dhe të veprosh, falas.",
      ctaExplore: "Eksploro Shqipërinë",
      ctaAsk: "Pyet Shqipërinë",
      pillarsTitle: "Pse je këtu?",
      pillars: {
        visit: { title: "Vizito", items: ["Udhëtim", "Hotele", "Makina", "Restorante", "Përvoja"] },
        live: { title: "Jeto", items: ["Qira", "Blerje", "Qëndrim", "Shëndetësi", "Shkolla"] },
        invest: { title: "Investo", items: ["Pronë", "Biznes", "Taksa", "Ligj", "Financë"] },
        discover: { title: "Zbulo", items: ["Lajme", "Guida", "Çmime", "Ligje", "Jeta vendase"] },
      },
      nowTitle: "Shqipëria Tani",
      nowSub: "Të dhëna të drejtpërdrejta, të përditësuara.",
      exploreTitle: "Eksploro Shqipërinë",
      exploreSub: "Zgjidh një destinacion dhe zbulo çfarë të bësh, ku të rrish e si të shkosh.",
      askTitle: "Pyet Shqipërinë",
      askLede: "Na trego çfarë po përpiqesh të bësh në Shqipëri.",
      askPlaceholder: "Kam 7 ditë dhe 2000 €. Dua plazhe, ushqim dhe natyrë.",
      askButton: "Pyet",
      actionsTitle: "Veprime të njohura",
      actions: ["Ku të rrish", "Çfarë të bësh", "Ku të hash", "Merr makinë me qira", "Bli pronë", "Hap një biznes", "Zhvendosu në Shqipëri"],
      guidesTitle: "Guida të thelluara",
      guidesSub: "Pak burime autoritative, jo një mur artikujsh.",
      guides: ["Guida e Plotë e Udhëtimit në Shqipëri", "Blerja e Pronës në Shqipëri", "Zhvendosja në Shqipëri", "Udhëtim me Makinë nëpër Shqipëri", "Plazhet më të Mira në Shqipëri", "Itinerar 7-Ditor"],
      finalCtaLine: "Dera jote dixhitale për në Shqipëri.",
      seeAll: "Shiko të gjitha",
    },
    tagline: "Kërko. Zbulo. Lidhu.",
    placeholder: "Kërko për Shqipërinë…",
    search: "Kërko",
    searching: "Duke kërkuar…",
    overview: "Përmbledhje",
    sources: "Burimet",
    noSources: "Nuk u gjetën burime për këtë kërkim.",
    error: "Ndodhi një gabim gjatë kërkimit. Provoni përsëri.",
    disclaimer: "Rezultatet mund të përmbajnë pasaktësi, verifikoni gjithmonë burimet.",
    webVia: "Nga Wikipedia",
    related: "Artikuj të lidhur",
    detailedBtn: "Merr përgjigje të detajuar",
    detailedHint: "Për pyetje specifike, merr një përgjigje të përpunuar.",
    noWebResults: "Nuk u gjetën rezultate të drejtpërdrejta për këtë kërkim.",
    readMore: "Lexo më shumë",
    notAlbania: "Shqipëri kërkon vetëm për Shqipërinë dhe shqiptarët.",
    verified: "I verifikuar",
    verifyLine: "Duhet të verifikoni një biznes?",
    verifyCta: "Na kontaktoni në WhatsApp",
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
    blogTitle: "Blog",
    dirEmpty: "Ende nuk ka kompani të listuara në këtë kategori.",
    dirListCta: "Jeni kompani? Listohuni këtu.",
    repTitle: "Dëshironi një plan të personalizuar?",
    repBody:
      "Përfaqësuesi ynë online e organizon gjithçka për ju, ture, transferta, makina me qira, vizita pronash e më shumë. Na tregoni çfarë ju nevojitet.",
    repWhatsapp: "Shkruaji në WhatsApp",
    repEmail: "Dërgo email",
    repSoon: "Kontakti i përfaqësuesit do të shtohet së shpejti.",
    repFree: "Falas",
    topicsTitle: "Eksploro",
    featuredTitle: "Biznese të përzgjedhura",
    featuredListCta: "Listo biznesin tënd",
    brandTitle: "Më shumë se një motor kërkimi.",
    brandBody:
      "Kërko çdo shërbim në Shqipëri, dhe ekipi ynë ta organizon personalisht, falas. Ture, makina me qira, prona, avokatë, transferta e më shumë.",
    brandCta: "Na pyet për çdo gjë, falas",
    brandNote: "Njerëz realë · Përgjigje brenda pak minutash · Pa asnjë tarifë",
    topics: [
      { label: "Lajme", query: "Lajmet e fundit nga Shqipëria" },
      { label: "Investo në Shqipëri", query: "Investo në Shqipëri" },
      { label: "Makina me qira", query: "Makinë me qira në Shqipëri" },
      { label: "Shtëpi me qira", query: "Shtëpi me qira në Shqipëri" },
      { label: "Guida turistike", query: "Guida turistike në Shqipëri" },
      { label: "Avokat", query: "Avokat në Shqipëri" },
    ],
    footerAbout: "Rreth nesh",
    footerPrivacy: "Privatësia",
    footerContact: "Kontakt",
    adCta: "Reklamo biznesin tënd",
    resultsFor: "Rezultatet për",
  },
  en: {
    home: {
      nav: { visit: "Visit", live: "Live", invest: "Invest", discover: "Discover", ask: "Ask Albania" },
      heroTitle: "Your starting point for Albania.",
      heroSub: "Travel. Live. Invest. Do business.",
      heroLede: "From planning a trip to buying property, starting a business and living here, we help you decide and act, free.",
      ctaExplore: "Explore Albania",
      ctaAsk: "Ask Albania",
      pillarsTitle: "What are you here for?",
      pillars: {
        visit: { title: "Visit", items: ["Travel", "Hotels", "Cars", "Restaurants", "Experiences"] },
        live: { title: "Live", items: ["Rent", "Buy", "Residency", "Healthcare", "Schools"] },
        invest: { title: "Invest", items: ["Property", "Business", "Taxes", "Legal", "Finance"] },
        discover: { title: "Discover", items: ["News", "Guides", "Prices", "Laws", "Local life"] },
      },
      nowTitle: "Albania Right Now",
      nowSub: "Live, up-to-date information.",
      exploreTitle: "Explore Albania",
      exploreSub: "Pick a destination and discover what to do, where to stay and how to get there.",
      askTitle: "Ask Albania",
      askLede: "Tell us what you're trying to do in Albania.",
      askPlaceholder: "I have 7 days and €2,000. I want beaches, food and nature.",
      askButton: "Ask",
      actionsTitle: "Popular actions",
      actions: ["Where to stay", "What to do", "Where to eat", "Rent a car", "Buy property", "Start a business", "Move to Albania"],
      guidesTitle: "Deep guides",
      guidesSub: "A few authoritative resources, not a wall of articles.",
      guides: ["Complete Albania Travel Guide", "Buying Property in Albania", "Moving to Albania", "Albania Road Trip", "Best Beaches in Albania", "7-Day Itinerary"],
      finalCtaLine: "The digital front door to Albania.",
      seeAll: "See all",
    },
    tagline: "Search. Discover. Connect.",
    placeholder: "Search Albania…",
    search: "Search",
    searching: "Searching…",
    overview: "Overview",
    sources: "Sources",
    noSources: "No sources were found for this search.",
    error: "Something went wrong during the search. Please try again.",
    disclaimer: "Results may contain inaccuracies, always verify the sources.",
    webVia: "From Wikipedia",
    related: "Related articles",
    detailedBtn: "Get a detailed answer",
    detailedHint: "For specific questions, get a synthesized answer.",
    noWebResults: "No direct results were found for this search.",
    readMore: "Read more",
    notAlbania: "Shqipëri only searches for Albania and Albanians.",
    verified: "Verified",
    verifyLine: "Need to verify a business?",
    verifyCta: "Contact us on WhatsApp",
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
    blogTitle: "Blog",
    dirEmpty: "No companies are listed in this category yet.",
    dirListCta: "Are you a company? Get listed here.",
    repTitle: "Want a custom plan?",
    repBody:
      "Our online representative organizes everything for you, tours, transfers, car rentals, property viewings and more. Just tell us what you need.",
    repWhatsapp: "Message on WhatsApp",
    repEmail: "Send email",
    repSoon: "Representative contact will be added soon.",
    repFree: "Free",
    topicsTitle: "Explore",
    featuredTitle: "Featured businesses",
    featuredListCta: "List your business",
    brandTitle: "More than a search engine.",
    brandBody:
      "Search any service in Albania, and our team organizes it for you personally, free. Tours, car rentals, property, lawyers, transfers and more.",
    brandCta: "Ask us anything, free",
    brandNote: "Real people · Reply within minutes · No fees, ever",
    topics: [
      { label: "News", query: "Latest news from Albania" },
      { label: "Invest in Albania", query: "Invest in Albania" },
      { label: "Car rental", query: "Rent a car in Albania" },
      { label: "Home rental", query: "Rent a home in Albania" },
      { label: "Tour guides", query: "Tour guides in Albania" },
      { label: "Lawyer", query: "Lawyer in Albania" },
    ],
    footerAbout: "About",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
    adCta: "Advertise your business",
    resultsFor: "Results for",
  },
  tr: {
    home: {
      nav: { visit: "Ziyaret", live: "Yaşa", invest: "Yatırım", discover: "Keşfet", ask: "Arnavutluk'a Sor" },
      heroTitle: "Arnavutluk için başlangıç noktanız.",
      heroSub: "Gez. Yaşa. Yatırım yap. İş kur.",
      heroLede: "Gezi planlamaktan mülk almaya, iş kurmaya ve burada yaşamaya kadar, karar vermenize ve harekete geçmenize ücretsiz yardımcı oluyoruz.",
      ctaExplore: "Arnavutluk'u Keşfet",
      ctaAsk: "Arnavutluk'a Sor",
      pillarsTitle: "Ne için buradasınız?",
      pillars: {
        visit: { title: "Ziyaret", items: ["Gezi", "Oteller", "Araçlar", "Restoranlar", "Deneyimler"] },
        live: { title: "Yaşa", items: ["Kirala", "Satın al", "Oturum", "Sağlık", "Okullar"] },
        invest: { title: "Yatırım", items: ["Mülk", "İşletme", "Vergiler", "Hukuk", "Finans"] },
        discover: { title: "Keşfet", items: ["Haberler", "Rehberler", "Fiyatlar", "Yasalar", "Yerel yaşam"] },
      },
      nowTitle: "Arnavutluk Şu An",
      nowSub: "Canlı, güncel bilgiler.",
      exploreTitle: "Arnavutluk'u Keşfet",
      exploreSub: "Bir destinasyon seçin; ne yapılacağını, nerede kalınacağını ve nasıl gidileceğini keşfedin.",
      askTitle: "Arnavutluk'a Sor",
      askLede: "Arnavutluk'ta ne yapmaya çalıştığınızı bize söyleyin.",
      askPlaceholder: "7 günüm ve 2.000 € var. Plaj, yemek ve doğa istiyorum.",
      askButton: "Sor",
      actionsTitle: "Popüler işlemler",
      actions: ["Nerede kalınır", "Ne yapılır", "Nerede yenir", "Araç kirala", "Mülk al", "İş kur", "Arnavutluk'a taşın"],
      guidesTitle: "Kapsamlı rehberler",
      guidesSub: "Bir yığın makale değil, birkaç güvenilir kaynak.",
      guides: ["Eksiksiz Arnavutluk Gezi Rehberi", "Arnavutluk'ta Mülk Almak", "Arnavutluk'a Taşınmak", "Arnavutluk Yol Gezisi", "Arnavutluk'un En İyi Plajları", "7 Günlük Program"],
      finalCtaLine: "Arnavutluk'a açılan dijital kapı.",
      seeAll: "Tümünü gör",
    },
    tagline: "Ara. Keşfet. Bağlan.",
    placeholder: "Arnavutluk'ta ara…",
    search: "Ara",
    searching: "Aranıyor…",
    overview: "Özet",
    sources: "Kaynaklar",
    noSources: "Bu arama için kaynak bulunamadı.",
    error: "Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    disclaimer: "Sonuçlar hatalar içerebilir, kaynakları her zaman doğrulayın.",
    webVia: "Wikipedia'dan",
    related: "İlgili makaleler",
    detailedBtn: "Ayrıntılı yanıt al",
    detailedHint: "Belirli sorular için derlenmiş bir yanıt alın.",
    noWebResults: "Bu arama için doğrudan sonuç bulunamadı.",
    readMore: "Devamını oku",
    notAlbania: "Shqipëri yalnızca Arnavutluk ve Arnavutlar için arama yapar.",
    verified: "Doğrulanmış",
    verifyLine: "Bir işletmeyi doğrulamanız mı gerekiyor?",
    verifyCta: "WhatsApp'tan bize ulaşın",
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
    blogTitle: "Blog",
    dirEmpty: "Bu kategoride henüz şirket listelenmedi.",
    dirListCta: "Şirket misiniz? Buraya kaydolun.",
    repTitle: "Özel bir plan mı istiyorsunuz?",
    repBody:
      "Çevrimiçi temsilcimiz her şeyi sizin için düzenler, turlar, transferler, araç kiralama, mülk gezileri ve daha fazlası. Ne istediğinizi bize söyleyin.",
    repWhatsapp: "WhatsApp'tan yaz",
    repEmail: "E-posta gönder",
    repSoon: "Temsilci iletişim bilgileri yakında eklenecek.",
    repFree: "Ücretsiz",
    topicsTitle: "Keşfet",
    featuredTitle: "Öne çıkan işletmeler",
    featuredListCta: "İşletmenizi kaydedin",
    brandTitle: "Sıradan bir arama motorundan fazlası.",
    brandBody:
      "Arnavutluk'ta herhangi bir hizmeti arayın, ekibimiz sizin için kişisel olarak, ücretsiz organize etsin. Turlar, araç kiralama, mülkler, avukatlar, transferler ve daha fazlası.",
    brandCta: "Bize her şeyi sorun, ücretsiz",
    brandNote: "Gerçek insanlar · Dakikalar içinde yanıt · Asla ücret yok",
    topics: [
      { label: "Haberler", query: "Arnavutluk'tan son haberler" },
      { label: "Arnavutluk'a yatırım", query: "Arnavutluk'a yatırım yap" },
      { label: "Araç kiralama", query: "Arnavutluk'ta araba kirala" },
      { label: "Kiralık ev", query: "Arnavutluk'ta kiralık ev" },
      { label: "Tur rehberleri", query: "Arnavutluk'ta tur rehberi" },
      { label: "Avukat", query: "Arnavutluk'ta avukat" },
    ],
    footerAbout: "Hakkında",
    footerPrivacy: "Gizlilik",
    footerContact: "İletişim",
    adCta: "İşletmenizin reklamını yapın",
    resultsFor: "Sonuçlar:",
  },
  it: {
    home: {
      nav: { visit: "Visita", live: "Vivi", invest: "Investi", discover: "Scopri", ask: "Chiedi all'Albania" },
      heroTitle: "Il tuo punto di partenza per l'Albania.",
      heroSub: "Viaggia. Vivi. Investi. Fai impresa.",
      heroLede: "Dal pianificare un viaggio all'acquisto di una casa, all'avvio di un'attività e alla vita qui, ti aiutiamo a decidere e ad agire, gratis.",
      ctaExplore: "Esplora l'Albania",
      ctaAsk: "Chiedi all'Albania",
      pillarsTitle: "Perché sei qui?",
      pillars: {
        visit: { title: "Visita", items: ["Viaggio", "Hotel", "Auto", "Ristoranti", "Esperienze"] },
        live: { title: "Vivi", items: ["Affitto", "Acquisto", "Residenza", "Sanità", "Scuole"] },
        invest: { title: "Investi", items: ["Immobili", "Impresa", "Tasse", "Legale", "Finanza"] },
        discover: { title: "Scopri", items: ["Notizie", "Guide", "Prezzi", "Leggi", "Vita locale"] },
      },
      nowTitle: "L'Albania Adesso",
      nowSub: "Informazioni dal vivo e aggiornate.",
      exploreTitle: "Esplora l'Albania",
      exploreSub: "Scegli una destinazione e scopri cosa fare, dove alloggiare e come arrivare.",
      askTitle: "Chiedi all'Albania",
      askLede: "Dicci cosa stai cercando di fare in Albania.",
      askPlaceholder: "Ho 7 giorni e 2.000 €. Voglio spiagge, cibo e natura.",
      askButton: "Chiedi",
      actionsTitle: "Azioni popolari",
      actions: ["Dove alloggiare", "Cosa fare", "Dove mangiare", "Noleggia un'auto", "Compra casa", "Avvia un'impresa", "Trasferisciti in Albania"],
      guidesTitle: "Guide approfondite",
      guidesSub: "Poche risorse autorevoli, non un muro di articoli.",
      guides: ["Guida Completa di Viaggio in Albania", "Comprare Casa in Albania", "Trasferirsi in Albania", "Viaggio su Strada in Albania", "Le Migliori Spiagge dell'Albania", "Itinerario di 7 Giorni"],
      finalCtaLine: "La porta digitale per l'Albania.",
      seeAll: "Vedi tutto",
    },
    tagline: "Cerca. Scopri. Connetti.",
    placeholder: "Cerca in Albania…",
    search: "Cerca",
    searching: "Ricerca in corso…",
    overview: "Panoramica",
    sources: "Fonti",
    noSources: "Nessuna fonte trovata per questa ricerca.",
    error: "Si è verificato un errore durante la ricerca. Riprova.",
    disclaimer: "I risultati possono contenere imprecisioni, verifica sempre le fonti.",
    webVia: "Da Wikipedia",
    related: "Articoli correlati",
    detailedBtn: "Ottieni una risposta dettagliata",
    detailedHint: "Per domande specifiche, ottieni una risposta elaborata.",
    noWebResults: "Nessun risultato diretto trovato per questa ricerca.",
    readMore: "Leggi di più",
    notAlbania: "Shqipëri cerca solo per l'Albania e gli albanesi.",
    verified: "Verificato",
    verifyLine: "Devi verificare un'attività?",
    verifyCta: "Contattaci su WhatsApp",
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
    blogTitle: "Blog",
    dirEmpty: "Nessuna azienda ancora elencata in questa categoria.",
    dirListCta: "Sei un'azienda? Registrati qui.",
    repTitle: "Vuoi un piano personalizzato?",
    repBody:
      "Il nostro rappresentante online organizza tutto per te, tour, trasferimenti, noleggio auto, visite immobiliari e altro. Dicci di cosa hai bisogno.",
    repWhatsapp: "Scrivi su WhatsApp",
    repEmail: "Invia email",
    repSoon: "Il contatto del rappresentante sarà aggiunto presto.",
    repFree: "Gratis",
    topicsTitle: "Esplora",
    featuredTitle: "Aziende in evidenza",
    featuredListCta: "Registra la tua azienda",
    brandTitle: "Più di un motore di ricerca.",
    brandBody:
      "Cerca qualsiasi servizio in Albania, e il nostro team lo organizza per te, gratis. Tour, noleggio auto, immobili, avvocati, transfer e altro.",
    brandCta: "Chiedici qualsiasi cosa, gratis",
    brandNote: "Persone reali · Risposta in pochi minuti · Nessun costo",
    topics: [
      { label: "Notizie", query: "Ultime notizie dall'Albania" },
      { label: "Investire in Albania", query: "Investire in Albania" },
      { label: "Noleggio auto", query: "Noleggiare un'auto in Albania" },
      { label: "Affitto casa", query: "Affittare una casa in Albania" },
      { label: "Guide turistiche", query: "Guida turistica in Albania" },
      { label: "Avvocato", query: "Avvocato in Albania" },
    ],
    footerAbout: "Chi siamo",
    footerPrivacy: "Privacy",
    footerContact: "Contatti",
    adCta: "Pubblicizza la tua azienda",
    resultsFor: "Risultati per",
  },
  ar: {
    home: {
      nav: { visit: "زُر", live: "عِش", invest: "استثمر", discover: "اكتشف", ask: "اسأل ألبانيا" },
      heroTitle: "نقطة انطلاقك إلى ألبانيا.",
      heroSub: "سافر. عِش. استثمر. مارس الأعمال.",
      heroLede: "من تخطيط رحلة إلى شراء عقار وبدء عمل والعيش هنا، نساعدك على القرار والتنفيذ، مجانًا.",
      ctaExplore: "استكشف ألبانيا",
      ctaAsk: "اسأل ألبانيا",
      pillarsTitle: "لماذا أنت هنا؟",
      pillars: {
        visit: { title: "زُر", items: ["سفر", "فنادق", "سيارات", "مطاعم", "تجارب"] },
        live: { title: "عِش", items: ["إيجار", "شراء", "إقامة", "رعاية صحية", "مدارس"] },
        invest: { title: "استثمر", items: ["عقار", "أعمال", "ضرائب", "قانون", "تمويل"] },
        discover: { title: "اكتشف", items: ["أخبار", "أدلة", "أسعار", "قوانين", "الحياة المحلية"] },
      },
      nowTitle: "ألبانيا الآن",
      nowSub: "معلومات حيّة ومحدّثة.",
      exploreTitle: "استكشف ألبانيا",
      exploreSub: "اختر وجهة واكتشف ماذا تفعل وأين تقيم وكيف تصل.",
      askTitle: "اسأل ألبانيا",
      askLede: "أخبرنا بما تحاول فعله في ألبانيا.",
      askPlaceholder: "لديّ 7 أيام و2000 يورو. أريد شواطئ وطعامًا وطبيعة.",
      askButton: "اسأل",
      actionsTitle: "إجراءات شائعة",
      actions: ["أين تقيم", "ماذا تفعل", "أين تأكل", "استأجر سيارة", "اشترِ عقارًا", "ابدأ عملًا", "انتقل إلى ألبانيا"],
      guidesTitle: "أدلة متعمّقة",
      guidesSub: "مصادر موثوقة قليلة، لا جدار من المقالات.",
      guides: ["دليل السفر الكامل إلى ألبانيا", "شراء عقار في ألبانيا", "الانتقال إلى ألبانيا", "رحلة برية في ألبانيا", "أفضل شواطئ ألبانيا", "برنامج 7 أيام"],
      finalCtaLine: "البوابة الرقمية إلى ألبانيا.",
      seeAll: "عرض الكل",
    },
    tagline: "ابحث. اكتشف. تواصل.",
    placeholder: "ابحث عن ألبانيا…",
    search: "بحث",
    searching: "جارٍ البحث…",
    overview: "ملخّص",
    sources: "المصادر",
    noSources: "لم يتم العثور على مصادر لهذا البحث.",
    error: "حدث خطأ أثناء البحث. حاول مرة أخرى.",
    disclaimer: "قد تحتوي النتائج على أخطاء, تحقّق دائمًا من المصادر.",
    webVia: "من ويكيبيديا",
    related: "مقالات ذات صلة",
    detailedBtn: "احصل على إجابة مفصّلة",
    detailedHint: "للأسئلة المحددة، احصل على إجابة مُعدّة.",
    noWebResults: "لم يتم العثور على نتائج مباشرة لهذا البحث.",
    readMore: "اقرأ المزيد",
    notAlbania: "شقيبري يبحث فقط عن ألبانيا والألبان.",
    verified: "موثّق",
    verifyLine: "هل تحتاج إلى توثيق نشاط تجاري؟",
    verifyCta: "تواصل معنا عبر واتساب",
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
    blogTitle: "المدونة",
    dirEmpty: "لا توجد شركات مدرجة في هذه الفئة بعد.",
    dirListCta: "هل أنت شركة؟ سجّل هنا.",
    repTitle: "هل تريد خطة مخصّصة؟",
    repBody:
      "ينظّم ممثّلنا عبر الإنترنت كل شيء من أجلك, الجولات، النقل، تأجير السيارات، زيارات العقارات والمزيد. أخبرنا بما تحتاجه.",
    repWhatsapp: "راسلنا على واتساب",
    repEmail: "أرسل بريدًا إلكترونيًا",
    repSoon: "ستتم إضافة معلومات الاتصال بالممثّل قريبًا.",
    repFree: "مجانًا",
    topicsTitle: "استكشف",
    featuredTitle: "شركات مميّزة",
    featuredListCta: "أدرج شركتك",
    brandTitle: "أكثر من مجرّد محرّك بحث.",
    brandBody:
      "ابحث عن أي خدمة في ألبانيا, وفريقنا ينظّمها لك شخصيًا، مجانًا. جولات، تأجير سيارات، عقارات، محامون، مواصلات والمزيد.",
    brandCta: "اسألنا أي شيء, مجانًا",
    brandNote: "أشخاص حقيقيون · رد خلال دقائق · بدون أي رسوم",
    topics: [
      { label: "الأخبار", query: "آخر الأخبار من ألبانيا" },
      { label: "الاستثمار في ألبانيا", query: "الاستثمار في ألبانيا" },
      { label: "تأجير السيارات", query: "استئجار سيارة في ألبانيا" },
      { label: "تأجير منزل", query: "استئجار منزل في ألبانيا" },
      { label: "مرشدون سياحيون", query: "دليل سياحي في ألبانيا" },
      { label: "محامٍ", query: "محامٍ في ألبانيا" },
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
