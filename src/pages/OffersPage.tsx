import { Link } from "react-router-dom";
import { BadgePercent, ChevronRight, MessageCircle } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/common/States";
import { useSearchVehicles } from "@/hooks/useVehicles";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export default function OffersPage() {
  const { data, isLoading, isError, refetch } = useSearchVehicles({
    status: "available",
    take: 50,
  });
  const offers = (data ?? []).filter((vehicle) => vehicle.badge === "offer");

  return (
    <>
      <SEO
        title="Ofertas de vehículos — Autos Abre"
        description="Conocé los vehículos con precio especial disponibles en Autos Abre, Cartago."
      />

      <section className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(215,25,32,0.16),transparent_38%)]">
        <div className="container-aa py-12 md:py-16">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Inicio
            </Link>
            <ChevronRight className="size-3" aria-hidden />
            <span className="text-foreground">Ofertas</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-accent">
              <BadgePercent className="size-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Precios especiales
              </p>
            </div>
            <h1 className="headline mt-3 text-5xl md:text-6xl">Ofertas Autos Abre</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Vehículos seleccionados con precio especial. La disponibilidad puede cambiar, por lo
              que recomendamos confirmar cada unidad por WhatsApp antes de visitarnos.
            </p>
          </div>
        </div>
      </section>

      <section className="container-aa py-14 md:py-20">
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}

        {isError && <ErrorState onRetry={() => refetch()} />}

        {!isLoading && !isError && offers.length === 0 && (
          <EmptyState
            title="No hay ofertas activas por el momento"
            description="Podés revisar todo el inventario o escribirnos para conocer las próximas oportunidades."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/inventario"
                  className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-semibold uppercase tracking-wide text-foreground hover:bg-foreground/5"
                >
                  Ver inventario
                </Link>
                <WhatsAppButton
                  message="Hola Autos Abre, quisiera conocer las ofertas disponibles."
                  label="Consultar ofertas"
                />
              </div>
            }
          />
        )}

        {!isLoading && !isError && offers.length > 0 && (
          <>
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Disponibles ahora</p>
                <h2 className="headline mt-2 text-3xl md:text-4xl">
                  {offers.length}{" "}
                  {offers.length === 1 ? "vehículo en oferta" : "vehículos en oferta"}
                </h2>
              </div>
              <WhatsAppButton
                variant="outline"
                message="Hola Autos Abre, quisiera conocer las ofertas disponibles."
                label="Consultar por WhatsApp"
              />
            </header>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offers.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 rounded-md border border-border bg-surface-elevated p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="eyebrow">¿Buscás algo específico?</p>
            <h3 className="headline mt-2 text-2xl md:text-3xl">Contanos qué vehículo necesitás</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Nuestro equipo puede orientarte sobre inventario, financiamiento y próximas unidades.
            </p>
          </div>
          <Link
            to="/contacto"
            className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-accent-hover md:mt-0"
          >
            <MessageCircle className="size-4" aria-hidden /> Contactarnos
          </Link>
        </div>
      </section>
    </>
  );
}
