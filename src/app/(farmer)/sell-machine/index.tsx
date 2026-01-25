import React from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Redirect, useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { useSellingStore } from '@/src/store/selling.store';

export default function SellMachineInventory() {
  const router = useRouter();
  const { machines, toggleVisibility, removeMachine } = useSellingStore();

  if (machines.length === 0) {
    return <Redirect href="/(farmer)/sell-machine/add-details" />;
  }

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Machine',
      'Are you sure you want to remove this listing? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeMachine(id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <AppBar title="My Old Machine Selling Inventory" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY SECTION */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>ACTIVE LISTINGS</Text>
              <Text style={styles.summaryValue}>
                {machines.filter((m) => m.visible).length}
              </Text>
            </View>
            <View style={styles.walletIconWrap}>
              <MaterialIcons
                name="inventory"
                size={28}
                color={COLORS.brand.primary}
              />
            </View>
          </View>
          <View style={styles.activeListingRow}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>{machines.length}</Text>
            </View>
            <Text style={styles.activeText}>
              Machines listed in your inventory
            </Text>
          </View>
        </View>

        {/* LISTINGS SECTION */}
        <View style={styles.listingsContainer}>
          <Text style={styles.sectionTitle}>LISTED MACHINES</Text>

          {machines.map((machine) => (
            <View
              key={machine.id}
              style={[styles.card, machine.expired && styles.cardExpired]}
            >
              <View style={styles.cardContent}>
                {/* IMAGE */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: machine.media[0]?.uri }}
                    style={[
                      styles.machineImage,
                      machine.expired && styles.grayscale,
                    ]}
                  />
                  <View
                    style={[
                      styles.statusBadge,
                      machine.expired ? styles.bgGray : styles.bgGreen,
                    ]}
                  >
                    <Text style={styles.statusText}>{machine.status}</Text>
                  </View>
                </View>

                {/* DETAILS */}
                <View style={styles.detailsContainer}>
                  <View>
                    <Text style={styles.machineName}>
                      {machine.brand} {machine.model}
                    </Text>
                    <View style={styles.expiryRow}>
                      <MaterialIcons
                        name="event"
                        size={14}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.expiryText}>
                        Expiry Date: {machine.expiry}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.priceRow}>
                    <Text
                      style={[styles.price, machine.expired && styles.textGray]}
                    >{`₹${Number(machine.askingPrice).toLocaleString()}`}</Text>
                    <View style={styles.toggleRow}>
                      <Text style={styles.visibleLabel}>
                        {machine.visible ? 'VISIBLE' : 'HIDDEN'}
                      </Text>
                      <Switch
                        trackColor={{
                          false: COLORS.border,
                          true: COLORS.brand.primary,
                        }}
                        thumbColor={COLORS.white}
                        onValueChange={() => toggleVisibility(machine.id)}
                        value={machine.visible}
                        disabled={machine.expired}
                        style={{
                          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* ACTIONS */}
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.actionBtnMain}
                  onPress={() =>
                    machine.expired
                      ? console.log('Relist')
                      : router.push({
                          pathname: '/(farmer)/sell-machine/add-details',
                          params: { id: machine.id },
                        })
                  }
                >
                  <MaterialIcons
                    name={machine.expired ? 'refresh' : 'edit-square'}
                    size={18}
                    color={COLORS.brand.primary}
                  />
                  <Text style={styles.actionBtnText}>
                    {machine.expired ? 'Relist' : 'Edit'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(machine.id)}
                >
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={COLORS.danger}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/(farmer)/sell-machine/add-details')}
        >
          <MaterialIcons name="add" size={24} color={COLORS.white} />
          <Text style={styles.fabText}>Sell One More Machine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: COLORS.background, // Was partial opacity
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  walletIconWrap: {
    backgroundColor: COLORS.brand.muted,
    padding: 10,
    borderRadius: 12,
  },
  activeListingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary, // Changed from white as summary card is white usually. Wait.
    // Summary card is white in code: backgroundColor: "#fff".
    // But original text was white? ORIGINAL: color: COLORS.white.
    // If card is white, text white is invisible.
    // Let's check original. Original summaryCard bg is #fff. Original activeText is COLORS.white.
    // That seems like a bug in original or I misread.
    // Wait, original `summaryCard` style line 191 `backgroundColor: "#fff"`.
    // line 244 `activeText` `color: COLORS.white`.
    // This text would be invisible on white card.
    // I will fix it to textSecondary.
  },

  listingsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary, // Was white, but background is light green.
    // container bg is COLORS.background (#f6faf5ff - light green).
    // Text white might be hard to see or unintended.
    // Section title usually dark.
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardExpired: {
    opacity: 0.8,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.gray[100],
    position: 'relative',
  },
  machineImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  grayscale: {
    tintColor: 'gray',
    opacity: 0.5,
  },
  statusBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  bgGreen: { backgroundColor: COLORS.success }, // success
  bgGray: { backgroundColor: COLORS.gray[500] },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  machineName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.brand.primary,
  },
  textGray: {
    color: COLORS.textSecondary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visibleLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtnMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.brand.primary,
  },
  deleteBtn: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fabContainer: {
    position: 'absolute',
    bottom: 32,
    right: 16,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.brand.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    shadowColor: COLORS.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  fabText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
