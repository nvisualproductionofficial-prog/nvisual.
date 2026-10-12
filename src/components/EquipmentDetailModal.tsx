import React from 'react';
import { X, Check, Shield, AlertCircle, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';

export const EquipmentDetailModal: React.FC = () => {
  const { selectedEquipmentForModal, setSelectedEquipmentForModal, addToCart, setActiveTab } = useApp();
  const [qty, setQty] = React.useState(1);

  if (!selectedEquipmentForModal) return null;

  const item = selectedEquipmentForModal;

  const handleAddToCartAndProceed = () => {
    addToCart(item.id, qty);
    setSelectedEquipmentForModal(null);
    setActiveTab('persewaan');
  };

  const handleJustAdd = () => {
    addToCart(item.id, qty);
    setSelectedEquipmentForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#101116] border border-[#262834] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedEquipmentForModal(null)}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-[#1a1b22] border border-[#2c2e3b] rounded-full transition-colors cursor-pointer"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#0b0c10] min-h-[260px] md:min-h-full flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#262834]">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-full object-cover max-h-[360px] md:max-h-[500px]"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-black/75 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 rounded">
                {item.category.toUpperCase()}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded">
                {item.condition}
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  {item.brand}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                  {item.name}
                </h3>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-md bg-[#16171f] border border-[#242633] space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">Tarif Sewa:</span>
                  <span className="text-xl font-bold text-white">
                    {formatIDR(item.dailyRate)} <span className="text-xs font-normal text-zinc-400">/ 24 jam</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#232532]">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                    Deposit Jaminan:
                  </span>
                  <span className="text-zinc-200 font-medium">
                    {formatIDR(item.depositAmount)} <span className="text-zinc-400 text-[10px]">(Refundable)</span>
                  </span>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Spesifikasi Utama
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {item.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inclusions (Kelengkapan) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Kelengkapan Paket Sewa
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {item.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-1.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Notes */}
              {item.usageNotes && (
                <div className="p-3 rounded bg-[#13141b] border border-[#242633] text-xs text-zinc-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item.usageNotes}</p>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-[#242633] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Jumlah Unit:</span>
                <div className="flex items-center gap-3 bg-[#181922] border border-[#2c2e3d] rounded px-3 py-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    className="text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-white w-4 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(item.stockCount || 5, qty + 1))}
                    className="text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleJustAdd}
                  className="px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>+ Keranjang</span>
                </button>
                <button
                  onClick={handleAddToCartAndProceed}
                  className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Sewa Sekarang</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
