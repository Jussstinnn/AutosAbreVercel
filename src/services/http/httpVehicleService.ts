import type { VehicleService } from "@/services/contracts/VehicleService";
import type { VehicleCard, VehicleDetail, VehicleSearchFilters } from "@/types/vehicle";
import { httpClient, resolveImageUrl } from "@/services/http/httpClient";

function mapCard(dto: VehicleCard): VehicleCard {
  return { ...dto, image: resolveImageUrl(dto.image) };
}

function mapDetail(dto: VehicleDetail): VehicleDetail {
  return { ...dto, images: (dto.images ?? []).map(resolveImageUrl) };
}

function buildQuery(f: VehicleSearchFilters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.brand) p.set("brand", f.brand);
  if (f.category) p.set("category", f.category);
  if (f.yearFrom) p.set("yearFrom", String(f.yearFrom));
  if (f.yearTo) p.set("yearTo", String(f.yearTo));
  if (f.minUsd) p.set("minUsd", String(f.minUsd));
  if (f.maxUsd) p.set("maxUsd", String(f.maxUsd));
  if (f.transmission) p.set("transmission", f.transmission);
  if (f.status) p.set("status", f.status);
  if (f.take != null) p.set("take", String(f.take));
  if (f.skip != null) p.set("skip", String(f.skip));
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const httpVehicleService: VehicleService = {
  async getFeaturedVehicles(take = 8) {
    const data = await httpClient.get<VehicleCard[]>(`/api/vehicles/featured?take=${take}`);
    return data.map(mapCard);
  },
  async searchVehicles(filters) {
    const data = await httpClient.get<VehicleCard[]>(`/api/vehicles${buildQuery(filters)}`);
    return data.map(mapCard);
  },
  async getVehicleDetail(id) {
    try {
      const data = await httpClient.get<VehicleDetail>(`/api/vehicles/${id}`);
      return mapDetail(data);
    } catch (err) {
      // 404 → null
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        (err as { status: number }).status === 404
      ) {
        return null;
      }
      throw err;
    }
  },
  async getRelatedVehicles(id, take = 4) {
    const data = await httpClient.get<VehicleCard[]>(`/api/vehicles/${id}/related?take=${take}`);
    return data.map(mapCard);
  },
};
