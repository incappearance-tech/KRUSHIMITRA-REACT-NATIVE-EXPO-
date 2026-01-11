import Button from '@/src/components/Button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';
import { useTranslation } from 'react-i18next';
import AppBar from '@/src/components/AppBar';

export default function SelectPlanScreen() {
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState('premium');

  const localizedPlans = [
    {
      id: 'basic',
      title: t('publish.plans.basic.title'),
      subtitle: t('publish.plans.basic.subtitle'),
      price: 'FREE',
      features: [
        { icon: 'check-circle', text: t('publish.plans.basic.features.listing'), highlight: false },
        { icon: 'calendar-today', text: t('publish.plans.basic.features.validity'), highlight: false },
      ],
    },
    {
      id: 'standard',
      title: t('publish.plans.standard.title'),
      subtitle: t('publish.plans.standard.subtitle'),
      price: '₹49',
      features: [
        { icon: 'visibility', text: t('publish.plans.standard.features.visibility'), highlight: false },
        { icon: 'calendar-today', text: t('publish.plans.standard.features.validity'), highlight: false },
      ],
    },
    {
      id: 'premium',
      title: t('publish.plans.premium.title'),
      subtitle: t('publish.plans.premium.subtitle'),
      price: '₹99',
      recommended: true,
      featuredIcon: 'stars',
      features: [
        { icon: 'verified', text: t('publish.plans.premium.features.featured'), highlight: true },
        { icon: 'trending-up', text: t('publish.plans.premium.features.priority'), highlight: false },
        { icon: 'calendar-today', text: t('publish.plans.premium.features.validity'), highlight: false },
      ],
    },
  ];

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <AppBar title={t('publish.title')} />

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* TITLE */}
        <Text style={styles.title}>
          {t('publish.choose_plan')}
        </Text>
        <Text style={styles.subtitle}>
          {t('publish.select_duration')}
        </Text>

        {/* PLAN CARDS */}
        <View style={styles.planList}>
          {localizedPlans.map(plan => {
            const selected = selectedPlanId === plan.id;

            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.9}
                onPress={() => setSelectedPlanId(plan.id)}
                style={[
                  styles.planCard,
                  selected && styles.planSelected,
                  plan.recommended && selected && styles.planHighlight,
                ]}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>{t('publish.recommended')}</Text>
                  </View>
                )}

                {/* Top row */}
                <View style={styles.planTop}>
                  <View>
                    <View style={styles.planTitleRow}>
                      <Text style={styles.planTitle}>{plan.title}</Text>
                      {plan.featuredIcon && (
                        <MaterialIcons
                          name={plan.featuredIcon as any}
                          size={20}
                          color={COLORS.brand.primary}
                        />
                      )}
                    </View>
                    <Text style={styles.planSub}>{plan.subtitle}</Text>
                  </View>

                  <View style={styles.priceRow}>
                    <Text
                      style={[
                        styles.price,
                        plan.recommended && styles.priceHighlight,
                      ]}
                    >
                      {plan.price}
                    </Text>

                    <View
                      style={[
                        styles.radio,
                        selected && styles.radioSelected,
                      ]}
                    >
                      {selected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Features */}
                {plan.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <MaterialIcons
                      name={f.icon as any}
                      size={18}
                      color={f.highlight ? COLORS.brand.primary : COLORS.textSecondary}
                    />
                    <Text style={styles.featureText}>{f.text}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color="#618968" />
          <Text style={styles.infoText}>
            {t('publish.terms_info')}
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
     
          <Button
            label={t('publish.proceed_to_pay')}
            onPress={() => router.push("/(farmer)/sell-machine/payment-method")}
            icon="arrow-forward"
          />
       
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal:16
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'rgba(246,248,246,0.95)',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },

  /* CONTENT */
  content: {
    paddingBottom: 140,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111812',
  },

  subtitle: {
    fontSize: 14,
    color: '#618968',
    marginTop: 8,
    marginBottom: 24,
  },

  /* PLAN LIST */
  planList: {
    gap: 16,
  },

  planCard: {
    position: 'relative',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DBE6DD',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  planSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },

  planHighlight: {
    shadowColor: COLORS.brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },

  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: 16,
    backgroundColor: COLORS.brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 10,
  },

  recommendedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#102213',
  },

  planTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },

  planSub: {
    fontSize: 13,
    color: '#618968',
    marginTop: 2,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },

  priceHighlight: {
    fontSize: 22,
    color: COLORS.brand.primary,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#DBE6DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  divider: {
    height: 1,
    backgroundColor: '#DBE6DD',
    marginVertical: 12,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  featureText: {
    fontSize: 13,
    color: '#111812',
  },

  /* INFO */
  infoBox: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },

  infoText: {
    fontSize: 12,
    color: '#618968',
    lineHeight: 18,
    flex: 1,
  },

  /* FOOTER */
 
  cta: {
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },
})
