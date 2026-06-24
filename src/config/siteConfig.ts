/**
 * Configuración central de Autos Abre.
 * Editá los valores aquí; todos los componentes los consumen.
 */

export interface BusinessHours {
  enabled: boolean;
  weekday?: string;
  saturday?: string;
  sunday?: string;
}

export const siteConfig = {
  name: "Autos Abre",
  tagline: "Abrí camino a tu próximo carro",
  description:
    "Vehículos seleccionados en Cartago, desde opciones confiables para todos los días hasta unidades especiales para quienes viven la pasión automotriz.",

  // Contacto
  phone: "+506 2537-5000",
  phoneFormatted: "2537-5000",
  secondaryPhone: "+506 8860-4040",
  secondaryPhoneFormatted: "8860-4040",
  whatsapp: "+506 8387-8110",
  whatsappFormatted: "8387-8110",
  whatsappNumber: "50683878110", // wa.me number, sin signos
  email: "" as string, // dejar vacío para ocultar

  // Redes
  instagramHandle: "@autosabre.cr",
  instagramUrl: "https://www.instagram.com/autosabre.cr/",

  // Ubicación
  locationShort: "La Lima, Cartago",
  address:
    "La Lima de Cartago, 50 metros norte de Walmart, costado sur de Dos Pinos, Cartago, Costa Rica",
  wazeUrl: "https://waze.com/ul?q=Autos%20Abre%20La%20Lima%20Cartago",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Autos+Abre+La+Lima+Cartago+Costa+Rica",
  mapsEmbedUrl: "https://www.google.com/maps?q=Autos+Abre+La+Lima+Cartago+Costa+Rica&output=embed",

  // Horario (dejar enabled:false hasta confirmar)
  hours: {
    enabled: false,
    weekday: "Horario por confirmar",
    saturday: "Horario por confirmar",
    sunday: "Cerrado",
  } satisfies BusinessHours,

  // SEO
  seo: {
    defaultTitle: "Autos Abre — Vehículos en Cartago",
    titleTemplate: "%s | Autos Abre",
    defaultImage: "/og-image.jpg",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Construye una URL de WhatsApp con el mensaje codificado.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsAppMessage(opts: {
  title: string;
  id: number | string;
  price?: string;
}): string {
  const lines = [
    `Hola Autos Abre, me interesa el ${opts.title} (ID ${opts.id}).`,
    opts.price ? `Precio publicado: ${opts.price}.` : null,
    "¿Está disponible?",
  ].filter(Boolean);
  return lines.join(" ");
}
