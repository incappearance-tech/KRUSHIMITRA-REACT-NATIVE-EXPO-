import React from 'react';

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import { ILanguageOption, LanguageCode } from '@/src/types/models/language';

import AppBar from '../../components/AppBar';
import { COLORS } from '../../constants/colors';
import { useLanguageStore } from '../../store/language.store';

type Language = LanguageCode;

type LanguageOption = ILanguageOption;

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', icon: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', icon: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', icon: '🇮🇳' },
];

export default function LanguageSettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleLanguageChange = async (lang: Language) => {
    await setLanguage(lang);
    // Navigate back after a short delay to show the selection
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <View style={styles.container}>
      <AppBar title={t('dashboard.change_language')} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialIcons
            name="language"
            size={48}
            color={COLORS.brand.primary}
          />
          <Text style={styles.title}>{t('language.select')}</Text>
          <Text style={styles.subtitle}>
            Choose your preferred language for the app
          </Text>
        </View>

        <View style={styles.languageList}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              style={({ pressed }) => [
                styles.languageCard,
                currentLanguage === lang.code && styles.languageCardActive,
                pressed && styles.languageCardPressed,
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <View style={styles.languageLeft}>
                <Text style={styles.languageIcon}>{lang.icon}</Text>
                <View>
                  <Text
                    style={[
                      styles.languageName,
                      currentLanguage === lang.code &&
                        styles.languageNameActive,
                    ]}
                  >
                    {lang.name}
                  </Text>
                  <Text style={styles.languageNative}>{lang.nativeName}</Text>
                </View>
              </View>

              {currentLanguage === lang.code ? (
                <View style={styles.radioActive}>
                  <View style={styles.radioInner} />
                </View>
              ) : (
                <View style={styles.radioInactive} />
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="info" size={20} color={COLORS.info} />
          <Text style={styles.infoText}>
            The app will restart to apply the new language settings.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Language List
  languageList: {
    gap: 12,
    marginBottom: 24,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.gray[100],
  },
  languageCardActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },
  languageCardPressed: {
    opacity: 0.7,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  languageIcon: {
    fontSize: 32,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  languageNameActive: {
    color: COLORS.brand.primary,
  },
  languageNative: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Radio
  radioInactive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
  },
  radioActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.brand.primary,
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.info,
    lineHeight: 18,
  },
});
