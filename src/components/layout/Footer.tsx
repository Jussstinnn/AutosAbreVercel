import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { siteConfig, buildWhatsAppUrl } from "@/config/siteConfig";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-aa grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Vehículos seleccionados en Cartago — del día a día a la pasión automotriz.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/inventario" className="hover:text-accent">
                Inventario
              </Link>
            </li>
            <li>
              <Link to="/ofertas" className="hover:text-accent">
                Ofertas
              </Link>
            </li>
            <li>
              <Link to="/coleccion" className="hover:text-accent">
                Colección
              </Link>
            </li>
            <li>
              <Link to="/financiamiento" className="hover:text-accent">
                Financiamiento
              </Link>
            </li>
            <li>
              <Link to="/vender" className="hover:text-accent">
                Vendé tu carro
              </Link>
            </li>
            <li>
              <Link to="/vendidos" className="hover:text-accent">
                Vendidos
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-accent">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-accent">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Contacto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 text-accent shrink-0" aria-hidden />
              {siteConfig.address}
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden /> {siteConfig.phoneFormatted}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.secondaryPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden /> {siteConfig.secondaryPhoneFormatted}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp{" "}
                {siteConfig.whatsappFormatted}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden /> {siteConfig.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Síguenos</h4>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:text-accent"
          >
            <Instagram className="size-4" aria-hidden />
            {siteConfig.instagramHandle}
          </a>
          <div className="mt-6">
            <h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/politica-de-privacidad" className="hover:text-accent">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos-de-uso" className="hover:text-accent">
                  Términos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-aa flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </span>
          <span>Hecho en Cartago, Costa Rica.</span>
        </div>
      </div>
    </footer>
  );
}
