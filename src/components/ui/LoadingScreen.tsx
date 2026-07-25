import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline();
      tl.to(".loading-brand", {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        delay: 0.4,
      })
        .to(
          ".loading-line",
          {
            scaleX: 0,
            duration: 0.4,
            ease: "power3.in",
          },
          "-=0.3"
        )
        .to(
          ".loading-percent",
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          },
          "-=0.3"
        )
        .to(
          ".loading-screen",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => setVisible(false),
          },
          "-=0.2"
        );
    }
  }, [progress]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".loading-brand",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".loading-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut", delay: 0.4 }
      );
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#1A1A1A",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Decorative diamond */}
      <div className="loading-brand mb-10 opacity-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C4A882"
          strokeWidth="1"
        >
          <path d="M12 2L22 12L12 22L2 12Z" />
        </svg>
      </div>

      <h1
        className="loading-brand heading-display text-6xl md:text-8xl mb-10 opacity-0"
        style={{ color: "#C4A882" }}
      >
        MAISON
      </h1>

      <div
        className="loading-line w-48 h-px mx-auto mb-5 origin-center"
        style={{ backgroundColor: "#C4A882" }}
      />

      <p
        className="loading-percent text-label tracking-[0.4em] opacity-0"
        style={{ color: "#9A8B78" }}
      >
        {Math.min(progress, 100)}%
      </p>
    </div>
  );
}
