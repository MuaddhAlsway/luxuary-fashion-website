import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const ticker = gsap.ticker.add(() => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.15;

      if (trailRef.current) {
        gsap.set(trailRef.current, {
          x: posRef.current.x - 6,
          y: posRef.current.y - 6,
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div
      ref={trailRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#C4A882",
        opacity: 0.6,
        mixBlendMode: "difference",
      }}
    />
  );
}
