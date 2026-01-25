import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import BackButton from '@/src/components/BackButton';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';

export default function PaymentHistoryScreen() {
  const { profile } = useTransporterStore();
  const payments = profile?.payments || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {payments.length > 0 ? (
          payments.map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.cardHeader}>
                <View style={styles.typeIcon}>
                  <MaterialIcons
                    name="local-shipping"
                    size={20}
                    color={COLORS.brand.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vehicleNum}>{payment.vehicleNumber}</Text>
                  <Text style={styles.dateText}>
                    {new Date(payment.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {payment.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.planLabel}>Plan Selected</Text>
                  <Text style={styles.planValue}>{payment.plan}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.amountLabel}>Amount Paid</Text>
                  <Text style={styles.amountValue}>{payment.amount}</Text>
                </View>
              </View>

              <Text style={styles.txnId}>ID: {payment.id}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="receipt-long" size={64} color="#e5e7eb" />
            <Text style={styles.emptyText}>No payment records found.</Text>
            <Text style={styles.emptySubText}>
              Receipts will appear here once you register a vehicle plan.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleNum: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  dateText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: { fontSize: 10, fontWeight: '800', color: '#16a34a' },
  divider: { height: 1, backgroundColor: '#f3f4f6', marginVertical: 12 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  planValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  amountLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  amountValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  txnId: { fontSize: 10, color: '#9ca3af', marginTop: 12, fontStyle: 'italic' },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});
