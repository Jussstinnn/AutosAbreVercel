import type { LeadService } from "@/services/contracts/LeadService";
import { httpClient } from "@/services/http/httpClient";
import type { LeadResponse } from "@/types/lead";

export const httpLeadService: LeadService = {
  async createLead(payload) {
    return httpClient.postJson<LeadResponse>("/api/leads", payload);
  },
  async createTradeInLead(payload) {
    const fd = new FormData();
    fd.append("Name", payload.Name);
    if (payload.Phone) fd.append("Phone", payload.Phone);
    if (payload.Email) fd.append("Email", payload.Email);
    if (payload.Message) fd.append("Message", payload.Message);
    if (payload.VehicleId != null) fd.append("VehicleId", String(payload.VehicleId));
    fd.append("Source", payload.Source);
    fd.append("InquiryType", payload.InquiryType);
    payload.attachments?.forEach((file) => fd.append("attachments", file, file.name));
    return httpClient.postFormData<LeadResponse>("/api/leads/tradein", fd);
  },
};
