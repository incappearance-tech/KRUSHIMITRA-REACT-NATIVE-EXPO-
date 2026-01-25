import React, { useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '@/src/constants/colors';

const MACHINE_TYPES = [
  { id: 'tractor', label: 'Tractor', icon: 'agriculture' },
  { id: 'harvester', label: 'Harvester', icon: undefined }, // No explicit icon in design besides generic text
  { id: 'plow', label: 'Plow', icon: undefined },
  { id: 'seeder', label: 'Seeder', icon: undefined },
  { id: 'trailer', label: 'Trailer', icon: undefined },
  { id: 'tiller', label: 'Tiller', icon: undefined },
];

export default function RentInFiltersScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('tractor');
  const [distance] = useState(50);
  const [availType, setAvailType] = useState('Machine Only');
  const [rentType, setRentType] = useState('Hourly');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(255,255,255,0.95)"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rental Filters</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Machine Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Machine Type</Text>
          <View style={styles.typeContainer}>
            {MACHINE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeChip,
                  selectedType === type.id
                    ? styles.typeChipActive
                    : styles.typeChipInactive,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                {type.icon && (
                  <MaterialIcons
                    name={type.icon as any}
                    size={20}
                    color={selectedType === type.id ? '#000' : '#374151'}
                  />
                )}
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type.id
                      ? styles.typeTextActive
                      : styles.typeTextInactive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Distance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text style={styles.valueText}>Within {distance} km</Text>
          </View>
          <View style={styles.sliderContainer}>
            {/* Visual Stick Slider Simulation */}
            <View style={styles.track}>
              <View style={[styles.trackFill, { width: '50%' }]} />
            </View>
            <View style={[styles.thumb, { left: '50%' }]}>
              <View style={styles.thumbDot} />
            </View>
            <View style={styles.rangeLabels}>
              <Text style={styles.rangeLabel}>10 km</Text>
              <Text style={styles.rangeLabel}>100 km</Text>
              <Text style={styles.rangeLabel}>500 km</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Required Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Date</Text>
          <View style={styles.dateInputContainer}>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color="#6b7280"
              style={styles.dateIcon}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Select Date" // Native date picker would be here
              placeholderTextColor="#111827"
              editable={false}
              value="" // Mock
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Availability Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability Type</Text>
          <View style={styles.grid2}>
            <TouchableOpacity
              style={[
                styles.radioCard,
                availType === 'Machine Only' && styles.radioCardActive,
              ]}
              onPress={() => setAvailType('Machine Only')}
            >
              <MaterialIcons
                name="agriculture"
                size={32}
                color={
                  availType === 'Machine Only'
                    ? COLORS.brand.primary
                    : '#4b5563'
                }
                style={{ marginBottom: 8 }}
              />
              <Text
                style={[
                  styles.radioText,
                  availType === 'Machine Only' && styles.radioTextActive,
                ]}
              >
                Machine Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.radioCard,
                availType === 'With Operator' && styles.radioCardActive,
              ]}
              onPress={() => setAvailType('With Operator')}
            >
              <MaterialIcons
                name="engineering"
                size={32}
                color={
                  availType === 'With Operator'
                    ? COLORS.brand.primary
                    : '#4b5563'
                }
                style={{ marginBottom: 8 }}
              />
              <Text
                style={[
                  styles.radioText,
                  availType === 'With Operator' && styles.radioTextActive,
                ]}
              >
                With Operator
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Rent Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rent Type</Text>
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[
                styles.segmentBtn,
                rentType === 'Hourly' && styles.segmentBtnActive,
              ]}
              onPress={() => setRentType('Hourly')}
            >
              <Text
                style={[
                  styles.segmentText,
                  rentType === 'Hourly' && styles.segmentTextActive,
                ]}
              >
                Hourly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentBtn,
                rentType === 'Daily' && styles.segmentBtnActive,
              ]}
              onPress={() => setRentType('Daily')}
            >
              <Text
                style={[
                  styles.segmentText,
                  rentType === 'Daily' && styles.segmentTextActive,
                ]}
              >
                Daily
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.showBtn} onPress={() => router.back()}>
          <Text style={styles.showBtnText}>Show 24 Rentals</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#000" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#15803d',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#15803d',
  },

  // Chips
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
  },
  typeChipActive: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },
  typeChipInactive: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeTextActive: {
    color: '#000',
  },
  typeTextInactive: {
    color: '#374151',
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
    marginTop: 24,
  },

  // Distance Slider (Visual)
  sliderContainer: {
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    position: 'relative',
  },
  trackFill: {
    height: '100%',
    backgroundColor: COLORS.brand.primary,
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    marginLeft: 16, // offset for container padding
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.brand.primary,
    borderWidth: 2,
    borderColor: '#fff',
    top: 8, // (40 - 24) / 2
    marginStart: -12, // center thumb
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  thumbDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },

  // Date Input
  dateInputContainer: {
    marginHorizontal: 16,
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  dateInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  // Radio Cards
  grid2: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  radioCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    height: 110,
  },
  radioCardActive: {
    backgroundColor: 'rgba(55, 236, 19, 0.05)',
    borderColor: COLORS.brand.primary,
    borderWidth: 2,
  },
  radioText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  radioTextActive: {
    color: '#16a34a',
  },

  // Segment
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
  },
  segmentTextActive: {
    color: '#000',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#f6f8f6',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  showBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.brand.primary,
    height: 56,
    borderRadius: 12,
    shadowColor: '#bbf7d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  showBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginRight: 8,
  },
});
