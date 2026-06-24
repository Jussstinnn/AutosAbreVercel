/**
 * Contratos de dominio para vehículos.
 * Coinciden 1:1 con los DTOs del backend futuro.
 */

export type Currency = "USD" | "CRC";
export type Badge = "new" | "offer" | "reserved" | "sold" | null;

/** Estado numérico tal como lo entrega el backend. */
export const VehicleStatus = {
  Available: 1,
  Reserved: 2,
  Sold: 3,
  Incoming: 5,
  Hidden: 6,
} as const;

export type VehicleStatusValue = (typeof VehicleStatus)[keyof typeof VehicleStatus];

/** Categorías exactas que se envían al backend en el filtro `category`. */
export const VEHICLE_CATEGORIES = [
  { value: "Deportivos", label: "Deportivos" },
  { value: "SUV", label: "SUV" },
  { value: "PickUp", label: "Pickups" },
  { value: "Compactos", label: "Compactos" },
  { value: "Electricos", label: "Eléctricos" },
] as const;

export type VehicleCategoryValue = (typeof VEHICLE_CATEGORIES)[number]["value"];

/** Status exactos para el filtro `status`. */
export type VehicleStatusFilter = "available" | "reserved" | "sold" | "all";

export interface VehicleCard {
  id: number;
  image: string;
  year: number;
  brand: string;
  model: string;
  title: string;
  price: number;
  /** Precio anterior cuando la unidad está en oferta. */
  previousPrice?: number | null;
  currency: Currency;
  km: number;
  transmission: string;
  fuel: string;
  engine: string;
  traction: string;
  interiorColor: string;
  badge: Badge;
  status: number;
  receivesTradeIn: boolean;
  offersFinancing: boolean;
  /** Auxiliar interno: categoría usada por mocks y filtros locales. */
  category?: VehicleCategoryValue;
}

export interface VehicleDetail {
  id: number;
  images: string[];
  year: number;
  brand: string;
  model: string;
  version: string;
  price: number;
  /** Precio anterior cuando la unidad está en oferta. */
  previousPrice?: number | null;
  currency: Currency;
  monthlyPayment?: number | null;
  km: number;
  transmission: string;
  fuel: string;
  badge: Badge;
  color: string;
  interiorColor: string;
  engine: string;
  traction: string;
  plate?: string | null;
  vin: string;
  stockId: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  equipment: string[];
  /** Auxiliares internos (no enviados al backend). */
  receivesTradeIn?: boolean;
  offersFinancing?: boolean;
  status?: number;
  category?: VehicleCategoryValue;
}

export interface VehicleSearchFilters {
  q?: string;
  brand?: string;
  category?: VehicleCategoryValue | string;
  yearFrom?: number;
  yearTo?: number;
  minUsd?: number;
  maxUsd?: number;
  transmission?: string;
  status?: VehicleStatusFilter;
  take?: number;
  skip?: number;
}
