import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from 'expo-router/build/global-state/routing';

const { width } = Dimensions.get('window');

// --- Theme Constants ---
const COLORS = {
  primary: '#37ec13',
  bgLight: '#f6f8f6',
  cardBg: '#ffffff',
  textDark: '#101b0d',
  textGray: '#6b7280',
  border: '#e5e7eb',
  warningBg: '#fefce8',
  warningText: '#854d0e',
};

export default function MachineDetailsScreen() {
  return (
    <SafeAreaProvider>
      <MachineDetailsContent />
    </SafeAreaProvider>
  );
}

function MachineDetailsContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Floating Header Buttons */}
      <View style={[styles.headerActions, { top: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="share" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="favorite-border" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Main Image & Gallery Label */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=1000' }} 
            style={styles.mainImage} 
          />
          <View style={styles.photoCount}>
            <MaterialIcons name="grid-view" size={14} color="white" />
            <Text style={styles.photoCountText}>See All 5 Photos</Text>
          </View>
        </View>

        {/* Thumbnail Strip */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.thumbStrip}
        >
          <View style={[styles.thumb, styles.thumbActive]}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=200' }} style={styles.thumbImg} />
          </View>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.thumb}>
              <View style={styles.thumbPlaceholder} />
            </View>
          ))}
        </ScrollView>

        {/* Info Header */}
        <View style={styles.contentPadding}>
          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color="#15803d" />
              <Text style={styles.verifiedText}>Verified Listing</Text>
            </View>
            <Text style={styles.listingId}>ID: #TR-4059</Text>
          </View>

          <Text style={styles.title}>John Deere 5050 D</Text>
          <Text style={styles.location}>Located in Fresno, CA</Text>
          <Text style={styles.price}>$12,500</Text>

          {/* Safety Box */}
          <View style={styles.safetyBox}>
            <MaterialIcons name="warning" size={20} color="#ca8a04" />
            <View style={{ flex: 1 }}>
              <Text style={styles.safetyTitle}>Safety First</Text>
              <Text style={styles.safetyDesc}>Always inspect the machine physically before making any payment.</Text>
            </View>
          </View>

          {/* Specs Grid */}
          <Text style={styles.sectionHeading}>Machine Details</Text>
          <View style={styles.specsGrid}>
            <SpecItem label="Make Year" value="2018" />
            <SpecItem label="Engine Power" value="50 HP" />
            <SpecItem label="Hours Used" value="2,500 Hrs" />
            <SpecItem label="Tyre Condition" value="80% New" />
          </View>

          {/* List Details */}
          <View style={styles.listDetails}>
            <DetailRow label="Availability" value="Immediate" isGreen />
            <DetailRow label="RC Available" value="Yes" />
            <DetailRow label="Insurance" value="Valid till Dec 2024" />
          </View>

          {/* Selling Reason */}
          <Text style={styles.subHeading}>Reason for Selling</Text>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>"Upgrading to a higher HP model for new farming equipment."</Text>
          </View>

          {/* Seller Profile */}
          <Text style={styles.sectionHeading}>Seller Profile</Text>
          <TouchableOpacity style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=miller' }} 
                style={styles.sellerAvatar} 
              />
              <View>
                <Text style={styles.sellerName}>Robert Miller</Text>
                <Text style={styles.sellerVillage}>Village: Oakdale</Text>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color="#eab308" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>

          {/* Location Map Placeholder */}
          <Text style={styles.sectionHeading}>Location</Text>
          <View style={styles.mapContainer}>
             <View style={styles.mapPlaceholder}>
                <View style={styles.mapMarker}>
                   <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
                </View>
             </View>
          </View>
          <Text style={styles.mapDisclaimer}>Approximate location shown for safety</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom) }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.contactHidden}>Contact hidden for privacy</Text>
          <View style={styles.footerVerified}>
            <MaterialIcons name="shield" size={12} color={COLORS.primary} />
            <Text style={styles.footerVerifiedText}>Verified Seller</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={()=>navigate("/buy-machine/intent")}>
          <MaterialIcons name="lock-open" size={20} color={COLORS.textDark} />
          <Text style={styles.primaryButtonText}>Unlock Seller Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Sub-components ---

