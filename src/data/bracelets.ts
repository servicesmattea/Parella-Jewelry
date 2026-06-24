export type Bracelet = {
  id: string;
  name: string;
  price: number;
  description: string;
  story: string;
  stoneHex: string;
  stoneId: string;
  beadCount: number;
  badge?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: "aube",
    name: "Aube",
    price: 25,
    description: "Quartz rose & fil élastique transparent",
    story:
      "Aube ouvre la collection avec la douceur du quartz rose, enfilé perle à perle sur un fil élastique transparent qui ne vole jamais la lumière de la pierre.",
    stoneHex: "#E7B9C4",
    stoneId: "rose-quartz",
    beadCount: 48,
    badge: "Best-seller",
  },
  {
    id: "azur",
    name: "Azur",
    price: 25,
    description: "Lapis-lazuli & fil élastique transparent",
    story:
      "Azur s'inspire du bleu profond du lapis-lazuli, porté par les civilisations anciennes comme symbole de vérité et de clarté d'esprit.",
    stoneHex: "#2A4B9B",
    stoneId: "lapis-lazuli",
    beadCount: 46,
    badge: "Nouveau",
  },
  {
    id: "solstice",
    name: "Solstice",
    price: 25,
    description: "Citrine & fil élastique transparent",
    story:
      "Solstice capture l'énergie solaire de la citrine, une pierre associée à l'abondance et à la joie depuis l'Antiquité.",
    stoneHex: "#E2B33C",
    stoneId: "citrine",
    beadCount: 50,
  },
  {
    id: "ombre",
    name: "Ombre",
    price: 25,
    description: "Onyx noir & fil élastique transparent",
    story:
      "Ombre joue la carte du contraste avec un onyx noir profond, pierre de protection et d'ancrage par excellence.",
    stoneHex: "#1B1B1D",
    stoneId: "black-onyx",
    beadCount: 47,
  },
  {
    id: "brume",
    name: "Brume",
    price: 25,
    description: "Labradorite & fil élastique transparent",
    story:
      "Brume révèle les reflets mystérieux de la labradorite, une pierre de transformation que l'on dirait sortie d'un ciel d'orage.",
    stoneHex: "#5A6B73",
    stoneId: "labradorite",
    beadCount: 45,
    badge: "Édition limitée",
  },
  {
    id: "lagon",
    name: "Lagon",
    price: 25,
    description: "Turquoise & fil élastique transparent",
    story:
      "Lagon emprunte sa teinte à la turquoise, pierre sacrée de nombreuses civilisations et talisman de voyage.",
    stoneHex: "#2FA0A0",
    stoneId: "turquoise",
    beadCount: 49,
  },
];

export function getBraceletById(id: string) {
  return bracelets.find((b) => b.id === id);
}
