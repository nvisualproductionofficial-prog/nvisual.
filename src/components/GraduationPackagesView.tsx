import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Users,
  Camera,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  Phone,
  Building,
  DollarSign,
  Send,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GraduationInquiry } from '../types';
import { formatIDR, generateRefCode, cleanWhatsAppNumber } from '../utils/formatters';
import { buildGraduationWhatsAppUrl } from '../utils/whatsapp';

export const GraduationPackagesView: React.FC = () => {
  const { graduationPackages, addGraduationInquiry, settings } = useApp();

  // Form State
  const [schoolName, setSchoolName] = useState('');
  const [picName, setPicName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [participantsCount, setParticipantsCount] = useState<number>(200);
  const [eventType, setEventType] = useState('Wisuda & Pelepasan Siswa');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('signature');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [notes, setNotes] = useState('');

  // Add-ons checkboxes
  const optionalAddOnsList = [
    'Aerial Drone 4K (Footage Gedung & Formasi Siswa)',
    'Cetak Buku Tahunan Siswa (Yearbook Hardcover)',
    'Live Feed Video Switcher ke Layar LED Panggung',
    'Dokumentasi Gathering Night / Prom Night / Malam Keakraban',
    'Photobooth Studio Lighting dengan Cetak Instan',
    'Pemberian Preview Kilat (10 Foto Hari-H) untuk Medsos Sekolah'
  ];
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Submission State
  const [submittedInquiry, setSubmittedInquiry] = useState<GraduationInquiry | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    const formElement = document.getElementById('custom-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!schoolName.trim()) errors.push('Nama sekolah / institusi wajib diisi.');
    if (!picName.trim()) errors.push('Nama penanggung jawab (PIC) wajib diisi.');
    if (!whatsapp.trim() || whatsapp.length < 8) errors.push('Nomor WhatsApp PIC wajib diisi.');
    if (!eventDate) errors.push('Tanggal rencana acara wisuda wajib diisi.');
    if (!location.trim()) errors.push('Lokasi atau venue acara wajib diisi.');
    if (participantsCount <= 0) errors.push('Jumlah peserta wisuda harus lebih dari 0.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    const selectedPkg = graduationPackages.find((p) => p.id === selectedPackageId);
    const packageName = selectedPkg ? selectedPkg.name : selectedPackageId;

    const newInquiry = addGraduationInquiry({
      refCode: generateRefCode('GRAD'),
      schoolName,
      picName,
      whatsapp,
      eventDate,
      location,
      participantsCount,
      eventType,
      packageSelected: packageName,
      addOns: selectedAddOns,
      budgetEstimate: budgetEstimate || 'Mengikuti penawaran resmi NVISUAL',
      notes
    });

    setSubmittedInquiry(newInquiry);

    // Open formatted WhatsApp directly
    const waUrl = buildGraduationWhatsAppUrl(settings.adminWhatsApp, newInquiry);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Dokumentasi Wisuda & Kelulusan
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Paket Liputan Kelulusan Sekolah Sinematik
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Mengabadikan momen bersejarah siswa SMA, SMK, MA, SMP, dan kampus dengan ketelitian sinematik. Pilih paket standar atau ajukan penawaran kustom sesuai skala angkatan dan tata letak gedung acara Anda.
        </p>
      </div>

      {/* 3 Core Packages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {graduationPackages.map((pkg) => {
          const isSignature = pkg.id === 'signature';
          return (
            <div
              key={pkg.id}
              className={`rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-8 relative transition-all duration-300 ${
                isSignature
                  ? 'bg-[#12141e] border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/15 lg:-translate-y-2'
                  : 'bg-[#0f1015] border border-[#1f212d] hover:border-[#2f3244]'
              }`}
            >
              {isSignature && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  Paling Diminati Sekolah
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-md bg-[#161722] border border-[#232535] space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                    Estimasi Investasi Paket:
                  </span>
                  <div className="text-2xl font-black text-white">
                    {pkg.priceEstimate > 0 ? (
                      formatIDR(pkg.priceEstimate)
                    ) : (
                      <span className="text-lg text-[#d4af37]">Penawaran Kustom</span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">
                    (Dapat disesuaikan dengan skala angkatan sekolah)
                  </span>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-2.5 text-xs text-zinc-300 pt-2 border-t border-[#1d1f2b]">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span><strong>Kamera:</strong> {pkg.cameraCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span><strong>Kru:</strong> {pkg.crewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span><strong>Durasi:</strong> {pkg.durationCoverage}</span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-2 border-t border-[#1d1f2b]">
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Hasil Akhir (Deliverables):
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-[#1d1f2b]">
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Fasilitas Produksi:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPackage(pkg.id)}
                className={`w-full py-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSignature
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 shadow-lg shadow-[#d4af37]/20'
                    : 'bg-[#181924] text-white hover:bg-[#222433] border border-[#2c2f42]'
                }`}
              >
                <span>Pilih & Minta Penawaran</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Package Comparison Table */}
      <section className="bg-[#0c0d12] border border-[#1d1f2a] rounded-lg p-6 sm:p-8 space-y-6 overflow-hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Tabel Komparasi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Perbandingan Fasilitas Antar Paket
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300 border-collapse">
            <thead>
              <tr className="border-b border-[#212330] text-zinc-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Fitur & Fasilitas</th>
                <th className="py-3 px-4">Essential</th>
                <th className="py-3 px-4 text-[#d4af37]">Signature (Terpopuler)</th>
                <th className="py-3 px-4">Complete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181a24]">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Jumlah Kamera Cinema 4K</td>
                <td className="py-3 px-4">2 Unit</td>
                <td className="py-3 px-4 text-[#d4af37] font-semibold">3-4 Unit</td>
                <td className="py-3 px-4">5+ Unit Multicam</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Aerial Drone Footage 4K</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 text-[#d4af37] font-semibold">Termasuk (Gedung & Formasi)</td>
                <td className="py-3 px-4">Termasuk (Multi-Session)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Cinematic Aftermovie Emosional</td>
                <td className="py-3 px-4">1-2 Menit</td>
                <td className="py-3 px-4 text-[#d4af37] font-semibold">3-5 Menit (Licensed Music)</td>
                <td className="py-3 px-4">Mini Dokumenter + Aftermovie</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Teaser Vertikal Reels/TikTok</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 text-[#d4af37] font-semibold">1 Video Vertikal</td>
                <td className="py-3 px-4">3 Video Vertikal Reels</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Audio Board Direct Feed</td>
                <td className="py-3 px-4">Termasuk</td>
                <td className="py-3 px-4 text-[#d4af37] font-semibold">Dual Feed + Ambient</td>
                <td className="py-3 px-4">Dedicated Sound Engineer</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Opsi Cetak Buku Tahunan (Yearbook)</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 text-zinc-500">Opsional Tambahan</td>
                <td className="py-3 px-4 font-semibold text-emerald-400">Terintegrasi Siap Cetak</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Liputan Prom Night / Gathering</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 text-zinc-500">Opsional Tambahan</td>
                <td className="py-3 px-4 font-semibold text-emerald-400">Termasuk Lengkap</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom Quote Request Form */}
      <section id="custom-quote-form" className="bg-[#0f1016] border border-[#222432] rounded-lg p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Formulir Penawaran Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Konsultasikan Dokumentasi Wisuda Sekolah Anda
          </h2>
          <p className="text-xs text-zinc-400">
            Kirimkan rincian acara sekolah Anda. Sistem akan menyusun draf proposal otomatis yang siap dilanjutkan ke WhatsApp admin NVISUAL.
          </p>
        </div>

        <form onSubmit={handleSubmitQuote} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nama Sekolah / Institusi *</label>
              <input
                type="text"
                placeholder="cth. SMAN 1 Jakarta / SMK Telkom"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Penanggung Jawab / PIC *</label>
              <input
                type="text"
                placeholder="cth. Ibu Ratna (Ketua Panitia Wisuda)"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nomor WhatsApp PIC *</label>
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
              <label className="text-zinc-300 font-medium">Tanggal Acara Wisuda *</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Lokasi / Venue Acara *</label>
              <input
                type="text"
                placeholder="cth. Aula Sekolah / Hotel Grand Sahid"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Estimasi Jumlah Siswa Wisudawan *</label>
              <input
                type="number"
                min="10"
                value={participantsCount}
                onChange={(e) => setParticipantsCount(Number(e.target.value))}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Jenis Kegiatan</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Wisuda & Pelepasan Siswa">Wisuda & Pelepasan Siswa</option>
                <option value="Wisuda + Gathering Night / Prom">Wisuda + Gathering Night / Prom</option>
                <option value="Wisuda + Buku Tahunan Angkatan">Wisuda + Buku Tahunan Angkatan</option>
                <option value="Dies Natalis & Pelantikan Siswa">Dies Natalis & Pelantikan Siswa</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Pilihan Paket Awal *</label>
              <select
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="essential">Paket Essential</option>
                <option value="signature">Paket Signature (Rekomendasi)</option>
                <option value="complete">Paket Complete (Terintegrasi)</option>
                <option value="kustom">Penawaran Kustom Sepenuhnya</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Perkiraan Anggaran Sekolah (Opsional)</label>
              <input
                type="text"
                placeholder="cth. Rp 5.000.000 - Rp 10.000.000"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

          </div>

          {/* Optional Add-ons Checkboxes */}
          <div className="space-y-3 pt-3 border-t border-[#1c1e2a]">
            <label className="text-zinc-300 font-bold block">Layanan Tambahan yang Diminati:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {optionalAddOnsList.map((addon, idx) => {
                const isChecked = selectedAddOns.includes(addon);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleAddOn(addon)}
                    className={`p-2.5 rounded border text-[11px] flex items-center gap-2 cursor-pointer select-none transition-colors ${
                      isChecked
                        ? 'bg-[#181924] border-[#d4af37] text-white'
                        : 'bg-[#12131b] border-[#222432] text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    <div className="text-[#d4af37]">
                      {isChecked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border border-zinc-600 rounded" />}
                    </div>
                    <span>{addon}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5 pt-2">
            <label className="text-zinc-300 font-medium">Catatan Khusus / Permintaan Khusus Sekolah</label>
            <textarea
              rows={3}
              placeholder="Sampaikan jika ada tema khusus wisuda, susunan rundown, atau kebutuhan backdrop..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#12131b] border border-[#242636] rounded p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Error alerts */}
          {formErrors.length > 0 && (
            <div className="p-3 bg-red-950/40 border border-red-500/50 rounded text-xs text-red-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Harap perbaiki kolom berikut:</span>
              </div>
              <ul className="list-disc pl-5">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1c1e2a]">
            <div className="text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Formulir akan menyusun teks otomatis dan langsung menghubungkan Anda ke WhatsApp produser NVISUAL.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>Kirim Penawaran ke WhatsApp</span>
            </button>
          </div>
        </form>

        {/* Success Modal / Banner */}
        {submittedInquiry && (
          <div className="p-5 bg-emerald-950/40 border border-emerald-500/50 rounded-lg space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  Permintaan Penawaran Terkirim! (Kode: {submittedInquiry.refCode})
                </h4>
                <p className="text-xs text-zinc-300">
                  Ringkasan resmi telah disimpan di antrean penawaran dan WhatsApp telah dibuat.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={buildGraduationWhatsAppUrl(settings.adminWhatsApp, submittedInquiry)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Buka WhatsApp Ulang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
