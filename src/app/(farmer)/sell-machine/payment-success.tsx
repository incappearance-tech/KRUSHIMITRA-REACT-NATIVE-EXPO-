import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import { IBadgeProps, IDetailRowProps } from '@/src/types/sell-machine/payment-success';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';

/* -------------------------------------------------------------------------- */
/*                                  SCREEN                                    */
/* -------------------------------------------------------------------------- */

import { useTranslation } from 'react-i18next';

export default function PaymentSuccessScreen() {
  const { t } = useTranslation();
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pingAnim, {
          toValue: 1.4,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pingAnim, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, pingAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppBar title={t('sell_payment.success.confirmation')} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success */}
        <Animated.View
          style={[
            styles.successSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.pingCircle,
                {
                  transform: [{ scale: pingAnim }],
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.4],
                  }),
                },
              ]}
            />
            <View style={styles.mainCheckCircle}>
              <MaterialIcons
                name="check-circle"
                size={56}
                color={COLORS.brand.primary}
              />
            </View>
          </View>

          <Text style={styles.successTitle}>{t('sell_payment.success.title')}</Text>
          <Text style={styles.successSubtitle}>
            {t('sell_payment.success.subtitle')}
          </Text>
        </Animated.View>

        {/* Receipt */}
        <View style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptLabel}>{t('sell_payment.success.total_paid')}</Text>
            <Text style={styles.receiptAmount}>₹ 499.00</Text>
          </View>

          <View style={styles.receiptBody}>
            <DetailRow label={t('sell_payment.success.transaction_id')} value="#TRX-8923492" mono />
            <DetailRow label={t('dashboard.activity.date')} value="Oct 24, 2024, 10:30 AM" />
            <DetailRow
              label={t('sell_payment.methods.card.title')}
              value="HDFC **** 4582"
              icon="credit-card"
            />
          </View>

          <View style={styles.cutoutContainer}>
            <View style={[styles.cutoutCircle, { left: -10 }]} />
            <View style={styles.dashedLine} />
            <View style={[styles.cutoutCircle, { right: -10 }]} />
          </View>
        </View>

        {/* Benefit */}
        <View style={styles.benefitSection}>
          <Text style={styles.sectionHeader}>{t('sell_payment.success.unlocked_benefit')}</Text>

          <View style={styles.benefitCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1594913785162-e6785b423cb1',
              }}
              style={styles.benefitImage}
            />

            <View style={styles.benefitInfo}>
              <Text style={styles.benefitTitle}>
                John Deere Tractor 5050D
              </Text>
              <Text style={styles.benefitStatus}>
                {t('sell_machine.publish.premium_plan')} - {t('sell_payment.success.status_live')}
              </Text>

              <View style={styles.badgeRow}>
                <Badge
                  icon="calendar-today"
                  text={t('sell_payment.success.expires_on', { date: 'Nov 23' })}
                  bg="#dcfce7"
                  color="#15803d"
                />
                <Badge
                  icon="check-circle"
                  text={t('sell_payment.success.status_active')}
                  bg={COLORS.brand.muted}
                  color="#051103"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button label={t('sell_machine.listing_details')} icon="arrow-forward" onPress={() => router.push('/(farmer)/sell-machine/listing-details')} />
        <Button
          label={t('sell_payment.success.back_to_dashboard')}
          type="secondary"
          onPress={() => router.replace("/(farmer)/")}
        />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */


const DetailRow = ({ label, value, mono, icon }: IDetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.detailValueContainer}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={14}
          color={COLORS.textSecondary}
          style={{ marginRight: 6 }}
        />
      )}
      <Text style={[styles.detailValue, mono && styles.monoText]}>
        {value}
      </Text>
    </View>
  </View>
);

const Badge = ({
  icon,
  text,
  bg,
  color,
}: IBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: bg }]}>
    <MaterialIcons name={icon} size={12} color={color} />
    <Text style={[styles.badgeText, { color }]}>{text}</Text>
  </View>
);

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background ,paddingHorizontal: 16},

  scrollContent: { paddingBottom: 40,  },

  successSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  iconContainer: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  mainCheckCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.brand.muted,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  pingCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.brand.primary,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },

  successSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
    maxWidth: 280,
    textAlign: 'center',
  },

  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    elevation: 2,
  },

  receiptHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  receiptLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  receiptAmount: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },

  receiptBody: {
    padding: 20,
    gap: 12,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  monoText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },

  cutoutContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cutoutCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    zIndex: 5,
  },

  dashedLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    marginHorizontal: 15,
  },

  benefitSection: {
    marginTop: 32,
  },

  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: 12,
    paddingLeft: 4,
  },

  benefitCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  benefitImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  benefitInfo: {
    flex: 1,
    marginLeft: 16,
  },

  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  benefitStatus: {
    fontSize: 13,
    color: COLORS.brand.primary,
    fontWeight: '600',
    marginTop: 2,
  },

  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  footer: {
    backgroundColor: COLORS.background,
    gap: 12,
  },
});
