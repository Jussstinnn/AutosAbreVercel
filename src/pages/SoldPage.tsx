import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { useSearchVehicles } from "@/hooks/useVehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/common/States";

export default function SoldPage() {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useSearchVehicles({ status: "sold", take: 50 });
  return (
    <>
      <SEO
        title="Vehículos vendidos — Autos Abre"
        description="Historial visual de unidades vendidas por Autos Abre."
      />
      <header className="border-b border-border bg-surface py-16">
        <div className="container-aa">
          <p className="eyebrow">Historial</p>
          <h1 className="headline mt-3 text-4xl md:text-6xl">Vehículos vendidos</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Algunas de las unidades que han encontrado dueño a través de Autos Abre.
          </p>
        </div>
      </header>

      <section className="container-aa py-16">
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data.length === 0 && (
          <EmptyState title="Aún no hay registros de vehículos vendidos" />
        )}
        {!isLoading && !isError && data.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link
            to="/inventario"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
          >
            Ver inventario disponible
          </Link>
        </div>
      </section>
    </>
  );
}
