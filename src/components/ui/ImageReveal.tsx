import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export default function ImageReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const clipStart =
      direction === "up"
        ? "inset(100% 0 0 0)"
        : direction === "left"
        ? "inset(0 100% 0 0)"
        : "inset(0 0 0 100%)";

    const clipEnd =
      direction === "up"
        ? "inset(0% 0 0 0)"
        : direction === "left"
        ? "inset(0 0% 0 0)"
        : "inset(0 0 0 0%)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: clipStart },
        {
          clipPath: clipEnd,
          duration: 1.2,
          ease: "power4.inOut",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
