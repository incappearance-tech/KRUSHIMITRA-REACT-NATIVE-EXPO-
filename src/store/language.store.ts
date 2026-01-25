import { create } from 'zustand';

import i18n, { changeLanguage } from '../services/i18n';
import { LanguageCode } from '../types/models/language';

interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  initialize: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: (i18n.language as LanguageCode) || 'en',

  setLanguage: async (lang: LanguageCode) => {
    await changeLanguage(lang);
    set({ currentLanguage: lang });
  },

  initialize: () => {
    // Sync store with i18n events
    i18n.on('languageChanged', (lang) => {
      set({ currentLanguage: lang as LanguageCode });
    });
  },
}));

// Initialize the store listener
useLanguageStore.getState().initialize();
