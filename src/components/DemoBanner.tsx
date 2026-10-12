import React, { useState } from 'react';
import { Info, X, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { setActiveTab } = useApp();

  if (isDismissed) return null;

  return (
    <div className="bg-[#121318] border-b border-[#262832] text-xs text-zinc-300 py-2.5 px-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          <div className="flex items-center gap-1.5 font-medium text-zinc-200">
            <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[11px]">Mode Demo Aktif:</span>
            <span>Uji coba gratis seluruh fitur katalog sewa, kalkulator harga, formulir penawaran, & WhatsApp otomatis.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('admin')}
            className="text-[11px] text-[#e5c378] hover:text-white underline underline-offset-2 transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Buka Dashboard Admin (PIN: 1234)</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            aria-label="Tutup Banner Demo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
