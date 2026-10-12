import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EquipmentItem,
  GraduationPackage,
  RentalBooking,
  GraduationInquiry,
  ProductionInquiry,
  SiteSettings,
  OrderStatus
} from '../types';
import {
  INITIAL_EQUIPMENT,
  INITIAL_GRADUATION_PACKAGES,
  INITIAL_SETTINGS
} from '../data/initialData';

interface CartItem {
  equipmentId: string;
  quantity: number;
}

interface AppContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Equipment & Catalog
  equipment: EquipmentItem[];
  addEquipment: (item: Omit<EquipmentItem, 'id'>) => void;
  updateEquipment: (item: EquipmentItem) => void;
  deleteEquipment: (id: string) => void;
  selectedEquipmentForModal: EquipmentItem | null;
  setSelectedEquipmentForModal: (item: EquipmentItem | null) => void;

  // Rental Cart
  cart: CartItem[];
  addToCart: (equipmentId: string, quantity?: number) => void;
  removeFromCart: (equipmentId: string) => void;
  updateCartQty: (equipmentId: string, qty: number) => void;
  clearCart: () => void;

  // Inquiries & Bookings
  rentalBookings: RentalBooking[];
  addRentalBooking: (booking: Omit<RentalBooking, 'id' | 'createdAt' | 'status'>) => RentalBooking;
  updateBookingStatus: (id: string, status: OrderStatus, adminNotes?: string) => void;
  deleteRentalBooking: (id: string) => void;

  graduationInquiries: GraduationInquiry[];
  addGraduationInquiry: (inquiry: Omit<GraduationInquiry, 'id' | 'createdAt' | 'status'>) => GraduationInquiry;
  updateGraduationInquiryStatus: (id: string, status: OrderStatus, adminNotes?: string) => void;

  productionInquiries: ProductionInquiry[];
  addProductionInquiry: (inquiry: Omit<ProductionInquiry, 'id' | 'createdAt' | 'status'>) => ProductionInquiry;
  updateProductionInquiryStatus: (id: string, status: OrderStatus, adminNotes?: string) => void;

  // Graduation packages
  graduationPackages: GraduationPackage[];
  updateGraduationPackage: (pkg: GraduationPackage) => void;

  // Settings & Admin
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  resetToDemoData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  EQUIPMENT: 'nvisual_equipment_v1',
  PACKAGES: 'nvisual_packages_v1',
  SETTINGS: 'nvisual_settings_v1',
  RENTALS: 'nvisual_rentals_v1',
  GRAD_INQUIRIES: 'nvisual_grad_inquiries_v1',
  PROD_INQUIRIES: 'nvisual_prod_inquiries_v1',
  ADMIN_AUTH: 'nvisual_admin_auth_v1',
  CART: 'nvisual_cart_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedEquipmentForModal, setSelectedEquipmentForModal] = useState<EquipmentItem | null>(null);

  // Load state from LocalStorage with fallbacks to initial data
  const [equipment, setEquipment] = useState<EquipmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
      return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
    } catch {
      return INITIAL_EQUIPMENT;
    }
  });

  const [graduationPackages, setGraduationPackages] = useState<GraduationPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      return saved ? JSON.parse(saved) : INITIAL_GRADUATION_PACKAGES;
    } catch {
      return INITIAL_GRADUATION_PACKAGES;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [rentalBookings, setRentalBookings] = useState<RentalBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RENTALS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [graduationInquiries, setGraduationInquiries] = useState<GraduationInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GRAD_INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [productionInquiries, setProductionInquiries] = useState<ProductionInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROD_INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(graduationPackages));
  }, [graduationPackages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(rentalBookings));
  }, [rentalBookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GRAD_INQUIRIES, JSON.stringify(graduationInquiries));
  }, [graduationInquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROD_INQUIRIES, JSON.stringify(productionInquiries));
  }, [productionInquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (equipmentId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.equipmentId === equipmentId);
      if (existing) {
        return prev.map((item) =>
          item.equipmentId === equipmentId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { equipmentId, quantity }];
    });
  };

  const removeFromCart = (equipmentId: string) => {
    setCart((prev) => prev.filter((item) => item.equipmentId !== equipmentId));
  };

  const updateCartQty = (equipmentId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(equipmentId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.equipmentId === equipmentId ? { ...item, quantity: qty } : item))
      );
    }
  };

  const clearCart = () => setCart([]);

  // Rental Bookings operations
  const addRentalBooking = (bookingData: Omit<RentalBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: RentalBooking = {
      ...bookingData,
      id: 'rb_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending_review'
    };
    setRentalBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: OrderStatus, adminNotes?: string) => {
    setRentalBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, adminNotes: adminNotes ?? b.adminNotes } : b))
    );
  };

  const deleteRentalBooking = (id: string) => {
    setRentalBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Graduation Inquiries
  const addGraduationInquiry = (inquiryData: Omit<GraduationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: GraduationInquiry = {
      ...inquiryData,
      id: 'gi_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending_review'
    };
    setGraduationInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateGraduationInquiryStatus = (id: string, status: OrderStatus, adminNotes?: string) => {
    setGraduationInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status, adminNotes: adminNotes ?? i.adminNotes } : i))
    );
  };

  // Production Inquiries
  const addProductionInquiry = (inquiryData: Omit<ProductionInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ProductionInquiry = {
      ...inquiryData,
      id: 'pi_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending_review'
    };
    setProductionInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateProductionInquiryStatus = (id: string, status: OrderStatus, adminNotes?: string) => {
    setProductionInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status, adminNotes: adminNotes ?? i.adminNotes } : i))
    );
  };

  // Equipment CRUD
  const addEquipment = (itemData: Omit<EquipmentItem, 'id'>) => {
    const newItem: EquipmentItem = {
      ...itemData,
      id: 'eq_' + Date.now()
    };
    setEquipment((prev) => [newItem, ...prev]);
  };

  const updateEquipment = (item: EquipmentItem) => {
    setEquipment((prev) => prev.map((eq) => (eq.id === item.id ? item : eq)));
  };

  const deleteEquipment = (id: string) => {
    setEquipment((prev) => prev.filter((eq) => eq.id !== id));
    removeFromCart(id);
  };

  // Package update
  const updateGraduationPackage = (pkg: GraduationPackage) => {
    setGraduationPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
  };

  // Settings update
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Admin Auth
  const adminLogin = (pin: string): boolean => {
    if (pin.trim() === settings.adminPin.trim()) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // Reset to Demo Data
  const resetToDemoData = () => {
    setEquipment(INITIAL_EQUIPMENT);
    setGraduationPackages(INITIAL_GRADUATION_PACKAGES);
    setSettings(INITIAL_SETTINGS);
    setRentalBookings([]);
    setGraduationInquiries([]);
    setProductionInquiries([]);
    setCart([]);
  };

  // Export JSON backup for zero cloud cost backup
  const exportDataJSON = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      settings,
      equipment,
      graduationPackages,
      rentalBookings,
      graduationInquiries,
      productionInquiries
    };
    return JSON.stringify(backup, null, 2);
  };

  // Import JSON backup
  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.equipment && parsed.settings) {
        if (parsed.equipment) setEquipment(parsed.equipment);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.graduationPackages) setGraduationPackages(parsed.graduationPackages);
        if (parsed.rentalBookings) setRentalBookings(parsed.rentalBookings);
        if (parsed.graduationInquiries) setGraduationInquiries(parsed.graduationInquiries);
        if (parsed.productionInquiries) setProductionInquiries(parsed.productionInquiries);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        equipment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        selectedEquipmentForModal,
        setSelectedEquipmentForModal,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        rentalBookings,
        addRentalBooking,
        updateBookingStatus,
        deleteRentalBooking,
        graduationInquiries,
        addGraduationInquiry,
        updateGraduationInquiryStatus,
        productionInquiries,
        addProductionInquiry,
        updateProductionInquiryStatus,
        graduationPackages,
        updateGraduationPackage,
        settings,
        updateSettings,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetToDemoData,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
