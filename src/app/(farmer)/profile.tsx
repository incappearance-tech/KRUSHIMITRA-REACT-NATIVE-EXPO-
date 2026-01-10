import Button from '@/src/components/Button';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import { FarmerProfileForm, farmerProfileSchema } from '@/src/validators/farmerProfile.schema';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<FarmerProfileForm>({
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

  const onSubmit = (data: FarmerProfileForm) => {
    console.log('VALID DATA', data);
    router.push('/(farmer)/dashboard');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission required to upload photo');
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
          <Text style={styles.addPhotoText}>Upload Photo</Text>

          <Text style={{marginTop:16, flex:1, gap: 8, backgroundColor: COLORS.brand.muted, padding: 4, borderRadius: 50, borderWidth: 1, borderColor: COLORS.brand.primary, justifyContent: "center", alignContent: "center", color: COLORS.brand.primary }}>
            <FontAwesome name="check-circle" size={16} color={COLORS.brand.primary} style={{marginRight:4}}/>   
            <Text style={{marginLeft:4}}>9527189774 * Verified</Text>
          </Text>
        </View>

        <FormInput control={control} name="fullName" label="Full Name" placeholder="Enter your full name" required />
        <FormInput control={control} name="farmerId" label="Farmer ID" placeholder="Enter Farmer ID" required />

        <FormDropdown
          control={control}
          name="district"
          label="District"
          placeholder="Select District"
          options={Object.keys(DISTRICT_TALUKA_MAP)}
          required

        />

        <FormDropdown
          control={control}
          name="taluka"
          label="Taluka"
          placeholder="Select Taluka"
          options={Object.keys(DISTRICT_TALUKA_MAP)}
          required
        />

        <FormInput control={control} name="village" label="Village" placeholder="Enter Village" 
        
        helperText='We need this to connect you with near by labores'
        required />
        <FormInput
          control={control}
          name="pinCode"
          label="Pin Code"
          placeholder="Enter 6-digit Pin Code"
          keyboardType="number-pad"
          maxLength={6}
          required
          
        />
      </KeyboardAwareScrollView>

      {/* Fixed Bottom Button */}
      <View>
        <Button
          label="Save & Continue"
          onPress={handleSubmit(onSubmit)}
          icon="arrow-forward"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 120, // IMPORTANT: space for bottom button
  },

  /* Photo Section */
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
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

