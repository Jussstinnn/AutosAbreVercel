/**
 * Helpers de formato.
 */

export function formatPrice(price: number, currency: "USD" | "CRC" = "USD"): string {
  if (!price || price <= 0) return "Consultar precio";
  const formatter = new Intl.NumberFormat(currency === "CRC" ? "es-CR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("es-CR")} km`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("es-CR");
}

/** Calculadora de cuota mensual (anualidad). */
export function monthlyPayment(opts: {
  price: number;
  down: number;
  months: number;
  annualRate: number; // ej 12 = 12%
}): number {
  const principal = Math.max(0, opts.price - opts.down);
  if (principal <= 0 || opts.months <= 0) return 0;
  const r = opts.annualRate / 100 / 12;
  if (r === 0) return principal / opts.months;
  return (principal * r) / (1 - Math.pow(1 + r, -opts.months));
}
