import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';
import AppBar from '@/src/components/AppBar';

// --- Theme Constants ---


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
      <AppBar title='Buyer Intent'/>

      <ScrollView
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
              iconColor={COLORS.dangerDark}
              iconBg={COLORS.dangerLight}
              selected={timeline === 'immediate'}
              onSelect={setTimeline}
            />
            <TimelineOption
              id="7days"
              label="Within 7 days"
              icon="calendar-today"
              iconColor={COLORS.warningDark}
              iconBg={COLORS.warningLight}
              selected={timeline === '7days'}
              onSelect={setTimeline}
            />
            <TimelineOption
              id="checking"
              label="Just checking"
              icon="search"
              iconColor={COLORS.infoDark}
              iconBg={COLORS.infoLight}
              selected={timeline === 'checking'}
              onSelect={setTimeline}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Action Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <Button
          label="Reveal Seller Contact"
          onPress={() => navigate("/buy-machine/payment")}
          icon="visibility"
        />
        <Text style={styles.footerNote}>
          Your response helps sellers respond faster.
          <Text style={styles.skipLink}> Skip</Text>
        </Text>
      </View>
    </View>
  );
}

// --- Sub-components ---

const PurposeCard = ({ id, label, icon, selected, onSelect }: { id: string, label: string, icon: keyof typeof MaterialIcons.glyphMap, selected: boolean, onSelect: (id: string) => void }) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={() => onSelect(id)}
    activeOpacity={0.9}
  >
    {selected && (
      <View style={styles.checkIcon}>
        <MaterialIcons name="check-circle" size={20} color={COLORS.brand.primary} />
      </View>
    )}
    <View style={[styles.cardIconBg, selected && styles.cardIconBgSelected]}>
      <MaterialIcons name={icon} size={32} color={selected ? COLORS.brand.primary : COLORS.text} />
    </View>
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

const TimelineOption = ({ id, label, icon, iconColor, iconBg, selected, onSelect }: { id: string, label: string, icon: keyof typeof MaterialIcons.glyphMap, iconColor: string, iconBg: string, selected: boolean, onSelect: (id: string) => void }) => (
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
  container: { flex: 1, backgroundColor: COLORS.background,paddingHorizontal:16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginLeft: 8 },
  closeButton: { padding: 8, borderRadius: 20 },

  progressSection: { paddingHorizontal: 24, paddingBottom: 10 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressStep: { fontSize: 14, fontWeight: '500', color: COLORS.text },
  progressStatus: { fontSize: 12, fontWeight: '600', color: COLORS.brand.primary },
  progressBarBg: { height: 8, width: '100%', backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.brand.primary, borderRadius: 4 },

  section: { marginBottom: 32 },
  mainHeading: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 16, lineHeight: 30 },
  subHeading: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 16 },

  grid: { flexDirection: 'row', gap: 16 },
  card: {
    flex: 1,
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    ...Platform.select({ ios: { shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 2 } })
  },
  cardSelected: { borderColor: COLORS.brand.primary, backgroundColor: COLORS.gray[50] }, // 10% primary approx
  checkIcon: { position: 'absolute', top: 8, right: 8 },
  cardIconBg: { padding: 12, borderRadius: 24, backgroundColor: COLORS.background, marginBottom: 8 },
  cardIconBgSelected: { backgroundColor: COLORS.white },
  cardText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  timelineList: { gap: 12 },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  listOptionSelected: { borderColor: COLORS.brand.muted },
  listIconBg: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.text },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.gray[300], alignItems: 'center', justifyContent: 'center' },
  radioOuterSelected: { borderColor: COLORS.brand.primary, backgroundColor: COLORS.brand.primary },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.black },

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

  footerNote: { textAlign: 'center', fontSize: 12, color: COLORS.textSecondary, marginTop: 12 },
  skipLink: { textDecorationLine: 'underline', color: COLORS.text, fontWeight: '600' }
});