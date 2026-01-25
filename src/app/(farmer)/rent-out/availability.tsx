import AppBar from '@/src/components/AppBar';
import { ProgressStep } from '@/src/components/ProgressStep';
import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useRentalStore } from '@/src/store/rental.store';

const { width } = Dimensions.get('window');

const AvailabilityScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const { rentals, draftRental, setDraftRental } = useRentalStore();

  // State for selections
  const [selectedStart, setSelectedStart] = useState<number | null>(5);
  const [selectedEnd, setSelectedEnd] = useState<number | null>(12);
  const [pickupTime, setPickupTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [returnTime, setReturnTime] = useState<'Same Day' | 'Next Day'>('Next Day');

  const bookedDays = [13, 14];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    if (isEditMode && id) {
      const machine = rentals.find(m => m.id === id);
      if (machine && machine.expiry) {
        // Simple parser for "Oct DD, 2023 - Oct DD, 2023"
        const parts = machine.expiry.split(' - ');
        if (parts[0].includes('Oct')) {
          const startDay = parseInt(parts[0].replace('Oct ', '').replace(', 2023', ''));
          setSelectedStart(startDay || 5);
          if (parts[1]) {
            const endDay = parseInt(parts[1].replace('Oct ', '').replace(', 2023', ''));
            setSelectedEnd(endDay || 12);
          }
        }
      }
    }
  }, [id, isEditMode, rentals]);

  const handleDateClick = (dayNum: number) => {
    if (bookedDays.includes(dayNum)) return;

    if (selectedStart === null || (selectedStart !== null && selectedEnd !== null)) {
      setSelectedStart(dayNum);
      setSelectedEnd(null);
    } else {
      if (dayNum < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(dayNum);
      } else if (dayNum === selectedStart) {
        setSelectedStart(null);
        setSelectedEnd(null);
      } else {
        setSelectedEnd(dayNum);
      }
    }
  };

  const getDayStatus = (dayNum: number) => {
    if (bookedDays.includes(dayNum)) return 'booked';
    if (!selectedStart) return 'none';
    if (dayNum === selectedStart) return selectedEnd ? 'selected-start' : 'selected-single';
    if (dayNum === selectedEnd) return 'selected-end';
    if (selectedEnd && dayNum > selectedStart && dayNum < selectedEnd) return 'selected-mid';
    return 'none';
  };

  const formatDate = (day: number | null) => {
    if (!day) return 'Select date';
    return `Oct ${day.toString().padStart(2, '0')}, 2023`;
  };

  const duration = selectedStart && selectedEnd
    ? (selectedEnd - selectedStart + 1)
    : (selectedStart ? 1 : 0);

  const onNext = () => {
    setDraftRental({
      expiry: duration > 1 ? `${formatDate(selectedStart)} - ${formatDate(selectedEnd)}` : formatDate(selectedStart),
    });
    router.push({ pathname: '/(farmer)/rent-out/publish', params: { id: id as string } });
  };

  return (
    <View style={styles.safeArea}>
      {/* Header */}

      <AppBar title="Availability" />
      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <ProgressStep currentStep={3} totalSteps={3} label="Availability" />

        {/* Machine Card */}
        <View style={styles.machineCard}>
          <View style={styles.machineInfo}>
            <View style={styles.imagePlaceholder}>
              {draftRental?.image && <Image source={{ uri: draftRental.image }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />}
            </View>
            <View>
              <Text style={styles.machineTitle}>{draftRental?.name || 'New Machine'}</Text>
              <Text style={styles.machineSub}>{draftRental?.type || 'Category'}</Text>
            </View>
          </View>
          <MaterialIcons name="expand-more" size={24} color="#94a3b8" />
        </View>

        <Text style={styles.sectionTitle}>Select Dates</Text>
        <Text style={styles.sectionSub}>Tap dates to mark when your machine is free.</Text>

        {/* Calendar Grid */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <MaterialIcons name="chevron-left" size={24} color="#64748b" />
            <Text style={styles.monthText}>October 2023</Text>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
          </View>

          <View style={styles.grid}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.dayOfWeek}>{day}</Text>
            ))}
            {daysInMonth.map((day, index) => {
              const status = getDayStatus(day);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDateClick(day)}
                  style={[
                    styles.dayCell,
                    (status === 'selected-mid' || status === 'selected-start' || status === 'selected-end') && styles.selectedRangeBg
                  ]}
                >
                  <View style={[
                    styles.dayInner,
                    (status === 'selected-start' || status === 'selected-end' || status === 'selected-single') && styles.selectedDayCircle
                  ]}>
                    <Text style={[
                      styles.dayText,
                      status === 'booked' && styles.bookedText,
                      (status.includes('selected') && status !== 'selected-mid') && styles.whiteText
                    ]}>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pickup Preferences */}
        <View style={styles.prefCard}>
          <Text style={styles.prefTitle}>PREFERRED PICKUP</Text>
          <View style={styles.buttonGroup}>
            {(['Morning', 'Afternoon', 'Evening'] as const).map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setPickupTime(time)}
                style={[styles.prefButton, pickupTime === time && styles.activePrefButton]}
              >
                <Text style={[styles.prefButtonText, pickupTime === time && styles.activePrefText]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>SELECTION</Text>
          <Text style={styles.footerValue}>{duration} Days</Text>
        </View>
        <TouchableOpacity
          onPress={onNext}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Review Listing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  helpText: { color: '#16a34a', fontWeight: 'bold' },
  scrollPadding: { paddingBottom: 120 },
  progressContainer: { marginBottom: 24 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontWeight: '600' },
  progressStep: { color: '#16a34a', fontSize: 12 },
  progressTrack: { height: 8, backgroundColor: '#f0fdf4', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 4 },
  machineCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#f8fafc', borderRadius: 12, marginBottom: 24 },
  machineInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  imagePlaceholder: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#cbd5e1' },
  machineTitle: { fontWeight: 'bold' },
  machineSub: { color: COLORS.brand.primary, fontSize: 12 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold' },
  sectionSub: { color: '#64748b', marginBottom: 20 },
  calendarCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 20 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthText: { fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayOfWeek: { width: `${100 / 7}%`, textAlign: 'center', color: '#94a3b8', fontSize: 12, marginBottom: 10 },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
  dayInner: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 18 },
  selectedDayCircle: { backgroundColor: COLORS.brand.primary },
  selectedRangeBg: { backgroundColor: COLORS.brand.muted },
  dayText: { fontSize: 14, color: '#334155' },
  whiteText: { color: '#fff', fontWeight: 'bold' },
  bookedText: { color: '#cbd5e1', textDecorationLine: 'line-through' },
  prefCard: { padding: 16, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9' },
  prefTitle: { fontSize: 12, fontWeight: 'bold', color: '#64748b', marginBottom: 12 },
  buttonGroup: { flexDirection: 'row', gap: 8 },
  prefButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  activePrefButton: { backgroundColor: COLORS.brand.primary, borderColor: COLORS.brand.primary },
  prefButtonText: { color: '#64748b', fontWeight: '500' },
  activePrefText: { color: '#fff' },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  footerLabel: { fontSize: 10, color: '#64748b', fontWeight: 'bold' },
  footerValue: { fontSize: 18, fontWeight: 'bold' },
  submitButton: { flex: 1, backgroundColor: COLORS.brand.primary, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  submitButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});

export default AvailabilityScreen;