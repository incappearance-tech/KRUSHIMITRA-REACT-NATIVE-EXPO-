import React, { useEffect, useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import { useLabourStore } from '@/src/store/labour.store';

const LABOUR_TYPES = ['Ploughing', 'Harvesting', 'Spraying', 'General Labour'];

const WORK_PREFERENCES = ['Daily Basis', 'Seasonal'] as const;

export default function LabourEdit() {
  const router = useRouter();
  const { profile, updateProfile } = useLabourStore();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    experience: '',
    pricePerDay: '',
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPreference, setSelectedPreference] =
    useState<(typeof WORK_PREFERENCES)[number]>('Daily Basis');

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        location: profile.location,
        experience: profile.experience,
        pricePerDay: profile.pricePerDay.toString(),
      });
      setSelectedTypes(profile.labourTypes);
      setSelectedPreference(profile.workPreference);
    } else {
      router.replace('/(labour)/register');
    }
  }, [profile, router]);

  if (!profile) return null;

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleUpdate = () => {
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      selectedTypes.length === 0 ||
      !formData.pricePerDay
    ) {
      Alert.alert('Error', 'Please fill all mandatory fields');
      return;
    }

    updateProfile({
      name: formData.name,
      location: formData.location,
      labourTypes: selectedTypes,
      workPreference: selectedPreference,
      experience: formData.experience,
      pricePerDay: parseInt(formData.pricePerDay),
    });

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Edit Labour Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <LabeledInput
            label="Full Name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            icon="person"
          />
          <LabeledInput
            label="Village / Taluka / District"
            placeholder="e.g. Rampur, Haveli, Pune"
            value={formData.location}
            onChangeText={(text) =>
              setFormData({ ...formData, location: text })
            }
            icon="location-on"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Labour Type</Text>
          <View style={styles.grid}>
            {LABOUR_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  selectedTypes.includes(type) && styles.chipSelected,
                ]}
                onPress={() => toggleType(type)}
              >
                <MaterialIcons
                  name={
                    selectedTypes.includes(type)
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  size={20}
                  color={
                    selectedTypes.includes(type)
                      ? COLORS.brand.primary
                      : '#9ca3af'
                  }
                />
                <Text
                  style={[
                    styles.chipText,
                    selectedTypes.includes(type) && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Preference</Text>
          <View style={styles.prefRow}>
            {WORK_PREFERENCES.map((pref) => (
              <TouchableOpacity
                key={pref}
                style={[
                  styles.prefCard,
                  selectedPreference === pref && styles.prefCardSelected,
                ]}
                onPress={() => setSelectedPreference(pref)}
              >
                <MaterialIcons
                  name={
                    selectedPreference === pref
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={24}
                  color={
                    selectedPreference === pref
                      ? COLORS.brand.primary
                      : '#9ca3af'
                  }
                />
                <Text
                  style={[
                    styles.prefText,
                    selectedPreference === pref && styles.prefTextSelected,
                  ]}
                >
                  {pref}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <LabeledInput
            label="Experience"
            placeholder="e.g. 5 years"
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
            icon="workspace-premium"
          />
          <LabeledInput
            label="Expected Daily Rate (₹)"
            placeholder="e.g. 500"
            value={formData.pricePerDay}
            onChangeText={(text) =>
              setFormData({ ...formData, pricePerDay: text })
            }
            icon="payments"
            keyboardType="numeric"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Save Changes" onPress={handleUpdate} icon="check" />
      </View>
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
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.textSecondary,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  chipSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },
  chipText: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  chipTextSelected: { color: COLORS.brand.primary, fontWeight: '700' },
  prefRow: { flexDirection: 'row', gap: 12 },
  prefCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  prefCardSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },
  prefText: { fontSize: 15, fontWeight: '500', color: '#6b7280' },
  prefTextSelected: { color: COLORS.text, fontWeight: '700' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});
