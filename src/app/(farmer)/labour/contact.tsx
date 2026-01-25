import React from 'react';

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '@/src/constants/colors';

import { LABOURERS } from './data';

export default function LabourContactScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const labour = LABOURERS.find((l) => l.id === id) || LABOURERS[0];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(255,255,255,0.95)"
      />

      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Contact Details</Text>
        <TouchableOpacity onPress={() => router.push('/(farmer)/labour')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.successHeader}>
          <Text style={styles.successTitle}>Connect with Labour</Text>
          <Text style={styles.successDesc}>
            You can connect with {labour.name} for your farm work below.
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardBg}>
            <View style={styles.gradient} />
          </View>

          <View style={styles.cardContent}>
            <Image source={{ uri: labour.image }} style={styles.avatar} />
            <Text style={styles.name}>{labour.name}</Text>
            <View style={styles.roleRow}>
              <MaterialIcons
                name="agriculture"
                size={18}
                color={COLORS.brand.primary}
              />
              <Text style={styles.roleText}>{labour.role}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>LOCATION</Text>
                <View style={styles.valueRow}>
                  <MaterialIcons name="location-on" size={16} color="#9ca3af" />
                  <Text style={styles.valueText}>Ludhiana, Punjab</Text>
                </View>
              </View>
              <View style={[styles.gridItem, { alignItems: 'center' }]}>
                <Text style={styles.label}>EXPERIENCE</Text>
                <View style={styles.valueRow}>
                  <MaterialIcons name="verified" size={16} color="#9ca3af" />
                  <Text style={styles.valueText}>5 Years</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rateRow}>
              <Text style={styles.rateLabel}>Daily Rate</Text>
              <Text style={styles.rateValue}>
                ₹{labour.price}
                <Text style={styles.rateUnit}>/day</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.infoBox}>
          <MaterialIcons
            name="info"
            size={20}
            color="#6b7280"
            style={{ marginTop: 2 }}
          />
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Offline Communication Only.</Text> There
            is no in-app chat available. Please contact{' '}
            {labour.name.split(' ')[0]} directly using the buttons below.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.callBtn}>
          <MaterialIcons name="call" size={24} color="#0f172a" />
          <Text style={styles.callBtnText}>Call +91 98765 43210</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.waBtn}>
          {/* Simple WA Icon simulation or placeholder */}
          <View style={styles.waIcon} />
          <Text style={styles.waBtnText}>Message on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  doneText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.brand.primary,
  },
  scrollContent: {
    paddingBottom: 150,
  },

  successHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  successIcon: {
    backgroundColor: 'rgba(55, 236, 19, 0.2)',
    padding: 12,
    borderRadius: 100,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'rgba(55, 236, 19, 0.1)',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 280,
  },

  cardContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  cardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  gradient: {
    flex: 1,
    backgroundColor: 'rgba(55, 236, 19, 0.1)',
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.brand.primary,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#f3f4f6',
    marginVertical: 16,
  },

  detailsGrid: {
    flexDirection: 'row',
    width: '100%',
  },
  gridItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },

  rateRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  rateValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  rateUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9ca3af',
  },

  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoText: {
    fontSize: 12,
    color: '#4b5563',
    flex: 1,
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
    color: '#1f2937',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 12,
    paddingBottom: 32,
  },
  callBtn: {
    height: 56,
    backgroundColor: COLORS.brand.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#bbf7d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  callBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  waBtn: {
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  waIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#25D366', // WA Green
    borderRadius: 12,
  },
  waBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
});
