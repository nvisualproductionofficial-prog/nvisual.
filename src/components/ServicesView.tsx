import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Building2,
  Tv,
  Film,
  Camera,
  Layers,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanWhatsAppNumber } from '../utils/formatters';

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  benefits: string[];
  workflow: Array<{ step: string; title: string; desc: string }>;
  deliverables: string[];
  actionTab?: string;
  whatsappTopic: string;
}

export const ServicesView: React.FC = () => {
  const { setActiveTab, settings } = useApp();
  const [selectedService, setSelectedService] = useState<string>('kelulusan');

  const servicesList: ServiceDetail[] = [
    {
      id: 'kelulusan',
      title: 'Dokumentasi Kelulusan Sekolah',
      category: 'Institusi Pendidikan',
      icon: <GraduationCap className="w-5 h-5" />,
      summary: 'Layanan dokumentasi foto dan video wisuda kelulusan sekolah (SMA, SMK, MA, SMP, Perguruan Tinggi) dengan estetika sinematik, mengabadikan setiap momen khidmat dan haru.',
      benefits: [
        'Liputan tanpa blind spot menggunakan multikamera Cinema 4K',
        'Audio langsung jernih dari master audio board panggung',
        'Aftermovie emosional yang siap tayang di media sosial & arsip alumni',
        'Pilihan paket terintegrasi dengan cetak buku tahunan fisik (Yearbook)'
      ],
      workflow: [
        { step: '01', title: 'Briefing Acara', desc: 'Koordinasi rundown prosesi, susunan panggung, dan daftar wisudawan berprestasi.' },
        { step: '02', title: 'Gladi Bersih & Setup', desc: 'Pemasangan kabel audio feed, penempatan tripod panggung, dan uji coba sinyal kamera.' },
        { step: '03', title: 'Liputan Hari-H', desc: 'Perekaman prosesi lengkap, foto perorangan, wawancara guru, dan aerial drone.' },
        { step: '04', title: 'Editing & Color Grade', desc: 'Penyusunan video aftermovie, perapian audio, koreksi warna, dan penyerahan master digital.' }
      ],
      deliverables: ['Foto Master Full-Resolution', 'Video Aftermovie 3-5 Menit', 'Dokumentasi Lengkap Prosesi', 'Teaser Vertikal Reels/TikTok'],
      actionTab: 'paket-kelulusan',
      whatsappTopic: 'Dokumentasi Kelulusan Sekolah'
    },
    {
      id: 'event',
      title: 'Dokumentasi Event & Konferensi',
      category: 'Corporate & Public Events',
      icon: <Calendar className="w-5 h-5" />,
      summary: 'Dokumentasi komprehensif untuk seminar, workshop, festival musik, konser, gathering tahunan perusahaan, dan peluncuran produk baru.',
      benefits: [
        'Pengambilan gambar multi-angle dinamis dengan stabilizer gimbal & telephoto lens',
        'Same-day edit teaser kilat untuk kebutuhan publikasi pers dan media sosial',
        'Dokumentasi backstage, atmosfer penonton, dan sorotan pembicara utama',
        'Opsi live feed multicam switch ke proyektor atau videotron LED'
      ],
      workflow: [
        { step: '01', title: 'Analisis Rundown', desc: 'Pemetaan momen penting (key moments), waktu kedatangan VIP, dan highlight pertunjukan.' },
        { step: '02', title: 'Pemasangan Rig Lapangan', desc: 'Setup kamera panggung, roaming kamera mobile gimbal, dan ambient mic.' },
        { step: '03', title: 'Eksekusi Produksi', desc: 'Pengambilan footage tanpa jeda sepanjang durasi acara berlangsung.' },
        { step: '04', title: 'Pasca-Produksi Cepat', desc: 'Pembuatan video highlight 1-3 menit dengan backsound berlisensi komersial.' }
      ],
      deliverables: ['Video Highlight / Aftermovie', 'Ratusan Foto Momen Event', 'Full Multicam Cut', 'Teaser Medsos Vertikal'],
      actionTab: 'event-compro',
      whatsappTopic: 'Dokumentasi Event & Konferensi'
    },
    {
      id: 'compro',
      title: 'Video Company Profile',
      category: 'Corporate Branding',
      icon: <Building2 className="w-5 h-5" />,
      summary: 'Produksi video profil perusahaan yang mengangkat visi, standar kualitas industri, fasilitas fasilitas operasional, dan integritas tim kerja Anda.',
      benefits: [
        'Meningkatkan reputasi dan kepercayaan di mata investor & calon klien internasional',
        'Penyusunan naskah (scriptwriting) profesional yang menonjolkan Unique Selling Proposition',
        'Pencahayaan studio kelas atas (cinematic studio lighting) pada ruang kerja dan pabrik',
        'Dukungan voice-over profesional (bilingual Indonesia/Inggris)'
      ],
      workflow: [
        { step: '01', title: 'Riset & Konsep', desc: 'Memahami core values, target pemirsa, dan pesan utama yang ingin disampaikan brand.' },
        { step: '02', title: 'Script & Storyboard', desc: 'Penyusunan naskah narasi, visual storyboard, dan pemilihan talent/karyawan.' },
        { step: '03', title: 'Shooting Terjadwal', desc: 'Pengambilan gambar fasilitas, wawancara jajaran direksi, dan dinamika tim kerja.' },
        { step: '04', title: 'Color Grading & Sound', desc: 'Penyempurnaan warna korporat (brand palette) dan audio mixing broadcast-standard.' }
      ],
      deliverables: ['Master Video Company Profile 4K', 'Versi Pendek 60 Detik', 'Foto Stills Korporat', 'Clean Subtitle Indonesia & Inggris'],
      actionTab: 'event-compro',
      whatsappTopic: 'Video Company Profile'
    },
    {
      id: 'promosi',
      title: 'Video Promosi & Iklan Komersial',
      category: 'Marketing & Digital Ads',
      icon: <Tv className="w-5 h-5" />,
      summary: 'Konten video iklan komersial berdaya pikat tinggi untuk media sosial (Instagram, TikTok, YouTube Ads) yang dirancang untuk mengonversi penonton menjadi konsumen.',
      benefits: [
        'Konsep visual yang menghentikan scroll pemirsa dalam 3 detik pertama (hook)',
        'Kamera berkecepatan tinggi (slow-motion hingga 120/240fps) untuk detail estetika produk',
        'Desain grafis dan typography motion terintegrasi rapi',
        'Format multi-rasio siap tayang (16:9 Landscape, 9:16 Vertical Story/Reels)'
      ],
      workflow: [
        { step: '01', title: 'Brief Produk', desc: 'Identifikasi target demografi konsumen, selling points, dan penawaran utama.' },
        { step: '02', title: 'Eksplorasi Kreatif', desc: 'Penyusunan premis cerita, pemilihan properti, dan perancangan hook video.' },
        { step: '03', title: 'Shooting Produk', desc: 'Penggunaan macro lens, motorized turntable, dan teknik pencahayaan kontras.' },
        { step: '04', title: 'Motion Graphic & Master', desc: 'Penambahan animasi teks promo, call-to-action (CTA), dan penyerahan render siap iklan.' }
      ],
      deliverables: ['Video Iklan 30s & 60s', 'Cutdowns 15s untuk Reels/Stories', 'Asset Foto Produk High-Res'],
      actionTab: 'event-compro',
      whatsappTopic: 'Video Promosi & Iklan Komersial'
    },
    {
      id: 'film',
      title: 'Film Pendek (Short Film)',
      category: 'Naratif & Sinema',
      icon: <Film className="w-5 h-5" />,
      summary: 'Layanan produksi karya sinematik fiksi naratif untuk festival film, kompetisi kreatif, kampanye sosial berbalut cerita, atau film independen.',
      benefits: [
        'Pendekatan visual berbasis lensa anamorfik dan komposisi framing artistik',
        'Manajemen pra-produksi ketat (casting talent, blocking pemain, wardrobe, storyboard)',
        'Perekaman dialog set lokasi dengan microphone shotgun profesional bebas noise',
        'Penyusunan original foley and atmospheric score yang mendukung emosi cerita'
      ],
      workflow: [
        { step: '01', title: 'Pengembangan Skenario', desc: 'Penyempurnaan naskah babak, dialog karakter, dan tema filosofis film.' },
        { step: '02', title: 'Table Read & Recce', desc: 'Latihan bersama pemeran, survei lokasi shooting, dan pembuatan call sheet teknis.' },
        { step: '03', title: 'Shooting Sinematik', desc: 'Pengambilan shot demi shot sesuai storyboard dengan perhatian tinggi pada continuity.' },
        { step: '04', title: 'Editing & Festival Mastering', desc: 'Color grading dramatis di DaVinci Resolve dan mastering audio multichannel surround.' }
      ],
      deliverables: ['Master Film 4K DCI DCP Ready', 'Trailer Resmi 60 Detik', 'Poster Digital Resolusi Tinggi', 'EPK (Electronic Press Kit)'],
      whatsappTopic: 'Produksi Film Pendek'
    },
    {
      id: 'dokumenter',
      title: 'Film Dokumenter',
      category: 'Dokumenter & Human Interest',
      icon: <Camera className="w-5 h-5" />,
      summary: 'Penggalian realitas kehidupan, riset komunitas, pelestarian warisan budaya, dan isu sosial melalui narasi audio visual yang jujur dan berdampak.',
      benefits: [
        'Riset mendalam dan wawancara intim tanpa terasa intimidatif bagi narasumber',
        'Perekaman visual observasional dengan gaya cinéma-vérité yang autentik',
        'Arsip footage bersejarah dan penataan dokumen pendukung yang rapi',
        'Pesan emosional yang menggerakkan kesadaran dan simpati publik'
      ],
      workflow: [
        { step: '01', title: 'Riset Topik', desc: 'Studi pustaka, observasi awal, dan wawancara penjajakan bersama narasumber kunci.' },
        { step: '02', title: 'Penyusunan Perlakuan', desc: 'Menentukan sudut pandang (point of view), alur kronologis, dan struktur narasi.' },
        { step: '03', title: 'Produksi Lapangan', desc: 'Shooting fleksibel mengikuti dinamika kehidupan nyata narasumber di lapangan.' },
        { step: '04', title: 'Paper Edit & Mastering', desc: 'Penyusunan transkrip wawancara, pemaduan visual b-roll, dan finishing audio.' }
      ],
      deliverables: ['Master Dokumenter 4K', 'Teaser Dokumenter', 'Transkrip Wawancara Lengkap'],
      whatsappTopic: 'Produksi Film Dokumenter'
    },
    {
      id: 'rental',
      title: 'Persewaan Peralatan Audiovisual',
      category: 'Peralatan & Studio Support',
      icon: <Layers className="w-5 h-5" />,
      summary: 'Katalog persewaan kamera Sony Cinema Line, BMPCC 6K, lensa prime & zoom, stabilizer DJI, lighting studio Aputure, audio wireless RØDE, dan monitor rekaman.',
      benefits: [
        'Kondisi alat prima (Grade A) yang selalu diperiksa fungsi dan kebersihannya sebelum sewa',
        'Termasuk baterai cadangan, charger, dan kartu memori berkecepatan tinggi dalam paket',
        'Tarif transparan dengan kalkulasi otomatis 24 jam dan deposit jaminan aman',
        'Tersedia opsi pendampingan teknisi / asisten kamera bila dibutuhkan'
      ],
      workflow: [
        { step: '01', title: 'Pilih Alat di Katalog', desc: 'Tentukan kamera, lensa, atau paket yang dibutuhkan serta jadwal pengambilan.' },
        { step: '02', title: 'Pengajuan & Verifikasi', desc: 'Isi formulir ringkas dan kirimkan data jaminan identitas melalui WhatsApp admin.' },
        { step: '03', title: 'Serah Terima & Cek Fisik', desc: 'Pengecekan fungsi tombol, sensor, dan kelengkapan unit bersama tim NVISUAL.' },
        { step: '04', title: 'Pengembalian & Pengembalian Deposit', desc: 'Pemeriksaan akhir kondisi alat dan pengembalian 100% dana deposit jaminan.' }
      ],
      deliverables: ['Peralatan Siap Pakai Lengkap Baterai & Hardcase', 'Dukungan Konsultasi Teknis Penggunaan'],
      actionTab: 'persewaan',
      whatsappTopic: 'Persewaan Alat Audiovisual'
    }
  ];

  const current = servicesList.find((s) => s.id === selectedService) || servicesList[0];

  const handleRequestQuote = (topic: string, redirectTab?: string) => {
    if (redirectTab) {
      setActiveTab(redirectTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const phone = cleanWhatsAppNumber(settings.adminWhatsApp);
      const text = encodeURIComponent(
        `Halo NVISUAL! Saya ingin meminta penawaran dan proposal untuk layanan: *${topic}*. Mohon informasi ketersediaan jadwal dan estimasi biayanya.`
      );
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Katalog Layanan NVISUAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Solusi Produksi Audio Visual Berkelas Bioskop
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Setiap layanan ditangani dengan peralatan sinematik standar industri, alur kerja terstruktur, dan komunikasi transparan tanpa biaya tersembunyi.
        </p>
      </div>

      {/* Service Selector Buttons (Segmented tabs) */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#101117] border border-[#20222e] rounded-lg">
        {servicesList.map((svc) => (
          <button
            key={svc.id}
            onClick={() => setSelectedService(svc.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              selectedService === svc.id
                ? 'bg-[#1e202c] text-[#d4af37] border border-[#d4af37]/40 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-[#161720]'
            }`}
          >
            {svc.icon}
            <span>{svc.title}</span>
          </button>
        ))}
      </div>

      {/* Active Service Detailed Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Overview, Benefits, Deliverables */}
        <div className="lg:col-span-2 space-y-8 bg-[#0d0e13] border border-[#1d1f2b] p-6 sm:p-8 rounded-lg">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              {current.category}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {current.title}
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed pt-1">
              {current.summary}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 pt-4 border-t border-[#1d1f2b]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Nilai Keunggulan & Manfaat Utama
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-[#13141c] p-3 rounded border border-[#222432]">
                  <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow */}
          <div className="space-y-4 pt-4 border-t border-[#1d1f2b]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Tahapan & Proses Kerja
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.workflow.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded bg-[#111219] border border-[#20222f] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#d4af37]">{item.step}</span>
                    <span className="text-xs font-bold text-white">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-4 border-t border-[#1d1f2b]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Hasil Akhir (Deliverables)
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
              {current.deliverables.map((deliv, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#171822] border border-[#272a39] rounded text-zinc-300"
                >
                  ✓ {deliv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Request Quote Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-gradient-to-b from-[#12131b] to-[#0e0f14] border border-[#2a2c3a] space-y-6 sticky top-28">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                Konsultasi & Penawaran
              </span>
              <h4 className="text-lg font-bold text-white">
                Minta Penawaran untuk {current.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dapatkan proposal rancangan produksi, susunan tim kru, dan penawaran biaya yang disesuaikan dengan anggaran Anda.
              </p>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Respon cepat dalam hitungan jam</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Format penawaran resmi tersusun rapi</span>
              </div>
            </div>

            <button
              onClick={() => handleRequestQuote(current.whatsappTopic, current.actionTab)}
              className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4af37]/20"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>{current.actionTab ? 'Buka Form Penawaran' : 'Minta Penawaran via WA'}</span>
            </button>

            <div className="p-3 rounded bg-[#161720] border border-[#252837] text-[11px] text-zinc-400">
              💡 Seluruh rancangan penawaran bersifat fleksibel dan dapat dikomunikasikan bersama produser kami.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
