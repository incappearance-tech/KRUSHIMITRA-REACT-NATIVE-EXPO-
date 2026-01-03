import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';

export default function PaymentSuccessScreen() {
  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 48 }} />
        <Text style={styles.headerTitle}>Payment Confirmation</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* STATUS BADGE */}
        <View style={styles.statusWrapper}>
          <View style={styles.statusOuter}>
            <View style={styles.statusInner}>
              <MaterialIcons name="check" size={40} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.successTitle}>Payment Successful!</Text>

        <Text style={styles.successSubtitle}>
          Your machine listing has been successfully published with the Premium
          Plan.
        </Text>

        {/* RECEIPT CARD */}
        <View style={styles.receiptCard}>
          <View style={styles.topBar} />

          {/* Amount */}
          <View style={styles.amountSection}>
            <View>
              <Text style={styles.amountLabel}>AMOUNT PAID</Text>
              <Text style={styles.amountText}>₹99.00</Text>
            </View>

            <View style={styles.receiptIcon}>
              <MaterialIcons name="receipt-long" size={22} color="#137A25" />
            </View>
          </View>

          {/* Separator */}
          <View style={styles.separatorWrapper}>
            <View style={styles.dashedLine} />
            <View style={[styles.cutout, styles.cutoutLeft]} />
            <View style={[styles.cutout, styles.cutoutRight]} />
          </View>

          {/* Details */}
          <View style={styles.details}>
            <DetailRow label="Plan Type" value="Premium (30 Days)" bold />
            <DetailRow label="Transaction ID" value="TXN-8839210" mono />
            <DetailRow label="Date" value="Oct 24, 2023" />
            <DetailRow label="Payment Method" value="UPI" />
          </View>
        </View>

        {/* INFO BANNER */}
        <View style={styles.infoBanner}>
          <MaterialIcons name="info-outline" size={20} color="#137A25" />
          <Text style={styles.infoText}>
            Your listing is now live. It will be featured on the home page for
            higher visibility.
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER ACTIONS */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={()=>  navigate("/(farmer)/sell-machine/listing-details")}>
          <Text style={styles.primaryText}>View Listing</Text>
          <MaterialIcons name="visibility" size={22} color="#111812" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- DETAIL ROW ---------------- */

const DetailRow = ({
  label,
  value,
  bold,
  mono,
}: {
  label: string;
  value: string;
  bold?: boolean;
  mono?: boolean;
}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text
      style={[
        styles.detailValue,
        bold && styles.boldValue,
        mono && styles.monoValue,
      ]}
    >
      {value}
    </Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8F6',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F6F8F6',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 24,
    paddingBottom: 160,
    alignItems: 'center',
  },

  /* STATUS */
  statusWrapper: {
    marginTop: 16,
    marginBottom: 24,
  },

  statusOuter: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(19,236,55,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusInner: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#13EC37',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#13EC37',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  /* TEXT */
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111812',
    marginTop: 12,
    marginBottom: 8,
  },

  successSubtitle: {
    fontSize: 14,
    color: '#618968',
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 32,
  },

  /* RECEIPT */
  receiptCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBE6DD',
    overflow: 'hidden',
  },

  topBar: {
    height: 6,
    backgroundColor: '#13EC37',
  },

  amountSection: {
    padding: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  amountLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#618968',
    marginBottom: 4,
  },

  amountText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111812',
  },

  receiptIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(19,236,55,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  separatorWrapper: {
    position: 'relative',
    height: 1,
    marginHorizontal: 24,
    marginBottom: 8,
  },

  dashedLine: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
  },

  cutout: {
    position: 'absolute',
    top: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F6F8F6',
  },

  cutoutLeft: {
    left: -18,
  },

  cutoutRight: {
    right: -18,
  },

  details: {
    padding: 24,
    paddingTop: 20,
    gap: 14,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#618968',
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111812',
  },

  boldValue: {
    fontWeight: '800',
  },

  monoValue: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 0.8,
  },

  /* INFO BANNER */
  infoBanner: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(19,236,55,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(19,236,55,0.1)',
  },

  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111812',
    lineHeight: 18,
    flex: 1,
  },

  /* FOOTER */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#DBE6DD',
    padding: 16,
    gap: 12,
  },

  primaryBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#13EC37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111812',
  },

  secondaryBtn: {
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DBE6DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111812',
  },
});
