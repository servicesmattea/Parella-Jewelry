export type Bracelet = {
  id: string;
  name: string;
  price: number;
  description: string;
  stoneHex: string;
  metal: "Doré" | "Argenté" | "Bicolore";
  badge?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: "aube",
    name: "Aube",
    price: 59,
    description: "Quartz rose & chaîne dorée fine",
    stoneHex: "#E7B9C4",
    metal: "Doré",
    badge: "Best-seller",
  },
  {
    id: "azur",
    name: "Azur",
    price: 64,
    description: "Lapis-lazuli & maille argentée",
    stoneHex: "#2A4B9B",
    metal: "Argenté",
    badge: "Nouveau",
  },
  {
    id: "solstice",
    name: "Solstice",
    price: 69,
    description: "Citrine & fines perles dorées",
    stoneHex: "#E2B33C",
    metal: "Doré",
  },
  {
    id: "ombre",
    name: "Ombre",
    price: 72,
    description: "Onyx noir & détails bicolores",
    stoneHex: "#1B1B1D",
    metal: "Bicolore",
  },
  {
    id: "brume",
    name: "Brume",
    price: 67,
    description: "Labradorite & maille argentée",
    stoneHex: "#5A6B73",
    metal: "Argenté",
    badge: "Édition limitée",
  },
  {
    id: "lagon",
    name: "Lagon",
    price: 61,
    description: "Turquoise & chaîne dorée",
    stoneHex: "#2FA0A0",
    metal: "Doré",
  },
];
