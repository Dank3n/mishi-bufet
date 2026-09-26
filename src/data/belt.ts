export type BeltPlate = {
  id: string;
  label: string;
  src: string;
};

const img = {
  california: "/images/plates/california-roll.png",
  salmonNigiri: "/images/plates/salmon-nigiri.png",
  tunaNigiri: "/images/plates/tuna-nigiri.png",
  shrimpNigiri: "/images/plates/shrimp-nigiri.png",
  makiSalmon: "/images/plates/maki-salmon.png",
  uramaki: "/images/plates/uramaki-salmon.png",
  boston: "/images/plates/boston-roll.png",
  makiTuna: "/images/plates/maki-tuna.png",
} as const;

/** Produse pe banda rulantă — artă reutilizată din setul de farfurii */
export const beltPlates: BeltPlate[] = [
  { id: "california", label: "California", src: img.california },
  { id: "filadelfia", label: "Filadelfia", src: img.uramaki },
  { id: "maki-salmon", label: "Maki somon", src: img.makiSalmon },
  { id: "maki-tuna", label: "Maki ton", src: img.makiTuna },
  { id: "maki-shrimp", label: "Maki creveți", src: img.boston },
  { id: "maki-avocado", label: "Maki avocado", src: img.makiSalmon },
  { id: "maki-cucumber", label: "Maki castravete", src: img.boston },
  { id: "vegetarian", label: "Vegetariene", src: img.boston },
  { id: "salmon-cover", label: "Somon cover", src: img.uramaki },
  { id: "mango-cover", label: "Mango cover", src: img.boston },
  { id: "tobiko-cover", label: "Tobiko cover", src: img.california },
  { id: "eel-nigiri", label: "Eel Nigiri", src: img.salmonNigiri },
  { id: "salmon-nigiri", label: "Somon Nigiri", src: img.salmonNigiri },
  { id: "tuna-nigiri", label: "Ton Nigiri", src: img.tunaNigiri },
  { id: "shrimp-nigiri", label: "Creveți Nigiri", src: img.shrimpNigiri },
  { id: "espada-nigiri", label: "Ispada Nigiri", src: img.tunaNigiri },
  { id: "salmon-california", label: "Somon California", src: img.california },
  { id: "tuna-california", label: "Ton California", src: img.makiTuna },
  { id: "sushi-tempura", label: "Sushi tempura", src: img.uramaki },
  { id: "maki-surimi", label: "Maki surimi", src: img.boston },
  { id: "masago-cover", label: "Masago cover", src: img.california },
  { id: "hosso-hot-roll", label: "Hosso hot roll", src: img.boston },
];
