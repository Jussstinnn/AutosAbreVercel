/**
 * Punto de entrada único para los servicios.
 * Cambia VITE_DATA_SOURCE en .env para alternar entre "mock" y "api".
 */
import { mockVehicleService } from "@/services/mock/mockVehicleService";
import { mockLeadService } from "@/services/mock/mockLeadService";
import { httpVehicleService } from "@/services/http/httpVehicleService";
import { httpLeadService } from "@/services/http/httpLeadService";
import type { VehicleService } from "@/services/contracts/VehicleService";
import type { LeadService } from "@/services/contracts/LeadService";

const SOURCE = (import.meta.env.VITE_DATA_SOURCE ?? "mock").toLowerCase();
const USE_API = SOURCE === "api";

export const vehicleService: VehicleService = USE_API ? httpVehicleService : mockVehicleService;

export const leadService: LeadService = USE_API ? httpLeadService : mockLeadService;

export const dataSource = USE_API ? "api" : "mock";
