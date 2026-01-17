import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // IMPT: Requires npx expo install @react-native-community/slider
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';

// --- Theme Constants ---


import { ICategory, ICategoryPillsProps, ICondition, IConditionListProps, IDistanceSliderProps, IPriceRangeProps, ISectionTitleProps } from '@/src/types/buy-machine/filters';


// --- Sub-Components ---

const Header = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{t('filters.title')}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.resetText}>{t('filters.reset')}</Text>
      </TouchableOpacity>
    </View>
  );
};


const SectionTitle = ({ title }: ISectionTitleProps) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);


const CategoryPills = ({ selected, onSelect }: ICategoryPillsProps) => {
  const { t } = useTranslation();

  const CATEGORIES: ICategory[] = [
    { id: 'tractor', label: t('machine_list.tractors'), icon: 'agriculture' },
    { id: 'harvester', label: t('machine_list.harvesters'), icon: 'local-shipping' },
    { id: 'plow', label: t('machine_list.plow' as any), icon: 'grass' },
    { id: 'seeder', label: t('machine_list.seeder' as any), icon: 'spa' },
    { id: 'trailer', label: t('machine_list.trailer' as any), icon: 'rv-hookup' },
    { id: 'tiller', label: t('machine_list.tiller' as any), icon: 'handyman' },
  ];

  return (
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
              <MaterialIcons name={cat.icon} size={20} color={COLORS.black} style={{ marginLeft: 6 }} />
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
};


const FunctionalDistanceSlider = ({ value, onValueChange }: IDistanceSliderProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.sectionPadding}>
      <View style={styles.flexRowBetween}>
        <SectionTitle title={t('filters.distance')} />
        <Text style={styles.sliderValueText}>{t('filters.within', { distance: Math.round(value) })}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={10}
          maximumValue={500}
          step={5}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor={COLORS.brand.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.brand.primary}
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


const PriceRange = ({ min, max, setMin, setMax }: IPriceRangeProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.sectionPadding}>
      <SectionTitle title={t('filters.price_range')} />

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
            <Text style={styles.floatingLabel}>{t('filters.min' as any)}</Text>
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
            <Text style={styles.floatingLabel}>{t('filters.max' as any)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


const ConditionList = ({ selected, onSelect }: IConditionListProps) => {
  const { t } = useTranslation();

  const CONDITIONS: ICondition[] = [
    {
      id: 'good',
      label: t('filters.good'),
      subLabel: t('filters.good_desc'),
      icon: 'thumb-up',
      colorBg: COLORS.successLight,
      colorText: COLORS.successDark,
    },
    {
      id: 'average',
      label: t('filters.average'),
      subLabel: t('filters.average_desc'),
      icon: 'handyman',
      colorBg: COLORS.warningLight,
      colorText: COLORS.warningDark,
    },
    {
      id: 'poor',
      label: t('filters.poor'),
      subLabel: t('filters.poor_desc'),
      icon: 'build-circle',
      colorBg: COLORS.dangerLight,
      colorText: COLORS.dangerDark,
    },
  ];

  return (
    <View style={styles.sectionPadding}>
      <SectionTitle title={t('filters.condition')} />
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
};

const Divider = () => <View style={styles.divider} />;

// --- Main Screen ---
export default function MachineFiltersScreen() {
  const insets = useSafeAreaInsets();

  const { t } = useTranslation();
  // State
  const [selectedCategory, setSelectedCategory] = useState('tractor');
  const [distance, setDistance] = useState(50); // Default 50km
  const [minPrice, setMinPrice] = useState('1500');
  const [maxPrice, setMaxPrice] = useState('12000');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('average');

  return (

    <View style={[styles.container]}>
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
          <SectionTitle title={t('filters.category')} />
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
            <Text style={styles.sectionTitle}>{t('filters.negotiable_only')}</Text>
            <Text style={styles.sectionSubtitle}>{t('filters.negotiable_desc')}</Text>
          </View>
          <Switch
            trackColor={{ false: COLORS.gray[200], true: COLORS.brand.primary }}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.gray[200]}
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
      <Button
        label={t('filters.show_machines', { count: 24 })}
        onPress={() => { }}
        icon="arrow-forward"
      />

    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal:16
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
    // paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.successDark,
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingTop: 24,
  },
  topSection: {
    // paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionPadding: {
    // paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    // marginHorizontal: 16,
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
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  categoryPillInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: COLORS.black,
  },
  categoryTextInactive: {
    color: COLORS.gray[700],
  },

  // Slider Styles
  sliderValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.successDark,
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
    color: COLORS.textLight,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 24,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  currencyPrefix: {
    position: 'absolute',
    left: 12,
    top: 13,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    zIndex: 1,
  },
  floatingLabelContainer: {
    position: 'absolute',
    top: -8,
    left: 8,
    backgroundColor: COLORS.background,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  floatingLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dashSeparator: {
    width: 16,
    height: 2,
    backgroundColor: COLORS.gray[300],
    borderRadius: 99,
  },

  // Condition Styles
  conditionContainer: {
    // flexDirection: 'col',
    gap: 12,
  },
  conditionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  conditionCardActive: {
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
  },
  conditionSubLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray[100],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.brand.primary,
  },

});