import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import { mockVehicles } from "@/data/mockVehicles";
import { VEHICLE_CATEGORIES } from "@/types/vehicle";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background sm:min-h-[650px] lg:min-h-[720px]">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Vehículo deportivo rojo de Autos Abre"
          className="size-full object-cover object-[69%_center] sm:object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/45" />
        <div className="absolute inset-0 bg-black/10 sm:bg-transparent" />
      </div>

      <div className="container-aa flex items-start py-12 sm:min-h-[650px] sm:py-20 lg:min-h-[720px] lg:pb-56 lg:pt-20">
        <div className="w-full max-w-[800px]">
          <p className="eyebrow fade-up">Autos Abre · Cartago</p>
          <h1 className="hero-title fade-up mt-4 max-w-[790px] text-foreground">
            <span className="hero-title-line">Abrí camino a</span>
            <span className="hero-title-line hero-title-accent text-accent">Tu próximo carro</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg fade-up">
            Vehículos seleccionados en Cartago, desde opciones confiables para todos los días hasta
            unidades especiales para quienes viven la pasión automotriz.
          </p>
          <div className="mt-8 grid max-w-[470px] gap-3 sm:flex sm:flex-wrap fade-up">
            <Link
              to="/inventario"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Explorar inventario
            </Link>
            <Link
              to="/vender"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background/55 px-6 text-sm font-semibold uppercase tracking-wider text-foreground backdrop-blur transition-colors hover:border-foreground/25 hover:bg-foreground/10"
            >
              Cotizar mi vehículo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MainSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxUsd, setMaxUsd] = useState("");
  const [transmission, setTransmission] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => Array.from(new Set(mockVehicles.map((v) => v.brand))).sort(), []);
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 26 }, (_, index) => currentYear - index),
    [currentYear],
  );
  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return mockVehicles
      .filter(
        (vehicle) =>
          vehicle.brand.toLowerCase().includes(term) ||
          vehicle.model.toLowerCase().includes(term) ||
          vehicle.title.toLowerCase().includes(term) ||
          String(vehicle.year).includes(term),
      )
      .slice(0, 6);
  }, [q]);

  const hasFilters = Boolean(
    q || brand || category || yearFrom || yearTo || maxUsd || transmission,
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const reset = () => {
    setQ("");
    setBrand("");
    setCategory("");
    setYearFrom("");
    setYearTo("");
    setMaxUsd("");
    setTransmission("");
    setShowSuggestions(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const search: Record<string, string> = {};
    if (q.trim()) search.q = q.trim();
    if (brand) search.brand = brand;
    if (category) search.category = category;

    const from = Number(yearFrom);
    const to = Number(yearTo);
    if (yearFrom && yearTo && from > to) {
      search.yearFrom = yearTo;
      search.yearTo = yearFrom;
    } else {
      if (yearFrom) search.yearFrom = yearFrom;
      if (yearTo) search.yearTo = yearTo;
    }

    if (maxUsd) search.maxUsd = maxUsd;
    if (transmission) search.transmission = transmission;
    setShowSuggestions(false);
    const params = new URLSearchParams(search);
    navigate(`/inventario${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative z-30 bg-background py-6 lg:-mt-36 lg:bg-transparent lg:pb-12 lg:pt-0">
      <div className="container-aa">
        <form
          onSubmit={submit}
          className="max-w-[1120px] overflow-visible rounded-lg border border-white/10 bg-surface-elevated/97 p-4 shadow-elegant backdrop-blur-xl sm:p-5 lg:p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-accent">
                <SlidersHorizontal className="size-4 shrink-0" aria-hidden />
                <p className="eyebrow">Búsqueda rápida</p>
              </div>
              <h2 className="headline mt-2 max-w-[680px] text-[1.65rem] leading-[1.05] sm:text-3xl">
                Encontrá tu próximo vehículo
              </h2>
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={reset}
                className="hidden shrink-0 items-center gap-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                <RotateCcw className="size-3.5" />
                Limpiar
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-x-4">
            <div ref={ref} className="relative col-span-2 min-w-0 md:col-span-6 lg:col-span-5">
              <SearchFieldLabel>Marca, modelo o año</SearchFieldLabel>
              <div className="flex h-12 items-center rounded-md border border-border bg-background transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
                <Search className="ml-3.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <input
                  value={q}
                  onChange={(event) => {
                    setQ(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Ej. Toyota Hilux 2022"
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/65"
                  aria-label="Buscar por marca, modelo o año"
                  autoComplete="off"
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute inset-x-0 top-full z-[80] mt-2 max-h-80 overflow-y-auto rounded-md border border-border bg-surface-elevated p-1 shadow-elegant">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setQ(`${suggestion.brand} ${suggestion.model}`);
                          setShowSuggestions(false);
                        }}
                        className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground/5 focus:bg-foreground/5 focus:outline-none"
                      >
                        <img
                          src={suggestion.image}
                          alt=""
                          className="h-12 w-16 shrink-0 rounded object-cover"
                          loading="lazy"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-foreground">
                            {suggestion.brand} {suggestion.model}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {suggestion.year} · {suggestion.transmission}
                          </span>
                        </span>
                        <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Select
              label="Marca"
              value={brand}
              onChange={setBrand}
              className="col-span-2 md:col-span-3 lg:col-span-3"
            >
              <option value="">Todas las marcas</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Select
              label="Categoría"
              value={category}
              onChange={setCategory}
              className="col-span-2 md:col-span-3 lg:col-span-4"
            >
              <option value="">Todas las categorías</option>
              {VEHICLE_CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>

            <Select
              label="Año desde"
              value={yearFrom}
              onChange={setYearFrom}
              className="col-span-1 md:col-span-2 lg:col-span-2"
            >
              <option value="">Sin mínimo</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>

            <Select
              label="Año hasta"
              value={yearTo}
              onChange={setYearTo}
              className="col-span-1 md:col-span-2 lg:col-span-2"
            >
              <option value="">Sin máximo</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>

            <Select
              label="Precio máximo"
              value={maxUsd}
              onChange={setMaxUsd}
              className="col-span-2 md:col-span-2 lg:col-span-3"
            >
              <option value="">Cualquier precio</option>
              {[15000, 25000, 40000, 60000, 100000, 150000].map((price) => (
                <option key={price} value={price}>
                  Hasta ${price.toLocaleString("en-US")}
                </option>
              ))}
            </Select>

            <Select
              label="Transmisión"
              value={transmission}
              onChange={setTransmission}
              className="col-span-2 md:col-span-3 lg:col-span-2"
            >
              <option value="">Cualquiera</option>
              <option value="Automática">Automática</option>
              <option value="Manual">Manual</option>
            </Select>

            <div className="col-span-2 flex items-end md:col-span-3 lg:col-span-3">
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                <Search className="size-4" aria-hidden />
                Buscar vehículos
              </button>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:hidden"
            >
              <RotateCcw className="size-3.5" /> Limpiar filtros
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

function SearchFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <SearchFieldLabel>{label}</SearchFieldLabel>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full min-w-0 appearance-none rounded-md border border-border bg-background px-3.5 pr-11 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15"
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </span>
    </label>
  );
}
