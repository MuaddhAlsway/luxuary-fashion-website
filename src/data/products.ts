export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  category: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  ingredients: string[];
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "velvet-noir",
    name: "Velvet Noir",
    subtitle: "The Essence of Midnight",
    description:
      "A intoxicating blend of dark oud and Bulgarian rose, wrapped in smoky incense and aged sandalwood. Velvet Noir is not worn — it is experienced.",
    price: 2850,
    size: "50ml",
    category: ["oud", "woody"],
    notes: {
      top: ["Black Pepper", "Bergamot", "Saffron"],
      heart: ["Bulgarian Rose", "Oud", "Incense"],
      base: ["Sandalwood", "Amber", "Musk"],
    },
    ingredients: ["Oud", "Rose", "Saffron", "Amber"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop&q=80",
    featured: true,
  },
  {
    id: "soleil-dor",
    name: "Soleil d'Or",
    subtitle: "Liquid Gold",
    description:
      "Captured Mediterranean sunlight in a bottle. Neroli and jasmine dance over a bed of golden amber and white musk. Timeless elegance, distilled.",
    price: 1950,
    size: "75ml",
    category: ["floral", "citrus"],
    notes: {
      top: ["Neroli", "Lemon Verbena", "Pink Pepper"],
      heart: ["Jasmine Sambac", "Ylang Ylang", "Orange Blossom"],
      base: ["Amber", "White Musk", "Cedarwood"],
    },
    ingredients: ["Neroli", "Jasmine", "Amber", "Musk"],
    image: "https://images.unsplash.com/photo-1594035910387-fa0e7426a2af?w=800&h=1000&fit=crop&q=80",
    featured: true,
  },
  {
    id: "terre-sauvage",
    name: "Terre Sauvage",
    subtitle: "Wild Earth",
    description:
      "Born from volcanic soil and ancient forests. Vetiver and patchouli intertwine with leather and cedar. A fragrance for the untamed soul.",
    price: 3200,
    size: "50ml",
    category: ["woody"],
    notes: {
      top: ["Cardamom", "Grapefruit", "Violet Leaf"],
      heart: ["Vetiver", "Patchouli", "Geranium"],
      base: ["Leather", "Cedarwood", "Benzoin"],
    },
    ingredients: ["Vetiver", "Patchouli", "Leather", "Cedar"],
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=1000&fit=crop&q=80",
    featured: true,
  },
  {
    id: "lune-blanche",
    name: "Lune Blanche",
    subtitle: "Moonlight on Skin",
    description:
      "An ethereal composition of white flowers and lunar musk. Lune Blanche captures the quiet intimacy of moonlit gardens in full bloom.",
    price: 2400,
    size: "50ml",
    category: ["floral"],
    notes: {
      top: ["White Tea", "Lychee", "Aldehydes"],
      heart: ["Tuberose", "Peony", "Magnolia"],
      base: ["Musk", "Cashmeran", "Ambroxan"],
    },
    ingredients: ["Tuberose", "Peony", "Musk", "Ambroxan"],
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=1000&fit=crop&q=80",
    featured: false,
  },
  {
    id: "ambre-celeste",
    name: "Ambre Celeste",
    subtitle: "Celestial Warmth",
    description:
      "Ancient amber resin meets modern refinement. A warm embrace of labdanum, benzoin, and Madagascan vanilla. Comfort elevated to art.",
    price: 1650,
    size: "100ml",
    category: ["woody"],
    notes: {
      top: ["Cinnamon", "Orange", "Nutmeg"],
      heart: ["Labdanum", "Benzoin", "Myrrh"],
      base: ["Vanilla", "Tonka Bean", "Amber"],
    },
    ingredients: ["Amber", "Labdanum", "Vanilla", "Benzoin"],
    image: "https://images.unsplash.com/photo-1595425959229-4c61df688cde?w=800&h=1000&fit=crop&q=80",
    featured: false,
  },
  {
    id: "rose-absolue",
    name: "Rose Absolue",
    subtitle: "Absolute Devotion",
    description:
      "One thousand roses from Grasse, distilled into a single expression of devotion. Paired with rare oud and aged leather. The ultimate floral statement.",
    price: 4800,
    size: "30ml",
    category: ["floral", "oud"],
    notes: {
      top: ["Damask Rose", "Raspberry", "Saffron"],
      heart: ["Rose Absolute", "Oud", "Iris"],
      base: ["Leather", "Amber", "Sandalwood"],
    },
    ingredients: ["Rose", "Oud", "Saffron", "Leather"],
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=1000&fit=crop&q=80",
    featured: true,
  },
];

export const categories = [
  "All",
  "Oud",
  "Floral",
  "Woody",
  "Citrus",
  "Limited Edition",
];
