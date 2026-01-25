import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Localization from 'expo-localization';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
};

const LANGUAGE_KEY = 'app_language';

// Get system language or default to English
const getSystemLanguage = () => {
  const locale = Localization.getLocales()[0]?.languageCode;
  if (locale === 'hi') return 'hi';
  if (locale === 'mr') return 'mr';
  return 'en';
};

// Initialize i18n synchronously with default language
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getSystemLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

// Load saved language after app starts
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (
      savedLanguage &&
      (savedLanguage === 'en' ||
        savedLanguage === 'hi' ||
        savedLanguage === 'mr')
    ) {
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.warn('Failed to load saved language:', error);
  }
};

// Change language and persist
export const changeLanguage = async (lang: 'en' | 'hi' | 'mr') => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

// Get saved language
export const getSavedLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE_KEY);
};

export default i18n;
