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
      id: "california",
      name: "California",
      description: "Uramaki clasic pe bandă",
      tag: "Train",
    },
    {
      id: "filadelfia",
      name: "Filadelfia",
      description: "Somon, cremă de brânză și castravete",
      tag: "Train",
    },
    {
      id: "maki-salmon",
      name: "Maki somon",
      description: "Maki cu somon, nori la exterior",
      tag: "Train",
    },
    {
      id: "maki-tuna",
      name: "Maki ton",
      description: "Maki cu ton, nori la exterior",
      tag: "Train",
    },
    {
      id: "maki-shrimp",
      name: "Maki creveți",
      description: "Maki cu creveți, nori la exterior",
      tag: "Train",
    },
    {
      id: "maki-avocado",
      name: "Maki avocado",
      description: "Maki cu avocado, nori la exterior",
      tag: "Train",
    },
    {
      id: "maki-cucumber",
      name: "Maki castravete",
      description: "Maki cu castravete, nori la exterior",
      tag: "Train",
    },
    {
      id: "vegetarian",
      name: "Vegetariene",
      description: "Role vegetariene pe bandă",
      tag: "Train",
    },
    {
      id: "salmon-cover",
      name: "Somon cover",
      description: "Roll acoperit cu somon",
      tag: "Train",
    },
    {
      id: "mango-cover",
      name: "Mango cover",
      description: "Roll acoperit cu mango",
      tag: "Train",
    },
    {
      id: "tobiko-cover",
      name: "Tobiko cover",
      description: "Roll acoperit cu tobiko",
      tag: "Train",
    },
    {
      id: "eel-nigiri",
      name: "Eel Nigiri",
      description: "Anghilă pe orez sushimeshi",
      tag: "Train",
    },
    {
      id: "salmon-nigiri",
      name: "Somon Nigiri",
      description: "Somon proaspăt pe orez sushimeshi",
      tag: "Train",
    },
    {
      id: "tuna-nigiri",
      name: "Ton Nigiri",
      description: "Ton pe orez sushimeshi",
      tag: "Train",
    },
    {
      id: "shrimp-nigiri",
      name: "Creveți Nigiri",
      description: "Creveți pe orez sushimeshi",
      tag: "Train",
    },
    {
      id: "espada-nigiri",
      name: "Ispada Nigiri",
      description: "Pește-spadă pe orez sushimeshi",
      tag: "Train",
    },
    {
      id: "salmon-california",
      name: "Somon California",
      description: "California cu somon",
      tag: "Train",
    },
    {
      id: "tuna-california",
      name: "Ton California",
      description: "California cu ton",
      tag: "Train",
    },
    {
      id: "sushi-tempura",
      name: "Sushi tempura",
      description: "Sushi crocant în tempura",
      tag: "Train",
    },
    {
      id: "maki-surimi",
      name: "Maki surimi",
      description: "Maki cu surimi, nori la exterior",
      tag: "Train",
    },
    {
      id: "masago-cover",
      name: "Masago cover",
      description: "Roll acoperit cu masago",
      tag: "Train",
    },
    {
      id: "hosso-hot-roll",
      name: "Hosso hot roll",
      description: "Hot roll pe bandă",
      tag: "Train",
    },
  ],
};

/** Singurul meniu de mâncare separat de AYCE */
export const comboMenu: MenuCategory = {
  id: "combo",
  title: "Alege-ți combo-ul",
  subtitle: "Doar la pachet · garnitură la alegere + fel principal · ~550 g",
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

/** Meniu băuturi — prețuri din meniul digital Mishi */
export const drinksMenu: MenuCategory = {
  id: "bauturi",
  title: "Băuturi",
  subtitle: "Neincluse în all you can eat",
  items: [
    {
      id: "suc-pere",
      name: "Suc din pere",
      description: "ksf · 500 ml",
      price: "20",
      tag: "Asiatice",
    },
    {
      id: "suc-prune",
      name: "Suc din prune",
      description: "ksf · 500 ml",
      price: "20",
      tag: "Asiatice",
    },
    {
      id: "ceai-negru",
      name: "Ceai negru",
      description: "ksf · 500 ml",
      price: "20",
      tag: "Asiatice",
    },
    {
      id: "ceai-iasomie",
      name: "Ceai de iasomie",
      description: "ksf · 500 ml",
      price: "20",
      tag: "Asiatice",
    },
    {
      id: "suc-pomelo",
      name: "Suc de pomelo",
      description: "Băutură asiatică",
      price: "20",
      tag: "Asiatice",
    },
    {
      id: "okf-aloe",
      name: "OKF Korea Aloe Vera / Strawberry / Lemon",
      description: "350 ml",
      price: "17",
      tag: "Asiatice",
    },
    {
      id: "okf-grape",
      name: "OKF Korea Grape / Watermelon / Melon",
      description: "350 ml",
      price: "17",
      tag: "Asiatice",
    },
    {
      id: "ceai-plante",
      name: "Ceai de plante JDB China",
      description: "310 ml",
      price: "17",
      tag: "Asiatice",
    },
    {
      id: "lapte-cocos",
      name: "Lapte de cocos China Hainan",
      description: "245 ml",
      price: "18",
      tag: "Asiatice",
    },
    {
      id: "mogu-mogu",
      name: "Korea Mogu Mogu",
      description: "320 ml",
      price: "18",
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
      price: "20",
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
      price: "21",
      tag: "Bere",
    },
    {
      id: "ciuc",
      name: "Ciuc / Radler",
      description: "5.9% · 330 ml",
      price: "16",
      tag: "Bere",
    },
    {
      id: "strongbow",
      name: "Strongbow",
      description: "4.5% · 330 ml",
      price: "21",
      tag: "Bere",
    },
    {
      id: "vin-rosu",
      name: "Vin roșu",
      description: "12% · 187 ml",
      price: "25",
      tag: "Vin",
    },
    {
      id: "asahi",
      name: "Asahi",
      description: "Bere japoneză 5.2% · 330 ml",
      price: "21",
      tag: "Bere",
    },
    {
      id: "sake",
      name: "Sake japonez (Chamisul)",
      description: "17.2% · 330 ml",
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
