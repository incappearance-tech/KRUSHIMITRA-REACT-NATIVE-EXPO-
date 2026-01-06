import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  bgLight: '#f6f8f6',
  surfaceWhite: '#ffffff',
  textMain: '#111827', // Gray 900
  textMuted: '#6b7280', // Gray 500
  border: '#e5e7eb',
};

const REASONS = ["Price too high", "Condition issue", "Seller unresponsive"];

export default function UpdateStatusScreen() {
  return (
    <SafeAreaProvider>
      <UpdateStatusContent />
    </SafeAreaProvider>
  );
}

function UpdateStatusContent() {
  const insets = useSafeAreaInsets();
  
  // State
  const [purchaseStatus, setPurchaseStatus] = useState('purchased'); // 'purchased' or 'not_purchased'
  const [selectedReason, setSelectedReason] = useState(null);
  const [note, setNote] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Status</Text>
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
            <Text style={styles.mainHeading}>Did you buy this machine?</Text>
            <Text style={styles.subHeading}>Please confirm if the transaction was successful.</Text>
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
              <Text style={styles.viewListingText}>View Original Listing</Text>
            </TouchableOpacity>
          </View>

          {/* Radio Options */}
          <View style={styles.radioGroup}>
            <StatusOption 
              id="purchased"
              title="Yes, Purchased"
              desc="I have bought this item and the deal is closed."
              selected={purchaseStatus === 'purchased'}
              onSelect={setPurchaseStatus}
            />
            <StatusOption 
              id="not_purchased"
              title="No, Not Purchased"
              desc="Deal was cancelled or I decided not to buy."
              selected={purchaseStatus === 'not_purchased'}
              onSelect={setPurchaseStatus}
            />
          </View>

          {/* Conditional Reason Section (Commonly shown if not purchased) */}
          <View style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>Reason (Optional)</Text>
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
              placeholder="Tell us more about why..."
              placeholderTextColor={COLORS.textMuted}
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
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <MaterialIcons name="check-circle" size={20} color="black" />
          <Text style={styles.primaryButtonText}>Update Listing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Sub-components ---
const StatusOption = ({ id, title, desc, selected, onSelect }) => (
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
  container: { flex: 1, backgroundColor: COLORS.bgLight },
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },

  scrollContent: { padding: 16 },
  sectionHeader: { marginBottom: 20, paddingHorizontal: 4 },
  mainHeading: { fontSize: 24, fontWeight: '800', color: COLORS.textMain },
  subHeading: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },

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
  itemName: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  itemPrice: { fontSize: 16, fontWeight: '600', color: COLORS.primary, marginTop: 2 },
  itemMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
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
  radioCardSelected: { borderColor: COLORS.primary, backgroundColor: 'rgba(55, 236, 19, 0.05)' },
  radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  radioCircleActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' },
  radioContent: { flex: 1 },
  radioTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  radioDesc: { fontSize: 14, color: COLORS.textMuted, marginTop: 4, lineHeight: 18 },

  reasonSection: { paddingHorizontal: 4 },
  reasonLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textMain, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'white' },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: '#4b5563' },
  chipTextActive: { color: 'black' },
  textArea: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    padding: 12, 
    fontSize: 14, 
    color: COLORS.textMain, 
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
  primaryButton: { 
    height: 52, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  primaryButtonText: { color: 'black', fontSize: 16, fontWeight: '800' }
});