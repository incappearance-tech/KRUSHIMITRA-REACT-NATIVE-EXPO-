import React from 'react';

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import Button from '../components/Button';
import { COLORS } from '../constants/colors';

export default function App() {
  const { t } = useTranslation();

  const BENEFITS = [
    {
      title: t('welcome.find_work'),
      description: t('welcome.find_work_desc'),
      image: 'https://picsum.photos/300/300?1',
    },
    {
      title: t('welcome.hire_help'),
      description: t('welcome.hire_help_desc'),
      image: 'https://picsum.photos/300/300?2',
    },
    {
      title: t('welcome.transport'),
      description: t('welcome.transport_desc'),
      image: 'https://picsum.photos/300/300?3',
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon} />
        <Text style={styles.headerTitle}>{t('common.app_name')}</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => router.push('/(auth)/language')}
        >
          <Ionicons name="language" size={24} color="#101b0d" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZtsddcU1SSAAdF5R6Ce9976Fh-SW6TlpuIPmvWFOlwGMoLA_-7oHCQ-uzbVZoO5xKnCL_KDonSNEeYI1ZY9cTCTC08tkUYW__9LQ3g9gRxxRCmf1Tj4EtMSetn3OhfojrtXwFhWZFjRc6dwXJspWRpguguSdE1FTMONVtgIgbZM0paY5xX9KMjNdXAKSlwPiV_ZnKYPcGtbDt7dWIW8dDm80GhgFpw8nj_IrKGl3Kv2w6rJdMl4n1lpSDF-SxN-xzocDi-z-4yda',
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.betaBadge}>
              <Text style={styles.betaText}>Beta v1.0</Text>
            </View>
          </ImageBackground>
        </View>

        {/* HEADLINE */}
        <View style={styles.headline}>
          <Text style={styles.headlineTitle}>{t('welcome.headline')}</Text>
          <Text style={styles.headlineSub}>{t('welcome.subheadline')}</Text>
        </View>

        {/* BENEFITS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.benefitsRow}
        >
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitCard}>
              <Image source={{ uri: b.image }} style={styles.benefitImage} />
              <Text style={styles.benefitTitle}>{b.title}</Text>
              <Text style={styles.benefitDesc}>{b.description}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* STICKY FOOTER BUTTON */}
      <Button
        label={t('welcome.get_started')}
        onPress={() => router.push('/(auth)/language')}
        sticky
        icon="arrow-forward"
        backgroundColor={COLORS.white}
        textColor={COLORS.text}
        style={styles.getStartedButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#f6f8f6',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  headerIcon: {
    width: 40,
    alignItems: 'center',
  },

  hero: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 16,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  betaBadge: {
    margin: 16,
    backgroundColor: COLORS.brand.muted,
    borderColor: COLORS.brand.primary,
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  betaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  headline: {
    padding: 24,
    alignItems: 'center',
  },
  headlineTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  headlineSub: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
  benefitsRow: {
    gap: 16,
  },
  benefitCard: {
    width: 160,
  },
  benefitImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  benefitDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  getStartedButton: {
    margin: 20,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
