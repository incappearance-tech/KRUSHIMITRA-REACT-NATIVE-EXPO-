import { COLORS } from '@/src/constants/colors';
import { TRANSPORTERS, VEHICLE_TYPES } from '@/src/data/transport.data';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TransportSearch() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransporters = TRANSPORTERS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' || t.vehicleType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.headerTitle}>Find Transport</Text>
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>FREE</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MaterialIcons name="near-me" size={14} color={COLORS.brand.primary} />
              <Text style={styles.locationText}>Nearby Rampur, Maharashtra</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={22} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search trucks, tractors, threshers..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {VEHICLE_TYPES.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transporter List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTransporters.length > 0 ? (
          filteredTransporters.map((transporter) => {
            const isAvailable = transporter.availability === 'Available';

            return (
              <TouchableOpacity
                key={transporter.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/transport/details',
                    params: { id: transporter.id },
                  })
                }
              >
                <View style={styles.cardMain}>
                  <View style={styles.imageBox}>
                    <Image source={{ uri: transporter.image }} style={styles.avatar} />
                    {transporter.verified && (
                      <View style={styles.badge}>
                        <MaterialIcons name="verified" size={14} color="#fff" />
                      </View>
                    )}
                  </View>

                  <View style={styles.detailsBox}>
                    <View style={styles.nameRow}>
                      <Text style={styles.bizName}>{transporter.name}</Text>
                      <View style={styles.rateChip}>
                        <MaterialIcons name="star" size={14} color="#eab308" />
                        <Text style={styles.rateText}>{transporter.rating}</Text>
                      </View>
                    </View>

                    <Text style={styles.vTypeText}>{transporter.vehicleType}</Text>

                    <View style={styles.specRow}>
                      <View style={styles.specItem}>
                        <MaterialIcons name="inventory-2" size={14} color="#64748b" />
                        <Text style={styles.specText}>{transporter.capacity}</Text>
                      </View>
                      <View style={styles.specItem}>
                        <MaterialIcons name="payments" size={14} color="#64748b" />
                        <Text style={styles.specText}>₹{transporter.pricePerKm}/km</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.distanceBox}>
                    <MaterialIcons name="map" size={14} color="#94a3b8" />
                    <Text style={styles.distanceText}>{transporter.distance} away</Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.bookBtn, !isAvailable && styles.bookBtnDisabled]}
                    onPress={() => {
                      if (isAvailable) {
                        router.push({
                          pathname: '/transport/details',
                          params: { id: transporter.id },
                        });
                      }
                    }}
                  >
                    <Text style={styles.bookBtnText}>
                      {isAvailable ? 'Book Transport' : 'Busy Now'}
                    </Text>
                    <MaterialIcons name="chevron-right" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="local-shipping" size={60} color="#e2e8f0" />
            <Text style={styles.emptyTitle}>No transporters found</Text>
            <Text style={styles.emptyDesc}>Try searching for a different vehicle type or adjust your filters.</Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 12 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, gap: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  freeBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#16a34a33' },
  freeBadgeText: { fontSize: 10, fontWeight: '800', color: '#15803d' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  locationText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  searchSection: { paddingHorizontal: 16, marginTop: 20, marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 16, paddingHorizontal: 16, height: 50, gap: 12 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text, fontWeight: '500' },
  filterScroll: { paddingHorizontal: 16, gap: 10 },
  filterChip: { paddingHorizontal: 18, height: 38, borderRadius: 19, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  filterChipActive: { backgroundColor: COLORS.brand.primary },
  filterText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  filterTextActive: { color: '#fff' },
  listContent: { padding: 16, gap: 16 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, borderWidth: 1, borderColor: '#f1f5f9' },
  cardMain: { flexDirection: 'row', gap: 16 },
  imageBox: { position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#f1f5f9' },
  badge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: '#3b82f6', padding: 3, borderRadius: 10, borderWidth: 2, borderColor: '#fff' },
  detailsBox: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  bizName: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  rateChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fffbeb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  rateText: { fontSize: 12, fontWeight: '800', color: '#b45309' },
  vTypeText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '600' },
  specRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f8fafc', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  specText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  distanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  distanceText: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  bookBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.brand.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  bookBtnDisabled: { backgroundColor: '#94a3b8' },
  bookBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: 16 },
  emptyDesc: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
});
