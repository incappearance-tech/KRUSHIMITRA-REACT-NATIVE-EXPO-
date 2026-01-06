import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import { navigate } from 'expo-router/build/global-state/routing';

// --- Theme Colors ---
const COLORS = {
  primary: "#37ec13",
  backgroundLight: "#f6f8f6",
  surfaceLight: "#ffffff",
  textMain: "#101b0d",
  textSecondary: "#4b5563",
  border: "#d3e7cf",
  bgDarkDetails: "#132210",
  error: "#ef4444",
};

export default function App() {
  // --- Form State ---
  const [media, setMedia] = useState([]); // Stores images and videos
  const [category, setCategory] = useState('Tractor');
  const [subCategory, setSubCategory] = useState('');
  const [year, setYear] = useState('2023');
  const [condition, setCondition] = useState('Good - Minor wear');
  const [sellingReason, setSellingReason] = useState('Upgrading to new machine');
  
  const [usageLevel, setUsageLevel] = useState('medium');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [hasRepair, setHasRepair] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Date Logic
  const [availability, setAvailability] = useState('immediately');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- Handlers ---

  // 1. Media Upload (Image & Video)
  const pickMedia = async () => {
    if (media.length >= 5) {
      Alert.alert("Limit Reached", "You can upload a maximum of 5 files.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows Video & Image
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60,
    });

    if (!result.canceled) {
      setMedia([...media, result.assets[0]]);
    }
  };

  const removeMedia = (indexToRemove) => {
    setMedia(media.filter((_, index) => index !== indexToRemove));
  };

  // 2. Date Picker
  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    if (date) {
      setSelectedDate(date);
      setAvailability('select_date');
      if (Platform.OS === 'android') setShowDatePicker(false);
    }
  };

  // 3. Validation & Submit
  const handleNextStep = () => {
    if (media.length < 2) {
      Alert.alert("Media Required", "Please upload at least 2 photos or videos (Min 2, Max 5).");
      return;
    }
    if (!category || !subCategory) {
      Alert.alert("Required Fields", "Please select a Category and Sub-Category.");
      return;
    }
    if (!isChecked) {
      Alert.alert("Confirmation Required", "Please confirm the machine belongs to you.");
      return;
    }
    
    Alert.alert("Success", "All validations passed. Proceeding...");
    navigate("/sell-machine/publish");
    console.log("Data:", { media, category, subCategory, usageLevel, selectedDate: availability === 'select_date' ? selectedDate : 'Now' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

      {/* --- Top App Bar --- */}
      <View style={styles.appBar}>
        <View style={styles.appBarTop}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Add Machine Details</Text>
          <TouchableOpacity>
            <Text style={styles.saveDraftText}>Save Draft</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.stepText}>Step 2 of 3</Text>
            <Text style={styles.percentText}>65% Completed</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >

          {/* 1. Photos Section */}
          <View style={styles.sectionSpacing}>
            <View style={styles.rowBetween}>
              <Text style={styles.heading}>Photos & Videos</Text>
              <Text style={[styles.subText, media.length < 2 && { color: COLORS.error }]}>
                {media.length}/5 (Min 2)
              </Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
              {/* Add Button */}
              <TouchableOpacity style={styles.addPhotoBox} onPress={pickMedia}>
                <View style={styles.iconCircle}>
                  <MaterialIcons name="add-a-photo" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.addPhotoText}>Add</Text>
              </TouchableOpacity>

              {/* Render Uploaded Media */}
              {media.map((item, index) => (
                <View key={index} style={styles.mediaWrapper}>
                  {item.type === 'video' ? (
                    <Video
                      style={styles.mediaPreview}
                      source={{ uri: item.uri }}
                      resizeMode={ResizeMode.COVER}
                      shouldPlay={false}
                      isMuted={true}
                    />
                  ) : (
                    <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
                  )}
                  
                  {/* Video Icon Overlay */}
                  {item.type === 'video' && (
                    <View style={styles.videoIndicator}>
                       <MaterialIcons name="play-circle-fill" size={24} color="#fff" />
                    </View>
                  )}

                  {/* Close/Remove Button */}
                  <TouchableOpacity 
                    style={styles.removeBtn} 
                    onPress={() => removeMedia(index)}
                  >
                    <MaterialIcons name="close" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 2. Category Section */}
          <View style={styles.card}>
            <SectionHeader icon="category" title="Category" />
            
            <FunctionalDropdown 
              label="Category"
              value={category}
              options={['Tractor', 'Harvester', 'Implements', 'Seeds']}
              onSelect={setCategory}
              placeholder="Select Category"
            />

            <FunctionalDropdown 
              label="Sub-Category"
              value={subCategory}
              options={['4WD', 'Mini Tractor', 'Utility', 'Row Crop']}
              onSelect={setSubCategory}
              placeholder="Select Sub-Category"
            />
          </View>

          {/* 3. Machine Identity */}
          <View style={styles.card}>
            <SectionHeader icon="fingerprint" title="Machine Identity" />

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Brand</Text>
              <TextInput style={styles.inputContainer} placeholder="e.g. Mahindra, John Deere" placeholderTextColor="#9ca3af" />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Model Name/Number</Text>
              <TextInput style={styles.inputContainer} placeholder="e.g. 575 DI" placeholderTextColor="#9ca3af" />
            </View>

            <View style={styles.rowGap}>
              <View style={{ flex: 1 }}>
                <FunctionalDropdown 
                   label="Year of Purchase"
                   value={year}
                   options={['2024', '2023', '2022', '2021', '2020']}
                   onSelect={setYear}
                   placeholder="Select"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Serial No. (Last 4)</Text>
                <TextInput 
                  style={[styles.inputContainer, { textAlign: 'center', letterSpacing: 2 }]} 
                  placeholder="XXXX" 
                  maxLength={4} 
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>

          {/* 4. Usage & Condition */}
          <View style={styles.card}>
            <SectionHeader icon="build" title="Usage & Condition" />

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Usage Level</Text>
              <View style={styles.radioGroup}>
                {['Light', 'Medium', 'Heavy'].map((level) => {
                  const val = level.toLowerCase();
                  const isActive = usageLevel === val;
                  return (
                    <TouchableOpacity
                      key={val}
                      onPress={() => setUsageLevel(val)}
                      style={[styles.radioButton, isActive && styles.radioButtonActive]}
                    >
                      <Text style={[styles.radioText, isActive && { color: 'black' }]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.divider} />

            <View style={[styles.rowBetween, { marginVertical: 8 }]}>
              <View>
                <Text style={styles.labelDark}>Any major repair done?</Text>
                <Text style={styles.subTextSmall}>Engine, Transmission, etc.</Text>
              </View>
              <Switch
                trackColor={{ false: "#e5e7eb", true: COLORS.primary }}
                thumbColor={"#fff"}
                onValueChange={setHasRepair}
                value={hasRepair}
              />
            </View>

            {hasRepair && (
              <TextInput 
                style={[styles.inputContainer, { marginTop: 8 }]} 
                placeholder="If yes, please describe briefly..." 
              />
            )}

            <View style={{ marginTop: 16 }}>
              <FunctionalDropdown 
                label="Overall Condition"
                value={condition}
                options={['Excellent', 'Good - Minor wear', 'Fair', 'Needs Repair']}
                onSelect={setCondition}
                placeholder="Select"
              />
            </View>
          </View>

          {/* 5. Sales Details */}
          <View style={styles.card}>
            <SectionHeader icon="sell" title="Sales Details" />

            <FunctionalDropdown 
                label="Reason for Selling"
                value={sellingReason}
                options={['Upgrading to new machine', 'Need Cash', 'Not using anymore']}
                onSelect={setSellingReason}
                placeholder="Select"
            />

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Asking Price</Text>
              <View style={styles.inputWrapperRelative}>
                <Text style={styles.currencyPrefix}>₹</Text>
                <TextInput 
                  style={[styles.inputContainer, { paddingLeft: 30, fontWeight: '600', fontSize: 16 }]} 
                  placeholder="0.00" 
                  keyboardType="numeric" 
                />
              </View>
            </View>

            <View style={[styles.rowBetween, { marginVertical: 8 }]}>
              <Text style={styles.labelDark}>Price negotiable?</Text>
              <Switch
                trackColor={{ false: "#e5e7eb", true: COLORS.primary }}
                thumbColor={"#fff"}
                onValueChange={setIsNegotiable}
                value={isNegotiable}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Available From</Text>
              <View style={styles.rowGap}>
                {/* Immediately Option */}
                <TouchableOpacity 
                  onPress={() => setAvailability('immediately')}
                  style={[styles.radioBoxRow, availability === 'immediately' && styles.radioBoxActive]}
                >
                  <View style={[styles.radioCircle, availability === 'immediately' && styles.radioCircleActive]} />
                  <Text style={styles.radioLabel}>Immediately</Text>
                </TouchableOpacity>

                {/* Calendar Option */}
                <TouchableOpacity 
                  onPress={() => {
                    setAvailability('select_date');
                    setShowDatePicker(true);
                  }}
                  style={[styles.radioBoxRow, availability === 'select_date' && styles.radioBoxActive]}
                >
                  <View style={[styles.radioCircle, availability === 'select_date' && styles.radioCircleActive]} />
                  <Text style={styles.radioLabel}>
                    {availability === 'select_date' ? selectedDate.toLocaleDateString() : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {/* Native Calendar Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </View>

          {/* 6. Location Accuracy */}
          <View style={styles.card}>
            <SectionHeader icon="location-on" title="Location Accuracy" />
            <View style={styles.mapPlaceholder}>
              <View style={styles.pinContainer}>
                <MaterialIcons name="location-on" size={40} color="#ef4444" />
                <View style={styles.pinLabel}>
                  <Text style={styles.pinText}>Sattur, TN</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.updatePinButton}>
                <MaterialIcons name="my-location" size={16} color="black" />
                <Text style={styles.updatePinText}>Update Pin</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                    <Text style={styles.labelSmall}>Village</Text>
                    <View style={styles.staticBox}><Text style={styles.staticText}>Sattur</Text></View>
                </View>
                <View style={styles.gridItem}>
                    <Text style={styles.labelSmall}>Taluka</Text>
                    <View style={styles.staticBox}><Text style={styles.staticText}>Virudhunagar</Text></View>
                </View>
                <View style={[styles.gridItem, { width: '100%' }]}>
                    <Text style={styles.labelSmall}>District</Text>
                    <View style={styles.staticBox}><Text style={styles.staticText}>Virudhunagar District</Text></View>
                </View>
            </View>
          </View>

          {/* 7. Ownership Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            activeOpacity={0.8}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <MaterialIcons name="check" size={16} color={COLORS.primary} />}
            </View>
            <Text style={styles.checkboxText}>
              I confirm this machine belongs to me or my family and all details provided are accurate.
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- Sticky Footer --- */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.nextButton} activeOpacity={0.9} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Next Step</Text>
          <MaterialIcons name="arrow-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// --- Reusable Logic Components ---

const SectionHeader = ({ icon, title }) => (
  <View style={styles.sectionHeader}>
    <MaterialIcons name={icon} size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

// New Functional Dropdown Component
const FunctionalDropdown = ({ label, placeholder, value, options, onSelect }) => {
    const [visible, setVisible] = useState(false);
  
    return (
      <View style={styles.fieldGroup}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableOpacity style={styles.inputContainer} activeOpacity={0.7} onPress={() => setVisible(true)}>
          <Text style={[styles.inputText, !value && { color: '#9ca3af' }]}>
            {value || placeholder}
          </Text>
          <MaterialIcons name="expand-more" size={24} color={COLORS.textSecondary} style={{ position: 'absolute', right: 12 }} />
        </TouchableOpacity>
  
        <Modal visible={visible} transparent animationType="fade">
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.modalItem} 
                    onPress={() => { onSelect(item); setVisible(false); }}
                  >
                    <Text style={[styles.modalItemText, item === value && { color: COLORS.primary, fontWeight: '700' }]}>
                        {item}
                    </Text>
                    {item === value && <MaterialIcons name="check" size={20} color={COLORS.primary} />}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  // Header
  appBar: {
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  appBarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  saveDraftText: {
    color: '#599a4c',
    fontWeight: '700',
    fontSize: 14,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  percentText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  // Content
  contentContainer: {
    padding: 16,
  },
  sectionSpacing: {
    marginBottom: 24,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  
  // Media Styling
  photoScroll: {
    marginTop: 12,
    paddingBottom: 4,
  },
  addPhotoBox: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderStyle: 'dashed', 
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  mediaPreview: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  videoIndicator: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },
  iconCircle: {
    backgroundColor: 'rgba(55, 236, 19, 0.1)',
    padding: 8,
    borderRadius: 50,
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Card & Forms
  card: {
    backgroundColor: COLORS.surfaceLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  labelDark: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  subTextSmall: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    height: 48,
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    color: COLORS.textMain,
    fontSize: 15,
  },
  inputText: {
    fontSize: 15,
    color: COLORS.textMain,
  },
  rowGap: {
    flexDirection: 'row',
    gap: 12,
  },

  // Modal / Dropdown
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.textMain,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.textMain,
  },

  // Radio Buttons
  radioGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  radioButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radioText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    borderStyle: 'dashed', 
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 12,
    opacity: 0.5
  },
  
  // Price
  inputWrapperRelative: {
    justifyContent: 'center',
  },
  currencyPrefix: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  radioBoxRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  radioBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(55, 236, 19, 0.05)',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#9ca3af',
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  
  // Map
  mapPlaceholder: {
    height: 128,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pinContainer: {
    alignItems: 'center',
  },
  pinLabel: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  pinText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  updatePinButton: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  updatePinText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
  },
  staticBox: {
    padding: 10,
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  staticText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  
  // Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    marginBottom: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  
  // Sticky Footer
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
});