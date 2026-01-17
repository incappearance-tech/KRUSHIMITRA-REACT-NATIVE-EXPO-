import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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



import { useTranslation } from 'react-i18next';

export default function ContactSellerSuccess() {
  return (
    <SafeAreaProvider>
      <ContactContent />
    </SafeAreaProvider>
  );
}

function ContactContent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const phoneNumber = "+919876543210";

  const handleCall = () => Linking.openURL(`tel:${phoneNumber}`);
  const handleWhatsApp = () => Linking.openURL(`whatsapp://send?phone=${9527398933}&text=${encodeURIComponent(t('contact_success.whatsapp_message', { defaultValue: 'Hello, I am interested in your John Deere tractor.' }))}`);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <AppBar title={t('contact_success.title')}/>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <MaterialIcons name="check-circle" size={48} color={COLORS.brand.primary} />
          </View>
          <Text style={styles.successTitle}>{t('contact_success.unlocked')}</Text>
          <Text style={styles.successSubtitle}>{t('contact_success.subtitle')}</Text>
        </View>

        {/* Machine Context Card */}
        <View style={styles.machineMiniCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1594411127027-02488e0e0f3e?q=80&w=150' }}
            style={styles.miniImg as any}
          />
          <View style={styles.miniInfo}>
            <Text style={styles.miniTitle} numberOfLines={1}>John Deere 5050D - 2018</Text>
            <Text style={styles.miniId}>{t('contact_success.machine_id', { id: '#TR-8821' })}</Text>
          </View>
          <MaterialIcons name="open-in-new" size={20} color={COLORS.success} />
        </View>

        {/* Seller Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?u=ram' }}
              style={styles.avatar as any}
            />
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={10} color="black" />
              <Text style={styles.verifiedText}>{t('contact_success.verified')}</Text>
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
                label={t('contact_success.call_now')}
                onPress={handleCall}
                icon="call"
              />

              <Button
                label={t('contact_success.whatsapp')}
                onPress={handleWhatsApp}
                backgroundColor="white"
                borderColor={COLORS.brand.primary}
                textColor={COLORS.brand.primary}
                icon="chat"
              />
            </View>
          </View>
        </View>

        {/* Offline Disclaimer */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color={COLORS.info} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>{t('contact_success.deal_offline')}</Text>
            <Text style={styles.infoDesc}>
              {t('contact_success.offline_desc')}
            </Text>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.safetyHeader}>
          <MaterialIcons name="shield" size={20} color={COLORS.textSecondary} />
          <Text style={styles.safetyTitleText}>{t('contact_success.safety_tips')}</Text>
        </View>
        <View style={styles.safetyList}>
          <SafetyItem icon="visibility" color={COLORS.warning} text={t('contact_success.safety_item_1')} />
          <SafetyItem icon="payments" color={COLORS.danger} text={t('contact_success.safety_item_2')} />
          <SafetyItem icon="description" color={COLORS.info} text={t('contact_success.safety_item_3')} />
        </View>

        {/* Footer Support */}
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportText}>{t('contact_success.need_help')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// --- Helpers ---
import { ISafetyItemProps } from '@/src/types/buy-machine/unlock-contact';
import AppBar from '@/src/components/AppBar';

const SafetyItem = ({ icon, color, text }: ISafetyItemProps) => (
  <View style={styles.safetyItem}>
    <MaterialIcons name={icon} size={20} color={color} />
    <Text style={styles.safetyItemText}>{text}</Text>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background ,paddingHorizontal:16},
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
    backgroundColor: COLORS.brand.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: COLORS.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  callButtonText: { fontSize: 18, fontWeight: '700', color: COLORS.text },
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