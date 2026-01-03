import { create } from 'zustand';

interface FarmerData {
  phone: string;
  name: string;
  farmSize: number;
  location: string;
  crops: string[];
}

interface FarmerStore {
  farmer: FarmerData | null;
  setFarmer: (data: FarmerData) => void;
  updateFarmer: (updates: Partial<FarmerData>) => void;
  clearFarmer: () => void;
}

export const useFarmerStore = create<FarmerStore>((set) => ({
  farmer: null,
  setFarmer: (data) => set({ farmer: data }),
  updateFarmer: (updates) =>
    set((state) => ({
      farmer: state.farmer ? { ...state.farmer, ...updates } : null,
    })),
  clearFarmer: () => set({ farmer: null }),
}));
