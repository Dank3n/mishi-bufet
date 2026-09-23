export type VibeTheme = "interior" | "belt" | "bufet" | "terasa";

export type VibeShot = {
  id: string;
  theme: VibeTheme;
  title: string;
  caption: string;
  accent: string;
  kanji: string;
  src: string;
  /** Prefer wide tile in gallery layouts */
  wide?: boolean;
  /** Show first in the mixed “one of each theme” row */
  featured?: boolean;
};

/**
 * Look mapping (original send order):
 * 02 → terasă, 03 & 05 → interior, 06 → bufet
 *
 * Order: 4 featured (interior, bandă, bufet, terasă), then rest grouped by theme.
 */
export const vibeShots: VibeShot[] = [
  // —— Featured: one of each theme ——
  {
    id: "interior-02",
    theme: "interior",
    title: "Interior",
    caption: "Counter MISHI, mese și sala cu banda rulantă.",
    accent: "#ff1e1e",
    kanji: "内",
    src: "/images/vibe/interior-02.jpg",
    featured: true,
    wide: true,
  },
  {
    id: "interior-07",
    theme: "belt",
    title: "Bandă de sushi",
    caption: "Plăci pe conveyor, scaune roșii, ritmul benzii.",
    accent: "#4ecdc4",
    kanji: "帯",
    src: "/images/vibe/interior-07.jpg",
    featured: true,
  },
  {
    id: "bufet-01",
    theme: "bufet",
    title: "Bufet",
    caption: "Linia de bufet cald cu preparate asiatice.",
    accent: "#ff1e1e",
    kanji: "食",
    src: "/images/vibe/bufet-01.jpg",
    featured: true,
  },
  {
    id: "terasa-01",
    theme: "terasa",
    title: "Terasă",
    caption: "Locuri în aer liber, mese de lemn.",
    accent: "#c4a574",
    kanji: "庭",
    src: "/images/vibe/terasa-01.jpg",
    featured: true,
    wide: true,
  },

  // —— Rest: Interior (incl. look 05) ——
  {
    id: "interior-05",
    theme: "interior",
    title: "Interior",
    caption: "Sala cu bandă și scaune roșii.",
    accent: "#ff1e1e",
    kanji: "席",
    src: "/images/vibe/interior-05.jpg",
  },
  {
    id: "interior-01",
    theme: "interior",
    title: "Interior",
    caption: "Banda, mese din lemn și atmosfera Mishi.",
    accent: "#ff1e1e",
    kanji: "室",
    src: "/images/vibe/interior-01.jpg",
  },
  {
    id: "interior-03",
    theme: "interior",
    title: "Interior",
    caption: "Vederea asupra sălii — bandă și bufet.",
    accent: "#4ecdc4",
    kanji: "間",
    src: "/images/vibe/interior-03.jpg",
  },
  {
    id: "interior-06",
    theme: "interior",
    title: "Interior",
    caption: "Circuitul: bandă, mese și bufet într-un cadru.",
    accent: "#4ecdc4",
    kanji: "店",
    src: "/images/vibe/interior-06.jpg",
    wide: true,
  },
  {
    id: "interior-08",
    theme: "interior",
    title: "Interior",
    caption: "Counter MISHI și deschiderea spre mall.",
    accent: "#ff1e1e",
    kanji: "内",
    src: "/images/vibe/interior-08.jpg",
  },

  // —— Rest: Bandă de sushi ——
  {
    id: "interior-09",
    theme: "belt",
    title: "Bandă de sushi",
    caption: "Perspectivă de pe bandă — oaspeți și farfurii.",
    accent: "#4ecdc4",
    kanji: "流",
    src: "/images/vibe/interior-09.jpg",
  },

  // —— Rest: Bufet ——
  {
    id: "bufet-02",
    theme: "bufet",
    title: "Bufet",
    caption: "Self-service pe toată lungimea — all you can eat.",
    accent: "#ff1e1e",
    kanji: "温",
    src: "/images/vibe/bufet-02.jpg",
  },
  {
    id: "bufet-03",
    theme: "bufet",
    title: "Bufet",
    caption: "Tăvi cu preparate — alegi ce vrei.",
    accent: "#ff1e1e",
    kanji: "品",
    src: "/images/vibe/bufet-03.jpg",
    wide: true,
  },
  {
    id: "bufet-04",
    theme: "bufet",
    title: "Bufet",
    caption: "Counter alb, farfurii la îndemână, logo pe perete.",
    accent: "#ff1e1e",
    kanji: "台",
    src: "/images/vibe/bufet-04.jpg",
  },
  {
    id: "bufet-05",
    theme: "bufet",
    title: "Bufet",
    caption: "Linia de bufet, logo Mishi și lumină caldă pe mâncare.",
    accent: "#ff1e1e",
    kanji: "盛",
    src: "/images/vibe/bufet-05.jpg",
  },

  // —— Rest: Terasă ——
  {
    id: "terasa-02",
    theme: "terasa",
    title: "Terasă",
    caption: "Mese și scaune sub copertină.",
    accent: "#c4a574",
    kanji: "外",
    src: "/images/vibe/terasa-02.jpg",
  },
];

export const vibeThemeOrder: VibeTheme[] = [
  "interior",
  "belt",
  "bufet",
  "terasa",
];

export function vibeFeatured(): VibeShot[] {
  return vibeShots.filter((s) => s.featured);
}

export function vibeByTheme(theme: VibeTheme): VibeShot[] {
  return vibeShots.filter((s) => s.theme === theme && !s.featured);
}

/** All shots for a theme (featured first), for section layouts */
export function vibeGrouped(): { theme: VibeTheme; shots: VibeShot[] }[] {
  return vibeThemeOrder.map((theme) => ({
    theme,
    shots: [
      ...vibeShots.filter((s) => s.theme === theme && s.featured),
      ...vibeShots.filter((s) => s.theme === theme && !s.featured),
    ],
  }));
}
