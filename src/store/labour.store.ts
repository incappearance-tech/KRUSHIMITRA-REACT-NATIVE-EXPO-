import { create } from 'zustand';

export interface Lead {
    id: string;
    farmerName: string;
    farmerPhone: string;
    location: string;
    date: string;
    type: string;
}

export interface LabourProfile {
    id: string;
    name: string;
    phone: string;
    location: string; // Village / Taluka / District
    labourTypes: string[]; // Ploughing, Harvesting, Spraying, General
    workPreference: 'Daily Basis' | 'Seasonal';
    experience: string;
    pricePerDay: number;
    profilePhoto?: string;
    verified: boolean;
    rating: number;
    jobsCompleted: number;
    callsReceived: number;
}

interface LabourStore {
    profile: LabourProfile | null;
    leads: Lead[];
    setProfile: (profile: LabourProfile) => void;
    updateProfile: (updates: Partial<LabourProfile>) => void;
    addLead: (lead: Lead) => void;
}

export const useLabourStore = create<LabourStore>((set) => ({
    profile: null,
    leads: [
        {
            id: '1',
            farmerName: 'Suresh Patil',
            farmerPhone: '+91 98XXX XXX01',
            location: 'Rampur Village',
            date: '2026-01-24',
            type: 'Harvesting',
        }
    ],
    setProfile: (profile) => set({ profile }),
    updateProfile: (updates) =>
        set((state) => ({
            profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
    addLead: (lead) =>
        set((state) => ({
            leads: [lead, ...state.leads],
            profile: state.profile ? { ...state.profile, callsReceived: state.profile.callsReceived + 1 } : null
        })),
}));
