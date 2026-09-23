import type { Lang } from "./i18n";

/** Per-language text; sq/en required, others optional (fall back to English). */
export type LangText = {
  sq: string;
  en: string;
  tr?: string;
  it?: string;
  ar?: string;
};

/** Resolve localized text for a language, falling back to English. */
export function localize(t: LangText, lang: Lang): string {
  return t[lang] ?? t.en;
}

export type Company = {
  name: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  /** Google/aggregate star rating, e.g. 4.6. Shown as a badge; used to sort. */
  rating?: number;
  /** Number of Google reviews — shown when no star rating; used to sort. */
  reviews?: number;
  /** Featured/premium listing — gets the highlighted style and sorts first. */
  featured?: boolean;
  /** Short description; string or per-language. */
  note?: string | LangText;
};

/** Featured first, then best-rated, then most-reviewed; the rest keep their order. */
export function sortByRating(companies: Company[]): Company[] {
  return [...companies].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    if ((a.rating ?? -1) !== (b.rating ?? -1)) return (b.rating ?? -1) - (a.rating ?? -1);
    return (b.reviews ?? -1) - (a.reviews ?? -1);
  });
}

export type Category = {
  id: string;
  name: LangText;
  /** When a search matches this pattern, this category's companies are shown. */
  match: RegExp;
  companies: Company[];
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BUSINESS DIRECTORY
 *  Add the contacts/companies you collect into the `companies` arrays below.
 *  Each entry supports: name, city, phone, email, website, note.
 *
 *  Example:
 *    {
 *      name: "Auto Rent Tirana",
 *      city: "Tiranë",
 *      phone: "+355 69 000 0000",
 *      email: "info@example.com",
 *      website: "https://example.com",
 *      note: { sq: "Makina me qira 24/7", en: "Car rental 24/7" },
 *    }
 * ─────────────────────────────────────────────────────────────────────────
 */

// Reused across the property categories (rent + buy).
const century21Yllka: Company = {
  name: "Century 21 Albania — Yllka Tule",
  city: "Tiranë",
  phone: "+355 67 650 7008",
  website: "https://www.century21albania.com/en/agent/1963-yllka-tule.html",
  featured: true,
  note: {
    sq: "Agjente pronash — qira & blerje (apartamente, vila, prona)",
    en: "Property agent — rent & buy (apartments, villas, homes)",
  },
};

const edisonLami: Company = {
  name: "Edison Lami",
  phone: "+355 68 806 5088",
  featured: true,
  note: {
    sq: "Prona — qira & blerje (apartamente, vila, prona, tokë)",
    en: "Property — rent & buy (apartments, villas, homes, land)",
  },
};

// Albanian tour operators & travel agencies.
const TOUR_COMPANIES: Company[] = [
  { name: "Choose Balkans", city: "Tirana", website: "https://choosebalkans.com/", note: "Multi-day, cultural, adventure, hiking (private/group)" },
  { name: "Albania Holidays DMC", city: "Tirana", phone: "+355 4 2235 498", website: "https://www.albania-holidays.com/", note: "DMC, cultural, incentive, cruise shore excursions, group tours" },
  { name: "Albanian Odyssey", city: "Tirana", phone: "+355 69 619 1691", website: "https://albanianodyssey.com/", note: "Cultural, nature, history, food, custom tours" },
  { name: "Albania My Way", city: "Tirana", phone: "+355 68 900 9560", website: "https://www.albaniamyway.com/", note: "Custom/private, cultural, nature, local experiences" },
  { name: "Aria Travel Albania", city: "Tirana", phone: "+355 69 223 4999", website: "https://www.ariatravelalbania.com/", note: "Cultural, historical, nature, custom tours" },
  { name: "AR&LO BluTour", city: "Tirana", phone: "+355 69 405 0183", website: "http://www.blutour.al/", note: "FIT, group, leisure, business travel, tours" },
  { name: "Attractive Travel", city: "Tirana", phone: "+355 69 942 2999", website: "https://attractive-travel.com/", note: "Albania & Balkan tours, classical, cultural, adventure" },
  { name: "Europa Travel & Tours", city: "Tirana", phone: "+355 4 222 1583", website: "https://www.europatravelalbania.com/", note: "Classical, adventure, religious, leisure, FIT/group" },
  { name: "Cycle Albania", city: "Tirana", phone: "+355 69 247 5728", website: "https://cyclealbania.com/", note: "Cycling tours, active travel" },
  { name: "Explorer Travel & Tours", city: "Tirana", phone: "+355 4 224 7572", website: "https://www.ave-tour.com/", note: "Daily tours, weekend, nature, culture" },
  { name: "Fine Travel Albania", city: "Tirana", phone: "+355 69 371 6804", website: "https://finetravelalbania.com/", note: "DMC, boutique, incentive, bespoke experiences" },
  { name: "Good Albania", city: "Tirana", phone: "+355 67 664 6146", website: "https://goodalbania.com/", note: "Experiential, conscious travel, cultural, nature" },
  { name: "Jona Travel", city: "Tirana", phone: "+355 4 222 3346", website: "https://www.jona-travel.al/", note: "Tours, travel packages, cultural/leisure" },
  { name: "Kalemi Travel & Tours", city: "Tirana", phone: "+355 69 888 5656", website: "https://kalemitravel.com/", note: "Cultural, activities, adventures, Gjirokastër tours" },
  { name: "Outdoor Albania", city: "Tirana", phone: "+355 4 222 7121", website: "https://www.outdooralbania.com/", note: "Adventure, hiking, rafting, trekking, outdoor" },
  { name: "Zbulo", city: "Tirana", phone: "+355 69 212 1612", website: "https://www.zbulo.org/", note: "Hiking, trekking, self-guided, adventure" },
  { name: "intours Albania", city: "Tirana", phone: "+355 69 204 0434", website: "https://intours.al/", note: "Tour operator, DMC, cultural, leisure, group" },
  { name: "Tours Albania & Balkans", city: "Tirana", phone: "+355 68 402 9914", website: "https://www.tours-albania.com/", note: "Private/group, cultural, nature, multi-day" },
  { name: "Albanian Trip", city: "Tirana", phone: "+355 68 405 8529", website: "https://albaniantrip.com/", note: "Cultural, nature, city, custom tours" },
  { name: "Discover Albania / Albania Social Club", city: "Tirana", phone: "+355 69 658 3870", website: "https://discoveralbania.al/", note: "Social, cultural, local experiences, tours" },
  { name: "Marled Travel & Events Albania DMC", city: "Tirana", phone: "+355 69 658 7554", website: "https://www.marled.al/", note: "DMC, events, groups, corporate, cultural" },
  { name: "Bravo Tours", city: "Tirana", phone: "+355 69 632 2731", website: "https://bravotours.al/", note: "Tours, travel packages, group travel" },
  { name: "Zenith Travel", city: "Tirana", phone: "+355 68 205 9020", website: "https://zenithtravel.al/", note: "Travel agency, tours, packages" },
  { name: "Planet Travel & Tours", city: "Tirana", phone: "+355 68 903 0102", note: "Tour operator, travel packages, group tours" },
  { name: "Smart Travel & Tours", city: "Tirana", phone: "+355 68 822 2222", note: "Tours, travel packages, group travel" },
  { name: "Global Tours Albania", city: "Tirana", phone: "+355 68 200 1112", website: "https://globaltours.al/", note: "Tour operator, cultural/leisure, packages" },
  { name: "Berati Tours", city: "Tirana / Berat", phone: "+355 69 360 4259", website: "https://berati-tours.com/", note: "Berat, cultural, historical, food, local experiences" },
  { name: "Shkodra Travel & Tours", city: "Shkodër", phone: "+355 69 209 1288", website: "https://shkodratravel.com/", note: "Cultural, northern Albania, nature, custom tours" },
  { name: "Albanian Treasures", city: "Tirana", phone: "+355 69 204 9836", website: "https://albanian-treasures.com/", note: "Cultural, heritage, custom Albania tours" },
  { name: "Caravan Horse Riding Albania", city: "Gjirokastër", phone: "+355 69 535 7743", note: "Horse riding, rural, nature, adventure" },
  { name: "Active Albania", city: "Berat", phone: "+355 68 907 3732", note: "Outdoor, adventure, active travel" },
  { name: "Albania Rafting", city: "Berat", phone: "+355 67 200 6623", website: "https://albrafting.org/", note: "Rafting, outdoor adventure (Vjosa, Osum Canyon)" },
  { name: "Ecotour Albania", city: "Tirana", phone: "+355 68 209 2562", website: "https://ecotouralbania.com/", note: "Eco, nature, cultural, sustainable tours" },
  { name: "Albanian Adventure Resort", city: "Skrapar", phone: "+355 69 996 7609", website: "https://aar.al/", note: "Adventure, outdoor, rafting, nature" },
  { name: "Albania Explorer", city: "Tirana", website: "https://albaniaexplorer.com/", note: "DMC, cultural, nature (private/group)" },
  { name: "Visit Albania DMC", city: "Tirana", phone: "+355 68 903 0102", note: "DMC, cultural, private/group tours" },
  { name: "Albania Express Travel", city: "Tirana", phone: "+355 68 282 6670", note: "Travel/tours, packages, excursions" },
  { name: "Shkendija Travel & Cruises", city: "Sarandë", phone: "+355 69 234 8222", website: "https://shkendijatravel.com/", note: "Cruises, boat trips, southern Albania excursions" },
  { name: "Blue Line Travel", city: "Sarandë", phone: "+355 69 799 7299", website: "https://blueline.agency/", note: "Southern Albania, excursions, coastal tours" },
  { name: "InAlba Tour", city: "Përmet", phone: "+355 68 434 0700", website: "https://inalbatour.com/", note: "Nature, cultural, rafting, local experiences" },
];

// Albanian car rental companies.
const CAR_RENTAL_COMPANIES: Company[] = [
  { name: "Rental cars Tirana", city: "Tirana", phone: "+355 69 588 0047", note: "Car rental" },
  { name: "Rental Zone Rent a Car", city: "Tirana", phone: "+355 68 208 2236", note: "Car rental" },
  { name: "4x4 Car Rental Tirana Albania", city: "Tirana", phone: "+355 69 525 7213", note: "4x4 / SUV rental" },
  { name: "RENTiGO ALBANIA", city: "Tirana", note: "Car rental" },
  { name: "Perfect Car Rental Tirana", city: "Tirana", phone: "+355 69 683 8939", note: "Car rental" },
  { name: "Eurocar Rentals Tirana", city: "Tirana", phone: "+355 67 600 7060", note: "Car rental" },
  { name: "ARC Albania Rental Car", city: "Tirana", phone: "+355 69 586 5190", note: "Car rental" },
  { name: "Tirana Airport Rental Car", city: "Tirana / Rinas", phone: "+355 69 672 4671", note: "Airport car rental" },
  { name: "Nika's Rent Car Tirana", city: "Tirana", phone: "+355 68 409 4433", note: "Car rental" },
  { name: "Rent Point Albania", city: "Tirana", phone: "+355 69 587 5689", note: "Car rental" },
  { name: "Rent a car Tirana", city: "Tirana / Rinas", phone: "+355 69 268 6033", note: "Airport car rental" },
  { name: "Tirana Car Rentals", city: "Tirana", phone: "+355 67 600 5454", note: "Car rental" },
  { name: "Rent Cars Albania", city: "Tirana", phone: "+355 69 800 7001", note: "Car rental" },
  { name: "Tezaku Rent Car", city: "Tirana", phone: "+355 69 214 8572", note: "Car rental" },
  { name: "Amigo Car Rental Tirana", city: "Tirana", phone: "+355 69 208 5675", note: "Car rental" },
  { name: "Prestige Rent Car", city: "Tirana", phone: "+355 69 609 7775", note: "Car rental" },
  { name: "Hana Rental", city: "Tirana", phone: "+355 67 491 1084", note: "Car rental" },
  { name: "Real Rent Car Rental", city: "Tirana", phone: "+355 69 543 4570", note: "Car rental" },
  { name: "Tirana Rent Cars", city: "Tirana", phone: "+355 68 488 8888", note: "Car rental" },
  { name: "Albania Rent-a-car", city: "Tirana", phone: "+355 68 334 5580", note: "Car rental" },
  { name: "AA Rent a Car", city: "Rinas / Tirana", phone: "+355 68 408 8008", website: "https://www.albaniarentalcars.com/", note: "Car rental, taxi, rental with driver" },
  { name: "Goldcar", city: "Rinas / Tirana", phone: "+355 69 700 4004", website: "https://www.goldcar.com/", note: "Car rental" },
  { name: "Avis", city: "Rinas / Tirana", phone: "+355 67 502 3413", website: "https://www.avis.com/", note: "Car rental" },
  { name: "Enterprise Rent-A-Car", city: "Rinas / Tirana", phone: "+355 67 600 0900", website: "https://www.enterprise.com/", note: "Car rental" },
  { name: "Hertz", city: "Rinas / Tirana", phone: "+355 69 205 8775", website: "https://www.hertz.com/", note: "Car rental" },
  { name: "SIXT", city: "Rinas / Tirana", website: "https://www.sixt.com/", note: "Car rental, premium/luxury" },
  { name: "Alamo", city: "Rinas / Tirana", website: "https://www.alamo.com/", note: "Car rental" },
  { name: "Sicily by Car", city: "Rinas / Tirana", website: "https://www.sicilybycar.it/", note: "Car rental" },
  { name: "Europcar", city: "Rinas / Tirana", website: "https://www.europcar.com/", note: "Car rental" },
  { name: "Budget", city: "Rinas / Tirana", website: "https://www.budget.com/", note: "Car rental" },
  { name: "Auto-Union", city: "Rinas / Tirana", website: "https://www.auto-union.com/", note: "Car rental" },
  { name: "Carwiz", city: "Rinas / Tirana", website: "https://www.carwiz.rent/", note: "Car rental" },
  { name: "Addcar", city: "Rinas / Tirana", website: "https://www.addcarrental.com/", note: "Car rental" },
  { name: "Ace Rent A Car", city: "Rinas / Tirana", website: "https://www.acerentacar.com/", note: "Car rental" },
  { name: "Surprice Cars", city: "Rinas / Tirana", website: "https://www.surpricecars.com/", note: "Car rental" },
  { name: "Green Motion", city: "Rinas / Tirana", website: "https://greenmotion.com/", note: "Car rental" },
  { name: "MEX Rent A Car", city: "Rinas / Tirana", website: "https://mexrentacar.com/", note: "Car rental" },
  { name: "Global Rent A Car", city: "Rinas / Tirana", note: "Car rental" },
  { name: "Autowill Rent A Car", city: "Rinas / Tirana", note: "Car rental" },
  { name: "Wheego", city: "Rinas / Tirana", website: "https://www.wheego-mobility.com/", note: "Car rental" },
];

// Albanian lawyers & law firms.
const LAW_FIRMS: Company[] = [
  { name: "Boga & Associates", city: "Tirana", phone: "+355 4 225 1050", email: "boga@bogalaw.com", website: "https://bogalaw.com/", note: "Corporate, commercial, banking, tax, litigation, real estate" },
  { name: "Kalo & Associates", city: "Tirana", phone: "+355 4 223 3532", email: "kalo@kalo-attorneys.com", website: "https://kalo-attorneys.com/", note: "Corporate, M&A, banking, competition, employment, real estate" },
  { name: "Hoxha, Memi & Hoxha", city: "Tirana", phone: "+355 4 227 4558", website: "https://hmh.al/", note: "Corporate, commercial, banking, real estate, litigation" },
  { name: "Wolf Theiss Albania", city: "Tirana", phone: "+355 4 227 4521", email: "sokol.nako@wolftheiss.com", website: "https://www.wolftheiss.com/countries/albania/", note: "Corporate, banking & finance, real estate, projects, cross-border" },
  { name: "Rokas & Associates", city: "Tirana", phone: "+355 4 226 7707", email: "albania@rokas.com", website: "https://rokas.com/", note: "Corporate, energy, projects, litigation, employment" },
  { name: "Drakopoulos Law Firm", city: "Tirana", phone: "+355 4 451 8181", website: "https://drakopoulos-law.com/", note: "Corporate, commercial, banking, real estate, dispute resolution" },
  { name: "Claes & Partners", city: "Tirana", website: "https://claespartners.com/", note: "Corporate, commercial, M&A, tax, employment" },
  { name: "Eversheds Bianchini Albania", city: "Tirana", phone: "+355 4 227 2265", website: "https://www.eversheds-sutherland.com/", note: "Corporate, M&A, banking, energy, infrastructure" },
  { name: "Tonucci & Partners Albania", city: "Tirana", phone: "+355 4 225 0711", website: "https://tonucci.com/", note: "Corporate, commercial, real estate, litigation, tax" },
  { name: "CMS Albania", city: "Tirana", phone: "+355 4 430 2123", website: "https://cms.law/", note: "Corporate, M&A, banking, projects, competition, real estate" },
  { name: "AFortiori Legal Counselors", city: "Tirana", phone: "+355 68 201 0106", note: "Corporate, commercial, civil, litigation" },
  { name: "Bozo Law & Associates", city: "Tirana", phone: "+355 68 203 0420", note: "Civil, commercial, criminal, family, litigation" },
  { name: "ARS Legal & Financial Services", city: "Tirana", phone: "+355 69 247 6387", note: "Legal, tax, accounting, corporate, commercial" },
  { name: "ShukeLaw", city: "Tirana", note: "Corporate, commercial, real estate, investment, dispute resolution" },
  { name: "Frost & Fire Consulting", city: "Tirana", note: "Corporate, commercial, tax, regulatory, dispute resolution" },
  { name: "Hoxha Law Firm", city: "Tirana", phone: "+355 68 206 6333", note: "Civil, family, criminal, property, litigation" },
  { name: "Alba Legal Albanian Law Firm", city: "Tirana", phone: "+355 67 250 8888", note: "Civil, commercial, family, immigration, real estate" },
  { name: "Haka & Associates Law Firm", city: "Tirana", phone: "+355 69 204 7429", note: "Civil, commercial, corporate, litigation" },
  { name: "Shkrela Legal Solutions", city: "Tirana", phone: "+355 69 347 9230", note: "Civil, commercial, employment, family, litigation" },
  { name: "JBC & Associates", city: "Tirana", phone: "+355 69 603 2690", note: "Corporate, commercial, civil, real estate, litigation" },
  { name: "Kthupi & Zguri Law", city: "Tirana", phone: "+355 69 203 1881", note: "Civil, commercial, family, property, litigation" },
  { name: "LPA Law Firm Albania", city: "Tirana", phone: "+355 67 511 1681", note: "Corporate, commercial, tax, real estate, litigation" },
  { name: "MALAJ LAW FIRM", city: "Tirana", note: "Civil, criminal, family, property, litigation" },
  { name: "Studio Ligjore TIVARI", city: "Tirana", note: "Civil, criminal, family, administrative" },
  { name: "Studio Ligjore De Jure", city: "Tirana", note: "Civil, commercial, family, administrative" },
  { name: "Petani Law & Tax", city: "Tirana", note: "Tax, corporate, commercial, accounting" },
  { name: "Vela Law Firm", city: "Tirana", note: "Corporate, commercial, civil, litigation" },
  { name: "Theodhori & Partners", city: "Tirana", note: "Corporate, commercial, civil, litigation" },
  { name: "Sako Legal", city: "Tirana", note: "Civil, commercial, family, litigation" },
  { name: "Malaj & Associates Law Firm", city: "Tirana", note: "Corporate, civil, criminal, litigation" },
  { name: "Vision Consulting Albania", city: "Tirana", phone: "+355 68 404 5566", note: "Legal consulting, corporate, commercial, tax" },
  { name: "NLT Consulting", city: "Tirana", phone: "+355 67 408 6303", note: "Legal and business consulting" },
  { name: "Avokat Im", city: "Tirana", phone: "+355 69 336 6999", note: "General legal services, civil, family, litigation" },
  { name: "Avokat - Zyre Avokatie", city: "Tirana", phone: "+355 67 221 1323", note: "General legal services, civil, family, litigation" },
  { name: "Avokate Rejsi Meçe", city: "Tirana", note: "Trial, civil, family, litigation" },
  { name: "Tirana lawyer Eranda Gjonaj", city: "Tirana", phone: "+355 68 208 4324", note: "Legal services, civil, commercial, litigation" },
  { name: "Avokat Arjan Dervishanji", city: "Tirana", phone: "+355 69 337 0970", note: "Legal services, civil, criminal, litigation" },
  { name: "AV Valentina Halili", city: "Tirana", phone: "+355 69 941 0620", note: "Legal services, civil, family, litigation" },
  { name: "Briss' Law Zyrë Ligjore / Avokate", city: "Tirana", phone: "+355 68 206 7455", note: "Legal services, civil, commercial, family" },
];

// Albanian boat & yacht tours (reviews = Google review count).
const BOAT_YACHT_COMPANIES: Company[] = [
  { name: "Vlora Boat Trip 3 Fiori", city: "Vlorë", phone: "+355 69 226 2980", reviews: 8359, note: "Boat tours, cruises (Sazan, Karaburun, Vlorë)" },
  { name: "TripMe.Today Boat Tour & Boat Trips Vlore", city: "Vlorë", phone: "+355 69 444 6664", reviews: 4441, note: "Boat tours, cruises, private trips" },
  { name: "Himara Watertaxi - Boat trips Albania", city: "Himarë", phone: "+355 69 564 6999", reviews: 1688, note: "Water taxi, boat trips (Riviera, caves)" },
  { name: "Exploring Himara Boat Trips", city: "Himarë", phone: "+355 69 973 9957", reviews: 1563, note: "Boat tours, private trips (caves, bays)" },
  { name: "Tedi Boat Trip Ksamil", city: "Ksamil", phone: "+355 68 330 4804", reviews: 1080, note: "Boat tours, island trips (Ksamil, Tongo)" },
  { name: "Himara Golden Boat Tours", city: "Himarë", phone: "+355 69 332 3083", reviews: 742, note: "Boat tours, private trips (Riviera)" },
  { name: "Durres Daily Tours", city: "Durrës", phone: "+355 68 666 6603", reviews: 622, note: "Boat tours, daily excursions" },
  { name: "Ajla Boat", city: "Sarandë", phone: "+355 69 644 6410", reviews: 605, note: "Boat tours (Sarandë, Ksamil, Ionian coast)" },
  { name: "Luna Boat Trips Vlore", city: "Vlorë", phone: "+355 69 944 8195", reviews: 602, note: "Boat tours, cruises (Sazan, Karaburun)" },
  { name: "Adventure Point Boat Tours & ATV Tours", city: "Durrës", phone: "+355 69 618 3536", reviews: 458, note: "Boat tours, ATV, excursions" },
  { name: "SeaSun BoatTours Ksamil", city: "Ksamil", phone: "+355 69 993 2818", reviews: 447, note: "Boat tours, island trips (Ksamil, Tongo)" },
  { name: "Santi Boat Saranda", city: "Sarandë", phone: "+355 69 486 4488", reviews: 447, note: "Boat tours, private trips (Ksamil, Riviera)" },
  { name: "Sea Breeze Boat Tours - Himara", city: "Himarë", phone: "+355 69 286 4190", reviews: 432, note: "Boat tours, private/group (caves, bays)" },
  { name: "Ava Boat Tours Saranda", city: "Sarandë", phone: "+355 69 680 7381", reviews: 339, note: "Boat tours, private trips (caves, beaches)" },
  { name: "Ksamil Boat Tours - Trip", city: "Ksamil", phone: "+355 69 691 5199", reviews: 155, note: "Boat tours (Ksamil Islands, Tongo)" },
  { name: "Rei Boat Tours", city: "Sarandë", phone: "+355 69 478 8314", reviews: 93, note: "Boat rental, boat tours (Ksamil, Riviera)" },
  { name: "Boat Tours Ksamil", city: "Ksamil", phone: "+355 69 655 4011", reviews: 63, note: "Boat tours (Ksamil Islands, caves)" },
  { name: "Durres Boat Trips", city: "Durrës", phone: "+355 69 214 3830", reviews: 1, note: "Boat tours (Adriatic coast)" },
  { name: "Azzuro Yacht Charter", city: "Durrës", phone: "+355 69 285 5951", reviews: 24, note: "Yacht charter, boat tours (Adriatic coast)" },
  { name: "Boat Trip Albania", city: "Vlorë / Sarandë / Ksamil / Himarë", phone: "+355 68 240 7915", website: "https://boatripalbania.com/", note: "Boat tours, cruises, speedboats, private trips" },
  { name: "Gloria Boat Tours Saranda", city: "Sarandë", website: "https://www.gloriaboatsaranda.com/", note: "Group cruises, private charters (Turtle Cave, Kakome)" },
  { name: "Riviera Boats AL", city: "Vlorë / Himarë / Sarandë", website: "https://rivieraboatsal.com/", note: "Group tours, private charters (Riviera)" },
  { name: "Marin Yacht Agency", city: "Sarandë", phone: "+355 68 827 2447", email: "info@marinyachtagency.com", website: "https://www.marinyachtagency.com/", note: "Yacht agency, port services, yacht support" },
  { name: "BWA Yachting Albania", city: "Sarandë", phone: "+355 69 209 4030", email: "albania@bwayachting.com", website: "https://www.bwayachting.com/albania/", note: "Yacht management, charter, agency" },
  { name: "Acquera Yachting", city: "Sarandë", phone: "+355 69 457 5752", email: "bjordi.gogo@acquera.com", website: "https://www.acquerayachting.com/", note: "Yacht agency, charter support" },
  { name: "Samer&Misa", city: "Sarandë", phone: "+355 69 202 4706", email: "samer-misa@samer-misa.com", website: "http://www.samer-misa.com/", note: "Yacht / port services" },
  { name: "MT Sky", city: "Sarandë", phone: "+355 68 804 4929", email: "info@mtskyachting.com", website: "https://mtskyachting.com/", note: "Yacht services, charter support" },
  { name: "Agimi-Jonian", city: "Sarandë", phone: "+355 69 256 6576", email: "agimzholi@yahoo.com", website: "http://agimi-jonian.com/", note: "Boat / yacht services (Ionian coast)" },
  { name: "Albania Destination Service", city: "Sarandë", phone: "+355 69 254 2475", email: "info@albania-destination.com", website: "https://albania-destination.com/", note: "Destination services, boat/yacht support" },
  { name: "Super Yacht Services Albania", city: "Sarandë", phone: "+355 69 401 0322", email: "info@superyachtalbania.com", website: "https://superyachtservicesalbania.com/", note: "Superyacht services, yacht support" },
  { name: "Sipa Tours", city: "Sarandë", phone: "+355 85 226 675", email: "info@sipatours.com", website: "https://sipatours.com/", note: "Tours, boat excursions, destination services" },
  { name: "AYC Albania Yacht Charter", city: "Tirana / Albania", phone: "+355 67 600 0688", email: "albaniayacht.charter@gmail.com", note: "Yacht charter (Albanian coast)" },
  { name: "Hello Albania", city: "Vlorë", phone: "+355 67 208 0007", email: "info@helloagency.al", note: "Tours, coastal excursions (Riviera)" },
];

// Albanian taxi & airport transfer services.
const TAXI_COMPANIES: Company[] = [
  { name: "Auto Holiday Albania / TIA TAXI", city: "Tirana / Rinas", phone: "+355 69 999 9300", website: "https://tiataxi.al/", note: "Airport taxi, city, intercity, group transfers" },
  { name: "Albania Airport Transfers", city: "Tirana / Rinas", phone: "+355 69 528 0440", note: "Airport transfers, private transfers" },
  { name: "City Taxi Albania", city: "Tirana", phone: "+355 69 999 9111", note: "City taxi, airport transfer" },
  { name: "Private Transfers Albania", city: "Tirana", phone: "+355 69 629 4254", note: "Private airport and intercity transfers" },
  { name: "Private Driver Attractive Albania", city: "Tirana", phone: "+355 67 567 0015", note: "Chauffeur, VIP, private transfers (Albania & region)" },
  { name: "Albania VIP Transfer", city: "Tirana / Rinas", note: "VIP airport and private transfers" },
  { name: "Green Taxi", city: "Tirana", phone: "+355 800 2000", website: "https://greentaxi.al/", note: "Taxi, airport, city transfers" },
  { name: "Private Driver Albania", city: "Tirana", phone: "+355 67 207 7780", note: "Private driver, airport, intercity" },
  { name: "Zetta Transfers and Travel Albania", city: "Tirana", phone: "+355 67 688 1655", note: "Airport transfer, chauffeur, travel transport" },
  { name: "International Airport Shuttle", city: "Tirana / Rinas", phone: "+355 67 201 3434", note: "Airport shuttle, transfers" },
  { name: "Check Taxi Tirana", city: "Tirana", phone: "+355 68 555 5501", note: "Taxi, city and airport" },
  { name: "Transfer Private South Albania", city: "Rinas / South Albania", phone: "+355 68 956 7113", note: "Private transfers, airport, Riviera" },
  { name: "EM Albania Transfer", city: "Tirana / Rinas", phone: "+355 69 629 4254", note: "Airport and private transfers" },
  { name: "Taxi Lux", city: "Tirana", phone: "+355 4 833 3333", note: "Taxi, airport, city, premium" },
  { name: "Albanian VIP Transport 24H", city: "Rinas / Tirana", phone: "+355 69 293 9678", note: "VIP, airport, chauffeur" },
  { name: "Tirana Airport Transfers", city: "Tirana", phone: "+355 4 223 3997", note: "Airport transfer, private transport" },
  { name: "Eco Taxi Albania", city: "Tirana", phone: "+355 69 433 3111", note: "Taxi, airport, city" },
  { name: "Chauffeur Service Albania - CSA", city: "Tirana", phone: "+355 68 202 1574", note: "Chauffeur, VIP, corporate transfers" },
  { name: "AlbShuttle - Day Trips and Transport", city: "Golem / Durrës", phone: "+355 68 333 0064", note: "Shuttle, airport, day trips, transfers" },
  { name: "BEE TAXI Tirana Albania", city: "Tirana", phone: "+355 800 8080", note: "Taxi, airport, city" },
  { name: "REKO Taxi", city: "Tirana", website: "https://www.reko.al/", note: "Taxi, airport, Riviera, executive transport" },
  { name: "TIRAVA Taxi Transfers", city: "Tirana", website: "https://tirava.app/", note: "Pre-booked taxi, chauffeur, fixed-fare airport transfers" },
  { name: "KadTaxi", city: "Tirana / Rinas", phone: "+355 69 652 0007", website: "https://kadtaxi.al/airport", note: "Airport taxi, private transfers, meet & greet" },
  { name: "Tirana Airport Transfer / ATHS", city: "Tirana / Rinas", website: "https://www.tiranaairporttransfer.com/", note: "Private taxi, van, airport transfers" },
];

export const CATEGORIES: Category[] = [
  {
    id: "rent-car",
    name: { sq: "Makina me qira", en: "Car rental" },
    match: /\b(cars?|makin|auto)\b.*\b(rent|rental|qira|qera)\b|\b(rent|rental|qira)\b.*\b(cars?|makin|auto)\b|araç kirala|araba kirala|kiralık ara|noleggio auto|noleggiare un.?auto|autonoleggio|تأجير سيار|استئجار سيار/i,
    companies: [...CAR_RENTAL_COMPANIES],
  },
  {
    id: "rent-home",
    name: { sq: "Shtëpi & apartamente me qira", en: "Homes & apartments for rent" },
    match: /\b(home|house|apartment|apartament|sht[ëe]pi|banes)\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(home|house|apartment|apartament|sht[ëe]pi)\b|kiralık ev|kiralık daire|affitto casa|affittare una casa|casa in affitto|استئجار منزل|إيجار منزل|استئجار شقة/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "rent-villa",
    name: { sq: "Vila me qira", en: "Villas for rent" },
    match: /\b(villa|vil[ëe])\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(villa|vil[ëe])\b|kiralık villa|affitto villa|villa in affitto|استئجار فيلا/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "rent-land",
    name: { sq: "Tokë me qira", en: "Land for rent" },
    match: /\b(land|tok[ëe])\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(land|tok[ëe])\b/i,
    companies: [edisonLami],
  },
  {
    id: "rent-helicopter",
    name: { sq: "Helikopter me qira", en: "Helicopter charter" },
    match: /\b(helicopter|helikopter|heliski|heli)\b|elicottero|هليكوبتر|مروحية/i,
    companies: [
      {
        name: "VIVA Helicopters",
        city: "Tiranë",
        phone: "+355 69 202 0002",
        email: "fly@vivahelicopters.com",
        website: "https://www.vivahelicopters.com/",
        note: {
          sq: "Fluturime turistike, VIP, heliski, foto/filmim, shërbime ajrore",
          en: "Flightseeing, VIP, heliski, photo/film and air services",
        },
      },
    ],
  },
  {
    id: "boat-yacht",
    name: { sq: "Tura me varkë & jaht", en: "Boat & yacht tours" },
    match: /\b(boat|yacht|cruise|speedboat|catamaran|water ?taxi|sail)\b|varkë|varka|lundrim|jaht|anije|tekne|barca|barche|crociera|قارب|يخت|قوارب/i,
    companies: [...BOAT_YACHT_COMPANIES],
  },
  {
    id: "taxi-transfers",
    name: { sq: "Taksi & transferta", en: "Taxi & transfers" },
    match: /\b(taxi|transfer|transfers|shuttle|chauffeur)\b|taksi|transfert|aeroport|navetta|trasferiment|تاكسي|سيارة أجرة|نقل/i,
    companies: [...TAXI_COMPANIES],
  },
  {
    id: "buy-property",
    name: { sq: "Blerje pronash", en: "Buy property" },
    match: /\b(buy|blej|bli)\b.*\b(property|pron[ëe]|apartment|apartament|villa|vil[ëe]|land|tok[ëe]|house|sht[ëe]pi)\b|\breal estate\b|\bpatundsh|mülk satın al|ev satın al|emlak|gayrimenkul|comprare casa|acquistare casa|immobiliare|شراء عقار|شراء منزل|عقارات/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "tour-guides",
    name: { sq: "Guida turistike", en: "Tour guides" },
    match: /\b(tour guide|tour guides|guided tour|guida|guid[ëe]|udh[ëe]rr[ëe]fyes|sightseeing|tura turistike|ekskursion|komani|shala)\b|tur rehber|gezi rehber|guida turistica|دليل سياحي|مرشد سياحي|جولة سياحية/i,
    companies: [
      {
        name: "Komani Guide",
        city: "Koman, Vau i Dejës",
        phone: "+355 68 386 2527",
        email: "komaniguide1@gmail.com",
        website: "https://komaniguide.com/",
        note: {
          sq: "Tura me varkë në Liqenin e Komanit, Lumi i Shalës, Alpet Shqiptare",
          en: "Komani Lake boat tours, Shala River, Albanian Alps",
        },
      },
      {
        name: "Albanian Tour Guide",
        city: "Durrës / Tiranë",
        phone: "+355 69 794 1693",
        email: "albaniantourguide8@gmail.com",
        website: "https://albaniantourguide.com/",
        note: {
          sq: "Tura me guidë në të gjithë Shqipërinë, ekskursione ditore",
          en: "Guided tours across Albania, day trips",
        },
      },
      ...TOUR_COMPANIES,
    ],
  },
  {
    id: "lawyer",
    name: { sq: "Avokatë & shërbime ligjore", en: "Lawyers & legal services" },
    match: /\b(lawyers?|attorneys?|legal|law firm|avokat|jurist|juridik|ligjor|noter|kontrat)\b|avukat|avvocato|legale|محامي|محاماة|قانوني/i,
    companies: [
      {
        name: "Av. Anxhela Lami",
        city: "Shqipëri",
        phone: "+355 68 806 5055",
        featured: true,
        note: {
          sq: "Avokate — shërbime ligjore, kontrata, prona, biznes",
          en: "Lawyer — legal services, contracts, property, business",
        },
      },
      ...LAW_FIRMS,
    ],
  },
  {
    id: "invest",
    name: { sq: "Investime në Shqipëri", en: "Invest in Albania" },
    match: /\b(invest|investo|investim|investment)\b|yatırım|investire|investimento|استثمار/i,
    companies: [],
  },
  {
    id: "investment-centers",
    name: { sq: "Qendra investimi", en: "Investment centers" },
    match: /\b(investment center|qendr[ae] (e|të) investim)\b/i,
    companies: [],
  },
  {
    id: "business",
    name: { sq: "Biznese shqiptare", en: "Albanian businesses" },
    match: /\b(business|biznes|compan|kompani)\b|işletme|şirket|aziend|impresa|شركات|أعمال/i,
    companies: [],
  },
];

/** First category whose pattern matches the query (with companies to show). */
export function matchCategory(query: string): Category | null {
  for (const c of CATEGORIES) {
    if (c.match.test(query)) return c;
  }
  return null;
}

export function companyNote(c: Company, lang: Lang): string | undefined {
  if (!c.note) return undefined;
  return typeof c.note === "string" ? c.note : localize(c.note, lang);
}

export type Featured = { company: Company; category: string; query: string };

/** A curated set of real listed businesses to showcase on the home page. */
export function getFeatured(lang: Lang, limit = 6): Featured[] {
  const order = ["buy-property", "rent-car", "rent-helicopter", "tour-guides", "lawyer"];
  const seen = new Set<string>();
  const out: Featured[] = [];
  for (const id of order) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) continue;
    for (const company of cat.companies) {
      if (seen.has(company.name)) continue;
      seen.add(company.name);
      out.push({
        company,
        category: localize(cat.name, lang),
        query: localize(cat.name, lang),
      });
      if (out.length >= limit) return out;
    }
  }
  return out;
}
