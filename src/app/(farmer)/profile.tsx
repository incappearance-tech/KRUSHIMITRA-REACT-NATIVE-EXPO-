import Button from '@/src/components/Button';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import { IFarmerProfileForm, farmerProfileSchema } from '@/src/types/validators/farmerProfile.schema';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../constants/colors';


const DISTRICT_TALUKA_MAP: Record<string, string[]> = {
  Nasik: ['Niphad', 'Sinnar', 'Yeola'],
  Pune: ['Haveli', 'Mulshi', 'Shirur'],
  Nagpur: ['Kamptee', 'Umred'],
};

export default function FarmerProfileScreen() {
  const { t } = useTranslation();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
  } = useForm<IFarmerProfileForm>({
    resolver: zodResolver(farmerProfileSchema),
    defaultValues: {
      fullName: '',
      farmerId: '',
      district: '',
      taluka: '',
      village: '',
      pinCode: '',
    },
  });

  const onSubmit = (data: IFarmerProfileForm) => {
    console.log('VALID DATA', data);
    router.replace('/(farmer)/');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert(t('profile.photo_permission'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.screen}>
      {/* Scrollable Form */}
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.avatar} onPress={pickImage}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={42} color={COLORS.brand.primary} />
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color={COLORS.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.addPhotoText}>{t('common.upload_photo')}</Text>

          <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.brand.muted, padding: 8, borderRadius: 50, borderWidth: 1, borderColor: COLORS.brand.primary }}>
            <FontAwesome name="check-circle" size={16} color={COLORS.brand.primary} />
            <Text style={{ color: COLORS.brand.primary, fontWeight: '600' }}>9527189774 * {t('auth.verified')}</Text>
          </View>
        </View>

        <FormInput control={control} name="fullName" label={t('profile.full_name')} placeholder={t('profile.enter_full_name')} required />
        <FormInput control={control} name="farmerId" label={t('profile.farmer_id')} placeholder={t('profile.enter_farmer_id')} required />

        <FormDropdown
          control={control}
          name="district"
          label={t('profile.district')}
          placeholder={t('profile.select_district')}
          options={Object.keys(DISTRICT_TALUKA_MAP)}
          required
        />

        <FormDropdown
          control={control}
          name="taluka"
          label={t('profile.taluka')}
          placeholder={t('profile.select_taluka')}
          options={Object.keys(DISTRICT_TALUKA_MAP)}
          required
        />

        <FormInput
          control={control}
          name="village"
          label={t('profile.village')}
          placeholder={t('profile.enter_village')}
          helperText={t('profile.village_helper')}
          required
        />
        <FormInput
          control={control}
          name="pinCode"
          label={t('profile.pin_code')}
          placeholder={t('profile.enter_pin')}
          keyboardType="number-pad"
          maxLength={6}
          required
        />
      </KeyboardAwareScrollView>

      {/* Fixed Bottom Button */}
        <Button
          label={t('common.save_continue')}
          onPress={handleSubmit(onSubmit)}
          icon="arrow-forward"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  scrollContent: {
    paddingBottom: 120, // IMPORTANT: space for bottom button
  },

  /* Photo Section */
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20
  },

  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: COLORS.brand.muted,
    borderWidth: 1,
    borderColor: COLORS.borderFocus,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarImage: {
    height: 96,
    width: 96,
    borderRadius: 48,
  },

  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addPhotoText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },

  optionalText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
