import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';

const { width } = Dimensions.get('window');

// --- Mock Data ---
const MACHINE_MEDIA = [
  { id: '1', type: 'image', uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=1000' },
  { id: '2', type: 'video', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '3', type: 'image', uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000' },
  { id: '4', type: 'image', uri: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000' },
  { id: '5', type: 'image', uri: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000' },
];

export default function MachineDetailsScreen() {
  return (
    <SafeAreaProvider>
      <MachineDetailsContent />
    </SafeAreaProvider>
  );
}

function MachineDetailsContent() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const videoRef = useRef(null);

  // State for the currently displayed media
  const [activeMedia, setActiveMedia] = useState(MACHINE_MEDIA[0]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Floating Header Buttons */}
      <View style={[styles.headerActions, { top: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={20} color={COLORS.white} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="share" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="favorite-border" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Main Media Display */}
        <View style={styles.imageContainer}>
          {activeMedia.type === 'video' ? (
            <Video
              ref={videoRef}
              source={{ uri: activeMedia.uri }}
              style={styles.mainImage}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay
            />
          ) : (
            <Image
              source={{ uri: activeMedia.uri }}
              style={styles.mainImage}
            />
          )}

          <View style={styles.photoCount}>
            <MaterialIcons name="grid-view" size={14} color={COLORS.white} />
            <Text style={styles.photoCountText}>
              {/* This dynamically shows "See all 5 photos" */}
              {t('buy_machine_details.see_photos', { count: MACHINE_MEDIA.length })}
            </Text>
          </View>
        </View>

        {/* Thumbnail Strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbStrip}
        >
          {MACHINE_MEDIA.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveMedia(item)}
              style={[
                styles.thumb,
                activeMedia.id === item.id && styles.thumbActive
              ]}
            >
              {item.type === 'video' ? (
                <View style={styles.thumbVideoPlaceholder}>
                  <MaterialIcons name="play-circle-outline" size={24} color={COLORS.white} />
                </View>
              ) : (
                <Image source={{ uri: item.uri }} style={styles.thumbImg} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Info Header */}
        <View style={styles.contentPadding}>
          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color={COLORS.success} />
              <Text style={styles.verifiedText}>{t('buy_machine_details.verified_listing')}</Text>
            </View>
            <Text style={styles.listingId}>ID: #TR-4059</Text>
          </View>

          <Text style={styles.title}>John Deere 5050 D</Text>
          <Text style={styles.location}>{t('buy_machine_details.located_in', { location: 'Fresno, CA' })}</Text>
          <Text style={styles.price}>$12,500</Text>

          {/* Safety Box */}
          <View style={styles.safetyBox}>
            <MaterialIcons name="warning" size={20} color={COLORS.warningDark} />
            <View style={{ flex: 1 }}>
              <Text style={styles.safetyTitle}>{t('buy_machine_details.safety_first')}</Text>
              <Text style={styles.safetyDesc}>{t('buy_machine_details.safety_desc')}</Text>
            </View>
          </View>

          {/* Specs Grid */}
          <Text style={styles.sectionHeading}>{t('buy_machine_details.machine_details')}</Text>
          <View style={styles.specsGrid}>
            <SpecItem label={t('buy_machine_details.make_year')} value="2018" />
            <SpecItem label={t('buy_machine_details.engine_power')} value="50 HP" />
            <SpecItem label={t('buy_machine_details.hours_used')} value="2,500 Hrs" />
            <SpecItem label={t('buy_machine_details.tyre_condition')} value="80% New" />
          </View>

          {/* List Details */}
          <View style={styles.listDetails}>
            <DetailRow label={t('buy_machine_details.availability')} value={t('sell_machine.immediately')} isGreen />
            <DetailRow label={t('buy_machine_details.rc_available')} value={t('common.success')} />
            <DetailRow label={t('buy_machine_details.insurance')} value="Valid till Dec 2024" />
          </View>

          {/* Selling Reason */}
          <Text style={styles.subHeading}>{t('buy_machine_details.selling_reason')}</Text>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>"Upgrading to a higher HP model for new farming equipment."</Text>
          </View>

          {/* Machine Health Report (Premium Addition) */}
          <View style={styles.healthCard}>
            <View style={styles.healthHeader}>
              <View style={styles.healthScoreWrap}>
                <Text style={styles.healthScore}>88</Text>
                <Text style={styles.healthScoreBase}>/100</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.healthTitle}>Machine Health Report</Text>
                <Text style={styles.healthSub}>Verified by 100-point inspection</Text>
              </View>
              <MaterialIcons name="verified-user" size={24} color={COLORS.success} />
            </View>
            <View style={styles.healthStats}>
              <View style={styles.healthStatItem}>
                <MaterialIcons name="settings" size={16} color={COLORS.textSecondary} />
                <Text style={styles.healthStatText}>Engine: Good</Text>
              </View>
              <View style={styles.healthStatItem}>
                <MaterialIcons name="tire-repair" size={16} color={COLORS.textSecondary} />
                <Text style={styles.healthStatText}>Tires: Fair</Text>
              </View>
            </View>
          </View>

          {/* Seller Profile */}
          <Text style={styles.sectionHeading}>{t('buy_machine_details.seller_profile')}</Text>
          <TouchableOpacity style={styles.sellerCard} activeOpacity={0.7}>
            <View style={styles.sellerInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?u=miller' }}
                style={styles.sellerAvatar}
              />
              <View>
                <Text style={styles.sellerName}>Robert Miller</Text>
                <Text style={styles.sellerVillage}>{t('buy_machine_details.village', { name: 'Oakdale' })}</Text>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={COLORS.warning} />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Premium Location Card */}
          <Text style={styles.sectionHeading}>{t('buy_machine_details.location_title')}</Text>
          <TouchableOpacity style={styles.mapCard} activeOpacity={0.9}>
            <Image
              source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Fresno,CA&zoom=13&size=600x300&maptype=roadmap&markers=color:green%7Clabel:S%7CFresno,CA&key=YOUR_API_KEY_MOCK' }}
              style={styles.mapImg}
            />
            <View style={styles.mapOverlay}>
              <View style={styles.mapButton}>
                <MaterialIcons name="directions" size={18} color={COLORS.white} />
                <Text style={styles.mapButtonText}>Get Directions</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.mapDisclaimer}>{t('buy_machine_details.map_disclaimer')}</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.contactHidden}>{t('buy_machine_details.contact_hidden')}</Text>
          <View style={styles.footerVerified}>
            <MaterialIcons name="shield" size={12} color={COLORS.success} />
            <Text style={styles.footerVerifiedText}>{t('buy_machine_details.verified_seller')}</Text>
          </View>
        </View>
        <Button
          label={t('buy_machine_details.unlock_contact')}
          onPress={() => router.push("/buy-machine/intent" as any)}
          icon="lock-open"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

// --- Sub-components ---
const SpecItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.specBox}>
    <Text style={styles.specLabel}>{label}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

const DetailRow = ({ label, value, isGreen = false }: { label: string; value: string; isGreen?: boolean }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={isGreen ? styles.statusBadge : null}>
      <Text style={[styles.detailValue, isGreen && styles.statusText]}>{value}</Text>
    </View>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 50,
  },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: { width: '100%', height: width * 0.85, backgroundColor: COLORS.black },
  mainImage: { width: '100%', height: '100%' },
  photoCount: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  photoCountText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  thumbStrip: { paddingHorizontal: 20, paddingVertical: 16, gap: 10 },
  thumb: { width: 84, height: 68, borderRadius: 12, overflow: 'hidden', backgroundColor: COLORS.gray[100], borderWidth: 1, borderColor: COLORS.gray[100] },
  thumbActive: { borderWidth: 2, borderColor: COLORS.brand.primary },
  thumbImg: { width: '100%', height: '100%' },
  thumbVideoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentPadding: { paddingHorizontal: 20 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4
  },
  verifiedText: { color: COLORS.successDark, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  listingId: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '500' },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.text, marginBottom: 6, letterSpacing: -0.5 },
  location: { fontSize: 15, color: COLORS.textSecondary, marginBottom: 10, fontWeight: '500' },
  price: { fontSize: 36, fontWeight: '900', color: COLORS.brand.primary, marginBottom: 20 },
  safetyBox: {
    backgroundColor: COLORS.warningLight,
    borderColor: 'rgba(234, 179, 8, 0.2)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 28,
  },
  safetyTitle: { fontSize: 13, fontWeight: '900', color: COLORS.warningDark, textTransform: 'uppercase', marginBottom: 4 },
  safetyDesc: { fontSize: 13, color: COLORS.warningDark, opacity: 0.9, lineHeight: 18 },
  sectionHeading: { fontSize: 13, fontWeight: '800', color: COLORS.text, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, marginTop: 12 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  specBox: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 2,
  },
  specLabel: { fontSize: 11, color: COLORS.textSecondary, textTransform: 'uppercase', marginBottom: 6, fontWeight: '700' },
  specValue: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  listDetails: { marginBottom: 28, backgroundColor: COLORS.white, borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.gray[100] },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.gray[50] },
  detailLabel: { color: COLORS.textSecondary, fontSize: 15, fontWeight: '500' },
  detailValue: { fontWeight: '700', color: COLORS.text, fontSize: 15 },
  statusBadge: { backgroundColor: COLORS.successLight, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  statusText: { color: COLORS.successDark, fontSize: 12, fontWeight: '800' },
  subHeading: { fontSize: 11, color: COLORS.textSecondary, textTransform: 'uppercase', marginBottom: 10, fontWeight: '800', letterSpacing: 1 },
  quoteBox: { borderLeftWidth: 4, borderLeftColor: COLORS.brand.primary, paddingLeft: 16, paddingVertical: 12, backgroundColor: COLORS.white, borderRadius: 8, marginBottom: 28, borderWidth: 1, borderColor: COLORS.gray[100] },
  quoteText: { fontStyle: 'italic', color: COLORS.text, fontSize: 15, lineHeight: 22 },

  healthCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  healthHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  healthScoreWrap: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.successLight, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.success },
  healthScore: { fontSize: 18, fontWeight: '900', color: COLORS.successDark },
  healthScoreBase: { fontSize: 10, color: COLORS.successDark, fontWeight: '700' },
  healthTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  healthSub: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  healthStats: { flexDirection: 'row', gap: 16, borderTopWidth: 1, borderTopColor: COLORS.gray[50], paddingTop: 16 },
  healthStatItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  healthStatText: { fontSize: 13, color: COLORS.text, fontWeight: '600' },

  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    elevation: 2,
  },
  sellerInfo: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  sellerAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: COLORS.gray[50] },
  sellerName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  sellerVillage: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 6, fontWeight: '500' },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 52
  },
  ratingText: { fontSize: 13, fontWeight: '800', marginLeft: 3 },

  mapCard: { width: '100%', height: 160, borderRadius: 20, overflow: 'hidden', backgroundColor: COLORS.gray[100], position: 'relative' },
  mapImg: { width: '100%', height: '100%' },
  mapOverlay: { position: 'absolute', bottom: 16, right: 16 },
  mapButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.brand.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, elevation: 4 },
  mapButtonText: { color: COLORS.black, fontSize: 13, fontWeight: '800' },
  mapDisclaimer: { textAlign: 'center', fontSize: 12, color: COLORS.textSecondary, marginTop: 12, fontWeight: '500' },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
    elevation: 25,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  footerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 4 },
  contactHidden: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
  footerVerified: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerVerifiedText: { fontSize: 13, fontWeight: '700', color: COLORS.successDark },
  actionButton: { height: 56, borderRadius: 16 }
});