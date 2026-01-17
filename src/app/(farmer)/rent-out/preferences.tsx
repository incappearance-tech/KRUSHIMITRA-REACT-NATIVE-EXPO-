import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressStep } from '@/src/components/ProgressStep';
import { navigate } from 'expo-router/build/global-state/routing';
import App from '../..';
import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import Button from '@/src/components/Button';
import { Form, useForm } from 'react-hook-form';
import FormInput from '@/src/components/FormInput';

const PreferencesScreen = ({ navigation }: any) => {
  const [availabilityType, setAvailabilityType] = useState('machine-only');
  const [priceType, setPriceType] = useState('per_hour');
  const [rentAmount, setRentAmount] = useState('');
  const [minReq, setMinReq] = useState('');

  const estimatedEarnings = rentAmount ? (parseFloat(rentAmount) * 8).toFixed(2) : '0.00';
const { control } = useForm({
  defaultValues: {
    rentAmount: '',
    minRequirement: '',
  }
});
  return (
    <View style={styles.safeArea}>
      
      {/* Header */}
     <AppBar title="Rental Preferences" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <ProgressStep currentStep={2} totalSteps={3} label="Rental Preferences" />

          {/* Availability Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Availability Type <Text style={{ color: '#ef4444' }}>*</Text>
            </Text>

            {/* Machine Only Option */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setAvailabilityType('machine-only')}
              style={[
                styles.optionCard, 
                availabilityType === 'machine-only' && styles.optionCardActive
              ]}
            >
              <View style={styles.optionIconContainer}>
                <MaterialIcons name="agriculture" size={24} color="#15803d" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>Machine Only</Text>
                <Text style={styles.optionSubLabel}>Renter operates the machine themselves.</Text>
              </View>
              <View style={[styles.radio, availabilityType === 'machine-only' && styles.radioActive]}>
                {availabilityType === 'machine-only' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            {/* Machine + Operator Option */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setAvailabilityType('with-operator')}
              style={[
                styles.optionCard, 
                availabilityType === 'with-operator' && styles.optionCardActive
              ]}
            >
              <View style={styles.optionIconContainer}>
                <MaterialIcons name="engineering" size={24} color="#15803d" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>Machine + Operator</Text>
                <Text style={styles.optionSubLabel}>You provide the machine along with an operator.</Text>
                
                <View style={styles.infoBox}>
                  <MaterialIcons name="info" size={16} color="#15803d" />
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: 'bold' }}>Important: </Text>
                    The operator belongs to you. This is not a request for a Labour-role user.
                  </Text>
                </View>
              </View>
              <View style={[styles.radio, availabilityType === 'with-operator' && styles.radioActive]}>
                {availabilityType === 'with-operator' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Pricing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Rent Price Type <Text style={{ color: '#ef4444' }}>*</Text>
            </Text>

            {/* Price Type Switcher */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                onPress={() => setPriceType('per_hour')}
                style={[styles.toggleBtn, priceType === 'per_hour' && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, priceType === 'per_hour' && styles.toggleTextActive]}>Per Hour</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setPriceType('per_day')}
                style={[styles.toggleBtn, priceType === 'per_day' && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, priceType === 'per_day' && styles.toggleTextActive]}>Per Day</Text>
              </TouchableOpacity>
            </View>

            {/* Rent Amount Input */}
            {/* <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Rent Amount <Text style={{ color: '#ef4444' }}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencyPrefix}>$</Text>
                <TextInput 
                  style={styles.mainInput}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={rentAmount}
                  onChangeText={setRentAmount}
                />
                <Text style={styles.unitSuffix}>{priceType === 'per_hour' ? '/hr' : '/day'}</Text>
              </View>
            </View> */}
            <FormInput
              label="Rent Amount"
              name='rentAmount'
              placeholder="0.00"
              control={control}
              leftIcon={"rupee-sign"}
              // rightSuffix={priceType === 'per_hour' ? '/hr' : '/day'}
              keyboardType="decimal-pad"
            />

          
            {/* Earnings Calculation */}
            <View style={styles.earningsCard}>
              <MaterialIcons name="info" size={20} color="#37ec13" />
              <View style={{ flex: 1 }}>
                <Text style={styles.earningsTitle}>Estimated Earnings</Text>
                <Text style={styles.earningsSub}>
                  Based on an 8-hour shift, you could earn roughly 
                  <Text style={{ fontWeight: 'bold', color: '#0f172a' }}> ${estimatedEarnings}</Text> per day.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      
      <Button
      label='Next'
      onPress={() => navigate('/rent-out/availability')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background ,paddingHorizontal: 16,},
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  iconButton: { padding: 4 },
  scrollContent: { paddingBottom: 120 },
  section: {  marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginHorizontal: 16, marginTop: 24 },
  
  // Option Cards
  optionCard: { flexDirection: 'row', gap: 12, padding: 16, backgroundColor: '#fff', borderRadius: 16, borderWidth: 2, borderColor: '#f1f5f9', marginBottom: 12 },
  optionCardActive: { borderColor: '#37ec13', backgroundColor: 'rgba(55, 236, 19, 0.05)' },
  optionIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
  optionTextContainer: { flex: 1 },
  optionLabel: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  optionSubLabel: { fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 18 },
  
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#cbd5e1', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#37ec13', backgroundColor: '#37ec13' },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },

  infoBox: { flexDirection: 'row', gap: 8, backgroundColor: '#dcfce7', padding: 10, borderRadius: 10, marginTop: 12 },
  infoText: { flex: 1, fontSize: 11, color: '#166534', lineHeight: 15 },

  // Pricing
  toggleContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  toggleBtnActive: { backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  toggleTextActive: { color: '#0f172a' },

  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 8 },
  optionalText: { color: '#94a3b8', fontWeight: '400' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  currencyPrefix: { fontSize: 18, fontWeight: '700', color: '#64748b', marginRight: 8 },
  mainInput: { flex: 1, fontSize: 20, fontWeight: '700', color: '#0f172a', padding: 0 },
  unitSuffix: { fontSize: 14, fontWeight: '600', color: '#94a3b8' },
  helperText: { fontSize: 12, color: '#94a3b8', marginTop: 6 },

  earningsCard: { flexDirection: 'row', gap: 12, backgroundColor: '#f0fdf4', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#dcfce7' },
  earningsTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  earningsSub: { fontSize: 12, color: '#64748b', marginTop: 2, lineHeight: 18 },

  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  continueButton: { backgroundColor: '#37ec13', paddingVertical: 16, borderRadius: 12, alignItems: 'center', elevation: 4, shadowColor: '#37ec13', shadowOpacity: 0.3, shadowRadius: 8 },
  continueButtonText: { fontWeight: '800', fontSize: 16, color: '#000' },
});

export default PreferencesScreen;