import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';

import { IInspectionItem } from '@/src/types/buy-machine/inspection-guide';

import { useTranslation } from 'react-i18next';

export default function InspectionGuideScreen() {
  return (
    <SafeAreaProvider>
      <InspectionContent />
    </SafeAreaProvider>
  );
}

function InspectionContent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const INSPECTION_ITEMS: IInspectionItem[] = [
    { id: 1, title: t('inspection_guide.items.engine.title'), desc: t('inspection_guide.items.engine.desc'), icon: 'engineering' },
    { id: 2, title: t('inspection_guide.items.oil.title'), desc: t('inspection_guide.items.oil.desc'), icon: 'opacity' },
    { id: 3, title: t('inspection_guide.items.vibration.title'), desc: t('inspection_guide.items.vibration.desc'), icon: 'vibration' },
    { id: 4, title: t('inspection_guide.items.tyres.title'), desc: t('inspection_guide.items.tyres.desc'), icon: 'tire-repair' },
    { id: 5, title: t('inspection_guide.items.repairs.title'), desc: t('inspection_guide.items.repairs.desc'), icon: 'build' },
    { id: 6, title: t('inspection_guide.items.documents.title'), desc: t('inspection_guide.items.documents.desc'), icon: 'description' },
  ];

  const toggleItem = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('inspection_guide.title')}</Text>
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
              <Text style={styles.heroTag}>{t('inspection_guide.safety_first')}</Text>
              <Text style={styles.heroText}>{t('inspection_guide.inspect_before_buy')}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Headline */}
        <View style={styles.introSection}>
          <Text style={styles.mainTitle}>{t('inspection_guide.check_points')}</Text>
          <Text style={styles.subTitle}>{t('inspection_guide.verify_condition')}</Text>
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
                <MaterialIcons name={item.icon as any} size={24} color="#15803d" />
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
          <MaterialIcons name="info" size={18} color={COLORS.textSecondary} />
          <Text style={styles.disclaimerText}>
            <Text style={{ fontWeight: '700' }}>{t('inspection_guide.disclaimer')}</Text> {t('inspection_guide.disclaimer_desc')}
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <Button
          label={t('inspection_guide.call_seller')}
          onPress={() => { }}
          icon="call"
          backgroundColor={COLORS.brand.primary}
          textColor={COLORS.black}
        />
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
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
  mainTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subTitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },

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
  cardChecked: { borderColor: COLORS.brand.primary, backgroundColor: '#f0fdf4' },
  iconContainer: { width: 44, height: 44, borderRadius: 10, backgroundColor: COLORS.brand.muted, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  cardContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  itemDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#cbd5e1', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  checkboxActive: { borderColor: COLORS.brand.primary, backgroundColor: COLORS.brand.primary },

  disclaimer: { flexDirection: 'row', margin: 20, padding: 16, backgroundColor: '#f1f5f9', borderRadius: 12, gap: 10 },
  disclaimerText: { flex: 1, fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },

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
    backgroundColor: COLORS.brand.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callButtonText: { color: 'black', fontSize: 18, fontWeight: '700' },
});