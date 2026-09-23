export type AtmosferaShot = {
  id: string;
  src: string;
  alt: string;
  labelKey: "interior" | "belt" | "bufet" | "terasa";
};

/** Featured mix: interior · bandă · bufet · terasă (look 03, belt, look 06, look 02) */
export const atmosferaShots: AtmosferaShot[] = [
  {
    id: "interior",
    src: "/images/atmosfera/interior.jpg",
    alt: "Interior Mishi Bufet — counter MISHI, mese și sala",
    labelKey: "interior",
  },
  {
    id: "belt",
    src: "/images/atmosfera/sushi-belt.jpg",
    alt: "Bandă de sushi — scaune roșii și conveyor",
    labelKey: "belt",
  },
  {
    id: "bufet",
    src: "/images/atmosfera/bufet.jpg",
    alt: "Bufet Mishi — linia de bufet cald",
    labelKey: "bufet",
  },
  {
    id: "terasa",
    src: "/images/atmosfera/terasa.jpg",
    alt: "Terasa Mishi Bufet — mese în aer liber",
    labelKey: "terasa",
  },
];
