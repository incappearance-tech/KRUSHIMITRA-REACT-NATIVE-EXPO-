import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const PLANS = [
  {
    id: 'free',
    title: 'Trial Run',
    duration: 'Valid for 7 Days',
    price: 'FREE',
    oldPrice: '₹29',
    badge: '1 Left',
  },
  {
    id: '15days',
    title: 'Standard',
    duration: 'Valid for 15 Days',
    price: '₹49',
    valueLabel: '₹3.2/day',
  },
  {
    id: '30days',
    title: 'Premium Reach',
    duration: 'Valid for 30 Days',
    price: '₹99',
    valueLabel: 'Best Value',
    recommended: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                                  SCREEN                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('30days');

  const currentPlanData = useMemo(
    () => PLANS.find(p => p.id === selectedPlan) ?? PLANS[0],
    [selectedPlan]
  );

  const handlePayment = useCallback(() => {
    navigate('/sell-machine/payment-method');
    Alert.alert(
      'Processing',
      `Proceeding to pay ${currentPlanData.price} for the ${currentPlanData.title} plan.`
    );
  }, [currentPlanData]);

  return (
    <View style={styles.container}>
      <AppBar title="Select Plan" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <PromoBanner />

        <SectionHeader />

        <View style={styles.plansContainer}>
          {PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={plan.id === selectedPlan}
              onSelect={setSelectedPlan}
            />
          ))}
        </View>

        <Text style={styles.listHeader}>WHAT'S INCLUDED</Text>
        <View style={styles.featureBox}>
          <FeatureItem icon="visibility" label="Visible to 5000+ local farmers" />
          <FeatureItem icon="verified" label="Verified Seller Badge" />
          <FeatureItem icon="notifications-active" label="Instant Buyer Alerts" />
        </View>

        <TrustRow />

        <View style={{ height: 120 }} />
      </ScrollView>

      <Button
        label="Proceed to Pay"
        onPress={handlePayment}
        icon="arrow-forward"
      />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SUB COMPONENTS                                */
/* -------------------------------------------------------------------------- */

const PromoBanner = memo(() => (
  <View style={styles.promoBanner}>
    <View style={styles.promoIconCircle}>
      <MaterialCommunityIcons
        name="party-popper"
        size={20}
        color={COLORS.brand.primary}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.promoTitle}>First Listing Free!</Text>
      <Text style={styles.promoSubText}>
        As a welcome gift, your first machine listing is completely free.
        No payment required.
      </Text>
    </View>
  </View>
));

const SectionHeader = memo(() => (
  <View style={styles.sectionHeadingRow}>
    <MaterialIcons
      name="payments"
      size={20}
      color={COLORS.brand.primary}
    />
    <Text style={styles.sectionHeadingText}>Choose Duration</Text>
  </View>
));

const TrustRow = memo(() => (
  <View style={styles.trustRow}>
    <MaterialIcons name="lock" size={14} color={COLORS.textSecondary} />
    <Text style={styles.trustText}>
      Secure Payment & Instant Activation
    </Text>
  </View>
));

const FeatureItem = memo(({ icon, label }: any) => (
  <View style={styles.featureItem}>
    <MaterialIcons
      name={icon}
      size={22}
      color={COLORS.brand.primary}
      style={{ marginRight: 12 }}
    />
    <Text style={styles.featureText}>{label}</Text>
  </View>
));

const PlanCard = memo(({ plan, selected, onSelect }: any) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onSelect(plan.id)}
    style={[
      styles.planCard,
      selected && styles.planCardSelected,
      plan.recommended && { marginTop: 10 },
    ]}
  >
    {plan.recommended && (
      <View style={styles.recommendedFloatingBadge}>
        <MaterialIcons name="stars" size={14} color={COLORS.black} />
        <Text style={styles.recommendedFloatingText}>Recommended</Text>
      </View>
    )}

    <View style={styles.planCardContent}>
      <View style={styles.planCardLeft}>
        <View
          style={[
            styles.customRadio,
            selected && styles.customRadioActive,
          ]}
        >
          {selected && <View style={styles.customRadioInner} />}
        </View>

        <View>
          <View style={styles.planTitleRow}>
            <Text
              style={[
                styles.planTitleText,
                plan.id === '30days' && { fontSize: 18 },
              ]}
            >
              {plan.title}
            </Text>

            {plan.badge && (
              <View style={styles.trialBadge}>
                <Text style={styles.trialBadgeText}>{plan.badge}</Text>
              </View>
            )}
          </View>

          <Text style={styles.planDurationText}>{plan.duration}</Text>
        </View>
      </View>

      <View style={styles.planCardRight}>
        <Text
          style={[
            styles.planPriceText,
            plan.id === 'free' && { color: COLORS.brand.primary },
            plan.id === '30days' && { fontSize: 24 },
          ]}
        >
          {plan.price}
        </Text>

        {plan.oldPrice && (
          <Text style={styles.oldPriceText}>{plan.oldPrice}</Text>
        )}

        {plan.valueLabel && (
          <Text
            style={[
              styles.valueLabelText,
              plan.id === '30days' && {
                color: COLORS.success,
                fontWeight: '600',
              },
            ]}
          >
            {plan.valueLabel}
          </Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
));

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  promoBanner: {
    backgroundColor: COLORS.successLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(55,236,19,0.3)',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  promoIconCircle: {
    backgroundColor: 'rgba(55,236,19,0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },

  promoSubText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  sectionHeadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  plansContainer: {
    gap: 12,
    marginBottom: 28,
  },

  planCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  planCardSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: '#f0fdf4',
    elevation: 3,
  },

  recommendedFloatingBadge: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    backgroundColor: COLORS.brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 4,
  },

  recommendedFloatingText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.black,
  },

  planCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  planCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  planTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  trialBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  trialBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successDark,
  },

  planDurationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  planCardRight: { alignItems: 'flex-end' },

  planPriceText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  oldPriceText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },

  valueLabelText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  customRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  customRadioActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.primary,
  },

  customRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
  },

  listHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  featureBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    opacity: 0.7,
  },

  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
