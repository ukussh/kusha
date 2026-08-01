import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]",
  // Hovers to the same white fill as `primary`, so neither button stands out.
  secondary:
    "bg-foreground/5 text-foreground hover:bg-foreground hover:text-background hover:border-foreground backdrop-blur-xl border border-foreground/10 hover:scale-[1.02] active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-foreground/5 backdrop-blur-sm",
};

const sizes = {
  default: "px-5 py-2 text-xs md:px-6 md:py-2.5 md:text-sm",
  lg: "px-6 py-3 text-sm md:px-8 md:py-3.5 md:text-base",
};

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const move = (x: number, y: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        move((e.clientX - rect.left - rect.width / 2) * 0.15, (e.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onMouseLeave={() => move(0, 0)}
      className={`relative overflow-hidden rounded-full font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
