import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rituals = [
  {
    step: "01",
    title: "Pulse Points",
    subtitle: "Where Heat Meets Art",
    description:
      "Apply fragrance to your pulse points — wrists, inner elbows, behind the ears, and the base of the throat. The warmth of your blood amplifies the scent, creating a natural diffusion that follows you throughout the day.",
    tip: "Never rub your wrists together — it crushes the delicate top notes and distorts the fragrance architecture.",
    image: "/images/img1.jpg",
  },
  {
    step: "02",
    title: "The Scent Cloud",
    subtitle: "A Mist of Intention",
    description:
      "Hold the bottle 6-8 inches from your body and mist into the air above you, then walk through the cloud. This technique creates an even, ethereal application — ideal for lighter compositions and daytime wear.",
    tip: "For evening events, mist twice: once at chest height, once above your head.",
    image: "/images/img2.jpg",
  },
  {
    step: "03",
    title: "Layering",
    subtitle: "Building Complexity",
    description:
      "Layer fragrances to create a signature that is uniquely yours. Start with a matching scented body lotion, then apply the fragrance. The lotion extends longevity while the perfume adds depth and projection.",
    tip: "Pair lighter top-note fragrances with richer base-note layers for a dynamic, evolving scent.",
    image: "/images/img3.jpg",
  },
  {
    step: "04",
    title: "Seasonal Rotation",
    subtitle: "Listen to the Weather",
    description:
      "Your fragrance wardrobe should shift with the seasons. Rich ouds and ambers for winter warmth. Fresh citruses and florals for summer air. Woody compositions for autumn's earth. Your nose knows — trust it.",
    tip: "Cold weather mutes projection, so apply slightly more in winter. Heat amplifies — go lighter in summer.",
    image: "/images/img4.jpg",
  },
];

const timeline = [
  { hour: "0h", label: "Top Notes", desc: "The bright opening — citrus, spices, herbs" },
  { hour: "1-3h", label: "Heart Notes", desc: "The emotional core — florals, fruits, spices" },
  { hour: "4-8h", label: "Base Notes", desc: "The lingering signature — woods, amber, musk" },
  { hour: "8h+", label: "Skin Scent", desc: "The intimate whisper — only you can smell this" },
];

