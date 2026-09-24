import type { Lang } from "./i18n";

export type Pitch = { title: string; body: string; cta: string };

// Category-specific concierge offers, tailored per language.
const PITCHES: Record<string, Record<Lang, Pitch>> = {
  "tour-guides": {
    en: {
      title: "Want a personalized tour designed by our local agents?",
      body: "Tell us your dates and interests, we'll build a custom Albania itinerary just for you.",
      cta: "Plan my tour, free",
    },
    sq: {
      title: "Doni një turë të personalizuar nga agjentët tanë vendas?",
      body: "Na tregoni datat dhe interesat, ju ndërtojmë një itinerar në Shqipëri sipas dëshirës.",
      cta: "Planifiko turën time, falas",
    },
    tr: {
      title: "Yerel uzmanlarımızın hazırladığı kişiye özel bir tur ister misiniz?",
      body: "Tarihlerinizi ve ilgi alanlarınızı söyleyin, size özel bir Arnavutluk gezi planı hazırlayalım.",
      cta: "Turumu planla, ücretsiz",
    },
    it: {
      title: "Vuoi un tour personalizzato creato dai nostri agenti locali?",
      body: "Dicci le tue date e i tuoi interessi, creiamo un itinerario in Albania su misura per te.",
      cta: "Pianifica il mio tour, gratis",
    },
    ar: {
      title: "هل تريد جولة مخصصة يصممها وكلاؤنا المحليون؟",
      body: "أخبرنا بتواريخك واهتماماتك، وسنعد لك برنامج رحلة مخصصًا في ألبانيا.",
      cta: "خطط جولتي، مجانًا",
    },
  },
  "boat-yacht": {
    en: {
      title: "Want a private boat or yacht trip arranged for you?",
      body: "Tell us your dates and group size, we'll book the best boat on the Riviera for you.",
      cta: "Arrange my boat trip, free",
    },
    sq: {
      title: "Doni një udhëtim privat me varkë ose jaht?",
      body: "Na tregoni datat dhe numrin e personave, rezervojmë varkën më të mirë në Riviera.",
      cta: "Organizo udhëtimin, falas",
    },
    tr: {
      title: "Sizin için özel bir tekne veya yat gezisi ayarlayalım mı?",
      body: "Tarihlerinizi ve grup büyüklüğünüzü söyleyin, Riviera'daki en iyi tekneyi sizin için ayarlayalım.",
      cta: "Tekne gezimi ayarla, ücretsiz",
    },
    it: {
      title: "Vuoi organizzare una gita privata in barca o yacht?",
      body: "Dicci le date e il numero di persone, prenotiamo la barca migliore sulla Riviera per te.",
      cta: "Organizza la gita, gratis",
    },
    ar: {
      title: "هل تريد ترتيب رحلة خاصة بقارب أو يخت؟",
      body: "أخبرنا بالتواريخ وعدد الأشخاص، وسنحجز لك أفضل قارب على الريفيرا.",
      cta: "رتّب رحلتي، مجانًا",
    },
  },
  "buy-property": {
    en: {
      title: "Want a curated list of properties that fit your budget?",
      body: "Tell us your budget and area, we'll send you the best available properties in Albania.",
      cta: "Get my property list, free",
    },
    sq: {
      title: "Doni një listë pronash sipas buxhetit tuaj?",
      body: "Na tregoni buxhetin dhe zonën, ju dërgojmë pronat më të mira në dispozicion në Shqipëri.",
      cta: "Merr listën e pronave, falas",
    },
    tr: {
      title: "Bütçenize uygun seçilmiş bir mülk listesi ister misiniz?",
      body: "Bütçenizi ve bölgeyi söyleyin, Arnavutluk'taki en iyi mevcut mülkleri size gönderelim.",
      cta: "Mülk listemi al, ücretsiz",
    },
    it: {
      title: "Vuoi un elenco selezionato di immobili adatti al tuo budget?",
      body: "Dicci il tuo budget e la zona, ti inviamo i migliori immobili disponibili in Albania.",
      cta: "Ricevi la lista, gratis",
    },
    ar: {
      title: "هل تريد قائمة عقارات مختارة تناسب ميزانيتك؟",
      body: "أخبرنا بميزانيتك والمنطقة، وسنرسل لك أفضل العقارات المتاحة في ألبانيا.",
      cta: "احصل على قائمة العقارات، مجانًا",
    },
  },
  "rent-home": {
    en: {
      title: "Want handpicked rentals for your budget and dates?",
      body: "Tell us your budget, area and dates, we'll send matching homes available now.",
      cta: "Get my rental list, free",
    },
    sq: {
      title: "Doni banesa të përzgjedhura sipas buxhetit dhe datave?",
      body: "Na tregoni buxhetin, zonën dhe datat, ju dërgojmë shtëpitë që përputhen, në dispozicion tani.",
      cta: "Merr listën e banesave, falas",
    },
    tr: {
      title: "Bütçenize ve tarihlerinize uygun seçilmiş kiralıklar ister misiniz?",
      body: "Bütçenizi, bölgeyi ve tarihleri söyleyin, uygun ve şu an müsait evleri gönderelim.",
      cta: "Kiralık listemi al, ücretsiz",
    },
    it: {
      title: "Vuoi affitti selezionati per il tuo budget e le tue date?",
      body: "Dicci budget, zona e date, ti inviamo le case disponibili ora.",
      cta: "Ricevi la lista, gratis",
    },
    ar: {
      title: "هل تريد وحدات إيجار مختارة تناسب ميزانيتك وتواريخك؟",
      body: "أخبرنا بميزانيتك والمنطقة والتواريخ، وسنرسل لك المنازل المتاحة الآن.",
      cta: "احصل على قائمة الإيجار، مجانًا",
    },
  },
  "rent-villa": {
    en: {
      title: "Want handpicked villas for your dates?",
      body: "Tell us your budget and dates, we'll send available villas across Albania.",
      cta: "Get my villa list, free",
    },
    sq: {
      title: "Doni vila të përzgjedhura për datat tuaja?",
      body: "Na tregoni buxhetin dhe datat, ju dërgojmë vilat në dispozicion në Shqipëri.",
      cta: "Merr listën e vilave, falas",
    },
    tr: {
      title: "Tarihlerinize uygun seçilmiş villalar ister misiniz?",
      body: "Bütçenizi ve tarihleri söyleyin, Arnavutluk genelinde müsait villaları gönderelim.",
      cta: "Villa listemi al, ücretsiz",
    },
    it: {
      title: "Vuoi ville selezionate per le tue date?",
      body: "Dicci budget e date, ti inviamo le ville disponibili in Albania.",
      cta: "Ricevi la lista, gratis",
    },
    ar: {
      title: "هل تريد فيلات مختارة لتواريخك؟",
      body: "أخبرنا بميزانيتك والتواريخ، وسنرسل لك الفيلات المتاحة في ألبانيا.",
      cta: "احصل على قائمة الفيلات، مجانًا",
    },
  },
  "rent-car": {
    en: {
      title: "Want the best cars available for your dates?",
      body: "Tell us your dates and pickup point (airport included), we'll send the best cars available now.",
      cta: "See available cars, free",
    },
    sq: {
      title: "Doni makinat më të mira në dispozicion për datat tuaja?",
      body: "Na tregoni datat dhe vendin e marrjes (përfshirë aeroportin), ju dërgojmë makinat në dispozicion tani.",
      cta: "Shiko makinat në dispozicion, falas",
    },
    tr: {
      title: "Tarihlerinize uygun en iyi müsait arabalar ister misiniz?",
      body: "Tarihlerinizi ve teslim noktanızı (havalimanı dahil) söyleyin, şu an müsait en iyi arabaları gönderelim.",
      cta: "Müsait arabaları gör, ücretsiz",
    },
    it: {
      title: "Vuoi le migliori auto disponibili per le tue date?",
      body: "Dicci le date e il punto di ritiro (aeroporto incluso), ti inviamo le migliori auto disponibili ora.",
      cta: "Vedi le auto, gratis",
    },
    ar: {
      title: "هل تريد أفضل السيارات المتاحة لتواريخك؟",
      body: "أخبرنا بالتواريخ ومكان الاستلام (بما في ذلك المطار)، وسنرسل لك أفضل السيارات المتاحة الآن.",
      cta: "شاهد السيارات المتاحة، مجانًا",
    },
  },
  "taxi-transfers": {
    en: {
      title: "Want a private driver booked for your route?",
      body: "Tell us your route and time, we'll arrange a reliable driver or airport transfer.",
      cta: "Book my transfer, free",
    },
    sq: {
      title: "Doni një shofer privat për rrugën tuaj?",
      body: "Na tregoni rrugën dhe orarin, organizojmë një transfertë të besueshme.",
      cta: "Rezervo transfertën, falas",
    },
    tr: {
      title: "Güzergahınız için özel bir şoför ayarlayalım mı?",
      body: "Güzergahınızı ve saati söyleyin, güvenilir bir şoför veya havalimanı transferi ayarlayalım.",
      cta: "Transferimi ayarla, ücretsiz",
    },
    it: {
      title: "Vuoi un autista privato per il tuo percorso?",
      body: "Dicci il percorso e l'orario, organizziamo un autista affidabile o un transfer aeroportuale.",
      cta: "Prenota il transfer, gratis",
    },
    ar: {
      title: "هل تريد حجز سائق خاص لمسارك؟",
      body: "أخبرنا بمسارك والوقت، وسنرتب لك سائقًا موثوقًا أو نقلًا من المطار.",
      cta: "احجز النقل، مجانًا",
    },
  },
  "rent-helicopter": {
    en: {
      title: "Want a helicopter charter arranged?",
      body: "Tell us your route and date, we'll arrange your flight.",
      cta: "Arrange my flight, free",
    },
    sq: {
      title: "Doni të organizoni një fluturim me helikopter?",
      body: "Na tregoni rrugën dhe datën, organizojmë fluturimin tuaj.",
      cta: "Organizo fluturimin, falas",
    },
    tr: {
      title: "Bir helikopter kiralaması ayarlayalım mı?",
      body: "Güzergahınızı ve tarihi söyleyin, uçuşunuzu ayarlayalım.",
      cta: "Uçuşumu ayarla, ücretsiz",
    },
    it: {
      title: "Vuoi organizzare un volo in elicottero?",
      body: "Dicci il percorso e la data, organizziamo il tuo volo.",
      cta: "Organizza il volo, gratis",
    },
    ar: {
      title: "هل تريد ترتيب رحلة بطائرة هليكوبتر؟",
      body: "أخبرنا بمسارك والتاريخ، وسنرتب رحلتك.",
      cta: "رتّب رحلتي، مجانًا",
    },
  },
  lawyer: {
    en: {
      title: "Want us to match you with the right lawyer?",
      body: "Tell us about your case, we'll connect you with the best-fit lawyer in Albania.",
      cta: "Find my lawyer, free",
    },
    sq: {
      title: "Doni t'ju lidhim me avokatin e duhur?",
      body: "Na tregoni çështjen tuaj, ju lidhim me avokatin më të përshtatshëm në Shqipëri.",
      cta: "Gjej avokatin, falas",
    },
    tr: {
      title: "Sizi doğru avukatla eşleştirelim mi?",
      body: "Davanızı anlatın, Arnavutluk'ta size en uygun avukatla sizi buluşturalım.",
      cta: "Avukatımı bul, ücretsiz",
    },
    it: {
      title: "Vuoi che ti mettiamo in contatto con l'avvocato giusto?",
      body: "Raccontaci il tuo caso, ti colleghiamo con l'avvocato più adatto in Albania.",
      cta: "Trova il mio avvocato, gratis",
    },
    ar: {
      title: "هل تريد أن نوصلك بالمحامي المناسب؟",
      body: "أخبرنا بقضيتك، وسنوصلك بأنسب محامٍ في ألبانيا.",
      cta: "جد محاميي، مجانًا",
    },
  },
  accountants: {
    en: {
      title: "Want the right accountant for your business?",
      body: "Tell us your needs, we'll match you with a trusted accountant or tax advisor.",
      cta: "Find my accountant, free",
    },
    sq: {
      title: "Doni kontabilistin e duhur për biznesin tuaj?",
      body: "Na tregoni nevojat, ju lidhim me një kontabilist ose këshilltar taksash të besuar.",
      cta: "Gjej kontabilistin, falas",
    },
    tr: {
      title: "İşiniz için doğru muhasebeciyi ister misiniz?",
      body: "İhtiyaçlarınızı söyleyin, güvenilir bir muhasebeci veya vergi danışmanıyla sizi eşleştirelim.",
      cta: "Muhasebecimi bul, ücretsiz",
    },
    it: {
      title: "Vuoi il commercialista giusto per la tua attività?",
      body: "Dicci le tue esigenze, ti colleghiamo con un commercialista o consulente fiscale di fiducia.",
      cta: "Trova il commercialista, gratis",
    },
    ar: {
      title: "هل تريد المحاسب المناسب لعملك؟",
      body: "أخبرنا باحتياجاتك، وسنوصلك بمحاسب أو مستشار ضرائب موثوق.",
      cta: "جد محاسبي، مجانًا",
    },
  },
  banks: {
    en: {
      title: "Want help choosing the best bank or loan?",
      body: "Tell us what you need, we'll guide you to the right bank, account or loan in Albania.",
      cta: "Get guidance, free",
    },
    sq: {
      title: "Doni ndihmë për të zgjedhur bankën ose kredinë?",
      body: "Na tregoni çfarë ju nevojitet, ju udhëzojmë te banka, llogaria ose kredia e duhur.",
      cta: "Merr këshillë, falas",
    },
    tr: {
      title: "En iyi banka veya krediyi seçmek için yardım ister misiniz?",
      body: "Neye ihtiyacınız olduğunu söyleyin, Arnavutluk'ta doğru banka, hesap veya krediye yönlendirelim.",
      cta: "Rehberlik al, ücretsiz",
    },
    it: {
      title: "Vuoi aiuto a scegliere la banca o il prestito migliore?",
      body: "Dicci cosa ti serve, ti guidiamo verso la banca, il conto o il prestito giusto in Albania.",
      cta: "Ricevi assistenza, gratis",
    },
    ar: {
      title: "هل تريد مساعدة في اختيار أفضل بنك أو قرض؟",
      body: "أخبرنا بما تحتاجه، وسنرشدك إلى البنك أو الحساب أو القرض المناسب في ألبانيا.",
      cta: "احصل على إرشاد، مجانًا",
    },
  },
  invest: {
    en: {
      title: "Want a tailored plan to invest in Albania?",
      body: "Tell us your goals and budget, we'll guide your investment step by step.",
      cta: "Get my plan, free",
    },
    sq: {
      title: "Doni një plan të posaçëm për të investuar në Shqipëri?",
      body: "Na tregoni qëllimet dhe buxhetin, ju udhëzojmë investimin hap pas hapi.",
      cta: "Merr planin tim, falas",
    },
    tr: {
      title: "Arnavutluk'a yatırım için size özel bir plan ister misiniz?",
      body: "Hedeflerinizi ve bütçenizi söyleyin, yatırımınızda adım adım size rehberlik edelim.",
      cta: "Planımı al, ücretsiz",
    },
    it: {
      title: "Vuoi un piano su misura per investire in Albania?",
      body: "Dicci i tuoi obiettivi e il budget, ti guidiamo nell'investimento passo dopo passo.",
      cta: "Ricevi il mio piano, gratis",
    },
    ar: {
      title: "هل تريد خطة مخصصة للاستثمار في ألبانيا؟",
      body: "أخبرنا بأهدافك وميزانيتك، وسنرشدك في استثمارك خطوة بخطوة.",
      cta: "احصل على خطتي، مجانًا",
    },
  },
};

export function getPitch(categoryId: string | null, lang: Lang): Pitch | null {
  if (!categoryId) return null;
  const p = PITCHES[categoryId];
  if (!p) return null;
  return p[lang] ?? p.en;
}
