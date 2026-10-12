import React from 'react';
import { Camera, Mail, Phone, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanWhatsAppNumber } from '../utils/formatters';

export const Footer: React.FC = () => {
  const { setActiveTab, settings } = useApp();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060708] border-t border-[#181a20] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#d4af37] via-[#c29b28] to-[#997816] flex items-center justify-center">
                <span className="font-heading font-black text-black text-lg">N</span>
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white">
                NVISUAL
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
              Beyond Visual, Defining Stories.
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Production house independen yang mengedepankan kekuatan cerita, estetika visual sinematik, dan ketelitian teknis pada setiap karya dokumentasi kelulusan sekolah, event, company profile, serta persewaan peralatan audiovisual profesional.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sistem Operasional: Siap Booking & Konsultasi</span>
            </div>
          </div>

          {/* Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Layanan Kreatif</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('paket-kelulusan')}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Dokumentasi Kelulusan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('event-compro')}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Dokumentasi Event</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('event-compro')}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Video Company Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('layanan')}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Film Pendek & Dokumenter</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('persewaan')}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Persewaan Alat Audiovisual</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Eksplorasi & Menu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('beranda')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('portofolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portofolio Sinematik
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('tentang')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang Kami & Etos Kerja
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('kontak')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kontak & Lokasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-zinc-500 hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Portal Admin NVISUAL</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & Bisnis */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hubungi Kami</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2 text-zinc-400">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber(settings.adminWhatsApp)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  +{settings.adminWhatsApp} (WhatsApp Admin)
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-400">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${settings.officialEmail}`}
                  className="hover:text-[#d4af37] transition-colors break-all"
                >
                  {settings.officialEmail}
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{settings.operationalCity}</span>
              </li>
            </ul>
            <div className="pt-2">
              <div className="p-2.5 rounded bg-[#0f1014] border border-[#1d1f27] text-[11px] text-zinc-400">
                <span className="text-[#d4af37] font-semibold block mb-0.5">Efisiensi Biaya (Zero Cost):</span>
                <span>Website dirancang tanpa biaya server atau API berbayar. Semua data tersimpan aman dan divalidasi langsung via WhatsApp.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-6 border-t border-[#181a20] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} NVISUAL Production House. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Beyond Visual, Defining Stories.</span>
            <span>·</span>
            <span>Kamera & Produksi Sinematik</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