export default function RitualsPage() {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ritual-hero-title",
        { y: 120, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".ritual-hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".ritual-hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut", delay: 1 }
      );
      gsap.fromTo(
        ".ritual-hero-scroll",
        { y: 0 },
        {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        }
      );

      gsap.utils.toArray(".ritual-fullbleed").forEach((section: any) => {
        const img = section.querySelector(".ritual-bg-image");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          section.querySelector(".ritual-content"),
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          section.querySelector(".ritual-step-num"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".ritual-divider").forEach((divider: any) => {
        gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".timeline-item").forEach((item: any, i: number) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-line",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".ritual-cta",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ritual-cta",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundColor: "var(--color-deep)",
            backgroundImage: "url(/images/img5.jpg)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.95) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6">
          <p
            className="ritual-hero-sub text-label mb-8 tracking-[0.5em]"
            style={{ color: "var(--color-accent)" }}
          >
            {t("rituals.heroLabel")}
          </p>
          <h1
            className="ritual-hero-title heading-display text-7xl md:text-[10rem] lg:text-[12rem] leading-[0.85] mb-8"
            style={{ color: "var(--color-secondary)" }}
          >
            {t("rituals.heroTitle")}
          </h1>
          <div
            className="ritual-hero-line w-24 h-px mx-auto mb-8"
            style={{ backgroundColor: "var(--color-accent)", transformOrigin: "center" }}
          />
          <p
            className="ritual-hero-sub text-body-elegant text-xl md:text-2xl max-w-xl mx-auto"
            style={{ color: "var(--color-muted)" }}
          >
            {t("rituals.heroSub")}
          </p>
        </div>

        <div
          className="ritual-hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p
            className="text-label tracking-[0.3em]"
            style={{ color: "var(--color-muted)" }}
          >
            Scroll
          </p>
          <div
            className="w-px h-10"
            style={{ backgroundColor: "var(--color-accent)", opacity: 0.5 }}
          />
        </div>
      </section>

      {/* Intro Line */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="max-w-[800px] mx-auto text-center">
          <p
            className="text-body-elegant text-xl md:text-2xl italic"
            style={{ color: "var(--color-text)", opacity: 0.8 }}
          >
            Fragrance is not merely applied — it is performed. Each gesture,
            each moment of the day, becomes part of an intimate ceremony
            that defines who you are.
          </p>
        </div>
      </section>

      {/* Ritual Steps — Full-bleed cinematic */}
      {rituals.map((ritual, i) => (
        <section
          key={ritual.step}
          className="ritual-fullbleed relative min-h-screen flex items-center overflow-hidden"
          style={{
            backgroundColor:
              i % 2 === 0 ? "var(--color-bg)" : "var(--color-secondary)",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="ritual-bg-image absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${ritual.image})`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(to right, rgba(192,175,155,0.95) 0%, rgba(192,175,155,0.7) 40%, transparent 70%)"
                    : "linear-gradient(to left, rgba(240,235,227,0.95) 0%, rgba(240,235,227,0.7) 40%, transparent 70%)",
              }}
            />
          </div>

          <div
            className={`ritual-content relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 ${
              i % 2 === 0 ? "" : "ml-auto"
            }`}
          >
            <div
              className={`max-w-[500px] ${
                i % 2 === 0 ? "" : "ml-auto text-right"
              }`}
            >
              <span
                className="ritual-step-num heading-display text-[8rem] md:text-[12rem] leading-none block mb-[-2rem] md:mb-[-4rem]"
                style={{
                  color: "var(--color-text)",
                  opacity: 0.08,
                }}
              >
                {ritual.step}
              </span>
              <p
                className="text-label mb-4 tracking-[0.3em]"
                style={{ color: "var(--color-accent)" }}
              >
                Step {ritual.step}
              </p>
              <h2
                className="heading-display text-5xl md:text-7xl mb-3"
                style={{ color: "var(--color-text)" }}
              >
                {ritual.title}
              </h2>
              <p
                className="heading-editorial text-xl mb-8"
                style={{ color: "var(--color-accent)" }}
              >
                {ritual.subtitle}
              </p>
              <p
                className="text-body-elegant text-lg mb-10 leading-relaxed"
                style={{ color: "var(--color-text)", opacity: 0.75 }}
              >
                {ritual.description}
              </p>

              {/* Pro Tip Card */}
              <div
                className="relative p-8 rounded-sm overflow-hidden"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? "rgba(26,26,26,0.06)"
                      : "rgba(139,26,43,0.04)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <p
                  className="text-label mb-3 tracking-[0.2em]"
                  style={{ color: "var(--color-accent)" }}
                >
                  Pro Tip
                </p>
                <p
                  className="text-body-elegant italic"
                  style={{ color: "var(--color-text)", opacity: 0.8 }}
                >
                  {ritual.tip}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Decorative Divider */}
      <div
        className="ritual-divider w-full h-px"
        style={{
          backgroundColor: "var(--color-accent)",
          opacity: 0.3,
          transformOrigin: "center",
        }}
      />

      {/* Fragrance Evolution Timeline */}
      <section
        className="section-padding overflow-hidden"
        style={{ backgroundColor: "var(--color-deep)" }}
      >
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-20">
            <p
              className="text-label mb-4 tracking-[0.4em]"
              style={{ color: "var(--color-accent)" }}
            >
              {t("rituals.timelineLabel")}
            </p>
            <h2
              className="heading-display text-5xl md:text-7xl"
              style={{ color: "var(--color-secondary)" }}
            >
              {t("rituals.timelineTitle")}
            </h2>
          </div>

          <div className="relative">
            {/* Animated Vertical Line */}
            <div
              className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
              style={{ backgroundColor: "var(--color-accent)", opacity: 0.4 }}
            />

            {timeline.map((item, i) => (
              <div
                key={item.hour}
                className={`timeline-item relative flex items-start gap-8 mb-20 last:mb-0 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-1 z-10"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    boxShadow: "0 0 0 6px rgba(196,168,130,0.15)",
                  }}
                />

                <div
                  className={`flex-1 pl-16 md:pl-0 ${
                    i % 2 === 0
                      ? "md:text-right md:pr-20"
                      : "md:text-left md:pl-20"
                  }`}
                >
                  <p
                    className="heading-editorial text-3xl mb-2"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {item.hour}
                  </p>
                  <h3
                    className="heading-display text-3xl md:text-4xl mb-3"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="text-body-elegant text-lg"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="ritual-cta relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="relative z-10 text-center px-6">
          <div
            className="ritual-divider w-16 h-px mx-auto mb-8"
            style={{
              backgroundColor: "var(--color-accent)",
              transformOrigin: "center",
            }}
          />
          <h2
            className="heading-display text-5xl md:text-7xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Begin Your Ritual
          </h2>
          <p
            className="text-body-elegant text-xl max-w-lg mx-auto mb-10"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Every masterpiece begins with intention. Discover the fragrance
            that speaks to your soul.
          </p>
          <a
            href="/en/collection"
            className="inline-block border px-10 py-4 text-label tracking-[0.2em] transition-all duration-500 hover:bg-[var(--color-text)] hover:text-[var(--color-secondary)]"
            style={{
              borderColor: "var(--color-text)",
              color: "var(--color-text)",
            }}
          >
            Explore Collection
          </a>
        </div>
      </section>
    </main>
  );
}
