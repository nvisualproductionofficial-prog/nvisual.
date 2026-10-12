import React, { useState } from 'react';
import {
  Menu,
  X,
  Camera,
  ShoppingBag,
  Lock,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanWhatsAppNumber } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, cart, settings, isAdminLoggedIn } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'persewaan', label: 'Persewaan Alat', badge: totalCartItems > 0 ? totalCartItems : null },
    { id: 'paket-kelulusan', label: 'Paket Kelulusan' },
    { id: 'event-compro', label: 'Event & Compro' },
    { id: 'portofolio', label: 'Portofolio' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectWhatsApp = () => {
    const phone = cleanWhatsAppNumber(settings.adminWhatsApp);
    const message = encodeURIComponent(
      'Halo tim NVISUAL! Saya ingin berkonsultasi mengenai kebutuhan produksi visual / persewaan alat.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#08090a]/90 backdrop-blur-md border-b border-[#1f2128]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNavClick('beranda')}
            className="flex flex-col cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#d4af37] via-[#c29b28] to-[#997816] flex items-center justify-center shadow-lg shadow-[#d4af37]/20 group-hover:scale-105 transition-transform duration-300">
                <span className="font-heading font-black text-black text-lg tracking-tighter">N</span>
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white group-hover:text-[#e5c378] transition-colors">
                NVISUAL
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 pl-10 font-medium hidden sm:block">
              Beyond Visual, Defining Stories
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#f5deb3]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#d4af37] text-black min-w-4 h-4">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Admin Portal & WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-md text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10'
                  : 'border-[#2a2c36] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 bg-[#121318]'
              }`}
              title="Dashboard Pengelolaan Admin"
            >
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[12px] font-medium">
                {isAdminLoggedIn ? 'Admin (Aktif)' : 'Admin'}
              </span>
            </button>

            <button
              onClick={handleDirectWhatsApp}
              className="px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black" />
              <span>Konsultasi WA</span>
            </button>
          </div>

          {/* Mobile Menu & Cart Icon */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('persewaan')}
              className="p-2 relative text-zinc-300 hover:text-white"
              aria-label="Keranjang Persewaan"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d4af37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-md border border-[#2a2c36] bg-[#121318]"
              aria-label="Buka Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-b border-[#262832] bg-[#0c0d11] px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest px-3 py-1">
            Menu Navigasi
          </div>
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#181920] text-[#d4af37] border-l-2 border-[#d4af37]'
                    : 'text-zinc-300 hover:bg-[#15161c] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.badge ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d4af37] text-black">
                    {link.badge} item
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#1f2128] space-y-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-medium border border-[#2a2c36] text-zinc-300 bg-[#121318]"
            >
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{isAdminLoggedIn ? 'Dashboard Admin (Login)' : 'Dashboard Admin'}</span>
            </button>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Chat WhatsApp Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
