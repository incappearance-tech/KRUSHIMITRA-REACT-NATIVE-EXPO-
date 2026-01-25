import React, { useEffect, useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AppBar from '@/src/components/AppBar';
import AvailabilityPicker from '@/src/components/AvailabilityPicker';
import Button from '@/src/components/Button';
import FormCheckbox from '@/src/components/FormCheckbox';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import FormSwitch from '@/src/components/FormSwitch';
import MediaUploader from '@/src/components/MediaUploader';
import { ProgressStep } from '@/src/components/ProgressStep';
import RadioGroup from '@/src/components/RadioGroup';
import { COLORS } from '@/src/constants/colors';
import { FARM_MACHINES_DATA } from '@/src/data/machines.data';
import { useSellingStore } from '@/src/store/selling.store';
import { IMediaItem } from '@/src/types/components/media';
import {
  IAvailabilityOption,
  machineSchema,
} from '@/src/types/sell-machine/add-details';

interface IWizardStep {
  id: number;
  title: string;
  fields: string[];
}

const STEPS: IWizardStep[] = [
  {
    id: 1,
    title: 'Basics',
    fields: ['category', 'subCategory', 'brand', 'model', 'year'],
  },
  {
    id: 2,
    title: 'Condition',
    fields: ['condition', 'usageLevel', 'hasRepair', 'repairDetails'],
  },
  {
    id: 3,
    title: 'Pricing & Media',
    fields: ['askingPrice', 'isNegotiable', 'availability', 'media'],
  },
];

export default function SellMachineWizard() {
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;

  const [currentStep, setCurrentStep] = useState(1);
  const [media, setMedia] = useState<IMediaItem[]>([]);
  const [availability, setAvailability] = useState<IAvailabilityOption>({
    key: 'immediately',
  });

  const { machines, addMachine, updateMachine } = useSellingStore();

  const { control, watch, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      category: '',
      subCategory: '',
      brand: '',
      model: '',
      year: '',
      serialNo: '',
      condition: '',
      sellingReason: '',
      usageLevel: 'medium',
      isNegotiable: false,
      hasRepair: false,
      repairDetails: '',
      availability: { key: 'immediately' },
      ownershipConfirmed: false,
      askingPrice: '',
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const machine = machines.find((m) => m.id === id);
      if (machine) {
        reset({
          ...machine,
          usageLevel: machine.usageLevel as any,
          availability: machine.availability as any,
        });
        if (machine.media) setMedia(machine.media as IMediaItem[]);
        if (machine.availability)
          setAvailability(machine.availability as IAvailabilityOption);
      }
    }
  }, [id, isEditMode, reset, machines]);

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleFinalSubmit = handleSubmit(
    async (data) => {
      if (media.length < 1) {
        Alert.alert(
          'Photos Required',
          'Please add at least 1 photo of your machine.',
        );
        return;
      }

      if (isEditMode) {
        updateMachine(
          id as string,
          {
            ...data,
            media,
            availability,
          } as any,
        );
        Alert.alert('Success', 'Listing updated successfully!');
      } else {
        const newMachine = {
          id: Math.random().toString(36).substring(7),
          ...data,
          media,
          availability,
          status: 'LIVE',
          visible: true,
          expired: false,
          expiry: '30 Days',
        };
        addMachine(newMachine as any);
        Alert.alert(
          'Listing Created',
          'Your machine is now live on KrushiMitra market!',
        );
      }

      router.replace('/(farmer)/sell-machine/');
    },
    (err) => {
      console.log('Validation Errors:', err);
      const firstErr = Object.values(err)[0];
      if (firstErr) {
        Alert.alert(
          'Required Information',
          (firstErr as any).message || 'Please fill all mandatory fields.',
        );
      }
    },
  );

  return (
    <View style={styles.container}>
      <AppBar
        title={isEditMode ? 'Edit Listing' : 'Sell Machine'}
        showBack
        onBackPress={handleBack}
      />

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
            {currentStep === 1 && (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>
                  Let&apos;s start with the basics
                </Text>
                <FormDropdown
                  control={control}
                  name="category"
                  label="Category"
                  placeholder="Select Category"
                  options={FARM_MACHINES_DATA.categories}
                />
                <FormDropdown
                  control={control}
                  name="subCategory"
                  label="Type"
                  placeholder="Select Type"
                  options={[
                    'Standard',
                    'Heavy Duty',
                    'Mini',
                    '4WD',
                    '2WD',
                    'Utility',
                    'Mounted',
                    'Trailed',
                    'Self-Propelled',
                  ]}
                />
                <FormInput
                  control={control}
                  name="brand"
                  label="Brand"
                  placeholder="e.g. Mahindra"
                />
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <FormInput
                      control={control}
                      name="model"
                      label="Model"
                      placeholder="e.g. 575 DI"
                    />
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ flex: 1 }}>
                    <FormDropdown
                      control={control}
                      name="year"
                      label="Mfg Year"
                      placeholder="Year"
                      options={['2024', '2023', '2022', '2021', '2020']}
                    />
                  </View>
                </View>
                <FormInput
                  control={control}
                  name="serialNo"
                  label="Serial Number (Last 4 digits)"
                  placeholder="e.g. 1234"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            )}

            {currentStep === 2 && (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>Machine Condition</Text>
                <FormDropdown
                  control={control}
                  name="condition"
                  label="Condition"
                  placeholder="Select Condition"
                  options={['Excellent', 'Good', 'Fair']}
                />

                <FormInput
                  control={control}
                  name="sellingReason"
                  label="Reason for Selling"
                  placeholder="e.g. Upgrading to new model"
                  multiline
                />

                <View style={styles.spacer} />
                <RadioGroup
                  label="Usage Level"
                  value={watch('usageLevel')}
                  onChange={(val) => setValue('usageLevel', val)}
                  options={[
                    { label: 'Low', value: 'light' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'heavy' },
                  ]}
                />
                <View style={styles.divider} />
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <Text style={styles.label}>Does it need repairs?</Text>
                  <FormSwitch control={control} name="hasRepair" />
                </View>
                {watch('hasRepair') && (
                  <View style={styles.repairBox}>
                    <FormInput
                      control={control}
                      name="repairDetails"
                      label="Repair Details"
                      placeholder="Describe..."
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                )}
              </View>
            )}

            {currentStep === 3 && (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>Price & Photos</Text>
                <MediaUploader
                  title="Upload Photos"
                  min={1}
                  max={5}
                  onChange={setMedia}
                  initialMedia={media}
                />
                <View style={styles.spacer} />
                <FormInput
                  control={control}
                  name="askingPrice"
                  label="Selling Price (₹)"
                  placeholder="e.g. 5,50,000"
                  keyboardType="numeric"
                  leftIcon={
                    <FontAwesome
                      name="rupee"
                      size={16}
                      color={COLORS.textSecondary}
                    />
                  }
                />
                <View
                  style={[
                    styles.row,
                    { justifyContent: 'space-between', marginTop: 8 },
                  ]}
                >
                  <Text style={styles.label}>Price Negotiable?</Text>
                  <FormSwitch control={control} name="isNegotiable" />
                </View>
                <AvailabilityPicker
                  label="Available From"
                  value={availability}
                  onChange={setAvailability}
                  options={[
                    {
                      type: 'static',
                      key: 'immediately',
                      label: 'Immediately',
                    },
                    {
                      type: 'date',
                      key: 'select_date',
                      label: 'Specific Date',
                    },
                  ]}
                />
                <View style={styles.spacer} />
                <FormCheckbox
                  control={control}
                  name="ownershipConfirmed"
                  label="I confirm I am the owner."
                />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Button
            label={currentStep === 3 ? 'Publish Listing' : 'Next Step'}
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  content: { flex: 1 },
  scrollForm: { paddingBottom: 100, paddingTop: 16 },
  stepContainer: { gap: 16 },
  stepTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  spacer: { height: 16 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  repairBox: {
    marginTop: 12,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
});
