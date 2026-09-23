export type MenuCloseup = {
  id: string;
  src: string;
  alt: string;
  labelKey: "belt" | "hot" | "salads" | "domes";
};

export const menuCloseups: MenuCloseup[] = [
  {
    id: "belt",
    src: "/images/menu/belt-uramaki.jpg",
    alt: "Uramaki pe banda de sushi",
    labelKey: "belt",
  },
  {
    id: "hot",
    src: "/images/menu/bufet-cald.jpg",
    alt: "Bufet cald — tăvi cu preparate",
    labelKey: "hot",
  },
  {
    id: "salads",
    src: "/images/menu/salate.jpg",
    alt: "Salate și garnituri pe bufet",
    labelKey: "salads",
  },
  {
    id: "domes",
    src: "/images/menu/belt-cupole.jpg",
    alt: "Farfurii sub cupole pe bandă",
    labelKey: "domes",
  },
];
