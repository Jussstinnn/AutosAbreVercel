import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import editorialPassion from "@/assets/editorial-passion.jpg";
import editorialEveryday from "@/assets/editorial-everyday.jpg";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

const ABOUT_TEXT = `Autos Abre nace de una pasión genuina por los vehículos y del deseo de ayudar a cada persona a encontrar una opción que se adapte a su camino. Desde carros para el día a día hasta unidades que despiertan emociones, buscamos ofrecer una experiencia clara, cercana y directa.`;

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Nosotros — Autos Abre"
        description="Conocé Autos Abre: agencia automotriz en Cartago con pasión real por los vehículos."
      />
      <header className="relative isolate overflow-hidden border-b border-border bg-surface py-16 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={editorialPassion} alt="" className="size-full object-cover" />
        </div>
        <div className="container-aa max-w-3xl">
          <p className="eyebrow">Nosotros</p>
          <h1 className="headline mt-3 text-4xl md:text-6xl">Pasión real, atención directa</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {ABOUT_TEXT}
          </p>
        </div>
      </header>

      <section className="container-aa py-12 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <article className="space-y-4">
            <p className="eyebrow">Variedad</p>
            <h2 className="headline text-3xl">Opciones para cada camino</h2>
            <p className="text-sm text-muted-foreground">
              No nos limitamos a un solo tipo de vehículo. Nuestro inventario combina opciones
              accesibles y familiares con deportivos, 4x4 y unidades especiales para quienes viven
              la pasión automotriz.
            </p>
          </article>
          <article className="space-y-4">
            <p className="eyebrow">Atención</p>
            <h2 className="headline text-3xl">Cercana y directa</h2>
            <p className="text-sm text-muted-foreground">
              Preferimos conversaciones reales. Escribinos por WhatsApp o visitanos en La Lima de
              Cartago para coordinar una inspección sin compromiso.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-20">
        <div className="container-aa grid gap-6 md:grid-cols-2 md:gap-10">
          <img
            src={editorialEveryday}
            alt=""
            className="aspect-[4/3] w-full rounded-md border border-border object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Lo que valoramos</p>
            <h2 className="headline mt-2 text-3xl">Honestidad, claridad, comunidad</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Información clara sobre cada vehículo.",
                "Posibilidad de recibir tu vehículo en parte de pago, sujeto a valoración.",
                "Alternativas de financiamiento, sujetas a evaluación.",
                "Conversaciones reales — no promesas que no podamos cumplir.",
                "Comunidad de personas que aman los carros.",
              ].map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-aa py-20 text-center">
        <h2 className="headline text-3xl md:text-5xl">Conocé el inventario</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          O conversemos directamente por WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/inventario"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
          >
            Ver inventario
          </Link>
          <WhatsAppButton />
        </div>
      </section>
    </>
  );
}
