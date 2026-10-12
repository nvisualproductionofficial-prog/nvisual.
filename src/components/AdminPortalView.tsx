import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Package,
  Layers,
  GraduationCap,
  Settings as SettingsIcon,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  CheckSquare,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EquipmentCategory, EquipmentItem, GraduationPackage, OrderStatus, RentalBooking } from '../types';
import { formatIDR, cleanWhatsAppNumber } from '../utils/formatters';

export const AdminPortalView: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    settings,
    updateSettings,
    equipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    rentalBookings,
    updateBookingStatus,
    deleteRentalBooking,
    graduationInquiries,
    updateGraduationInquiryStatus,
    productionInquiries,
    updateProductionInquiryStatus,
    graduationPackages,
    updateGraduationPackage,
    resetToDemoData,
    exportDataJSON,
    importDataJSON
  } = useApp();

  // Login PIN state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeAdminTab, setActiveAdminTab] = useState<
    'orders' | 'grad_inquiries' | 'prod_inquiries' | 'catalog' | 'packages' | 'settings' | 'backup'
  >('orders');

  // Status Filter for Orders
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Equipment Form Modal State (Add/Edit)
  const [isEqModalOpen, setIsEqModalOpen] = useState(false);
  const [editingEq, setEditingEq] = useState<EquipmentItem | null>(null);
  const [eqFormData, setEqFormData] = useState<Omit<EquipmentItem, 'id'>>({
    name: '',
    category: 'camera',
    brand: '',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    dailyRate: 200000,
    depositAmount: 250000,
    stockCount: 1,
    condition: 'Grade A (Prima)',
    specs: ['Spesifikasi 1'],
    inclusions: ['Unit Utama', 'Baterai & Charger'],
    usageNotes: '',
    isFeatured: false
  });

  // Package Form Edit Modal State
  const [editingPkg, setEditingPkg] = useState<GraduationPackage | null>(null);

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Import JSON State
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(pinInput)) {
      setLoginError('');
      setPinInput('');
    } else {
      setLoginError('PIN Admin salah. Default PIN demonstrasi adalah 1234');
    }
  };

  // Open Add Equipment Modal
  const handleOpenAddEq = () => {
    setEditingEq(null);
    setEqFormData({
      name: '',
      category: 'camera',
      brand: '',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      dailyRate: 200000,
      depositAmount: 250000,
      stockCount: 1,
      condition: 'Grade A (Prima)',
      specs: ['Sensor Full Frame', '4K Video'],
      inclusions: ['Body Unit', '2x Baterai', 'Charger', 'Tas'],
      usageNotes: '',
      isFeatured: false
    });
    setIsEqModalOpen(true);
  };

  // Open Edit Equipment Modal
  const handleOpenEditEq = (item: EquipmentItem) => {
    setEditingEq(item);
    setEqFormData({
      name: item.name,
      category: item.category,
      brand: item.brand,
      thumbnail: item.thumbnail,
      dailyRate: item.dailyRate,
      depositAmount: item.depositAmount,
      stockCount: item.stockCount,
      condition: item.condition,
      specs: item.specs,
      inclusions: item.inclusions,
      usageNotes: item.usageNotes,
      isFeatured: !!item.isFeatured
    });
    setIsEqModalOpen(true);
  };

  // Save Equipment
  const handleSaveEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqFormData.name.trim()) return;

    if (editingEq) {
      updateEquipment({
        ...eqFormData,
        id: editingEq.id
      });
    } else {
      addEquipment(eqFormData);
    }
    setIsEqModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  // WhatsApp reply from admin to customer with status update
  const handleSendStatusToCustomer = (booking: RentalBooking) => {
    const custPhone = cleanWhatsAppNumber(booking.renter.whatsapp);
    const statusLabels: Record<OrderStatus, string> = {
      pending_review: 'Sedang Ditinjau Admin',
      confirmed: 'DISETUJUI & TERKONFIRMASI ✅',
      rejected: 'DITOLAK / TIDAK DAPAT DILAYANI ❌',
      completed: 'SELESAI (Alat Telah Dikembalikan) 📦',
      cancelled: 'DIBATALKAN'
    };

    const msg = `Halo ${booking.renter.fullName},

Kami dari *NVISUAL Production House* menginformasikan mengenai pengajuan sewa alat dengan Kode Referensi: *${booking.refCode}*.

Status Terkini: *${statusLabels[booking.status]}*
${booking.adminNotes ? `Catatan Khusus Admin: "${booking.adminNotes}"\n` : ''}
Jadwal Pengambilan: ${booking.pickupDate} (${booking.pickupTime} WIB)
Estimasi Total: ${formatIDR(booking.grandTotal)} (Termasuk deposit ${formatIDR(booking.depositTotal)})

Jika ada hal yang perlu dikoordinasikan lebih lanjut, silakan balas pesan ini. Terima kasih!`;

    window.open(`https://wa.me/${custPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Export JSON Download Trigger
  const handleDownloadBackup = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nvisual_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Trigger
  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText);
    if (ok) {
      setImportStatus('success');
      setImportJsonText('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
    }
  };

  // Render Login Gate if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#0f1016] border border-[#222432] rounded-lg p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#181924] border border-[#2c2f42] flex items-center justify-center mx-auto text-[#d4af37]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Portal Masuk Admin NVISUAL</h2>
            <p className="text-xs text-zinc-400">
              Akses khusus pengelola untuk memvalidasi booking, mengelola alat, dan mengubah konfigurasi website.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-medium">Masukkan PIN Admin:</label>
              <input
                type="password"
                placeholder="Default: 1234"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-[#12131b] border border-[#262838] rounded px-3 py-2.5 text-center text-lg font-bold tracking-widest text-white focus:outline-none focus:border-[#d4af37]"
                autoFocus
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/30 p-2 rounded border border-red-500/30">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-zinc-500 border-t border-[#1a1b26]">
            💡 Demo PIN aktif: <code className="text-[#d4af37] font-bold">1234</code> (dapat diubah di menu pengaturan).
          </div>
        </div>
      </div>
    );
  }

  // Filtered Orders
  const filteredBookings = rentalBookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesQuery =
      b.refCode.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      b.renter.fullName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      b.renter.whatsapp.includes(orderSearchQuery);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c1e28] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Pusat Kendali Pengelola
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold">
              Sesi Aktif
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Dashboard Manajemen NVISUAL
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDemoData}
            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-[#27293a] hover:border-zinc-500 rounded bg-[#101118] flex items-center gap-1.5 cursor-pointer"
            title="Kembalikan semua katalog & data ke bawaan demo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data Demo</span>
          </button>
          <button
            onClick={adminLogout}
            className="px-3.5 py-1.5 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/30 rounded bg-red-950/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1c1e28]">
        {[
          { id: 'orders', label: `Permintaan Sewa Alat (${rentalBookings.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'grad_inquiries', label: `Penawaran Wisuda (${graduationInquiries.length})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'prod_inquiries', label: `Brief Event/Compro (${productionInquiries.length})`, icon: <Layers className="w-4 h-4" /> },
          { id: 'catalog', label: `Kelola Katalog Alat (${equipment.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'packages', label: 'Paket Kelulusan', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'settings', label: 'Pengaturan & Kontak', icon: <SettingsIcon className="w-4 h-4" /> },
          { id: 'backup', label: 'Cadangkan Data (JSON)', icon: <Download className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === tab.id
                ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                : 'bg-[#101118] text-zinc-400 hover:text-white border border-[#1f212f]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: RENTAL BOOKINGS */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ref code, nama, WA..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="w-full bg-[#111219] border border-[#222432] rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-zinc-400 shrink-0">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#111219] border border-[#222432] rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="pending_review">Pending Review</option>
                <option value="confirmed">Confirmed (Disetujui)</option>
                <option value="rejected">Rejected (Ditolak)</option>
                <option value="completed">Completed (Selesai)</option>
                <option value="cancelled">Cancelled (Batal)</option>
              </select>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center bg-[#0d0e14] border border-[#1d1f2a] rounded-lg text-xs text-zinc-400 space-y-2">
              <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto" />
              <p>Belum ada permintaan sewa yang masuk atau sesuai filter pencarian.</p>
              <p className="text-[11px] text-zinc-500">
                Uji coba alur dengan memilih alat di halaman "Persewaan Alat" dan kirimkan formulir booking.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => {
                const statusColorMap: Record<OrderStatus, string> = {
                  pending_review: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
                  confirmed: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
                  rejected: 'bg-red-950/60 text-red-400 border-red-500/40',
                  completed: 'bg-blue-950/60 text-blue-400 border-blue-500/40',
                  cancelled: 'bg-zinc-800 text-zinc-400 border-zinc-600'
                };

                return (
                  <div
                    key={b.id}
                    className="p-5 bg-[#0f1016] border border-[#1e202d] rounded-lg space-y-4 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1e28] pb-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-white text-sm">{b.refCode}</span>
                        <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${statusColorMap[b.status]}`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-zinc-500 text-[11px]">
                        Diajukan: {new Date(b.createdAt).toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase">Penyewa:</span>
                        <p className="font-bold text-white">{b.renter.fullName}</p>
                        <p className="text-zinc-400 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#d4af37]" />
                          <span>{b.renter.whatsapp}</span>
                        </p>
                        <p className="text-zinc-400 text-[11px] truncate">
                          Domisili: {b.renter.cityAddress}
                        </p>
                        <p className="text-zinc-400 text-[11px]">
                          Jaminan: {b.renter.idType}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase">Jadwal & Tujuan:</span>
                        <p className="text-zinc-300">
                          Ambil: <strong>{b.pickupDate}</strong> ({b.pickupTime} WIB)
                        </p>
                        <p className="text-zinc-300">
                          Kembali: <strong>{b.returnDate}</strong> ({b.returnTime} WIB)
                        </p>
                        <p className="text-[#d4af37] font-semibold text-[11px]">
                          Durasi: {b.durationDays} Hari
                        </p>
                        <p className="text-zinc-400 text-[11px] truncate">
                          Venue: {b.renter.usageLocation}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase">Rincian Finansial:</span>
                        <div className="flex justify-between text-zinc-400">
                          <span>Sewa:</span>
                          <span className="text-zinc-200">{formatIDR(b.estimatedRentTotal)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Deposit:</span>
                          <span className="text-[#d4af37]">{formatIDR(b.depositTotal)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-white pt-1 border-t border-[#1c1e28]">
                          <span>Grand Total:</span>
                          <span>{formatIDR(b.grandTotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Equipment list */}
                    <div className="p-3 bg-[#13141d] rounded border border-[#20222f] text-xs">
                      <span className="text-zinc-400 font-semibold block mb-1">Daftar Peralatan:</span>
                      <div className="flex flex-wrap gap-2">
                        {b.items.map((it, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-[#1b1c27] text-zinc-300 text-[11px]">
                            {it.equipmentName} ({it.quantity}x)
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Changer & WhatsApp Reply Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1c1e28] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 text-[11px]">Ubah Status:</span>
                        {(['pending_review', 'confirmed', 'rejected', 'completed', 'cancelled'] as OrderStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => updateBookingStatus(b.id, st)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                              b.status === st
                                ? 'bg-[#d4af37] text-black font-extrabold'
                                : 'bg-[#151620] text-zinc-400 hover:text-white border border-[#262837]'
                            }`}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSendStatusToCustomer(b)}
                          className="px-3 py-1.5 rounded text-[11px] font-bold uppercase bg-emerald-600 hover:bg-emerald-500 text-black flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3 fill-black" />
                          <span>Kirim Status ke WA Pelanggan</span>
                        </button>
                        <button
                          onClick={() => deleteRentalBooking(b.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 cursor-pointer"
                          title="Hapus Pesanan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GRADUATION INQUIRIES */}
      {activeAdminTab === 'grad_inquiries' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Total Pengajuan Penawaran Wisuda: {graduationInquiries.length}</span>
          </div>

          {graduationInquiries.length === 0 ? (
            <div className="p-12 text-center bg-[#0d0e14] border border-[#1d1f2a] rounded-lg text-xs text-zinc-400 space-y-1">
              <GraduationCap className="w-8 h-8 text-zinc-600 mx-auto" />
              <p>Belum ada permintaan penawaran wisuda sekolah.</p>
            </div>
          ) : (
            graduationInquiries.map((inq) => (
              <div key={inq.id} className="p-5 bg-[#0f1016] border border-[#1e202d] rounded-lg space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#1c1e28] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{inq.refCode}</span>
                    <span className="text-[#d4af37] font-semibold">{inq.schoolName}</span>
                  </div>
                  <span className="text-zinc-500 text-[11px]">{new Date(inq.createdAt).toLocaleDateString('id-ID')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">PIC & Kontak:</span>
                    <p className="font-bold text-white">{inq.picName}</p>
                    <p className="text-zinc-400">{inq.whatsapp}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Acara & Paket:</span>
                    <p className="text-white">Paket: <strong>{inq.packageSelected}</strong></p>
                    <p className="text-zinc-400">Tanggal: {inq.eventDate} ({inq.participantsCount} Siswa)</p>
                    <p className="text-zinc-400">Venue: {inq.location}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Anggaran & Catatan:</span>
                    <p className="text-zinc-300">Estimasi: {inq.budgetEstimate}</p>
                    {inq.notes && <p className="text-zinc-400 italic">"{inq.notes}"</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1c1e28]">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[11px]">Status:</span>
                    {(['pending_review', 'confirmed', 'rejected', 'completed'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateGraduationInquiryStatus(inq.id, st)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inq.status === st ? 'bg-[#d4af37] text-black' : 'bg-[#161722] text-zinc-400'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${cleanWhatsAppNumber(inq.whatsapp)}?text=${encodeURIComponent(`Halo ${inq.picName} dari ${inq.schoolName}, kami dari NVISUAL ingin mengonfirmasi permintaan penawaran wisuda ${inq.refCode}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-emerald-600 text-black font-semibold text-[11px] flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Chat PIC Sekolah</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PRODUCTION & COMPRO INQUIRIES */}
      {activeAdminTab === 'prod_inquiries' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Total Brief Produksi Masuk: {productionInquiries.length}</span>
          </div>

          {productionInquiries.length === 0 ? (
            <div className="p-12 text-center bg-[#0d0e14] border border-[#1d1f2a] rounded-lg text-xs text-zinc-400 space-y-1">
              <Layers className="w-8 h-8 text-zinc-600 mx-auto" />
              <p>Belum ada brief konsultasi video company profile atau event yang masuk.</p>
            </div>
          ) : (
            productionInquiries.map((inq) => (
              <div key={inq.id} className="p-5 bg-[#0f1016] border border-[#1e202d] rounded-lg space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#1c1e28] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{inq.refCode}</span>
                    <span className="text-[#d4af37] font-semibold">{inq.clientName} ({inq.companyName || 'Individu'})</span>
                  </div>
                  <span className="text-zinc-500 text-[11px]">{new Date(inq.createdAt).toLocaleDateString('id-ID')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Layanan & Kontak:</span>
                    <p className="font-bold text-white">{inq.serviceType.toUpperCase()}</p>
                    <p className="text-zinc-400">WA: {inq.whatsapp}</p>
                    {inq.email && <p className="text-zinc-400">Email: {inq.email}</p>}
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Tujuan & Lokasi:</span>
                    <p className="text-zinc-300">Tujuan: {inq.videoObjective}</p>
                    <p className="text-zinc-400">Lokasi: {inq.shootingLocation}</p>
                    <p className="text-zinc-400">Target Durasi: {inq.targetDuration}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Deadline & Budget:</span>
                    <p className="text-zinc-300">Deadline: {inq.targetDeadline}</p>
                    <p className="text-[#d4af37]">Anggaran: {inq.budgetRange}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1c1e28]">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[11px]">Status:</span>
                    {(['pending_review', 'confirmed', 'rejected', 'completed'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateProductionInquiryStatus(inq.id, st)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inq.status === st ? 'bg-[#d4af37] text-black' : 'bg-[#161722] text-zinc-400'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${cleanWhatsAppNumber(inq.whatsapp)}?text=${encodeURIComponent(`Halo ${inq.clientName}, kami dari NVISUAL ingin berdiskusi mengenai brief video ${inq.refCode}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-emerald-600 text-black font-semibold text-[11px] flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Hubungi Klien via WA</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: MANAGE EQUIPMENT CATALOG */}
      {activeAdminTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Kelola Katalog Peralatan Sewa</h3>
              <p className="text-xs text-zinc-400">Tambah alat baru, edit tarif sewa, kelengkapan, dan deposit jaminan.</p>
            </div>
            <button
              onClick={handleOpenAddEq}
              className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Alat Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#0f1016] border border-[#1e202d] rounded-lg space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="flex gap-3">
                  <img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded bg-black shrink-0" />
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-[#d4af37]">{item.brand} · {item.category}</span>
                    <h4 className="font-bold text-white truncate">{item.name}</h4>
                    <p className="text-zinc-400 text-[11px]">
                      Sewa: <strong className="text-white">{formatIDR(item.dailyRate)}</strong> / hari
                    </p>
                    <p className="text-zinc-400 text-[11px]">
                      Deposit: {formatIDR(item.depositAmount)} · Stok: {item.stockCount}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1c1e28] flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#161722] text-zinc-400">
                    {item.condition}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditEq(item)}
                      className="px-2.5 py-1 rounded bg-[#1c1d29] hover:bg-[#252737] text-zinc-200 border border-[#2d3042] flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#d4af37]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteEquipment(item.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                      title="Hapus Alat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MANAGE GRADUATION PACKAGES */}
      {activeAdminTab === 'packages' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Kelola Paket Dokumentasi Kelulusan</h3>
            <p className="text-xs text-zinc-400">Sesuaikan deskripsi, harga estimasi, dan fasilitas paket wisuda sekolah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {graduationPackages.map((pkg) => (
              <div key={pkg.id} className="p-5 bg-[#0f1016] border border-[#1e202d] rounded-lg space-y-4 text-xs">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                  <p className="text-zinc-400 text-xs">{pkg.tagline}</p>
                </div>

                <div className="p-3 bg-[#13141d] rounded border border-[#222432] space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Harga Estimasi:</span>
                  <p className="text-lg font-bold text-[#d4af37]">
                    {pkg.priceEstimate > 0 ? formatIDR(pkg.priceEstimate) : 'Penawaran Kustom'}
                  </p>
                </div>

                <div className="space-y-1 text-zinc-300">
                  <p>• Kamera: {pkg.cameraCount}</p>
                  <p>• Kru: {pkg.crewCount}</p>
                  <p>• Durasi: {pkg.durationCoverage}</p>
                </div>

                <button
                  onClick={() => setEditingPkg(pkg)}
                  className="w-full py-2 rounded bg-[#181924] hover:bg-[#20222f] text-zinc-200 border border-[#282a39] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Edit Rincian Paket</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS & CONTACT */}
      {activeAdminTab === 'settings' && (
        <div className="max-w-2xl bg-[#0f1016] border border-[#222432] p-6 sm:p-8 rounded-lg space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white">Pengaturan Website & WhatsApp</h3>
            <p className="text-zinc-400">Perubahan disimpan secara persisten di penyimpanan browser (LocalStorage).</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nomor WhatsApp Admin (Tujuan Pesan Otomatis) *</label>
              <input
                type="text"
                placeholder="6282123456789"
                value={settingsForm.adminWhatsApp}
                onChange={(e) => setSettingsForm({ ...settingsForm, adminWhatsApp: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
              <span className="text-[10px] text-zinc-500">
                Gunakan format kode negara tanpa spasi atau strip (cth: 6282123456789).
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nama Brand / Production House</label>
              <input
                type="text"
                value={settingsForm.companyName}
                onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Email Resmi</label>
              <input
                type="email"
                value={settingsForm.officialEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, officialEmail: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Wilayah Operasional</label>
              <input
                type="text"
                value={settingsForm.operationalCity}
                onChange={(e) => setSettingsForm({ ...settingsForm, operationalCity: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Alamat Studio / Workshop</label>
              <input
                type="text"
                value={settingsForm.operationalAddress}
                onChange={(e) => setSettingsForm({ ...settingsForm, operationalAddress: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">PIN Masuk Dashboard Admin</label>
              <input
                type="text"
                value={settingsForm.adminPin}
                onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            {settingsSavedNotice && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Pengaturan berhasil disimpan!</span>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110 transition-all cursor-pointer"
            >
              Simpan Perubahan Pengaturan
            </button>
          </form>
        </div>
      )}

      {/* TAB 7: DATA BACKUP / RESTORE */}
      {activeAdminTab === 'backup' && (
        <div className="max-w-2xl bg-[#0f1016] border border-[#222432] p-6 sm:p-8 rounded-lg space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-bold text-white">Cadangkan & Pulihkan Data (Zero Cost Storage)</h3>
            <p className="text-zinc-400">
              Simpan seluruh data katalog alat, pesanan, dan penawaran ke dalam file JSON di komputer Anda secara gratis tanpa langganan server cloud.
            </p>
          </div>

          <div className="p-4 bg-[#12131b] border border-[#222433] rounded space-y-3">
            <span className="font-bold text-white block">1. Ekspor & Unduh Backup JSON:</span>
            <p className="text-zinc-400 text-[11px]">
              Klik tombol di bawah untuk mengunduh seluruh data NVISUAL dalam format file <code>.json</code>.
            </p>
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2 rounded text-xs font-semibold bg-[#1a1c28] hover:bg-[#242638] text-white border border-[#2f3246] flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>Unduh File Cadangan (.JSON)</span>
            </button>
          </div>

          <div className="p-4 bg-[#12131b] border border-[#222433] rounded space-y-3">
            <span className="font-bold text-white block">2. Impor / Pulihkan dari File JSON:</span>
            <p className="text-zinc-400 text-[11px]">
              Tempelkan teks JSON hasil cadangan sebelumnya untuk memulihkan data:
            </p>
            <textarea
              rows={4}
              placeholder="Tempel teks JSON di sini..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full bg-[#0a0b0e] border border-[#222432] rounded p-2 text-white font-mono text-[11px]"
            />
            {importStatus === 'success' && (
              <p className="text-emerald-400 text-xs">Data berhasil dipulihkan dari JSON!</p>
            )}
            {importStatus === 'error' && (
              <p className="text-red-400 text-xs">Format JSON tidak valid atau struktur tidak cocok.</p>
            )}
            <button
              onClick={handleImportJson}
              className="px-4 py-2 rounded text-xs font-semibold bg-[#d4af37] text-black hover:brightness-110 flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Terapkan Impor Data</span>
            </button>
          </div>
        </div>
      )}

      {/* Equipment Add/Edit Modal */}
      {isEqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#101117] border border-[#242636] rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs">
            <div className="flex justify-between items-center border-b border-[#202230] pb-3">
              <h3 className="text-base font-bold text-white">
                {editingEq ? 'Edit Peralatan' : 'Tambah Peralatan Baru'}
              </h3>
              <button
                onClick={() => setIsEqModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEquipment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Nama Alat *</label>
                <input
                  type="text"
                  placeholder="cth. Sony FX3 Cinema Line"
                  value={eqFormData.name}
                  onChange={(e) => setEqFormData({ ...eqFormData, name: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Kategori</label>
                  <select
                    value={eqFormData.category}
                    onChange={(e) => setEqFormData({ ...eqFormData, category: e.target.value as any })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="camera">Kamera</option>
                    <option value="lens">Lensa</option>
                    <option value="lighting">Lighting</option>
                    <option value="audio">Audio</option>
                    <option value="stabilizer">Stabilizer</option>
                    <option value="monitor">Monitor</option>
                    <option value="package">Paket Hemat</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Merek (Brand)</label>
                  <input
                    type="text"
                    placeholder="Sony, Canon, Aputure..."
                    value={eqFormData.brand}
                    onChange={(e) => setEqFormData({ ...eqFormData, brand: e.target.value })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Tarif Sewa / 24 Jam (Rp) *</label>
                  <input
                    type="number"
                    value={eqFormData.dailyRate}
                    onChange={(e) => setEqFormData({ ...eqFormData, dailyRate: Number(e.target.value) })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Deposit Jaminan (Rp) *</label>
                  <input
                    type="number"
                    value={eqFormData.depositAmount}
                    onChange={(e) => setEqFormData({ ...eqFormData, depositAmount: Number(e.target.value) })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Jumlah Stok Unit</label>
                  <input
                    type="number"
                    value={eqFormData.stockCount}
                    onChange={(e) => setEqFormData({ ...eqFormData, stockCount: Number(e.target.value) })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Kondisi</label>
                  <select
                    value={eqFormData.condition}
                    onChange={(e) => setEqFormData({ ...eqFormData, condition: e.target.value as any })}
                    className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Grade A (Prima)">Grade A (Prima)</option>
                    <option value="Grade B (Baik)">Grade B (Baik)</option>
                    <option value="Baru">Baru</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Tautan Gambar / URL Foto</label>
                <input
                  type="text"
                  value={eqFormData.thumbnail}
                  onChange={(e) => setEqFormData({ ...eqFormData, thumbnail: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Spesifikasi (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={eqFormData.specs.join(', ')}
                  onChange={(e) => setEqFormData({ ...eqFormData, specs: e.target.value.split(',').map((s) => s.trim()) })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Kelengkapan Paket (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={eqFormData.inclusions.join(', ')}
                  onChange={(e) => setEqFormData({ ...eqFormData, inclusions: e.target.value.split(',').map((s) => s.trim()) })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Catatan Rekomendasi Penggunaan</label>
                <textarea
                  rows={2}
                  value={eqFormData.usageNotes}
                  onChange={(e) => setEqFormData({ ...eqFormData, usageNotes: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded p-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={eqFormData.isFeatured}
                  onChange={(e) => setEqFormData({ ...eqFormData, isFeatured: e.target.checked })}
                  className="rounded text-[#d4af37]"
                />
                <label htmlFor="isFeatured" className="text-zinc-300">
                  Tampilkan di Beranda (Featured Gear)
                </label>
              </div>

              <div className="pt-3 border-t border-[#202230] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEqModalOpen(false)}
                  className="px-4 py-2 rounded text-zinc-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110"
                >
                  Simpan Alat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Graduation Package Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#101117] border border-[#242636] rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#202230] pb-2">
              <h3 className="text-base font-bold text-white">Edit {editingPkg.name}</h3>
              <button onClick={() => setEditingPkg(null)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Tagline / Deskripsi Singkat</label>
                <input
                  type="text"
                  value={editingPkg.tagline}
                  onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Harga Estimasi (Rp) - Masukkan 0 jika kustom</label>
                <input
                  type="number"
                  value={editingPkg.priceEstimate}
                  onChange={(e) => setEditingPkg({ ...editingPkg, priceEstimate: Number(e.target.value) })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Jumlah Kamera</label>
                <input
                  type="text"
                  value={editingPkg.cameraCount}
                  onChange={(e) => setEditingPkg({ ...editingPkg, cameraCount: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Jumlah Kru</label>
                <input
                  type="text"
                  value={editingPkg.crewCount}
                  onChange={(e) => setEditingPkg({ ...editingPkg, crewCount: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Durasi Liputan</label>
                <input
                  type="text"
                  value={editingPkg.durationCoverage}
                  onChange={(e) => setEditingPkg({ ...editingPkg, durationCoverage: e.target.value })}
                  className="w-full bg-[#14151e] border border-[#252837] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-3 border-t border-[#202230] flex justify-end gap-2">
                <button
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-1.5 rounded text-zinc-400"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    updateGraduationPackage(editingPkg);
                    setEditingPkg(null);
                  }}
                  className="px-4 py-1.5 rounded font-bold uppercase tracking-wider bg-[#d4af37] text-black"
                >
                  Simpan Paket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
