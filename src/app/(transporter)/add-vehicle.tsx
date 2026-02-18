import React, { useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { ProgressStep } from '@/src/components/ProgressStep';
import { COLORS } from '@/src/constants/colors';
import {
  PaymentHistory,
  Vehicle,
  VehicleDriver,
  useTransporterStore,
} from '@/src/store/transporter.store';

// { width } is unused

const VEHICLE_TYPES = [
  { id: 'Mini Truck', icon: 'local-shipping' },
  { id: 'Tractor Trolley', icon: 'agriculture' },
  { id: 'Large Truck', icon: 'directions-bus' },
  { id: 'Tempo', icon: 'delivery-dining' },
  { id: 'Thresher', icon: 'hardware' },
];

const PLANS = [
  { key: 'monthly', title: 'Monthly', price: '₹500', days: 30, tag: 'Starter' },
  {
    key: 'quarterly',
    title: 'Quarterly',
    price: '₹1400',
    days: 90,
    tag: 'Popular',
    popular: true,
  },
  {
    key: 'yearly',
    title: 'Yearly',
    price: '₹5000',
    days: 365,
    tag: 'Best Value',
  },
];

const STEPS = [
  { id: 1, title: 'Vehicle Specs' },
  { id: 2, title: 'Driver Info' },
  { id: 3, title: 'Plan & Payment' },
];

export default function AddVehicleWizard() {
  const router = useRouter();
  const { addVehicle } = useTransporterStore();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [vehicleData, setVehicleData] = useState({
    type: 'Mini Truck',
    model: '',
    number: '',
    capacity: '',
  });

  const [driverData, setDriverData] = useState<VehicleDriver>({
    name: '',
    phone: '',
    licenseNo: '',
  });

  const [selectedPlanKey, setSelectedPlanKey] = useState('monthly');

  const handleNext = () => {
    if (currentStep === 1) {
      if (!vehicleData.model || !vehicleData.number || !vehicleData.capacity) {
        Alert.alert('Missing Info', 'Please fill all vehicle details.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!driverData.name || !driverData.phone) {
        Alert.alert('Missing Info', 'Driver name and phone are required.');
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    else router.back();
  };

  const handleSubmit = () => {
    const plan = PLANS.find((p) => p.key === selectedPlanKey)!;
    const vehicleId = Math.random().toString(36).substring(7);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.days);

    const newVehicle: Vehicle = {
      id: vehicleId,
      ...vehicleData,
      driver: driverData,
      plan: selectedPlanKey as any,
      expiryDate: expiryDate.toISOString(),
      isActive: true,
    };

    const payment: PaymentHistory = {
      id: 'PAY-' + Math.random().toString(36).substring(7).toUpperCase(),
      vehicleId: vehicleId,
      vehicleNumber: vehicleData.number,
      plan: plan.title,
      amount: plan.price,
      date: new Date().toISOString(),
      status: 'success',
    };

    addVehicle(newVehicle, payment);

    // Success Modal or Alert
    Alert.alert(
      'Vehicle Registered! 🎉',
      `Your ${vehicleData.model} is now active on the Fleet.`,
      [{ text: 'Go to Fleet', onPress: () => router.back() }],
    );
  };

  return (
    <View style={styles.container}>
      <AppBar title="Add New Vehicle" onBackPress={handleBack} />

      <View style={styles.content}>
        <ProgressStep
          currentStep={currentStep}
          totalSteps={3}
          label={STEPS[currentStep - 1].title}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollForm}
            showsVerticalScrollIndicator={false}
          >
            {/* STEP 1: VEHICLE SPECS */}
            {currentStep === 1 && (
              <View style={styles.stepContainer}>
                <Text style={styles.label}>Select Vehicle Type</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.typeScroll}
                >
                  {VEHICLE_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.typeCard,
                        vehicleData.type === type.id && styles.typeCardActive,
                      ]}
                      onPress={() =>
                        setVehicleData({ ...vehicleData, type: type.id })
                      }
                    >
                      <MaterialIcons
                        name={type.icon as any}
                        size={24}
                        color={
                          vehicleData.type === type.id
                            ? COLORS.brand.primary
                            : '#94a3b8'
                        }
                      />
                      <Text
                        style={[
                          styles.typeText,
                          vehicleData.type === type.id && styles.typeTextActive,
                        ]}
                      >
                        {type.id}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <LabeledInput
                  label="Vehicle Model"
                  placeholder="e.g. Tata Ace Gold"
                  value={vehicleData.model}
                  onChangeText={(t: string) =>
                    setVehicleData({ ...vehicleData, model: t })
                  }
                />
                <LabeledInput
                  label="Vehicle Number (RC)"
                  placeholder="MH 12 AB 1234"
                  value={vehicleData.number}
                  onChangeText={(t: string) =>
                    setVehicleData({ ...vehicleData, number: t })
                  }
                  autoCapitalize="characters"
                />
                <LabeledInput
                  label="Loading Capacity (Tons)"
                  placeholder="e.g. 1.5"
                  value={vehicleData.capacity}
                  onChangeText={(t: string) =>
                    setVehicleData({ ...vehicleData, capacity: t })
                  }
                  keyboardType="numeric"
                />
              </View>
            )}

            {/* STEP 2: DRIVER INFO */}
            {currentStep === 2 && (
              <View style={styles.stepContainer}>
                <View style={styles.banner}>
                  <MaterialIcons name="person-pin" size={24} color="#0f172a" />
                  <Text style={styles.bannerText}>
                    Assign a driver to manage trips for this vehicle.
                  </Text>
                </View>

                <LabeledInput
                  label="Driver Name"
                  placeholder="Full Name"
                  value={driverData.name}
                  onChangeText={(t: string) =>
                    setDriverData({ ...driverData, name: t })
                  }
                  icon="person"
                />
                <LabeledInput
                  label="Phone Number"
                  placeholder="10-digit Mobile"
                  value={driverData.phone}
                  onChangeText={(t: string) =>
                    setDriverData({ ...driverData, phone: t })
                  }
                  keyboardType="phone-pad"
                  maxLength={10}
                  icon="call"
                />
                <LabeledInput
                  label="License Number (Optional)"
                  placeholder="DL Number"
                  value={driverData.licenseNo}
                  onChangeText={(t: string) =>
                    setDriverData({ ...driverData, licenseNo: t })
                  }
                  icon="badge"
                />
              </View>
            )}

            {/* STEP 3: PLAN SELECTION */}
            {currentStep === 3 && (
              <View style={styles.stepContainer}>
                <Text style={styles.headerTitle}>Select Activation Plan</Text>
                <Text style={styles.headerSub}>
                  Choose a plan to list your vehicle and get leads.
                </Text>

                <View style={styles.plansGrid}>
                  {PLANS.map((plan) => (
                    <TouchableOpacity
                      key={plan.key}
                      style={[
                        styles.planCard,
                        selectedPlanKey === plan.key && styles.planCardSelected,
                      ]}
                      onPress={() => setSelectedPlanKey(plan.key)}
                    >
                      {plan.popular && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularText}>MOST POPULAR</Text>
                        </View>
                      )}
                      <View style={styles.planHeader}>
                        <Text style={styles.planTitle}>{plan.title}</Text>
                        <View
                          style={[
                            styles.planRadio,
                            selectedPlanKey === plan.key &&
                            styles.planRadioSelected,
                          ]}
                        >
                          {selectedPlanKey === plan.key && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                      </View>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      <Text style={styles.planDuration}>
                        {plan.days} Days Validity
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryVal}>
                      {PLANS.find((p) => p.key === selectedPlanKey)?.price}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>GST (18%)</Text>
                    <Text style={styles.summaryVal}>Included</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total Payable</Text>
                    <Text style={styles.totalVal}>
                      {PLANS.find((p) => p.key === selectedPlanKey)?.price}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        <Button
          label={currentStep === 3 ? 'Process Payment' : 'Next Step'}
          onPress={handleNext}
          sticky
          backgroundColor={COLORS.white}
          textColor={COLORS.text}
          icon={currentStep === 3 ? 'lock' : 'arrow-forward'}
          style={styles.nextButtonStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 16 },
  scrollForm: { paddingBottom: 100, paddingTop: 16 },
  stepContainer: { gap: 16 },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  typeScroll: { paddingBottom: 8, gap: 12 },
  typeCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  typeCardActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: '#f0fdf4',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  typeTextActive: { color: '#166534' },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  bannerText: { flex: 1, fontSize: 13, color: '#475569', lineHeight: 20 },

  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  headerSub: { fontSize: 14, color: '#64748b', marginBottom: 16 },

  plansGrid: { gap: 16 },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: COLORS.brand.primary,
    borderWidth: 2,
    backgroundColor: '#f0fdf4',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRadioSelected: { borderColor: COLORS.brand.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.brand.primary,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2,
  },
  planDuration: { fontSize: 12, color: '#64748b' },

  summaryBox: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 14, color: '#64748b' },
  summaryVal: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  totalVal: { fontSize: 18, fontWeight: '800', color: COLORS.brand.primary },

  nextButtonStyle: {
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
