import { RentalBooking, GraduationInquiry, ProductionInquiry } from '../types';
import { formatIDR, cleanWhatsAppNumber } from './formatters';

/**
 * Builds direct WhatsApp link for Equipment Rental Booking Request
 */
export function buildRentalWhatsAppUrl(adminPhone: string, booking: RentalBooking): string {
  const phone = cleanWhatsAppNumber(adminPhone);

  const itemsList = booking.items
    .map((item, idx) => `  ${idx + 1}. *${item.equipmentName}* (${item.quantity} unit) - ${formatIDR(item.dailyRate)}/hari`)
    .join('\n');

  const addOnsList = booking.addOns && booking.addOns.length > 0
    ? booking.addOns.map(a => `  • ${a.name} (${formatIDR(a.price)})`).join('\n')
    : '  Tidak ada';

  const message = `*HALO NVISUAL PRODUCTION HOUSE*
_Permintaan Booking Sewa Alat Audiovisual (Status: Permintaan Baru)_

📋 *KODE REFERENSI:* \`${booking.refCode}\`

👤 *DATA PENYEWA:*
• Nama Lengkap: ${booking.renter.fullName}
• WhatsApp: ${booking.renter.whatsapp}
• Alamat / Domisili: ${booking.renter.cityAddress}
• Identitas Jaminan: ${booking.renter.idType}
• Keperluan Produksi: ${booking.renter.usagePurpose}
• Lokasi Penggunaan: ${booking.renter.usageLocation}

📦 *DAFTAR PERALATAN:*
${itemsList}

⏱️ *JADWAL SEWA:*
• Ambil: ${booking.pickupDate} pukul ${booking.pickupTime} WIB
• Kembali: ${booking.returnDate} pukul ${booking.returnTime} WIB
• Durasi: *${booking.durationDays} Hari*

➕ *LAYANAN TAMBAHAN:*
${addOnsList}

💰 *RINCIAN ESTIMASI BIAYA:*
• Subtotal Sewa Alat: ${formatIDR(booking.estimatedRentTotal)}
• Biaya Tambahan: ${formatIDR(booking.addOns.reduce((s, a) => s + a.price, 0))}
• Deposit Jaminan (Refundable): ${formatIDR(booking.depositTotal)}
--------------------------------
*TOTAL ESTIMASI:* ${formatIDR(booking.grandTotal)}
_(Catatan: Deposit jaminan dikembalikan 100% setelah alat kembali lengkap dan aman)_

⚠️ *Pernyataan:* Saya telah membaca dan menyetujui syarat & ketentuan rental. Saya mengerti bahwa pengajuan ini masih berstatus PERMINTAAN dan menunggu konfirmasi & verifikasi admin NVISUAL.

Mohon informasi ketersediaan unit dan tahapan verifikasi selanjutnya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp link for Graduation Documentation Inquiry
 */
export function buildGraduationWhatsAppUrl(adminPhone: string, inquiry: GraduationInquiry): string {
  const phone = cleanWhatsAppNumber(adminPhone);

  const addOnsStr = inquiry.addOns.length > 0
    ? inquiry.addOns.map(a => `  • ${a}`).join('\n')
    : '  Tidak ada tambahan khusus';

  const message = `*HALO NVISUAL PRODUCTION HOUSE*
_Permintaan Penawaran Dokumentasi Kelulusan Sekolah_

📋 *KODE PENAWARAN:* \`${inquiry.refCode}\`

🏫 *INFORMASI SEKOLAH & ACARA:*
• Nama Institusi / Sekolah: ${inquiry.schoolName}
• PIC / Penanggung Jawab: ${inquiry.picName}
• WhatsApp PIC: ${inquiry.whatsapp}
• Tanggal Pelaksanaan: ${inquiry.eventDate}
• Lokasi / Venue Acara: ${inquiry.location}
• Estimasi Jumlah Peserta: ${inquiry.participantsCount} Siswa
• Jenis Kegiatan: ${inquiry.eventType}

🎓 *PAKET PILIHAN:*
• *${inquiry.packageSelected}*

✨ *OPSI LAYANAN TAMBAHAN:*
${addOnsStr}

💵 *PERKIRAAN ANGGARAN SEKOLAH:*
• ${inquiry.budgetEstimate || 'Fleksibel / Mengikuti proposal rekomendasi NVISUAL'}

📝 *CATATAN KHUSUS / PERMINTAAN:*
${inquiry.notes ? `"${inquiry.notes}"` : '-'}

Mohon dikirimkan proposal penawaran resmi, rincian susunan kru, dan portofolio wisuda sekolah terkait. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp link for Production & Company Profile Consultation
 */
export function buildProductionWhatsAppUrl(adminPhone: string, inquiry: ProductionInquiry): string {
  const phone = cleanWhatsAppNumber(adminPhone);

  const serviceNameMap: Record<string, string> = {
    company_profile: 'Video Company Profile Perusahaan',
    event_documentation: 'Dokumentasi Event & Konferensi',
    promotional_video: 'Video Promosi & Iklan Komersial',
    short_film: 'Produksi Film Pendek / Naratif',
    documentary: 'Film Dokumenter Mendalam'
  };

  const message = `*HALO NVISUAL PRODUCTION HOUSE*
_Konsultasi Brief Produksi Kreatif_

📋 *KODE BRIEF:* \`${inquiry.refCode}\`

🎬 *JENIS LAYANAN:*
• *${serviceNameMap[inquiry.serviceType] || inquiry.serviceType}*

🏢 *KLIEN & KONTAK:*
• Nama Klien / PIC: ${inquiry.clientName}
• Perusahaan / Instansi: ${inquiry.companyName || '-'}
• WhatsApp: ${inquiry.whatsapp}
• Email: ${inquiry.email || '-'}

🎯 *TUJUAN & TARGET:*
• Tujuan Video: ${inquiry.videoObjective}
• Target Audiens: ${inquiry.targetAudience}
• Estimasi Durasi: ${inquiry.targetDuration}
• Rencana Lokasi Shooting: ${inquiry.shootingLocation}
• Tenggat Waktu (Deadline): ${inquiry.targetDeadline}
• Estimasi Anggaran: ${inquiry.budgetRange}

🔗 *REFERENSI VISUAL / MOODBOARD:*
• ${inquiry.visualReferenceUrl || 'Belum ada referensi khusus'}

📝 *CATATAN TAMBAHAN:*
${inquiry.notes ? `"${inquiry.notes}"` : '-'}

Mohon jadwal konsultasi konsep atau meeting presentasi singkat via online / offline. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
