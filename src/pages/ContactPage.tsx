import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Copy,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { siteConfig, buildWhatsAppUrl } from "@/config/siteConfig";
import { leadService } from "@/services";
import heroImg from "@/assets/hero-car.jpg";

const REASONS = [
  "Consulta general",
  "Información de vehículo",
  "Financiamiento",
  "Vender mi vehículo",
  "Coordinar visita",
  "Otro",
] as const;

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto — Autos Abre"
        description={`Contactá a Autos Abre por WhatsApp, teléfono o visitanos en ${siteConfig.locationShort}.`}
      />
      <ContactHero />
      <ContactCards />
      <LocationAndHours />
      <VisitSteps />
      <ContactFormSection />
    </>
  );
}

function ContactHero() {
  return (
    <header className="relative isolate overflow-hidden border-b border-border py-14 md:py-28">
      <img
        src={heroImg}
        alt="Autos Abre en Cartago"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_30%,rgba(215,25,32,0.26),transparent_48%)]" />
      <div className="container-aa">
        <p className="eyebrow">Contacto y ubicación</p>
        <h1 className="headline mt-3 max-w-4xl text-4xl leading-[0.98] md:text-6xl">
          Hablemos de tu próximo vehículo
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Consultá disponibilidad, financiamiento, recibo de vehículos o coordiná una visita a
          nuestro local en La Lima de Cartago.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={buildWhatsAppUrl(
              "Hola Autos Abre, quisiera recibir información y coordinar una visita.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#1fb958]"
          >
            <MessageCircle className="size-5" /> Escribir por WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-black/25 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <Phone className="size-5" /> Llamar ahora
          </a>
        </div>
      </div>
    </header>
  );
}

