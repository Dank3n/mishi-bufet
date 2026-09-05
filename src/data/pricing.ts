export type PricingTier = {
  id: string;
  label: string;
  days: string;
  price: string;
  note: string;
  highlight?: boolean;
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
    days: "Vineri – Duminică & sărbători",
    price: "94,90",
    note: "Același acces nelimitat · preț de weekend / sărbătoare",
    highlight: true,
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
