import React, { use, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Dimensions, SafeAreaView, StatusBar, Modal, Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Required: npx expo install expo-image-picker
import { ProgressStep } from '@/src/components/ProgressStep';
import { navigate } from 'expo-router/build/global-state/routing';
import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import Button from '@/src/components/Button';
import FormInput from '@/src/components/FormInput';
import { Form, useForm } from 'react-hook-form';

const { width } = Dimensions.get('window');

export default function AddMachineScreen() {
  const [category, setCategory] = useState('Tractor');
  const [condition, setCondition] = useState('Good');
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Media State
  const [mediaItems, setMediaItems] = useState<{uri: string, type: string}[]>([]);

  const pickMedia = async () => {
    if (mediaItems.length >= 5) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows both Photos and Videos
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newItem = {
        uri: result.assets[0].uri,
        type: result.assets[0].type || 'image'
      };
      setMediaItems([...mediaItems, newItem]);
    }
  };

  const removeMedia = (index: number) => {
    const filtered = mediaItems.filter((_, i) => i !== index);
    setMediaItems(filtered);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      brand: '',
      model: '',
      taluka: '',
      district: '', 
      village: '',
    }
  });
  return (
    <View style={screenStyles.safeArea}>
      
      {/* Header */}
      <AppBar title="Add Rental Machine" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressStep currentStep={1} totalSteps={3} label="Machine Details" />

        {/* Category */}
        <View style={screenStyles.section}>
          <Text style={screenStyles.sectionTitle}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={screenStyles.horizontalScroll}>
            {['Tractor', 'Harvester', 'Tiller', 'Seeder'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[screenStyles.categoryChip, category === item && screenStyles.activeChip]}
              >
                <Text style={[screenStyles.chipText, category === item && screenStyles.activeChipText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Brand & Model */}
        <FormInput
          label="Brand"
          name='brand'
          placeholder="Brand Name (e.g. Mahindra)"
          control={control}
        />

        <FormInput
          label="Model"
          name='model'
          control={control}
          placeholder="Model Number"
        />

        {/* Condition */}
        <View style={screenStyles.section}>
          <Text style={screenStyles.sectionTitle}>Condition</Text>
          <View style={screenStyles.conditionRow}>
            {['Excellent', 'Good', 'Average'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCondition(item)}
                style={[screenStyles.conditionCard, condition === item && screenStyles.activeConditionCard]}
              >
                <Text style={[screenStyles.conditionText, condition === item && screenStyles.activeConditionText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location (Preserved) */}
        <View style={screenStyles.section}>
          <Text style={screenStyles.sectionTitle}>Location</Text>
          <TouchableOpacity style={screenStyles.locationBtn}>
            <MaterialIcons name="my-location" size={18} color="#15803d" />
            <Text style={screenStyles.locationBtnText}>Use Current Location</Text>
          </TouchableOpacity>
          <FormInput
          label="Village"
          name='village'
          placeholder="Village"
          control={control}
        />
          <View>
<FormInput
  label="Taluka"
  name='taluka'
  placeholder="Taluka"
  control={control}
/>
<FormInput
  label="District"
  name='district'
  placeholder="District"
  control={control}
/>

          </View>
        </View>

        {/* Media Upload (Photos & Videos) */}
        <View style={screenStyles.section}>
          <View style={screenStyles.photoHeader}>
            <Text style={screenStyles.sectionTitle}>Photos & Videos</Text>
            <Text style={screenStyles.photoCount}>{mediaItems.length}/5 added</Text>
          </View>
          
          <View style={screenStyles.photoGrid}>
            {/* Add Button */}
            {mediaItems.length < 5 && (
              <TouchableOpacity style={screenStyles.addMediaBtn} onPress={pickMedia}>
                <MaterialIcons name="add-a-photo" size={24} color="#15803d" />
                <Text style={screenStyles.addMediaText}>Add</Text>
              </TouchableOpacity>
            )}

            {/* Uploaded Items */}
            {mediaItems.map((item, index) => (
              <View key={index} style={screenStyles.mediaWrapper}>
                <Image source={{ uri: item.uri }} style={screenStyles.mediaThumbnail} />
                {item.type === 'video' && (
                  <View style={screenStyles.videoIconBadge}>
                    <MaterialIcons name="play-circle-fill" size={20} color="#fff" />
                  </View>
                )}
                <TouchableOpacity style={screenStyles.removeBtn} onPress={() => removeMedia(index)}>
                  <MaterialIcons name="cancel" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Button
      label='Next'
      onPress={() => navigate('/(farmer)/rent-out/preferences')}
      />
    </View>
  );
}

const screenStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background , paddingHorizontal: 16},
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  iconButton: { padding: 4 },
  helpButton: { padding: 4 },
  helpText: { color: '#15803d', fontWeight: '700' },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  horizontalScroll: { gap: 10 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff' },
  activeChip: { backgroundColor: '#37ec13', borderColor: '#37ec13' },
  chipText: { fontWeight: '600', color: '#64748b' },
  activeChipText: { color: '#0f172a' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 12, fontSize: 16 },
  conditionRow: { flexDirection: 'row', gap: 10 },
  conditionCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff' },
  activeConditionCard: { borderColor: '#37ec13', backgroundColor: 'rgba(55, 236, 19, 0.1)' },
  conditionText: { fontWeight: '500', color: '#64748b' },
  activeConditionText: { color: '#15803d' },
  locationBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(55, 236, 19, 0.1)', padding: 12, borderRadius: 12, marginBottom: 12 },
  locationBtnText: { color: '#15803d', fontWeight: '700' },
  photoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  photoCount: { color: '#64748b', fontSize: 12 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  addMediaBtn: { width: (width - 52) / 3, aspectRatio: 1, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: '#37ec13', backgroundColor: 'rgba(55, 236, 19, 0.05)', alignItems: 'center', justifyContent: 'center' },
  addMediaText: { fontSize: 12, fontWeight: '700', color: '#15803d', marginTop: 4 },
  mediaWrapper: { width: (width - 52) / 3, aspectRatio: 1, position: 'relative' },
  mediaThumbnail: { width: '100%', height: '100%', borderRadius: 12 },
  videoIconBadge: { position: 'absolute', top: '35%', left: '35%' },
  removeBtn: { position: 'absolute', top: -5, right: -5, backgroundColor: '#fff', borderRadius: 10 },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  continueButton: { backgroundColor: '#37ec13', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  continueButtonText: { fontWeight: '700', fontSize: 16 },
});