export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

/** All you can eat — doar sushi pe bandă */
export const buffetSushi: MenuCategory = {
  id: "sushi",
  title: "Sushi Train · All you can eat",
  subtitle:
    "Acces nelimitat la bandă — doar sushi · limită 100 minute · băuturile se plătesc separat",
  items: [
    {
      id: "california-roll",
      name: "California Roll",
      description: "Uramaki cu surimi, avocado și icre pe orez",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "salmon-nigiri",
      name: "Salmon Nigiri",
      description: "Somon proaspăt pe orez sushimeshi",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "tuna-nigiri",
      name: "Tuna Nigiri",
      description: "Ton, tăiat fin pe orez",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "shrimp-nigiri",
      name: "Shrimp Nigiri",
      description: "Creveți fierți pe orez sushimeshi",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "maki-salmon",
      name: "Maki Salmon",
      description: "Maki cu somon și avocado, nori la exterior",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "uramaki-salmon",
      name: "Uramaki Salmon",
      description: "Somon, cremă de brânză și castravete, orez la exterior",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "boston-roll",
      name: "Boston Roll",
      description: "Surimi, avocado și icre pe orez",
      tag: "Train",
      price: "în bufet",
    },
    {
      id: "maki-tuna",
      name: "Maki Tuna",
      description: "Maki cu ton, nori la exterior",
      tag: "Train",
      price: "în bufet",
    },
  ],
};

/** Singurul meniu de mâncare separat de AYCE */
export const comboMenu: MenuCategory = {
  id: "combo",
  title: "Alege-ți combo-ul",
  subtitle: "Garnitură la alegere + fel principal · ~550 g",
  items: [
    {
      id: "combo-pui",
      name: "Meniu Pui",
      description: "Orice garnitură + pui stir-fry cu legume",
      price: "33",
      tag: "Combo",
    },
    {
      id: "combo-vita",
      name: "Meniu Vită",
      description: "Orice garnitură + vită în sos, cu legume",
      price: "35",
      tag: "Combo",
    },
    {
      id: "combo-rata",
      name: "Meniu Rață",
      description: "Orice garnitură + rață feliată în sos",
      price: "45",
      tag: "Combo",
    },
    {
      id: "combo-mare",
      name: "Meniu Fructe de mare",
      description: "Orice garnitură + fructe de mare & legume",
      price: "43",
      tag: "Combo",
    },
  ],
};

/** Meniu băuturi — prețuri actualizate (+2 lei vs card, apă neschimbată) */
export const drinksMenu: MenuCategory = {
  id: "bauturi",
  title: "Băuturi",
  subtitle: "Neincluse în all you can eat",
  items: [
    {
      id: "suc-pere",
      name: "Suc din pere",
      description: "500 ml · 冰糖雪梨",
      price: "21",
      tag: "Asiatice",
    },
    {
      id: "suc-prune",
      name: "Suc din prune",
      description: "500 ml · 酸梅汤",
      price: "21",
      tag: "Asiatice",
    },
    {
      id: "ceai-negru",
      name: "Ceai negru",
      description: "500 ml · 冰红茶",
      price: "21",
      tag: "Asiatice",
    },
    {
      id: "ceai-iasomie",
      name: "Ceai de iasomie",
      description: "500 ml · 茉莉花茶",
      price: "21",
      tag: "Asiatice",
    },
    {
      id: "apa",
      name: "Apă plată / Apă minerală",
      description: "500 ml",
      price: "12",
      tag: "Apă",
    },
    {
      id: "racoritoare",
      name: "Coca-Cola / Fanta / Sprite / Schweppes",
      description: "500 ml",
      price: "15",
      tag: "Răcoritoare",
    },
    {
      id: "fuzetea",
      name: "FuzeTea",
      description: "500 ml",
      price: "15",
      tag: "Răcoritoare",
    },
    {
      id: "cappy",
      name: "Cappy",
      description: "330 ml",
      price: "15",
      tag: "Răcoritoare",
    },
    {
      id: "ceai-plante",
      name: "Ceai de plante JDB China",
      description: "310 ml",
      price: "17",
      tag: "Răcoritoare",
    },
    {
      id: "lapte-cocos",
      name: "Lapte de cocos China Hainan",
      description: "245 ml",
      price: "17",
      tag: "Răcoritoare",
    },
    {
      id: "asahi",
      name: "Asahi",
      description: "Bere japoneză 5.2% · 330 ml",
      price: "20",
      tag: "Bere",
    },
    {
      id: "heineken-draft",
      name: "Heineken Draft",
      description: "5.0% · 400 ml",
      price: "20",
      tag: "Bere draft",
    },
    {
      id: "heineken",
      name: "Heineken",
      description: "5.0% · 330 ml",
      price: "21",
      tag: "Bere",
    },
    {
      id: "moretti",
      name: "Birra Moretti",
      description: "4.6% · 330 ml",
      price: "18",
      tag: "Bere",
    },
    {
      id: "desperados",
      name: "Desperados",
      description: "5.9% · 400 ml",
      price: "23",
      tag: "Bere",
    },
    {
      id: "ciuc",
      name: "Ciuc / Radler",
      description: "5.0% · 330 ml",
      price: "16",
      tag: "Bere",
    },
    {
      id: "strongbow",
      name: "Strongbow",
      description: "4.5% · 330 ml",
      price: "21",
      tag: "Cidru",
    },
    {
      id: "vin-recas",
      name: "Vin Recaș",
      description: "12% · 187 ml",
      price: "25",
      tag: "Vin",
    },
    {
      id: "jb",
      name: "J&B",
      description: "40% · 50 ml",
      price: "23",
      tag: "Spirtoase",
    },
    {
      id: "sake",
      name: "Sake japonez (Chamisul)",
      description: "17.2% · 350 ml",
      price: "55",
      tag: "Sake",
    },
  ],
};

export const menuCategories: MenuCategory[] = [
  buffetSushi,
  comboMenu,
  drinksMenu,
];

export const buffetIncludes = [
  "Acces nelimitat la sushi train (nigiri & maki)",
  "Limită 100 de minute la masă",
  "Băuturile nu sunt incluse — vezi meniul de băuturi",
  "Combo-urile (pui, vită, rață, fructe de mare) se comandă separat",
];
