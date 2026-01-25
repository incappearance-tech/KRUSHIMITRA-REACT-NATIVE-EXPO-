import React from 'react';

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../constants/colors';

/**
 * HOME TAB - FOCUSED DASHBOARD
 * Entry point for the 6 core farmer actions.
 */
export default function HomeTab() {
  const { t } = useTranslation();
  const router = useRouter();

  const actions = [
    {
      title: t('farmer.sell_machine'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'sell',
      link: '/sell-machine',
    },
    {
      title: t('farmer.buy_machine'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'shopping-cart',
      link: '/buy-machine/list',
    },
    {
      title: t('farmer.rent_out'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'output',
      link: '/rent-out',
    },
    {
      title: t('farmer.rent_in'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'schedule',
      link: '/rent-in',
    },
    {
      title: t('farmer.labour'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'engineering',
      link: '/labour',
    },
    {
      title: t('farmer.transport'),
      subtitle: t('dashboard.quick_actions_sub'),
      icon: 'local-shipping',
      link: '/transport/search',
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="agriculture" size={24} color={COLORS.success} />
          <Text style={styles.headerTitle}>KrushiMitra</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.notifBtn}>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={COLORS.text}
          />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* QUICK ACTIONS GRID */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>{t('dashboard.quick_actions')}</Text>
          <Text style={styles.subtitle}>
            {t('dashboard.quick_actions_sub')}
          </Text>
        </View>

        <View style={styles.gridAction}>
          {actions.map((action, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.cardAction,
                pressed && styles.cardPressed,
              ]}
              onPress={() => action.link && router.push(action.link)}
            >
              <View style={styles.iconWrap}>
                <MaterialIcons
                  name={action.icon as any}
                  size={28}
                  color={COLORS.brand.primary}
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>{action.title}</Text>
                <Text style={styles.cardSubtitle}>{action.subtitle}</Text>
              </View>

              <MaterialIcons
                name="arrow-forward"
                size={18}
                color={COLORS.gray[300]}
                style={styles.arrow}
              />
            </Pressable>
          ))}
        </View>

        {/* ALERTS SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t('dashboard.alerts').toUpperCase()}
          </Text>
        </View>

        <AlertItem
          icon="warning"
          color={COLORS.danger}
          title={t('dashboard.profile_incomplete')}
          text={t('dashboard.profile_incomplete_desc')}
          action={t('dashboard.add')}
          danger
        />
        <AlertItem
          icon="schedule"
          color={COLORS.warning}
          title={t('dashboard.expiring_soon')}
          text={t('dashboard.expiring_soon_desc')}
          action={t('dashboard.renew')}
        />
        <AlertItem
          icon="visibility"
          color={COLORS.info}
          title={t('dashboard.performance')}
          text={`15 ${t('dashboard.performance_desc')}`}
        />
      </ScrollView>
    </View>
  );
}

const AlertItem = ({ icon, title, text, action, color, danger }: any) => (
  <View style={[styles.alertRow, danger && styles.alertDanger]}>
    <MaterialIcons name={icon} size={18} color={color} />
    <View style={{ flex: 1 }}>
      <Text style={[styles.alertTitle, { color }]}>{title}</Text>
      <Text style={styles.alertText}>{text}</Text>
    </View>
    {action && (
      <Pressable style={styles.alertBtn}>
        <Text style={styles.alertBtnText}>{action}</Text>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.background,
  },
  headerLeft: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  notifBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: COLORS.danger,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },

  heroSection: { marginBottom: 16, marginTop: 8 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },

  gridAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  cardAction: {
    width: '48.2%',
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardPressed: { transform: [{ scale: 0.98 }] },
  iconWrap: {
    height: 48,
    width: 48,
    borderRadius: 14,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  cardSubtitle: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  arrow: { position: 'absolute', top: 16, right: 16 },

  sectionHeader: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.gray[400],
    letterSpacing: 1,
  },

  alertRow: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  alertDanger: {
    backgroundColor: COLORS.dangerLight,
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  alertTitle: { fontSize: 11, fontWeight: '800' },
  alertText: { fontSize: 13, color: COLORS.text, marginTop: 1 },
  alertBtn: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  alertBtnText: { fontSize: 11, fontWeight: '700', color: COLORS.text },
});
