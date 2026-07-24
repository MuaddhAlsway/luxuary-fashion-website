import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ingredients } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryIngredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ingredients-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".ingredient-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".ingredient-map",
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            The Raw Materials
          </p>
          <h2
            className="ingredients-title heading-display text-5xl md:text-7xl"
            style={{ color: "var(--color-text)" }}
          >
            Noble Ingredients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Interactive Map Area */}
          <div className="ingredient-map relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "var(--color-accent)",
                backgroundImage: "url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=800&fit=crop&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "var(--color-bg)",
                opacity: 0.7,
              }}
            />

            {/* Ingredient Nodes */}
            {ingredients.map((ingredient) => (
              <button
                key={ingredient.id}
                className={`ingredient-node absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-500 ${
                  activeIngredient.id === ingredient.id
                    ? "scale-150"
                    : "scale-100 hover:scale-125"
                }`}
                style={{
                  left: `${ingredient.x}%`,
                  top: `${ingredient.y}%`,
                  backgroundColor:
                    activeIngredient.id === ingredient.id
                      ? "var(--color-text)"
                      : "var(--color-muted)",
                  boxShadow:
                    activeIngredient.id === ingredient.id
                      ? "0 0 0 6px rgba(109,15,26,0.2)"
                      : "none",
                }}
                onClick={() => setActiveIngredient(ingredient)}
              >
                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {ingredient.name}
                </span>
              </button>
            ))}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {ingredients.map((ingredient, i) => {
                if (i === 0) return null;
                const prev = ingredients[i - 1];
                return (
                  <line
                    key={i}
                    x1={`${prev.x}%`}
                    y1={`${prev.y}%`}
                    x2={`${ingredient.x}%`}
                    y2={`${ingredient.y}%`}
                    stroke="var(--color-text)"
                    strokeWidth="0.5"
                    opacity="0.2"
                    strokeDasharray="4,4"
                  />
                );
              })}
            </svg>
          </div>

          {/* Ingredient Detail */}
          <div className="flex flex-col">
            <div
              className="transition-all duration-500"
              key={activeIngredient.id}
            >
              <p
                className="text-label mb-2 tracking-[0.3em]"
                style={{ color: "var(--color-muted)" }}
              >
                Origin
              </p>
              <p
                className="heading-editorial text-xl mb-6"
                style={{ color: "var(--color-accent)" }}
              >
                {activeIngredient.origin}
              </p>

              <h3
                className="heading-display text-4xl md:text-5xl mb-6"
                style={{ color: "var(--color-text)" }}
              >
                {activeIngredient.name}
              </h3>

              <p
                className="text-body-elegant text-lg mb-8"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {activeIngredient.story}
              </p>

              <div
                className="glass-panel p-6 rounded-sm inline-block"
              >
                <p
                  className="text-label mb-2 tracking-[0.2em]"
                  style={{ color: "var(--color-muted)" }}
                >
                  Olfactory Profile
                </p>
                <p
                  className="heading-editorial text-lg"
                  style={{ color: "var(--color-text)" }}
                >
                  {activeIngredient.notes}
                </p>
              </div>
            </div>

            {/* Ingredient Navigation */}
            <div className="flex gap-3 mt-10">
              {ingredients.map((ing) => (
                <button
                  key={ing.id}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300"
                  style={{
                    border: `1px solid ${
                      activeIngredient.id === ing.id
                        ? "var(--color-text)"
                        : "transparent"
                    }`,
                    backgroundColor:
                      activeIngredient.id === ing.id
                        ? "var(--color-text)"
                        : "transparent",
                    color:
                      activeIngredient.id === ing.id
                        ? "var(--color-secondary)"
                        : "var(--color-muted)",
                  }}
                  onClick={() => setActiveIngredient(ing)}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
