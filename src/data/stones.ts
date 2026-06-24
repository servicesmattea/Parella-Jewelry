export type StoneCategory = "pierre-naturelle" | "matiere-naturelle" | "decorative";
export type Confidence = "haute" | "moyenne" | "faible";

export type Stone = {
  id: string;
  name: string;
  category: StoneCategory;
  confidence: Confidence;
  color: string;
  hex: string;
  meaning: string;
  benefits: string[];
  /** Point de vigilance commercial : à afficher avant publication si la matière n'est pas confirmée. */
  caution?: string;
  /** Pierre prioritaire pour l'image de marque Parella. */
  featured?: boolean;
  zodiac?: string;
};

export const categoryLabels: Record<StoneCategory, string> = {
  "pierre-naturelle": "Pierres naturelles & semi-précieuses",
  "matiere-naturelle": "Matières naturelles",
  decorative: "Perles décoratives & fantaisie",
};

export const stones: Stone[] = [
  {
    id: "rose-quartz",
    name: "Quartz Rose",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Rose poudré",
    hex: "#E7B9C4",
    meaning:
      "Pierre tendre aux nuances poudrées, traditionnellement associée à la douceur, à l'amour et aux liens précieux.",
    benefits: [
      "Douceur et amour de soi",
      "Harmonie dans les relations",
      "Apaisement émotionnel",
    ],
    featured: true,
    zodiac: "Taureau, Balance",
  },
  {
    id: "amethyst",
    name: "Améthyste",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Violet profond",
    hex: "#8E6BBF",
    meaning:
      "Pierre violette profonde, associée depuis l'Antiquité à la sérénité, à la clarté d'esprit et à l'intuition.",
    benefits: [
      "Calme et sérénité",
      "Clarté d'esprit",
      "Stimule l'intuition",
    ],
    featured: true,
    zodiac: "Sagittaire, Verseau",
  },
  {
    id: "carnelian",
    name: "Cornaline",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Orange brûlé",
    hex: "#C1602E",
    meaning:
      "Pierre chaleureuse aux tons orangés, traditionnellement associée à l'énergie, à la créativité et à la vitalité.",
    benefits: [
      "Stimule l'énergie et la vitalité",
      "Favorise la créativité",
      "Redonne de l'élan",
    ],
    featured: true,
  },
  {
    id: "red-jasper",
    name: "Jaspe Rouge",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Rouge brique",
    hex: "#9B3A30",
    meaning:
      "Pierre terreuse et intense, associée à la stabilité, au courage et à la détermination.",
    benefits: [
      "Ancre dans le réel",
      "Renforce le courage",
      "Stabilise les émotions",
    ],
  },
  {
    id: "snowflake-obsidian",
    name: "Obsidienne Flocon de Neige",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Noir moucheté",
    hex: "#3D3D40",
    meaning:
      "Pierre noire aux motifs naturels contrastés, associée à l'ancrage, à la lucidité et à l'équilibre.",
    benefits: [
      "Favorise la lucidité",
      "Aide à l'équilibre intérieur",
      "Pierre d'ancrage",
    ],
    featured: true,
  },
  {
    id: "tiger-eye",
    name: "Œil de Tigre",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Brun doré",
    hex: "#B6792A",
    meaning:
      "Pierre aux reflets dorés, choisie pour son caractère affirmé et sa symbolique de confiance.",
    benefits: [
      "Renforce la confiance en soi",
      "Stimule la motivation",
      "Apporte protection et ancrage",
    ],
    featured: true,
    zodiac: "Lion, Capricorne",
  },
  {
    id: "lapis-lazuli",
    name: "Lapis-Lazuli",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Bleu intense",
    hex: "#2A4B9B",
    meaning:
      "Pierre bleu intense parsemée d'éclats dorés, associée à la sagesse, à la vérité et à l'expression de soi.",
    benefits: [
      "Favorise l'expression de soi",
      "Stimule la créativité",
      "Apporte clarté d'esprit",
    ],
    featured: true,
    zodiac: "Sagittaire",
  },
  {
    id: "sodalite",
    name: "Sodalite",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Bleu marine",
    hex: "#41618A",
    meaning:
      "Pierre bleu profond proche du lapis-lazuli, associée au calme et à la clarté mentale.",
    benefits: [
      "Apaise le mental",
      "Favorise la concentration",
      "Encourage l'honnêteté envers soi",
    ],
    caution:
      "À distinguer du lapis-lazuli sur les visuels produit : la sodalite n'a pas les inclusions dorées de pyrite caractéristiques du lapis.",
  },
  {
    id: "green-aventurine",
    name: "Aventurine Verte",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Vert tendre",
    hex: "#5E9E78",
    meaning:
      "Pierre douce aux reflets scintillants, associée à l'ouverture, à la chance et au renouveau.",
    benefits: [
      "Ouvre à de nouvelles opportunités",
      "Apaise les émotions",
      "Favorise l'équilibre",
    ],
    featured: true,
  },
  {
    id: "unakite",
    name: "Unakite",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Vert et rose mêlés",
    hex: "#8B8F5E",
    meaning:
      "Pierre mouchetée verte et rose, associée à l'équilibre et à la patience.",
    benefits: [
      "Favorise la patience",
      "Aide à l'équilibre émotionnel",
      "Encourage la persévérance",
    ],
  },
  {
    id: "dalmatian-jasper",
    name: "Jaspe Dalmatien",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Beige tacheté",
    hex: "#DCD3B8",
    meaning:
      "Pierre beige tachetée de noir, choisie pour sa fantaisie naturelle et sa symbolique de joie et d'équilibre.",
    benefits: [
      "Apporte joie et légèreté",
      "Favorise la loyauté",
      "Équilibre les énergies",
    ],
    featured: true,
  },
  {
    id: "white-howlite",
    name: "Howlite Blanche",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Blanc veiné",
    hex: "#EDEAE3",
    meaning:
      "Pierre blanche veinée de gris, traditionnellement associée à la sérénité et à l'apaisement.",
    benefits: [
      "Favorise le calme",
      "Aide à apaiser les pensées",
      "Encourage la patience",
    ],
    caution:
      "Présentée ici dans sa forme blanche naturelle — à ne pas confondre avec les howlites teintées vendues sous le nom d'autres pierres (voir Turquoise).",
  },
  {
    id: "labradorite",
    name: "Labradorite",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Gris bleuté irisé",
    hex: "#5A6B73",
    meaning:
      "Pierre grise aux reflets irisés changeants, associée au mystère, à la protection et à la transformation.",
    benefits: [
      "Renforce l'intuition",
      "Protège des énergies négatives",
      "Accompagne le changement",
    ],
    featured: true,
    zodiac: "Scorpion, Poissons",
  },
  {
    id: "amazonite",
    name: "Amazonite",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Vert-bleu",
    hex: "#6FA89B",
    meaning:
      "Pierre vert-bleu apaisante, associée au calme, à l'expression sincère et à l'équilibre intérieur.",
    benefits: [
      "Apaise les tensions",
      "Favorise une communication sincère",
      "Encourage l'équilibre intérieur",
    ],
  },
  {
    id: "prehnite",
    name: "Préhnite",
    category: "pierre-naturelle",
    confidence: "faible",
    color: "Vert pâle",
    hex: "#A9C9A0",
    meaning:
      "Pierre vert pâle translucide, associée à la sérénité et à l'harmonie.",
    benefits: [
      "Favorise la sérénité",
      "Aide à lâcher prise",
      "Apporte une sensation d'harmonie",
    ],
    caution:
      "Identification à confirmer avant publication : plusieurs pierres vertes translucides se ressemblent (préhnite, jade, aventurine claire).",
  },
  {
    id: "clear-quartz",
    name: "Quartz Clair / Cristal de Roche",
    category: "pierre-naturelle",
    confidence: "haute",
    color: "Transparent",
    hex: "#F1EFEA",
    meaning:
      "Pierre transparente et lumineuse, associée à la clarté, à la pureté et à l'amplification des intentions.",
    benefits: [
      "Amplifie les intentions",
      "Favorise la clarté mentale",
      "Symbole de pureté",
    ],
  },
  {
    id: "citrine",
    name: "Citrine / Quartz Jaune",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Jaune doré",
    hex: "#E2B33C",
    meaning:
      "Pierre jaune dorée, associée au soleil, à la joie et à la confiance.",
    benefits: [
      "Stimule l'optimisme",
      "Favorise la réussite",
      "Dynamise et réchauffe l'humeur",
    ],
    caution:
      "Une grande partie des citrines du marché sont en réalité de l'améthyste chauffée : à vérifier avant d'afficher « citrine naturelle ».",
    zodiac: "Gémeaux, Lion",
  },
  {
    id: "fluorite",
    name: "Fluorite",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Dégradés violet, vert et blanc",
    hex: "#9B8EC4",
    meaning:
      "Pierre translucide aux dégradés violets et verts, traditionnellement associée à la concentration et à la clarté mentale.",
    benefits: [
      "Favorise la concentration",
      "Apporte de la clarté mentale",
      "Aide à filtrer les distractions",
    ],
    caution:
      "Les coloris vifs de la fluorite peuvent être naturels ou légèrement rehaussés : à vérifier auprès du fournisseur avant d'affirmer « fluorite 100% naturelle ».",
  },
  {
    id: "dyed-coral-imitation",
    name: "Chips Rouges (imitation corail)",
    category: "decorative",
    confidence: "faible",
    color: "Rouge vif uniforme",
    hex: "#C81E1E",
    meaning:
      "Perle décorative rouge vif choisie pour son contraste graphique avec le blanc nacré.",
    benefits: [
      "Apporte une touche de couleur vive",
      "Effet graphique rouge et blanc",
      "Personnalisation audacieuse",
    ],
    caution:
      "Le corail rouge naturel est une espèce protégée : ces perles sont très probablement du corail de bambou teinté ou une imitation en résine — ne jamais annoncer « corail naturel ».",
  },
  {
    id: "evil-eye-bead",
    name: "Perle Œil Protecteur",
    category: "decorative",
    confidence: "haute",
    color: "Blanc et bleu (motif œil)",
    hex: "#2E86AB",
    meaning:
      "Perle en verre ou résine représentant l'œil protecteur, symbole méditerranéen traditionnel porté contre le mauvais œil.",
    benefits: [
      "Symbole de protection traditionnelle",
      "Apporte une touche graphique",
      "Pièce de caractère",
    ],
    caution:
      "Perle décorative en verre ou résine : à présenter comme symbole protecteur traditionnel, jamais comme une pierre naturelle.",
  },
  {
    id: "mother-of-pearl",
    name: "Nacre / Coquillage",
    category: "matiere-naturelle",
    confidence: "haute",
    color: "Blanc nacré",
    hex: "#F4EFE4",
    meaning:
      "Matière naturelle issue du coquillage, aux reflets nacrés délicats, associée à la pureté et à la lumière.",
    benefits: [
      "Apporte douceur et luminosité",
      "Évoque la pureté",
      "Matière délicate et intemporelle",
    ],
    caution:
      "Ne pas présenter comme une pierre : à classer en « matière naturelle », distincte des pierres semi-précieuses.",
  },
  {
    id: "turquoise",
    name: "Turquoise",
    category: "pierre-naturelle",
    confidence: "faible",
    color: "Bleu-vert",
    hex: "#2FA0A0",
    meaning:
      "Pierre bleu lumineux, choisie pour son allure solaire et sa symbolique de liberté.",
    benefits: [
      "Évoque la liberté et le voyage",
      "Symbole de protection",
      "Apporte une touche solaire",
    ],
    caution:
      "À utiliser seulement lorsque la matière est confirmée comme turquoise naturelle ; sinon écrire « howlite teintée turquoise » ou « pierre turquoise teintée ».",
    featured: true,
    zodiac: "Sagittaire, Poissons",
  },
  {
    id: "black-onyx",
    name: "Onyx Noir / Obsidienne Noire",
    category: "pierre-naturelle",
    confidence: "moyenne",
    color: "Noir profond",
    hex: "#1B1B1D",
    meaning:
      "Pierre noire profonde et mate, associée à la protection, à la force intérieure et à l'élégance sobre.",
    benefits: [
      "Apporte protection",
      "Renforce la force mentale",
      "Favorise la stabilité",
    ],
    caution:
      "Onyx et obsidienne noire se ressemblent fortement sur photo : à distinguer avant de nommer la pierre avec certitude.",
    zodiac: "Capricorne, Lion",
  },
  {
    id: "multicolor-chips",
    name: "Chips Multicolores",
    category: "decorative",
    confidence: "faible",
    color: "Multicolore",
    hex: "#C98FB0",
    meaning:
      "Perles décoratives multicolores, utilisées pour leur fantaisie et leur jeu de couleurs.",
    benefits: [
      "Apporte fantaisie et couleur",
      "Personnalise le bijou",
      "Effet ludique et coloré",
    ],
    caution:
      "Perle décorative / fantaisie : ne pas présenter comme une pierre naturelle ou semi-précieuse.",
  },
  {
    id: "fluo-green-chips",
    name: "Chips Verts Fluorescents",
    category: "decorative",
    confidence: "faible",
    color: "Vert vif",
    hex: "#5FE07A",
    meaning:
      "Perles décoratives aux teintes vertes vives, choisies pour leur effet lumineux et contemporain.",
    benefits: [
      "Apporte une touche moderne",
      "Effet lumineux et contrasté",
      "Personnalisation audacieuse",
    ],
    caution:
      "Couleur fluorescente non naturelle : à présenter clairement comme perle fantaisie, jamais comme pierre naturelle.",
  },
  {
    id: "copper-chips",
    name: "Chips Cuivrés / Métallisés",
    category: "decorative",
    confidence: "faible",
    color: "Cuivré métallisé",
    hex: "#B87333",
    meaning:
      "Perles décoratives à finition métallisée cuivrée, utilisées pour apporter du contraste et de l'éclat.",
    benefits: [
      "Apporte éclat et contraste",
      "Touche métallique chic",
      "Personnalisation raffinée",
    ],
    caution:
      "Finition métallisée artificielle : à classer en perle décorative, distincte des pierres et métaux précieux.",
  },
];
