import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  bgLight: '#f6f8f6',
  surfaceWhite: '#ffffff',
  textMain: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0',
};

const INSPECTION_ITEMS = [
  { id: 1, title: 'Engine Start & Sound', desc: 'Check for smooth starting and listen for irregular knocking sounds.', icon: 'engineering' },
  { id: 2, title: 'Oil Leakage', desc: 'Inspect the engine and hydraulic pipes for any visible wet spots or leaks.', icon: 'opacity' },
  { id: 3, title: 'Vibration', desc: 'Sit on the machine while running to feel for excessive shaking or rattling.', icon: 'vibration' },
  { id: 4, title: 'Tyres & Blades', desc: 'Check tyre tread depth and look for cracks. Ensure blades are sharp.', icon: 'tire-repair' },
  { id: 5, title: 'Major Repairs', desc: 'Ask the seller about any past engine or transmission overhauls.', icon: 'build' },
  { id: 6, title: 'Documents', desc: 'Verify RC book, insurance validity, and chassis number matching.', icon: 'description' },
];

export default function InspectionGuideScreen() {
  return (
    <SafeAreaProvider>
      <InspectionContent />
    </SafeAreaProvider>
  );
}

function InspectionContent() {
  const insets = useSafeAreaInsets();
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inspection Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1530333271403-997576f3068e?q=80&w=600' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTag}>SAFETY FIRST</Text>
              <Text style={styles.heroText}>Inspect before you buy</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Headline */}
        <View style={styles.introSection}>
          <Text style={styles.mainTitle}>Check these points</Text>
          <Text style={styles.subTitle}>Verify machine condition carefully before payment.</Text>
        </View>

        {/* Checklist */}
        <View style={styles.checklist}>
          {INSPECTION_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.card, checkedItems[item.id] && styles.cardChecked]} 
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name={item.icon} size={24} color="#15803d" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
              <View style={[styles.checkbox, checkedItems[item.id] && styles.checkboxActive]}>
                {checkedItems[item.id] && <MaterialIcons name="check" size={16} color="black" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <MaterialIcons name="info" size={18} color={COLORS.textMuted} />
          <Text style={styles.disclaimerText}>
            <Text style={{ fontWeight: '700' }}>Disclaimer:</Text> This list is for educational purposes only. The platform is not responsible for the machine's condition.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <TouchableOpacity style={styles.callButton}>
          <MaterialIcons name="call" size={22} color="black" />
          <Text style={styles.callButtonText}>Call Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: 'white'
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  backButton: { padding: 8 },

  heroContainer: { padding: 16 },
  heroImage: { height: 180, justifyContent: 'flex-end' },
  heroOverlay: { 
    padding: 16, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16 
  },
  heroTag: { color: 'white', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  heroText: { color: 'white', fontSize: 22, fontWeight: '800' },

  introSection: { paddingHorizontal: 20, marginBottom: 16 },
  mainTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textMain },
  subTitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },

  checklist: { paddingHorizontal: 16, gap: 12 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#f1f5f9',
    alignItems: 'flex-start',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 2 } })
  },
  cardChecked: { borderColor: COLORS.primary, backgroundColor: '#f0fdf4' },
  iconContainer: { width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(55, 236, 19, 0.15)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  cardContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textMain, marginBottom: 4 },
  itemDesc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#cbd5e1', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  checkboxActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },

  disclaimer: { flexDirection: 'row', margin: 20, padding: 16, backgroundColor: '#f1f5f9', borderRadius: 12, gap: 10 },
  disclaimerText: { flex: 1, fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },

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
  callButton: { 
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
  callButtonText: { color: 'black', fontSize: 18, fontWeight: '700' },
});