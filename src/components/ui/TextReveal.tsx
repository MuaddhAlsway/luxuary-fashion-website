import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  tag: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(ref.current, {
        type: "lines,words,chars",
        linesClass: "line",
      });

      gsap.set(split.chars, {
        opacity: 0,
        y: 40,
      });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
