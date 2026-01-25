import React from 'react';

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import { useTransporterStore } from '@/src/store/transporter.store';

export default function TripHistoryScreen() {
  const router = useRouter();
  const { leads } = useTransporterStore();

  // Filter for completed/accepted trips to show in history
  const historyTrips = leads.filter(
    (l) => l.status === 'completed' || l.status === 'accepted',
  );

  return (
    <View style={styles.container}>
      <AppBar title="Trip History" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {historyTrips.length > 0 ? (
          historyTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{trip.date}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                      {trip.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.priceText}>₹1,200</Text>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routeLine}>
                  <View style={styles.dotGreen} />
                  <View style={styles.line} />
                  <View style={styles.dotRed} />
                </View>
                <View style={styles.locations}>
                  <Text style={styles.locText} numberOfLines={1}>
                    {trip.pickupLocation}
                  </Text>
                  <Text
                    style={[styles.locText, { marginTop: 16 }]}
                    numberOfLines={1}
                  >
                    {trip.dropLocation}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.footer}>
                <View style={styles.farmerInfo}>
                  <MaterialIcons
                    name="account-circle"
                    size={20}
                    color="#94a3b8"
                  />
                  <Text style={styles.farmerName}>{trip.farmerName}</Text>
                </View>
                <View style={styles.vehicleInfo}>
                  <MaterialIcons
                    name="local-shipping"
                    size={16}
                    color="#64748b"
                  />
                  <Text style={styles.vehicleText}>{trip.vehicleType}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3503/3503786.png',
              }}
              style={styles.emptyImg}
            />
            <Text style={styles.emptyTitle}>No Completed Trips</Text>
            <Text style={styles.emptySub}>
              When you complete trips for farmers, they will appear here as part
              of your history.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateBox: { gap: 4 },
  dateText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: { fontSize: 10, fontWeight: '800', color: '#16a34a' },
  priceText: { fontSize: 18, fontWeight: '800', color: '#0f172a' },

  routeContainer: { flexDirection: 'row', gap: 12, marginVertical: 8 },
  routeLine: { alignItems: 'center', width: 20, paddingTop: 4 },
  dotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16a34a',
  },
  line: { width: 1, flex: 1, backgroundColor: '#e2e8f0', marginVertical: 4 },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  locations: { flex: 1 },
  locText: { fontSize: 14, fontWeight: '600', color: '#1e293b' },

  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 16 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  farmerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  farmerName: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  vehicleInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  vehicleText: { fontSize: 12, color: '#475569', fontWeight: '700' },

  emptyState: { alignItems: 'center', marginTop: 100, paddingHorizontal: 40 },
  emptyImg: { width: 80, height: 80, opacity: 0.3, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  emptySub: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
