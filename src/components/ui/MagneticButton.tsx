import type { ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMouse";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic();

  return (
    <div ref={magneticRef} className="inline-block">
      <button className={`magnetic-btn ${className}`} onClick={onClick}>
        <span>{children}</span>
      </button>
    </div>
  );
}
