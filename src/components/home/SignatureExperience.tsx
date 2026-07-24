import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
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
        ".split-right",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
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
      className="section-padding relative"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
        {/* Left - Video */}
        <div className="split-left relative overflow-hidden rounded-sm md:mr-12">
          <div
            className="aspect-[3/4] bg-cover bg-center"
            style={{
              backgroundColor: "var(--color-accent)",
              backgroundImage: "url(https://images.unsplash.com/photo-1595425959229-4c61df688cde?w=1200&h=1600&fit=crop&q=80)",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(168,161,147,0.3)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center glass-panel cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 ml-1"
                fill="var(--color-text)"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right - Story */}
        <div className="split-right">
          <p
            className="text-label mb-6 tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            The Signature Experience
          </p>
          <h2
            className="heading-display text-4xl md:text-6xl mb-8"
            style={{ color: "var(--color-text)" }}
          >
            A Ritual of
            <br />
            Becoming
          </h2>
          <p
            className="text-body-elegant text-lg mb-6"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Fragrance is not merely applied — it is a ritual. Each morning, as
            the light shifts, our compositions reveal new facets of your
            personality. The opening notes greet the world; the heart notes
            define your character; the base notes linger as your signature.
          </p>
          <p
            className="text-body-elegant text-lg mb-10"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Every bottle from Maison is designed to become part of your daily
            ceremony — an object of beauty that elevates the ordinary into the
            extraordinary.
          </p>
          <MagneticButton>Explore the Ritual</MagneticButton>
        </div>
      </div>
    </section>
  );
}
