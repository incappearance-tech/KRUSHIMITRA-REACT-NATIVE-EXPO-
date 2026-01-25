import React, { useState } from 'react';

import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import { COLORS } from '@/src/constants/colors';
import { TRANSPORTERS } from '@/src/data/transport.data';
import { useAuthStore } from '@/src/store/auth.store';
import {
  TransporterLead,
  useTransporterStore,
} from '@/src/store/transporter.store';

export default function TransportDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { addLead } = useTransporterStore();
  const transporter = TRANSPORTERS.find((t) => t.id === id);

  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<
    number | null
  >(null);

  if (!transporter) {
    return (
      <View style={styles.container}>
        <Text>Transporter not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${transporter.phone}`);
  };

  const handleBooking = () => {
    if (selectedVehicleIndex === null) {
      Alert.alert(
        'Selection Required',
        'Please select a vehicle from the fleet to proceed.',
      );
      return;
    }

    const selectedVehicle = transporter.vehicles[selectedVehicleIndex];

    Alert.alert(
      'Confirm Booking',
      `Send request for ${selectedVehicle.type} to ${transporter.name}?`,
      [
        { text: 'Wait, Cancel', style: 'cancel' },
        {
          text: 'Yes, Send Request',
          onPress: () => {
            const newLead: TransporterLead = {
              id: Math.random().toString(36).substring(7),
              farmerName: user?.name || 'Rahul Kumar',
              farmerPhone: user?.phone || '+91 98XXX XXX00',
              pickupLocation: 'Rampur Farm',
              dropLocation: transporter.location + ' Mandi',
              loadType: 'Crops (2.5 Tons)',
              date: new Date().toISOString().split('T')[0],
              vehicleType: selectedVehicle.type,
              vehicleDetails: `Cap: ${selectedVehicle.capacity}`,
              status: 'pending',
            };

            addLead(newLead);
            Alert.alert(
              'Request Sent! 🚛',
              `Your request for ${selectedVehicle.type} has been sent successfully.`,
              [{ text: 'OK', onPress: () => router.back() }],
            );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Header Image Area */}
        <View style={styles.topArea}>
          <Image source={{ uri: transporter.image }} style={styles.coverImg} />
          <View style={styles.overlay} />
          <View style={styles.headerRow}>
            <BackButton color="#fff" />
            <TouchableOpacity style={styles.shareBtn}>
              <MaterialIcons name="share" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentWrap}>
          {/* Essential Info Card */}
          <View style={styles.mainCard}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    transporter.availability === 'Available'
                      ? '#dcfce7'
                      : '#fee2e2',
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      transporter.availability === 'Available'
                        ? '#16a34a'
                        : '#ef4444',
                  },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      transporter.availability === 'Available'
                        ? '#15803d'
                        : '#991b1b',
                  },
                ]}
              >
                {transporter.availability}
              </Text>
            </View>

            <Text style={styles.bizName}>{transporter.name}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={20} color="#eab308" />
              <Text style={styles.ratingVal}>{transporter.rating}</Text>
              <Text style={styles.revText}>
                ({transporter.reviews} local reviews)
              </Text>
              <View style={styles.vDivider} />
              <MaterialIcons name="verified" size={18} color="#3b82f6" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{transporter.completedTrips}</Text>
                <Text style={styles.statLab}>Completed Trips</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{transporter.experience}</Text>
                <Text style={styles.statLab}>Exp. in District</Text>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>₹{transporter.pricePerKm}</Text>
                <Text style={styles.statLab}>Price per Km</Text>
              </View>
            </View>
          </View>

          {/* Vehicles Fleet - SELECTABLE */}
          <View style={styles.section}>
            <Text style={styles.secTitle}>Select from Fleet *</Text>
            <Text style={styles.secSub}>
              Choose the vehicle you need for your transport
            </Text>
            <View style={styles.fleetList}>
              {transporter.vehicles.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.vCard,
                    selectedVehicleIndex === i && styles.vCardSelected,
                  ]}
                  onPress={() => setSelectedVehicleIndex(i)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.vIcon,
                      selectedVehicleIndex === i && {
                        backgroundColor: COLORS.white,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="local-shipping"
                      size={24}
                      color={
                        selectedVehicleIndex === i
                          ? COLORS.brand.primary
                          : COLORS.brand.primary
                      }
                    />
                  </View>
                  <View style={styles.vInfo}>
                    <Text
                      style={[
                        styles.vType,
                        selectedVehicleIndex === i && styles.vTextSelected,
                      ]}
                    >
                      {v.type}
                    </Text>
                    <Text
                      style={[
                        styles.vCap,
                        selectedVehicleIndex === i && styles.vTextSelectedMuted,
                      ]}
                    >
                      Capacity: {v.capacity}
                    </Text>
                  </View>
                  {selectedVehicleIndex === i ? (
                    <MaterialIcons name="check-circle" size={24} color="#fff" />
                  ) : (
                    <View style={styles.vCount}>
                      <Text style={styles.vCountText}>{v.count} Units</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Business Location */}
          <View style={styles.section}>
            <Text style={styles.secTitle}>Service Area</Text>
            <View style={styles.locCard}>
              <MaterialIcons name="location-pin" size={24} color="#64748b" />
              <Text style={styles.locText}>
                {transporter.location}, Maharashtra
              </Text>
            </View>
          </View>

          {/* Note Area */}
          <View style={styles.noteBox}>
            <MaterialIcons name="security" size={20} color="#15803d" />
            <Text style={styles.noteText}>
              Farmer Safety First: Pay only after transport is completed and
              verified.
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.callFab} onPress={handleCall}>
          <MaterialIcons name="call" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Button
            label={
              transporter.availability === 'Available'
                ? 'Reserve Transport'
                : 'Transporter Busy'
            }
            onPress={handleBooking}
            icon="arrow-forward"
            disabled={transporter.availability !== 'Available'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  topArea: { width: '100%', height: 280, position: 'relative' },
  coverImg: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrap: {
    marginTop: -40,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '800' },
  bizName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  ratingVal: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  revText: { fontSize: 14, color: COLORS.textSecondary },
  vDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  verifiedText: { fontSize: 14, fontWeight: '700', color: '#3b82f6' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  statLab: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  verticalLine: { width: 1, backgroundColor: '#f1f5f9' },
  section: { marginTop: 32 },
  secTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  secSub: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 16 },
  fleetList: { gap: 12 },
  vCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  vCardSelected: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },
  vIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  vInfo: { flex: 1 },
  vType: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  vCap: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  vTextSelected: { color: '#fff' },
  vTextSelectedMuted: { color: 'rgba(255,255,255,0.7)' },
  vCount: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  vCountText: { fontSize: 12, fontWeight: '800', color: COLORS.brand.primary },
  locCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  locText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  noteBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#166534',
    fontWeight: '600',
    lineHeight: 20,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  callFab: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
