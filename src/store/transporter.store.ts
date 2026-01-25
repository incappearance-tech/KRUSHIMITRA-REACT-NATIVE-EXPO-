import { create } from 'zustand';

export interface TransporterLead {
  id: string;
  farmerName: string;
  farmerPhone: string;
  pickupLocation: string;
  dropLocation: string;
  loadType: string;
  date: string;
  vehicleType: string;
  vehicleDetails?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

export interface VehicleDriver {
  name: string;
  phone: string;
  licenseNo: string;
  photo?: string;
}

export interface Vehicle {
  id: string;
  type: string;
  model: string;
  number: string;
  capacity: string;
  driver: VehicleDriver;
  plan: 'monthly' | 'quarterly' | 'yearly';
  expiryDate: string;
  isActive: boolean;
}

export interface PaymentHistory {
  id: string;
  vehicleId: string;
  vehicleNumber: string;
  plan: string;
  amount: string;
  date: string;
  status: 'success' | 'failed';
}

export interface TransporterProfile {
  id: string;
  name: string;
  phone: string;
  location: string;
  operatingRadius: string;
  experience: string;
  profilePhoto?: string;
  verified: boolean;
  rating: number;
  tripsCompleted: number;
  leadsReceived: number;
  vehicles: Vehicle[];
  payments: PaymentHistory[];
}

interface TransporterStore {
  profile: TransporterProfile | null;
  leads: TransporterLead[];
  setProfile: (profile: TransporterProfile) => void;
  updateProfile: (updates: Partial<TransporterProfile>) => void;
  addLead: (lead: TransporterLead) => void;
  updateLeadStatus: (id: string, status: TransporterLead['status']) => void;
  addVehicle: (vehicle: Vehicle, payment: PaymentHistory) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
}

export const useTransporterStore = create<TransporterStore>((set) => ({
  profile: null,
  leads: [
    {
      id: '1',
      farmerName: 'Mahesh Deshmukh',
      farmerPhone: '+91 95XXX XXX74',
      pickupLocation: 'Rampur',
      dropLocation: 'APMC Mandi',
      loadType: 'Wheat (2 Tons)',
      date: '2026-01-25',
      vehicleType: 'Tractor Trolley',
      status: 'pending',
    },
  ],
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
  addLead: (lead) =>
    set((state) => ({
      leads: [lead, ...state.leads],
      profile: state.profile
        ? { ...state.profile, leadsReceived: state.profile.leadsReceived + 1 }
        : null,
    })),
  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
      profile:
        state.profile && status === 'completed'
          ? {
              ...state.profile,
              tripsCompleted: state.profile.tripsCompleted + 1,
            }
          : state.profile,
    })),
  addVehicle: (vehicle, payment) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            vehicles: [...(state.profile.vehicles || []), vehicle],
            payments: [payment, ...(state.profile.payments || [])],
          }
        : null,
    })),
  updateVehicle: (id, updates) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            vehicles: state.profile.vehicles.map((v) =>
              v.id === id ? { ...v, ...updates } : v,
            ),
          }
        : null,
    })),
  removeVehicle: (id) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            vehicles: state.profile.vehicles.filter((v) => v.id !== id),
          }
        : null,
    })),
}));
