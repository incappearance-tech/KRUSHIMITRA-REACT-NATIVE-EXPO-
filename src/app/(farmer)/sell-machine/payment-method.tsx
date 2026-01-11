import Button from '@/src/components/Button';
import AppBar from '@/src/components/AppBar';
import Card from '@/src/components/Card';

import { MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type PaymentMethod = 'upi' | 'card' | 'netbanking';

interface PaymentOptionProps {
  id: PaymentMethod;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  selected: PaymentMethod;
  onSelect: (id: PaymentMethod) => void;
}

/* -------------------------------------------------------------------------- */
/*                                  SCREEN                                    */
/* -------------------------------------------------------------------------- */

export default function CheckoutScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handlePay = useCallback(() => {
    setLoading(true);
    navigate('/sell-machine/payment-success');

    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);

      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, []);

  if (isSuccess) {
    return (
      <View style={styles.successOverlay}>
        <StatusBar barStyle="dark-content" />
        <Animated.View
          style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <MaterialIcons
            name="check-circle"
            size={100}
            color={COLORS.brand.primary}
          />
        </Animated.View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSub}>Your listing is now live.</Text>
        <Button label="Back to Dashboard" onPress={() => setIsSuccess(false)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar title="Payment Method" />

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
            <Text style={styles.summaryLabel}>Total Payable</Text>
            <Text style={styles.summaryAmount}>₹ 499.00</Text>

            <View style={styles.dashedLine} />

            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>Order ID</Text>
              <Text style={styles.rowValue}>#TRAC-882</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>Item</Text>
              <Text style={styles.rowValue}>Listing Fee (Tractor)</Text>
            </View>
          </View>
        </Card>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        <View style={styles.methodsList}>
          <PaymentOption
            id="upi"
            icon="account-balance-wallet"
            title="UPI Apps"
            subtitle="GPay, PhonePe, Paytm"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />

          <PaymentOption
            id="card"
            icon="credit-card"
            title="Debit / Credit Card"
            subtitle="Visa, MasterCard, Rupay"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />

          <PaymentOption
            id="netbanking"
            icon="account-balance"
            title="Net Banking"
            subtitle="All Indian banks"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.securityBadge}>
          <MaterialIcons name="lock" size={14} color={COLORS.success} />
          <Text style={styles.securityText}>
            100% Secure 256-bit encryption
          </Text>
        </View>

        <Button
          label="Pay ₹ 499.00"
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
}: PaymentOptionProps) => {
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

      <View
        style={[
          styles.radioOuter,
          isSelected && styles.radioOuterActive,
        ]}
      >
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

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

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.background,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
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

  successOverlay: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  successCircle: { marginBottom: 20 },

  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },

  successSub: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
});
