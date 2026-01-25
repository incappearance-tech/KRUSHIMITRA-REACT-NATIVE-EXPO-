import React from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import BackButton from '@/src/components/BackButton';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';

export default function TransporterProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { profile } = useTransporterStore();

  React.useEffect(() => {
    if (!profile) {
      router.replace('/(transporter)/register');
    }
  }, [profile, router]);

  if (!profile) return null;

  const menuItems = [
    {
      icon: 'business',
      title: t('transporter.edit_business'),
      subtitle: 'Update vehicles & radius',
      action: () => router.push('/(transporter)/edit'),
    },
    {
      icon: 'history',
      title: t('transporter.trip_history'),
      subtitle: 'Past deliveries & logs',
      action: () => router.push('/(transporter)/history'),
    },
    {
      icon: 'payments',
      title: t('transporter.payment_history'),
      subtitle: 'Plan subsciptions & receipts',
      action: () => router.push('/(transporter)/payment-history'),
    },
    {
      icon: 'language',
      title: t('dashboard.change_language'),
      action: () => router.push('/(auth)/language'),
    },
    {
      icon: 'help-outline',
      title: t('transporter.support'),
      action: () =>
        Alert.alert('Support', 'Contact Transporter Care: +91 1800-456-789'),
    },
    {
      icon: 'logout',
      title: t('common.logout'),
      action: () => {
        Alert.alert(t('common.logout'), 'Are you sure?', [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.logout'),
            style: 'destructive',
            onPress: () => router.replace('/'),
          },
        ]);
      },
      destructive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>
            {t('transporter.business_profile')}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(transporter)/edit')}>
            <MaterialIcons name="edit" size={24} color={COLORS.brand.primary} />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.avatarSection}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtbS_uvvRIPfkAPYsl7xYrbH0IpXVSbUO1I3BktIYTSKAh8fz-F71mFhwlwZXT9Y9ERSEcwbcYL-clZYBVAOAD2fOSIIAeHbdDJ3f_13eQ_t3vhp20lk27OB3-CJ_XueC0W5Kv6FLpUWP_pbfRL6UzX4htFygc6hiG9nyVySPasYaofS7wcikpdkIBbgWjBfytu6MT96DND1onCXYVh9bJ0L_bD70WzcmtMUzE2KKABsmG19F93cZlDUWdY8OvPltgZIdU4j2KULg',
              }}
              style={styles.logo}
            />
            <View style={styles.badge}>
              <MaterialIcons name="local-shipping" size={14} color="#fff" />
            </View>
          </View>
          <Text style={styles.bizName}>{profile.name}</Text>
          <Text style={styles.bizLoc}>{profile.location}</Text>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={18} color="#eab308" />
            <Text style={styles.ratingVal}>
              {profile.rating} •{' '}
              {profile.verified ? t('common.verified') : 'Member'}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statLine}>
            <View style={styles.statItem}>
              <Text style={styles.statValNum}>{profile.tripsCompleted}</Text>
              <Text style={styles.statLabText}>
                {t('transporter.trips_done')}
              </Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValNum}>{profile.operatingRadius}km</Text>
              <Text style={styles.statLabText}>{t('transporter.radius')}</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValNum}>{profile.leadsReceived}</Text>
              <Text style={styles.statLabText}>{t('transporter.leads')}</Text>
            </View>
          </View>
        </View>

        {/* Vehicles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.secTitle}>
              {t('transporter.my_fleet')} ({profile.vehicles?.length || 0})
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(transporter)/add-vehicle')}
            >
              <Text style={styles.addLink}>+ {t('dashboard.add')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.vehicleList}>
            {profile.vehicles && profile.vehicles.length > 0 ? (
              profile.vehicles.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={styles.fleetCard}
                  onPress={() =>
                    router.push(`/(transporter)/edit-vehicle?id=${v.id}`)
                  }
                >
                  <View style={styles.fleetIcon}>
                    <MaterialIcons
                      name="local-shipping"
                      size={20}
                      color={COLORS.brand.primary}
                    />
                  </View>
                  <View style={styles.fleetInfo}>
                    <Text style={styles.fleetNumber}>{v.number}</Text>
                    <Text style={styles.fleetType}>
                      {v.type} • {v.model}
                    </Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color="#d1d5db"
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyFleetText}>
                No vehicles registered yet.
              </Text>
            )}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuBox}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.mItem}
              onPress={item.action}
            >
              <View
                style={[
                  styles.mIcon,
                  item.destructive && { backgroundColor: '#fee2e2' },
                ]}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={20}
                  color={item.destructive ? '#dc2626' : COLORS.brand.primary}
                />
              </View>
              <View style={styles.mContent}>
                <Text
                  style={[
                    styles.mTitle,
                    item.destructive && { color: '#dc2626' },
                  ]}
                >
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text style={styles.mSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#d1d5db" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  card: { alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  avatarSection: { position: 'relative', marginBottom: 16 },
  logo: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#f3f4f6' },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.brand.primary,
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  bizName: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  bizLoc: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  ratingVal: { fontSize: 14, fontWeight: '600', color: '#4b5563' },
  statsContainer: { paddingHorizontal: 20, marginTop: -10 },
  statLine: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValNum: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  statLabText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  vDivider: { width: 1, height: '100%', backgroundColor: '#f3f4f6' },
  section: { padding: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  secTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  addLink: { fontSize: 14, fontWeight: '700', color: COLORS.brand.primary },
  vehicleList: { gap: 12 },
  fleetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  fleetIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fleetInfo: { flex: 1 },
  fleetNumber: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  fleetType: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  emptyFleetText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  menuBox: { paddingHorizontal: 20 },
  mItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  mIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mContent: { flex: 1 },
  mTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  mSubtitle: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
});
