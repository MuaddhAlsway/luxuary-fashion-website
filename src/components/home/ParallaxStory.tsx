import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storySlides } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax-slide").forEach((slide: any) => {
        const img = slide.querySelector(".parallax-img");
        const content = slide.querySelector(".parallax-content");

        gsap.fromTo(
          img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 65%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {storySlides.map((slide, i) => (
        <section
          key={slide.id}
          className="parallax-slide relative h-[80vh] md:h-screen overflow-hidden"
          style={{
            backgroundColor:
              i % 2 === 0 ? "var(--color-bg)" : "var(--color-secondary)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="parallax-img absolute inset-[-15%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor:
                  i % 2 === 0
                    ? "rgba(196,168,130,0.45)"
                    : "rgba(240,235,227,0.5)",
              }}
            />
          </div>

          <div className="parallax-content relative z-10 h-full flex items-center">
            <div
              className={`max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? "md:direction-rtl" : ""
              }`}
            >
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                <p
                  className="text-label mb-4 tracking-[0.3em]"
                  style={{ color: "#1A1A1A" }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(storySlides.length).padStart(2, "0")}
                </p>
                <h2
                  className="heading-display text-5xl md:text-7xl mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  {slide.title}
                </h2>
                <p
                  className="heading-editorial text-xl md:text-2xl mb-8"
                  style={{ color: "var(--color-accent)" }}
                >
                  {slide.subtitle}
                </p>
                <p
                  className="text-body-elegant text-lg max-w-lg"
                  style={{ color: "#1A1A1A" }}
                >
                  {slide.description}
                </p>
              </div>
              <div className={`${i % 2 !== 0 ? "md:order-1" : ""} hidden md:block`} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
