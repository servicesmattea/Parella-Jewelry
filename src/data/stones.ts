export type Stone = {
  id: string;
  name: string;
  color: string;
  hex: string;
  meaning: string;
  benefits: string[];
  zodiac?: string;
};

export const stones: Stone[] = [
  {
    id: "amethyst",
    name: "Améthyste",
    color: "Violet profond",
    hex: "#8E6BBF",
    meaning:
      "Pierre de sagesse et de sérénité, l'améthyste apaise l'esprit et favorise la clarté intérieure depuis l'Antiquité.",
    benefits: [
      "Favorise le calme et la relaxation",
      "Aide à lâcher prise sur le stress",
      "Stimule l'intuition",
    ],
    zodiac: "Sagittaire, Verseau",
  },
  {
    id: "rose-quartz",
    name: "Quartz Rose",
    color: "Rose tendre",
    hex: "#E7B9C4",
    meaning:
      "Symbole universel de l'amour inconditionnel, le quartz rose ouvre le cœur à la tendresse envers soi et les autres.",
    benefits: [
      "Apaise les émotions",
      "Encourage l'amour de soi",
      "Favorise les relations harmonieuses",
    ],
    zodiac: "Taureau, Balance",
  },
  {
    id: "tiger-eye",
    name: "Œil de Tigre",
    color: "Brun doré",
    hex: "#B6792A",
    meaning:
      "Pierre d'ancrage et de courage, l'œil de tigre aide à passer à l'action avec confiance et détermination.",
    benefits: [
      "Renforce la confiance en soi",
      "Stimule la motivation",
      "Apporte protection et ancrage",
    ],
    zodiac: "Lion, Capricorne",
  },
  {
    id: "lapis-lazuli",
    name: "Lapis-Lazuli",
    color: "Bleu intense",
    hex: "#2A4B9B",
    meaning:
      "Pierre de vérité et de communication, le lapis-lazuli était porté par les pharaons pour sa connexion à la sagesse divine.",
    benefits: [
      "Favorise l'expression de soi",
      "Stimule la créativité",
      "Apporte clarté d'esprit",
    ],
    zodiac: "Sagittaire",
  },
  {
    id: "moonstone",
    name: "Pierre de Lune",
    color: "Blanc opalin",
    hex: "#E7E5DC",
    meaning:
      "Liée aux cycles lunaires, la pierre de lune accompagne l'intuition féminine et les nouveaux départs.",
    benefits: [
      "Équilibre les émotions",
      "Favorise l'intuition",
      "Accompagne les transitions de vie",
    ],
    zodiac: "Cancer, Balance",
  },
  {
    id: "citrine",
    name: "Citrine",
    color: "Jaune doré",
    hex: "#E2B33C",
    meaning:
      "Pierre du soleil et de l'abondance, la citrine attire la joie, la réussite et l'énergie positive.",
    benefits: [
      "Stimule l'optimisme",
      "Favorise la réussite",
      "Dynamise et réchauffe l'humeur",
    ],
    zodiac: "Gémeaux, Lion",
  },
  {
    id: "labradorite",
    name: "Labradorite",
    color: "Gris bleuté irisé",
    hex: "#5A6B73",
    meaning:
      "Pierre de transformation, la labradorite révèle ses reflets mystérieux et protège l'énergie de celui qui la porte.",
    benefits: [
      "Renforce l'intuition",
      "Protège des énergies négatives",
      "Accompagne le changement",
    ],
    zodiac: "Scorpion, Poissons",
  },
  {
    id: "onyx",
    name: "Onyx Noir",
    color: "Noir profond",
    hex: "#1B1B1D",
    meaning:
      "Pierre de protection par excellence, l'onyx noir absorbe les énergies négatives et renforce la force intérieure.",
    benefits: [
      "Apporte protection",
      "Renforce la force mentale",
      "Favorise la stabilité",
    ],
    zodiac: "Capricorne, Lion",
  },
  {
    id: "turquoise",
    name: "Turquoise",
    color: "Bleu-vert",
    hex: "#2FA0A0",
    meaning:
      "Pierre sacrée de nombreuses civilisations, la turquoise est un talisman de protection et de voyage.",
    benefits: [
      "Protège durant les voyages",
      "Favorise la communication sincère",
      "Apaise l'anxiété",
    ],
    zodiac: "Sagittaire, Poissons",
  },
  {
    id: "garnet",
    name: "Grenat",
    color: "Rouge profond",
    hex: "#7A1F2B",
    meaning:
      "Pierre de vitalité et de passion, le grenat stimule l'énergie vitale et la confiance en l'avenir.",
    benefits: [
      "Booste l'énergie et la vitalité",
      "Stimule la passion",
      "Renforce la détermination",
    ],
    zodiac: "Bélier, Scorpion",
  },
];
