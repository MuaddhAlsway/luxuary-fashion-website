import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";
import MagneticButton from "../components/ui/MagneticButton";
import { useLocale } from "../hooks/useLocale";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const pageRef = useRef<HTMLDivElement>(null);
  const { localizePath } = useLocale();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current || !product) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pd-hero-content",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".pd-hero-image",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          delay: 0.2,
        }
      );

      gsap.utils.toArray(".pd-section").forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      ScrollTrigger.create({
        trigger: ".pd-hero-content",
        start: "bottom top",
        onEnterBack: () => setShowSticky(false),
        onLeave: () => setShowSticky(true),
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="heading-display text-4xl mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Fragrance Not Found
          </h1>
          <Link
            to={localizePath("/collection")}
            className="text-label tracking-[0.2em] border-b pb-0.5"
            style={{
              color: "var(--color-text)",
              borderColor: "var(--color-text)",
            }}
          >
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef}>
      {/* Hero - Product Image + Info */}
      <section className="relative min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Product Image */}
          <div className="h-[50vh] md:h-screen order-2 md:order-1 relative overflow-hidden">
            <div
              className="pd-hero-image absolute inset-0 bg-cover bg-center"
              style={{
                backgroundColor: "var(--color-accent)",
                backgroundImage: `url(${product.image})`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, transparent 60%, rgba(196,168,130,0.3) 100%)",
              }}
            />
          </div>

          {/* Product Info */}
          <div className="pd-hero-content flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 order-1 md:order-2" style={{ backgroundColor: "var(--color-deep)" }}>
            <p
              className="text-label mb-4 tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              {product.category[0].toUpperCase()}
            </p>
            <h1
              className="heading-display text-6xl md:text-8xl mb-2"
              style={{ color: "var(--color-secondary)" }}
            >
              {product.name}
            </h1>
            <p
              className="heading-editorial text-xl mb-8"
              style={{ color: "var(--color-accent)" }}
            >
              {product.subtitle}
            </p>
            <p
              className="text-body-elegant text-lg mb-10 max-w-md"
              style={{ color: "var(--color-muted)" }}
            >
              {product.description}
            </p>

            <div className="flex items-center gap-8 mb-10">
              <div>
                <p
                  className="text-label mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  Price
                </p>
                <p
                  className="heading-editorial text-3xl"
                  style={{ color: "var(--color-secondary)" }}
                >
                  ${product.price.toLocaleString()}
                </p>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--color-muted)", opacity: 0.3 }}
              />
              <div>
                <p
                  className="text-label mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  Volume
                </p>
                <p
                  className="heading-editorial text-3xl"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {product.size}
                </p>
              </div>
            </div>

            <MagneticButton>Add to Collection</MagneticButton>
          </div>
        </div>
      </section>

      {/* Fragrance Notes Timeline */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Olfactory Pyramid
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-16"
            style={{ color: "var(--color-text)" }}
          >
            Fragrance Notes
          </h2>

          <div className="flex flex-col items-center gap-0">
            {/* Top Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Top Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.top.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="divider-line w-24" />

            {/* Heart Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Heart Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.heart.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="divider-line w-24" />

            {/* Base Notes */}
            <div className="w-full py-10">
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Base Notes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {product.notes.base.map((note) => (
                  <span
                    key={note}
                    className="heading-editorial text-xl md:text-2xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Origins */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-label mb-4 tracking-[0.3em]"
              style={{ color: "var(--color-muted)" }}
            >
              Raw Materials
            </p>
            <h2
              className="heading-display text-4xl md:text-6xl"
              style={{ color: "var(--color-text)" }}
            >
              Ingredient Origins
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.ingredients.map((ingredient) => (
              <div
                key={ingredient}
                className="glass-panel p-8 rounded-sm text-center group hover:bg-white/12 transition-all duration-500"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <span
                    className="heading-editorial text-lg"
                    style={{ color: "var(--color-text)" }}
                  >
                    {ingredient[0]}
                  </span>
                </div>
                <h3
                  className="heading-editorial text-lg mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {ingredient}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Sourced with care
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="pd-section relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundColor: "var(--color-deep)",
            backgroundImage: "url(/images/img3.jpg)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(26,26,26,0.7)" }}
        />
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-accent)" }}
          >
            Made by Hand
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-6"
            style={{ color: "var(--color-secondary)" }}
          >
            Crafted with
            <br />
            Devotion
          </h2>
          <p
            className="text-body-elegant text-lg max-w-lg mx-auto mb-8"
            style={{ color: "var(--color-muted)" }}
          >
            Every bottle is hand-assembled in our Grasse atelier by master
            craftspeople with decades of experience.
          </p>
          <MagneticButton>Watch the Film</MagneticButton>
        </div>
      </section>

      {/* Layering Guide */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Layering Guide
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Build Your Signature
          </h2>
          <p
            className="text-body-elegant text-lg max-w-2xl mx-auto mb-16"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Layer fragrances to create a scent that is uniquely yours. Start
            with a lighter base, then add depth with complementary compositions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(
                (p) =>
                  p.id !== product.id &&
                  p.category.some((c) => product.category.includes(c))
              )
              .slice(0, 3)
              .map((pair) => (
                <Link
                  key={pair.id}
                  to={localizePath(`/product/${pair.id}`)}
                  className="group"
                >
                  <div
                    className="aspect-[3/4] bg-cover bg-center rounded-sm mb-4 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      backgroundImage: `url(${pair.image})`,
                    }}
                  />
                  <p
                    className="text-label mb-1 tracking-[0.2em]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Layer with
                  </p>
                  <h3
                    className="heading-editorial text-xl"
                    style={{ color: "var(--color-text)" }}
                  >
                    {pair.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text)", opacity: 0.6 }}
                  >
                    {pair.subtitle}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Purchase Sticky Section */}
      <section
        className="pd-section section-padding"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3
              className="heading-display text-4xl md:text-5xl mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {product.name}
            </h3>
            <p
              className="heading-editorial text-lg"
              style={{ color: "var(--color-accent)" }}
            >
              {product.size} &mdash; ${product.price.toLocaleString()}
            </p>
          </div>
          <MagneticButton>Add to Collection</MagneticButton>
        </div>
      </section>

      {/* Sticky Add to Cart Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[150] transition-all duration-500"
        style={{
          transform: showSticky ? "translateY(0)" : "translateY(-100%)",
          backgroundColor: "#1A1A1A",
          borderBottom: "1px solid rgba(196,168,130,0.2)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div
              className="w-10 h-10 bg-cover bg-center rounded-sm"
              style={{
                backgroundColor: "var(--color-accent)",
                backgroundImage: `url(${product.image})`,
              }}
            />
            <div>
              <h4
                className="heading-editorial text-lg"
                style={{ color: "var(--color-secondary)" }}
              >
                {product.name}
              </h4>
              <p
                className="text-label tracking-[0.15em]"
                style={{ color: "#C4A882" }}
              >
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            className="px-6 py-2.5 text-label tracking-[0.15em] transition-all duration-300 hover:opacity-80"
            style={{
              border: "1px solid #C4A882",
              color: "#C4A882",
            }}
          >
            Add to Collection
          </button>
        </div>
      </div>
    </main>
  );
}
