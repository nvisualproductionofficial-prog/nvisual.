import { EquipmentItem, GraduationPackage, PortfolioItem, SiteSettings } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  adminWhatsApp: '6282123456789', // Editable in admin dashboard
  companyName: 'NVISUAL Production House',
  tagline: 'Beyond Visual, Defining Stories.',
  officialEmail: 'nvisualproductionofficial@gmail.com',
  operationalCity: 'Jabodetabek & Seluruh Indonesia',
  operationalAddress: 'Jl. Sinema Kreatif No. 18, Jakarta Selatan (Berdasarkan Perjanjian & Kunjungan Tim)',
  adminPin: '1234',
  rentalTerms: [
    'Wajib menitipkan identitas asli penanggung jawab (e-KTP / SIM / KTM aktif) yang sesuai dengan data peminjam.',
    'Menyetujui deposit jaminan (cash / transfer) yang akan dikembalikan 100% saat alat kembali dalam kondisi utuh.',
    'Pengecekan fisik dan fungsi alat (check-in & check-out) dilakukan bersama saat serah terima alat.',
    'Penyewa bertanggung jawab penuh atas segala kerusakan, kehilangan, atau kendala kelalaian selama masa sewa.',
    'Keterlambatan pengembalian tanpa konfirmasi tertulis sebelumnya dikenakan denda over-time per jam sesuai ketentuan.',
    'Penggunaan alat hanya diperbolehkan untuk proyek legal dan sesuai deskripsi peruntukan pada formulir.',
    'Pengambilan dan pengembalian alat wajib tepat waktu sesuai jam yang disepakati.'
  ],
  handoverItems: [
    'Pemeriksaan bodi luar & kebersihan lensa (bebas jamur & goresan)',
    'Pemeriksaan fungsi tombol, layar sentuh, dan LCD monitor',
    'Pemeriksaan sensor kamera & autofokus / manual fokus',
    'Pengecekan kelengkapan baterai (minimal 2 unit & kondisi daya penuh)',
    'Pemeriksaan charger original & kabel power',
    'Pemeriksaan kartu memori (High Speed V60/V90) & card reader',
    'Pemeriksaan tas / hardcase tahan banting & strap pengaman',
    'Pemeriksaan mounting, baut 1/4 inch, dan kabel HDMI / audio'
  ]
};

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-fx3',
    name: 'Sony FX3 Full-Frame Cinema Line Camera',
    category: 'camera',
    brand: 'Sony',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    dailyRate: 450000,
    depositAmount: 500000,
    stockCount: 2,
    condition: 'Grade A (Prima)',
    specs: [
      '12.1 MP Exmor R BSI CMOS Sensor Full-Frame',
      'UHD 4K hingga 120p / FHD 240p',
      'S-Cinetone, S-Log3, Dual Base ISO (800 / 12800)',
      'Active Cooling Fan untuk continuous record 4K',
      'Top Handle dengan Dual XLR Audio Interface'
    ],
    inclusions: [
      'Body Sony FX3 + Top XLR Handle',
      '3x Baterai Sony NP-FZ100 Original',
      'Dual Charger Digital',
      '1x CFexpress Type A / SD V90 128GB',
      'Pelican Hardcase Custom Water-Resistant'
    ],
    usageNotes: 'Sangat direkomendasikan untuk produksi komersial, wedding aftermovie, company profile, dan film pendek high-end.',
    isFeatured: true
  },
  {
    id: 'eq-a7iv',
    name: 'Sony Alpha 7 IV (A7 IV) Hybrid Cinema',
    category: 'camera',
    brand: 'Sony',
    thumbnail: 'https://images.unsplash.com/photo-1502982720700-bfff97f2dafe?auto=format&fit=crop&w=800&q=80',
    dailyRate: 300000,
    depositAmount: 350000,
    stockCount: 3,
    condition: 'Grade A (Prima)',
    specs: [
      '33 MP Exmor R CMOS Sensor',
      '4K 60p 10-bit 4:2:2 All-Intra',
      'Real-time Eye AF Human/Animal/Bird',
      'S-Cinetone profile + 15+ stop dynamic range',
      'Stabilisasi gambar 5-axis SteadyShot Inside'
    ],
    inclusions: [
      'Body Sony A7 IV',
      '3x Baterai NP-FZ100',
      'Dual Charger',
      '1x SD Card 128GB V60 Extreme Pro',
      'Kamera Padded Bag & Strap'
    ],
    usageNotes: 'Kamera serbaguna terbaik untuk event documentation, seminar, wisuda sekolah, dan konten promosi.',
    isFeatured: true
  },
  {
    id: 'eq-bmpcc6k',
    name: 'Blackmagic Pocket Cinema Camera 6K Pro',
    category: 'camera',
    brand: 'Blackmagic Design',
    thumbnail: 'https://images.unsplash.com/photo-1589872307379-0ffdf9829123?auto=format&fit=crop&w=800&q=80',
    dailyRate: 400000,
    depositAmount: 450000,
    stockCount: 1,
    condition: 'Grade A (Prima)',
    specs: [
      'Super 35 HDR Sensor 6144 x 3456',
      'Built-in Motorized ND Filter (2, 4, 6 Stops)',
      '13 Stops Dynamic Range & Dual Native ISO 25600',
      'Blackmagic RAW (BRAW) 12-Bit Color',
      'Layar Touchscreen 1500 nits HDR Tilting'
    ],
    inclusions: [
      'Body BMPCC 6K Pro (EF Mount)',
      'Samsung T5/T7 SSD 1TB + Holder Clamp',
      '4x Baterai NP-F570 + Charger',
      'Kabel Power D-Tap & AC Adapter',
      'Rig Cage SmallRig + Top Handle'
    ],
    usageNotes: 'Pilihan utama sinematografer untuk film pendek naratif, musik video, dan dokumenter mendalam.',
    isFeatured: true
  },
  {
    id: 'eq-lens-2470',
    name: 'Sony FE 24-70mm f/2.8 GM II (G Master)',
    category: 'lens',
    brand: 'Sony',
    thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
    dailyRate: 200000,
    depositAmount: 250000,
    stockCount: 2,
    condition: 'Grade A (Prima)',
    specs: [
      'Focal range standar 24-70mm aperture konstan f/2.8',
      'XD Linear Motors untuk AF super cepat & senyap',
      'Desain optik teringan di kelasnya (695g)',
      'Aperture de-click ring untuk video',
      'Filter thread 82mm'
    ],
    inclusions: [
      'Lensa Sony 24-70 GM II',
      'Front & Rear Lens Cap',
      'Lens Hood Original',
      'UV Filter B+W 82mm terpasang',
      'Pouch Pelindung Beludru'
    ],
    usageNotes: 'Lensa kerja serba bisa untuk semua situasi liputan acara, panggung, dan wawancara.',
    isFeatured: true
  },
  {
    id: 'eq-lens-70200',
    name: 'Sony FE 70-200mm f/2.8 GM OSS II',
    category: 'lens',
    brand: 'Sony',
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
    dailyRate: 250000,
    depositAmount: 300000,
    stockCount: 1,
    condition: 'Grade A (Prima)',
    specs: [
      'Telephoto zoom 70-200mm f/2.8 konstan',
      'Optical SteadyShot (OSS) terintegrasi',
      'Bokeh bulat 11-blade circular aperture',
      'AF 4x lebih cepat dari generasi pertama',
      'Bobot sangat ringan untuk lensa tele (1.045g)'
    ],
    inclusions: [
      'Lensa Sony 70-200 GM II',
      'Tripod Collar Ring',
      'Hood Lensa dengan Filter Access Window',
      'Padded Carry Case Sony'
    ],
    usageNotes: 'Ideal untuk panggung wisuda, konser panggung dari kejauhan, dan close-up sinematik.',
    isFeatured: false
  },
  {
    id: 'eq-gimbal-rs3pro',
    name: 'DJI RS 3 Pro Gimbal Stabilizer Combo',
    category: 'stabilizer',
    brand: 'DJI',
    thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    dailyRate: 200000,
    depositAmount: 250000,
    stockCount: 2,
    condition: 'Grade A (Prima)',
    specs: [
      'Kapasitas beban muatan hingga 4.5 kg (Carbon Fiber Arms)',
      'Automated Axis Locks generasi ke-3',
      'Layar OLED sentuh 1.8 inci penuh warna',
      'Baterai tahan hingga 12 jam pemakaian aktif',
      'Kompatibel dengan LiDAR Focusing System'
    ],
    inclusions: [
      'Gimbal Unit DJI RS 3 Pro',
      'BG30 Battery Grip + Kabel USB-C',
      'Quick-Release Plate (Arca-Swiss/Manfrotto)',
      'Briefcase Handle untuk low-angle',
      'Focus Motor (2022) + Focus Gear Strip',
      'Hardcase Penyimpanan DJI Original'
    ],
    usageNotes: 'Memberikan gerakan kamera melayang halus untuk shot sinematik dinamis.',
    isFeatured: true
  },
  {
    id: 'eq-light-amaran200d',
    name: 'Aputure Amaran 200d S Daylight Studio Light',
    category: 'lighting',
    brand: 'Aputure',
    thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    dailyRate: 150000,
    depositAmount: 200000,
    stockCount: 3,
    condition: 'Grade A (Prima)',
    specs: [
      'Output 200W Daylight (5600K CCT)',
      'CRI 96+, TLCI 99+, SSI (D56) 87 untuk akurasi warna tinggi',
      'Bowens Mount standar untuk semua softbox/reflector',
      'Kontrol nirkabel Bluetooth Sidus Link App',
      'Sistem pendingin hening (Silent Cooling Mode)'
    ],
    inclusions: [
      'Lampu Amaran 200d S',
      '55° Hyper Reflector',
      'Power Supply Adapter & Kabel 3m',
      'Light Stand Heavy Duty Stainless Steel 2.8m',
      'Tas Padded Original'
    ],
    usageNotes: 'Kunci pencahayaan utama (Key Light) untuk wawancara company profile, live streaming, dan video promosi.',
    isFeatured: true
  },
  {
    id: 'eq-audio-wirelesspro',
    name: 'RØDE Wireless PRO 32-bit Float Microphone Set',
    category: 'audio',
    brand: 'RØDE',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    dailyRate: 150000,
    depositAmount: 180000,
    stockCount: 2,
    condition: 'Grade A (Prima)',
    specs: [
      'Dual-Channel Receiver + 2x Transmitter clip-on',
      '32-bit Float On-board Recording (anti-clipping suara distorsi)',
      'Jangkauan transmisi digital 260m Line-of-sight',
      'Timecode Generator terintegrasi untuk sync video mudah',
      'Baterai tahan 7 jam + Smart Charging Case'
    ],
    inclusions: [
      '2x Transmitter (TX) & 1x Receiver (RX)',
      'Smart Charging Case',
      '2x Lavalier II Pro Mic dengan deadcat / pop filter',
      'Kabel SC2 3.5mm TRS ke TRS (Kamera)',
      'Kabel USB-C ke Lightning & USB-C ke USB-C'
    ],
    usageNotes: 'Jaminan audio wawancara jernih tanpa khawatir audio pecah atau clipping berlebihan.',
    isFeatured: true
  },
  {
    id: 'eq-monitor-ninjav',
    name: 'Atomos Ninja V 5" 4K HDMI HDR Recording Monitor',
    category: 'monitor',
    brand: 'Atomos',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    dailyRate: 150000,
    depositAmount: 200000,
    stockCount: 1,
    condition: 'Grade A (Prima)',
    specs: [
      'Layar 5.2 inci 1920x1080 1000 nits Daylight Viewable',
      'Merekam ProRes & ProRes RAW hingga 4K 60p',
      'LUT Box real-time monitoring S-Log & Log3',
      'Fitur exposure Waveform, False Color, Focus Peaking',
      'Kompatibel dengan SSD Master Caddy II'
    ],
    inclusions: [
      'Monitor Atomos Ninja V',
      '2x Baterai Sony NP-F970 + Charger',
      'SanDisk 500GB SSD Master Caddy',
      'Kabel Micro HDMI ke Full HDMI High Speed 4K',
      'Sunhood Lipat & Ball Head Cold Shoe Mount'
    ],
    usageNotes: 'Memastikan exposure dan fokus akurat di bawah sinar matahari langsung outdoor.',
    isFeatured: false
  },
  {
    id: 'eq-pkg-solocreator',
    name: 'Paket Komplit Solo Creator Cinematik',
    category: 'package',
    brand: 'NVISUAL Bundle',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    dailyRate: 650000,
    depositAmount: 700000,
    stockCount: 2,
    condition: 'Grade A (Prima)',
    specs: [
      'Paket siap shooting untuk videografer profesional mandiri',
      'Hemat lebih dari 25% dibanding sewa satuan',
      'Kombinasi kamera 4K 10-bit + Lensa f/2.8 + Stabilizer gimbal + Audio wireless',
      'Peralatan telah dicek dan dikalibrasi siap pakai'
    ],
    inclusions: [
      '1x Body Sony A7 IV (3x Baterai & Charger)',
      '1x Lensa Sony 24-70mm f/2.8 GM II',
      '1x Gimbal DJI RS 3 Pro Combo',
      '1x Set Mic RØDE Wireless PRO (2 mic + case)',
      '1x Memory Card V60 128GB High Speed',
      'Tas Ransel Kamera Tahan Air'
    ],
    usageNotes: 'Paling diminati untuk liputan event satu hari, video profil instansi, reels komersial, dan wawancara.',
    isFeatured: true
  }
];

