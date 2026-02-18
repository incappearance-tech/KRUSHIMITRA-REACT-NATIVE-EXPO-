import React, { useState } from 'react';

import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import { useAuthStore } from '@/src/store/auth.store';
import { useTransporterStore } from '@/src/store/transporter.store';

export default function TransporterRegistration() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setProfile } = useTransporterStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: '',
    radius: '',
    experience: '',
  });

  const handleSubmit = () => {
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.radius
    ) {
      Alert.alert(t('common.error'), t('transporter.fill_error'));
      return;
    }

    const profile = {
      id: user?.id || Math.random().toString(36).substring(7),
      name: formData.name,
      phone: user?.phone || '9527189774',
      location: formData.location,
      operatingRadius: formData.radius,
      experience: formData.experience,
      verified: true,
      rating: 4.8,
      tripsCompleted: 0,
      leadsReceived: 0,
      vehicles: [],
      payments: [],
      walletBalance: 0,
    };

    setProfile(profile);
    router.replace('/(transporter)/');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>
            {t('transporter.registration_title')}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={[styles.heroSection]}>
          <View style={styles.heroIconBox}>
            <MaterialIcons
              name="local-shipping"
              size={40}
              color={COLORS.brand.primary}
            />
          </View>
          <Text style={styles.heroTitle}>{t('transporter.grow_business')}</Text>
          <Text style={styles.heroDesc}>{t('transporter.grow_desc')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('transporter.business_details')}
          </Text>
          <LabeledInput
            label={t('transporter.business_name') + ' *'}
            placeholder="Enter name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            icon="person"
          />
          <LabeledInput
            label={t('transporter.base_location') + ' *'}
            placeholder="e.g. Rampur, Pune"
            value={formData.location}
            onChangeText={(text) =>
              setFormData({ ...formData, location: text })
            }
            icon="location-on"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('transporter.service_coverage')}
          </Text>
          <LabeledInput
            label={t('transporter.operating_radius') + ' *'}
            placeholder="e.g. 50"
            value={formData.radius}
            onChangeText={(text) => setFormData({ ...formData, radius: text })}
            icon="explore"
            keyboardType="numeric"
          />
          <LabeledInput
            label={t('transporter.experience')}
            placeholder="e.g. 8 years"
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
            icon="workspace-premium"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Button
        label={t('transporter.complete_onboarding')}
        onPress={handleSubmit}
        icon="arrow-forward"
        sticky
        backgroundColor={COLORS.white}
        textColor={COLORS.text}
        style={styles.onboardingButtonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  heroSection: { alignItems: 'center', padding: 24, paddingBottom: 32 },
  heroIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.textSecondary,
  },
  onboardingButtonStyle: {
    margin: 20,
    marginBottom: 20,
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
