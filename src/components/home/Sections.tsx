import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  HandCoins,
  Instagram,
  MapPin,
  MessageCircle,
  Repeat,
  Sparkles,
  BadgePercent,
} from "lucide-react";
import editorialEveryday from "@/assets/editorial-everyday.jpg";
import editorialPassion from "@/assets/editorial-passion.jpg";
import tradeinImg from "@/assets/tradein.jpg";
import { useFeaturedVehicles, useSearchVehicles } from "@/hooks/useVehicles";
import { mockVehicles } from "@/data/mockVehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/common/States";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/config/siteConfig";

export function EditorialSplit() {
  return (
    <section className="container-aa py-12 md:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        <article className="group relative overflow-hidden rounded-md border border-border">
          <img
            src={editorialEveryday}
            alt="SUV en montaña al atardecer"
            loading="lazy"
            className="aspect-[4/3] size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="eyebrow">Día a día</p>
            <h3 className="headline mt-2 text-3xl md:text-4xl">Tu próximo carro</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Inventario seleccionado para la familia, el trabajo y la aventura. Opciones
              confiables, con financiamiento y posibilidad de recibir tu vehículo en parte de pago.
            </p>
            <Link
              to="/inventario"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-accent"
            >
              Ver inventario <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-md border border-border">
          <img
            src={editorialPassion}
            alt="Detalle de rueda deportiva"
            loading="lazy"
            className="aspect-[4/3] size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="eyebrow">Cultura automotriz</p>
            <h3 className="headline mt-2 text-3xl md:text-4xl">Pasión Autos Abre</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Una selección editorial dedicada a vehículos especiales, deportivos y unidades que
              despiertan algo más. Contenido visual, no inventario comercial.
            </p>
            <Link
              to="/coleccion"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-accent"
            >
              Descubrir la colección <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export function FeaturedVehicles() {
  const { data, isLoading, isError, refetch } = useFeaturedVehicles(8);
  return (
    <section className="container-aa py-12 md:py-20">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Selección destacada</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Vehículos destacados</h2>
        </div>
        <Link
          to="/inventario"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent"
        >
          Ver todo el inventario <ArrowRight className="size-4" />
        </Link>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data && data.length === 0 && (
        <EmptyState
          title="Aún no hay vehículos destacados"
          description="Mientras tanto, podés explorar todo el inventario."
          action={
            <Link
              to="/inventario"
              className="rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground"
            >
              Ver inventario
            </Link>
          }
        />
      )}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </section>
  );
}

export function NewArrivals() {
  const { data } = useSearchVehicles({ status: "available", take: 24 });
  const newOnes = (data ?? []).filter((v) => v.badge === "new").slice(0, 6);
  if (newOnes.length === 0) return null;
  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="container-aa">
        <header className="mb-10">
          <p className="eyebrow">Recién ingresados</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Nuevos ingresos</h2>
        </header>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {newOnes.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersSection() {
  const { data } = useSearchVehicles({ status: "available", take: 30 });
  const offers = (data ?? []).filter((vehicle) => vehicle.badge === "offer").slice(0, 4);

  if (offers.length === 0) return null;

  return (
    <section className="border-y border-accent/20 bg-[linear-gradient(135deg,rgba(215,25,32,0.10),transparent_55%)] py-12 md:py-20">
      <div className="container-aa">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <BadgePercent className="size-4" aria-hidden />
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                Oportunidades
              </p>
            </div>
            <h2 className="headline mt-2 text-3xl md:text-4xl">Vehículos en oferta</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Unidades seleccionadas con precio especial por tiempo limitado. Consultá
              disponibilidad y condiciones directamente con nuestro equipo.
            </p>
          </div>
          <Link
            to="/ofertas"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-red-300"
          >
            Ver todas las ofertas <ArrowRight className="size-4" />
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    { n: "01", title: "Explorá el inventario", desc: "Buscá por marca, modelo, año o categoría." },
    {
      n: "02",
      title: "Consultá y coordiná una visita",
      desc: "Escribinos por WhatsApp para coordinar inspección y prueba.",
    },
    {
      n: "03",
      title: "Revisá opciones de pago y entrega",
      desc: "Conversamos financiamiento, parte de pago y trámites.",
    },
  ];
  return (
    <section className="container-aa py-12 md:py-20">
      <header className="mb-10">
        <p className="eyebrow">Cómo funciona</p>
        <h2 className="headline mt-2 text-3xl md:text-4xl">Proceso simple, directo</h2>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-md border border-border bg-surface-elevated p-6">
            <span className="font-display text-5xl text-accent">{s.n}</span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TradeInBanner() {
  return (
    <section className="container-aa py-12 md:py-20">
      <div className="grid items-stretch overflow-hidden rounded-md border border-border md:grid-cols-2">
        <div className="relative min-h-[210px] sm:min-h-[260px]">
          <img
            src={tradeinImg}
            alt="Entrega de llaves de vehículo"
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <div className="bg-surface-elevated p-8 md:p-10">
          <p className="eyebrow">Recibimos tu vehículo</p>
          <h3 className="headline mt-2 text-3xl">Parte de pago o compra directa</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Coordiná una valoración rápida. Recibimos vehículos en parte de pago sujeto a
            inspección. Compartinos los datos básicos y te respondemos por WhatsApp.
          </p>
          <Link
            to="/vender"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
          >
            Cotizar mi vehículo <ArrowRight className="size-4" />
          </Link>
          <div className="mt-3">
            <WhatsAppButton
              variant="outline"
              message="Hola, quisiera consultar por entregar mi vehículo en parte de pago."
              label="Consultar por WhatsApp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinancingTeaser() {
  return (
    <section className="container-aa py-12 md:py-20">
      <div className="rounded-md border border-border bg-gradient-to-br from-surface-elevated to-surface p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <p className="eyebrow">Financiamiento</p>
            <h3 className="headline mt-2 text-3xl md:text-4xl">
              Alternativas de pago, sujetas a evaluación
            </h3>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Te orientamos sobre opciones de financiamiento. La aprobación depende del análisis de
              cada entidad financiera. Calculá una cuota aproximada y conversemos.
            </p>
            <Link
              to="/financiamiento"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
            >
              Solicitar pre-evaluación <ArrowRight className="size-4" />
            </Link>
          </div>
          <FinancingMiniCalc />
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { monthlyPayment } from "@/utils/format";

function FinancingMiniCalc() {
  const [price, setPrice] = useState(25000);
  const [down, setDown] = useState(5000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(12);
  const cuota = monthlyPayment({ price, down, months, annualRate: rate });
  return (
    <div className="rounded-md border border-border bg-background p-6">
      <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
        Calculadora orientativa
      </h4>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field label="Precio (USD)" value={price} onChange={setPrice} />
        <Field label="Prima (USD)" value={down} onChange={setDown} />
        <Field label="Plazo (meses)" value={months} onChange={setMonths} />
        <Field label="Tasa anual %" value={rate} onChange={setRate} />
      </div>
      <div className="mt-5 rounded-md bg-accent/10 p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Cuota aprox.</p>
        <p className="mt-1 font-display text-3xl text-accent">
          ${cuota.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          <span className="text-base"> /mes</span>
        </p>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Cálculo aproximado. Sujeto a condiciones y aprobación de la entidad financiera.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-10 w-full rounded-md border border-border bg-surface-elevated px-3 text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}

export function WhyAutosAbre() {
  const items = [
    {
      icon: MessageCircle,
      title: "Atención directa",
      desc: "Conversación cercana por WhatsApp y en local.",
    },
    { icon: Sparkles, title: "Variedad real", desc: "Del día a día hasta unidades especiales." },
    {
      icon: Repeat,
      title: "Recibimos vehículos",
      desc: "Posibilidad de parte de pago sujeta a valoración.",
    },
    {
      icon: CreditCard,
      title: "Alternativas de pago",
      desc: "Opciones de financiamiento sujetas a evaluación.",
    },
    { icon: MapPin, title: "Cartago", desc: "Atención personalizada en La Lima de Cartago." },
    { icon: HandCoins, title: "Comunicación clara", desc: "Sin promesas que no podamos cumplir." },
  ];
  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="container-aa">
        <header className="mb-10">
          <p className="eyebrow">Por qué Autos Abre</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Una manera distinta de comprar</h2>
        </header>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-md border border-border bg-surface-elevated p-6">
              <it.icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramStrip() {
  const items = [mockVehicles[0], mockVehicles[1], mockVehicles[3], mockVehicles[6], mockVehicles[8], mockVehicles[16]].filter(Boolean);
  return (
    <section className="container-aa py-12 md:py-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Comunidad</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Síguenos en Instagram</h2>
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-elevated px-4 py-2 text-sm font-medium hover:bg-foreground/5"
        >
          <Instagram className="size-4" /> {siteConfig.instagramHandle}
        </a>
      </header>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((v, i) => (
          <a
            key={i}
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-md border border-border"
            aria-label="Abrir Instagram de Autos Abre"
          >
            <img
              src={v.image}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/60">
              <Instagram className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function LocationBlock() {
  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="container-aa grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <p className="eyebrow">Visitanos</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">{siteConfig.locationShort}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{siteConfig.address}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-4 text-accent" aria-hidden />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {siteConfig.phoneFormatted}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-4 text-accent" aria-hidden />
              <a
                href={`tel:${siteConfig.secondaryPhone.replace(/\s/g, "")}`}
                className="hover:text-accent"
              >
                {siteConfig.secondaryPhoneFormatted}
              </a>
            </li>
            {siteConfig.hours.enabled && (
              <li className="text-muted-foreground">{siteConfig.hours.weekday}</li>
            )}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-foreground/5"
            >
              Abrir en Waze
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-foreground/5"
            >
              Abrir en Google Maps
            </a>
            <WhatsAppButton variant="solid" />
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-md border border-border bg-background sm:min-h-[360px]">
          <iframe
            title="Mapa de Autos Abre en La Lima de Cartago"
            src={siteConfig.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[0.15] contrast-[1.05]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border bg-background py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(215,25,32,0.15),transparent_60%)]" />
      <div className="container-aa text-center">
        <h2 className="final-cta-title text-4xl text-foreground md:text-6xl">
          <span>Tu próximo carro</span>
          <span>puede estar acá</span>
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/inventario"
            className="inline-flex items-center justify-center rounded-md bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
          >
            Ver inventario
          </Link>
          <WhatsAppButton
            message="Hola Autos Abre, vi su sitio y me gustaría más información."
            label="Escribir por WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
