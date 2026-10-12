import React from 'react';
import {
  Camera,
  Play,
  ArrowRight,
  Sparkles,
  Film,
  GraduationCap,
  Calendar,
  Building2,
  Tv,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Layers,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR, cleanWhatsAppNumber } from '../utils/formatters';

export const HomeView: React.FC = () => {
  const { setActiveTab, equipment, setSelectedEquipmentForModal, settings } = useApp();

  const featuredEquipment = equipment.filter((eq) => eq.isFeatured).slice(0, 4);

  const handleWhatsAppConsultation = () => {
    const phone = cleanWhatsAppNumber(settings.adminWhatsApp);
    const text = encodeURIComponent(
      'Halo NVISUAL! Saya tertarik untuk konsultasi proyek video / dokumentasi atau persewaan alat audiovisual.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#1b1c24]">
        {/* Background Atmosphere Image with dark cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=85"
            alt="Proses shooting film dan kamera sinematik"
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/80 to-[#08090a]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#08090a]/70 to-[#08090a]" />
          {/* Subtle gold cinematic lens flare element */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-10">
          
          {/* Subtitle / Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-zinc-400">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-[#d4af37]">Production House & Rental Studio</span>
            <span className="w-8 h-[1px] bg-[#d4af37]" />
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Beyond Visual, <br />
              <span className="gold-gradient-text">Defining Stories.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              Menghadirkan standar produksi sinematik untuk dokumentasi kelulusan sekolah, event akbar, company profile perusahaan, film naratif, serta persewaan peralatan audiovisual profesional.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('layanan')}
              className="w-full sm:w-auto px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] via-[#c49d28] to-[#9e7c17] text-black hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Jelajahi Layanan Kami</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={handleWhatsAppConsultation}
              className="w-full sm:w-auto px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider bg-[#13141b] hover:bg-[#1a1c26] text-white border border-[#2c2f3d] hover:border-[#d4af37]/60 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#d4af37]" />
              <span>Konsultasi WhatsApp</span>
            </button>
          </div>

          {/* Quick Pillars (Unboxed metadata with separators) */}
          <div className="pt-8 border-t border-[#1c1e28] flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
              4K Cinema Line Gear
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
              Spesialis Kelulusan & Wisuda
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Film className="w-3.5 h-3.5 text-[#d4af37]" />
              Color Grading & Sound Design
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              Katalog Rental Terkalibrasi
            </span>
          </div>

        </div>
      </section>

      {/* Services Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-2">
              Layanan Utama NVISUAL
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Karya Visual yang Mengabadikan Setiap Detik
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('layanan')}
            className="text-xs text-[#d4af37] hover:text-white flex items-center gap-1.5 font-medium transition-colors cursor-pointer group"
          >
            <span>Lihat Rincian Seluruh Layanan</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Kelulusan Sekolah */}
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#181922] border border-[#282a38] flex items-center justify-center text-[#d4af37]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                Dokumentasi Kelulusan Sekolah
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Liputan wisuda akbar untuk SMA, SMK, MA, dan SMP dengan paket Essential, Signature, hingga Complete terintegrasi dengan opsi yearbook fisik.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('paket-kelulusan')}
              className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer pt-2"
            >
              <span>Pelajari Paket Wisuda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Dokumentasi Event */}
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#181922] border border-[#282a38] flex items-center justify-center text-[#d4af37]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                Dokumentasi Event & Konferensi
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seminar, workshop, festival musik, konser, gathering perusahaan, dan multikamera live streaming dengan output aftermovie cepat.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('event-compro')}
              className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer pt-2"
            >
              <span>Eksplorasi Dokumentasi Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Video Company Profile */}
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#181922] border border-[#282a38] flex items-center justify-center text-[#d4af37]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                Video Company Profile & Promosi
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Membantu perusahaan dan brand menyampaikan visi, kapasitas industri, dan nilai keunggulan melalui visual berkelas bioskop.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('event-compro')}
              className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer pt-2"
            >
              <span>Konsultasi Company Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Film Pendek & Naratif */}
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#181922] border border-[#282a38] flex items-center justify-center text-[#d4af37]">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                Film Pendek & Dokumenter
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Produksi naratif mendalam mulai dari penulisan skenario, storyboard, riset karakter, sinematografi anamorfik, hingga color grading profesional.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('layanan')}
              className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer pt-2"
            >
              <span>Pelajari Alur Produksi Film</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5: Persewaan Alat Audiovisual */}
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#181922] border border-[#282a38] flex items-center justify-center text-[#d4af37]">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                Persewaan Alat Audiovisual
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kamera Sony FX3, A7 IV, BMPCC 6K, Lensa GM, Lighting Aputure, Mic RØDE 32-bit Float, & Gimbal DJI terawat siap pakai.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('persewaan')}
              className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:underline cursor-pointer pt-2"
            >
              <span>Buka Katalog Rental Alat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 6: Konsultasi Langsung via WA */}
          <div className="p-6 rounded-md bg-gradient-to-br from-[#12131a] to-[#1c1d27] border border-[#d4af37]/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#d4af37] text-black flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Butuh Konsep Khusus?
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sampaikan ide atau kendala produksi Anda kepada tim NVISUAL. Kami siap berdiskusi menyusun rancangan anggaran dan strategi visual terbaik.
              </p>
            </div>
            <button
              onClick={handleWhatsAppConsultation}
              className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mulai Diskusi via WA</span>
            </button>
          </div>

        </div>
      </section>

      {/* Featured Equipment Rental Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-2">
              Katalog Rental Unggulan
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Peralatan Sinematik Siap Shooting
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Seluruh alat melalui checklist serah terima fungsi, sensor bersih, dan baterai prima sebelum diserahkan.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('persewaan')}
            className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider border border-[#2a2c38] text-zinc-300 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Katalog Lengkap ({equipment.length} Item)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-[#0f1015] border border-[#1e202b] rounded-md overflow-hidden hover:border-[#d4af37]/60 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 bg-[#0a0b0e] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/80 text-[#d4af37] border border-[#d4af37]/30 rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                    {item.brand}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors line-clamp-2">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-[#1c1e28] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-zinc-400">Tarif / 24 Jam:</span>
                    <span className="text-sm font-bold text-white">
                      {formatIDR(item.dailyRate)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedEquipmentForModal(item)}
                    className="w-full py-2 rounded text-xs font-semibold bg-[#181922] hover:bg-[#20222f] text-zinc-200 border border-[#2c2f3f] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
                  >
                    Detail & Sewa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Graduation Packages Spotlight */}
      <section className="bg-[#0c0d12] border-y border-[#1a1b24] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Spesialis Kelulusan Sekolah
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Tiga Pilihan Paket Dokumentasi Wisuda
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Dirancang untuk SMA, SMK, MA, SMP, dan Perguruan Tinggi. Masing-masing paket dapat disesuaikan dengan skala angkatan dan tata letak gedung acara Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Essential */}
            <div className="p-6 rounded-md bg-[#101117] border border-[#222432] space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tingkat 1</span>
                <h3 className="text-xl font-bold text-white">Paket Essential</h3>
                <p className="text-xs text-zinc-400">
                  Fokus pada dokumentasi inti prosesi wisuda, foto medali, dan highlight video ringkas.
                </p>
                <div className="pt-2 text-xs text-zinc-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>2 Unit Kamera Cinema 4K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>3 Orang Tim Kru Berpengalaman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Highlight Teaser 1-2 Menit</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('paket-kelulusan')}
                className="w-full py-2.5 rounded text-xs font-semibold bg-[#161720] hover:bg-[#20222e] text-white border border-[#2b2d3c] transition-colors cursor-pointer"
              >
                Lihat Detail Essential
              </button>
            </div>

            {/* Signature (Highlighted) */}
            <div className="p-6 rounded-md bg-[#131520] border-2 border-[#d4af37] space-y-5 flex flex-col justify-between relative shadow-xl shadow-[#d4af37]/10">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider">
                Paling Diminati Sekolah
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Tingkat 2</span>
                <h3 className="text-xl font-bold text-white">Paket Signature</h3>
                <p className="text-xs text-zinc-300">
                  Liputan sinematik menyeluruh, aftermovie emosional 3-5 menit, dan aerial drone 4K.
                </p>
                <div className="pt-2 text-xs text-zinc-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>3-4 Kamera Cinema + Drone 4K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>5-6 Orang Kru Lapangan Lengkap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Aftermovie Sinematik 3-5 Menit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Teaser Vertikal Reels / TikTok</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('paket-kelulusan')}
                className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all cursor-pointer"
              >
                Pilih Paket Signature
              </button>
            </div>

            {/* Complete */}
            <div className="p-6 rounded-md bg-[#101117] border border-[#222432] space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tingkat 3</span>
                <h3 className="text-xl font-bold text-white">Paket Complete</h3>
                <p className="text-xs text-zinc-400">
                  Solusi terintegrasi wisuda, buku tahunan cetak hardcover premium, dan after party night.
                </p>
                <div className="pt-2 text-xs text-zinc-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>5+ Multicam + Drone + Studio Booth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Opsi Buku Tahunan Cetak Premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Liputan Gathering / Prom Night</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Live Switcher ke Layar LED Utama</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('paket-kelulusan')}
                className="w-full py-2.5 rounded text-xs font-semibold bg-[#161720] hover:bg-[#20222e] text-white border border-[#2b2d3c] transition-colors cursor-pointer"
              >
                Lihat Detail Complete
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Production Pipeline Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Etos Kerja & Standar Kualitas
          </span>
          <h2 className="text-3xl font-bold text-white">
            Alur Produksi Sinematik NVISUAL
          </h2>
          <p className="text-xs text-zinc-400">
            Setiap detik visual direncanakan secara terstruktur untuk menjamin kepuasan klien dan ketepatan tenggat waktu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-md bg-[#0e0f14] border border-[#1d1f2b] space-y-3">
            <span className="text-2xl font-black text-[#d4af37]">01</span>
            <h4 className="text-base font-bold text-white">Konsultasi & Konsep</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mendengarkan tujuan video, target audiens, penyusunan moodboard, skenario/naskah, dan storyboard visual.
            </p>
          </div>

          <div className="p-6 rounded-md bg-[#0e0f14] border border-[#1d1f2b] space-y-3">
            <span className="text-2xl font-black text-[#d4af37]">02</span>
            <h4 className="text-base font-bold text-white">Pra-Produksi & Call Sheet</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Survei lokasi (recce), penyusunan jadwal shooting menit-per-menit, persiapan alat bioskop, dan pembagian tugas kru.
            </p>
          </div>

          <div className="p-6 rounded-md bg-[#0e0f14] border border-[#1d1f2b] space-y-3">
            <span className="text-2xl font-black text-[#d4af37]">03</span>
            <h4 className="text-base font-bold text-white">Produksi & Shooting</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pengambilan gambar dengan kamera cinema 10-bit, audio recording multi-channel, dan pencahayaan studio terukur.
            </p>
          </div>

          <div className="p-6 rounded-md bg-[#0e0f14] border border-[#1d1f2b] space-y-3">
            <span className="text-2xl font-black text-[#d4af37]">04</span>
            <h4 className="text-base font-bold text-white">Pasca-Produksi & Delivery</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Editing offline/online, color grading DaVinci Resolve, mixing audio & sound design, sesi revisi, dan penyerahan master 4K.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg p-8 sm:p-12 bg-gradient-to-r from-[#14151e] via-[#101117] to-[#181924] border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Siap Mewujudkan Cerita Visual Anda?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Diskusikan rencana dokumentasi wisuda, event, video company profile, atau sewa peralatan audiovisual langsung bersama tim produser kami.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('persewaan')}
              className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider bg-[#1b1d28] hover:bg-[#242635] text-white border border-[#2f3244] transition-colors cursor-pointer text-center"
            >
              Katalog Sewa Alat
            </button>
            <button
              onClick={handleWhatsAppConsultation}
              className="px-6 py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4af37]/20"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Chat WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
