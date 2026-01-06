import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from 'expo-router/build/global-state/routing';

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  bgLight: '#f6f8f6',
  surfaceWhite: '#ffffff',
  textMain: '#0f172a', // Slate 900
  textMuted: '#64748b', // Slate 500
  border: '#f1f5f9',
  warningBg: '#fffbeb', // Amber 50
  warningText: '#78350f', // Amber 900
  warningBorder: '#fef3c7',
};

export default function UnlockContactScreen() {
  return (
    <SafeAreaProvider>
      <UnlockContactContent />
    </SafeAreaProvider>
  );
}

function UnlockContactContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unlock Seller Contact</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Machine Info Card */}
        <Text style={styles.sectionLabel}>Machine Details</Text>
        <View style={styles.machineCard}>
          <View style={styles.machineInfo}>
            <Text style={styles.machineTitle}>John Deere 5310</Text>
            <View style={styles.metaRow}>
              <MaterialIcons name="person" size={16} color="#15803d" />
              <Text style={styles.sellerName}>Ramesh Kumar</Text>
            </View>
            <View style={styles.metaRow}>
              <MaterialIcons name="location-on" size={16} color={COLORS.textMuted} />
              <Text style={styles.locationName}>Village: Palwal</Text>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=200' }} 
            style={styles.machineImg} 
          />
        </View>

        {/* Pricing Hero */}
        <View style={styles.priceHero}>
          <Text style={styles.priceLabel}>Total Unlock Fee</Text>
          <Text style={styles.priceAmount}>₹29</Text>
          <View style={styles.oneTimeBadge}>
            <MaterialIcons name="verified" size={14} color="#16a34a" />
            <Text style={styles.oneTimeText}>One-time payment</Text>
          </View>
        </View>

        {/* Warning Box */}
        <View style={styles.warningBox}>
          <MaterialIcons name="warning" size={20} color="#d97706" style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Important Warning</Text>
            <Text style={styles.warningDesc}>
              Payment is <Text style={{ fontWeight: '800' }}>ONLY</Text> to reveal the phone number. It is not a deposit for the machine itself.
            </Text>
          </View>
        </View>

        {/* Access Rules */}
        <View style={styles.rulesList}>
          <RuleItem 
            icon="lock-open" 
            title="Lifetime Access" 
            desc="Pay once and view this seller's contact details anytime in your history." 
            color="#2563eb"
            bg="#eff6ff"
          />
          <RuleItem 
            icon="verified-user" 
            title="Verified Seller" 
            desc="Ramesh Kumar has been verified by our field agents." 
            color="#16a34a"
            bg="#f0fdf4"
          />
        </View>

        {/* Payment Method Selector */}
        <Text style={styles.sectionLabel}>Payment Method</Text>
        <TouchableOpacity style={styles.paymentMethod} activeOpacity={0.9}>
          <View style={styles.row}>
            <MaterialIcons name="account-balance-wallet" size={22} color={COLORS.primary} />
            <Text style={styles.paymentMethodText}>UPI / Wallet</Text>
          </View>
          <View style={styles.radioSelectedOuter}>
            <View style={styles.radioSelectedInner} />
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* Sticky Bottom Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <TouchableOpacity style={styles.payButton} activeOpacity={0.8} onPress={()=>navigate("/buy-machine/unlock-contact")}>
          <Text style={styles.payButtonText}>Pay ₹29 & Unlock</Text>
          <MaterialIcons name="lock-open" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.secureRow}>
          <MaterialIcons name="lock" size={14} color={COLORS.textMuted} />
          <Text style={styles.secureText}>Secure Payment by Razorpay</Text>
        </View>
      </View>
    </View>
  );
}

// --- Helper Components ---
const RuleItem = ({ icon, title, desc, color, bg }) => (
  <View style={styles.ruleItem}>
    <View style={[styles.ruleIconCircle, { backgroundColor: bg }]}>
      <MaterialIcons name={icon} size={20} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleDesc}>{desc}</Text>
    </View>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: 'white'
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  
  scrollContent: { padding: 16 },
  sectionLabel: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: COLORS.textMuted, 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 12,
    marginLeft: 4
  },
  
  machineCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 }, android: { elevation: 2 } })
  },
  machineInfo: { flex: 1 },
  machineTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  sellerName: { fontSize: 14, fontWeight: '600', color: '#15803d' },
  locationName: { fontSize: 14, color: COLORS.textMuted },
  machineImg: { width: 80, height: 80, borderRadius: 12, marginLeft: 16 },

  priceHero: { alignItems: 'center', paddingVertical: 16, marginBottom: 16 },
  priceLabel: { fontSize: 14, color: COLORS.textMuted, marginBottom: 4 },
  priceAmount: { fontSize: 48, fontWeight: '800', color: COLORS.textMain, marginBottom: 8 },
  oneTimeBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0fdf4', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 20, 
    gap: 4 
  },
  oneTimeText: { fontSize: 12, fontWeight: '700', color: '#16a34a' },

  warningBox: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.warningBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  warningTitle: { fontSize: 14, fontWeight: '800', color: COLORS.warningText, marginBottom: 2 },
  warningDesc: { fontSize: 14, color: COLORS.warningText, lineHeight: 20 },

  rulesList: { marginBottom: 32 },
  ruleItem: { flexDirection: 'row', gap: 16, marginBottom: 20, paddingHorizontal: 4 },
  ruleIconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  ruleTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textMain, marginBottom: 2 },
  ruleDesc: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20 },

  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(55, 236, 19, 0.08)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paymentMethodText: { fontSize: 16, fontWeight: '600', color: COLORS.textMain },
  radioSelectedOuter: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  radioSelectedInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'black' },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  payButton: {
    height: 58,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  payButtonText: { color: 'black', fontSize: 18, fontWeight: '800' },
  secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12 },
  secureText: { fontSize: 12, color: COLORS.textMuted }
});