export const INITIAL_GRADUATION_PACKAGES: GraduationPackage[] = [
  {
    id: 'essential',
    name: 'Paket Essential',
    tagline: 'Fokus dokumentasi inti momen sakral kelulusan secara presisi dan rapi.',
    priceEstimate: 3500000, // Harga estimasi transparan (dapat dikonfirmasi/disesuaikan admin)
    isPriceFixed: false,
    minAudience: '100 - 250 Wisudawan',
    cameraCount: '2 Unit Kamera Cinema 4K',
    crewCount: '3 Orang Kru Profesional (2 Kamera + 1 Koordinator/Asisten)',
    durationCoverage: 'Hingga 5 Jam Acara (Prosesi Pelantikan)',
    deliverables: [
      'Master Foto Resolusi Tinggi (All Procession & Panggung)',
      '150+ Foto Editing Warna Terbaik (Pilihan Momen Kunci)',
      'Video Highlight / Teaser Sinematik 1-2 Menit (Format Reels & 16:9)',
      'Master Rekaman Acara Standar Full Cut',
      'Link Cloud Google Drive aktif selama 3 bulan'
    ],
    features: [
      'Liputan prosesi pengalungan medali & pemindahan kuncir',
      'Foto keluarga / perorangan di backdrop wisuda',
      'Audio recording direct feed dari master mixer sound system sekolah',
      'Revisi editing video teaser 1 kali'
    ]
  },
  {
    id: 'signature',
    name: 'Paket Signature',
    tagline: 'Liputan sinematik menyeluruh, cinematic aftermovie emosional, dan aerial drone 4K.',
    priceEstimate: 6500000,
    isPriceFixed: false,
    minAudience: '200 - 500 Wisudawan',
    cameraCount: '3-4 Unit Kamera Cinema 4K + 1 Unit Drone 4K',
    crewCount: '5-6 Orang Kru (3 Videografer, 1 Fotografer, 1 Pilot Drone, 1 Produser Lapangan)',
    durationCoverage: 'Full Day Coverage (Pra-Acara, Prosesi, Hiburan & Sesi Bebas)',
    deliverables: [
      'Semua Foto Master JPEG + RAW Pilihan (Uncompressed)',
      '300+ Foto Editorial Color-Graded siap tayang medsos',
      'Cinematic Aftermovie Emosional (3 - 5 Menit) dengan Narasi & Music Lisensi',
      'Video Teaser Vertikal 60 Detik (Instagram Reels / TikTok)',
      'Rekaman Video Full Multikamera Acara Lengkap',
      'Footage Aerial Drone 4K Gedung & Momen Konvoi/Pelepasan Balon',
      'Flashdisk Kayu Eksklusif Custom Grafir Logo Sekolah + Cloud Drive 1 Tahun'
    ],
    features: [
      'Dokumentasi gladi bersih / persiapan pagi di backstage',
      'Wawancara kesan-pesan Kepala Sekolah, guru teladan, dan wisudawan terbaik',
      'Audio mixing ganda (Mic panggung + Ambient microphone tepuk tangan)',
      'Pemberian preview foto kilat (Quick preview 10 foto) di hari H untuk publikasi instan medsos sekolah',
      'Revisi video aftermovie 2 kali'
    ],
    isPopular: true
  },
  {
    id: 'complete',
    name: 'Paket Complete',
    tagline: 'Solusi terintegrasi wisuda, buku tahunan cetak hardcover premium, dan after party night.',
    priceEstimate: 12500000,
    isPriceFixed: false,
    minAudience: 'Fleksibel (Sesuai Jumlah Angkatan)',
    cameraCount: '5+ Kamera Cinema Multicam + Drone + Photo Booth Studio',
    crewCount: '8-10 Orang Kru Lengkap (Foto, Video, Drone, Audio Engineer, Live Switcher)',
    durationCoverage: 'Multi-Hari / Wisuda + Gathering Night / Prom Night',
    deliverables: [
      'Semua Fasilitas Lengkap Paket Signature',
      'Opsi Cetak Buku Tahunan Siswa (Yearbook Hardcover Art Paper) dengan layout custom',
      'Dokumentasi Gathering Night / Prom Night / Malam Keakraban Angkatan',
      'Live Video Switcher ke Layar LED Panggung Utama (Live Feed Projection)',
      'Photobooth Corner Studio Lighting dengan instant preview',
      'Mini Dokumenter Perjalanan 3 Tahun Angkatan (Kompilasi Arsip Sekolah & Wawancara Khusus)',
      'Box Kayu Eksklusif + Cetakan Album Kanvas Besar untuk Sekolah'
    ],
    features: [
      'Pendampingan tim kreatif dari tahap perancangan tema kelulusan',
      'Sesi pemotretan foto grup kelas & seragam profesi sebelum hari H',
      'Multi-angle liputan tanpa blind spot di seluruh aula gedung',
      'Kamera crane / slider bermotor untuk shot sinematik panggung mewah',
      'Konsultasi intensif dan dedicated production manager'
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Adicitra Generasi Emas — Wisuda Angkatan XXVII',
    category: 'Sekolah',
    year: '2025',
    clientOrContext: 'SMA Negeri Mitra Prestasi',
    synopsis: 'Dokumentasi sinematik aftermovie dan pelepasan 320 siswa dengan pendekatan sinematografi emosional, menangkap pelukan haru orang tua dan senyum kemenangan para wisudawan.',
    posterImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    runtime: '4 Menit 18 Detik',
    gearUsed: ['Sony FX3', 'Sony A7 IV', 'DJI Mavic 3 Pro', 'Rode Wireless Pro', 'DaVinci Resolve Studio'],
    tags: ['Aftermovie', 'Wisuda SMA', 'Cinematic Drone', 'Color Graded'],
    isDemoPlaceholder: true
  },
  {
    id: 'port-2',
    title: 'Nusantara Creative Summit — International Conference',
    category: 'Event',
    year: '2025',
    clientOrContext: 'Creative Tech Forum Indonesia',
    synopsis: 'Liputan konferensi skala 1.500 delegasi selama 3 hari dengan sistem 4 kamera multicam, highlight cepat untuk media sosial di hari yang sama, serta aftermovie rekapan penutupan.',
    posterImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    runtime: '3 Menit 45 Detik',
    gearUsed: ['Sony FX3 Multicam', 'Sony 70-200 GM II', 'DJI RS 3 Pro', 'Zoom H6 Audio'],
    tags: ['Konferensi', 'Multicam', 'Highlight Medsos', 'Live Production'],
    isDemoPlaceholder: true
  },
  {
    id: 'port-3',
    title: 'Harmoni di Balik Mesin — PT Logam Presisi Industri',
    category: 'Company Profile',
    year: '2024',
    clientOrContext: 'Manufaktur Komponen Otomotif Nasional',
    synopsis: 'Video company profile yang memvisualisasikan ketelitian teknologi manufaktur berpadu dengan etos kerja insinyur Indonesia. Dirancang untuk materi investor dan presentasi ekspor global.',
    posterImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    runtime: '5 Menit 10 Detik',
    gearUsed: ['BMPCC 6K Pro', 'Sigma Cine Lenses', 'Aputure 300d II', 'Slider Motorized'],
    tags: ['Company Profile', 'Industri', 'Voice Over', 'Bilingual'],
    isDemoPlaceholder: true
  },
  {
    id: 'port-4',
    title: 'Langkah Awal: Sepatu Pengrajin Cibaduyut',
    category: 'Dokumenter',
    year: '2024',
    clientOrContext: 'Inisiatif Warisan Budaya Nusantara',
    synopsis: 'Dokumenter pendek observasional mengenai tiga generasi perajin kulit yang bertahan di era serbuan fast fashion. Menampilkan visual tekstur intim dan rekaman suara ambient autentik.',
    posterImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
    runtime: '14 Menit 20 Detik',
    gearUsed: ['Sony FX3', 'Sony 50mm f/1.2 GM', 'Sennheiser MKH 416', 'Rode NTG5'],
    tags: ['Dokumenter Pendek', 'Human Interest', 'Kultur', 'Original Score'],
    isDemoPlaceholder: true
  },
  {
    id: 'port-5',
    title: 'Sudut Sunyi — Film Pendek Naratif',
    category: 'Film Pendek',
    year: '2024',
    clientOrContext: 'Eksperimen Sinematik Mandiri NVISUAL',
    synopsis: 'Kisah drama bisu tentang seorang penjaga arsip perpustakaan kota tua yang menemukan surat cinta tak bertuan di balik buku geografi usang tahun 1982.',
    posterImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    runtime: '11 Menit 05 Detik',
    gearUsed: ['BMPCC 6K Pro', 'Anamorphic Lenses', 'Aputure Nova P300c', 'Ambient Foley'],
    tags: ['Film Pendek', 'Drama', 'Anamorphic', 'Festival Cut'],
    isDemoPlaceholder: true
  },
  {
    id: 'port-6',
    title: 'Aroma Pagi: Kampanye Kopi Gayo Single Origin',
    category: 'Komersial',
    year: '2025',
    clientOrContext: 'Kolektif Roastery Nusantara',
    synopsis: 'Iklan komersial 60 detik dengan visual makro ekstraksi espresso berkecepatan tinggi (slow motion 120fps) dan gradasi warna hangat menggugah selera.',
    posterImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    runtime: '1 Menit 00 Detik',
    gearUsed: ['Sony FX3', 'Laowa 24mm Probe Lens', 'Nanlite Pavotube', 'Macro Lighting'],
    tags: ['Komersial', 'Food & Beverage', 'Slow Motion 120fps', 'Macro Cinematography'],
    isDemoPlaceholder: true
  }
];
