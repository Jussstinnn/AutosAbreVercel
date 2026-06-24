/**
 * Contratos de leads (consultas y solicitudes).
 */

export interface CreateLeadPayload {
  Name: string;
  Phone?: string | null;
  Email?: string | null;
  Message?: string | null;
  VehicleId?: number | null;
  /** "contact" | "vehicle" | "financing" */
  Source?: string | null;
}

export interface CreateTradeInLeadPayload {
  Name: string;
  Phone?: string | null;
  Email?: string | null;
  Message?: string | null;
  VehicleId?: number | null;
  /** "tradein" | "sell" */
  Source: string;
  /** "Trade-in / Parte de pago" | "Venta de vehículo" */
  InquiryType: string;
  attachments?: File[];
}

export interface LeadResponse {
  id: number;
}
