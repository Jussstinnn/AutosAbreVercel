import { Instagram, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function TopBar() {
  return (
    <div className="hidden border-b border-border bg-black/40 md:block">
      <div className="container-aa flex h-9 items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent" aria-hidden />
            {siteConfig.locationShort}
          </span>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Phone className="size-3.5" aria-hidden />
            {siteConfig.phoneFormatted}
          </a>
          {siteConfig.hours.enabled && siteConfig.hours.weekday && (
            <span className="hidden lg:inline">{siteConfig.hours.weekday}</span>
          )}
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Instagram className="size-3.5" aria-hidden />
          {siteConfig.instagramHandle}
        </a>
      </div>
    </div>
  );
}
