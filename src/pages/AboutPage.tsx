import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    label: "01",
    title: "Origins",
    subtitle: "A Legacy Born in Grasse",
    description:
      "In 1987, master perfumer Étienne Delacroix left the dominant fragrance houses of Paris to establish something radical: a maison dedicated not to trends, but to truth. In the ancient perfume capital of Grasse, surrounded by jasmine fields and rose gardens, Maison was born from a singular conviction — that fragrance is the most intimate form of art.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop&q=80",
  },
  {
    label: "02",
    title: "Philosophy",
    subtitle: "Scent as Self-Expression",
    description:
      "We believe a fragrance should reveal, not conceal. Each composition is designed to amplify the wearer's unique character — not to mask it. We do not create fragrances for the masses. We create them for the individual — for those who understand that true luxury is personal.",
    image: "https://images.unsplash.com/photo-1595425959229-4c61df688cde?w=800&h=1000&fit=crop&q=80",
  },
  {
    label: "03",
    title: "Craftsmanship",
    subtitle: "Three Decades of Mastery",
    description:
      "Our atelier remains in the same stone building where it was founded. Within these walls, six master perfumers continue traditions passed down through centuries. Each composition is blended by hand, tested across months, and refined until it achieves what Étienne called 'olfactory truth' — a scent that resonates on a molecular and emotional level.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=1000&fit=crop&q=80",
  },
  {
    label: "04",
    title: "The Master Perfumer",
    subtitle: "Étienne Delacroix",
    description:
      "With a vocabulary of over 3,000 raw materials committed to memory, Étienne is one of fewer than fifty living perfumers recognized as a Maître Parfumeur. His compositions are characterized by an architectural precision — each note placed with the deliberation of a master builder, each accord balanced with mathematical grace.",
    image: "https://images.unsplash.com/photo-1594035910387-fa0e7426a2af?w=800&h=1000&fit=crop&q=80",
  },
  {
    label: "05",
    title: "Sustainability",
    subtitle: "Responsibility as Luxury",
    description:
      "True luxury cannot exist without responsibility. We source ingredients through direct partnerships with farmers, ensuring fair wages and sustainable harvesting. Our bottles are crafted from recycled Murano glass. Our packaging uses zero plastic. Every choice we make considers the world we leave behind.",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=1000&fit=crop&q=80",
  },
  {
    label: "06",
    title: "Future Vision",
    subtitle: "The Next Chapter",
    description:
      "As we approach our fourth decade, we are pioneering new frontiers in sustainable luxury — bio-synthesized rare ingredients, carbon-neutral production, and a commitment to ensuring that the art of perfumery thrives for generations to come.",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=1000&fit=crop&q=80",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-title",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".about-hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.utils.toArray(".about-section").forEach((section: any) => {
        gsap.fromTo(
          section.querySelector(".about-img"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          section.querySelector(".about-text"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              once: true,
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={heroRef}>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "var(--color-secondary)",
            backgroundImage: "url(https://images.unsplash.com/photo-1595425959229-4c61df688cde?w=1920&h=1080&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(168,161,147,0.5)" }}
        />
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label mb-6 tracking-[0.4em]"
            style={{ color: "var(--color-muted)" }}
          >
            Our Story
          </p>
          <h1
            className="about-hero-title heading-display text-6xl md:text-9xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            The Art
            <br />
            of Scent
          </h1>
          <p
            className="about-hero-sub text-body-elegant text-xl max-w-lg mx-auto"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Since 1987, we have pursued the impossible — to bottle emotion itself.
          </p>
        </div>
      </section>

      {/* Story Sections */}
      {sections.map((section, i) => (
        <section
          key={section.title}
          className="about-section section-padding"
          style={{
            backgroundColor:
              i % 2 === 0 ? "var(--color-bg)" : "var(--color-secondary)",
          }}
        >
          <div
            className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              i % 2 !== 0 ? "md:direction-rtl" : ""
            }`}
          >
            <div
              className={`about-img relative overflow-hidden rounded-sm ${
                i % 2 !== 0 ? "md:order-2" : ""
              }`}
            >
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundColor: "var(--color-accent)",
                  backgroundImage: `url(${section.image})`,
                }}
              />
            </div>

            <div
              className={`about-text ${i % 2 !== 0 ? "md:order-1" : ""}`}
            >
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-muted)" }}
              >
                {section.label}
              </p>
              <h2
                className="heading-display text-4xl md:text-6xl mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {section.title}
              </h2>
              <p
                className="heading-editorial text-xl mb-8"
                style={{ color: "var(--color-accent)" }}
              >
                {section.subtitle}
              </p>
              <p
                className="text-body-elegant text-lg"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {section.description}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section
        className="section-padding text-center"
        style={{ backgroundColor: "var(--color-deep)" }}
      >
        <p
          className="text-label mb-4 tracking-[0.3em]"
          style={{ color: "var(--color-accent)" }}
        >
          Visit Us
        </p>
        <h2
          className="heading-display text-5xl md:text-7xl mb-8"
          style={{ color: "var(--color-secondary)" }}
        >
          The Atelier
          <br />
          Awaits
        </h2>
        <p
          className="text-body-elegant text-lg max-w-lg mx-auto mb-10"
          style={{ color: "var(--color-muted)" }}
        >
          Book a private consultation and discover the world of Maison. By
          appointment only.
        </p>
        <MagneticButton>Book Consultation</MagneticButton>
      </section>
    </main>
  );
}
