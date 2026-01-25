import { useState } from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import Button from '@/src/components/Button';
import { LanguageCode } from '@/src/types/models/language';

import { COLORS } from '../../constants/colors';
import { useLanguageStore } from '../../store/language.store';

type LangCode = LanguageCode;

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();

  const [selected, setSelected] = useState<LangCode>('en');

  const languages = [
    {
      code: 'en',
      title: 'English',
      sub: 'English',
      badge: 'Aa',
      bg: '#DBEAFE',
      text: '#1D4ED8',
    },
    {
      code: 'hi',
      title: 'हिंदी',
      sub: 'Hindi',
      badge: 'अ',
      bg: '#FFEDD5',
      text: '#C2410C',
    },
    {
      code: 'mr',
      title: 'मराठी',
      sub: 'Marathi',
      badge: 'म',
      bg: '#FEE2E2',
      text: '#B91C1C',
    },
  ];

  const handleContinue = async () => {
    await setLanguage(selected);
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Header Image (from Stitch) */}
      <ImageBackground
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBivSBlUqjil9jljKzgch05Km-3rI6bYqqkAYzrd1-nkJhSPVhCYHWj-wthjY2Y29Sjpw5CaIukSzYpa319rHbOjXQneubP1Bv8nY1celjGnhsIyVBTMpgC4Rin0S59Z2an8C7hxQck4dE8oxNL_6dKcBQ_TLahatDHJNjfii0n6d4SUhzAB6AMHDrQ_CqKVt1bcZp44VHzWgNLb2creS7xR4HnVYNcC_DGwJKLjeI4gV3K82arY0lkmD1oGvdVKb_k-OYigYKHvGg',
        }}
        style={styles.headerImage}
      >
        <View style={styles.overlay} />
        <View style={styles.headerText}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.subWelcome}>Farmer Assist App</Text>
        </View>
      </ImageBackground>

      {/* Title */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{t('language.title')}</Text>
        <Text style={styles.subtitle}>{t('language.select')}</Text>
      </View>

      {/* Language Cards */}
      <View style={styles.list}>
        {languages.map((lang) => {
          const active = selected === lang.code;

          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => setSelected(lang.code as LangCode)}
              activeOpacity={0.85}
            >
              <View style={styles.left}>
                <View style={[styles.badge, { backgroundColor: lang.bg }]}>
                  <Text style={[styles.badgeText, { color: lang.text }]}>
                    {lang.badge}
                  </Text>
                </View>

                <View>
                  <Text style={styles.cardTitle}>{lang.title}</Text>
                  <Text style={styles.cardSub}>{lang.sub}</Text>
                </View>
              </View>

              {active && (
                <Ionicons
                  name="checkmark"
                  size={18}
                  color="#fff"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sticky Footer Button */}
      <Button
        label={t('common.continue')}
        onPress={handleContinue}
        icon="arrow-forward"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  headerImage: {
    height: 240,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  headerText: {
    padding: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  subWelcome: {
    fontSize: 14,
    color: COLORS.border,
    marginTop: 4,
  },

  titleWrap: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },

  list: {
    gap: 14,
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  cardActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  badge: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: '700',
    fontSize: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  checkIcon: {
    backgroundColor: COLORS.brand.primary,
    borderRadius: 12,
    padding: 4,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  continueBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.brand.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
