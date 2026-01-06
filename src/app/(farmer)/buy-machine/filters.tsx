import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider'; // IMPT: Requires npx expo install @react-native-community/slider

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  primaryDark: '#2ebd10',
  backgroundLight: '#f6f8f6',
  surfaceWhite: '#ffffff',
  textDark: '#101b0d',
  textGray: '#6b7280',
  border: '#e5e7eb',
  
  // Condition Colors
  greenBg: '#dcfce7',
  greenText: '#15803d',
  yellowBg: '#fef9c3',
  yellowText: '#a16207',
  redBg: '#fee2e2',
  redText: '#b91c1c',
};

// --- Mock Data ---
const CATEGORIES = [
  { id: 'tractor', label: 'Tractor', icon: 'agriculture' },
  { id: 'harvester', label: 'Harvester', icon: 'local-shipping' },
  { id: 'plow', label: 'Plow', icon: 'grass' },
  { id: 'seeder', label: 'Seeder', icon: 'spa' },
  { id: 'trailer', label: 'Trailer', icon: 'rv-hookup' },
  { id: 'tiller', label: 'Tiller', icon: 'handyman' },
];

const CONDITIONS = [
  {
    id: 'good',
    label: 'Good',
    subLabel: 'Minimal wear, ready to work',
    icon: 'thumb-up',
    colorBg: COLORS.greenBg,
    colorText: COLORS.greenText,
  },
  {
    id: 'average',
    label: 'Average',
    subLabel: 'Normal wear, needs minor fixes',
    icon: 'handyman',
    colorBg: COLORS.yellowBg,
    colorText: COLORS.yellowText,
  },
  {
    id: 'poor',
    label: 'Poor',
    subLabel: 'Significant repairs required',
    icon: 'build-circle',
    colorBg: COLORS.redBg,
    colorText: COLORS.redText,
  },
];

