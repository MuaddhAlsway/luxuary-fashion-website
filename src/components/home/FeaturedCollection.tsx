import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".featured-image",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
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
      className="relative min-h-screen flex items-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Product Image */}
        <div className="h-[60vh] md:h-screen relative order-2 md:order-1 overflow-hidden">
          <div
            className="featured-image absolute inset-0 bg-cover bg-center"
            style={{
              backgroundColor: "var(--color-accent)",
              backgroundImage: "url(/images/img1.jpg)",
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

        {/* Content */}
        <div className="featured-content flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 order-1 md:order-2">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Featured
          </p>
          <h2
            className="heading-display text-5xl md:text-7xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Rose
            <br />
            Absolue
          </h2>
          <p
            className="heading-editorial text-xl mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            The Ultimate Floral Statement
          </p>
          <p
            className="text-body-elegant text-lg mb-8 max-w-md"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            One thousand roses from Grasse, distilled into a single expression
            of devotion. Paired with rare oud and aged leather. Limited to
            500 pieces worldwide.
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
                className="heading-editorial text-2xl"
                style={{ color: "var(--color-text)" }}
              >
                $4,800
              </p>
            </div>
            <div
              className="w-px h-10"
              style={{ backgroundColor: "var(--color-text)", opacity: 0.2 }}
            />
            <div>
              <p
                className="text-label mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Volume
              </p>
              <p
                className="heading-editorial text-2xl"
                style={{ color: "var(--color-text)" }}
              >
                30ml
              </p>
            </div>
          </div>

          <div>
            <button className="magnetic-btn">
              <span>Discover</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
