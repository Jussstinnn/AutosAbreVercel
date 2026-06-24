import type { VehicleCard, VehicleDetail, VehicleSearchFilters } from "@/types/vehicle";

export interface VehicleService {
  getFeaturedVehicles(take?: number): Promise<VehicleCard[]>;
  searchVehicles(filters: VehicleSearchFilters): Promise<VehicleCard[]>;
  getVehicleDetail(id: number | string): Promise<VehicleDetail | null>;
  getRelatedVehicles(id: number | string, take?: number): Promise<VehicleCard[]>;
}
