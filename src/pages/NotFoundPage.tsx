import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Página no encontrada — Autos Abre" />
      <div className="container-aa flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-display text-8xl text-accent">404</p>
        <h1 className="mt-4 text-2xl font-semibold">No encontramos esta página</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Es posible que el enlace haya cambiado o que el contenido ya no esté disponible.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="rounded-md border border-border px-5 py-2.5 text-sm">
            Ir al inicio
          </Link>
          <Link
            to="/inventario"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Ver inventario
          </Link>
        </div>
      </div>
    </>
  );
}
