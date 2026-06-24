import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Audi from "@/assets/brands/Audi-Symbol.png";
import Bmw from "@/assets/brands/BMW-Logo-1997-2020.png";
import Chevrolet from "@/assets/brands/Chevrolet-Logo.png";
import Dodge from "@/assets/brands/Dodge-Logo.png";
import Ford from "@/assets/brands/Ford-Logo-1965-present.png";
import LandRover from "@/assets/brands/Land-Rover-Logo-1986-present.png";
import Mercedes from "@/assets/brands/Mercedes-Benz-Logo.png";
import Porsche from "@/assets/brands/Porsche-Logo.png";
import Toyota from "@/assets/brands/Toyota-Symbol.png";

const BRANDS = [
  { name: "Toyota", brand: "Toyota", src: Toyota },
  { name: "Ford", brand: "Ford", src: Ford },
  { name: "Chevrolet", brand: "Chevrolet", src: Chevrolet },
  { name: "Dodge", brand: "Dodge", src: Dodge },
  { name: "Land Rover", brand: "Land Rover", src: LandRover },
  { name: "Mercedes-Benz", brand: "Mercedes-Benz", src: Mercedes },
  { name: "Porsche", brand: "Porsche", src: Porsche },
  { name: "BMW", brand: "BMW", src: Bmw },
  { name: "Audi", brand: "Audi", src: Audi },
] as const;

function BrandGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="brand-marquee-group"
      data-brand-group={duplicate ? "duplicate" : "primary"}
      aria-hidden={duplicate || undefined}
    >
      {BRANDS.map((item) => (
        <Link
          key={`${duplicate ? "copy" : "main"}-${item.name}`}
          to={`/inventario?brand=${encodeURIComponent(item.brand)}`}
          className="brand-marquee-item"
          aria-label={duplicate ? undefined : `Ver vehículos ${item.name}`}
          tabIndex={duplicate ? -1 : 0}
        >
          <img
            src={item.src}
            alt={duplicate ? "" : item.name}
            className="brand-marquee-image"
            loading="eager"
            decoding="async"
          />
        </Link>
      ))}
    </div>
  );
}

export function BrandLogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame = 0;
    let lastTimestamp = performance.now();
    let offset = 0;

    const animate = (timestamp: number) => {
      const primaryGroup = track.querySelector<HTMLElement>('[data-brand-group="primary"]');
      const loopWidth = primaryGroup?.offsetWidth ?? 0;
      const elapsedSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      const speed = window.innerWidth <= 640 ? 26 : window.innerWidth <= 1024 ? 32 : 38;

      lastTimestamp = timestamp;
      offset += speed * elapsedSeconds;

      if (loopWidth > 0 && offset >= loopWidth) {
        offset %= loopWidth;
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      track.style.transform = "translate3d(0, 0, 0)";
    };
  }, []);

  return (
    <section className="border-y border-border bg-surface py-7 md:py-9">
      <div className="container-aa mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Marcas disponibles</p>
          <h2 className="headline mt-2 text-2xl md:text-3xl">Encontrá la marca que buscás</h2>
        </div>
        <Link
          to="/inventario"
          className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
        >
          Ver inventario
        </Link>
      </div>

      <div className="brand-marquee" aria-label="Carrusel automático de marcas disponibles">
        <div ref={trackRef} className="brand-marquee-track">
          <BrandGroup />
          <BrandGroup duplicate />
        </div>
      </div>
    </section>
  );
}
