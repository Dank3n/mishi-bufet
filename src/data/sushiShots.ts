export type SushiShot = {
  id: string;
  src: string;
  alt: string;
  titleKey:
    | "nigiri"
    | "uramaki"
    | "platter"
    | "salmon"
    | "roe"
    | "maki"
    | "assortment"
    | "detail";
};

export const sushiShots: SushiShot[] = [
  {
    id: "01",
    src: "/images/sushi/01.jpg",
    alt: "Nigiri pe farfurie — somon și pește",
    titleKey: "nigiri",
  },
  {
    id: "02",
    src: "/images/sushi/02.jpg",
    alt: "Uramaki cu somon și ikura",
    titleKey: "uramaki",
  },
  {
    id: "03",
    src: "/images/sushi/03.jpg",
    alt: "Detaliu sushi pe farfurie",
    titleKey: "detail",
  },
  {
    id: "04",
    src: "/images/sushi/04.jpg",
    alt: "Platou mixt Mishi Bufet",
    titleKey: "platter",
  },
  {
    id: "05",
    src: "/images/sushi/05.jpg",
    alt: "Asortiment sushi pe masă",
    titleKey: "assortment",
  },
  {
    id: "06",
    src: "/images/sushi/06.jpg",
    alt: "Somon și role pe farfurie",
    titleKey: "salmon",
  },
  {
    id: "07",
    src: "/images/sushi/07.jpg",
    alt: "Close-up role și nigiri",
    titleKey: "detail",
  },
  {
    id: "08",
    src: "/images/sushi/08.jpg",
    alt: "Somon fresh pe orez",
    titleKey: "salmon",
  },
  {
    id: "09",
    src: "/images/sushi/09.jpg",
    alt: "Role maki colorate",
    titleKey: "maki",
  },
  {
    id: "10",
    src: "/images/sushi/10.jpg",
    alt: "Platou sushi cu wasabi și ghimbir",
    titleKey: "platter",
  },
  {
    id: "11",
    src: "/images/sushi/11.jpg",
    alt: "Gunkan cu ikura",
    titleKey: "roe",
  },
  {
    id: "12",
    src: "/images/sushi/12.jpg",
    alt: "Detaliu farfurie sushi",
    titleKey: "detail",
  },
  {
    id: "13",
    src: "/images/sushi/13.jpg",
    alt: "Uramaki și nigiri",
    titleKey: "uramaki",
  },
  {
    id: "14",
    src: "/images/sushi/14.jpg",
    alt: "Asortiment pe bandă / farfurie",
    titleKey: "assortment",
  },
];
