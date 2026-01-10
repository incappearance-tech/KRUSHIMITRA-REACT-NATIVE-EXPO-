import AvailabilityPicker from '@/src/components/AvailabilityPicker';
import Button from '@/src/components/Button';
import FormCheckbox from '@/src/components/FormCheckbox';
import FormDropdown from '@/src/components/FormDropdown';
import FormInput from '@/src/components/FormInput';
import FormSwitch from '@/src/components/FormSwitch';
import MediaUploader from '@/src/components/MediaUploader';
import RadioGroup from '@/src/components/RadioGroup';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../../constants/colors';

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
  const [availability, setAvailability] = useState({ key: 'immediately' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- Handlers ---

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

  const { control, watch } = useForm({
    defaultValues: {
      isNegotiable: false,
      hasRepair: false,
      repairDetails: '',
      category: '',
      subCategory: '',
      brand: '',
      model: '',
      year: '',
      serialNo: '',
      condition: '',
      sellingReason: '',
      usageLevel: '',
      isChecked: false,
      availability: { key: 'immediately' },
      selectedDate: new Date(),
      showDatePicker: false,
      ownershipConfirmed: false,
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- Top App Bar --- */}
      <View style={styles.appBar}>
        <View style={styles.appBarTop}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
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
          <MediaUploader
            title="Upload Photos"
            onChange={(val) => setMedia(val)}
            min={2}
            max={5}
          />

          {/* 2. Category Section */}
          <View style={styles.card}>
            <SectionHeader icon="category" title="Category" />

            <FormDropdown
              label="Category"
              options={['Tractor', 'Harvester', 'Implements', 'Seeds']}
              placeholder="Select Category"
              control={control}
              name="category"

            />

            <FormDropdown
              control={control}
              name="subCategory"
              label="Sub-Category"
              options={['4WD', 'Mini Tractor', 'Utility', 'Row Crop']}
              placeholder="Select Sub-Category"
            />
          </View>

          {/* 3. Machine Identity */}
          <View style={styles.card}>
            <SectionHeader icon="fingerprint" title="Machine Identity" />

            <View style={styles.fieldGroup}>
              <FormInput
                control={control}
                name="brand"
                label="Brand"
                placeholder="e.g. Mahindra, John Deere"
              />
            </View>

            <View style={styles.fieldGroup}>
              <FormInput
                control={control}
                name="model"
                label="Model Name/Number"
                placeholder="e.g. 575 DI"
              />
            </View>

            <View style={styles.rowGap}>
              <View style={{ flex: 1 }}>
                <FormDropdown
                  label="Year of Purchase"
                  options={['2024', '2023', '2022', '2021', '2020']}
                  placeholder="Select"
                  control={control}
                  name="year"
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  control={control}
                  name="serialNo"
                  label="Serial No. (Last 4)"
                  placeholder="XXXX"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          {/* 4. Usage & Condition */}
          <View style={styles.card}>
            <SectionHeader icon="build" title="Usage & Condition" />

            <RadioGroup
              label="Usage Level"
              value={usageLevel}
              options={[{ label: "Light", value: "light" }, { label: "Medium", value: "medium" }, { label: "Heavy", value: "heavy" }]}
              onChange={setUsageLevel}
            />
            <View style={styles.divider} />

            <View style={[styles.rowBetween, { marginVertical: 8 }]}>
              <View>
                <Text style={styles.labelDark}>Any major repair done?</Text>
                <Text style={styles.subTextSmall}>Engine, Transmission, etc.</Text>
              </View>
              <FormSwitch
                control={control}
                name="hasRepair"
              // label="Price negotiable?"
              // disabled={isNegotiable}
              />
            </View>

            {watch('hasRepair') && (
              <FormInput
                control={control}
                name="repairDetails"
                label="Repair Details"
                placeholder="Enter repair details"
              />
            )}

            <View style={{ marginTop: 16 }}>
              <FormDropdown
                label="Overall Condition"
                options={['Excellent', 'Good - Minor wear', 'Fair', 'Needs Repair']}
                placeholder="Select"
                control={control}
                name="condition"
              />
            </View>
          </View>

          {/* 5. Sales Details */}
          <View style={styles.card}>
            <SectionHeader icon="sell" title="Sales Details" />

            <FormDropdown
              label="Reason for Selling"
              options={['Upgrading to new machine', 'Need Cash', 'Not using anymore']}
              placeholder="Select"
              control={control}
              name="sellingReason"
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
              <FormSwitch
                control={control}
                name="isNegotiable"
              // label="Price negotiable?"
              // disabled={isNegotiable}
              />
            </View>

            <AvailabilityPicker
              label="Available From"
              value={availability}
              onChange={setAvailability}
              options={[
                { type: 'static', key: 'immediately', label: 'Immediately' },
                { type: 'date', key: 'select_date', label: 'Select Date' },
              ]}
            />;
          </View>

          {/* 6. Location Accuracy */}
          <View style={styles.card}>
            <SectionHeader icon="location-on" title="Location Accuracy" />
            <View style={styles.mapPlaceholder}>
              <View style={styles.pinContainer}>
                <MaterialIcons name="location-on" size={40} color={COLORS.danger} />
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
          <FormCheckbox
            control={control}
            name="ownershipConfirmed"
            label="I confirm this machine belongs to me or my family and all details provided are accurate."
          />

        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- Sticky Footer --- */}
      <Button
        label="Next Step"
        onPress={handleNextStep}
        sticky
      />

    </SafeAreaView>
  );
}

// --- Reusable Logic Components ---

const SectionHeader = ({ icon, title }) => (
  <View style={styles.sectionHeader}>
    <MaterialIcons name={icon} size={20} color={COLORS.brand.primary} style={{ marginRight: 8 }} />
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
                  <Text style={[styles.modalItemText, item === value && { color: COLORS.brand.primary, fontWeight: '700' }]}>
                    {item}
                  </Text>
                  {item === value && <MaterialIcons name="check" size={20} color={COLORS.brand.primary} />}
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
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
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
    color: COLORS.brand.primary,
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
    backgroundColor: COLORS.brand.primary,
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
    color: COLORS.text,
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
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.danger,
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
    color: COLORS.brand.primary,
    fontWeight: '500',
  },

  // Card & Forms
  card: {
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
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
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    color: COLORS.text,
    fontSize: 15,
  },
  inputText: {
    fontSize: 15,
    color: COLORS.text,
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
    color: COLORS.text,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.text,
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
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
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
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
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
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.text,
  },

  // Map
  mapPlaceholder: {
    height: 128,
    backgroundColor: COLORS.gray[200],
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
    color: COLORS.text,
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
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  staticText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});