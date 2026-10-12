import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  Film,
  Sparkles,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  ExternalLink,
  ShieldCheck,
  Camera,
  Layers,
  Sliders,
  Volume2,
  Palette,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductionInquiry } from '../types';
import { generateRefCode } from '../utils/formatters';
import { buildProductionWhatsAppUrl } from '../utils/whatsapp';

export const EventAndComproView: React.FC = () => {
  const { addProductionInquiry, settings } = useApp();
  const [activeSection, setActiveSection] = useState<'event' | 'compro'>('compro');

  // Consultation Form State
  const [serviceType, setServiceType] = useState<ProductionInquiry['serviceType']>('company_profile');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [videoObjective, setVideoObjective] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [targetDuration, setTargetDuration] = useState('2 - 3 Menit');
  const [shootingLocation, setShootingLocation] = useState('');
  const [visualReferenceUrl, setVisualReferenceUrl] = useState('');
  const [targetDeadline, setTargetDeadline] = useState('');
  const [budgetRange, setBudgetRange] = useState('Rp 5.000.000 - Rp 15.000.000');
  const [notes, setNotes] = useState('');

  // Submission State
  const [submittedInquiry, setSubmittedInquiry] = useState<ProductionInquiry | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // 12-Step Production Pipeline Detailed in prompt
  const pipelineSteps = [
    { num: '01', title: 'Konsultasi & Riset Awal', desc: 'Membedah tujuan bisnis, identitas merek, nilai keunggulan produk, dan audiens sasaran.' },
    { num: '02', title: 'Pengembangan Konsep Kreatif', desc: 'Merumuskan angle penceritaan, premis visual, moodboard sinematik, dan tone of voice.' },
    { num: '03', title: 'Penulisan Naskah (Scriptwriting)', desc: 'Menulis narasi voice-over, dialog, dan susunan adegan detik-per-detik secara terstruktur.' },
    { num: '04', title: 'Penyusunan Storyboard', desc: 'Memvisualisasikan komposisi shot, pergerakan kamera, dan referensi blocking talent.' },
    { num: '05', title: 'Pra-Produksi & Recce Lokasi', desc: 'Survei lokasi pengambilan gambar, call sheet jadwal syuting, izin, dan persiapan kru.' },
    { num: '06', title: 'Shooting (Sinematografi 4K)', desc: 'Perekaman gambar dengan kamera bioskop 10-bit, tata cahaya studio, dan audio multi-track.' },
    { num: '07', title: 'Offline & Online Editing', desc: 'Pemilahan rekaman terbaik (selects), perakitan alur cerita kasar (assembly), dan fine cut.' },
    { num: '08', title: 'Sound Design & Audio Mixing', desc: 'Penyempurnaan vokal narasumber, efek foley ambient, dan pemilihan musik berlisensi resmi.' },
    { num: '09', title: 'Color Grading DaVinci Resolve', desc: 'Koreksi warna eksposur dan perataan tone sinematik yang mencerminkan identitas korporat.' },
    { num: '10', title: 'Review & Sesi Masukan Klien', desc: 'Pengiriman preview online time-coded untuk peninjauan menyeluruh bersama jajaran pemangku kepentingan.' },
    { num: '11', title: 'Revisi Sesuai Kesepakatan', desc: 'Perbaikan detail visual, teks grafis, atau tempo penyuntingan berdasarkan catatan bersama.' },
    { num: '12', title: 'Penyerahan Master Final', desc: 'Export master 4K UHD uncompressed beserta versi sosial media (Reels/TikTok/LinkedIn) dan arsip cloud.' }
  ];

  // Event Categories
  const eventTypes = [
    { title: 'Seminar & Workshop', desc: 'Liputan materi narasumber panggung, antusiasme peserta, dan rekaman presentasi layar.' },
    { title: 'Acara Kampus & Universitas', desc: 'Inaugurasi, festival budaya mahasiswa, dies natalis, dan forum ilmiah internasional.' },
    { title: 'Konser & Festival Musik', desc: 'Liputan crowd energik, performa musisi panggung, lighting panggung dinamis, dan aftermovie festival.' },
    { title: 'Gathering Perusahaan (Outing)', desc: 'Malam keakraban tahunan, team building games, penghargaan karyawan berprestasi, dan keceriaan tim.' },
    { title: 'Peluncuran Produk (Product Launch)', desc: 'Unveiling produk baru di hadapan media pers, wawancara direksi, dan highlight video berdaya jual.' },
    { title: 'Multikamera & Backstage', desc: 'Liputan suasana ruang rias VIP, persiapan di balik layar, serta multicam live feed switch.' }
  ];

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!clientName.trim()) errors.push('Nama pemesan / PIC wajib diisi.');
    if (!whatsapp.trim() || whatsapp.length < 8) errors.push('Nomor WhatsApp aktif wajib diisi.');
    if (!videoObjective.trim()) errors.push('Tujuan video wajib dijelaskan secara ringkas.');
    if (!targetAudience.trim()) errors.push('Target audiens video wajib diisi.');
    if (!shootingLocation.trim()) errors.push('Rencana lokasi shooting wajib diisi.');
    if (!targetDeadline.trim()) errors.push('Tenggat waktu (deadline) proyek wajib diisi.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    const newInquiry = addProductionInquiry({
      refCode: generateRefCode('PROD'),
      serviceType,
      clientName,
      companyName,
      whatsapp,
      email,
      videoObjective,
      targetAudience,
      targetDuration,
      shootingLocation,
      visualReferenceUrl,
      targetDeadline,
      budgetRange,
      notes
    });

    setSubmittedInquiry(newInquiry);

    // Open WhatsApp link
    const waUrl = buildProductionWhatsAppUrl(settings.adminWhatsApp, newInquiry);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Solusi Korporat & Event Publik
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Dokumentasi Event & Video Company Profile
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Dari panggung konser megah dan seminar korporat hingga profil perusahaan manufaktur skala nasional. NVISUAL menerapkan standar sinema pada setiap detik liputan.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex border-b border-[#20222f] gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveSection('compro')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'compro'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Produksi Video Company Profile</span>
        </button>
        <button
          onClick={() => setActiveSection('event')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'event'
              ? 'border-[#d4af37] text-[#d4af37]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Dokumentasi Event & Konferensi</span>
        </button>
      </div>

      {/* SECTION 1: Company Profile Pipeline */}
      {activeSection === 'compro' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Pipeline Produksi Profesional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              12 Tahapan Baku Pembuatan Video Profil Perusahaan
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Kami menjamin proses produksi berjalan transparan, terstruktur, dan terhindar dari improvisasi tanpa arah. Berikut tahapan standar NVISUAL dari konsep hingga pengiriman master:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pipelineSteps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-md bg-[#0f1016] border border-[#1d1f2b] hover:border-[#d4af37]/50 transition-all space-y-2 group"
              >
                <span className="text-xl font-black text-[#d4af37] group-hover:scale-110 transition-transform inline-block">
                  {step.num}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-lg bg-[#111219] border border-[#222533] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">
                Membutuhkan Presentasi Proposal & Meeting Awal?
              </h4>
              <p className="text-xs text-zinc-400">
                Tim produser kami siap mengadakan rapat eksplorasi daring atau presentasi langsung di kantor Anda.
              </p>
            </div>
            <a
              href="#consultation-form"
              className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
            >
              Isi Brief Konsultasi
            </a>
          </div>
        </div>
      )}

      {/* SECTION 2: Event Documentation Breakdown */}
      {activeSection === 'event' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Cakupan Acara
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Spesialisasi Liputan Event & Pertunjukan
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Tersedia opsi liputan fotografi kilat, video aftermovie emosional, sistem multikamera switcher, siaran langsung (live streaming), hingga dokumentasi eksklusif suasana di balik panggung (backstage).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-md bg-[#0f1016] border border-[#1d1f2b] space-y-3 hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#161722] border border-[#262836] flex items-center justify-center text-[#d4af37]">
                  <Film className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">{evt.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consultation Brief Form */}
      <section id="consultation-form" className="bg-[#0f1016] border border-[#222432] rounded-lg p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Formulir Briefing Proyek
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Konsultasikan Kebutuhan Produksi Anda
          </h2>
          <p className="text-xs text-zinc-400">
            Isi formulir ringkas ini untuk membantu produser kami memahami sasaran visual Anda sebelum jadwal meeting atau penyusunan penawaran biaya.
          </p>
        </div>

        <form onSubmit={handleSubmitConsultation} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Jenis Layanan Produksi *</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="company_profile">Video Company Profile Perusahaan</option>
                <option value="event_documentation">Dokumentasi Event / Seminar / Konser</option>
                <option value="promotional_video">Video Promosi & Iklan Komersial</option>
                <option value="short_film">Film Pendek / Sinema Naratif</option>
                <option value="documentary">Film Dokumenter Mendalam</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nama Klien / Penanggung Jawab *</label>
              <input
                type="text"
                placeholder="cth. Hendra Gunawan"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Perusahaan / Instansi (Jika ada)</label>
              <input
                type="text"
                placeholder="cth. PT Kreatif Maju Mandiri"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nomor WhatsApp Aktif *</label>
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
              <label className="text-zinc-300 font-medium">Email Resmi (Opsional)</label>
              <input
                type="email"
                placeholder="cth. hendra@perusahaan.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Target Durasi Video</label>
              <select
                value={targetDuration}
                onChange={(e) => setTargetDuration(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="60 Detik (Iklan Medsos / Reels)">60 Detik (Iklan Medsos / Reels)</option>
                <option value="2 - 3 Menit (Company Profile Ringkas / Highlight)">2 - 3 Menit (Company Profile Ringkas / Highlight)</option>
                <option value="5 - 7 Menit (Profil Lengkap & Paparan Industri)">5 - 7 Menit (Profil Lengkap & Paparan Industri)</option>
                <option value="10+ Menit (Dokumenter / Film Pendek)">10+ Menit (Dokumenter / Film Pendek)</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">Tujuan Utama Video (Video Objective) *</label>
              <input
                type="text"
                placeholder="cth. Memperkenalkan fasilitas pabrik baru kepada investor internasional"
                value={videoObjective}
                onChange={(e) => setVideoObjective(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Target Audiens Penonton *</label>
              <input
                type="text"
                placeholder="cth. B2B Client, Mahasiswa, Calon Pembeli"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">Rencana Lokasi Syuting (Venue) *</label>
              <input
                type="text"
                placeholder="cth. Kawasan Industri Cikarang & Kantor Pusat Sudirman Jakarta"
                value={shootingLocation}
                onChange={(e) => setShootingLocation(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Target Tenggat Waktu (Deadline) *</label>
              <input
                type="text"
                placeholder="cth. Akhir Bulan Depan / 15 November"
                value={targetDeadline}
                onChange={(e) => setTargetDeadline(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-zinc-300 font-medium">Tautan Referensi Visual / Moodboard (YouTube/Vimeo/Drive)</label>
              <input
                type="text"
                placeholder="cth. https://youtube.com/watch?v=contoh_referensi"
                value={visualReferenceUrl}
                onChange={(e) => setVisualReferenceUrl(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Estimasi Anggaran Proyek</label>
              <input
                type="text"
                placeholder="cth. Rp 8.000.000 - Rp 15.000.000"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-300 font-medium">Catatan Tambahan / Kebutuhan Khusus</label>
            <textarea
              rows={3}
              placeholder="Sampaikan kebutuhan khusus seperti drone aerial, talent model, pengisi suara bahasa Inggris, dll..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#12131b] border border-[#242636] rounded p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Validation errors */}
          {formErrors.length > 0 && (
            <div className="p-3 bg-red-950/40 border border-red-500/50 rounded text-xs text-red-300 space-y-1">
              <span className="font-bold">Harap lengkapi kolom yang dibutuhkan:</span>
              <ul className="list-disc pl-5">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1c1e2a]">
            <span className="text-[11px] text-zinc-400">
              Data brief ini akan disusun dalam template percakapan rapi ke WhatsApp produser NVISUAL.
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>Kirim Brief Konsultasi ke WhatsApp</span>
            </button>
          </div>
        </form>

        {/* Success Modal / Banner */}
        {submittedInquiry && (
          <div className="p-5 bg-emerald-950/40 border border-emerald-500/50 rounded-lg space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  Brief Proyek Berhasil Disusun! (Kode: {submittedInquiry.refCode})
                </h4>
                <p className="text-xs text-zinc-300">
                  Data brief produksi telah tercatat dalam sistem antrean dan pesan terformat telah dibuat.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={buildProductionWhatsAppUrl(settings.adminWhatsApp, submittedInquiry)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Buka Pesan WhatsApp Ulang</span>
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
