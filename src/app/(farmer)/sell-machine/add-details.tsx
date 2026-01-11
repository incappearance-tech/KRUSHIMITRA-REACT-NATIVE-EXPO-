import AvailabilityPicker from '@/src/components/AvailabilityPicker';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import FormCheckbox from '@/src/components/FormCheckbox';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import FormSwitch from '@/src/components/FormSwitch';
import MediaUploader from '@/src/components/MediaUploader';
import RadioGroup from '@/src/components/RadioGroup';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppBar from '@/src/components/AppBar';
import { COLORS } from '../../../constants/colors';

/* -------------------------------------------------------------------------- */
/*                               ZOD SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const machineSchema = z
  .object({
    category: z.string().min(1, 'Category is required'),
    subCategory: z.string().min(1, 'Sub-category is required'),

    brand: z.string().min(2, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),

    year: z.string().min(1, 'Year is required'),

    serialNo: z
      .string()
      .min(4, 'Enter last 4 digits')
      .max(4, 'Enter last 4 digits'),

    condition: z.string().min(1, 'Condition is required'),

    sellingReason: z.string().min(1, 'Selling reason is required'),

    usageLevel: z.enum(['light', 'medium', 'heavy']),
    askingPrice: z.string().min(1, 'Asking price is required'),
    isNegotiable: z.boolean(),
    hasRepair: z.boolean(),
    repairDetails: z.string().optional(),

    availability: z.object({
      key: z.string(),
    }),

    selectedDate: z.date().optional(),

    ownershipConfirmed: z.literal(true, {
      errorMap: () => ({ message: 'You must confirm ownership' }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.hasRepair && !data.repairDetails) {
      ctx.addIssue({
        path: ['repairDetails'],
        message: 'Repair details are required',
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                                  SCREEN                                    */
/* -------------------------------------------------------------------------- */

interface AvailabilityOption {
  key: string;
  type?: string;
  label?: string;
}

export default function App() {
  const [media, setMedia] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityOption>({ key: 'immediately' });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
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
      selectedDate: new Date(),
      ownershipConfirmed: false,
      askingPrice: '',
    },
  });

  /* ------------------------------- SUBMIT -------------------------------- */

  const handleNextStep = handleSubmit((data) => {
    if (media.length < 2) {
      Alert.alert('Upload Photos', 'Please upload at least 2 photos');
      return;
    }

    console.log('FINAL DATA ✅', { ...data, media });
    router.push('/sell-machine/publish');
  });

  /* ----------------------------------------------------------------------- */

  return (
    <View style={styles.container}>
      {/* -------------------- HEADER -------------------- */}
      <AppBar title="Add Machine Details" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* -------------------- MEDIA -------------------- */}
          <MediaUploader
            title="Upload Photos"
            min={2}
            max={5}
            onChange={setMedia}
          />

          {/* -------------------- CATEGORY -------------------- */}
          <Card>
            <SectionHeader icon="category" title="Category" />

            <FormDropdown
              control={control}
              name="category"
              label="Category"
              placeholder="Select Category"
              options={['Tractor', 'Harvester', 'Implements', 'Seeds']}
            />

            <FormDropdown
              control={control}
              name="subCategory"
              label="Sub-Category"
              placeholder="Select Sub-Category"
              options={['4WD', 'Mini Tractor', 'Utility', 'Row Crop']}
            />
          </Card>

          {/* -------------------- IDENTITY -------------------- */}
          <Card>
            <SectionHeader icon="fingerprint" title="Machine Identity" />

            <FormInput
              control={control}
              name="brand"
              label="Brand"
              placeholder="e.g. Mahindra"
            />

            <FormInput
              control={control}
              name="model"
              label="Model"
              placeholder="e.g. 575 DI"
            />

            <View>
              <FormDropdown
                control={control}
                name="year"
                label="Year"
                placeholder="Select"
                options={['2024', '2023', '2022', '2021']}
              />

              <FormInput
                control={control}
                name="serialNo"
                label="Serial No (Last 4)"
                placeholder="XXXX"
                maxLength={4}
              />
            </View>
          </Card>

          {/* -------------------- USAGE -------------------- */}
          <Card>
            <SectionHeader icon="build" title="Usage & Condition" />

            <RadioGroup
              label="Usage Level"
              value={watch('usageLevel')}
              onChange={(val) =>
                setValue('usageLevel', val)
              }
              options={[
                { label: 'Light', value: 'light' },
                { label: 'Medium', value: 'medium' },
                { label: 'Heavy', value: 'heavy' },
              ]}
            />

            <View style={styles.rowBetween}>
              <Text style={styles.labelDark}>Any major repair?</Text>
              <FormSwitch control={control} name="hasRepair" />
            </View>

            {watch('hasRepair') && (
              <FormInput
                control={control}
                name="repairDetails"
                label="Repair Details"
                placeholder="Enter repair details"
              />
            )}

            <FormDropdown
              control={control}
              name="condition"
              label="Overall Condition"
              placeholder="Select"
              options={[
                'Excellent',
                'Good - Minor wear',
                'Fair',
                'Needs Repair',
              ]}
            />
          </Card>

          {/* -------------------- SALES -------------------- */}
          <Card>
            <SectionHeader icon="sell" title="Sales Details" />

            <FormDropdown
              control={control}
              name="sellingReason"
              label="Reason for Selling"
              placeholder="Select"
              options={[
                'Upgrading to new machine',
                'Need Cash',
                'Not using anymore',
              ]}
            />
            <FormInput
              control={control}
              name="askingPrice"
              label="Asking Price"
              placeholder="0"
              keyboardType="numeric"
              leftIcon={<FontAwesome name="rupee" size={18} color="black" />}
            />

            <View style={styles.rowBetween}>
              <Text style={styles.labelDark}>Price negotiable?</Text>
              <FormSwitch control={control} name="isNegotiable" />
            </View>

            <AvailabilityPicker
              label="Available From"
              value={availability}
              onChange={setAvailability}
              options={[
                { type: 'static', key: 'immediately', label: 'Immediately' },
                { type: 'date', key: 'select_date', label: 'Select Date' },
              ]}
            />
          </Card>

          {/* -------------------- OWNERSHIP -------------------- */}
          <FormCheckbox
            control={control}
            name="ownershipConfirmed"
            label="I confirm this machine belongs to me and details are correct."
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* -------------------- FOOTER -------------------- */}
      <Button label="Next Step" onPress={handleNextStep} sticky />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

interface SectionHeaderProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

const SectionHeader = ({ icon, title }: SectionHeaderProps) => (
  <View style={styles.sectionHeader}>
    <MaterialIcons
      name={icon}
      size={20}
      color={COLORS.brand.primary}
      style={{ marginRight: 8 }}
    />
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

/* -------------------------------------------------------------------------- */
/*                                  STYLES                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  fieldGroup: { marginBottom: 16 },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  labelDark: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  inputContainer: {
    height: 48,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
  },

  inputWrapperRelative: {
    justifyContent: 'center',
  },

  currencyPrefix: {
    position: 'absolute',
    left: 10,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
