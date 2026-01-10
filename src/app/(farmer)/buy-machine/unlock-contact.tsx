import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';



export default function ContactSellerSuccess() {
  return (
    <SafeAreaProvider>
      <ContactContent />
    </SafeAreaProvider>
  );
}

function ContactContent() {
  const insets = useSafeAreaInsets();
  const phoneNumber = "+919876543210";

  const handleCall = () => Linking.openURL(`tel:${phoneNumber}`);
  const handleWhatsApp = () => Linking.openURL(`whatsapp://send?phone=${9527398933}&text=Hello, I am interested in your John Deere tractor.`);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Seller</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <MaterialIcons name="check-circle" size={48} color="#15803d" />
          </View>
          <Text style={styles.successTitle}>Contact Details Unlocked</Text>
          <Text style={styles.successSubtitle}>You can now connect with the seller directly</Text>
        </View>

        {/* Machine Context Card */}
        <View style={styles.machineMiniCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=150' }}
            style={styles.miniImg}
          />
          <View style={styles.miniInfo}>
            <Text style={styles.miniTitle} numberOfLines={1}>John Deere 5050D - 2018</Text>
            <Text style={styles.miniId}>MACHINE ID: #TR-8821</Text>
          </View>
          <MaterialIcons name="open-in-new" size={20} color={COLORS.success} />
        </View>

        {/* Seller Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?u=ram' }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={10} color="black" />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <Text style={styles.sellerName}>Ram Singh</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={COLORS.textSecondary} />
            <Text style={styles.locationText}>Bhatinda, Punjab (5km away)</Text>
          </View>

          <View style={styles.phoneBox}>
            <Text style={styles.phoneText}>+91 98765 43210</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionArea}>
            <View style={styles.actionArea}>
              <Button
                label="Call Seller Now"
                onPress={handleCall}
                icon="call"
                backgroundColor={COLORS.brand.primary}
                textColor={COLORS.black}
              />

              <Button
                label="Message on WhatsApp"
                onPress={handleWhatsApp}
                backgroundColor="white"
                borderColor="#25D366"
                textColor="#25D366"
                icon="chat"
              />
            </View>
          </View>
        </View>

        {/* Offline Disclaimer */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color={COLORS.info} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Deal Directly Offline</Text>
            <Text style={styles.infoDesc}>
              This app connects you directly. There is no chat feature inside the app. Please call or WhatsApp the seller to negotiate.
            </Text>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.safetyHeader}>
          <MaterialIcons name="shield" size={20} color={COLORS.textSecondary} />
          <Text style={styles.safetyTitleText}>Safety Tips</Text>
        </View>
        <View style={styles.safetyList}>
          <SafetyItem icon="visibility" color={COLORS.warning} text="Always inspect the machine in person before making any payment." />
          <SafetyItem icon="payments" color={COLORS.danger} text="Do not send advance money online without verifying documents." />
          <SafetyItem icon="description" color={COLORS.info} text="Check RC and insurance validity before finalizing the deal." />
        </View>

        {/* Footer Support */}
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportText}>Need Help? Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// --- Helpers ---
const SafetyItem = ({ icon, color, text }) => (
  <View style={styles.safetyItem}>
    <MaterialIcons name={icon} size={20} color={color} />
    <Text style={styles.safetyItemText}>{text}</Text>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(246,248,246,0.95)'
  },
  iconButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },

  scrollContent: { padding: 16 },

  successHeader: { alignItems: 'center', marginVertical: 12 },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.brand.muted, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  successTitle: { fontSize: 24, fontWeight: '900', color: COLORS.text, textAlign: 'center' },
  successSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },

  machineMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24
  },
  miniImg: { width: 64, height: 64, borderRadius: 8 },
  miniInfo: { flex: 1, paddingHorizontal: 12 },
  miniTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  miniId: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2, letterSpacing: 0.5 },

  profileCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(55,236,19,0.2)',
    marginBottom: 24,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 }, android: { elevation: 3 } })
  },
  avatarContainer: { marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: COLORS.brand.muted },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.brand.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderWidth: 2,
    borderColor: 'white'
  },
  verifiedText: { fontSize: 9, fontWeight: '900', color: 'black' },
  sellerName: { fontSize: 24, fontWeight: '700', color: COLORS.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
  phoneBox: {
    marginTop: 16,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  phoneText: { fontSize: 20, fontWeight: '800', color: COLORS.text, letterSpacing: 1.5 },

  actionArea: { width: '100%', gap: 12, marginTop: 24 },
  callButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  callButtonText: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  whatsappButton: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#25D366'
  },
  whatsappButtonText: { fontSize: 18, fontWeight: '700', color: '#25D366' },

  infoBox: {
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.infoLight,
    marginBottom: 24
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.infoDark, marginBottom: 2 },
  infoDesc: { fontSize: 13, color: COLORS.infoDark, opacity: 0.8, lineHeight: 18 },

  safetyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4, marginBottom: 12 },
  safetyTitleText: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  safetyList: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden'
  },
  safetyItem: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center'
  },
  safetyItemText: { flex: 1, fontSize: 14, color: COLORS.text, lineHeight: 20 },

  supportButton: { marginTop: 24, padding: 16, alignItems: 'center' },
  supportText: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary }
});