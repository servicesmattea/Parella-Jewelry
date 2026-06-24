import { stones } from "./stones";

export type Bracelet = {
  id: string;
  name: string;
  price: number;
  description: string;
  story: string;
  /** Photos réelles du bracelet, /public/bracelets/*.jpg, dans l'ordre d'affichage. */
  images: string[];
  /** Une ou plusieurs matières (voir src/data/stones.ts) composant le bracelet. */
  stoneIds: string[];
  beadCount: number;
  badge?: string;
  /** Point de vigilance spécifique à la composition de ce bracelet (en plus de ceux des matières). */
  caution?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: "ambre",
    name: "Ambre",
    price: 25,
    description: "Cornaline & nacre blanche",
    story:
      "Ambre associe les tons orangés chauds de la cornaline aux éclats blancs de la nacre, pour un bracelet lumineux porté seul ou en accumulation.",
    images: ["/bracelets/ambre-1.jpg"],
    stoneIds: ["carnelian", "mother-of-pearl"],
    beadCount: 44,
    badge: "Best-seller",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    price: 25,
    description: "Jaspe rouge & nacre blanche",
    story:
      "Terracotta joue sur le contraste entre le rouge brique mat du jaspe et le blanc nacré, pour un bracelet de caractère aux teintes terreuses.",
    images: ["/bracelets/terracotta-1.jpg"],
    stoneIds: ["red-jasper", "mother-of-pearl"],
    beadCount: 42,
  },
  {
    id: "grenadine",
    name: "Grenadine",
    price: 22,
    description: "Chips rouge vif & nacre blanche",
    story:
      "Grenadine mise sur un rouge éclatant et graphique posé sur fond de nacre blanche, pour une pièce fantaisie pleine de peps.",
    images: ["/bracelets/grenadine-1.jpg"],
    stoneIds: ["dyed-coral-imitation", "mother-of-pearl"],
    beadCount: 46,
    caution:
      "Bracelet présenté en perle décorative : les chips rouges ne sont pas du corail naturel (espèce protégée), probablement du corail de bambou teinté.",
  },
  {
    id: "eclipse",
    name: "Eclipse",
    price: 28,
    description: "Onyx noir, quartz rose & perle œil protecteur",
    story:
      "Eclipse marie la profondeur de l'onyx noir à la douceur du quartz rose, rythmée par une perle œil protecteur en verre — un bracelet à la fois doux et affirmé.",
    images: ["/bracelets/eclipse-1.jpg"],
    stoneIds: ["black-onyx", "rose-quartz", "evil-eye-bead"],
    beadCount: 38,
    badge: "Édition limitée",
  },
  {
    id: "mirage",
    name: "Mirage",
    price: 26,
    description: "Labradorite aux tons gris et dorés",
    story:
      "Mirage révèle toute la palette naturelle de la labradorite, du gris orageux aux reflets dorés, pour un bracelet changeant selon la lumière.",
    images: ["/bracelets/mirage-1.jpg"],
    stoneIds: ["labradorite"],
    beadCount: 40,
    caution:
      "Certaines chips dorées de ce bracelet pourraient être une autre matière mêlée à la labradorite : composition à reconfirmer avant publication finale.",
  },
  {
    id: "domino",
    name: "Domino",
    price: 24,
    description: "Nacre noire & nacre blanche",
    story:
      "Domino joue le contraste graphique noir et blanc avec deux teintes de nacre alternées, pour un bracelet sobre et intemporel.",
    images: ["/bracelets/domino-1.jpg"],
    stoneIds: ["mother-of-pearl"],
    beadCount: 45,
    caution:
      "La nacre noire est très probablement teintée : à présenter comme « nacre teintée » plutôt que « nacre noire naturelle ».",
  },
  {
    id: "aurore",
    name: "Aurore",
    price: 27,
    description: "Fluorite multicolore",
    story:
      "Aurore capture les dégradés naturels de la fluorite, entre violet profond, vert d'eau et touches dorées, pour un bracelet doux et lumineux.",
    images: ["/bracelets/aurore-1.jpg"],
    stoneIds: ["fluorite"],
    beadCount: 41,
  },
  {
    id: "confetti",
    name: "Confetti",
    price: 20,
    description: "Perles décoratives multicolores",
    story:
      "Confetti assemble des perles décoratives translucides aux couleurs acidulées, pour un bracelet fantaisie et joyeux, à porter sans modération.",
    images: ["/bracelets/confetti-1.jpg"],
    stoneIds: ["multicolor-chips"],
    beadCount: 48,
  },
  {
    id: "bouquet",
    name: "Bouquet",
    price: 29,
    description: "Mélange pastel : quartz rose, aventurine, améthyste, cornaline & nacre",
    story:
      "Bouquet rassemble en un seul bracelet plusieurs matières aux teintes pastel — quartz rose, aventurine verte, améthyste, cornaline et nacre — pour une pièce délicate et richement colorée.",
    images: ["/bracelets/bouquet-1.jpg", "/bracelets/bouquet-2.jpg"],
    stoneIds: ["rose-quartz", "green-aventurine", "amethyst", "carnelian", "clear-quartz", "mother-of-pearl"],
    beadCount: 47,
    badge: "Nouveau",
  },
  {
    id: "mousse",
    name: "Mousse",
    price: 25,
    description: "Aventurine verte",
    story:
      "Mousse enfile l'aventurine verte dans toute la douceur de ses reflets scintillants, pour un bracelet apaisant aux tons naturels.",
    images: ["/bracelets/mousse-1.jpg", "/bracelets/mousse-2.jpg"],
    stoneIds: ["green-aventurine"],
    beadCount: 43,
  },
  {
    id: "miel",
    name: "Miel",
    price: 25,
    description: "Citrine / quartz jaune",
    story:
      "Miel capture la lumière dorée de la citrine, pierre solaire associée à la joie et à la confiance depuis l'Antiquité.",
    images: ["/bracelets/miel-1.jpg", "/bracelets/miel-2.jpg"],
    stoneIds: ["citrine"],
    beadCount: 44,
  },
  {
    id: "crepuscule",
    name: "Crépuscule",
    price: 25,
    description: "Améthyste",
    story:
      "Crépuscule réunit de larges chips d'améthyste aux nuances violettes profondes, pour un bracelet à la présence affirmée.",
    images: ["/bracelets/crepuscule-1.jpg", "/bracelets/crepuscule-2.jpg"],
    stoneIds: ["amethyst"],
    beadCount: 26,
  },
  {
    id: "glacier",
    name: "Glacier",
    price: 26,
    description: "Quartz clair / cristal de roche",
    story:
      "Glacier enfile le cristal de roche dans toute sa transparence, pierre de clarté et de pureté qui amplifie la lumière naturelle.",
    images: [
      "/bracelets/glacier-1.jpg",
      "/bracelets/glacier-2.jpg",
      "/bracelets/glacier-3.jpg",
      "/bracelets/glacier-4.jpg",
      "/bracelets/glacier-5.jpg",
    ],
    stoneIds: ["clear-quartz"],
    beadCount: 39,
  },
];

export function getBraceletById(id: string) {
  return bracelets.find((b) => b.id === id);
}

export function getBraceletStones(bracelet: Bracelet) {
  return bracelet.stoneIds
    .map((id) => stones.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

export function getBraceletStoneHex(bracelet: Bracelet) {
  return getBraceletStones(bracelet)[0]?.hex ?? "#CCCCCC";
}