const SpecItem = ({ label, value }) => (
  <View style={styles.specBox}>
    <Text style={styles.specLabel}>{label}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

const DetailRow = ({ label, value, isGreen }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={isGreen ? styles.statusBadge : null}>
      <Text style={[styles.detailValue, isGreen && styles.statusText]}>{value}</Text>
    </View>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: { width: '100%', height: width * 0.75, backgroundColor: '#ddd' },
  mainImage: { width: '100%', height: '100%' },
  photoCount: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoCountText: { color: 'white', fontSize: 10, fontWeight: '600' },
  thumbStrip: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  thumb: { width: 80, height: 64, borderRadius: 8, overflow: 'hidden', backgroundColor: '#e5e7eb' },
  thumbActive: { borderWidth: 2, borderColor: COLORS.primary },
  thumbImg: { width: '100%', height: '100%' },
  thumbPlaceholder: { width: '100%', height: '100%', backgroundColor: '#d1d5db', opacity: 0.7 },
  contentPadding: { paddingHorizontal: 20 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  verifiedBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(55,236,19,0.15)', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4,
    gap: 4
  },
  verifiedText: { color: '#15803d', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  listingId: { color: COLORS.textGray, fontSize: 12 },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  location: { fontSize: 14, color: COLORS.textGray, marginBottom: 8 },
  price: { fontSize: 32, fontWeight: '800', color: COLORS.primary, marginBottom: 16 },
  safetyBox: {
    backgroundColor: COLORS.warningBg,
    borderColor: '#fef08a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  safetyTitle: { fontSize: 12, fontWeight: '800', color: COLORS.warningText, textTransform: 'uppercase', marginBottom: 2 },
  safetyDesc: { fontSize: 12, color: COLORS.warningText, opacity: 0.8 },
  sectionHeading: { fontSize: 12, fontWeight: '700', color: COLORS.textDark, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginTop: 8 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  specBox: { 
    width: (width - 50) / 2, 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#f1f5f9' 
  },
  specLabel: { fontSize: 10, color: COLORS.textGray, textTransform: 'uppercase', marginBottom: 4 },
  specValue: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  listDetails: { marginBottom: 24 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  detailLabel: { color: COLORS.textGray, fontSize: 14 },
  detailValue: { fontWeight: '600', color: COLORS.textDark, fontSize: 14 },
  statusBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  statusText: { color: '#15803d' },
  subHeading: { fontSize: 10, color: COLORS.textGray, textTransform: 'uppercase', marginBottom: 8 },
  quoteBox: { borderLeftWidth: 3, borderLeftColor: COLORS.primary, paddingLeft: 12, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 4 },
  quoteText: { fontStyle: 'italic', color: COLORS.textDark, fontSize: 14 },
  sellerCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  sellerInfo: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  sellerAvatar: { width: 56, height: 56, borderRadius: 28 },
  sellerName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  sellerVillage: { fontSize: 12, color: COLORS.textGray, marginBottom: 4 },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    width: 45
  },
  ratingText: { fontSize: 12, fontWeight: '700', marginLeft: 2 },
  mapContainer: { width: '100%', height: 128, borderRadius: 16, overflow: 'hidden', backgroundColor: '#e2e8f0' },
  mapPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#cbd5e1' },
  mapMarker: { backgroundColor: 'white', padding: 8, borderRadius: 20, elevation: 4 },
  mapDisclaimer: { textAlign: 'center', fontSize: 11, color: COLORS.textGray, marginTop: 8 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  footerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
  contactHidden: { fontSize: 12, color: COLORS.textGray },
  footerVerified: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerVerifiedText: { fontSize: 12, fontWeight: '600', color: '#15803d' },
  primaryButton: { 
    height: 56, 
    backgroundColor: COLORS.primary, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
  },
  primaryButtonText: { color: COLORS.textDark, fontSize: 16, fontWeight: '700' },
});