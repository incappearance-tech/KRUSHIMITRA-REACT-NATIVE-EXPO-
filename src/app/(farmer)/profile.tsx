import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FarmerProfileForm, farmerProfileSchema } from '@/src/validators/farmerProfile.schema';
import { router } from 'expo-router';
import FormInput from '@/src/components/FormInput';
import FormDropdown from '@/src/components/FormDropdown';


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
    setValue,
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

  const district = watch('district');

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const onSubmit = (data: FarmerProfileForm) => {
    console.log('VALID DATA', data);
    router.push('/(farmer)/dashboard');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      {/* Profile Photo */}
      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.avatar} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={42} color="#7C8B80" />
          )}
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.addPhotoText}>Add Photo</Text>
        <Text style={styles.optionalText}>(Optional)</Text>
      </View>

      {/* Full Name */}

      <FormInput
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
      />
      {/* Farmer ID */}
      <FormInput
        control={control}
        name="farmerId"
        label="Farmer ID"
        placeholder="Enter Farmer ID"
      />
      {/* District */}
      <FormDropdown
        control={control}
        name="district"
        label="District"
        placeholder="Select District"
        options={Object.keys(DISTRICT_TALUKA_MAP)}
      />
     
      {/* Taluka */}
      <FormDropdown
        control={control}
        name="taluka"
        label="Taluka"
        placeholder="Select Taluka"
        options={Object.keys(DISTRICT_TALUKA_MAP)}
      />
    
      {/* Village */}

      <FormInput
        control={control}
        name="village"
        label="Village"
        placeholder="Enter Village"
      />
      {/* Pin Code */}
      <FormInput
        control={control}
        name="pinCode"
        label="Pin Code"
        placeholder="Enter 6-digit Pin Code"
        keyboardType="number-pad"
        maxLength={6}
      />


      {/* Submit */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Save & Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 6 },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  error: { color: '#DC2626', fontSize: 12, marginTop: 4 },
  button: {
    marginTop: 20,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: { fontSize: 16, fontWeight: '700', color: '#fff' },

  /* photo styles reused */
  photoSection: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: '#EEF2EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: { height: 96, width: 96, borderRadius: 48 },
  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: { marginTop: 8, fontSize: 14, fontWeight: '600' },
  optionalText: { fontSize: 12, color: '#6B7280' },
});
