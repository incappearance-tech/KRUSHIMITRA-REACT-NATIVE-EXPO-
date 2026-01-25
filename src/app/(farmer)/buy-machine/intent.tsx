import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MaterialIcons } from '@expo/vector-icons';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';

import { COLORS } from '../../../constants/colors';

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
  const [purpose, setPurpose] = useState('personal');
  const [timeline, setTimeline] = useState('7days');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <AppBar title="Buyer Intent" showBack onBackPress={() => router.back()} />

      <View style={styles.statusBar}>
        <View style={styles.statusFill} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Question 1: Purpose Grid */}
        <View style={styles.section}>
          <Text style={styles.mainHeading}>
            What do you plan to do with this machine?
          </Text>
          <Text style={styles.subText}>
            This helps us tailor your experience.
          </Text>

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
              desc="I need it for the current season"
              icon="bolt"
              iconColor={COLORS.dangerDark}
              iconBg={COLORS.dangerLight}
              selected={timeline === 'immediate'}
              onSelect={setTimeline}
            />
            <TimelineOption
              id="7days"
              label="Within 7 days"
              desc="Next week after inspection"
              icon="calendar-today"
              iconColor={COLORS.warningDark}
              iconBg={COLORS.warningLight}
              selected={timeline === '7days'}
              onSelect={setTimeline}
            />
            <TimelineOption
              id="checking"
              label="Just checking"
              desc="Exploring options for next year"
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
      <View
        style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}
      >
        <Button
          label="Reveal Seller Contact"
          onPress={() => router.push('/buy-machine/payment')}
          icon="visibility"
        />
        <TouchableOpacity onPress={() => router.push('/buy-machine/payment')}>
          <Text style={styles.footerNote}>
            Your response helps sellers respond faster.
            <Text style={styles.skipLink}> Skip</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Sub-components ---

const PurposeCard = ({ id, label, icon, selected, onSelect }: any) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={() => onSelect(id)}
    activeOpacity={0.8}
  >
    <View style={[styles.cardIconBg, selected && styles.cardIconBgSelected]}>
      <MaterialIcons
        name={icon}
        size={32}
        color={selected ? COLORS.brand.primary : COLORS.gray[400]}
      />
    </View>
    <Text style={[styles.cardText, selected && styles.cardTextSelected]}>
      {label}
    </Text>
    {selected && (
      <View style={styles.checkIcon}>
        <MaterialIcons
          name="check-circle"
          size={18}
          color={COLORS.brand.primary}
        />
      </View>
    )}
  </TouchableOpacity>
);

const TimelineOption = ({
  id,
  label,
  desc,
  icon,
  iconColor,
  iconBg,
  selected,
  onSelect,
}: any) => (
  <TouchableOpacity
    style={[styles.listOption, selected && styles.listOptionSelected]}
    onPress={() => onSelect(id)}
    activeOpacity={0.7}
  >
    <View style={[styles.listIconBg, { backgroundColor: iconBg }]}>
      <MaterialIcons name={icon} size={20} color={iconColor} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.listLabel}>{label}</Text>
      <Text style={styles.listDesc}>{desc}</Text>
    </View>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 20, paddingBottom: 120 },

  statusBar: { height: 6, backgroundColor: COLORS.gray[50], width: '100%' },
  statusFill: {
    height: '100%',
    backgroundColor: COLORS.brand.primary,
    width: '60%',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },

  section: { marginBottom: 36 },
  mainHeading: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    fontWeight: '500',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },

  grid: { flexDirection: 'row', gap: 16 },
  card: {
    flex: 1,
    height: 140,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: '#fafff7',
  },
  checkIcon: { position: 'absolute', top: 12, right: 12 },
  cardIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIconBgSelected: { backgroundColor: 'white' },
  cardText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  cardTextSelected: { color: COLORS.text },

  timelineList: { gap: 14 },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.gray[50],
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  listOptionSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: '#fafff7',
  },
  listIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  listLabel: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  listDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[50],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 20,
  },

  footerNote: {
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 16,
    fontWeight: '500',
  },
  skipLink: { color: COLORS.brand.primary, fontWeight: '800' },
});
