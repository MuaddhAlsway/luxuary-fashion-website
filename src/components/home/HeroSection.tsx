import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        ".hero-label",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title-word",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      gsap.to(overlayRef.current, {
        x,
        y,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1920&h=1080&fit=crop&q=80"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(168,161,147,0.3) 0%, rgba(168,161,147,0.6) 50%, rgba(168,161,147,0.85) 100%)",
          }}
        />
      </div>

      {/* Floating Particles Overlay */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: "var(--color-secondary)",
              opacity: Math.random() * 0.4 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <p
          className="hero-label text-label mb-8 tracking-[0.4em]"
          style={{ color: "var(--color-text)" }}
        >
          Established in Grasse, 1987
        </p>

        <h1 className="overflow-hidden mb-8">
          <div className="flex justify-center gap-4 md:gap-6">
            {["THE", "ART", "OF", "SCENT"].map((word, i) => (
              <span
                key={i}
                className="hero-title-word heading-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
                style={{ color: "var(--color-text)" }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        <p
          className="hero-subtitle text-body-elegant text-lg md:text-xl max-w-xl mb-12"
          style={{ color: "var(--color-text)", opacity: 0.8 }}
        >
          Crafted for those who collect memories, not fragrances.
        </p>

        <div className="hero-cta">
          <MagneticButton>Discover Collection</MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span
          className="text-label text-xs tracking-[0.3em]"
          style={{ color: "var(--color-text)", opacity: 0.6 }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ backgroundColor: "var(--color-text)", opacity: 0.3 }}
        >
          <div
            className="absolute top-0 left-0 w-full animate-scroll-line"
            style={{
              height: "40%",
              backgroundColor: "var(--color-text)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