// --- Sub-Components ---

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Filters</Text>
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.resetText}>Reset</Text>
    </TouchableOpacity>
  </View>
);

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const CategoryPills = ({ selected, onSelect }) => (
  <View style={styles.categoryContainer}>
    {CATEGORIES.map((cat) => {
      const isSelected = selected === cat.id;
      return (
        <TouchableOpacity
          key={cat.id}
          activeOpacity={0.8}
          onPress={() => onSelect(cat.id)}
          style={[
            styles.categoryPill,
            isSelected ? styles.categoryPillActive : styles.categoryPillInactive,
          ]}
        >
          {isSelected && (
            <MaterialIcons name={cat.icon} size={20} color="#000" style={{ marginRight: 6 }} />
          )}
          <Text
            style={[
              styles.categoryText,
              isSelected ? styles.categoryTextActive : styles.categoryTextInactive,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const FunctionalDistanceSlider = ({ value, onValueChange }) => {
  return (
    <View style={styles.sectionPadding}>
      <View style={styles.flexRowBetween}>
        <SectionTitle title="Distance" />
        <Text style={styles.sliderValueText}>Within {Math.round(value)} km</Text>
      </View>
      
      {/* This is the Functional Slider 
        Requires: npx expo install @react-native-community/slider
      */}
      <View style={styles.sliderContainer}>
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={10}
            maximumValue={500}
            step={5}
            value={value}
            onValueChange={onValueChange}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor={COLORS.border}
            thumbTintColor={COLORS.primary}
            // Android styling props to make the thumb bigger/shadowed
            thumbImage={Platform.OS === 'android' ? undefined : undefined} 
        />
      </View>

      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabelText}>10 km</Text>
        <Text style={styles.sliderLabelText}>100 km</Text>
        <Text style={styles.sliderLabelText}>500 km</Text>
      </View>
    </View>
  );
};

const PriceRange = ({ min, max, setMin, setMax }) => {
  return (
    <View style={styles.sectionPadding}>
      <SectionTitle title="Price Range" />
      
      <View style={styles.priceInputRow}>
        <View style={styles.priceInputWrapper}>
          <Text style={styles.currencyPrefix}>$</Text>
          <TextInput
            style={styles.priceInput}
            value={min}
            onChangeText={setMin}
            keyboardType="numeric"
          />
          <View style={styles.floatingLabelContainer}>
             <Text style={styles.floatingLabel}>MIN</Text>
          </View>
        </View>
        
        <View style={styles.dashSeparator} />

        <View style={styles.priceInputWrapper}>
          <Text style={styles.currencyPrefix}>$</Text>
          <TextInput
            style={styles.priceInput}
            value={max}
            onChangeText={setMax}
            keyboardType="numeric"
          />
          <View style={styles.floatingLabelContainer}>
             <Text style={styles.floatingLabel}>MAX</Text>
          </View>
        </View>
      </View>

      {/* NOTE: A true "Dual Thumb" slider requires complex custom gestures 
         or libraries like '@ptomasroos/react-native-multi-slider'.
         For a single file solution, we keep the inputs as the primary driver.
      */}
    </View>
  );
};

const ConditionList = ({ selected, onSelect }) => (
  <View style={styles.sectionPadding}>
    <SectionTitle title="Condition" />
    <View style={styles.conditionContainer}>
      {CONDITIONS.map((item) => {
          const isSelected = selected === item.id;
          return (
              <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => onSelect(item.id)}
                  style={[
                      styles.conditionCard,
                      isSelected && styles.conditionCardActive
                  ]}
              >
                  <View style={styles.conditionContent}>
                      <View style={[styles.iconCircle, { backgroundColor: item.colorBg }]}>
                          <MaterialIcons name={item.icon} size={20} color={item.colorText} />
                      </View>
                      <View style={styles.conditionTextContainer}>
                          <Text style={styles.conditionLabel}>{item.label}</Text>
                          <Text style={styles.conditionSubLabel}>{item.subLabel}</Text>
                      </View>
                  </View>
                  
                  <View style={styles.radioOuter}>
                      {isSelected && <View style={styles.radioInner} />}
                  </View>
              </TouchableOpacity>
          )
      })}
    </View>
  </View>
);

const Divider = () => <View style={styles.divider} />;

// --- Main Screen ---
export default function MachineFiltersScreen() {
  const insets = useSafeAreaInsets();
  
  // State
  const [selectedCategory, setSelectedCategory] = useState('tractor');
  const [distance, setDistance] = useState(50); // Default 50km
  const [minPrice, setMinPrice] = useState('1500');
  const [maxPrice, setMaxPrice] = useState('12000');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('average');

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="dark" backgroundColor="rgba(246, 248, 246, 0.95)" />
        
        {/* Sticky Header */}
        <View style={styles.stickyHeader}>
          <Header />
        </View>

        <ScrollView 
            contentContainerStyle={[
                styles.scrollContent, 
                { paddingBottom: insets.bottom + 80 }
            ]}
            showsVerticalScrollIndicator={false}
        >
          {/* Category Section */}
          <View style={styles.topSection}>
            <SectionTitle title="Category" />
            <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
          </View>

          <Divider />

          {/* Functional Distance Slider */}
          <FunctionalDistanceSlider 
             value={distance} 
             onValueChange={setDistance} 
          />

          <Divider />

          {/* Price Section */}
          <PriceRange 
            min={minPrice} 
            max={maxPrice} 
            setMin={setMinPrice} 
            setMax={setMaxPrice} 
          />

          <Divider />

          {/* Negotiable Section */}
          <View style={[styles.sectionPadding, styles.flexRowBetween]}>
            <View>
              <Text style={styles.sectionTitle}>Negotiable only</Text>
              <Text style={styles.sectionSubtitle}>Show prices that can be bargained</Text>
            </View>
            <Switch
              trackColor={{ false: '#e5e7eb', true: COLORS.primary }}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#e5e7eb"
              onValueChange={() => setIsNegotiable(!isNegotiable)}
              value={isNegotiable}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} 
            />
          </View>

          <Divider />

          {/* Condition Section */}
          <ConditionList selected={selectedCondition} onSelect={setSelectedCondition} />

        </ScrollView>

        {/* Fixed Footer */}
        <View style={[styles.footer, { paddingBottom: Math.max(16, insets.bottom) }]}>
          <TouchableOpacity style={styles.footerButton} activeOpacity={0.9}>
            <Text style={styles.footerButtonText}>Show 24 Machines</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  stickyHeader: {
    backgroundColor: 'rgba(246, 248, 246, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
    zIndex: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.greenText,
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingTop: 24,
  },
  topSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textGray,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
    marginVertical: 24,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Category Styles
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  categoryPillInactive: {
    backgroundColor: COLORS.surfaceWhite,
    borderColor: COLORS.border,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#000000',
  },
  categoryTextInactive: {
    color: '#374151',
  },

  // Slider Styles
  sliderValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.greenText,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginTop: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  sliderLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },

  // Price Input Styles
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  priceInputWrapper: {
    flex: 1,
    position: 'relative',
  },
  priceInput: {
    width: '100%',
    backgroundColor: COLORS.surfaceWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 24,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  currencyPrefix: {
    position: 'absolute',
    left: 12,
    top: 13,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textGray,
    zIndex: 1,
  },
  floatingLabelContainer: {
    position: 'absolute',
    top: -8,
    left: 8,
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  floatingLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dashSeparator: {
    width: 16,
    height: 2,
    backgroundColor: '#d1d5db',
    borderRadius: 99,
  },

  // Condition Styles
  conditionContainer: {
    flexDirection: 'col',
    gap: 12,
  },
  conditionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  conditionCardActive: {
    backgroundColor: '#ffffff',
  },
  conditionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionTextContainer: {
    flexDirection: 'column',
  },
  conditionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  conditionSubLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textGray,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16,
    zIndex: 30,
  },
  footerButton: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginRight: 8,
  },
});