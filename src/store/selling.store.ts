import { create } from 'zustand';

export interface SellingMachine {
    id: string;
    brand: string;
    model: string;
    askingPrice: string;
    expiry: string;
    status: string;
    visible: boolean;
    expired: boolean;
    media: { uri: string }[];
    category: string;
    subCategory: string;
    year: string;
    usageLevel: 'light' | 'medium' | 'heavy';
    availability: { key: string, date?: string };
}

interface SellingStore {
    machines: SellingMachine[];
    addMachine: (machine: SellingMachine) => void;
    updateMachine: (id: string, updates: Partial<SellingMachine>) => void;
    removeMachine: (id: string) => void;
    toggleVisibility: (id: string) => void;
}

export const useSellingStore = create<SellingStore>((set) => ({
    machines: [
        {
            id: '1',
            brand: 'Mahindra',
            model: '575 DI Sarpanch',
            askingPrice: '525000',
            expiry: '24 Feb 2026',
            status: 'LIVE',
            visible: true,
            expired: false,
            media: [{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH01YwW7yBw4Hj_H2u-8zP3V7R9Y9ERSEcwbcYL-clZYBVAOAD2fOSIIAeHbdDJ3f_13eQ_t3vhp20lk27OB3-CJ_XueC0W5Kv6FLpUWP_pbfRL6UzX4htFygc6hiG9nyVySPasYaofS7wcikpdkIBbgWjBfytu6MT96DND1onCXYVh9bJ0L_bD70WzcmtMUzE2KKABsmG19F93cZlDUWdY8OvPltgZIdU4j2KULg' }],
            category: 'Tractor',
            subCategory: 'Utility',
            year: '2021',
            usageLevel: 'medium',
            availability: { key: 'immediately' }
        },
        {
            id: '2',
            brand: 'John Deere',
            model: '5050D',
            askingPrice: '610000',
            expiry: '15 Mar 2026',
            status: 'LIVE',
            visible: true,
            expired: false,
            media: [{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOksPzLzg-ceRutUIWdIQYalaJAutem25bcQHUthK-1_M6NcwIz9L00xNxHaxrYyREK_TsS8MZvyoGxUfmN_aCLNEpGm0kDQkpR8PZoIDBLq9iXRJAnztHdSY1BjLEKFegyo2hN7HHXD5W7sN6EL9AVTNBxRPyj0N0ePBWgdncqo0YF2yF9E2-Vay_TyltuuiERKcapN6bHcRt2s-0GLWNP5r90p-GiTtEkZDp3BqUiT2v6FNcBM3QbA5wLhmdUE-LzX9tNq_KQ1PP' }],
            category: 'Tractor',
            subCategory: 'Utility',
            year: '2022',
            usageLevel: 'light',
            availability: { key: 'immediately' }
        },
        {
            id: '3',
            brand: 'Kubota',
            model: 'MU4501',
            askingPrice: '450000',
            expiry: '10 Jan 2025',
            status: 'EXPIRED',
            visible: false,
            expired: true,
            media: [{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh9v7vbRf5oVqKkIfxyd0JKxIdSQ32bK3jDO09EoLtDt4ETX6UNtjNDUguXPGQlPJ_DiYtnbUMPHrRrOf-PORCs7lKytwE5a203ub33b9_NNkvpO2nVRSoij_VvJ0vypsWoT_v1maB8_q5MdfDlw10ZiOufEzE9yLEq3I7ht7TYlWCU2bHC5BBOOhmXTmouH2lPL5AeXs-VpQ-y6HhxKcqNN-U7gaee4OYn7SyZpLHEmqZxY2adEcrMDwHtj0m85tFbJuCcve3Pc7J' }],
            category: 'Tractor',
            subCategory: 'Compact',
            year: '2019',
            usageLevel: 'heavy',
            availability: { key: 'immediately' }
        }
    ],
    addMachine: (machine) => set((state) => ({ machines: [...state.machines, machine] })),
    updateMachine: (id, updates) => set((state) => ({
        machines: state.machines.map(m => m.id === id ? { ...m, ...updates } : m)
    })),
    removeMachine: (id) => set((state) => ({
        machines: state.machines.filter(m => m.id !== id)
    })),
    toggleVisibility: (id) => set((state) => ({
        machines: state.machines.map(m => m.id === id ? { ...m, visible: !m.visible } : m)
    })),
}));
