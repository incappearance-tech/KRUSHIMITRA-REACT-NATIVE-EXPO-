import React, { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { RentalRequest, useRentalStore } from '@/src/store/rental.store';

export default function RentalRequestsScreen() {
  const { requests, updateRequestStatus } = useRentalStore();
  const [filter, setFilter] = useState<'pending' | 'accepted' | 'rejected'>(
    'pending',
  );

  const pendingRequests = requests.filter((r) => r.status === 'PENDING');
  const acceptedRequests = requests.filter((r) => r.status === 'ACCEPTED');
  const rejectedRequests = requests.filter((r) => r.status === 'REJECTED');

  const displayedRequests = requests.filter((r) => {
    if (filter === 'pending') return r.status === 'PENDING';
    if (filter === 'accepted') return r.status === 'ACCEPTED';
    return r.status === 'REJECTED';
  });

  const handleAction = (
    id: string,
    action: 'accept' | 'reject' | 'restore',
  ) => {
    const newStatus =
      action === 'accept'
        ? 'ACCEPTED'
        : action === 'restore'
          ? 'PENDING'
          : 'REJECTED';
    updateRequestStatus(id, newStatus as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppBar title="Rental Requests" />

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <TouchableOpacity
            style={[styles.statBox, filter === 'pending' && styles.statPending]}
            onPress={() => setFilter('pending')}
          >
            <Text
              style={[
                styles.statNumber,
                filter === 'pending' && styles.statTextActive,
              ]}
            >
              {pendingRequests.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                filter === 'pending' && styles.statTextActive,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statBox,
              filter === 'accepted' && styles.statPending,
            ]}
            onPress={() => setFilter('accepted')}
          >
            <Text
              style={[
                styles.statNumber,
                filter === 'accepted' && styles.statTextActive,
              ]}
            >
              {acceptedRequests.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                filter === 'accepted' && styles.statTextActive,
              ]}
            >
              Accepted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statBox,
              filter === 'rejected' && styles.statPending,
            ]}
            onPress={() => setFilter('rejected')}
          >
            <Text
              style={[
                styles.statNumber,
                filter === 'rejected' && styles.statTextActive,
              ]}
            >
              {rejectedRequests.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                filter === 'rejected' && styles.statTextActive,
              ]}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Requests List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedRequests.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-note" size={64} color="#e5e7eb" />
            <Text style={styles.emptyText}>No {filter} requests found</Text>
          </View>
        ) : (
          displayedRequests.map((request: RentalRequest) => (
            <View key={request.id} style={styles.card}>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: request.machineImage }}
                    style={styles.avatar}
                  />
                  <View style={styles.onlineBadge}>
                    <View style={styles.onlineDot} />
                  </View>
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.userTopRow}>
                    <Text style={styles.userName}>{request.borrowerName}</Text>
                    {request.status === 'PENDING' ? (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    ) : (
                      <View style={styles.timeBadge}>
                        <Text style={styles.timeBadgeText}>
                          {request.requestDate}
                        </Text>
                      </View>
                    )}
                  </View>
                  {request.status === 'ACCEPTED' ? (
                    <View style={styles.unlockedBadge}>
                      <MaterialIcons
                        name="lock-open"
                        size={12}
                        color="#15803d"
                      />
                      <Text style={styles.unlockedText}>CONTACT UNLOCKED</Text>
                    </View>
                  ) : (
                    <Text style={styles.userVillage}>
                      {request.machineName}
                    </Text>
                  )}
                  {request.status === 'REJECTED' && (
                    <View style={styles.declinedBadge}>
                      <Text style={styles.declinedText}>Declined</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Details Grid */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconRow}>
                    <MaterialIcons
                      name="calendar-today"
                      size={18}
                      color={COLORS.brand.primary}
                    />
                    <Text style={styles.detailLabel}>Start Date</Text>
                  </View>
                  <Text style={styles.detailValue}>{request.startDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconRow}>
                    <MaterialIcons
                      name="payments"
                      size={18}
                      color={COLORS.brand.primary}
                    />
                    <Text style={styles.detailLabel}>Total Price</Text>
                  </View>
                  <Text style={styles.detailValue}>₹{request.totalPrice}</Text>
                </View>
                <View style={[styles.detailItem, { width: '100%' }]}>
                  <View style={styles.detailIconRow}>
                    <MaterialIcons
                      name="info"
                      size={18}
                      color={COLORS.brand.primary}
                    />
                    <Text style={styles.detailLabel}>Status</Text>
                  </View>
                  <View style={styles.typeBadgeContainer}>
                    <View
                      style={[
                        styles.typeBadge,
                        request.status === 'ACCEPTED'
                          ? styles.typeBadgeGreen
                          : styles.typeBadgeBlue,
                      ]}
                    >
                      <Text
                        style={[
                          request.status === 'ACCEPTED'
                            ? styles.typeTextGreen
                            : styles.typeTextBlue,
                        ]}
                      >
                        {request.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Actions */}
              {request.status === 'PENDING' && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleAction(request.id, 'reject')}
                  >
                    <Text style={styles.rejectBtnText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => handleAction(request.id, 'accept')}
                  >
                    <Text style={styles.acceptBtnText}>Accept Request</Text>
                  </TouchableOpacity>
                </View>
              )}

              {request.status === 'ACCEPTED' && (
                <View style={styles.acceptedActionsContainer}>
                  <TouchableOpacity style={styles.callBtn}>
                    <MaterialIcons name="call" size={20} color="#000" />
                    <Text style={styles.callBtnText}>Call Borrower</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.whatsappBtn}>
                    <MaterialIcons name="chat" size={20} color="#25D366" />
                    <Text style={styles.whatsappBtnText}>
                      Message on WhatsApp
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.handoverText}>
                    Machine ready for handover
                  </Text>
                </View>
              )}
              {request.status === 'REJECTED' && (
                <View style={styles.rejectedActionsRow}>
                  <TouchableOpacity style={styles.archiveBtn}>
                    <Text style={styles.archiveBtnText}>Move to Archive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.restoreBtn}
                    onPress={() => handleAction(request.id, 'restore')}
                  >
                    <Text style={styles.restoreBtnText}>Restore</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  statsContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    elevation: 1,
  },
  statPending: {
    backgroundColor: COLORS.brand.primary,
    borderColor: COLORS.brand.primary,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#4b5563',
    marginTop: 2,
  },
  statTextActive: {
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.brand.primary,
    borderWidth: 1,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  newBadge: {
    backgroundColor: COLORS.brand.muted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.brand.primary,
    textTransform: 'uppercase',
  },
  timeBadge: {
    backgroundColor: COLORS.brand.muted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  timeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.black,
    textTransform: 'uppercase',
  },
  userVillage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  detailItem: {
    width: '45%',
    gap: 4,
  },
  detailIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    paddingLeft: 24,
  },
  typeBadgeContainer: {
    paddingLeft: 24,
    paddingTop: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeBadgeGreen: {
    backgroundColor: 'rgba(55, 236, 19, 0.2)',
  },
  typeTextGreen: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  typeBadgeBlue: {
    backgroundColor: '#eff6ff',
  },
  typeTextBlue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  actionsRow: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  rejectBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.white,
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.brand.primary,
  },
  acceptBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.brand.primary,
  },
  acceptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  unlockedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#15803d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  acceptedActionsContainer: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  callBtn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.brand.primary,
    borderRadius: 8,
  },
  callBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  whatsappBtn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#25D366',
  },
  whatsappBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#128C7E',
  },
  handoverText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  declinedBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  declinedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#b91c1c',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rejectedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
    marginTop: 8,
    height: 48,
  },
  archiveBtn: {
    paddingVertical: 8,
  },
  archiveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  restoreBtn: {
    paddingVertical: 8,
  },
  restoreBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.brand.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '600',
  },
});
