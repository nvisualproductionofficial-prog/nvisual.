/**
 * Format number into Indonesian Rupiah (IDR)
 */
export function formatIDR(amount: number): string {
  if (isNaN(amount) || amount === 0) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Generate a unique reference code
 */
export function generateRefCode(prefix: 'RENT' | 'GRAD' | 'PROD'): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NV-${prefix}-${dateStr}-${randomStr}`;
}

/**
 * Clean phone number for WhatsApp url (ensure starts with country code, e.g. 62)
 */
export function cleanWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}
