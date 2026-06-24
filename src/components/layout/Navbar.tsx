import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/inventario", label: "Inventario" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/coleccion", label: "Colección" },
  { to: "/financiamiento", label: "Financiamiento" },
  { to: "/vender", label: "Vendé tu carro" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/95 backdrop-blur"
            : "border-b border-transparent bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-aa flex h-16 items-center justify-between">
          <Link to="/" aria-label="Autos Abre — inicio" className="shrink-0">
            <Wordmark size="md" />
          </Link>

          <nav className="hidden 2xl:flex items-center gap-6">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-[12px] font-medium tracking-wide uppercase transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && <span className="mt-1 block h-0.5 w-full bg-accent" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton
              variant="compact"
              label="WhatsApp"
              message="Hola Autos Abre, me gustaría más información."
              className="hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-accent hover:text-accent 2xl:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="autos-abre-mobile-menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              id="autos-abre-mobile-menu"
              className="fixed inset-0 z-[9999] 2xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menú principal"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              />
              <aside className="absolute inset-y-0 right-0 flex w-[min(88vw,390px)] flex-col border-l border-border bg-surface shadow-2xl">
                <div className="flex h-16 items-center justify-between border-b border-border px-5">
                  <Wordmark size="md" />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label="Cerrar menú"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-5 py-3">
                  {NAV.map((item) => {
                    const active =
                      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-14 items-center justify-between border-b border-border text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                          active ? "text-accent" : "text-foreground hover:text-accent"
                        }`}
                      >
                        {item.label}
                        <span aria-hidden className="text-muted-foreground">
                          →
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="border-t border-border p-5">
                  <WhatsAppButton
                    message="Hola Autos Abre, me gustaría más información."
                    label="Escribir por WhatsApp"
                    className="w-full justify-center"
                  />
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
