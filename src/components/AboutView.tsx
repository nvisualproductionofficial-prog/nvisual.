import React from 'react';
import {
  Film,
  Camera,
  Heart,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero / Identity Section */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Identitas & Filosofi Produksi
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cerita yang Hidup di Balik Setiap Lensa
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          <strong>NVISUAL</strong> lahir dari keyakinan sederhana: bahwa visual yang memukau hanyalah pintu masuk, namun <em>jiwa</em> dari setiap karya yang abadi adalah <strong>cerita yang autentik</strong>.
        </p>
      </div>

      {/* Tagline Feature Card */}
      <div className="rounded-lg p-8 sm:p-12 bg-gradient-to-r from-[#14151e] via-[#0f1016] to-[#181924] border border-[#d4af37]/30 space-y-4 shadow-xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
          Tagline Kami
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          “Beyond Visual, Defining Stories.”
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl font-light">
          Kami menolak visual yang hanya sekadar riasan tanpa makna. Dalam setiap liputan wisuda sekolah, dokumentasi event publik, maupun company profile korporat, tim NVISUAL berusaha mendefinisikan kembali esensi momen agar emosinya tetap terasa hangat saat disaksikan bertahun-tahun kemudian.
        </p>
      </div>

      {/* Core Values / Creative Approach */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Pendekatan Kreatif
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Tiga Pilar Utama Dedikasi NVISUAL
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] space-y-3">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Sensibilitas Emosional</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kamera tidak sekadar merekam apa yang tampak, tetapi menangkap tatapan haru orang tua, tawa spontan rekan seangkatan, dan ketegasan jabat tangan profesional.
            </p>
          </div>

          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] space-y-3">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Ketelitian Teknis Standar Sinema</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Penggunaan sensor full-frame 10-bit 4:2:2, koreksi warna presisi pada software DaVinci Resolve, dan recording audio 32-bit float yang menjamin kualitas tayang broadcast.
            </p>
          </div>

          <div className="p-6 rounded-md bg-[#0f1015] border border-[#1e202b] space-y-3">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Integritas & Transparansi Biaya</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tidak ada biaya tersembunyi, mark-up peralatan sembarangan, atau janji fasilitas fiktif. Seluruh rincian tertera transparan dalam dokumen penawaran resmi.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Commitment Statement (No fabricated awards/clients) */}
      <section className="bg-[#0c0d12] border border-[#1e202b] rounded-lg p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Komitmen Kejujuran & Standar Layanan</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          Fokus pada Karya Nyata, Bukan Klaim Berlebihan
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          NVISUAL berkomitmen untuk membangun reputasi melalui kepuasan langsung setiap panitia sekolah, penyelenggara acara, dan klien bisnis yang kami tangani. Kami tidak mencantumkan daftar penghargaan fiktif atau klaim pengalaman buatan. Seluruh kapasitas alat, jam terbang kru, dan estimasi waktu pengerjaan kami sampaikan apa adanya agar kerja sama berlangsung sehat, saling percaya, dan jangka panjang.
        </p>
      </section>

      {/* Next Step CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#12131b] border border-[#232535] rounded-lg">
        <div>
          <h4 className="text-sm font-bold text-white">
            Ingin Berdiskusi Langsung dengan Tim Kreatif Kami?
          </h4>
          <p className="text-xs text-zinc-400">
            Kami siap menyambut pertanyaan Anda seputar rencana liputan atau kebutuhan sewa alat.
          </p>
        </div>
        <button
          onClick={() => { setActiveTab('kontak'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Halaman Kontak</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
