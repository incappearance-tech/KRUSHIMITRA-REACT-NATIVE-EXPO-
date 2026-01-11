import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';



import { useTranslation } from 'react-i18next';

export default function UpdateStatusScreen() {
  return (
    <SafeAreaProvider>
      <UpdateStatusContent />
    </SafeAreaProvider>
  );
}

function UpdateStatusContent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // State
  const [purchaseStatus, setPurchaseStatus] = useState<'purchased' | 'not_purchased'>('purchased');
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const REASONS = [
    t('purchase_confirmation.reasons.price_high'),
    t('purchase_confirmation.reasons.condition_issue'),
    t('purchase_confirmation.reasons.seller_unresponsive')
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('purchase_confirmation.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Headline */}
          <View style={styles.sectionHeader}>
            <Text style={styles.mainHeading}>{t('purchase_confirmation.headline')}</Text>
            <Text style={styles.subHeading}>{t('purchase_confirmation.subheading')}</Text>
          </View>

          {/* Machine Summary Card */}
          <View style={styles.itemCard}>
            <View style={styles.cardRow}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=150' }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>John Deere 5050 D</Text>
                <Text style={styles.itemPrice}>$12,000</Text>
                <Text style={styles.itemMeta}>Seller: Ravi Kumar • posted 2d ago</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.viewListingBtn}>
              <MaterialIcons name="visibility" size={18} color="#4b5563" />
              <Text style={styles.viewListingText}>{t('purchase_confirmation.view_listing')}</Text>
            </TouchableOpacity>
          </View>

          {/* Radio Options */}
          <View style={styles.radioGroup}>
            <StatusOption
              id="purchased"
              title={t('purchase_confirmation.yes_purchased')}
              desc={t('purchase_confirmation.yes_purchased_desc')}
              selected={purchaseStatus === 'purchased'}
              onSelect={setPurchaseStatus}
            />
            <StatusOption
              id="not_purchased"
              title={t('purchase_confirmation.no_purchased')}
              desc={t('purchase_confirmation.no_purchased_desc')}
              selected={purchaseStatus === 'not_purchased'}
              onSelect={setPurchaseStatus}
            />
          </View>

          {/* Conditional Reason Section (Commonly shown if not purchased) */}
          <View style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>{t('purchase_confirmation.reason_label')}</Text>
            <View style={styles.chipRow}>
              {REASONS.map(reason => (
                <TouchableOpacity
                  key={reason}
                  onPress={() => setSelectedReason(reason)}
                  style={[styles.chip, selectedReason === reason && styles.chipActive]}
                >
                  <Text style={[styles.chipText, selectedReason === reason && styles.chipTextActive]}>
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.textArea}
              placeholder={t('purchase_confirmation.tell_us_more')}
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky Bottom Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <Button
          label={t('purchase_confirmation.update_listing')}
          onPress={() => { }}
          icon="check-circle"
          backgroundColor={COLORS.brand.primary}
          textColor={COLORS.black}
        />
      </View>
    </View>
  );
}

// --- Sub-components ---
import { IStatusOptionProps } from '@/src/types/buy-machine/purchase-confirmation';

const StatusOption = ({ id, title, desc, selected, onSelect }: IStatusOptionProps) => (
  <TouchableOpacity
    style={[styles.radioCard, selected && styles.radioCardSelected]}
    onPress={() => onSelect(id)}
    activeOpacity={0.9}
  >
    <View style={[styles.radioCircle, selected && styles.radioCircleActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <View style={styles.radioContent}>
      <Text style={styles.radioTitle}>{title}</Text>
      <Text style={styles.radioDesc}>{desc}</Text>
    </View>
  </TouchableOpacity>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },

  scrollContent: { padding: 16 },
  sectionHeader: { marginBottom: 20, paddingHorizontal: 4 },
  mainHeading: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subHeading: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },

  itemCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 }, android: { elevation: 2 } })
  },
  cardRow: { flexDirection: 'row', gap: 16 },
  itemImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#e5e7eb' },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  itemPrice: { fontSize: 16, fontWeight: '600', color: COLORS.brand.primary, marginTop: 2 },
  itemMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#f3f4f6', marginVertical: 12 },
  viewListingBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  viewListingText: { fontSize: 13, fontWeight: '600', color: '#4b5563' },

  radioGroup: { gap: 12, marginBottom: 24 },
  radioCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'flex-start',
    gap: 12
  },
  radioCardSelected: { borderColor: COLORS.brand.primary, backgroundColor: COLORS.brand.muted },
  radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  radioCircleActive: { borderColor: COLORS.brand.primary, backgroundColor: COLORS.brand.primary },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' },
  radioContent: { flex: 1 },
  radioTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  radioDesc: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4, lineHeight: 18 },

  reasonSection: { paddingHorizontal: 4 },
  reasonLabel: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'white' },
  chipActive: { backgroundColor: COLORS.brand.primary, borderColor: COLORS.brand.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: '#4b5563' },
  chipTextActive: { color: 'black' },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    textAlignVertical: 'top',
    minHeight: 100
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
});