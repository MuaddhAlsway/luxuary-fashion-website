import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "../../hooks/useMouse";

export default function SmoothCursor() {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {};

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    }
  }, [x, y]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid var(--color-secondary)",
          transition: isHovering
            ? "width 0.3s, height 0.3s, border-radius 0.3s, background 0.3s"
            : "none",
          ...(isHovering
            ? {
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
              }
            : {}),
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--color-secondary)",
        }}
      />
    </>
  );
}
