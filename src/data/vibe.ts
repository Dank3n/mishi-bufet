export type VibeShot = {
  id: string;
  title: string;
  caption: string;
  accent: string;
  kanji: string;
  src: string;
  /** Prefer wide tile in gallery layouts */
  wide?: boolean;
};

export const vibeShots: VibeShot[] = [
  {
    id: "interior",
    title: "Interior",
    caption:
      "Scaune roșii, neon cyan, logo pe perete — atmosfera Mishi lângă Mega Mall.",
    accent: "#ff1e1e",
    kanji: "内",
    src: "/images/vibe/interior.jpg",
    wide: true,
  },
  {
    id: "sushi-train",
    title: "Sushi Train",
    caption:
      "Banda rulantă cu nigiri & maki sub cupole — all you can eat, 100 de minute.",
    accent: "#ff1e1e",
    kanji: "帯",
    src: "/images/vibe/sushi-train.jpg",
  },
  {
    id: "sushi-live",
    title: "Pe bandă",
    caption: "Oaspeți la counter, farfurii colorate, ritmul benzii în timp real.",
    accent: "#4ecdc4",
    kanji: "流",
    src: "/images/vibe/sushi-train-live.png",
  },
  {
    id: "storefront",
    title: "Fațadă",
    caption: "MISHI BUFET · All you can eat — intrarea din Mega Mall.",
    accent: "#ff1e1e",
    kanji: "店",
    src: "/images/vibe/storefront.png",
    wide: true,
  },
  {
    id: "dining",
    title: "Sala de mese",
    caption: "Counter pe bandă, scaune roșii, lumină neon — locul tău pe circuit.",
    accent: "#c4a574",
    kanji: "席",
    src: "/images/vibe/dining-hall.png",
  },
];
