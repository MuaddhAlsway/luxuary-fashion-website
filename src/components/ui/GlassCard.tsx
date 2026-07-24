import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-sm p-8 transition-all duration-500 ${
        hover
          ? "hover:bg-white/12 hover:scale-[1.02] hover:shadow-2xl"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
