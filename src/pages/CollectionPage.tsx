import { Instagram } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import collectionHero from "@/assets/collection-hero.jpg";
import { mockCollection } from "@/data/mockCollection";
import { siteConfig } from "@/config/siteConfig";

export default function CollectionPage() {
  return (
    <>
      <SEO
        title="Colección Autos Abre — Pasión automotriz"
        description="Contenido editorial sobre vehículos especiales y cultura automotriz. No es inventario comercial."
      />
      <header className="relative isolate min-h-[60vh] overflow-hidden border-b border-border">
        <img
          src={collectionHero}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container-aa flex min-h-[60vh] flex-col justify-end py-12 md:py-20">
          <p className="eyebrow">Colección · Contenido editorial</p>
          <h1 className="headline mt-3 text-5xl md:text-7xl">Pasión Autos Abre</h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Una selección visual y editorial sobre cultura automotriz. Este contenido no representa
            inventario disponible para la venta.
          </p>
        </div>
      </header>

      <section className="container-aa py-12 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {mockCollection.map((item, i) => (
            <article key={item.id} className={`group ${i % 3 === 0 ? "md:col-span-2" : ""}`}>
              <div className="overflow-hidden rounded-md border border-border">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}
                />
              </div>
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
                  {item.category} · {item.era}
                </p>
                <h2 className="headline mt-2 text-2xl md:text-3xl">{item.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{item.excerpt}</p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  Colección / contenido editorial — no disponible para venta
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-aa text-center">
          <h2 className="headline text-3xl md:text-4xl">Más contenido en Instagram</h2>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
          >
            <Instagram className="size-4" /> Seguir en Instagram
          </a>
        </div>
      </section>
    </>
  );
}
