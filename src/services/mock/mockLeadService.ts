import type { LeadService } from "@/services/contracts/LeadService";

let counter = 9000;

function delay<T>(value: T, ms = 400 + Math.random() * 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockLeadService: LeadService = {
  async createLead(payload) {
    console.info("[mockLeadService.createLead]", payload);
    return delay({ id: ++counter });
  },
  async createTradeInLead(payload) {
    console.info("[mockLeadService.createTradeInLead]", {
      ...payload,
      attachments: payload.attachments?.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
    });
    return delay({ id: ++counter });
  },
};
