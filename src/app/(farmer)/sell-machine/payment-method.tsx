import React, { useCallback, useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import {
  IPaymentOptionProps,
  PaymentMethod,
} from '@/src/types/sell-machine/payment-method';

import { COLORS } from '../../../constants/colors';

/* -------------------------------------------------------------------------- */
/*                                  SCREEN                                    */
/* -------------------------------------------------------------------------- */

export default function CheckoutScreen() {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [loading, setLoading] = useState(false);

  const handlePay = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/(farmer)/sell-machine/payment-success');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <AppBar title={t('sell_payment.title')} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <Card>
          <View style={styles.summaryWatermark}>
            <MaterialIcons
              name="receipt-long"
              size={80}
              color={COLORS.brand.primary}
            />
          </View>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>
              {t('sell_payment.total_payable')}
            </Text>
            <Text style={styles.summaryAmount}>₹ 499.00</Text>

            <View style={styles.dashedLine} />

            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>{t('sell_payment.order_id')}</Text>
              <Text style={styles.rowValue}>#TRAC-882</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>{t('sell_payment.item')}</Text>
              <Text style={styles.rowValue}>
                {t('sell_payment.listing_fee_tractor')}
              </Text>
            </View>
          </View>
        </Card>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>
          {t('sell_payment.select_method')}
        </Text>

        <View style={styles.methodsList}>
          <PaymentOption
            id="upi"
            icon="account-balance-wallet"
            title={t('sell_payment.methods.upi.title')}
            subtitle={t('sell_payment.methods.upi.subtitle')}
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />

          <PaymentOption
            id="card"
            icon="credit-card"
            title={t('sell_payment.methods.card.title')}
            subtitle={t('sell_payment.methods.card.subtitle')}
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />

          <PaymentOption
            id="netbanking"
            icon="account-balance"
            title={t('sell_payment.methods.netbanking.title')}
            subtitle={t('sell_payment.methods.netbanking.subtitle')}
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View>
        <View style={styles.securityBadge}>
          <MaterialIcons name="lock" size={14} color={COLORS.success} />
          <Text style={styles.securityText}>
            {t('sell_payment.secure_payment')}
          </Text>
        </View>

        <Button
          label={t('sell_payment.pay_amount', { amount: '₹ 499.00' })}
          onPress={handlePay}
          loading={loading}
          icon="arrow-forward"
        />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PAYMENT OPTION                                  */
/* -------------------------------------------------------------------------- */

const PaymentOption = ({
  id,
  icon,
  title,
  subtitle,
  selected,
  onSelect,
}: IPaymentOptionProps) => {
  const isSelected = selected === id;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(id)}
      style={[
        styles.methodCard,
        isSelected ? styles.methodCardActive : styles.methodCardInactive,
      ]}
    >
      <View
        style={[
          styles.methodIconContainer,
          isSelected && styles.methodIconActive,
        ]}
      >
        <MaterialIcons
          name={icon}
          size={24}
          color={isSelected ? COLORS.brand.primary : COLORS.textSecondary}
        />
      </View>

      <View style={styles.methodTextContainer}>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodSubtitle}>{subtitle}</Text>
      </View>

      <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  scrollBody: { paddingBottom: 150 },

  summaryWatermark: {
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 0.1,
  },

  summaryContent: { alignItems: 'center' },

  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  summaryAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },

  dashedLine: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    marginVertical: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },

  rowLabel: { fontSize: 14, color: COLORS.textSecondary },
  rowValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },

  methodsList: { gap: 12 },

  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
  },

  methodCardActive: { borderColor: COLORS.brand.primary },
  methodCardInactive: { borderColor: 'transparent' },

  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  methodIconActive: { backgroundColor: '#e9f3e7' },

  methodTextContainer: { flex: 1, marginLeft: 16 },

  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },

  methodSubtitle: { fontSize: 12, color: COLORS.textSecondary },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterActive: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.primary,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },

  securityBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    alignItems: 'center',
  },

  securityText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
    marginLeft: 6,
  },
});
