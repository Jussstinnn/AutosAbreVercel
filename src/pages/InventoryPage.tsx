import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Filter, Search, X } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { useSearchVehicles } from "@/hooks/useVehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/common/States";
import { VEHICLE_CATEGORIES, type VehicleSearchFilters } from "@/types/vehicle";
import { mockVehicles } from "@/data/mockVehicles";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=480&q=75";

type SortKey = "newest" | "offers-first" | "price-asc" | "price-desc" | "year-desc" | "km-asc";

export default function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest");
  const [pageSize, setPageSize] = useState(12);

  const filters: VehicleSearchFilters = useMemo(
    () => ({
      q: (search.q as string) || undefined,
      brand: (search.brand as string) || undefined,
      category: (search.category as string) || undefined,
      yearFrom: search.yearFrom ? Number(search.yearFrom) : undefined,
      yearTo: search.yearTo ? Number(search.yearTo) : undefined,
      minUsd: search.minUsd ? Number(search.minUsd) : undefined,
      maxUsd: search.maxUsd ? Number(search.maxUsd) : undefined,
      transmission: (search.transmission as string) || undefined,
      status: (search.status as string as VehicleSearchFilters["status"]) || "available",
      take: 100,
    }),
    [search],
  );

  const { data = [], isLoading, isError, refetch } = useSearchVehicles(filters);

  const brands = useMemo(() => Array.from(new Set(mockVehicles.map((v) => v.brand))).sort(), []);

  const sorted = useMemo(() => {
    const arr = [...data];
    switch (sort) {
      case "offers-first":
        return arr.sort((a, b) => {
          const aOffer = a.badge === "offer" ? 1 : 0;
          const bOffer = b.badge === "offer" ? 1 : 0;
          return bOffer - aOffer || b.id - a.id;
        });
      case "price-asc":
        return arr.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "year-desc":
        return arr.sort((a, b) => b.year - a.year);
      case "km-asc":
        return arr.sort((a, b) => a.km - b.km);
      default:
        return arr.sort((a, b) => b.id - a.id);
    }
  }, [data, sort]);

  const visible = sorted.slice(0, pageSize);

  const updateFilter = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(searchParams);
    if (value == null || value === "") next.delete(key);
    else next.set(key, value);
    setPageSize(12);
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => {
    setPageSize(12);
    setSearchParams({}, { replace: true });
  };

  const activeChips = Object.entries(search as Record<string, string>)
    .filter(([_, value]) => value != null && value !== "")
    .map(([key, value]) => ({ key, value: String(value) }));

  return (
    <>
      <SEO
        title="Inventario — Autos Abre"
        description="Explorá nuestro inventario actual de vehículos en Cartago. Filtrá por marca, categoría, año y precio."
      />
      <div className="container-aa pb-16 pt-8 md:pb-20 md:pt-10">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Inventario</span>
        </nav>

        <header className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="headline text-4xl md:text-5xl">Inventario</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {isLoading
                ? "Buscando…"
                : `${sorted.length} ${sorted.length === 1 ? "vehículo encontrado" : "vehículos encontrados"}`}
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Ordenar
            </label>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 min-w-[190px] flex-1 rounded-md border border-border bg-surface-elevated px-3 text-sm outline-none focus:border-accent lg:flex-none"
            >
              <option value="newest">Más recientes</option>
              <option value="offers-first">Ofertas primero</option>
              <option value="price-asc">Precio menor</option>
              <option value="price-desc">Precio mayor</option>
              <option value="year-desc">Año (nuevo a viejo)</option>
              <option value="km-asc">Menor kilometraje</option>
            </select>
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface-elevated px-4 text-sm lg:hidden"
            >
              <Filter className="size-4" /> Filtros
            </button>
          </div>
        </header>

        <InventorySearchBar
          value={(search.q as string) || ""}
          onSearch={(value) => updateFilter("q", value || undefined)}
          onClear={() => updateFilter("q", undefined)}
        />

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs"
              >
                <span className="text-muted-foreground">{chip.key}:</span>
                <span className="text-foreground">{chip.value}</span>
                <button
                  onClick={() => updateFilter(chip.key, undefined)}
                  aria-label={`Quitar ${chip.key}`}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-accent hover:underline">
              Limpiar todo
            </button>
          </div>
        )}

        <div className="mt-7 grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:sticky lg:top-[84px] lg:block lg:max-h-[calc(100vh-104px)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-2">
            <FiltersPanel
              filters={search as Record<string, string>}
              brands={brands}
              onChange={updateFilter}
              onClear={clearAll}
            />
          </aside>

          <div className="min-w-0">
            {isLoading && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            )}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {!isLoading && !isError && sorted.length === 0 && (
              <EmptyState
                title="No encontramos resultados con esos filtros"
                description="Probá ajustar la búsqueda o conversemos por WhatsApp para encontrar lo que buscás."
                action={
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={clearAll}
                      className="rounded-md border border-border px-4 py-2 text-sm"
                    >
                      Limpiar filtros
                    </button>
                    <WhatsAppButton message="Hola, estoy buscando un vehículo específico." />
                  </div>
                }
              />
            )}
            {!isLoading && !isError && sorted.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
                {visible.length < sorted.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setPageSize(pageSize + 12)}
                      className="rounded-md border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-foreground/5"
                    >
                      Cargar más
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar filtros"
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-surface p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Cerrar">
                <X />
              </button>
            </div>
            <FiltersPanel
              filters={search as Record<string, string>}
              brands={brands}
              onChange={updateFilter}
              onClear={clearAll}
            />
          </div>
        </div>
      )}
    </>
  );
}

