import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../../data/products";
import { Link } from "react-router-dom";
import { useLocale } from "../../hooks/useLocale";
import ImageReveal from "../ui/ImageReveal";
import TiltCard from "../ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function ShowoffCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { localizePath } = useLocale();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-title",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.utils.toArray(".collection-card").forEach((card: any, i: number) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = products.filter((p) => p.featured);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p
              className="text-label mb-4 tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              The Collection
            </p>
            <h2
              className="collection-title heading-display text-5xl md:text-7xl"
              style={{ color: "var(--color-text)" }}
            >
              Signature
              <br />
              Fragrances
            </h2>
          </div>
          <Link
            to={localizePath("/collection")}
            className="text-label mt-6 md:mt-0 tracking-[0.2em] border-b pb-1 transition-opacity hover:opacity-60"
            style={{ color: "var(--color-text)", borderColor: "var(--color-text)" }}
          >
            View All
          </Link>
        </div>

        {/* Asymmetric Magazine Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large Featured Card */}
          <div className="collection-card md:col-span-7 relative group overflow-hidden rounded-sm cursor-pointer">
            <TiltCard intensity={6}>
              <Link to={localizePath(`/product/${featured[0]?.id}`)}>
                <ImageReveal direction="left">
                  <div
                    className="aspect-[3/4] md:aspect-[4/5] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      backgroundImage: `url(${featured[0]?.image})`,
                    }}
                  />
                </ImageReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-label text-secondary mb-2 tracking-[0.3em]">
                    {featured[0]?.category[0].toUpperCase()}
                  </p>
                  <h3 className="heading-display text-3xl text-secondary mb-2">
                    {featured[0]?.name}
                  </h3>
                  <p className="text-body-elegant text-sm text-secondary/80">
                    {featured[0]?.subtitle}
                  </p>
                </div>
              </Link>
            </TiltCard>
          </div>

          {/* Stack of Two Medium Cards */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            {featured.slice(1, 3).map((product) => (
              <div
                key={product.id}
                className="collection-card relative group overflow-hidden rounded-sm cursor-pointer"
              >
                <TiltCard intensity={6}>
                  <Link to={localizePath(`/product/${product.id}`)}>
                    <ImageReveal direction="up">
                      <div
                        className="aspect-[16/10] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          backgroundImage: `url(${product.image})`,
                        }}
                      />
                    </ImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-label text-secondary mb-1 tracking-[0.3em]">
                        {product.category[0].toUpperCase()}
                      </p>
                      <h3 className="heading-display text-2xl text-secondary">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Bottom Row - Two Equal Cards */}
            {featured.slice(3, 5).map((product) => (
            <div
              key={product.id}
              className="collection-card md:col-span-6 relative group overflow-hidden rounded-sm cursor-pointer"
            >
              <Link to={localizePath(`/product/${product.id}`)}>
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    backgroundImage: `url(${product.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="heading-display text-3xl text-secondary mb-1">
                    {product.name}
                  </h3>
                  <p className="text-body-elegant text-sm text-secondary/80">
                    {product.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
