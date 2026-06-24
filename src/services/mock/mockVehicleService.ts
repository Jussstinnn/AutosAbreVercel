import type { VehicleService } from "@/services/contracts/VehicleService";
import type { VehicleCard, VehicleDetail, VehicleSearchFilters } from "@/types/vehicle";
import { VehicleStatus } from "@/types/vehicle";
import { buildMockDetail, mockVehicles } from "@/data/mockVehicles";

function delay<T>(value: T, ms = 350 + Math.random() * 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function applyFilters(list: VehicleCard[], f: VehicleSearchFilters): VehicleCard[] {
  let out = list.filter((v) => v.status !== VehicleStatus.Hidden);

  // Status filter (default available para vista pública)
  const status = f.status ?? "available";
  if (status === "available") out = out.filter((v) => v.status === VehicleStatus.Available);
  else if (status === "reserved") out = out.filter((v) => v.status === VehicleStatus.Reserved);
  else if (status === "sold") out = out.filter((v) => v.status === VehicleStatus.Sold);
  // "all" → sin filtro adicional

  if (f.q) {
    const q = f.q.toLowerCase().trim();
    out = out.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        String(v.year).includes(q) ||
        v.title.toLowerCase().includes(q),
    );
  }
  if (f.brand) out = out.filter((v) => v.brand.toLowerCase() === f.brand!.toLowerCase());
  if (f.category) out = out.filter((v) => v.category === f.category);
  if (f.yearFrom) out = out.filter((v) => v.year >= f.yearFrom!);
  if (f.yearTo) out = out.filter((v) => v.year <= f.yearTo!);
  if (f.minUsd) out = out.filter((v) => v.currency !== "USD" || v.price >= f.minUsd!);
  if (f.maxUsd)
    out = out.filter((v) => v.currency !== "USD" || (v.price > 0 && v.price <= f.maxUsd!));
  if (f.transmission) out = out.filter((v) => v.transmission === f.transmission);

  const skip = f.skip ?? 0;
  const take = f.take ?? out.length;
  return out.slice(skip, skip + take);
}

export const mockVehicleService: VehicleService = {
  async getFeaturedVehicles(take = 8) {
    const list = mockVehicles.filter((v) => v.status === VehicleStatus.Available).slice(0, take);
    return delay(list);
  },

  async searchVehicles(filters) {
    return delay(applyFilters(mockVehicles, filters));
  },

  async getVehicleDetail(id) {
    const numericId = typeof id === "string" ? Number(id) : id;
    const card = mockVehicles.find((v) => v.id === numericId);
    if (!card) return delay(null);
    return delay(buildMockDetail(card));
  },

  async getRelatedVehicles(id, take = 4) {
    const numericId = typeof id === "string" ? Number(id) : id;
    const current = mockVehicles.find((v) => v.id === numericId);
    if (!current) return delay([]);
    const related = mockVehicles
      .filter(
        (v) =>
          v.id !== current.id &&
          v.status === VehicleStatus.Available &&
          (v.category === current.category || v.brand === current.brand),
      )
      .slice(0, take);
    return delay(related);
  },
};
