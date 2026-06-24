import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/siteConfig";

interface Props {
  message?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline" | "ghost" | "compact";
  iconOnly?: boolean;
}

export function WhatsAppButton({
  message,
  label = "WhatsApp",
  className = "",
  variant = "solid",
  iconOnly = false,
}: Props) {
  const styles =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:bg-[#1ebe5b]"
      : variant === "outline"
        ? "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
        : variant === "compact"
          ? "bg-[#25D366] text-white hover:bg-[#1ebe5b] px-3 py-2 text-xs"
          : "text-[#25D366] hover:bg-[#25D366]/10";
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-md font-medium transition-colors ${
        variant === "compact" ? "" : "px-4 py-2.5 text-sm"
      } ${styles} ${className}`}
    >
      <MessageCircle className="size-4" aria-hidden />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
