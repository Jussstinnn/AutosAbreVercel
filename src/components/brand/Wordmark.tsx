import { siteConfig } from "@/config/siteConfig";

interface WordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Wordmark temporal para Autos Abre.
 * Reemplazá este componente con <img src={logoUrl} /> cuando exista el logo oficial.
 */
export function Wordmark({ className = "", size = "md" }: WordmarkProps) {
  const sizes = {
    sm: "text-base tracking-[0.25em]",
    md: "text-xl tracking-[0.28em]",
    lg: "text-3xl md:text-4xl tracking-[0.3em]",
  };
  return (
    <span
      className={`font-display font-bold uppercase ${sizes[size]} ${className}`}
      aria-label={siteConfig.name}
    >
      <span className="text-foreground">AUTOS</span>
      <span className="text-accent">·</span>
      <span className="text-foreground">ABRE</span>
    </span>
  );
}
