import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import FormInput from '@/src/components/FormInput';
import FormSwitch from '@/src/components/FormSwitch';
import MediaUploader from '@/src/components/MediaUploader';
import { ProgressStep } from '@/src/components/ProgressStep';
import RadioGroup from '@/src/components/RadioGroup';
import { COLORS } from '@/src/constants/colors';
import { IMediaItem } from '@/src/types/components/media';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const STEPS = [
  { id: 1, title: 'Machine Details' },
  { id: 2, title: 'Location & Condition' },
  { id: 3, title: 'Pricing & Photos' },
];

import { useRentalStore } from '@/src/store/rental.store';

export default function AddMachineScreen() {
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const { rentals, setDraftRental } = useRentalStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [media, setMedia] = useState<IMediaItem[]>([]);
  const [category, setCategory] = useState('Tractor');

  const { control, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      brand: '',
      model: '',
      village: '',
      taluka: '',
      district: '',
      condition: 'Good',
      hourlyRate: '',
      dailyRate: '',
      minDuration: '1 Hour',
      isAvailable: true,
    }
  });

  useEffect(() => {
    if (isEditMode && id) {
      const machine = rentals.find(m => m.id === id);
      if (machine) {
        setCategory(machine.type || 'Tractor');
        reset({
          brand: machine.brand || '',
          model: machine.model || '',
          village: 'Demo Village', // Mock
          taluka: 'Demo Taluka',
          district: 'Demo Dist',
          condition: 'Good',
          hourlyRate: machine.price ? String(machine.price) : '',
          isAvailable: !machine.expired
        });
        if (machine.image) {
          setMedia([{ uri: machine.image, type: 'image' } as any]);
        }
      }
    }
  }, [id, isEditMode, reset, rentals]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else handleSubmit(onSubmit)();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else router.back();
  };

  const onSubmit = (data: any) => {
    setDraftRental({
      name: `${data.brand} ${data.model}`,
      brand: data.brand,
      model: data.model,
      category: category.toLowerCase(),
      type: category,
      price: data.hourlyRate,
      period: 'hr',
      image: media[0]?.uri || '',
      location: data.village,
      status: 'AVAILABLE',
      visible: true,
      expired: false,
      expiry: '30 Days',
      ownerName: 'Rahul Kumar',
      distance: '2.0 km',
      rating: 4.8
    });
    router.push({ pathname: '/(farmer)/rent-out/preferences', params: { id: id as string } });
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={isEditMode ? "Edit Rental" : "Rent Out Machine"}
        showBack
        onBackPress={handleBack}
      />

      <View style={styles.content}>
        <ProgressStep currentStep={currentStep} totalSteps={3} label={STEPS[currentStep - 1].title} />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            {/* STEP 1: CATEGORY & ID */}
            {currentStep === 1 && (
              <View style={styles.stepGroup}>
                <Text style={styles.label}>Select Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                  {['Tractor', 'Harvester', 'Tiller', 'Seeder', 'Sprayer'].map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setCategory(item)}
                      style={[styles.catChip, category === item && styles.catChipActive]}
                    >
                      <Text style={[styles.catText, category === item && styles.catTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <FormInput
                  label="Brand"
                  name="brand"
                  placeholder="e.g. Mahindra, Kubota"
                  control={control}
                />

                <FormInput
                  label="Model Number"
                  name="model"
                  placeholder="e.g. 5050 D"
                  control={control}
                />
              </View>
            )}

            {/* STEP 2: LOCATION & CONDITION */}
            {currentStep === 2 && (
              <View style={styles.stepGroup}>
                <TouchableOpacity style={styles.locBtn}>
                  <MaterialIcons name="my-location" size={18} color="#15803d" />
                  <Text style={styles.locBtnText}>Use Current Location</Text>
                </TouchableOpacity>

                <FormInput
                  label="Village / Pind"
                  name="village"
                  placeholder="Village"
                  control={control}
                />

                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <FormInput label="Taluka" name="taluka" placeholder="Taluka" control={control} />
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ flex: 1 }}>
                    <FormInput label="District" name="district" placeholder="District" control={control} />
                  </View>
                </View>

                <RadioGroup
                  label="Machine Condition"
                  value={watch('condition')}
                  onChange={(val) => setValue('condition', val)}
                  options={[
                    { label: 'Excellent', value: 'Excellent' },
                    { label: 'Good', value: 'Good' },
                    { label: 'Average', value: 'Average' }
                  ]}
                />
              </View>
            )}

            {/* STEP 3: PRICE & MEDIA */}
            {currentStep === 3 && (
              <View style={styles.stepGroup}>
                <MediaUploader
                  title="Machine Photos"
                  onChange={setMedia}
                  min={1}
                  max={5}
                  initialMedia={media}
                />

                <View style={styles.spacer} />

                <Text style={styles.sectionTitle}>Rental Rates</Text>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <FormInput
                      label="Hourly Rate (₹)"
                      name="hourlyRate"
                      placeholder="0"
                      keyboardType="numeric"
                      control={control}
                    />
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ flex: 1 }}>
                    <FormInput
                      label="Daily Rate (₹)"
                      name="dailyRate"
                      placeholder="0"
                      keyboardType="numeric"
                      control={control}
                    />
                  </View>
                </View>

                <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }]}>
                  <Text style={styles.label}>Available for Rent?</Text>
                  <FormSwitch control={control} name="isAvailable" />
                </View>
              </View>
            )}

          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Button
            label={currentStep === 3 ? "Save Machine" : "Next Step"}
            onPress={handleNext}
            backgroundColor={COLORS.brand.primary}
            textColor='#000'
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 16 },
  stepGroup: { gap: 16 },

  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  catScroll: { gap: 10, paddingBottom: 4 },
  catChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#fff' },
  catChipActive: { backgroundColor: COLORS.brand.primary, borderColor: COLORS.brand.primary },
  catText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  catTextActive: { color: '#000' },

  locBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, backgroundColor: '#dcfce7', alignSelf: 'flex-start' },
  locBtnText: { color: '#15803d', fontWeight: '700', fontSize: 13 },

  row: { flexDirection: 'row' },
  spacer: { height: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },

  footer: { paddingVertical: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
});