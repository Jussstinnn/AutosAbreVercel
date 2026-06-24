import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import InventoryPage from "@/pages/InventoryPage";
import VehicleDetailPage from "@/pages/VehicleDetailPage";
import CollectionPage from "@/pages/CollectionPage";
import FinancingPage from "@/pages/FinancingPage";
import SellPage from "@/pages/SellPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import SoldPage from "@/pages/SoldPage";
import OffersPage from "@/pages/OffersPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { PrivacyPage, TermsPage } from "@/pages/LegalPages";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventario" element={<InventoryPage />} />
        <Route path="/ofertas" element={<OffersPage />} />
        <Route path="/vehiculo/:id" element={<VehicleDetailPage />} />
        <Route path="/coleccion" element={<CollectionPage />} />
        <Route path="/financiamiento" element={<FinancingPage />} />
        <Route path="/vender" element={<SellPage />} />
        <Route path="/vender-mi-carro" element={<Navigate to="/vender" replace />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/vendidos" element={<SoldPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPage />} />
        <Route path="/terminos-de-uso" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
