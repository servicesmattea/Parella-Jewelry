export type Bracelet = {
  id: string;
  name: string;
  price: number;
  description: string;
  stoneHex: string;
  beadCount: number;
  badge?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: "aube",
    name: "Aube",
    price: 59,
    description: "Quartz rose & fil élastique transparent",
    stoneHex: "#E7B9C4",
    beadCount: 48,
    badge: "Best-seller",
  },
  {
    id: "azur",
    name: "Azur",
    price: 64,
    description: "Lapis-lazuli & fil élastique transparent",
    stoneHex: "#2A4B9B",
    beadCount: 46,
    badge: "Nouveau",
  },
  {
    id: "solstice",
    name: "Solstice",
    price: 69,
    description: "Citrine & fil élastique transparent",
    stoneHex: "#E2B33C",
    beadCount: 50,
  },
  {
    id: "ombre",
    name: "Ombre",
    price: 72,
    description: "Onyx noir & fil élastique transparent",
    stoneHex: "#1B1B1D",
    beadCount: 47,
  },
  {
    id: "brume",
    name: "Brume",
    price: 67,
    description: "Labradorite & fil élastique transparent",
    stoneHex: "#5A6B73",
    beadCount: 45,
    badge: "Édition limitée",
  },
  {
    id: "lagon",
    name: "Lagon",
    price: 61,
    description: "Turquoise & fil élastique transparent",
    stoneHex: "#2FA0A0",
    beadCount: 49,
  },
];
