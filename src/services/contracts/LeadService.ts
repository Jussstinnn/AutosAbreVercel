import type { CreateLeadPayload, CreateTradeInLeadPayload, LeadResponse } from "@/types/lead";

export interface LeadService {
  createLead(payload: CreateLeadPayload): Promise<LeadResponse>;
  createTradeInLead(payload: CreateTradeInLeadPayload): Promise<LeadResponse>;
}
