import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink,
  Instagram,
  Youtube
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanWhatsAppNumber } from '../utils/formatters';

export const ContactView: React.FC = () => {
  const { settings } = useApp();

  // Contact Form State
  const [senderName, setSenderName] = useState('');
  const [senderWhatsApp, setSenderWhatsApp] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Konsultasi Dokumentasi Wisuda');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana prosedur peminjaman alat di NVISUAL?',
      a: 'Penyewa memilih alat melalui katalog, mengisi formulir jadwal sewa, dan mengirimkan pesan booking otomatis ke WhatsApp admin. Setelah data dan ketersediaan diverifikasi, penyewa membawa identitas asli (e-KTP/SIM/KTM) dan deposit jaminan saat serah terima alat.'
    },
    {
      q: 'Apakah deposit jaminan sewa alat bisa dikembalikan?',
      a: 'Ya, deposit jaminan adalah 100% refundable. Dana deposit akan langsung dikembalikan seketika saat alat dikembalikan lengkap, tepat waktu, dan dalam kondisi fisik serta fungsi yang baik.'
    },
    {
      q: 'Berapa lama estimasi pengerjaan video aftermovie wisuda sekolah?',
      a: 'Untuk foto pilihan hari-H (sneak peek), kami dapat mengirimkannya dalam 24 jam untuk kebutuhan publikasi medsos sekolah. Video aftermovie lengkap dan master foto siap dalam kurun waktu 14 hingga 21 hari kerja setelah prosesi acara.'
    },
    {
      q: 'Apakah tim NVISUAL bisa melayani produksi di luar kota?',
      a: 'Tentu. Tim kami berbasis operasional di Jabodetabek dan siap diberangkatkan ke seluruh kota di Indonesia berdasarkan kesepakatan penugasan (akomodasi & transportasi diatur sesuai proposal).'
    },
    {
      q: 'Apakah harga paket dokumentasi wisuda sekolah bisa dinegosiasikan?',
      a: 'Tentu saja. Kami mengerti setiap sekolah memiliki alokasi anggaran dan jumlah siswa yang beragam. Silakan ajukan formulir penawaran kustom agar kami dapat menyesuaikan jumlah kamera dan kru yang paling efektif.'
    }
  ];

  const handleDirectWhatsApp = (topic: string) => {
    const phone = cleanWhatsAppNumber(settings.adminWhatsApp);
    const text = encodeURIComponent(
      `Halo NVISUAL! Saya ingin berkonsultasi mengenai: *${topic}*.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderWhatsApp.trim() || !senderMessage.trim()) return;

    const phone = cleanWhatsAppNumber(settings.adminWhatsApp);
    const formattedMsg = `*PESAN KONTAK DARI WEBSITE NVISUAL*

👤 *Nama Pengirim:* ${senderName}
📱 *WhatsApp Pengirim:* ${senderWhatsApp}
📌 *Perihal / Topik:* ${inquiryTopic}

💬 *Isi Pesan:*
"${senderMessage}"

Terima kasih!`;

    setIsSent(true);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(formattedMsg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Informasi & Lokasi Operasional
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Hubungi NVISUAL Production House
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Konsultasikan proyek visual Anda melalui kanal komunikasi resmi kami. Tim kami siap merespon pertanyaan Anda seputar persewaan alat maupun penawaran produksi.
        </p>
      </div>

      {/* Contact Cards & Quick Subject Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: WhatsApp */}
        <div className="p-6 rounded-lg bg-[#0f1016] border border-[#1e202b] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">WhatsApp Resmi</h3>
            <p className="text-xs text-zinc-400">
              Respon cepat untuk booking alat dan konsultasi penawaran produksi.
            </p>
            <p className="text-sm font-semibold text-[#d4af37]">
              +{settings.adminWhatsApp}
            </p>
          </div>
          <button
            onClick={() => handleDirectWhatsApp('Konsultasi Umum')}
            className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-black" />
            <span>Chat WhatsApp</span>
          </button>
        </div>

        {/* Card 2: Email */}
        <div className="p-6 rounded-lg bg-[#0f1016] border border-[#1e202b] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Email Resmi</h3>
            <p className="text-xs text-zinc-400">
              Pengiriman surat pengantar resmi, dokumen proposal, atau TOR proyek.
            </p>
            <p className="text-xs font-semibold text-zinc-200 break-all">
              {settings.officialEmail}
            </p>
          </div>
          <a
            href={`mailto:${settings.officialEmail}`}
            className="w-full py-2.5 rounded text-xs font-semibold bg-[#161722] hover:bg-[#20222f] text-white border border-[#282a3a] transition-colors flex items-center justify-center gap-2"
          >
            <span>Kirim Email</span>
          </a>
        </div>

        {/* Card 3: Wilayah Operasional */}
        <div className="p-6 rounded-lg bg-[#0f1016] border border-[#1e202b] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-[#161722] border border-[#262838] flex items-center justify-center text-[#d4af37]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Wilayah Operasional</h3>
            <p className="text-xs text-zinc-400">
              Basis serah terima alat dan penugasan tim produksi lapangan:
            </p>
            <p className="text-xs font-semibold text-zinc-200">
              {settings.operationalCity}
            </p>
          </div>
          <div className="p-2.5 bg-[#14151e] border border-[#232533] rounded text-[11px] text-zinc-400">
            {settings.operationalAddress}
          </div>
        </div>

      </div>

      {/* Quick Topic Triggers for Instant Consultation */}
      <div className="p-6 bg-[#0c0d12] border border-[#1d1f2a] rounded-lg space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          Pilih Topik Konsultasi Instan via WhatsApp:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {[
            'Sewa Kamera & Lensa',
            'Penawaran Dokumentasi Wisuda SMA/SMK',
            'Dokumentasi Event & Konferensi',
            'Video Company Profile Perusahaan',
            'Cek Ketersediaan Alat Hari Ini'
          ].map((topic, idx) => (
            <button
              key={idx}
              onClick={() => handleDirectWhatsApp(topic)}
              className="px-3.5 py-2 rounded text-xs font-medium bg-[#14151e] hover:bg-[#1f202d] text-zinc-300 hover:text-white border border-[#252837] hover:border-[#d4af37]/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-[#d4af37]" />
              <span>{topic}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form & Operational Guidelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Form */}
        <div className="bg-[#0f1016] border border-[#222432] p-6 sm:p-8 rounded-lg space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Kirim Pesan Langsung</h3>
            <p className="text-xs text-zinc-400">
              Isi formulir ini dan pesan Anda akan langsung tersambung ke WhatsApp admin resmi kami.
            </p>
          </div>

          <form onSubmit={handleSubmitContactForm} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nama Lengkap *</label>
              <input
                type="text"
                placeholder="cth. Bima Satria"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Nomor WhatsApp Aktif *</label>
              <input
                type="text"
                placeholder="cth. 081234567890"
                value={senderWhatsApp}
                onChange={(e) => setSenderWhatsApp(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Perihal / Kebutuhan</label>
              <select
                value={inquiryTopic}
                onChange={(e) => setInquiryTopic(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Konsultasi Dokumentasi Wisuda">Dokumentasi Wisuda Sekolah</option>
                <option value="Sewa Peralatan Audiovisual">Persewaan Peralatan Audiovisual</option>
                <option value="Video Company Profile & Promosi">Video Company Profile & Promosi</option>
                <option value="Dokumentasi Event & Konser">Dokumentasi Event & Konser</option>
                <option value="Lainnya">Pertanyaan Umum Lainnya</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Isi Pesan / Pertanyaan *</label>
              <textarea
                rows={4}
                placeholder="Tuliskan pertanyaan atau kebutuhan acara Anda di sini..."
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                className="w-full bg-[#12131b] border border-[#242636] rounded p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b89224] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4af37]/20"
            >
              <Send className="w-3.5 h-3.5 fill-black" />
              <span>Kirim Pesan ke WhatsApp</span>
            </button>
          </form>

          {isSent && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Tautan WhatsApp telah dibuka. Terima kasih telah menghubungi kami!</span>
            </div>
          )}
        </div>

        {/* Operating Hours & Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0f1016] border border-[#1e202b] rounded-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>Jam Layanan & Pengambilan Alat</span>
            </h3>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-[#1c1e28]">
                <span>Senin — Jumat:</span>
                <span className="font-medium text-white">08:00 — 21:00 WIB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1c1e28]">
                <span>Sabtu — Minggu:</span>
                <span className="font-medium text-white">08:00 — 22:00 WIB</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Pengambilan Darurat / Malam:</span>
                <span className="text-[#d4af37] font-medium">Berdasarkan Janji Temu</span>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h4>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded border border-[#1f212e] bg-[#0c0d12] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-semibold text-zinc-200 flex items-center justify-between gap-3 hover:text-white cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#d4af37] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-zinc-400 leading-relaxed border-t border-[#1a1b26] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
