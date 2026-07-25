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
    image: "/images/img1.jpg",
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
    image: "/images/img2.jpg",
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
    image: "/images/img3.jpg",
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
    image: "/images/img4.jpg",
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
    image: "/images/img5.jpg",
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
    image: "/images/img1.jpg",
  },
  {
    id: "ingredients",
    title: "Ingredients",
    subtitle: "The Finest Raw Materials",
    description:
      "We source only the rarest ingredients from every corner of the earth. No compromise. No substitution. Every material is selected for its ability to transcend the ordinary.",
    image: "/images/img2.jpg",
  },
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    subtitle: "Time-Honored Mastery",
    description:
      "Our atelier in Grasse follows traditions dating back to the 17th century. Each composition is hand-blended by master perfumers using techniques passed down through generations.",
    image: "/images/img3.jpg",
  },
  {
    id: "perfumer",
    title: "Master Perfumer",
    subtitle: "The Nose Behind the Art",
    description:
      "With over three decades of experience, our Maître Parfumeur possesses an olfactory vocabulary of over 3,000 raw materials. Each creation is a signature of excellence.",
    image: "/images/img4.jpg",
  },
  {
    id: "bottle",
    title: "Bottle Design",
    subtitle: "Architecture in Glass",
    description:
      "Hand-blown Murano glass. Weighted crystal caps. Each bottle is a sculptural object designed to be displayed, not hidden. The vessel is as precious as the liquid within.",
    image: "/images/img5.jpg",
  },
];
