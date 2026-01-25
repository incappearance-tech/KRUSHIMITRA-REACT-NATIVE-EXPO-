import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import Button from '@/src/components/Button';
import FilterChips from '@/src/components/FilterChips';
import SearchBar from '@/src/components/SearchBar';
import { COLORS } from '@/src/constants/colors';
import { TRANSPORTERS, VEHICLE_TYPES } from '@/src/data/transport.data';

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

  // Map string filters to object format for FilterChips
  const chipFilters = [
    { id: 'All', label: 'All', icon: 'local-shipping' },
    ...VEHICLE_TYPES.filter((vt) => vt !== 'All').map((vt) => ({
      id: vt,
      label: vt,
      icon: 'directions-car',
    })),
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
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
              <MaterialIcons
                name="near-me"
                size={14}
                color={COLORS.brand.primary}
              />
              <Text style={styles.locationText}>
                Nearby Rampur, Maharashtra
              </Text>
            </View>
          </View>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search trucks, tractors..."
        />

        <View style={{ marginTop: 12 }}>
          <FilterChips
            filters={chipFilters as any}
            activeFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            showIcons
          />
        </View>
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
                    <Image
                      source={{ uri: transporter.image }}
                      style={styles.avatar}
                    />
                    {transporter.verified && (
                      <View style={styles.badge}>
                        <MaterialIcons
                          name="verified"
                          size={14}
                          color={COLORS.white}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.detailsBox}>
                    <View style={styles.nameRow}>
                      <Text style={styles.bizName}>{transporter.name}</Text>
                      <View style={styles.rateChip}>
                        <MaterialIcons
                          name="star"
                          size={14}
                          color={COLORS.warningDark}
                        />
                        <Text style={styles.rateText}>
                          {transporter.rating}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.vTypeText}>
                      {transporter.vehicleType}
                    </Text>

                    <View style={styles.specRow}>
                      <View style={styles.specItem}>
                        <MaterialIcons
                          name="inventory-2"
                          size={14}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.specText}>
                          {transporter.capacity}
                        </Text>
                      </View>
                      <View style={styles.specItem}>
                        <MaterialIcons
                          name="payments"
                          size={14}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.specText}>
                          ₹{transporter.pricePerKm}/km
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.distanceBox}>
                    <MaterialIcons
                      name="map"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.distanceText}>
                      {transporter.distance} away
                    </Text>
                  </View>

                  <Button
                    label={isAvailable ? 'Book Transport' : 'Busy Now'}
                    onPress={() => {
                      if (isAvailable) {
                        router.push({
                          pathname: '/transport/details',
                          params: { id: transporter.id },
                        });
                      }
                    }}
                    disabled={!isAvailable}
                    style={{ height: 40, paddingHorizontal: 16 }}
                    variant={isAvailable ? 'primary' : 'secondary'}
                    icon="chevron-right"
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="local-shipping"
              size={60}
              color={COLORS.gray[300]}
            />
            <Text style={styles.emptyTitle}>No transporters found</Text>
            <Text style={styles.emptyDesc}>
              Try searching for a different vehicle type or adjust your filters.
            </Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.background,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: 16,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  freeBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  freeBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.successDark },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  listContent: { padding: 16, gap: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  cardMain: { flexDirection: 'row', gap: 16 },
  imageBox: { position: 'relative' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.brand.primary,
    padding: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  detailsBox: { flex: 1 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bizName: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  rateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rateText: { fontSize: 12, fontWeight: '800', color: COLORS.warningDark },
  vTypeText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '600' },
  specRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  specText: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  distanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  distanceText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  emptyState: { alignItems: 'center', paddingVertical: 80 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});
