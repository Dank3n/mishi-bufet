export type DetaliuShot = {
  id: string;
  src: string;
  alt: string;
  titleKey: "figurine" | "raft" | "bara" | "logo" | "planta";
};

export const detaliiShots: DetaliuShot[] = [
  {
    id: "figurine-01",
    src: "/images/detalii/figurine-01.jpg",
    alt: "Figurine pe counter — detaliu Mishi",
    titleKey: "figurine",
  },
  {
    id: "raft-figurine",
    src: "/images/detalii/raft-figurine.jpg",
    alt: "Raft iluminat cu figurine",
    titleKey: "raft",
  },
  {
    id: "bara-raft",
    src: "/images/detalii/bara-raft.jpg",
    alt: "Raftul barului — sticle și pahare",
    titleKey: "bara",
  },
  {
    id: "logo-perete",
    src: "/images/detalii/logo-perete.jpg",
    alt: "Logo Mishi pe perete",
    titleKey: "logo",
  },
  {
    id: "planta",
    src: "/images/detalii/planta.jpg",
    alt: "Plantă pe counter lângă bandă",
    titleKey: "planta",
  },
];
