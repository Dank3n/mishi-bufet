export type BeltPlate = {
  id: string;
  label: string;
  src: string;
};

/** Banda rulantă de pe homepage — set vizual dedicat, independent de meniul editorial */
export const beltPlates: BeltPlate[] = [
  {
    id: "california-roll",
    label: "California Roll",
    src: "/images/plates/california-roll.png",
  },
  {
    id: "salmon-nigiri",
    label: "Salmon Nigiri",
    src: "/images/plates/salmon-nigiri.png",
  },
  {
    id: "tuna-nigiri",
    label: "Tuna Nigiri",
    src: "/images/plates/tuna-nigiri.png",
  },
  {
    id: "shrimp-nigiri",
    label: "Shrimp Nigiri",
    src: "/images/plates/shrimp-nigiri.png",
  },
  {
    id: "maki-salmon",
    label: "Maki Salmon",
    src: "/images/plates/maki-salmon.png",
  },
  {
    id: "uramaki-salmon",
    label: "Uramaki Salmon",
    src: "/images/plates/uramaki-salmon.png",
  },
  {
    id: "boston-roll",
    label: "Boston Roll",
    src: "/images/plates/boston-roll.png",
  },
  {
    id: "maki-tuna",
    label: "Maki Tuna",
    src: "/images/plates/maki-tuna.png",
  },
];
