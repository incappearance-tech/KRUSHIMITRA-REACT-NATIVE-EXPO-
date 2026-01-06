import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';

// --- Theme Colors ---
const COLORS = {
  primary: "#37ec13",
  primaryHover: "#32d611",
  backgroundLight: "#f6f8f6",
  surfaceLight: "#ffffff",
  textMain: "#101b0d",
  textSecondary: "#4b5563",
  border: "#d3e7cf",
  white: "#ffffff",
  black: "#000000",
  greenDark: "#15803d",
};

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('30days');

  // --- Data ---
  const plans = [
    {
      id: 'free',
      title: 'Trial Run',
      duration: 'Valid for 7 Days',
      price: 'FREE',
      oldPrice: '₹29',
      badge: '1 Left',
      valueLabel: null,
    },
    {
      id: '15days',
      title: 'Standard',
      duration: 'Valid for 15 Days',
      price: '₹49',
      oldPrice: null,
      badge: null,
      valueLabel: '₹3.2/day',
    },
    {
      id: '30days',
      title: 'Premium Reach',
      duration: 'Valid for 30 Days',
      price: '₹99',
      oldPrice: null,
      badge: null,
      valueLabel: 'Best Value',
      recommended: true,
    },
  ];

  const currentPlanData = plans.find((p) => p.id === selectedPlan);

  // --- Handlers ---
  const handleBack = () => {
    Alert.alert("Navigation", "Going back to Step 2...");
  };

  const handlePayment = () => {
    navigate("/sell-machine/payment-method");
    Alert.alert("Processing", `Proceeding to pay ${currentPlanData.price} for the ${currentPlanData.title} plan.`);
  };

  const handleHelp = () => {
    Alert.alert("Help", "Contact support for pricing queries.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

      {/* --- Sticky Header --- */}
      <View style={styles.appBar}>
        <View style={styles.appBarTop}>
          <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Select Plan</Text>
          <TouchableOpacity onPress={handleHelp} style={styles.iconBtn}>
            <MaterialIcons name="help-outline" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.stepText}>Step 3 of 3</Text>
            <Text style={styles.percentText}>Almost Done</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '95%' }]} />
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- Promo Banner --- */}
        <View style={styles.promoBanner}>
          <View style={styles.promoIconCircle}>
            <MaterialCommunityIcons name="party-popper" size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>First Listing Free!</Text>
            <Text style={styles.promoSubText}>
              As a welcome gift, your first machine listing is completely free. No payment required.
            </Text>
          </View>
        </View>

        {/* --- Duration Section --- */}
        <View style={styles.sectionHeadingRow}>
          <MaterialIcons name="payments" size={20} color={COLORS.primary} />
          <Text style={styles.sectionHeadingText}>Choose Duration</Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.8}
                onPress={() => setSelectedPlan(plan.id)}
                style={[
                  styles.planCard,
                  isSelected && styles.planCardSelected,
                  plan.recommended && { marginTop: 10 }
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
                    <View style={[styles.customRadio, isSelected && styles.customRadioActive]}>
                      {isSelected && <View style={styles.customRadioInner} />}
                    </View>
                    
                    <View>
                      <View style={styles.planTitleRow}>
                        <Text style={[styles.planTitleText, plan.id === '30days' && { fontSize: 18 }]}>
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
                    <Text style={[
                        styles.planPriceText, 
                        plan.id === 'free' && { color: COLORS.primary },
                        plan.id === '30days' && { fontSize: 24 }
                    ]}>
                      {plan.price}
                    </Text>
                    {plan.oldPrice && <Text style={styles.oldPriceText}>{plan.oldPrice}</Text>}
                    {plan.valueLabel && (
                      <Text style={[
                        styles.valueLabelText,
                        plan.id === '30days' && { color: '#16a34a', fontWeight: '600' }
                      ]}>
                        {plan.valueLabel}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- Included Features --- */}
        <Text style={styles.listHeader}>WHAT'S INCLUDED</Text>
        <View style={styles.featureBox}>
          <FeatureItem icon="visibility" label="Visible to 5000+ local farmers" />
          <FeatureItem icon="verified" label="Verified Seller Badge" />
          <FeatureItem icon="notifications-active" label="Instant Buyer Alerts" />
        </View>

        <View style={styles.trustRow}>
          <MaterialIcons name="lock" size={14} color={COLORS.textSecondary} />
          <Text style={styles.trustText}>Secure Payment & Instant Activation</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- Sticky Footer --- */}
      <View style={styles.footerContainer}>
        <View style={styles.footerInner}>
          <View style={styles.priceColumn}>
            <Text style={styles.footerTotalLabel}>Total Payable</Text>
            <Text style={styles.footerTotalValue}>{currentPlanData.price}</Text>
          </View>
          
          <TouchableOpacity 
            onPress={handlePayment}
            style={styles.primaryButton} 
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Proceed to Pay</Text>
            <MaterialIcons name="arrow-forward" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const FeatureItem = ({ icon, label }) => (
  <View style={styles.featureItem}>
    <MaterialIcons name={icon} size={22} color={COLORS.primary} style={{ marginRight: 12 }} />
    <Text style={styles.featureText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundLight },
  appBar: { backgroundColor: 'rgba(246, 248, 246, 0.95)', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  appBarTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 8 },
  iconBtn: { padding: 8, borderRadius: 20 },
  appBarTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain, textAlign: 'center', flex: 1 },
  progressContainer: { paddingHorizontal: 16, paddingBottom: 16, marginTop: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  stepText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  percentText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  progressBarBg: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  scrollContent: { padding: 16 },
  promoBanner: { backgroundColor: '#ecfdf5', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(55, 236, 19, 0.3)', flexDirection: 'row', gap: 12, marginBottom: 24 },
  promoIconCircle: { backgroundColor: 'rgba(55, 236, 19, 0.2)', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  promoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textMain, marginBottom: 2 },
  promoSubText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionHeadingText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  plansContainer: { gap: 12, marginBottom: 28 },
  planCard: { backgroundColor: COLORS.surfaceLight, padding: 16, borderRadius: 12, borderWidth: 2, borderColor: COLORS.border, position: 'relative' },
  planCardSelected: { borderColor: COLORS.primary, backgroundColor: '#f0fdf4', elevation: 3 },
  recommendedFloatingBadge: { position: 'absolute', top: -14, alignSelf: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 4, zIndex: 10 },
  recommendedFloatingText: { color: COLORS.black, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  planCardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  planTitleText: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  trialBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  trialBadgeText: { color: COLORS.greenDark, fontSize: 10, fontWeight: '800' },
  planDurationText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  planCardRight: { alignItems: 'flex-end' },
  planPriceText: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  oldPriceText: { fontSize: 12, color: COLORS.textSecondary, textDecorationLine: 'line-through', opacity: 0.6 },
  valueLabelText: { fontSize: 11, color: COLORS.textSecondary },
  customRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.textSecondary, alignItems: 'center', justifyContent: 'center' },
  customRadioActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  customRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.black },
  listHeader: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary, letterSpacing: 1.2, marginBottom: 12, paddingHorizontal: 4, textTransform: 'uppercase' },
  featureBox: { backgroundColor: COLORS.surfaceLight, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  featureItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  featureText: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  trustRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, opacity: 0.7 },
  trustText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  footerContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  footerTotalLabel: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' },
  footerTotalValue: { fontSize: 22, fontWeight: '800', color: COLORS.textMain },
  primaryButton: { flex: 1, backgroundColor: COLORS.primary, height: 54, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4 },
  primaryButtonText: { color: COLORS.black, fontSize: 17, fontWeight: '800' },
});