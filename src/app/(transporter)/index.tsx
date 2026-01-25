import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';

const { width } = Dimensions.get('window');

export default function TransporterDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const { profile, leads, updateLeadStatus } = useTransporterStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');

  // Quick Actions with translations
  const QUICK_ACTIONS = [
    {
      title: t('transporter.add_vehicle'),
      icon: 'add-business',
      color: '#dcfce7',
      iconCol: '#16a34a',
      route: '/(transporter)/add-vehicle',
    }, // Green
    {
      title: t('transporter.my_drivers'),
      icon: 'people',
      color: '#ffedd5',
      iconCol: '#ea580c',
      route: '/(transporter)/drivers',
    }, // Orange
    {
      title: t('transporter.trip_history'),
      icon: 'history',
      color: '#f3e8ff',
      iconCol: '#9333ea',
      route: '/(transporter)/history',
    }, // Purple
  ];

  useEffect(() => {
    if (!profile) {
      router.replace('/(transporter)/register');
    }
  }, [profile, router]);

  if (!profile) return null;

  const pendingLeads = leads.filter((l) => l.status === 'pending');
  const activeLeads = leads.filter((l) => l.status === 'accepted');

  const handleCallLead = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. HEADER section */}
      <View style={styles.header}>
        <View style={styles.userBox}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              style={styles.avatar}
            />
            <View style={styles.activeIndicator} />
          </View>
          <View>
            <Text style={styles.welcomeLabel}>
              {t('transporter.fleet_owner')}
            </Text>
            <Text style={styles.userName}>{profile.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(transporter)/profile')}
          style={styles.profileIconBtn}
        >
          <MaterialIcons name="settings" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* 2. FLEET METRICS */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <MaterialIcons
              name="speed"
              size={24}
              color={COLORS.brand.primary}
            />
            <Text style={styles.metricVal}>{profile.tripsCompleted}</Text>
            <Text style={styles.metricLabel}>
              {t('transporter.trips_done')}
            </Text>
          </View>
          <View style={styles.metricCard}>
            <MaterialIcons name="local-shipping" size={24} color="#3b82f6" />
            <Text style={styles.metricVal}>
              {profile.vehicles?.length || 0}
            </Text>
            <Text style={styles.metricLabel}>{t('transporter.vehicles')}</Text>
          </View>
          <View style={styles.metricCard}>
            <MaterialIcons name="star" size={24} color="#eab308" />
            <Text style={styles.metricVal}>4.8</Text>
            <Text style={styles.metricLabel}>{t('transporter.rating')}</Text>
          </View>
        </View>

        {/* 3. QUICK ACTIONS GRID */}
        <Text style={styles.sectionTitle}>
          {t('transporter.quick_actions')}
        </Text>
        <View style={styles.actionGrid}>
          {QUICK_ACTIONS.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(action.route as any)}
            >
              <View
                style={[
                  styles.actionIconBox,
                  { backgroundColor: action.color },
                ]}
              >
                <MaterialIcons
                  name={action.icon as any}
                  size={24}
                  color={action.iconCol}
                />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. TRIP MANAGER */}
        <Text style={styles.sectionTitle}>{t('transporter.trip_manager')}</Text>
        <View style={styles.tripManagerContainer}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
              onPress={() => setActiveTab('pending')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'pending' && styles.tabTextActive,
                ]}
              >
                {t('transporter.leads')} ({pendingLeads.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'active' && styles.tabActive]}
              onPress={() => setActiveTab('active')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'active' && styles.tabTextActive,
                ]}
              >
                {t('transporter.active')} ({activeLeads.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <View style={styles.listContainer}>
            {(activeTab === 'pending' ? pendingLeads : activeLeads).length >
            0 ? (
              (activeTab === 'pending' ? pendingLeads : activeLeads).map(
                (lead) => (
                  <View key={lead.id} style={styles.tripCard}>
                    <View style={styles.tripHeader}>
                      <View style={styles.tripBadge}>
                        <MaterialIcons
                          name="local-shipping"
                          size={14}
                          color="#0f172a"
                        />
                        <Text style={styles.tripBadgeText}>
                          {lead.vehicleType}
                        </Text>
                      </View>
                      <Text style={styles.tripDate}>{lead.date}</Text>
                    </View>

                    <View style={styles.routeRow}>
                      <View style={styles.routePoint}>
                        <View style={styles.dotGreen} />
                        <Text style={styles.routeText} numberOfLines={1}>
                          {lead.pickupLocation}
                        </Text>
                      </View>
                      <View style={styles.routeLine} />
                      <View style={styles.routePoint}>
                        <View style={styles.dotRed} />
                        <Text style={styles.routeText} numberOfLines={1}>
                          {lead.dropLocation}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.farmerRow}>
                      <View style={styles.farmerInfo}>
                        <MaterialIcons
                          name="account-circle"
                          size={20}
                          color="#94a3b8"
                        />
                        <Text style={styles.farmerName}>{lead.farmerName}</Text>
                      </View>
                      {activeTab === 'active' && (
                        <TouchableOpacity
                          style={styles.callSmallBtn}
                          onPress={() => handleCallLead(lead.farmerPhone)}
                        >
                          <MaterialIcons name="call" size={16} color="#fff" />
                          <Text style={styles.callSmallText}>
                            {t('transporter.call')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {activeTab === 'pending' && (
                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={styles.rejectBtn}
                          onPress={() => updateLeadStatus(lead.id, 'rejected')}
                        >
                          <Text style={styles.rejectText}>
                            {t('transporter.decline')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.acceptBtn}
                          onPress={() => updateLeadStatus(lead.id, 'accepted')}
                        >
                          <Text style={styles.acceptText}>
                            {t('transporter.accept_trip')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ),
              )
            ) : (
              <View style={styles.emptyState}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486744.png',
                  }}
                  style={{ width: 64, height: 64, opacity: 0.5 }}
                />
                <Text style={styles.emptyText}>
                  {activeTab === 'pending'
                    ? t('transporter.no_leads')
                    : t('transporter.no_active')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  userBox: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  welcomeLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  userName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  profileIconBtn: { padding: 8, borderRadius: 20, backgroundColor: '#f1f5f9' },

  // Metrics
  metricsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },

  // Actions
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: (width - 44) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', flex: 1 },

  // Trip Manager
  tripManagerContainer: { flex: 1 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#f1f5f9' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#0f172a' },
  listContainer: { gap: 12 },
  tripCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tripBadgeText: { fontSize: 11, fontWeight: '700', color: '#0f172a' },
  tripDate: { fontSize: 11, color: '#64748b', fontWeight: '500' },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  routePoint: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  routeLine: { width: 20, height: 1, backgroundColor: '#e2e8f0' },
  dotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16a34a',
  },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  routeText: { fontSize: 13, fontWeight: '600', color: '#0f172a', flex: 1 },

  farmerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f8fafc',
  },
  farmerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  farmerName: { fontSize: 13, fontWeight: '600', color: '#64748b' },

  callSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#16a34a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  callSmallText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  actionRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  rejectText: { color: '#ef4444', fontWeight: '700', fontSize: 13 },
  acceptBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.brand.primary,
  },
  acceptText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },
});
