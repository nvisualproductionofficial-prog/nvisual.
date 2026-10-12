export type EquipmentCategory = 
  | 'camera'
  | 'lens'
  | 'lighting'
  | 'audio'
  | 'stabilizer'
  | 'monitor'
  | 'accessory'
  | 'package';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  thumbnail: string;
  dailyRate: number; // in IDR
  depositAmount: number; // in IDR
  stockCount: number;
  condition: 'Grade A (Prima)' | 'Grade B (Baik)' | 'Baru';
  specs: string[];
  inclusions: string[]; // Kelengkapan: baterai, charger, memory, case
  usageNotes: string;
  isFeatured?: boolean;
}

export type OrderStatus = 'pending_review' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';

export interface RentalBooking {
  id: string;
  refCode: string;
  createdAt: string;
  status: OrderStatus;
  renter: {
    fullName: string;
    whatsapp: string;
    cityAddress: string;
    idType: 'KTP' | 'SIM' | 'KTM';
    usagePurpose: string;
    usageLocation: string;
  };
  items: Array<{
    equipmentId: string;
    equipmentName: string;
    dailyRate: number;
    depositAmount: number;
    quantity: number;
  }>;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  durationDays: number;
  estimatedRentTotal: number;
  depositTotal: number;
  addOns: Array<{ name: string; price: number }>;
  grandTotal: number;
  termsAccepted: boolean;
  handoverChecklist: Record<string, boolean>;
  adminNotes?: string;
}

export interface GraduationPackage {
  id: 'essential' | 'signature' | 'complete' | string;
  name: string;
  tagline: string;
  priceEstimate: number; // 0 if custom
  isPriceFixed: boolean;
  minAudience: string;
  cameraCount: string;
  crewCount: string;
  durationCoverage: string;
  deliverables: string[];
  features: string[];
  isPopular?: boolean;
}

export interface GraduationInquiry {
  id: string;
  refCode: string;
  createdAt: string;
  schoolName: string;
  picName: string;
  whatsapp: string;
  eventDate: string;
  location: string;
  participantsCount: number;
  eventType: string; // Wisuda, Pelepasan, Prom/Gathering
  packageSelected: string;
  addOns: string[];
  budgetEstimate: string;
  notes: string;
  status: OrderStatus;
  adminNotes?: string;
}

export interface ProductionInquiry {
  id: string;
  refCode: string;
  createdAt: string;
  serviceType: 'company_profile' | 'event_documentation' | 'promotional_video' | 'short_film' | 'documentary';
  clientName: string;
  companyName?: string;
  whatsapp: string;
  email?: string;
  videoObjective: string;
  targetAudience: string;
  targetDuration: string;
  shootingLocation: string;
  visualReferenceUrl?: string;
  targetDeadline: string;
  budgetRange: string;
  notes?: string;
  status: OrderStatus;
  adminNotes?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Sekolah' | 'Event' | 'Company Profile' | 'Komersial' | 'Film Pendek' | 'Dokumenter';
  year: string;
  clientOrContext: string;
  synopsis: string;
  posterImage: string;
  videoUrl?: string;
  runtime?: string;
  gearUsed?: string[];
  galleryImages?: string[];
  tags: string[];
  isDemoPlaceholder: boolean;
}

export interface SiteSettings {
  adminWhatsApp: string; // e.g. "6282123456789"
  companyName: string;
  tagline: string;
  officialEmail: string;
  operationalCity: string;
  operationalAddress: string;
  rentalTerms: string[];
  handoverItems: string[];
  adminPin: string; // default e.g. "1234"
}
