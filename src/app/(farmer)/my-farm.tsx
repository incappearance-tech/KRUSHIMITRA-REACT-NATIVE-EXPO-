import React, { useState } from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import { COLORS } from '@/src/constants/colors';

// --- Mock Data ---
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'John Deere 5050D',
    type: 'Rent Out',
    status: 'Active',
    views: 45,
    date: '22 Jan',
  },
  {
    id: '2',
    title: 'Wheat Thresher',
    type: 'Sell',
    status: 'Pending',
    views: 12,
    date: '20 Jan',
  },
];

const MOCK_ORDERS = [
  {
    id: '1',
    title: 'Harvester Booking',
    type: 'Rent In',
    status: 'Confirmed',
    date: '25 Jan',
    provider: 'Ramesh Patil',
  },
  {
    id: '2',
    title: 'Labour Request',
    type: 'Labour',
    status: 'Completed',
    date: '18 Jan',
    provider: 'Suresh G.',
  },
];

export default function MyFarmScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'listings' | 'orders'>('listings');

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppBar
        title="My Farm Info"
        rightIcon={
          <MaterialIcons name="search" size={24} color={COLORS.text} />
        }
        onRightPress={() => {}}
      />

      {/* Custom Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'listings' && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab('listings')}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'listings' && styles.tabLabelActive,
            ]}
          >
            My Listings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'orders' && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab('orders')}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'orders' && styles.tabLabelActive,
            ]}
          >
            My Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.tabContent}>
        {activeTab === 'listings' ? (
          MOCK_LISTINGS.length > 0 ? (
            <FlatList
              data={MOCK_LISTINGS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.cardRow}>
                    <View style={styles.iconBox}>
                      <MaterialIcons
                        name={item.type === 'Rent Out' ? 'schedule' : 'sell'}
                        size={20}
                        color={COLORS.brand.primary}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardSub}>
                        {item.type} • Posted {item.date}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.badge,
                        item.status === 'Active'
                          ? styles.badgeGreen
                          : styles.badgeOrange,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          item.status === 'Active'
                            ? styles.textGreen
                            : styles.textOrange,
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.viewRow}>
                      <MaterialIcons
                        name="visibility"
                        size={16}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.viewText}>{item.views} Views</Text>
                    </View>
                    <TouchableOpacity style={styles.manageBtn}>
                      <Text style={styles.manageText}>Manage</Text>
                      <MaterialIcons
                        name="chevron-right"
                        size={16}
                        color={COLORS.brand.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={{ gap: 16, padding: 16 }}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="inventory"
                size={48}
                color={COLORS.gray[300]}
              />
              <Text style={styles.emptyText}>No listings yet.</Text>
              <Button
                label="+ Add Listing"
                onPress={() => router.push('/(farmer)/sell-machine')}
                style={{ marginTop: 16, width: 200 }}
              />
            </View>
          )
        ) : MOCK_ORDERS.length > 0 ? (
          <FlatList
            data={MOCK_ORDERS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: COLORS.successLight },
                    ]}
                  >
                    <MaterialIcons
                      name="shopping-bag"
                      size={20}
                      color={COLORS.successDark}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSub}>
                      {item.type} • {item.date}
                    </Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={COLORS.gray[300]}
                  />
                </View>
                <View style={styles.orderFooter}>
                  <Text style={styles.providerText}>
                    Provider: {item.provider}
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      item.status === 'Confirmed'
                        ? styles.textGreen
                        : styles.textGray,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ gap: 16, padding: 16 }}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="history" size={48} color={COLORS.gray[300]} />
            <Text style={styles.emptyText}>No active orders.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabItemActive: { borderBottomColor: COLORS.brand.primary },
  tabLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  tabLabelActive: { color: COLORS.brand.primary, fontWeight: '700' },

  tabContent: { flex: 1, backgroundColor: COLORS.background },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  cardRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  cardSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeGreen: { backgroundColor: COLORS.successLight },
  badgeOrange: { backgroundColor: '#ffedd5' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  textGreen: { color: COLORS.successDark },
  textOrange: { color: '#fb923c' },
  textGray: { color: COLORS.textSecondary },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  viewRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  manageBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  manageText: { fontSize: 12, color: COLORS.brand.primary, fontWeight: '700' },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  providerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
});
