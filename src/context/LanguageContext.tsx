import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../services/i18n';

interface LanguageContextType {
  currentLanguage: 'en' | 'hi' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'mr') => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'mr'>((i18n.language as 'en' | 'hi' | 'mr') || 'en');

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage((i18n.language as 'en' | 'hi' | 'mr') || 'en');
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const setLanguage = async (lang: 'en' | 'hi' | 'mr') => {
    await changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
