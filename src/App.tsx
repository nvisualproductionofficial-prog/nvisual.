import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoBanner } from './components/DemoBanner';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { EquipmentRentalView } from './components/EquipmentRentalView';
import { GraduationPackagesView } from './components/GraduationPackagesView';
import { EventAndComproView } from './components/EventAndComproView';
import { PortfolioView } from './components/PortfolioView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminPortalView } from './components/AdminPortalView';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-screen">
      {activeTab === 'beranda' && <HomeView />}
      {activeTab === 'layanan' && <ServicesView />}
      {activeTab === 'persewaan' && <EquipmentRentalView />}
      {activeTab === 'paket-kelulusan' && <GraduationPackagesView />}
      {activeTab === 'event-compro' && <EventAndComproView />}
      {activeTab === 'portofolio' && <PortfolioView />}
      {activeTab === 'tentang' && <AboutView />}
      {activeTab === 'kontak' && <ContactView />}
      {activeTab === 'admin' && <AdminPortalView />}
      <EquipmentDetailModal />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#08090a] text-[#e2e4e9] antialiased selection:bg-[#d4af37] selection:text-black">
        <DemoBanner />
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}
