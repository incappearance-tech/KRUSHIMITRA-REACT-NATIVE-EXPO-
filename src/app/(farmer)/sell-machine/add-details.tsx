import AvailabilityPicker from '@/src/components/AvailabilityPicker';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import FormCheckbox from '@/src/components/FormCheckbox';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import FormSwitch from '@/src/components/FormSwitch';
import MediaUploader from '@/src/components/MediaUploader';
import RadioGroup from '@/src/components/RadioGroup';
import { IMediaItem } from '@/src/types/components/media';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

import { IAvailabilityOption, ISectionHeaderProps, machineSchema } from '@/src/types/sell-machine/add-details';
import { useState } from 'react';

export default function App() {
  const { t } = useTranslation();
  const [media, setMedia] = useState<IMediaItem[]>([]);
  const [availability, setAvailability] = useState<IAvailabilityOption>({ key: 'immediately' });

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
      ownershipConfirmed: false,
      askingPrice: '',
    },
  });

  /* ------------------------------- SUBMIT -------------------------------- */

  const handleNextStep = handleSubmit((data) => {
    if (media.length < 2) {
      Alert.alert(t('sell_machine.photo_alert_title'), t('sell_machine.photo_alert_msg'));
      return;
    }

    console.log('FINAL DATA ✅', { ...data, media });
    router.push('/sell-machine/publish');
  });

  /* ----------------------------------------------------------------------- */

  return (
    <View style={styles.container}>
      {/* -------------------- HEADER -------------------- */}
      <AppBar title={t('sell_machine.title')} />

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
            title={t('sell_machine.upload_photos')}
            min={2}
            max={5}
            onChange={setMedia}
          />

          {/* -------------------- CATEGORY -------------------- */}
          <Card>
            <SectionHeader icon="category" title={t('sell_machine.category')} />

            <FormDropdown
              control={control}
              name="category"
              label={t('sell_machine.category')}
              placeholder={t('sell_machine.select_category')}
              options={['Tractor', 'Harvester', 'Implements', 'Seeds']}
            />

            <FormDropdown
              control={control}
              name="subCategory"
              label={t('sell_machine.sub_category')}
              placeholder={t('sell_machine.select_sub_category')}
              options={['4WD', 'Mini Tractor', 'Utility', 'Row Crop']}
            />
          </Card>

          {/* -------------------- IDENTITY -------------------- */}
          <Card>
            <SectionHeader icon="fingerprint" title={t('sell_machine.identity_title')} />

            <FormInput
              control={control}
              name="brand"
              label={t('sell_machine.brand')}
              placeholder={t('sell_machine.brand_placeholder')}
            />

            <FormInput
              control={control}
              name="model"
              label={t('sell_machine.model')}
              placeholder={t('sell_machine.model_placeholder')}
            />

            <View>
              <FormDropdown
                control={control}
                name="year"
                label={t('sell_machine.year')}
                placeholder={t('sell_machine.select')}
                options={['2024', '2023', '2022', '2021']}
              />

              <FormInput
                control={control}
                name="serialNo"
                label={t('sell_machine.serial_no')}
                placeholder={t('sell_machine.serial_placeholder')}
                maxLength={4}
              />
            </View>
          </Card>

          {/* -------------------- USAGE -------------------- */}
          <Card>
            <SectionHeader icon="build" title={t('sell_machine.condition_title')} />

            <RadioGroup
              label={t('sell_machine.usage_level')}
              value={watch('usageLevel')}
              onChange={(val) =>
                setValue('usageLevel', val)
              }
              options={[
                { label: t('sell_machine.light'), value: 'light' },
                { label: t('sell_machine.medium'), value: 'medium' },
                { label: t('sell_machine.heavy'), value: 'heavy' },
              ]}
            />

            <View style={styles.rowBetween}>
              <Text style={styles.labelDark}>{t('sell_machine.any_repair')}</Text>
              <FormSwitch control={control} name="hasRepair" />
            </View>

            {watch('hasRepair') && (
              <FormInput
                control={control}
                name="repairDetails"
                label={t('sell_machine.repair_details')}
                placeholder={t('sell_machine.enter_repair_details')}
              />
            )}

            <FormDropdown
              control={control}
              name="condition"
              label={t('sell_machine.overall_condition')}
              placeholder={t('sell_machine.select')}
              options={[
                t('sell_machine.excellent'),
                t('sell_machine.good_minor_wear'),
                t('sell_machine.fair'),
                t('sell_machine.needs_repair'),
              ]}
            />
          </Card>

          {/* -------------------- SALES -------------------- */}
          <Card>
            <SectionHeader icon="sell" title={t('sell_machine.sales_details')} />

            <FormDropdown
              control={control}
              name="sellingReason"
              label={t('sell_machine.selling_reason')}
              placeholder={t('sell_machine.select')}
              options={[
                t('sell_machine.upgrading'),
                t('sell_machine.need_cash'),
                t('sell_machine.not_using'),
              ]}
            />
            <FormInput
              control={control}
              name="askingPrice"
              label={t('sell_machine.asking_price')}
              placeholder="0"
              keyboardType="numeric"
              leftIcon={<FontAwesome name="rupee" size={18} color="black" />}
            />

            <View style={styles.rowBetween}>
              <Text style={styles.labelDark}>{t('sell_machine.price_negotiable')}</Text>
              <FormSwitch control={control} name="isNegotiable" />
            </View>

            <AvailabilityPicker
              label={t('sell_machine.available_from')}
              value={availability}
              onChange={setAvailability}
              options={[
                { type: 'static', key: 'immediately', label: t('sell_machine.immediately') },
                { type: 'date', key: 'select_date', label: t('sell_machine.select_date') },
              ]}
            />
          </Card>

          {/* -------------------- OWNERSHIP -------------------- */}
          <FormCheckbox
            control={control}
            name="ownershipConfirmed"
            label={t('sell_machine.ownership_confirm')}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* -------------------- FOOTER -------------------- */}
      <Button label={t('sell_machine.next_step')} onPress={handleNextStep} sticky />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({ icon, title }: ISectionHeaderProps) => (
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
