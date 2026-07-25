import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, categories } from "../data/products";
import { useLocale } from "../hooks/useLocale";
import TiltCard from "../components/ui/TiltCard";
import ImageReveal from "../components/ui/ImageReveal";

gsap.registerPlugin(ScrollTrigger);

const moods = [
  { label: "Date Night", filter: "romantic" },
  { label: "Boardroom", filter: "power" },
  { label: "Everyday", filter: "casual" },
  { label: "Special Occasion", filter: "luxe" },
  { label: "Summer", filter: "fresh" },
  { label: "Winter", filter: "deep" },
];

const moodMap: Record<string, string[]> = {
  romantic: ["soleil-dor", "lune-blanche", "rose-absolue"],
  power: ["terre-sauvage", "velvet-noir", "rose-absolue"],
  casual: ["soleil-dor", "ambre-celeste", "lune-blanche"],
  luxe: ["velvet-noir", "rose-absolue", "terre-sauvage"],
  fresh: ["soleil-dor", "lune-blanche", "ambre-celeste"],
  deep: ["velvet-noir", "terre-sauvage", "rose-absolue"],
};

export default function ProductListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { localizePath } = useLocale();

  const filtered = (() => {
    if (activeMood) {
      const ids = moodMap[activeMood] || [];
      return products.filter((p) => ids.includes(p.id));
    }
    if (activeCategory === "All") return products;
    return products.filter((p) =>
      p.category.includes(activeCategory.toLowerCase())
    );
  })();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plp-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      gsap.utils.toArray(".plp-card").forEach((card: any, i: number) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [filtered]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveMood(null);
    gsap.fromTo(
      ".plp-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  };

  const handleMoodChange = (mood: string) => {
    setActiveMood(activeMood === mood ? null : mood);
    setActiveCategory("All");
    gsap.fromTo(
      ".plp-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  };

  return (
    <main>
      {/* Header */}
      <section className="plp-header pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p
          className="text-label mb-4 tracking-[0.3em]"
          style={{ color: "var(--color-muted)" }}
        >
          The Collection
        </p>
        <h1
          className="heading-display text-6xl md:text-8xl mb-8"
          style={{ color: "var(--color-text)" }}
        >
          All
          <br />
          Fragrances
        </h1>

        {/* Mood Filters */}
        <div className="mb-6">
          <p
            className="text-label mb-3 tracking-[0.2em]"
            style={{ color: "var(--color-muted)" }}
          >
            Shop by Mood
          </p>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.filter}
                className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  border: `1px solid ${
                    activeMood === mood.filter
                      ? "var(--color-text)"
                      : "var(--color-muted)"
                  }`,
                  backgroundColor:
                    activeMood === mood.filter
                      ? "var(--color-text)"
                      : "transparent",
                  color:
                    activeMood === mood.filter
                      ? "var(--color-secondary)"
                      : "var(--color-muted)",
                }}
                onClick={() => handleMoodChange(mood.filter)}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                border: `1px solid ${
                  activeCategory === cat && !activeMood
                    ? "var(--color-text)"
                    : "var(--color-muted)"
                }`,
                backgroundColor:
                  activeCategory === cat && !activeMood
                    ? "var(--color-text)"
                    : "transparent",
                color:
                  activeCategory === cat && !activeMood
                    ? "var(--color-secondary)"
                    : "var(--color-muted)",
              }}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Pinterest-style Grid */}
      <section className="px-6 md:px-12 pb-24 max-w-[1400px] mx-auto">
        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filtered.map((product, i) => (
            <div key={product.id} className="plp-card break-inside-avoid">
              <TiltCard intensity={8}>
                <Link
                  to={localizePath(`/product/${product.id}`)}
                  className="block group relative overflow-hidden rounded-sm"
                >
                  <ImageReveal
                    direction={i % 2 === 0 ? "up" : "left"}
                    delay={i * 0.08}
                  >
                    <div
                      className={`bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${
                        i % 3 === 0
                          ? "aspect-[3/4]"
                          : i % 3 === 1
                          ? "aspect-[4/5]"
                          : "aspect-[3/4]"
                      }`}
                      style={{
                        backgroundColor: "var(--color-accent)",
                        backgroundImage: `url(${product.image})`,
                      }}
                    />
                  </ImageReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-label text-secondary mb-1 tracking-[0.2em]">
                      {product.category[0].toUpperCase()}
                    </p>
                    <h3 className="heading-display text-2xl text-secondary mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-secondary/70">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p
              className="heading-editorial text-2xl"
              style={{ color: "var(--color-muted)" }}
            >
              No fragrances found in this category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
