import { useQuery } from "@tanstack/react-query";
import { vehicleService } from "@/services";
import type { VehicleSearchFilters } from "@/types/vehicle";

export function useFeaturedVehicles(take = 8) {
  return useQuery({
    queryKey: ["vehicles", "featured", take],
    queryFn: () => vehicleService.getFeaturedVehicles(take),
    staleTime: 60_000,
  });
}

export function useSearchVehicles(filters: VehicleSearchFilters) {
  return useQuery({
    queryKey: ["vehicles", "search", filters],
    queryFn: () => vehicleService.searchVehicles(filters),
    staleTime: 30_000,
  });
}

export function useVehicleDetail(id: number | string | undefined) {
  return useQuery({
    queryKey: ["vehicles", "detail", id],
    queryFn: () => vehicleService.getVehicleDetail(id!),
    enabled: id != null,
    staleTime: 60_000,
  });
}

export function useRelatedVehicles(id: number | string | undefined, take = 4) {
  return useQuery({
    queryKey: ["vehicles", "related", id, take],
    queryFn: () => vehicleService.getRelatedVehicles(id!, take),
    enabled: id != null,
    staleTime: 60_000,
  });
}
