export interface Ingredient {
  id: string;
  name: string;
  origin: string;
  story: string;
  notes: string;
  image: string;
  x: number;
  y: number;
}

export const ingredients: Ingredient[] = [
  {
    id: "oud",
    name: "Oud",
    origin: "Cambodia",
    story:
      "Harvested from century-old Aquilaria trees, our oud undergoes a natural fermentation process lasting three years. Each drop carries the patience of time.",
    notes: "Warm, woody, animalic, complex",
    image: "https://images.unsplash.com/photo-1615634260168-c540584068b4?w=800&h=800&fit=crop&q=80",
    x: 75,
    y: 40,
  },
  {
    id: "rose",
    name: "Rose de Mai",
    origin: "Grasse, France",
    story:
      "Picked at dawn when the dew still clings to petals. It takes 4,000 kilograms of roses to produce one kilogram of absolute. Perfection demands sacrifice.",
    notes: "Rich, honeyed, deep, intoxicating",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=800&fit=crop&q=80",
    x: 30,
    y: 30,
  },
  {
    id: "saffron",
    name: "Saffron",
    origin: "Kashmir",
    story:
      "Hand-harvested stigmas of the crocus flower, each thread a testament to human dedication. Our saffron adds a metallic, leathery whisper to our compositions.",
    notes: "Metallic, leathery, warm, bitter-sweet",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=800&fit=crop&q=80",
    x: 60,
    y: 60,
  },
  {
    id: "amber",
    name: "Amber",
    origin: "Baltic Coast",
    story:
      "Fossilized tree resin millions of years old, our amber accord is built from labdanum, benzoin, and vanilla — a modern tribute to ancient warmth.",
    notes: "Warm, resinous, sweet, enveloping",
    image: "https://images.unsplash.com/photo-1603905179682-e4ea3f5318ff?w=800&h=800&fit=crop&q=80",
    x: 45,
    y: 25,
  },
  {
    id: "musk",
    name: "White Musk",
    origin: "Synthesized",
    story:
      "Our proprietary musk molecule was developed over five years of research. Clean yet sensuous, it forms the ethereal backbone of every composition.",
    notes: "Clean, skin-like, ethereal, lasting",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=800&fit=crop&q=80",
    x: 20,
    y: 55,
  },
];

export const storySlides = [
  {
    id: "inspiration",
    title: "Inspiration",
    subtitle: "Where Vision Meets Nature",
    description:
      "Every fragrance begins with a moment — a memory, a landscape, a feeling too beautiful to fade. Our creative directors travel the world seeking these ineffable moments.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "ingredients",
    title: "Ingredients",
    subtitle: "The Finest Raw Materials",
    description:
      "We source only the rarest ingredients from every corner of the earth. No compromise. No substitution. Every material is selected for its ability to transcend the ordinary.",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    subtitle: "Time-Honored Mastery",
    description:
      "Our atelier in Grasse follows traditions dating back to the 17th century. Each composition is hand-blended by master perfumers using techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "perfumer",
    title: "Master Perfumer",
    subtitle: "The Nose Behind the Art",
    description:
      "With over three decades of experience, our Maître Parfumeur possesses an olfactory vocabulary of over 3,000 raw materials. Each creation is an签名 of excellence.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "bottle",
    title: "Bottle Design",
    subtitle: "Architecture in Glass",
    description:
      "Hand-blown Murano glass. Weighted crystal caps. Each bottle is a sculptural object designed to be displayed, not hidden. The vessel is as precious as the liquid within.",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1200&h=800&fit=crop&q=80",
  },
];
