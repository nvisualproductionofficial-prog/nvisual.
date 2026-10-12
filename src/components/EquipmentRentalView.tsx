import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Info,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EquipmentCategory, EquipmentItem, RentalBooking } from '../types';
import { formatIDR, generateRefCode, cleanWhatsAppNumber } from '../utils/formatters';
import { buildRentalWhatsAppUrl } from '../utils/whatsapp';

export const EquipmentRentalView: React.FC = () => {
  const {
    equipment,
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    setSelectedEquipmentForModal,
    addRentalBooking,
    settings
  } = useApp();

  // Search, filter, sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  // Booking Form State
  const [pickupDate, setPickupDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState<string>('09:00');

  const [returnDate, setReturnDate] = useState<string>(() => {
    const afterTomorrow = new Date();
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);
    return afterTomorrow.toISOString().split('T')[0];
  });
  const [returnTime, setReturnTime] = useState<string>('09:00');

  // Renter Profile Form
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cityAddress, setCityAddress] = useState('');
  const [idType, setIdType] = useState<'KTP' | 'SIM' | 'KTM'>('KTP');
  const [usagePurpose, setUsagePurpose] = useState('');
  const [usageLocation, setUsageLocation] = useState('');

  // Add-ons selection
  const availableAddOns = [
    { id: 'asisten', name: 'Asisten Kamera / Runner Standby', pricePerDay: 250000 },
    { id: 'memori_v90', name: 'Extra Memory Card 128GB V90 Pro', pricePerDay: 50000 },
    { id: 'antar_jemput', name: 'Layanan Antar-Jemput Alat (Jabodetabek)', flatPrice: 150000 }
  ];
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Terms & Handover checklist agreement
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [checkedHandoverItems, setCheckedHandoverItems] = useState<Record<string, boolean>>({});

  // Submission result state
  const [submittedBooking, setSubmittedBooking] = useState<RentalBooking | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Categories list
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Alat' },
    { id: 'camera', label: 'Kamera' },
    { id: 'lens', label: 'Lensa' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'audio', label: 'Audio' },
    { id: 'stabilizer', label: 'Stabilizer / Rig' },
    { id: 'monitor', label: 'Monitor' },
    { id: 'package', label: 'Paket Hemat' }
  ];

  // Filtered & Sorted equipment
  const filteredEquipment = useMemo(() => {
    return equipment
      .filter((item) => {
        const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [equipment, selectedCategory, searchQuery, sortBy]);

  // Calculate rental duration in days
  const calculatedDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(`${pickupDate}T${pickupTime || '09:00'}`);
    const end = new Date(`${returnDate}T${returnTime || '09:00'}`);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 1;
    // Calculate rounded days (minimum 1 day)
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  }, [pickupDate, pickupTime, returnDate, returnTime]);

  // Cart financial totals
  const cartSummary = useMemo(() => {
    let rentSubtotal = 0;
    let depositSubtotal = 0;

    cart.forEach((cItem) => {
      const eq = equipment.find((e) => e.id === cItem.equipmentId);
      if (eq) {
        rentSubtotal += eq.dailyRate * cItem.quantity * calculatedDays;
        depositSubtotal += eq.depositAmount * cItem.quantity;
      }
    });

    let addOnsTotal = 0;
    selectedAddOns.forEach((addonId) => {
      const addon = availableAddOns.find((a) => a.id === addonId);
      if (addon) {
        if (addon.pricePerDay) {
          addOnsTotal += addon.pricePerDay * calculatedDays;
        } else if (addon.flatPrice) {
          addOnsTotal += addon.flatPrice;
        }
      }
    });

    return {
      rentSubtotal,
      depositSubtotal,
      addOnsTotal,
      grandTotal: rentSubtotal + depositSubtotal + addOnsTotal
    };
  }, [cart, equipment, calculatedDays, selectedAddOns]);

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const toggleHandoverCheck = (item: string) => {
    setCheckedHandoverItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Form Submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (cart.length === 0) {
      errors.push('Pilih minimal 1 unit peralatan dari katalog untuk disewa.');
    }
    if (!fullName.trim()) errors.push('Nama lengkap penyewa wajib diisi.');
    if (!whatsapp.trim() || whatsapp.length < 8) errors.push('Nomor WhatsApp aktif wajib diisi.');
    if (!cityAddress.trim()) errors.push('Alamat atau domisili penyewa wajib diisi.');
    if (!usagePurpose.trim()) errors.push('Tujuan penggunaan alat (project type) wajib diisi.');
    if (!usageLocation.trim()) errors.push('Lokasi pemakaian alat wajib diisi.');
    if (!agreedTerms) errors.push('Anda harus menyetujui Syarat & Ketentuan Rental NVISUAL.');

    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);
    if (end <= start) {
      errors.push('Waktu pengembalian alat harus lebih lambat dari waktu pengambilan.');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: document.getElementById('booking-section')?.offsetTop || 0, behavior: 'smooth' });
      return;
    }

    setFormErrors([]);

    // Construct booking object
    const itemsData = cart.map((c) => {
      const eq = equipment.find((e) => e.id === c.equipmentId)!;
      return {
        equipmentId: eq.id,
        equipmentName: eq.name,
        dailyRate: eq.dailyRate,
        depositAmount: eq.depositAmount,
        quantity: c.quantity
      };
    });

    const addOnsData = selectedAddOns.map((id) => {
      const a = availableAddOns.find((item) => item.id === id)!;
      return {
        name: a.name,
        price: a.pricePerDay ? a.pricePerDay * calculatedDays : a.flatPrice || 0
      };
    });

    const newBooking = addRentalBooking({
      refCode: generateRefCode('RENT'),
      renter: {
        fullName,
        whatsapp,
        cityAddress,
        idType,
        usagePurpose,
        usageLocation
      },
      items: itemsData,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      durationDays: calculatedDays,
      estimatedRentTotal: cartSummary.rentSubtotal,
      depositTotal: cartSummary.depositSubtotal,
      addOns: addOnsData,
      grandTotal: cartSummary.grandTotal,
      termsAccepted: agreedTerms,
      handoverChecklist: checkedHandoverItems
    });

    setSubmittedBooking(newBooking);
    clearCart();

    // Auto open WhatsApp link
    const waUrl = buildRentalWhatsAppUrl(settings.adminWhatsApp, newBooking);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Katalog Sewa Alat Audiovisual
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Peralatan Sinematik Standar Industri
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Sewa kamera, lensa profesional, lighting, stabilizer, dan audio recording dengan tarif transparan per 24 jam. Setiap unit terkalibrasi, bergaransi fungsi, dan dilengkapi checklist serah terima.
        </p>
      </div>

      {/* Search, Category Filter & Sorting Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kamera, lensa, stabilizer, merk Sony, Aputure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111218] border border-[#222432] rounded-md pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-zinc-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111218] border border-[#222432] rounded-md px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="default">Urutkan: Rekomendasi</option>
              <option value="price-asc">Tarif: Terendah ke Tertinggi</option>
              <option value="price-desc">Tarif: Tertinggi ke Terendah</option>
              <option value="name">Nama Peralatan (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                  : 'bg-[#111219] text-zinc-400 hover:text-white hover:bg-[#181924] border border-[#1f212f]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEquipment.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3 bg-[#0d0e13] border border-[#1d1f2a] rounded-lg">
            <p className="text-zinc-400 text-sm">Tidak ada alat yang sesuai dengan kriteria pencarian Anda.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-[#d4af37] underline cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          filteredEquipment.map((item) => {
            const inCartItem = cart.find((c) => c.equipmentId === item.id);
            const inCartCount = inCartItem?.quantity || 0;

            return (
              <div
                key={item.id}
                className="bg-[#0f1016] border border-[#1d1f2b] rounded-lg overflow-hidden hover:border-[#d4af37]/60 transition-all flex flex-col justify-between group shadow-lg"
              >
                {/* Photo Thumbnail */}
                <div 
                  onClick={() => setSelectedEquipmentForModal(item)}
                  className="relative aspect-4/3 bg-[#0a0b0e] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/85 text-[#d4af37] border border-[#d4af37]/30 rounded">
                      {item.brand}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-black/80 text-emerald-400 border border-emerald-500/30 rounded backdrop-blur-sm">
                      {item.condition}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 
                      onClick={() => setSelectedEquipmentForModal(item)}
                      className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-2"
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* Highlights */}
                  <div className="text-[11px] text-zinc-400 space-y-1 line-clamp-2">
                    {item.specs.slice(0, 2).map((s, idx) => (
                      <p key={idx} className="truncate">• {s}</p>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#1c1e28] space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-zinc-400">Tarif Sewa:</span>
                      <span className="text-sm font-extrabold text-white">
                        {formatIDR(item.dailyRate)} <span className="text-[10px] font-normal text-zinc-400">/ 24 jam</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Deposit: {formatIDR(item.depositAmount)}</span>
                      <span className="text-zinc-500">Stok: {item.stockCount} unit</span>
                    </div>

                    {/* Booking Controls */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedEquipmentForModal(item)}
                        className="flex-1 py-2 text-xs font-medium rounded bg-[#161720] hover:bg-[#1e202d] text-zinc-300 border border-[#27293a] transition-colors cursor-pointer text-center"
                      >
                        Detail Alat
                      </button>

                      {inCartCount === 0 ? (
                        <button
                          onClick={() => addToCart(item.id, 1)}
                          className="px-3.5 py-2 text-xs font-bold rounded bg-[#d4af37] text-black hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pilih</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-[#181924] border border-[#d4af37]/50 rounded p-0.5">
                          <button
                            onClick={() => updateCartQty(item.id, inCartCount - 1)}
                            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#d4af37] px-1.5">{inCartCount}</span>
                          <button
                            onClick={() => updateCartQty(item.id, inCartCount + 1)}
                            className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Interactive Booking Cart & Tiered Checkout Section */}
      <section id="booking-section" className="bg-[#0c0d12] border border-[#1f212f] rounded-lg p-6 sm:p-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c1e2a] pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Formulir Permintaan Sewa
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Konfigurasi Jadwal & Rincian Biaya Sewa
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Total Alat Dipilih:</span>
            <span className="text-sm font-bold text-[#d4af37] px-2.5 py-1 bg-[#171822] border border-[#2b2d3c] rounded">
              {cart.reduce((a, b) => a + b.quantity, 0)} Unit
            </span>
          </div>
        </div>

        {/* Selected Equipment Cart Table */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            1. Daftar Alat yang Dipilih
          </h3>

          {cart.length === 0 ? (
            <div className="p-8 text-center bg-[#101118] border border-dashed border-[#242636] rounded-md space-y-2">
              <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400">Belum ada peralatan yang dipilih dalam daftar sewa.</p>
              <p className="text-[11px] text-zinc-500">Klik tombol "Pilih" pada kartu katalog di atas untuk menambahkan alat ke formulir ini.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((cItem) => {
                const eq = equipment.find((e) => e.id === cItem.equipmentId);
                if (!eq) return null;
                const lineRentTotal = eq.dailyRate * cItem.quantity * calculatedDays;

                return (
                  <div
                    key={cItem.equipmentId}
                    className="p-3.5 bg-[#12131b] border border-[#20222f] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={eq.thumbnail} alt={eq.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <span className="font-bold text-white block">{eq.name}</span>
                        <span className="text-zinc-400 text-[11px]">
                          Tarif: {formatIDR(eq.dailyRate)} / hari · Deposit: {formatIDR(eq.depositAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Qty controller */}
                      <div className="flex items-center gap-2 bg-[#181924] border border-[#2a2c3a] rounded px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateCartQty(eq.id, cItem.quantity - 1)}
                          className="text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-white w-4 text-center">{cItem.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(eq.id, cItem.quantity + 1)}
                          className="text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total line */}
                      <div className="text-right min-w-[120px]">
                        <span className="font-bold text-white block">{formatIDR(lineRentTotal)}</span>
                        <span className="text-[10px] text-zinc-400">({calculatedDays} Hari Sewa)</span>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(eq.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Hapus dari daftar sewa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Schedule & Timing Configuration */}
        <div className="space-y-4 pt-4 border-t border-[#1c1e2a]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            2. Jadwal Pengambilan & Pengembalian
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Pickup Date */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                Tanggal Pengambilan:
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Pickup Time */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                Jam Pengambilan:
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Return Date */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                Tanggal Pengembalian:
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Return Time */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                Jam Pengembalian:
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="p-3 bg-[#13141d] border border-[#222433] rounded text-xs text-zinc-300 flex items-center justify-between">
            <span>Estimasi Durasi Sewa:</span>
            <span className="font-extrabold text-[#d4af37] text-sm">
              {calculatedDays} Hari (24 Jam / Hari)
            </span>
          </div>
        </div>

        {/* Optional Add-ons */}
        <div className="space-y-3 pt-4 border-t border-[#1c1e2a]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            3. Layanan Tambahan (Opsional)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {availableAddOns.map((addon) => {
              const isChecked = selectedAddOns.includes(addon.id);
              const costText = addon.pricePerDay
                ? `${formatIDR(addon.pricePerDay)} / hari`
                : `${formatIDR(addon.flatPrice || 0)} flat`;

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-3 rounded border cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                    isChecked
                      ? 'bg-[#181924] border-[#d4af37] text-white'
                      : 'bg-[#12131b] border-[#222432] text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  <div className="mt-0.5 text-[#d4af37]">
                    {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-semibold block text-zinc-200">{addon.name}</span>
                    <span className="text-[11px] text-[#d4af37] font-medium">{costText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Renter Profile Details */}
        <div className="space-y-4 pt-4 border-t border-[#1c1e2a]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            4. Identitas Penyewa & Lokasi Pemakaian
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Nama Lengkap Penyewa / PIC *</label>
              <input
                type="text"
                placeholder="cth. Andra Pratama"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Nomor WhatsApp Aktif *</label>
              <input
                type="text"
                placeholder="cth. 081234567890"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Jenis Identitas Jaminan *</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value as any)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="KTP">e-KTP Asli</option>
                <option value="SIM">SIM A / C Asli</option>
                <option value="KTM">Kartu Mahasiswa Aktif + KTP</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
              <label className="text-zinc-400 font-medium">Alamat Lengkap / Kota Domisili *</label>
              <input
                type="text"
                placeholder="cth. Jl. Radio Dalam No. 12, Kebayoran Baru, Jakarta Selatan"
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-1">
              <label className="text-zinc-400 font-medium">Tujuan Penggunaan Alat *</label>
              <input
                type="text"
                placeholder="cth. Dokumentasi Wisuda SMA / Syuting Company Profile"
                value={usagePurpose}
                onChange={(e) => setUsagePurpose(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-400 font-medium">Lokasi Tempat Pemakaian (Venue) *</label>
              <input
                type="text"
                placeholder="cth. Gedung Sasana Kriya TMII / Studio indoor Jakarta Selatan"
                value={usageLocation}
                onChange={(e) => setUsageLocation(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>
        </div>

        {/* Handover Checklist & Rental Terms Accordion */}
        <div className="space-y-4 pt-4 border-t border-[#1c1e2a]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            5. Syarat Rental & Checklist Serah Terima
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Terms */}
            <div className="p-4 rounded bg-[#101118] border border-[#222433] space-y-3">
              <span className="font-bold text-zinc-200 block">Syarat & Ketentuan Sewa:</span>
              <ul className="space-y-2 text-zinc-400 text-[11px] leading-relaxed">
                {settings.rentalTerms.map((term, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Handover checklist */}
            <div className="p-4 rounded bg-[#101118] border border-[#222433] space-y-3">
              <span className="font-bold text-zinc-200 block">
                Checklist Serah Terima Bersama (Check-in / Check-out):
              </span>
              <p className="text-[11px] text-zinc-400">
                Poin pemeriksaan fisik dan fungsi yang akan divalidasi langsung saat penyerahan unit:
              </p>
              <div className="space-y-2 text-[11px]">
                {settings.handoverItems.map((item, i) => {
                  const checked = !!checkedHandoverItems[item];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleHandoverCheck(item)}
                      className="flex items-center gap-2 text-zinc-300 cursor-pointer select-none"
                    >
                      <div className="text-[#d4af37]">
                        {checked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                      </div>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 bg-[#141520] border border-[#2b2d3e] rounded cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#d4af37] focus:ring-0 focus:outline-none"
              />
              <span className="text-xs text-zinc-300 leading-relaxed">
                Saya telah membaca, memahami, dan menyetujui seluruh ketentuan sewa di atas. Saya memahami bahwa formulir ini merupakan <strong>pengajuan permintaan sewa</strong> dan belum berstatus booking terkonfirmasi sebelum diverifikasi oleh admin NVISUAL.
              </span>
            </label>
          </div>
        </div>

        {/* Error Validation Alerts */}
        {formErrors.length > 0 && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 rounded text-xs text-red-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Harap lengkapi data formulir berikut:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {formErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Cost Summary & Final CTA */}
        <div className="pt-6 border-t border-[#1c1e2a] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:max-w-md p-4 bg-[#13141d] border border-[#242636] rounded space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal Sewa ({calculatedDays} hari):</span>
              <span className="text-white font-medium">{formatIDR(cartSummary.rentSubtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Layanan Tambahan:</span>
              <span className="text-white font-medium">{formatIDR(cartSummary.addOnsTotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400 pb-2 border-b border-[#222432]">
              <span className="flex items-center gap-1">
                <span>Deposit Jaminan:</span>
                <span className="text-[10px] text-[#d4af37]">(Refundable)</span>
              </span>
              <span className="text-[#d4af37] font-semibold">{formatIDR(cartSummary.depositSubtotal)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-white text-sm">Total Estimasi:</span>
              <span className="font-black text-xl text-white">
                {formatIDR(cartSummary.grandTotal)}
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 italic">
              * Deposit jaminan dikembalikan 100% setelah masa sewa selesai dan alat kembali dalam kondisi utuh.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSubmitBooking}
              className="px-8 py-4 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] via-[#c49d28] to-[#9e7c17] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <ShoppingBag className="w-4 h-4 fill-black" />
              <span>Kirim Permintaan & Buka WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Success Modal / Banner if just submitted */}
        {submittedBooking && (
          <div className="p-6 bg-emerald-950/40 border border-emerald-500/50 rounded-lg space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-base font-bold text-white">
                  Permintaan Sewa Berhasil Dibuat! (Kode: {submittedBooking.refCode})
                </h4>
                <p className="text-xs text-zinc-300">
                  Data telah tersimpan di sistem antrean dan pesan terformat telah dibuka di WhatsApp. Jika aplikasi WhatsApp tidak terbuka secara otomatis, gunakan tombol di bawah.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={buildRentalWhatsAppUrl(settings.adminWhatsApp, submittedBooking)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Buka Ulang Pesan WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSubmittedBooking(null)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Tutup Pesan Ini
              </button>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
