import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storySlides } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const sections = gsap.utils.toArray(".story-slide");
    const totalWidth = (sections.length - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      sections.forEach((section: any) => {
        gsap.fromTo(
          section.querySelector(".slide-content"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "left center",
              end: "right center",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={scrollRef}
        className="flex h-full"
        style={{ width: `${storySlides.length * 100}vw` }}
      >
        {storySlides.map((slide, index) => (
          <div
            key={slide.id}
            className="story-slide relative flex-shrink-0 w-screen h-full flex items-center"
          >
            <div className="slide-content grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-24 max-w-7xl mx-auto w-full">
              <div className="flex flex-col justify-center">
                <p
                  className="text-label mb-4 tracking-[0.3em]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(storySlides.length).padStart(2, "0")}
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
                  className="text-body-elegant max-w-md"
                  style={{ color: "var(--color-text)", opacity: 0.7 }}
                >
                  {slide.description}
                </p>
              </div>

              <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-sm">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    backgroundImage: `url(${slide.image})`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, rgba(196,168,130,0.4) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
