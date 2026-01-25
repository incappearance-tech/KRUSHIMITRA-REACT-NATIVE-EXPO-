import { create } from 'zustand';

interface BuyMachineFiltersState {
  category: string;
  distance: number;
  minPrice: string;
  maxPrice: string;
  isNegotiable: boolean;
  condition: string;

  setCategory: (category: string) => void;
  setDistance: (distance: number) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setIsNegotiable: (negotiable: boolean) => void;
  setCondition: (condition: string) => void;
  reset: () => void;
}

export const useBuyMachineFiltersStore = create<BuyMachineFiltersState>(
  (set) => ({
    category: 'all',
    distance: 50,
    minPrice: '0',
    maxPrice: '1000000',
    isNegotiable: false,
    condition: 'all',

    setCategory: (category) => set({ category }),
    setDistance: (distance) => set({ distance }),
    setMinPrice: (minPrice) => set({ minPrice }),
    setMaxPrice: (maxPrice) => set({ maxPrice }),
    setIsNegotiable: (isNegotiable) => set({ isNegotiable }),
    setCondition: (condition) => set({ condition }),

    reset: () =>
      set({
        category: 'all',
        distance: 50,
        minPrice: '0',
        maxPrice: '1000000',
        isNegotiable: false,
        condition: 'all',
      }),
  }),
);
