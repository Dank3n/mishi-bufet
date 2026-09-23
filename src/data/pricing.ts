import { isRomanianLegalHoliday } from "@/data/roLegalHolidays";

export type PricingTier = {
  id: string;
  label: string;
  days: string;
  price: string;
  note: string;
  /** When true, hide the trailing "lei" unit (e.g. Gratis / −35%) */
  hideCurrency?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "weekday",
    label: "All you can eat",
    days: "Luni – Joi",
    price: "89,90",
    note: "Acces nelimitat la bufet & sushi train",
  },
  {
    id: "weekend",
    label: "All you can eat",
    days: "Vineri – Duminică & zile libere",
    price: "94,90",
    note: "Același acces nelimitat · preț de weekend / zi liberă legală",
  },
  {
    id: "kids-free",
    label: "Copii",
    days: "Sub 3 ani",
    price: "Gratis",
    note: "Intrare liberă pentru cei mai mici",
    hideCurrency: true,
  },
  {
    id: "kids-discount",
    label: "Copii",
    days: "Până în 120 cm",
    price: "−35%",
    note: "Discount din prețul zilei (weekday sau weekend)",
    hideCurrency: true,
  },
];

/**
 * Preț weekend AYCE dacă e Vineri–Duminică (Europe/Bucharest)
 * sau zi liberă legală RO (Codul muncii) — nu 8 martie etc.
 */
export function isWeekendPricingDay(now = new Date()): boolean {
  if (isRomanianLegalHoliday(now)) return true;

  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
  }).format(now);
  return weekday === "Fri" || weekday === "Sat" || weekday === "Sun";
}

export const schedule = [
  { day: "Luni – Duminică", hours: "11:30 – 22:00" },
];

export const openHours = {
  open: 11.5, // 11:30
  close: 22, // 22:00
  labelOpen: "11:30",
  labelClose: "22:00",
};

export const location = {
  name: "Mishi Bufet",
  address: "Mega Mall, etajul 2",
  area: "București",
  phone: "031 436 2073",
  phoneHref: "tel:+40314362073",
  email: "hello@mishibufet.ro",
  mapsHint: "Mega Mall · etajul 2 · București",
};
