import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll("[data-reveal]");

    if (children.length === 0) return;

    gsap.set(children, {
      y: options.y ?? 60,
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        y: 0,
        opacity: 1,
        duration: options.duration ?? 1,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [options.y, options.duration, options.delay, options.stagger]);

  return ref;
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
