import React, { useEffect, useState } from 'react';

import {
  Alert,
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
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import {
  VehicleDriver,
  useTransporterStore,
} from '@/src/store/transporter.store';

const VEHICLE_TYPES = [
  'Tractor Trolley',
  'Mini Truck',
  'Large Truck',
  'Tempo',
  'Thresher',
];

export default function EditVehicleScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { profile, updateVehicle, removeVehicle } = useTransporterStore();

  const [vehicleData, setVehicleData] = useState({
    type: '',
    model: '',
    number: '',
    capacity: '',
  });

  const [driverData, setDriverData] = useState<VehicleDriver>({
    name: '',
    phone: '',
    licenseNo: '',
  });

  useEffect(() => {
    const vehicle = profile?.vehicles.find((v) => v.id === id);
    if (vehicle) {
      setVehicleData({
        type: vehicle.type,
        model: vehicle.model,
        number: vehicle.number,
        capacity: vehicle.capacity,
      });
      setDriverData(vehicle.driver);
    }
  }, [id, profile]);

  const handleUpdateVehicle = () => {
    if (
      !vehicleData.model ||
      !vehicleData.number ||
      !vehicleData.capacity ||
      !driverData.name ||
      !driverData.phone
    ) {
      Alert.alert('Error', 'Please fill all mandatory fields');
      return;
    }

    updateVehicle(id as string, {
      ...vehicleData,
      driver: driverData,
    });

    Alert.alert('Success', 'Vehicle updated successfully', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const handleDeleteVehicle = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to remove this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeVehicle(id as string);
            router.back();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Edit Vehicle</Text>
        <TouchableOpacity onPress={handleDeleteVehicle}>
          <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Vehicle Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>

          <Text style={styles.label}>Vehicle Type *</Text>
          <View style={styles.grid}>
            {VEHICLE_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  vehicleData.type === type && styles.chipSelected,
                ]}
                onPress={() => setVehicleData({ ...vehicleData, type })}
              >
                <Text
                  style={[
                    styles.chipText,
                    vehicleData.type === type && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <LabeledInput
            label="Vehicle Model/Brand *"
            placeholder="e.g. Mahindra Bolero"
            value={vehicleData.model}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, model: text })
            }
          />
          <LabeledInput
            label="Vehicle Number *"
            placeholder="e.g. MH 12 AB 1234"
            value={vehicleData.number}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, number: text })
            }
            autoCapitalize="characters"
          />
          <LabeledInput
            label="Loading Capacity (Tons) *"
            placeholder="e.g. 2.5"
            value={vehicleData.capacity}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, capacity: text })
            }
            keyboardType="numeric"
          />
        </View>

        {/* Driver Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Details</Text>
          <LabeledInput
            label="Driver Name *"
            placeholder="Enter full name"
            value={driverData.name}
            onChangeText={(text) =>
              setDriverData({ ...driverData, name: text })
            }
            icon="person"
          />
          <LabeledInput
            label="Driver Phone *"
            placeholder="10-digit number"
            value={driverData.phone}
            onChangeText={(text) =>
              setDriverData({ ...driverData, phone: text })
            }
            icon="call"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <LabeledInput
            label="License Number"
            placeholder="e.g. MH1220120001234"
            value={driverData.licenseNo}
            onChangeText={(text) =>
              setDriverData({ ...driverData, licenseNo: text })
            }
            icon="badge"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Save Changes"
          onPress={handleUpdateVehicle}
          icon="save"
        />
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
  section: { paddingHorizontal: 16, marginBottom: 32 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  chipSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },
  chipText: { fontSize: 14, color: '#6b7280' },
  chipTextSelected: { color: COLORS.brand.primary, fontWeight: '700' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    elevation: 10,
  },
});
