import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import EmptyState from '@/src/components/EmptyState';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';

export default function MyDriversScreen() {
  const router = useRouter();
  const { profile } = useTransporterStore();

  const vehicles = profile?.vehicles || [];

  return (
    <View style={styles.container}>
      <AppBar title="My Drivers" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {vehicles.length > 0 ? (
          vehicles.map((v) => (
            <View key={v.id} style={styles.driverCard}>
              <View style={styles.cardTop}>
                <View style={styles.driverInfo}>
                  <View style={styles.avatarWrap}>
                    {v.driver.photo ? (
                      <Image
                        source={{ uri: v.driver.photo }}
                        style={styles.avatar}
                      />
                    ) : (
                      <View style={styles.avatarPlaceholder}>
                        <MaterialIcons
                          name="person"
                          size={24}
                          color={COLORS.gray[400]}
                        />
                      </View>
                    )}
                    <View style={styles.verifiedBadge}>
                      <MaterialIcons name="verified" size={10} color="#fff" />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.driverName}>{v.driver.name}</Text>
                    <Text style={styles.licenseText}>
                      DL: {v.driver.licenseNo || 'Verified'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.callBtn} onPress={() => {}}>
                  <MaterialIcons
                    name="call"
                    size={20}
                    color={COLORS.brand.primary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.footerRow}>
                <View style={styles.assignedTo}>
                  <MaterialIcons
                    name="local-shipping"
                    size={16}
                    color={COLORS.gray[500]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.assignLabel} numberOfLines={1}>
                      Assigned:{' '}
                      <Text style={styles.assignValue}>
                        {v.model} ({v.number})
                      </Text>
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    router.push({
                      pathname: '/(transporter)/edit-driver',
                      params: { vehicleId: v.id },
                    })
                  }
                >
                  <MaterialIcons
                    name="edit"
                    size={16}
                    color={COLORS.brand.primary}
                  />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <EmptyState
            icon="people-outline"
            title="No Drivers Added"
            description="Add a vehicle to assign and manage your drivers here."
            actionLabel="Add New Vehicle"
            onActionPress={() => router.push('/(transporter)/add-vehicle')}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray[50] },
  scroll: { padding: 16 },
  driverCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.info,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray[900],
  },
  licenseText: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.gray[100],
    marginVertical: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignedTo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 10,
  },
  assignLabel: {
    fontSize: 13,
    color: COLORS.gray[500],
    fontWeight: '500',
  },
  assignValue: {
    fontSize: 13,
    color: COLORS.gray[900],
    fontWeight: '600',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.brand.muted,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.brand.primary,
  },
});
