import { useMemo, useState } from "react";
import { Calculator, ChevronDown, ChevronUp, Info } from "lucide-react";
import type { Currency } from "@/types/vehicle";
import { formatPrice } from "@/utils/format";

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84] as const;

interface VehicleFinanceCalculatorProps {
  price: number;
  currency: Currency;
  vehicleName: string;
  defaultOpen?: boolean;
}

export function VehicleFinanceCalculator({
  price,
  currency,
  vehicleName,
  defaultOpen = false,
}: VehicleFinanceCalculatorProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [downPercent, setDownPercent] = useState(20);
  const [termIndex, setTermIndex] = useState(
    Math.max(
      0,
      TERM_OPTIONS.findIndex((term) => term === 60),
    ),
  );

  const term = TERM_OPTIONS[termIndex] ?? 60;
  const values = useMemo(() => {
    const safePrice = Number.isFinite(price) && price > 0 ? price : 0;
    const downPayment = (safePrice * downPercent) / 100;
    const financedAmount = Math.max(safePrice - downPayment, 0);
    const monthlyRate = 0.012;
    const factor = Math.pow(1 + monthlyRate, term);
    const monthlyPayment =
      financedAmount > 0 && factor > 1
        ? Math.round((financedAmount * monthlyRate * factor) / (factor - 1))
        : 0;

    return { downPayment, financedAmount, monthlyPayment };
  }, [downPercent, price, term]);

  if (!price || price <= 0) return null;

  return (
    <div className="border-t border-border pt-5">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-foreground transition-colors hover:text-accent"
        aria-expanded={open}
        aria-controls="vehicle-finance-calculator"
      >
        <span className="flex items-center gap-2">
          <Calculator className="size-4 text-accent" aria-hidden />
          Calculá tu cuota
        </span>
        {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      {open && (
        <div id="vehicle-finance-calculator" className="mt-5 space-y-5 fade-up">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-muted-foreground">Prima ({downPercent}%)</span>
              <span className="font-semibold text-foreground">
                {formatPrice(values.downPayment, currency)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPercent}
              onChange={(event) => setDownPercent(Number(event.target.value))}
              className="finance-range"
              aria-label="Porcentaje de prima"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-muted-foreground">Plazo</span>
              <span className="font-semibold text-foreground">{term} meses</span>
            </div>
            <input
              type="range"
              min={0}
              max={TERM_OPTIONS.length - 1}
              step={1}
              value={termIndex}
              onChange={(event) => setTermIndex(Number(event.target.value))}
              className="finance-range"
              aria-label="Plazo del financiamiento"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>{TERM_OPTIONS[0]} meses</span>
              <span>{TERM_OPTIONS[TERM_OPTIONS.length - 1]} meses</span>
            </div>
          </div>

          <div className="rounded-md border border-accent/20 bg-accent/10 p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Cuota mensual estimada
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-foreground">
              {formatPrice(values.monthlyPayment, currency)}
              <span className="ml-1 font-sans text-xs font-medium text-muted-foreground">/mes</span>
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Financiando {formatPrice(values.financedAmount, currency)}
            </p>
          </div>

          <div className="flex items-start gap-2 rounded-md bg-background/60 p-3 text-[10px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
            <p>
              Cálculo referencial para {vehicleName}, usando una tasa mensual estimada del 1.2%. La
              cuota final depende de la entidad financiera, el perfil del solicitante y la
              aprobación.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
