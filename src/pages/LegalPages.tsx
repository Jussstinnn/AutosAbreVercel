import { SEO } from "@/components/seo/SEO";
import { siteConfig } from "@/config/siteConfig";

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Política de privacidad — Autos Abre"
        description="Política de privacidad de Autos Abre."
      />
      <div className="container-aa max-w-3xl py-16">
        <h1 className="headline text-3xl md:text-5xl">Política de privacidad</h1>
        <div className="prose-aa mt-8 space-y-4 text-sm text-muted-foreground">
          <p>
            En {siteConfig.name} valoramos la privacidad de quienes nos contactan. Esta política
            describe de manera general cómo tratamos la información que compartís con nosotros.
          </p>
          <h2 className="text-base font-semibold text-foreground">Datos que recopilamos</h2>
          <p>
            Recibimos nombre, número de contacto, correo (opcional), datos del vehículo de interés o
            del vehículo que ofrecés, e imágenes adjuntas, cuando completás un formulario o nos
            escribís por WhatsApp.
          </p>
          <h2 className="text-base font-semibold text-foreground">Uso de la información</h2>
          <p>
            Usamos esta información únicamente para responder consultas, coordinar visitas, evaluar
            vehículos para parte de pago, y orientar sobre alternativas de financiamiento.
          </p>
          <h2 className="text-base font-semibold text-foreground">Conservación</h2>
          <p>
            Conservamos los datos solo el tiempo necesario para dar seguimiento a tu consulta. Si lo
            solicitás, eliminamos la información asociada a tu contacto.
          </p>
          <h2 className="text-base font-semibold text-foreground">Terceros</h2>
          <p>
            No vendemos ni compartimos tus datos con terceros con fines de marketing. Compartimos
            información con entidades financieras únicamente con tu autorización, en el contexto de
            una solicitud de financiamiento.
          </p>
          <h2 className="text-base font-semibold text-foreground">Contacto</h2>
          <p>
            Para cualquier consulta sobre privacidad, escribinos por WhatsApp al{" "}
            {siteConfig.whatsappFormatted}.
          </p>
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <SEO
        title="Términos de uso — Autos Abre"
        description="Términos de uso del sitio Autos Abre."
      />
      <div className="container-aa max-w-3xl py-16">
        <h1 className="headline text-3xl md:text-5xl">Términos de uso</h1>
        <div className="prose-aa mt-8 space-y-4 text-sm text-muted-foreground">
          <p>El uso de este sitio implica la aceptación de los siguientes términos.</p>
          <h2 className="text-base font-semibold text-foreground">Información publicada</h2>
          <p>
            La información de vehículos (precio, kilometraje, equipamiento) es informativa y puede
            variar. Confirmá los detalles directamente con nosotros antes de cualquier decisión.
          </p>
          <h2 className="text-base font-semibold text-foreground">Financiamiento</h2>
          <p>
            Las alternativas de financiamiento mencionadas en este sitio están sujetas a análisis y
            aprobación por parte de la entidad financiera correspondiente. {siteConfig.name} no
            garantiza aprobación.
          </p>
          <h2 className="text-base font-semibold text-foreground">Parte de pago</h2>
          <p>
            La recepción de vehículos en parte de pago está sujeta a inspección y valoración. No
            constituye una oferta vinculante.
          </p>
          <h2 className="text-base font-semibold text-foreground">Propiedad intelectual</h2>
          <p>
            El diseño, identidad y contenido editorial de este sitio son propiedad de{" "}
            {siteConfig.name}.
          </p>
        </div>
      </div>
    </>
  );
}
