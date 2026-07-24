import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline();
      tl.to(".loading-screen", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.3,
        onComplete: () => setVisible(false),
      });
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className="loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="text-center">
        <h1
          className="heading-display text-6xl md:text-8xl mb-8"
          style={{ color: "var(--color-text)" }}
        >
          MAISON
        </h1>
        <div className="w-48 h-px mx-auto mb-4 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--color-text)", opacity: 0.3 }}
          />
          <div
            className="absolute inset-y-0 left-0"
            style={{
              backgroundColor: "var(--color-text)",
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <p
          className="text-label tracking-[0.4em]"
          style={{ color: "var(--color-muted)" }}
        >
          {progress}%
        </p>
      </div>
    </div>
  );
}
