import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeDollarSign,
  Camera,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Handshake,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { leadService } from "@/services";
import { buildWhatsAppUrl } from "@/config/siteConfig";
import tradeInImg from "@/assets/tradein.jpg";

const MAX_FILES = 12;
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic"];

type InquiryType = "tradein" | "sell";

export default function SellPage() {
  return (
    <>
      <SEO
        title="Vendé o entregá tu vehículo — Autos Abre"
        description="Ofrecé tu vehículo a Autos Abre para venta directa o como parte de pago. Conocé el proceso y enviá los datos para una valoración inicial."
      />
      <SellHero />
      <ProcessSection />
      <OptionsSection />
      <PreparationSection />
      <SellFAQ />
      <SellFormSection />
    </>
  );
}

function SellHero() {
  return (
    <header className="relative isolate overflow-hidden border-b border-border py-14 md:py-28">
      <img
        src={tradeInImg}
        alt="Vendé tu vehículo con Autos Abre"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_25%,rgba(215,25,32,0.25),transparent_48%)]" />
      <div className="container-aa">
        <p className="eyebrow">Vendé tu carro</p>
        <h1 className="headline mt-3 max-w-4xl text-4xl leading-[0.98] md:text-6xl">
          Convertí tu vehículo en tu siguiente oportunidad
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Podés ofrecerlo para venta directa o utilizarlo como parte de pago. Enviá la información y
          fotografías para recibir una valoración inicial sujeta a inspección.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#cotizar-vehiculo"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            Cotizar mi vehículo <ArrowRight className="size-4" />
          </a>
          <a
            href={buildWhatsAppUrl(
              "Hola Autos Abre, quisiera ofrecer mi vehículo para venta o parte de pago.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-7 text-sm font-semibold text-[#25D366] backdrop-blur transition-colors hover:bg-[#25D366]/15"
          >
            <MessageCircle className="size-5" /> Consultar por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

function ProcessSection() {
  const steps = [
    {
      icon: FileText,
      title: "Enviá la información",
      text: "Completá los datos básicos del vehículo, su condición y el tipo de negocio que buscás.",
    },
    {
      icon: Camera,
      title: "Agregá fotografías",
      text: "Incluí imágenes claras del exterior, interior y detalles relevantes para una primera revisión.",
    },
    {
      icon: ClipboardCheck,
      title: "Coordinamos inspección",
      text: "Si la unidad encaja, coordinamos una revisión presencial para validar su condición.",
    },
    {
      icon: Handshake,
      title: "Recibí una propuesta",
      text: "Analizamos venta directa o parte de pago y te explicamos la propuesta con claridad.",
    },
  ];

  return (
    <section className="border-b border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa">
        <div className="text-center">
          <p className="eyebrow">Proceso simple</p>
          <h2 className="headline mt-2 text-3xl md:text-5xl">Así funciona la valoración</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Un flujo claro para evitar mensajes incompletos y ayudarte a preparar todo desde el
            inicio.
          </p>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent md:block" />
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-lg border border-border bg-surface-elevated p-6 text-center shadow-card"
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

function OptionsSection() {
  const options = [
    {
      icon: BadgeDollarSign,
      label: "Venta directa",
      title: "Ofrecé tu vehículo",
      text: "Compartí los datos para que Autos Abre valore si la unidad puede ser considerada para compra directa.",
      points: ["Valoración inicial", "Inspección presencial", "Propuesta sujeta a revisión"],
    },
    {
      icon: CarFront,
      label: "Parte de pago",
      title: "Usalo para tu próximo carro",
      text: "Indicá que buscás cambiar de vehículo y podés agregar el tipo de unidad o presupuesto que te interesa.",
      points: [
        "Vinculación con inventario",
        "Análisis de diferencia",
        "Opciones de financiamiento sujetas a aprobación",
      ],
    },
  ];

  return (
    <section className="bg-background py-12 md:py-16 md:py-24">
      <div className="container-aa">
        <div className="max-w-3xl">
          <p className="eyebrow">Dos posibilidades</p>
          <h2 className="headline mt-2 text-3xl md:text-5xl">Elegí el objetivo de tu solicitud</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            El formulario permite indicar desde el inicio si querés vender la unidad o utilizarla
            como parte de pago, para que el seguimiento sea más preciso.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {options.map((option) => (
            <article
              key={option.label}
              className="group rounded-lg border border-border bg-surface-elevated p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent/35 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <option.icon className="size-6" />
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {option.label}
                </span>
              </div>
              <h3 className="mt-6 text-3xl text-foreground">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{option.text}</p>
              <ul className="mt-6 space-y-3">
                {option.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /> {point}
                  </li>
                ))}
              </ul>
              <a
                href="#cotizar-vehiculo"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:underline"
              >
                Iniciar solicitud <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreparationSection() {
  const cards = [
    {
      icon: Camera,
      title: "Fotos recomendadas",
      text: "Frente, parte trasera, laterales, interior, tablero, llantas y cualquier detalle importante.",
    },
    {
      icon: FileText,
      title: "Datos del vehículo",
      text: "Marca, modelo, versión, año, kilometraje, combustible, transmisión y condición general.",
    },
    {
      icon: ShieldCheck,
      title: "Información transparente",
      text: "Indicá deudas, gravámenes, reparaciones o aspectos que deban conocerse antes de la revisión.",
    },
    {
      icon: Sparkles,
      title: "Presentación limpia",
      text: "Una unidad limpia y fotografías claras permiten realizar una mejor valoración preliminar.",
    },
  ];

  return (
    <section className="border-y border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa">
        <div className="text-center">
          <p className="eyebrow">Antes de enviar</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Prepará la información correcta</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-border bg-surface-elevated p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                <card.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-xl text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellFAQ() {
  const items = [
    [
      "¿La valoración en línea es definitiva?",
      "No. La información y fotografías permiten una revisión inicial. Cualquier propuesta depende de inspección presencial y verificación de la unidad.",
    ],
    [
      "¿Puedo ofrecer un vehículo con deuda?",
      "Podés indicarlo en el formulario. El caso debe analizarse según saldo, documentación y condiciones aplicables.",
    ],
    [
      "¿Aceptan todos los vehículos?",
      "Cada unidad se revisa individualmente según condición, mercado, documentación y necesidades de inventario.",
    ],
    [
      "¿Puedo usarlo como parte de pago?",
      "Sí. Seleccioná la opción parte de pago y explicá qué tipo de vehículo buscás o cuál unidad del inventario te interesa.",
    ],
  ];

  return (
    <section className="bg-background py-12 md:py-12 md:py-20">
      <div className="container-aa max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Antes de cotizar</h2>
        </div>
        <div className="mt-9 space-y-3">
          {items.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-lg border border-border bg-surface-elevated p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground">
                {question}
                <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellFormSection() {
  const [form, setForm] = useState({
    inquiryType: "tradein" as InquiryType,
    name: "",
    phone: "",
    email: "",
    brand: "",
    model: "",
    version: "",
    year: "",
    km: "",
    kmUnit: "km",
    transmission: "Automática",
    fuel: "Gasolina",
    color: "",
    expectedPrice: "",
    hasDebt: "No",
    condition: "Buen estado",
    desiredVehicle: "",
    budget: "",
    comments: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        toast.error(`Máximo ${MAX_FILES} fotografías.`);
        break;
      }
      if (!ALLOWED.includes(file.type)) {
        toast.error(`${file.name}: formato no permitido.`);
        continue;
      }
      if (file.size > MAX_SIZE) {
        toast.error(`${file.name}: supera 10 MB.`);
        continue;
      }
      next.push(file);
    }
    setFiles(next);
  };

  const removeFile = (index: number) =>
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));

  const message = useMemo(
    () =>
      [
        `Tipo de solicitud: ${form.inquiryType === "tradein" ? "Parte de pago" : "Venta directa"}`,
        `Vehículo: ${form.brand} ${form.model} ${form.version}`,
        `Año: ${form.year}`,
        `Kilometraje: ${form.km} ${form.kmUnit}`,
        `Transmisión: ${form.transmission}`,
        `Combustible: ${form.fuel}`,
        `Color: ${form.color || "No indicado"}`,
        `Estado: ${form.condition}`,
        `Tiene deuda: ${form.hasDebt}`,
        `Precio esperado: ${form.expectedPrice || "No indicado"}`,
        form.inquiryType === "tradein"
          ? `Vehículo buscado: ${form.desiredVehicle || "No indicado"}`
          : "",
        form.inquiryType === "tradein" ? `Presupuesto: ${form.budget || "No indicado"}` : "",
        `Comentarios: ${form.comments || "Sin comentarios"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    [form],
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.brand.trim() ||
      !form.model.trim() ||
      !form.year.trim() ||
      !consent
    ) {
      toast.error("Completá los datos obligatorios y el consentimiento.");
      return;
    }
    setSending(true);
    try {
      await leadService.createTradeInLead({
        Name: form.name.trim(),
        Phone: form.phone.trim(),
        Email: form.email.trim() || null,
        Message: message,
        VehicleId: null,
        Source: form.inquiryType,
        InquiryType:
          form.inquiryType === "tradein" ? "Trade-in / Parte de pago" : "Venta de vehículo",
        attachments: files,
      });
      setSent(true);
      toast.success("Propuesta recibida. Te contactaremos para dar seguimiento.");
    } catch {
      toast.error("No se pudo enviar. Intentá nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="cotizar-vehiculo"
      className="scroll-mt-28 border-t border-border bg-surface py-12 md:py-16 md:py-24"
    >
      <div className="container-aa">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Cotización</p>
          <h2 className="headline mt-2 text-3xl md:text-5xl">Enviá los datos de tu vehículo</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            El formulario está dividido por secciones para que la información llegue completa y
            pueda revisarse con mayor rapidez.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="rounded-lg border border-border bg-surface-elevated p-5 shadow-card md:p-8">
            {sent ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366]">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-5 text-3xl text-foreground">Solicitud recibida</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Gracias, {form.name}. Revisaremos la información y te contactaremos para continuar
                  el proceso.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <FormSection
                  number="01"
                  title="Objetivo y contacto"
                  description="Indicá qué buscás y cómo podemos localizarte."
                >
                  <fieldset>
                    <legend className="sr-only">Tipo de solicitud</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        {
                          value: "tradein" as const,
                          title: "Parte de pago",
                          text: "Quiero cambiar de vehículo",
                        },
                        {
                          value: "sell" as const,
                          title: "Venta directa",
                          text: "Quiero ofrecer mi vehículo",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`cursor-pointer rounded-lg border p-4 transition-colors ${form.inquiryType === option.value ? "border-accent bg-accent/10" : "border-border bg-background hover:border-foreground/20"}`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            checked={form.inquiryType === option.value}
                            onChange={() => setForm({ ...form, inquiryType: option.value })}
                          />
                          <span className="block font-semibold text-foreground">
                            {option.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {option.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <TextInput
                      label="Nombre completo"
                      required
                      value={form.name}
                      onChange={(value) => setForm({ ...form, name: value })}
                    />
                    <TextInput
                      label="WhatsApp"
                      required
                      value={form.phone}
                      onChange={(value) => setForm({ ...form, phone: value })}
                      placeholder="+506 0000-0000"
                    />
                    <TextInput
                      label="Correo (opcional)"
                      type="email"
                      value={form.email}
                      onChange={(value) => setForm({ ...form, email: value })}
                    />
                  </div>
                </FormSection>

                <FormSection
                  number="02"
                  title="Datos del vehículo"
                  description="Información básica para identificar correctamente la unidad."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput
                      label="Marca"
                      required
                      value={form.brand}
                      onChange={(value) => setForm({ ...form, brand: value })}
                    />
                    <TextInput
                      label="Modelo"
                      required
                      value={form.model}
                      onChange={(value) => setForm({ ...form, model: value })}
                    />
                    <TextInput
                      label="Versión"
                      value={form.version}
                      onChange={(value) => setForm({ ...form, version: value })}
                    />
                    <TextInput
                      label="Año"
                      required
                      value={form.year}
                      onChange={(value) => setForm({ ...form, year: value })}
                    />
                    <div className="grid grid-cols-[1fr_110px] gap-3">
                      <TextInput
                        label="Kilometraje"
                        value={form.km}
                        onChange={(value) => setForm({ ...form, km: value })}
                      />
                      <SelectInput
                        label="Unidad"
                        value={form.kmUnit}
                        onChange={(value) => setForm({ ...form, kmUnit: value })}
                        options={["km", "millas"]}
                      />
                    </div>
                    <SelectInput
                      label="Transmisión"
                      value={form.transmission}
                      onChange={(value) => setForm({ ...form, transmission: value })}
                      options={["Automática", "Manual"]}
                    />
                    <SelectInput
                      label="Combustible"
                      value={form.fuel}
                      onChange={(value) => setForm({ ...form, fuel: value })}
                      options={["Gasolina", "Diésel", "Híbrido", "Eléctrico"]}
                    />
                    <TextInput
                      label="Color"
                      value={form.color}
                      onChange={(value) => setForm({ ...form, color: value })}
                    />
                  </div>
                </FormSection>

                <FormSection
                  number="03"
                  title="Condición y expectativas"
                  description="Contanos el estado actual y qué esperás del proceso."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectInput
                      label="Estado general"
                      value={form.condition}
                      onChange={(value) => setForm({ ...form, condition: value })}
                      options={["Excelente", "Buen estado", "Regular", "Para reparar"]}
                    />
                    <SelectInput
                      label="¿Tiene deuda?"
                      value={form.hasDebt}
                      onChange={(value) => setForm({ ...form, hasDebt: value })}
                      options={["No", "Sí"]}
                    />
                    <TextInput
                      label="Precio esperado (USD)"
                      value={form.expectedPrice}
                      onChange={(value) => setForm({ ...form, expectedPrice: value })}
                      placeholder="Ej. 18,000"
                    />
                    {form.inquiryType === "tradein" && (
                      <>
                        <TextInput
                          label="Vehículo que buscás"
                          value={form.desiredVehicle}
                          onChange={(value) => setForm({ ...form, desiredVehicle: value })}
                          placeholder="Ej. SUV, Toyota Prado…"
                        />
                        <TextInput
                          label="Presupuesto aproximado"
                          value={form.budget}
                          onChange={(value) => setForm({ ...form, budget: value })}
                          placeholder="Ej. $30,000"
                        />
                      </>
                    )}
                  </div>
                  <label className="mt-4 block">
                    <FieldLabel>Comentarios y detalles relevantes</FieldLabel>
                    <textarea
                      value={form.comments}
                      onChange={(event) => setForm({ ...form, comments: event.target.value })}
                      rows={4}
                      className="contact-field min-h-28 resize-y py-3"
                      placeholder="Reparaciones, extras, mantenimientos, observaciones…"
                    />
                  </label>
                </FormSection>

                <FormSection
                  number="04"
                  title="Fotografías y envío"
                  description="Agregá imágenes claras para completar la revisión inicial."
                >
                  <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-5 text-center transition-colors hover:border-accent">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      multiple
                      onChange={(event) => addFiles(event.target.files)}
                      className="sr-only"
                    />
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Upload className="size-6" />
                    </span>
                    <span className="mt-3 text-sm font-semibold text-foreground">
                      Seleccionar fotografías
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG, WEBP o HEIC · máximo {MAX_FILES} archivos
                    </span>
                  </label>

                  {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {files.map((file, index) => (
                        <FilePreview
                          key={`${file.name}-${file.lastModified}-${index}`}
                          file={file}
                          onRemove={() => removeFile(index)}
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    {files.length}/{MAX_FILES} archivos · {(totalSize / 1024 / 1024).toFixed(1)} MB
                  </p>

                  <label className="mt-5 flex items-start gap-3 rounded-md bg-background p-4 text-xs leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-0.5 accent-[var(--accent)]"
                    />
                    <span>
                      Autorizo a Autos Abre a contactarme y procesar la información enviada para
                      evaluar esta solicitud.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                  >
                    <Send className="size-4" /> {sending ? "Enviando…" : "Enviar propuesta"}
                  </button>
                </FormSection>
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-lg border border-border bg-surface-elevated p-6">
              <p className="eyebrow">Revisión rápida</p>
              <h3 className="mt-2 text-2xl text-foreground">Antes de enviar</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Datos de contacto correctos",
                  "Marca, modelo y año",
                  "Kilometraje aproximado",
                  "Condición y deudas declaradas",
                  "Fotografías claras",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={buildWhatsAppUrl(
                "Hola Autos Abre, tengo una consulta sobre la venta o parte de pago de mi vehículo.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb958]"
            >
              <MessageCircle className="size-5" /> Resolver duda por WhatsApp
            </a>
          </aside>
        </form>
      </div>
    </section>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-start gap-4 border-b border-border pb-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
          {number}
        </span>
        <div>
          <h3 className="text-2xl text-foreground">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="group relative overflow-hidden rounded-md border border-border bg-background">
      {url && (
        <img
          src={url}
          alt={`Vista previa de ${file.name}`}
          className="aspect-square w-full object-cover"
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/75 text-white transition-colors hover:bg-accent"
        aria-label={`Eliminar ${file.name}`}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function TextInput({
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

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="contact-field"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
