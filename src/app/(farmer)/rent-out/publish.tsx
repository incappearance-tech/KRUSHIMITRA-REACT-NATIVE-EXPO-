import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { useRentalStore } from '@/src/store/rental.store';

export default function PublishRentalScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const { draftRental, addRental, updateRental, clearDraftRental } =
    useRentalStore();

  const [machineData, setMachineData] = useState<any>({
    name: 'Tractor 575 DI',
    details: '575 DI Model • Good Condition',
    location: 'Satara, Maharashtra',
    price: '800',
    priceUnit: '/ hr',
    type: 'With Operator',
    dates: ['June 15 - June 30', 'July 05 - July 10'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAc5bpin8zkfJcQzluNqZmWKPPhkmGpGw7fs3xJx1bwxY9KYqATVSHCOJu_nhaH0ogx53SaU_YcLhGQdRuQns6yOc1YUlbZccA-0VLqR5B963MoxVuQHW3c8_mig7YjOF_6uTsI7gLGI4s4_t8mM7CzeJJ3RAr4lxvBsEcV8BySU-tCV5y8p2TMQMAx1Zey3UfgrJojKj3hzgpZlYIL5SgNMQ-kBpAnXFirw3NpG_puMb_SDg9UFX-Mrw-KR4ICvEhOHEpPfj8yDJ6S',
  });

  useEffect(() => {
    if (draftRental) {
      setMachineData({
        ...draftRental,
        details: `${draftRental.model} • ${draftRental.brand}`,
        priceUnit: draftRental.period === 'day' ? '/ day' : '/ hr',
        dates: [draftRental.expiry || 'Open Dates'],
      });
    }
  }, [draftRental]);

  const handlePublish = () => {
    if (isEditMode) {
      updateRental(id as string, draftRental as any);
    } else {
      addRental({
        ...draftRental,
        id: Math.random().toString(36).substring(7),
        status: 'AVAILABLE',
        visible: true,
        expired: false,
      } as any);
    }

    Alert.alert(
      'Success',
      isEditMode ? 'Listing updated!' : 'Your machine has been published!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearDraftRental();
            router.push('/(farmer)/rent-out');
          },
        },
      ],
    );
  };

  const handleEditSection = (route: string) => {
    // Pass ID if editing, so the forms know to prefill
    router.push({ pathname: route as any, params: { id: id as string } });
  };

  return (
    <View style={styles.container}>
      <AppBar title="Review & Publish" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Header */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressLabel}>Final Step</Text>
            <Text style={styles.stepCount}>Step 3 of 3</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Machine Identity Section */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons
                name="agriculture"
                size={20}
                color={COLORS.brand.primary}
              />
              <Text style={styles.cardTitle}>Machine Identity</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleEditSection('/(farmer)/rent-out/add-machine')
              }
            >
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.machineRow}>
            <View style={styles.machineImageWrap}>
              {machineData.image ? (
                <Image
                  source={{ uri: machineData.image }}
                  style={styles.machineThumb}
                />
              ) : (
                <MaterialIcons name="image" size={24} color="#9ca3af" />
              )}
            </View>
            <View style={styles.machineInfo}>
              <Text style={styles.machineName}>{machineData.name}</Text>
              <Text style={styles.machineDetails}>{machineData.details}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color="#6b7280" />
                <Text style={styles.locationText}>{machineData.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rental Preferences Section */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons
                name="payments"
                size={20}
                color={COLORS.brand.primary}
              />
              <Text style={styles.cardTitle}>Rental Preferences</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleEditSection('/(farmer)/rent-out/preferences')
              }
            >
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Price</Text>
              <Text style={styles.gridValue}>
                ₹{machineData.price}{' '}
                <Text style={styles.unitText}>{machineData.priceUnit}</Text>
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Type</Text>
              <Text style={styles.gridValue}>{machineData.type}</Text>
            </View>
          </View>
        </View>

        {/* Available Dates Section */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color={COLORS.brand.primary}
              />
              <Text style={styles.cardTitle}>Available Dates</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleEditSection('/(farmer)/rent-out/availability')
              }
            >
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsRow}>
            {machineData.dates.map((date: string, index: number) => (
              <View key={index} style={styles.dateTag}>
                <Text style={styles.dateTagText}>{date}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addMoreTag}>
              <Text style={styles.addMoreText}>+ Add more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#2563eb" />
          <Text style={styles.infoText}>
            By publishing, your listing will be visible to farmers in your area.
            You can manage bookings and availability from your dashboard.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish for Rent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addAnotherButton}
          onPress={() => router.push('/(farmer)/rent-out/add-machine')}
        >
          <MaterialIcons
            name="add-circle"
            size={20}
            color={COLORS.textSecondary}
          />
          <Text style={styles.addAnotherText}>Add Another Machine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 150,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  stepCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803d', // green-700
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#dcfce7', // green-100
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.brand.primary,
    borderRadius: 100,
  },

  // Sections
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9', // gray-100
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  editLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803d',
  },

  // Machine Identity Specifics
  machineRow: {
    flexDirection: 'row',
    gap: 16,
  },
  machineImageWrap: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  machineThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  machineInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  machineName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  machineDetails: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#64748b',
  },

  // Grid Specifics (Preferences)
  gridRow: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9fafb', // gray-50
    borderRadius: 12,
  },
  gridLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
  },

  // Tags (Dates)
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(55, 236, 19, 0.1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(55, 236, 19, 0.2)',
  },
  dateTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  addMoreTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
  },
  addMoreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#eff6ff', // blue-50
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#1e40af', // blue-800
    lineHeight: 18,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 12,
  },
  publishButton: {
    backgroundColor: COLORS.brand.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#bbf7d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  addAnotherButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addAnotherText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
});
