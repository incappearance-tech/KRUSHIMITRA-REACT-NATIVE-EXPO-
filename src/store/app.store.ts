import { create } from 'zustand';

interface AppState {
  language: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
  isDarkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  isDarkMode: false,
  setDarkMode: (dark) => set({ isDarkMode: dark }),
}));
