import { Link } from "react-router-dom";
import {
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Fuel,
  Gauge,
  Landmark,
  Percent,
  RefreshCcw,
  Settings2,
  Sparkles,
  Tag,
} from "lucide-react";
import type { VehicleCard as VehicleCardType } from "@/types/vehicle";
import { formatKm, formatPrice } from "@/utils/format";
import { buildVehicleWhatsAppMessage, buildWhatsAppUrl } from "@/config/siteConfig";

const FALLBACK =
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80";

function badgeMeta(badge: VehicleCardType["badge"]) {
  switch (badge) {
    case "new":
      return {
        label: "Nuevo ingreso",
        className: "border-amber-300/70 bg-amber-400 text-black",
        icon: Sparkles,
      };
    case "offer":
      return {
        label: "Oferta especial",
        className: "border-red-300/55 bg-accent text-white",
        icon: Percent,
      };
    case "reserved":
      return {
        label: "Reservado",
        className: "border-sky-300/50 bg-sky-500 text-white",
        icon: Clock3,
      };
    case "sold":
      return {
        label: "Vendido",
        className: "border-zinc-400/40 bg-zinc-700 text-white",
        icon: CheckCircle2,
      };
    default:
      return null;
  }
}

export function VehicleCard({ vehicle }: { vehicle: VehicleCardType }) {
  const price = formatPrice(vehicle.price, vehicle.currency);
  const previousPrice = vehicle.previousPrice
    ? formatPrice(vehicle.previousPrice, vehicle.currency)
    : null;
  const discount =
    vehicle.previousPrice && vehicle.price > 0
      ? Math.max(
          1,
          Math.round(((vehicle.previousPrice - vehicle.price) / vehicle.previousPrice) * 100),
        )
      : null;
  const badge = badgeMeta(vehicle.badge);
  const BadgeIcon = badge?.icon;
  const waMsg = buildVehicleWhatsAppMessage({
    title: vehicle.title,
    id: vehicle.id,
    price,
  });

  return (
    <article
      className={`group relative overflow-hidden rounded-md border bg-surface-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(215,25,32,0.42)] ${
        vehicle.badge === "offer"
          ? "border-accent/55"
          : vehicle.badge === "new"
            ? "border-amber-400/45"
            : "border-border hover:border-accent/45"
      }`}
    >
      <Link
        to={`/vehiculo/${vehicle.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${vehicle.title}`}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={vehicle.image || FALLBACK}
          onError={(event) => {
            event.currentTarget.src = FALLBACK;
          }}
          alt={vehicle.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

        {badge && BadgeIcon && (
          <span
            className={`absolute left-3 top-3 inline-flex min-h-7 items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-lg ${badge.className}`}
          >
            <BadgeIcon className="size-3.5" aria-hidden />
            {badge.label}
          </span>
        )}

        {discount && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-sm border border-red-300/35 bg-accent/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur">
            <BadgeDollarSign className="size-3.5" aria-hidden /> Ahorrás {discount}%
          </span>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {vehicle.brand} · {vehicle.year}
          </p>
          <h3 className="mt-1 line-clamp-1 font-display text-xl uppercase tracking-tight text-foreground">
            {vehicle.model}
          </h3>
        </div>

        <div className="min-h-[48px]">
          {previousPrice && (
            <p className="text-xs font-medium text-muted-foreground line-through decoration-accent/70">
              Antes {previousPrice}
            </p>
          )}
          <div className="mt-0.5 flex items-end justify-between gap-3">
            <span className={`font-bold text-foreground ${previousPrice ? "text-2xl" : "text-xl"}`}>
              {price}
            </span>
            {vehicle.badge === "offer" && (
              <span className="rounded-sm border border-accent/25 bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Precio oferta
              </span>
            )}
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-2 border-y border-border py-3 text-[12px] text-muted-foreground">
          <li className="flex min-w-0 items-center gap-1.5">
            <Gauge className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{formatKm(vehicle.km)}</span>
          </li>
          <li className="flex min-w-0 items-center gap-1.5">
            <Settings2 className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{vehicle.transmission}</span>
          </li>
          <li className="flex min-w-0 items-center gap-1.5">
            <Fuel className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{vehicle.fuel}</span>
          </li>
          {vehicle.traction && (
            <li className="flex min-w-0 items-center gap-1.5">
              <Tag className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{vehicle.traction}</span>
            </li>
          )}
        </ul>

        {(vehicle.offersFinancing || vehicle.receivesTradeIn) && (
          <div className="flex flex-wrap gap-2">
            {vehicle.offersFinancing && (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-400/20 bg-emerald-400/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <Landmark className="size-3" aria-hidden /> Financiamiento
              </span>
            )}
            {vehicle.receivesTradeIn && (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-sky-400/20 bg-sky-400/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
                <RefreshCcw className="size-3" aria-hidden /> Recibimos vehículo
              </span>
            )}
          </div>
        )}

        <div className="relative z-20 flex gap-2 pt-1">
          <Link
            to={`/vehiculo/${vehicle.id}`}
            className="flex min-h-10 flex-1 items-center justify-center rounded-md bg-foreground/5 px-3 text-center text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Ver vehículo
          </Link>
          <a
            href={buildWhatsAppUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar ${vehicle.title} por WhatsApp`}
            className="inline-flex size-10 items-center justify-center rounded-md bg-[#25D366]/15 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.46 0 .15 5.31.15 11.91a11.85 11.85 0 0 0 1.6 5.96L0 24l6.32-1.65a11.92 11.92 0 0 0 5.74 1.46h.01c6.6 0 11.92-5.32 11.92-11.92 0-3.18-1.24-6.17-3.47-8.41ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.38a9.85 9.85 0 0 1-1.52-5.25c0-5.46 4.43-9.91 9.9-9.91 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.47-4.44 9.9-9.9 9.9Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.05 9.05 0 0 1-1.67-2.07c-.18-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