function ContactCards() {
  const cards = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.whatsappFormatted,
      description: "Consultas rápidas de inventario y disponibilidad.",
      href: buildWhatsAppUrl("Hola Autos Abre, quisiera recibir información."),
      external: true,
      accent: true,
    },
    {
      icon: Phone,
      label: "Teléfonos",
      value: siteConfig.phoneFormatted,
      description: `Línea secundaria: ${siteConfig.secondaryPhoneFormatted}`,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: siteConfig.locationShort,
      description: "Abrí la ruta directa hacia Autos Abre.",
      href: siteConfig.wazeUrl,
      external: true,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: siteConfig.instagramHandle,
      description: "Nuevos ingresos y contenido automotriz.",
      href: siteConfig.instagramUrl,
      external: true,
    },
  ];

  return (
    <section className="border-b border-border bg-background py-10 md:py-14">
      <div className="container-aa grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            className={`group rounded-lg border p-5 shadow-card transition-all hover:-translate-y-1 hover:border-foreground/20 ${
              card.accent
                ? "border-[#25D366]/40 bg-[#25D366]/10"
                : "border-border bg-surface-elevated"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex size-11 items-center justify-center rounded-md ${
                  card.accent ? "bg-[#25D366] text-white" : "bg-accent/10 text-accent"
                }`}
              >
                <card.icon className="size-5" />
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{card.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function LocationAndHours() {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.address);
      toast.success("Dirección copiada.");
    } catch {
      toast.error("No se pudo copiar la dirección.");
    }
  };

  return (
    <section className="container-aa py-12 md:py-16 md:py-24">
      <div className="mb-9 max-w-3xl">
        <p className="eyebrow">Visitá Autos Abre</p>
        <h2 className="headline mt-2 text-3xl md:text-5xl">Llegá sin complicaciones</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Estamos en La Lima de Cartago. Podés abrir la ruta en Waze o Google Maps y coordinar tu
          visita previamente por WhatsApp.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-elegant lg:grid-cols-[1.55fr_0.85fr]">
        <div className="min-h-[360px] bg-background lg:min-h-[520px]">
          <iframe
            title="Mapa de Autos Abre"
            src={siteConfig.mapsEmbedUrl}
            className="h-full min-h-[360px] w-full border-0 lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <aside className="flex flex-col p-6 md:p-8">
          <div className="flex size-12 items-center justify-center rounded-md bg-accent/10 text-accent">
            <MapPin className="size-6" />
          </div>
          <p className="eyebrow mt-6">Dirección</p>
          <h3 className="mt-2 text-2xl normal-case leading-tight text-foreground">
            {siteConfig.locationShort}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{siteConfig.address}</p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={siteConfig.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <Navigation className="size-4" /> Abrir Waze
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground/25"
            >
              <MapPin className="size-4" /> Google Maps
            </a>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:col-span-2 lg:col-span-1"
            >
              <Copy className="size-4" /> Copiar dirección
            </button>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-2 text-accent">
              <Clock3 className="size-4" />
              <p className="eyebrow">Horario de atención</p>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <HourRow
                label="Lunes a viernes"
                value={siteConfig.hours.weekday ?? "Por confirmar"}
              />
              <HourRow label="Sábado" value={siteConfig.hours.saturday ?? "Por confirmar"} />
              <HourRow label="Domingo" value={siteConfig.hours.sunday ?? "Cerrado"} />
            </div>
            {!siteConfig.hours.enabled && (
              <p className="mt-4 rounded-md bg-background p-3 text-xs leading-relaxed text-muted-foreground">
                Confirmá el horario antes de desplazarte. Te recomendamos coordinar la visita por
                WhatsApp.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function HourRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="font-medium text-foreground">{label}</span>
      <span className="max-w-[55%] text-right text-muted-foreground">{value}</span>
    </div>
  );
}

function VisitSteps() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Consultá disponibilidad",
      text: "Escribinos por el vehículo que te interesa para confirmar su estado actual.",
    },
    {
      icon: CalendarCheck,
      title: "Coordiná la visita",
      text: "Elegimos contigo el momento más conveniente para atenderte sin prisas.",
    },
    {
      icon: CheckCircle2,
      title: "Conocé el vehículo",
      text: "Revisá la unidad, resolvé tus dudas y analizá las opciones disponibles.",
    },
  ];

  return (
    <section className="border-y border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa">
        <div className="text-center">
          <p className="eyebrow">Antes de visitarnos</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Coordiná tu visita en tres pasos</h2>
        </div>
        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent md:block" />
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-lg border border-border bg-surface-elevated p-6 text-center"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-accent/35 bg-background text-accent">
                <step.icon className="size-6" />
              </span>
              <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Paso {index + 1}
              </span>
              <h3 className="mt-2 text-xl text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "Consulta general",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !consent) {
      toast.error("Completá nombre, WhatsApp y consentimiento.");
      return;
    }

    setSending(true);
    try {
      await leadService.createLead({
        Name: form.name.trim(),
        Phone: form.phone.trim(),
        Email: form.email.trim() || null,
        Message: `Motivo: ${form.reason}\nMensaje: ${form.message.trim() || "Sin mensaje adicional"}`,
        VehicleId: null,
        Source: "contact",
      });
      setSent(true);
      toast.success("Consulta enviada. Te contactaremos pronto.");
    } catch {
      toast.error("No se pudo enviar la consulta. Intentá nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="formulario-contacto" className="bg-background py-12 md:py-16 md:py-24">
      <div className="container-aa">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Formulario de contacto</p>
            <h2 className="headline mt-2 text-3xl md:text-5xl">Contanos cómo podemos ayudarte</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Dejá tus datos y el motivo de la consulta. Nuestro equipo dará seguimiento por el
              canal que nos indiqués.
            </p>
            <a
              href={buildWhatsAppUrl("Hola Autos Abre, quisiera hacer una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-5 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/15"
            >
              <MessageCircle className="size-5" /> Preferís WhatsApp
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-surface-elevated p-5 shadow-card md:p-8"
          >
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366]">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-5 text-3xl text-foreground">Consulta recibida</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Gracias, {form.name}. Te contactaremos por WhatsApp o teléfono para dar
                  seguimiento.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      reason: "Consulta general",
                      message: "",
                    });
                    setConsent(false);
                  }}
                  className="mt-6 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Nombre completo"
                    required
                    value={form.name}
                    onChange={(value) => setForm({ ...form, name: value })}
                  />
                  <TextField
                    label="WhatsApp"
                    required
                    value={form.phone}
                    onChange={(value) => setForm({ ...form, phone: value })}
                    placeholder="+506 0000-0000"
                  />
                  <TextField
                    label="Correo (opcional)"
                    type="email"
                    value={form.email}
                    onChange={(value) => setForm({ ...form, email: value })}
                  />
                  <label className="block">
                    <FieldLabel>Motivo de la consulta</FieldLabel>
                    <select
                      value={form.reason}
                      onChange={(event) => setForm({ ...form, reason: event.target.value })}
                      className="contact-field"
                    >
                      {REASONS.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <FieldLabel>Mensaje</FieldLabel>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    rows={6}
                    className="contact-field min-h-36 resize-y py-3"
                    placeholder="Contanos qué vehículo te interesa o cómo podemos ayudarte."
                  />
                </label>

                <label className="flex items-start gap-3 rounded-md bg-background p-4 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-0.5 accent-[var(--accent)]"
                  />
                  <span>Autorizo a Autos Abre a contactarme para atender esta solicitud.</span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-4" /> {sending ? "Enviando…" : "Enviar consulta"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>
        {label}
        {required ? " *" : ""}
      </FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="contact-field"
      />
    </label>
  );
}