function InventorySearchBar({
  value,
  onSearch,
  onClear,
}: {
  value: string;
  onSearch: (value: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];
    return mockVehicles
      .filter((vehicle) =>
        `${vehicle.brand} ${vehicle.model} ${vehicle.title} ${vehicle.year}`
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [query]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query.trim());
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative z-30 mt-6">
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-lg border border-border bg-surface-elevated p-3 shadow-card sm:flex-row sm:items-center sm:p-4"
      >
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Buscá por marca, modelo o año"
            autoComplete="off"
            className="h-12 w-full rounded-md border border-border bg-background pl-12 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
                onClear();
              }}
              className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-white/5 hover:text-foreground"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover sm:min-w-[210px]"
        >
          <Search className="size-4" /> Buscar inventario
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-elegant sm:right-[222px]">
          <div className="border-b border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Coincidencias rápidas
          </div>
          {suggestions.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/vehiculo/${vehicle.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-border/60 px-3 py-3 transition-colors last:border-b-0 hover:bg-white/5"
            >
              <img
                src={vehicle.image || FALLBACK_IMAGE}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
                alt=""
                className="h-12 w-16 shrink-0 rounded object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {vehicle.brand} {vehicle.model}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {vehicle.year} · {vehicle.transmission}
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FiltersPanel({
  filters,
  brands,
  onChange,
  onClear,
}: {
  filters: Record<string, string>;
  brands: string[];
  onChange: (key: string, value: string | undefined) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-5 text-sm">
      <FilterSelect
        label="Marca"
        value={filters.brand || ""}
        onChange={(value) => onChange("brand", value || undefined)}
        options={[
          { value: "", label: "Todas" },
          ...brands.map((brand) => ({ value: brand, label: brand })),
        ]}
      />
      <FilterSelect
        label="Categoría"
        value={filters.category || ""}
        onChange={(value) => onChange("category", value || undefined)}
        options={[
          { value: "", label: "Todas" },
          ...VEHICLE_CATEGORIES.map((category) => ({
            value: category.value,
            label: category.label,
          })),
        ]}
      />
      <div className="grid grid-cols-2 gap-2">
        <FilterInput
          label="Año desde"
          type="number"
          value={filters.yearFrom || ""}
          onChange={(value) => onChange("yearFrom", value || undefined)}
        />
        <FilterInput
          label="Año hasta"
          type="number"
          value={filters.yearTo || ""}
          onChange={(value) => onChange("yearTo", value || undefined)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FilterInput
          label="Mín USD"
          type="number"
          value={filters.minUsd || ""}
          onChange={(value) => onChange("minUsd", value || undefined)}
        />
        <FilterInput
          label="Máx USD"
          type="number"
          value={filters.maxUsd || ""}
          onChange={(value) => onChange("maxUsd", value || undefined)}
        />
      </div>
      <FilterSelect
        label="Transmisión"
        value={filters.transmission || ""}
        onChange={(value) => onChange("transmission", value || undefined)}
        options={[
          { value: "", label: "Cualquiera" },
          { value: "Automática", label: "Automática" },
          { value: "Manual", label: "Manual" },
        ]}
      />
      <FilterSelect
        label="Estado"
        value={filters.status || "available"}
        onChange={(value) => onChange("status", value === "available" ? undefined : value)}
        options={[
          { value: "available", label: "Disponibles" },
          { value: "reserved", label: "Reservados" },
          { value: "sold", label: "Vendidos" },
          { value: "all", label: "Todos" },
        ]}
      />
      <button
        onClick={onClear}
        className="w-full rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-foreground/5"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-border bg-surface-elevated px-3 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-border bg-surface-elevated px-3 text-sm"
      />
    </label>
  );
}
