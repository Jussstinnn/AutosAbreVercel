import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Expand,
  MessageCircle,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/seo/SEO";
import { useRelatedVehicles, useVehicleDetail } from "@/hooks/useVehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { VehicleFinanceCalculator } from "@/components/vehicle/VehicleFinanceCalculator";
import { ErrorState, LoadingState } from "@/components/common/States";
import { formatKm, formatPrice } from "@/utils/format";
import { buildVehicleWhatsAppMessage, buildWhatsAppUrl, siteConfig } from "@/config/siteConfig";

export default function VehicleDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, isError, refetch } = useVehicleDetail(id);
  const { data: related = [] } = useRelatedVehicles(id, 4);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setActiveImg(0);
    setLightbox(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const images = vehicle?.images?.filter(Boolean) ?? [];

  const goPrev = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImg((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImg((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [goNext, goPrev, lightbox]);

  if (isLoading) return <LoadingState label="Cargando vehículo…" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!vehicle) {
    return (
      <div className="container-aa py-24 text-center">
        <SEO title="Vehículo no encontrado — Autos Abre" />
        <h1 className="headline text-4xl">Vehículo no encontrado</h1>
        <p className="mt-3 text-muted-foreground">
          El vehículo que buscás ya no está disponible o el enlace cambió.
        </p>
        <Link
          to="/inventario"
          className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
        >
          Ver inventario
        </Link>
      </div>
    );
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  const price = formatPrice(vehicle.price, vehicle.currency);
  const waMsg = buildVehicleWhatsAppMessage({
    title: vehicleName,
    id: vehicle.id,
    price,
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  const shareVehicle = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: vehicleName,
          text: `Mirá este vehículo en Autos Abre: ${vehicleName}`,
          url,
        });
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }
    window.open(
      buildWhatsAppUrl(`Mirá este vehículo en Autos Abre: ${vehicleName} ${url}`),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 45) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  const jsonLd =
    vehicle.price > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Vehicle",
          name: vehicleName,
          brand: vehicle.brand,
          model: vehicle.model,
          vehicleModelDate: String(vehicle.year),
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: vehicle.km,
            unitCode: "KMT",
          },
          offers: {
            "@type": "Offer",
            price: vehicle.price,
            priceCurrency: vehicle.currency,
            availability: "https://schema.org/InStock",
          },
        }
      : undefined;

  return (
    <>
      <SEO
        title={`${vehicleName} — Autos Abre`}
        description={vehicle.description.slice(0, 160)}
        ogImage={images[0]}
        jsonLd={jsonLd}
      />

      <div className="container-aa pb-32 pt-8 md:pb-20">
        <nav
          className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          aria-label="Navegación secundaria"
        >
          <Link to="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="size-3" />
          <Link to="/inventario" className="hover:text-foreground">
            Inventario
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">
            {vehicle.brand} {vehicle.model}
          </span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <div className="min-w-0">
            <div
              className="group relative overflow-hidden rounded-md border border-border bg-[#0d0f12]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {images.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="block aspect-[4/3] w-full cursor-zoom-in"
                  aria-label="Ampliar imagen"
                >
                  <img
                    src={images[activeImg]}
                    alt={`${vehicleName}, fotografía ${activeImg + 1}`}
                    className="size-full object-contain"
                    decoding="async"
                  />
                </button>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center text-sm text-muted-foreground">
                  Imagen no disponible
                </div>
              )}

              {images.length > 0 && (
                <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="size-3" /> Ampliar
                </span>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/65 p-2 text-white backdrop-blur transition-colors hover:bg-black/85"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/65 p-2 text-white backdrop-blur transition-colors hover:bg-black/85"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-1 text-xs text-white">
                    {activeImg + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setActiveImg(index)}
                    className={`h-20 w-24 shrink-0 snap-start overflow-hidden rounded border bg-[#0d0f12] transition-colors ${
                      index === activeImg
                        ? "border-accent ring-1 ring-accent"
                        : "border-border hover:border-foreground/30"
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                    aria-current={index === activeImg}
                  >
                    <img
                      src={image}
                      alt=""
                      className="size-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-10">
              <h2 className="headline text-2xl">Descripción</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {vehicle.description}
              </p>

              {vehicle.highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground">
                    Lo más destacado
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {vehicle.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground">
                  Ficha técnica
                </h3>
                <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 rounded-md border border-border bg-surface-elevated p-5 sm:grid-cols-2">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-4 border-b border-border/50 py-2 text-sm"
                    >
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="text-right text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {vehicle.equipment.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground">
                    Equipamiento
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicle.equipment.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-border bg-surface-elevated p-5 shadow-card md:p-6">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {vehicle.brand} · {vehicle.year} · Stock {vehicle.stockId}
              </p>
              <h1 className="headline mt-2 text-2xl md:text-3xl">
                {vehicle.brand} {vehicle.model}
              </h1>
              {vehicle.version && vehicle.version !== vehicle.model && (
                <p className="mt-1 text-sm text-muted-foreground">{vehicle.version}</p>
              )}

              {vehicle.badge === "new" && (
                <span className="mt-3 inline-flex rounded-sm border border-amber-300/60 bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black">
                  Nuevo ingreso
                </span>
              )}

              <div className="mt-5 border-y border-border py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {vehicle.previousPrice ? "Precio especial" : "Precio de venta"}
                  </p>
                  {vehicle.previousPrice && (
                    <span className="rounded-sm bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Oferta
                    </span>
                  )}
                </div>
                {vehicle.previousPrice && (
                  <p className="mt-2 text-sm text-muted-foreground line-through decoration-accent/70">
                    Antes {formatPrice(vehicle.previousPrice, vehicle.currency)}
                  </p>
                )}
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-3xl font-bold md:text-4xl">{price}</span>
                  {vehicle.monthlyPayment && vehicle.monthlyPayment > 0 && (
                    <span className="text-xs text-muted-foreground">
                      referencia desde {formatPrice(vehicle.monthlyPayment, vehicle.currency)}/mes
                    </span>
                  )}
                </div>
              </div>

              <ul className="my-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-muted-foreground">
                <li>
                  <span className="block font-semibold text-foreground">
                    {formatKm(vehicle.km)}
                  </span>
                  Kilometraje
                </li>
                <li>
                  <span className="block font-semibold text-foreground">
                    {vehicle.transmission}
                  </span>
                  Transmisión
                </li>
                <li>
                  <span className="block font-semibold text-foreground">{vehicle.fuel}</span>
                  Combustible
                </li>
                <li>
                  <span className="block font-semibold text-foreground">{vehicle.traction}</span>
                  Tracción
                </li>
              </ul>

              <div className="space-y-2">
                <a
                  href={buildWhatsAppUrl(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
                >
                  <MessageCircle className="size-4" /> Consultar por WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
                >
                  <Phone className="size-4" /> Llamar
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-xs transition-colors hover:bg-foreground/5"
                  >
                    <Copy className="size-3.5" /> Copiar enlace
                  </button>
                  <button
                    type="button"
                    onClick={shareVehicle}
                    className="flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-xs transition-colors hover:bg-foreground/5"
                  >
                    <Share2 className="size-3.5" /> Compartir
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <VehicleFinanceCalculator
                  price={vehicle.price}
                  currency={vehicle.currency}
                  vehicleName={vehicleName}
                />
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="headline text-2xl md:text-3xl">Vehículos relacionados</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <VehicleCard key={item.id} vehicle={item} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 backdrop-blur lg:hidden">
        <div className="container-aa flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase text-muted-foreground">Precio</p>
            <p className="truncate text-base font-bold">{price}</p>
          </div>
          <a
            href={buildWhatsAppUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        </div>
      </div>

      {lightbox && images.length > 0 && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${vehicleName}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar galería"
          >
            <X />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-6"
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-6"
                aria-label="Imagen siguiente"
              >
                <ChevronRight />
              </button>
            </>
          )}
          <img
            src={images[activeImg]}
            alt={`${vehicleName}, fotografía ampliada ${activeImg + 1}`}
            className="max-h-[88vh] max-w-[94vw] select-none object-contain"
            draggable={false}
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-white/10 px-3 py-1 text-xs text-white">
            {activeImg + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
