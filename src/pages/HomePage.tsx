import { SEO } from "@/components/seo/SEO";
import {
  EditorialSplit,
  FeaturedVehicles,
  FinalCTA,
  FinancingTeaser,
  InstagramStrip,
  LocationBlock,
  NewArrivals,
  OffersSection,
  ProcessSteps,
  TradeInBanner,
  WhyAutosAbre,
} from "@/components/home/Sections";
import { Hero, MainSearch } from "@/components/home/Hero";
import { BrandLogoCarousel } from "@/components/home/BrandLogoCarousel";
import { siteConfig } from "@/config/siteConfig";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cartago",
      addressCountry: "CR",
      streetAddress: siteConfig.address,
    },
    telephone: siteConfig.phone,
    url: typeof window !== "undefined" ? window.location.origin : "",
    sameAs: [siteConfig.instagramUrl],
  };
  return (
    <>
      <SEO
        title="Autos Abre — Vehículos seleccionados en Cartago"
        description={siteConfig.description}
        jsonLd={jsonLd}
      />
      <Hero />
      <MainSearch />
      <BrandLogoCarousel />
      <EditorialSplit />
      <FeaturedVehicles />
      <NewArrivals />
      <OffersSection />
      <ProcessSteps />
      <TradeInBanner />
      <FinancingTeaser />
      <WhyAutosAbre />
      <InstagramStrip />
      <LocationBlock />
      <FinalCTA />
    </>
  );
}
