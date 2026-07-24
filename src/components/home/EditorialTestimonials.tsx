import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Velvet Noir is not a fragrance — it is a portal to another dimension of elegance. I have never received so many compliments on anything I have worn.",
    author: "Isabelle Marchand",
    title: "Editor-in-Chief, La Beauté Magazine",
  },
  {
    quote:
      "In a world of mass production, Maison reminds us that true luxury is personal, rare, and worth every penny.",
    author: "James Thornton",
    title: "The Fragrance Collector",
  },
  {
    quote:
      "The craftsmanship is extraordinary. Each bottle feels like it was made for me alone. This is what perfumery should be.",
    author: "Akiko Tanaka",
    title: "Art Director, Vogue Japan",
  },
];

export default function EditorialTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".testimonial-item").forEach((item: any, i: number) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <p
            className="text-label mb-4 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Press & Praise
          </p>
          <h2
            className="heading-display text-5xl md:text-7xl"
            style={{ color: "var(--color-text)" }}
          >
            Voices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="testimonial-item relative"
            >
              <div
                className="text-6xl heading-display mb-6 leading-none"
                style={{ color: "var(--color-accent)" }}
              >
                &ldquo;
              </div>
              <p
                className="text-body-elegant text-lg mb-8"
                style={{ color: "var(--color-text)", opacity: 0.8 }}
              >
                {testimonial.quote}
              </p>
              <div className="divider-line mb-6" />
              <p
                className="heading-editorial text-lg mb-1"
                style={{ color: "var(--color-text)" }}
              >
                {testimonial.author}
              </p>
              <p
                className="text-label tracking-[0.2em]"
                style={{ color: "var(--color-muted)" }}
              >
                {testimonial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
