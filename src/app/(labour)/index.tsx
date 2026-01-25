import React, { useEffect } from 'react';

import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import { COLORS } from '@/src/constants/colors';
import { useLabourStore } from '@/src/store/labour.store';

export default function LabourDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const { profile, leads } = useLabourStore();

  useEffect(() => {
    if (!profile) {
      router.replace('/(labour)/register');
    }
  }, [profile, router]);

  if (!profile) return null;

  const handleCallLead = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header Profile Info */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.greeting}>
              {t('labour.greeting')}, {profile.name.split(' ')[0]}
            </Text>
            <Text style={styles.subGreeting}>{t('labour.subtitle')}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(labour)/profile')}>
            <MaterialIcons
              name="account-circle"
              size={48}
              color={COLORS.brand.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Stats Dashboard */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="call" size={24} color={COLORS.info} />
            <Text style={styles.statValue}>
              {profile.callsReceived || leads.length}
            </Text>
            <Text style={styles.statLabel}>{t('labour.farmer_leads')}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="work" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>{profile.jobsCompleted}</Text>
            <Text style={styles.statLabel}>{t('labour.jobs_done')}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="star" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>{profile.rating}</Text>
            <Text style={styles.statLabel}>{t('labour.rating')}</Text>
          </View>
        </View>

        {/* Recent Leads Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {t('labour.recent_inquiries')}
            </Text>
            <MaterialIcons name="history" size={20} color={COLORS.textLight} />
          </View>

          {leads.length > 0 ? (
            leads.map((lead) => (
              <View key={lead.id} style={styles.leadCard}>
                <View style={styles.leadInfo}>
                  <View style={styles.leadHeader}>
                    <Text style={styles.farmerName}>{lead.farmerName}</Text>
                    <Text style={styles.leadDate}>{lead.date}</Text>
                  </View>
                  <View style={styles.leadDetails}>
                    <MaterialIcons
                      name="location-on"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.leadLocText}>{lead.location}</Text>
                  </View>
                  <View style={styles.workTag}>
                    <Text style={styles.workTagText}>{lead.type}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => handleCallLead(lead.farmerPhone)}
                >
                  <MaterialIcons name="call" size={20} color={COLORS.white} />
                  <Text style={styles.callBtnText}>
                    {t('labour.call_back')}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="notifications-none"
                size={48}
                color={COLORS.gray[300]}
              />
              <Text style={styles.emptyText}>{t('labour.no_leads')}</Text>
              <Text style={styles.emptySubText}>
                {t('labour.no_leads_subtitle')}
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  headerInfo: { flex: 1 },
  greeting: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subGreeting: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: { paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  leadCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    elevation: 1,
  },
  leadInfo: { flex: 1 },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  farmerName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  leadDate: { fontSize: 12, color: COLORS.textLight },
  leadDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  leadLocText: { fontSize: 14, color: COLORS.textSecondary },
  workTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  workTagText: { fontSize: 12, fontWeight: '600', color: COLORS.successDark },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.brand.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  callBtnText: { color: COLORS.black, fontWeight: '700', fontSize: 15 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});
