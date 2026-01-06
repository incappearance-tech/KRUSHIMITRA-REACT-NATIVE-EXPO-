import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
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
  textMain: '#101b0d',
  textMuted: '#5e6e5b',
  border: '#e5e7eb',
  progressBg: '#e5e7eb',
};

export default function BuyerIntentScreen() {
  return (
    <SafeAreaProvider>
      <BuyerIntentContent />
    </SafeAreaProvider>
  );
}

function BuyerIntentContent() {
  const insets = useSafeAreaInsets();
  
  // State for selections
  const [purpose, setPurpose] = useState('personal'); // 'personal' or 'rent'
  const [timeline, setTimeline] = useState('7days'); // 'immediate', '7days', 'checking'

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Buyer Intent</Text>
        <TouchableOpacity style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar Area */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressStep}>Final Step</Text>
          <Text style={styles.progressStatus}>Almost there</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '90%' }]} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Question 1: Purpose Grid */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>What do you plan to do with this machine?</Text>
          <View style={styles.grid}>
            <PurposeCard 
              id="personal"
              label="Personal Use"
              icon="person"
              selected={purpose === 'personal'}
              onSelect={setPurpose}
            />
            <PurposeCard 
              id="rent"
              label="Rent to Others"
              icon="handshake"
              selected={purpose === 'rent'}
              onSelect={setPurpose}
            />
          </View>
        </View>

        {/* Question 2: Timeline List */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>When do you plan to buy?</Text>
          <View style={styles.timelineList}>
            <TimelineOption 
              id="immediate"
              label="Immediately"
              icon="bolt"
              iconColor="#dc2626"
              iconBg="#fee2e2"
              selected={timeline === 'immediate'}
              onSelect={setTimeline}
            />
            <TimelineOption 
              id="7days"
              label="Within 7 days"
              icon="calendar-today"
              iconColor="#ea580c"
              iconBg="#ffedd5"
              selected={timeline === '7days'}
              onSelect={setTimeline}
            />
            <TimelineOption 
              id="checking"
              label="Just checking"
              icon="search"
              iconColor="#2563eb"
              iconBg="#dbeafe"
              selected={timeline === 'checking'}
              onSelect={setTimeline}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Action Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={()=>navigate("/buy-machine/payment")}>
          <MaterialIcons name="visibility" size={20} color="black" />
          <Text style={styles.primaryButtonText}>Reveal Seller Contact</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Your response helps sellers respond faster. 
          <Text style={styles.skipLink}> Skip</Text>
        </Text>
      </View>
    </View>
  );
}

// --- Sub-components ---

const PurposeCard = ({ id, label, icon, selected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.card, selected && styles.cardSelected]} 
    onPress={() => onSelect(id)}
    activeOpacity={0.9}
  >
    {selected && (
      <View style={styles.checkIcon}>
        <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
      </View>
    )}
    <View style={[styles.cardIconBg, selected && styles.cardIconBgSelected]}>
      <MaterialIcons name={icon} size={32} color={selected ? COLORS.primary : COLORS.textMain} />
    </View>
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

const TimelineOption = ({ id, label, icon, iconColor, iconBg, selected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.listOption, selected && styles.listOptionSelected]} 
    onPress={() => onSelect(id)}
    activeOpacity={0.8}
  >
    <View style={[styles.listIconBg, { backgroundColor: iconBg }]}>
      <MaterialIcons name={icon} size={20} color={iconColor} />
    </View>
    <Text style={styles.listLabel}>{label}</Text>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
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
    paddingHorizontal: 16, 
    paddingBottom: 12 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain, marginLeft: 8 },
  closeButton: { padding: 8, borderRadius: 20 },
  
  progressSection: { paddingHorizontal: 24, paddingBottom: 10 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressStep: { fontSize: 14, fontWeight: '500', color: COLORS.textMain },
  progressStatus: { fontSize: 12, fontWeight: '600', color: COLORS.primary },
  progressBarBg: { height: 8, width: '100%', backgroundColor: COLORS.progressBg, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },

  scrollContent: { padding: 24 },
  section: { marginBottom: 32 },
  mainHeading: { fontSize: 24, fontWeight: '700', color: COLORS.textMain, marginBottom: 16, lineHeight: 30 },
  subHeading: { fontSize: 18, fontWeight: '700', color: COLORS.textMain, marginBottom: 16 },

  grid: { flexDirection: 'row', gap: 16 },
  card: { 
    flex: 1, 
    height: 120, 
    backgroundColor: COLORS.surfaceWhite, 
    borderRadius: 16, 
    borderWidth: 2, 
    borderColor: 'transparent',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 16,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 2 } })
  },
  cardSelected: { borderColor: COLORS.primary, backgroundColor: '#f0fdf4' }, // 10% primary approx
  checkIcon: { position: 'absolute', top: 8, right: 8 },
  cardIconBg: { padding: 12, borderRadius: 24, backgroundColor: COLORS.bgLight, marginBottom: 8 },
  cardIconBgSelected: { backgroundColor: 'white' },
  cardText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  timelineList: { gap: 12 },
  listOption: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 16, 
    borderWidth: 2, 
    borderColor: 'transparent',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 2, 
    elevation: 1 
  },
  listOptionSelected: { borderColor: 'rgba(55, 236, 19, 0.5)' },
  listIconBg: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  radioOuterSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'black' },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    padding: 16, 
    borderTopWidth: 1, 
    borderTopColor: COLORS.border 
  },
  primaryButton: { 
    height: 56, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  primaryButtonText: { color: 'black', fontSize: 18, fontWeight: '700' },
  footerNote: { textAlign: 'center', fontSize: 12, color: COLORS.textMuted, marginTop: 12 },
  skipLink: { textDecorationLine: 'underline', color: COLORS.textMain, fontWeight: '600' }
});