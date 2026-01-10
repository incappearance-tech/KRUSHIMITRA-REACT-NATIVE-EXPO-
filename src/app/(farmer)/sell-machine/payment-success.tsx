import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';

const { width } = Dimensions.get('window');


export default function PaymentSuccessScreen() {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance Animation
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

    // Ping Animation for the checkmark circle
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon & Message */}
        <Animated.View style={[styles.successSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.pingCircle,
                { transform: [{ scale: pingAnim }], opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.4] }) }
              ]}
            />
            <View style={styles.mainCheckCircle}>
              <MaterialIcons name="check-circle" size={56} color={COLORS.brand.primary} />
            </View>
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>
            Thank you! Your payment has been processed successfully.
          </Text>
        </Animated.View>

        {/* Receipt Card */}
        <View style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptLabel}>Total Amount Paid</Text>
            <Text style={styles.receiptAmount}>₹ 499.00</Text>
          </View>

          <View style={styles.receiptBody}>
            <DetailRow label="Transaction ID" value="#TRX-8923492" isMono />
            <DetailRow label="Date" value="Oct 24, 2024, 10:30 AM" />
            <DetailRow
              label="Payment Method"
              value="HDFC **** 4582"
              icon="credit-card"
            />
          </View>

          {/* Cutout Decorative Line */}
          <View style={styles.cutoutContainer}>
            <View style={[styles.cutoutCircle, { left: -10 }]} />
            <View style={styles.dashedLine} />
            <View style={[styles.cutoutCircle, { right: -10 }]} />
          </View>
        </View>

        {/* Benefit Card */}
        <View style={styles.benefitSection}>
          <Text style={styles.sectionHeader}>UNLOCKED BENEFIT</Text>
          <View style={styles.benefitCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1594913785162-e6785b423cb1?q=80&w=500&auto=format&fit=crop' }}
              style={styles.benefitImage}
            />
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitTitle}>John Deere Tractor 5050D</Text>
              <Text style={styles.benefitStatus}>Premium Listing - Live for 30 days</Text>

              <View style={styles.badgeRow}>
                <View style={[styles.badge, { backgroundColor: '#dcfce7' }]}>
                  <MaterialIcons name="calendar-today" size={12} color="#15803d" />
                  <Text style={[styles.badgeText, { color: '#15803d' }]}>Expires Nov 23</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: COLORS.brand.muted }]}>
                  <MaterialIcons name="check-circle" size={12} color="#051103" />
                  <Text style={[styles.badgeText, { color: '#051103' }]}>Active</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Button
          label="View My Listing"
          onPress={() => { }}
          icon="arrow-forward"
          textColor="#051103"
          backgroundColor={COLORS.brand.primary}
        />

        <Button
          label="Back to Dashboard"
          onPress={() => { }}
          type="secondary"
        />
      </View>
    </SafeAreaView>
  );
}

// --- Helper Components ---
const DetailRow = ({ label, value, isMono, icon }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.detailValueContainer}>
      {icon && <MaterialIcons name={icon} size={14} color={COLORS.textSecondary} style={{ marginRight: 6 }} />}
      <Text style={[styles.detailValue, isMono && styles.monoText]}>{value}</Text>
    </View>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
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
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
  },
  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
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
    fontWeight: '500',
  },
  receiptAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
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
    overflow: 'hidden',
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  benefitImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  benefitInfo: {
    flex: 1,
    marginLeft: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
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
    padding: 20,
    backgroundColor: COLORS.background,
    gap: 12,
  },
});