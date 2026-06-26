import { stones } from "./stones";

export type Bracelet = {
  id: string;
  name: string;
  price: number;
  description: string;
  story: string;
  energy: string;
  images: string[];
  stoneIds: string[];
  beadCount: number;
  badge?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: "domino",
    name: "Domino",
    price: 20,
    description: "Nacre noire & nacre blanche",
    story:
      "Domino joue le contraste graphique noir et blanc avec deux teintes de nacre alternées, pour un bracelet sobre et intemporel, à porter seul ou en accumulation.",
    energy: "Élégance · Équilibre · Sérénité",
    images: ["/bracelets/domino-1.jpg"],
    stoneIds: ["mother-of-pearl"],
    beadCount: 45,
  },
  {
    id: "terracotta",
    name: "Terracotta",
    price: 20,
    description: "Jaspe rouge & nacre blanche",
    story:
      "Terracotta associe le rouge brique ancré du jaspe aux éclats blancs de la nacre. Un bracelet de caractère pour celles qui avancent avec détermination.",
    energy: "Ancrage · Confiance · Énergie",
    images: ["/bracelets/terracotta-1.jpg"],
    stoneIds: ["red-jasper", "mother-of-pearl"],
    beadCount: 42,
  },
  {
    id: "grenadine",
    name: "Grenadine",
    price: 20,
    description: "Rouge vif & nacre blanche",
    story:
      "Grenadine mise sur un rouge éclatant et graphique posé sur fond de nacre blanche. Une pièce joyeuse et affirmée, pleine d'élan.",
    energy: "Élan · Joie · Énergie",
    images: ["/bracelets/grenadine-1.jpg"],
    stoneIds: ["dyed-coral-imitation", "mother-of-pearl"],
    beadCount: 46,
  },
  {
    id: "eclipse",
    name: "Éclipse",
    price: 25,
    description: "Onyx noir, quartz rose & œil protecteur",
    story:
      "Éclipse marie la profondeur de l'onyx noir à la douceur du quartz rose, rythmée par une perle œil protecteur. Un bracelet à porter comme un talisman discret.",
    energy: "Protection · Confiance · Équilibre",
    images: ["/bracelets/eclipse-1.jpg", "/bracelets/eclipse-2.jpg"],
    stoneIds: ["black-onyx", "rose-quartz", "evil-eye-bead"],
    beadCount: 38,
    badge: "Édition limitée",
  },
  {
    id: "mirage",
    name: "Mirage",
    price: 20,
    description: "Labradorite aux tons gris et dorés",
    story:
      "Mirage révèle toute la palette naturelle de la labradorite, du gris orageux aux reflets dorés changeants. Un bracelet pour celles qui avancent avec intuition.",
    energy: "Protection · Intuition · Clarté",
    images: ["/bracelets/mirage-1.jpg"],
    stoneIds: ["labradorite"],
    beadCount: 40,
  },
  {
    id: "ambre",
    name: "Ambre",
    price: 20,
    description: "Cornaline & nacre blanche",
    story:
      "Ambre associe les tons orangés chauds de la cornaline aux éclats blancs de la nacre. Un bracelet lumineux pour retrouver de l'élan et de la confiance.",
    energy: "Élan · Confiance · Énergie",
    images: ["/bracelets/ambre-1.jpg"],
    stoneIds: ["carnelian", "mother-of-pearl"],
    beadCount: 44,
    badge: "Best-seller",
  },
  {
    id: "aurore",
    name: "Aurore",
    price: 20,
    description: "Fluorite multicolore",
    story:
      "Aurore capture les dégradés naturels de la fluorite, entre violet profond, vert d'eau et touches dorées. Un bracelet doux et lumineux pour inviter la sérénité.",
    energy: "Sérénité · Équilibre · Clarté",
    images: ["/bracelets/aurore-1.jpg"],
    stoneIds: ["fluorite"],
    beadCount: 41,
  },
  {
    id: "confetti",
    name: "Confetti",
    price: 20,
    description: "Pierres translucides multicolores",
    story:
      "Confetti assemble des pierres translucides aux couleurs acidulées pour une création fantaisie et joyeuse, à porter sans modération.",
    energy: "Joie · Légèreté · Chance",
    images: ["/bracelets/confetti-1.jpg"],
    stoneIds: ["multicolor-chips"],
    beadCount: 48,
  },
  {
    id: "bouquet",
    name: "Bouquet",
    price: 20,
    description: "Mélange pastel de pierres naturelles",
    story:
      "Bouquet rassemble en une seule création quartz rose, aventurine, améthyste, cornaline et nacre. Un bracelet généreux, doux et richement coloré pour inviter l'harmonie.",
    energy: "Harmonie · Douceur · Amour",
    images: ["/bracelets/bouquet-1.jpg", "/bracelets/bouquet-2.jpg"],
    stoneIds: ["rose-quartz", "green-aventurine", "amethyst", "carnelian", "clear-quartz", "mother-of-pearl"],
    beadCount: 47,
    badge: "Nouveau",
  },
  {
    id: "mousse",
    name: "Mousse",
    price: 20,
    description: "Aventurine verte",
    story:
      "Mousse enfile l'aventurine verte dans toute la douceur de ses reflets scintillants. Un bracelet apaisant aux tons naturels pour inviter le renouveau.",
    energy: "Chance · Renouveau · Harmonie",
    images: ["/bracelets/mousse-1.jpg", "/bracelets/mousse-2.jpg"],
    stoneIds: ["green-aventurine"],
    beadCount: 43,
  },
  {
    id: "miel",
    name: "Miel",
    price: 20,
    description: "Citrine / quartz doré",
    story:
      "Miel capture la lumière dorée de la citrine, pierre solaire associée à la joie et à la confiance. Un bracelet rayonnant pour retrouver de l'élan.",
    energy: "Énergie · Joie · Élan",
    images: ["/bracelets/miel-1.jpg", "/bracelets/miel-2.jpg"],
    stoneIds: ["citrine"],
    beadCount: 44,
  },
  {
    id: "crepuscule",
    name: "Crépuscule",
    price: 20,
    description: "Améthyste",
    story:
      "Crépuscule réunit de larges chips d'améthyste aux nuances violettes profondes. Un bracelet à la présence affirmée pour les moments où l'on cherche la sérénité.",
    energy: "Sérénité · Amour · Équilibre",
    images: ["/bracelets/crepuscule-1.jpg", "/bracelets/crepuscule-2.jpg"],
    stoneIds: ["amethyst"],
    beadCount: 26,
  },
  {
    id: "glacier",
    name: "Glacier",
    price: 20,
    description: "Quartz clair / cristal de roche",
    story:
      "Glacier enfile le cristal de roche dans toute sa transparence. Pierre de clarté et de pureté, elle amplifie la lumière et les intentions que l'on y place.",
    energy: "Clarté · Pureté · Énergie",
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
