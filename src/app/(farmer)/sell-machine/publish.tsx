import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import { IFeatureItemProps, IPlan, IPlanCardProps } from '@/src/types/sell-machine/publish';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

export default function App() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState('30days');

  const PLANS: IPlan[] = [
    {
      id: 'free',
      title: t('publish.trial_run'),
      duration: t('publish.valid_7_days'),
      price: 'FREE',
      oldPrice: '₹29',
      badge: t('publish.one_left'),
    },
    {
      id: '15days',
      title: t('publish.standard'),
      duration: t('publish.valid_15_days'),
      price: '₹49',
      valueLabel: '₹3.2/day',
    },
    {
      id: '30days',
      title: t('publish.premium_reach'),
      duration: t('publish.valid_30_days'),
      price: '₹99',
      valueLabel: t('publish.best_value'),
      recommended: true,
    },
  ];

  const currentPlanData = useMemo(
    () => PLANS.find(p => p.id === selectedPlan) ?? PLANS[0],
    [selectedPlan]
  );

  const handlePayment = useCallback(() => {
    router.push('/(farmer)/sell-machine/select-plan');
    Alert.alert(
      t('publish.processing'),
      t('publish.proceeding_to_pay', { price: currentPlanData.price, title: currentPlanData.title })
    );
  }, [currentPlanData, t]);

  return (
    <View style={styles.container}>
      <AppBar title={t('publish.title')} />

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

        <Text style={styles.listHeader}>{t('publish.whats_included')}</Text>
        <View style={styles.featureBox}>
          <FeatureItem icon="visibility" label={t('publish.visible_to')} />
          <FeatureItem icon="verified" label={t('publish.verified_badge')} />
          <FeatureItem icon="notifications-active" label={t('publish.buyer_alerts')} />
        </View>

        <TrustRow />

        <View style={{ height: 120 }} />
      </ScrollView>

      <Button
        label={t('publish.proceed_to_pay')}
        onPress={handlePayment}
        icon="arrow-forward"
      />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SUB COMPONENTS                                */
/* -------------------------------------------------------------------------- */

const PromoBanner = memo(() => {
  const { t } = useTranslation();
  return (
    <View style={styles.promoBanner}>
      <View style={styles.promoIconCircle}>
        <MaterialCommunityIcons
          name="party-popper"
          size={20}
          color={COLORS.brand.primary}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.promoTitle}>{t('publish.first_listing_free')}</Text>
        <Text style={styles.promoSubText}>
          {t('publish.welcome_gift')}
        </Text>
      </View>
    </View>
  );
});

const SectionHeader = memo(() => {
  const { t } = useTranslation();
  return (
    <View style={styles.sectionHeadingRow}>
      <MaterialIcons
        name="payments"
        size={20}
        color={COLORS.brand.primary}
      />
      <Text style={styles.sectionHeadingText}>{t('publish.choose_duration')}</Text>
    </View>
  );
});

const TrustRow = memo(() => {
  const { t } = useTranslation();
  return (
    <View style={styles.trustRow}>
      <MaterialIcons name="lock" size={14} color={COLORS.textSecondary} />
      <Text style={styles.trustText}>
        {t('publish.secure_payment')}
      </Text>
    </View>
  );
});

const FeatureItem = memo(({ icon, label }: IFeatureItemProps) => (
  <View style={styles.featureItem}>
    <MaterialIcons
      name={icon as any}
      size={22}
      color={COLORS.brand.primary}
      style={{ marginRight: 12 }}
    />
    <Text style={styles.featureText}>{label}</Text>
  </View>
));

const PlanCard = memo(({ plan, selected, onSelect }: IPlanCardProps) => {
  const { t } = useTranslation();
  return (
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
          <Text style={styles.recommendedFloatingText}>{t('publish.recommended')}</Text>
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
  );
});

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal:16 },

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
