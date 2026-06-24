import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  Handshake,
  Info,
  MessageCircle,
  Send,
  ShieldCheck,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { monthlyPayment } from "@/utils/format";
import { leadService } from "@/services";
import { buildWhatsAppUrl } from "@/config/siteConfig";
import heroImg from "@/assets/editorial-passion.jpg";

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

export default function FinancingPage() {
  return (
    <>
      <SEO
        title="Financiamiento — Autos Abre"
        description="Conocé el proceso de financiamiento de Autos Abre, calculá una cuota estimada y enviá una solicitud de pre-evaluación. Sujeto a análisis y aprobación."
      />
      <FinancingHero />
      <FinancingSteps />
      <CalculatorSection />
      <RequirementsSection />
      <PrequalificationSection />
      <FAQ />
    </>
  );
}

function FinancingHero() {
  return (
    <header className="relative isolate overflow-hidden border-b border-border py-14 md:py-28">
      <img
        src={heroImg}
        alt="Financiamiento de vehículos Autos Abre"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/93 to-background/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_25%,rgba(215,25,32,0.25),transparent_48%)]" />
      <div className="container-aa">
        <p className="eyebrow">Financiamiento</p>
        <h1 className="headline mt-3 max-w-4xl text-4xl leading-[0.98] md:text-6xl">
          Tu próximo carro puede estar más cerca
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Calculá una cuota aproximada, conocé el proceso y enviá tus datos para recibir orientación
          sobre las alternativas disponibles. Toda aprobación está sujeta al análisis de la entidad
          financiera.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#calculadora"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            <Calculator className="size-4" /> Calcular cuota
          </a>
          <a
            href="#precalificacion"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-black/25 px-7 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Solicitar orientación <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function FinancingSteps() {
  const steps = [
    {
      icon: WalletCards,
      title: "Elegí el vehículo",
      text: "Seleccioná una unidad del inventario o indicá el presupuesto que tenés en mente.",
    },
    {
      icon: Calculator,
      title: "Estimá tu cuota",
      text: "Definí una prima y un plazo para tener una referencia antes de enviar la solicitud.",
    },
    {
      icon: FileCheck2,
      title: "Enviá tus datos",
      text: "Completá la pre-solicitud con información básica para orientar el proceso.",
    },
    {
      icon: Handshake,
      title: "Recibí acompañamiento",
      text: "Un asesor te explica las opciones y los siguientes pasos según tu perfil.",
    },
  ];

  return (
    <section className="border-b border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa">
        <div className="text-center">
          <p className="eyebrow">Proceso claro</p>
          <h2 className="headline mt-2 text-3xl md:text-5xl">Financiá en cuatro pasos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            La página te permite prepararte antes de hablar con un asesor, sin promesas de
            aprobación ni condiciones ocultas.
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

function CalculatorSection() {
  const [price, setPrice] = useState(25000);
  const [down, setDown] = useState(5000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(14.4);

  const safePrice = Number.isFinite(price) ? Math.max(price, 0) : 0;
  const safeDown = Number.isFinite(down) ? Math.min(Math.max(down, 0), safePrice) : 0;
  const financed = Math.max(safePrice - safeDown, 0);
  const payment = monthlyPayment({ price: safePrice, down: safeDown, months, annualRate: rate });
  const total = payment * months + safeDown;
  const downPercent = safePrice > 0 ? Math.round((safeDown / safePrice) * 100) : 0;

  return (
    <section id="calculadora" className="scroll-mt-28 bg-background py-12 md:py-16 md:py-24">
      <div className="container-aa">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Calculadora orientativa</p>
            <h2 className="headline mt-2 text-3xl md:text-5xl">Probá diferentes escenarios</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Ajustá el precio, la prima y el plazo. El resultado es únicamente una referencia y no
              representa una oferta final de crédito.
            </p>

            <div className="mt-7 space-y-4">
              <Feature
                icon={CircleDollarSign}
                title="Prima flexible"
                text="Compará cómo cambia la cuota al aumentar el pago inicial."
              />
              <Feature
                icon={ShieldCheck}
                title="Cálculo transparente"
                text="Mostramos monto financiado, cuota y total estimado."
              />
              <Feature
                icon={UserRoundCheck}
                title="Orientación personal"
                text="La condición final depende del análisis individual."
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface-elevated p-5 shadow-elegant md:p-8">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <span className="flex size-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Calculator className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Simulación
                </p>
                <h3 className="text-2xl text-foreground">Calculadora de cuotas</h3>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Precio del vehículo (USD)"
                value={price}
                onChange={setPrice}
                min={0}
              />
              <NumberField
                label="Prima (USD)"
                value={down}
                onChange={setDown}
                min={0}
                max={safePrice || undefined}
              />
              <label className="block">
                <FieldLabel>Plazo</FieldLabel>
                <select
                  value={months}
                  onChange={(event) => setMonths(Number(event.target.value))}
                  className="contact-field"
                >
                  {TERM_OPTIONS.map((term) => (
                    <option key={term} value={term}>
                      {term} meses
                    </option>
                  ))}
                </select>
              </label>
              <NumberField
                label="Tasa anual referencial (%)"
                value={rate}
                onChange={setRate}
                min={0}
                step={0.1}
              />
            </div>

            <div className="mt-6 rounded-lg border border-accent/25 bg-accent/10 p-6 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Cuota mensual aproximada
              </p>
              <p className="mt-2 font-display text-5xl font-bold text-foreground">
                ${payment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">
                  /mes
                </span>
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SummaryCard
                label="Prima"
                value={`$${safeDown.toLocaleString("en-US")}`}
                detail={`${downPercent}% del precio`}
              />
              <SummaryCard
                label="A financiar"
                value={`$${financed.toLocaleString("en-US")}`}
                detail={`${months} meses`}
              />
              <SummaryCard
                label="Total estimado"
                value={`$${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                detail="Incluye prima"
              />
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-md bg-background p-4 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-accent" />
              <p>
                La tasa es editable y solo se utiliza para la simulación. Cargos, seguros,
                comisiones y condiciones reales pueden variar según la entidad financiera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Calculator;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-surface-elevated p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-lg text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
    </div>
  );
}

function RequirementsSection() {
  const profiles = [
    {
      icon: BriefcaseBusiness,
      title: "Persona asalariada",
      items: [
        "Identificación vigente",
        "Constancia salarial o comprobantes",
        "Información laboral actual",
      ],
    },
    {
      icon: CircleDollarSign,
      title: "Persona independiente",
      items: [
        "Identificación vigente",
        "Comprobantes de ingresos",
        "Información de la actividad económica",
      ],
    },
    {
      icon: FileCheck2,
      title: "Otros perfiles",
      items: [
        "Identificación vigente",
        "Respaldo de ingresos",
        "Documentación solicitada por la entidad",
      ],
    },
  ];

  return (
    <section className="border-y border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa">
        <div className="max-w-3xl">
          <p className="eyebrow">Prepará tu solicitud</p>
          <h2 className="headline mt-2 text-3xl md:text-5xl">Documentación habitual</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Estos requisitos son orientativos. La entidad financiera puede solicitar información
            adicional según cada caso.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {profiles.map((profile) => (
            <article
              key={profile.title}
              className="rounded-lg border border-border bg-surface-elevated p-6 shadow-card"
            >
              <span className="flex size-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                <profile.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-2xl text-foreground">{profile.title}</h3>
              <ul className="mt-5 space-y-3">
                {profile.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrequalificationSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    employment: "Asalariado",
    income: "",
    downPayment: "",
    term: "60",
    vehicle: "",
    notes: "",
  });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const message = useMemo(
    () =>
      [
        `Tipo de ingreso: ${form.employment}`,
        `Ingreso mensual aproximado: ${form.income || "No indicado"}`,
        `Prima disponible: ${form.downPayment || "No indicada"}`,
        `Plazo preferido: ${form.term} meses`,
        `Vehículo o presupuesto: ${form.vehicle || "No indicado"}`,
        `Comentarios: ${form.notes || "Sin comentarios"}`,
      ].join("\n"),
    [form],
  );

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
        Message: message,
        VehicleId: null,
        Source: "financing",
      });
      setSent(true);
      toast.success("Solicitud recibida. Te contactaremos para orientarte.");
    } catch {
      toast.error("No se pudo enviar. Intentá nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="precalificacion" className="scroll-mt-28 bg-background py-12 md:py-16 md:py-24">
      <div className="container-aa">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Pre-solicitud</p>
            <h2 className="headline mt-2 text-3xl md:text-5xl">Recibí orientación personalizada</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Enviá información básica para que el equipo pueda explicarte opciones y próximos
              pasos. No solicitamos datos bancarios ni información sensible en este formulario.
            </p>
            <a
              href={buildWhatsAppUrl("Hola Autos Abre, quisiera información sobre financiamiento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-5 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/15"
            >
              <MessageCircle className="size-5" /> Consultar por WhatsApp
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-surface-elevated p-5 shadow-card md:p-8"
          >
            {sent ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366]">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-5 text-3xl text-foreground">Solicitud recibida</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Gracias, {form.name}. Un asesor podrá contactarte para ampliar la información.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                  <span className="flex size-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Send className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Paso final
                    </p>
                    <h3 className="text-2xl text-foreground">Datos para contactarte</h3>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
                  <label className="block">
                    <FieldLabel>Tipo de ingreso</FieldLabel>
                    <select
                      value={form.employment}
                      onChange={(event) => setForm({ ...form, employment: event.target.value })}
                      className="contact-field"
                    >
                      <option>Asalariado</option>
                      <option>Independiente</option>
                      <option>Pensionado</option>
                      <option>Otro</option>
                    </select>
                  </label>
                  <TextInput
                    label="Ingreso mensual aproximado"
                    value={form.income}
                    onChange={(value) => setForm({ ...form, income: value })}
                    placeholder="Ej. ₡900.000"
                  />
                  <TextInput
                    label="Prima disponible"
                    value={form.downPayment}
                    onChange={(value) => setForm({ ...form, downPayment: value })}
                    placeholder="Ej. $5,000"
                  />
                  <label className="block">
                    <FieldLabel>Plazo preferido</FieldLabel>
                    <select
                      value={form.term}
                      onChange={(event) => setForm({ ...form, term: event.target.value })}
                      className="contact-field"
                    >
                      {TERM_OPTIONS.map((term) => (
                        <option key={term} value={term}>
                          {term} meses
                        </option>
                      ))}
                    </select>
                  </label>
                  <TextInput
                    label="Vehículo o presupuesto"
                    value={form.vehicle}
                    onChange={(value) => setForm({ ...form, vehicle: value })}
                    placeholder="Ej. SUV de $25,000"
                  />
                </div>

                <label className="block">
                  <FieldLabel>Comentarios</FieldLabel>
                  <textarea
                    value={form.notes}
                    onChange={(event) => setForm({ ...form, notes: event.target.value })}
                    rows={4}
                    className="contact-field min-h-28 resize-y py-3"
                  />
                </label>

                <label className="flex items-start gap-3 rounded-md bg-background p-4 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-0.5 accent-[var(--accent)]"
                  />
                  <span>
                    Autorizo a Autos Abre a contactarme para orientar esta solicitud. Entiendo que
                    el envío no garantiza aprobación.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                  <Send className="size-4" /> {sending ? "Enviando…" : "Enviar pre-solicitud"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    [
      "¿La calculadora garantiza esa cuota?",
      "No. Es una referencia basada en los valores que ingresés. La cuota real depende de tasa, seguros, cargos y aprobación.",
    ],
    [
      "¿Puedo financiar cualquier vehículo?",
      "La disponibilidad de financiamiento depende de la unidad, su antigüedad y las políticas de la entidad financiera.",
    ],
    [
      "¿Cuánto debo dar de prima?",
      "La prima varía según el vehículo y el perfil. Una prima mayor generalmente reduce el monto a financiar.",
    ],
    [
      "¿Enviar el formulario afecta mi historial?",
      "El formulario de esta página solo solicita información preliminar. Cualquier consulta formal debe ser explicada y autorizada por la entidad correspondiente.",
    ],
  ];

  return (
    <section className="border-t border-border bg-surface py-12 md:py-12 md:py-20">
      <div className="container-aa max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 className="headline mt-2 text-3xl md:text-4xl">Lo que necesitás saber</h2>
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
        <div className="mt-8 text-center">
          <Link
            to="/inventario"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:underline"
          >
            Ver vehículos disponibles <ArrowRight className="size-4" />
          </Link>
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

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        min={min}
        max={max}
        step={step}
        className="contact-field"
      />
    </label>
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
