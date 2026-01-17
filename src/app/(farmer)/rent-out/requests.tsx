import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import { MOCK_REQUESTS } from './requests_data';

export default function RentalRequestsScreen() {
  const router = useRouter();

  // Using a single list identifying status for demo purposes, managing state locally
  const [allRequests, setAllRequests] = useState(MOCK_REQUESTS);
  const [filter, setFilter] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  const pendingRequests = allRequests.filter(r => r.status === 'New' || r.status === 'Pending' || r.status === 'pending');
  const acceptedRequests = allRequests.filter(r => r.status === 'accepted');
  const rejectedRequests = allRequests.filter(r => r.status === 'rejected');

  const displayedRequests = allRequests.filter(r => {
    if (filter === 'pending') return r.status === 'New' || r.status === 'Pending' || r.status === 'pending';
    return r.status === filter;
  });
  const [acceptedCount, setAcceptedCount] = useState(12);
  const [rejectedCount, setRejectedCount] = useState(5);

  const handleAction = (id: string, action: 'accept' | 'reject' | 'restore') => {
    const newStatus = action === 'accept' ? 'accepted' : action === 'restore' ? 'pending' : 'rejected';
    setAllRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.9)" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back-ios" size={20} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rental Requests</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <TouchableOpacity
            style={[styles.statBox, filter === 'pending' && styles.statPending]}
            onPress={() => setFilter('pending')}
          >
            <Text style={styles.statNumber}>{pendingRequests.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statBox, filter === 'accepted' && styles.statPending]}
            onPress={() => setFilter('accepted')}
          >
            <Text style={styles.statNumber}>{acceptedRequests.length}</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statBox, filter === 'rejected' && styles.statPending]}
            onPress={() => setFilter('rejected')}
          >
            <Text style={styles.statNumber}>{rejectedRequests.length}</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Requests List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {displayedRequests.map((request) => (
          <View key={request.id} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: request.image }} style={styles.avatar} />
                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />
                </View>
              </View>
              <View style={styles.userInfo}>
                <View style={styles.userTopRow}>
                  <Text style={styles.userName}>{request.name}</Text>
                  {request.status === 'New' ? (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                  ) : (
                    <View style={styles.timeBadge}>
                      <Text style={styles.timeBadgeText}>{request.timeAgo}</Text>
                    </View>
                  )}
                </View>
                {request.status === 'accepted' ? (
                  <View style={styles.unlockedBadge}>
                    <MaterialIcons name="lock-open" size={12} color="#15803d" />
                    <Text style={styles.unlockedText}>CONTACT UNLOCKED</Text>
                  </View>
                ) : (
                  <Text style={styles.userVillage}>{request.village}</Text>
                )}
                {request.status === 'rejected' && (
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
                  <MaterialIcons name="calendar-today" size={18} color={COLORS.brand.primary} />
                  <Text style={styles.detailLabel}>Dates</Text>
                </View>
                <Text style={styles.detailValue}>{request.days}</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailIconRow}>
                  <MaterialIcons name="schedule" size={18} color={COLORS.brand.primary} />
                  <Text style={styles.detailLabel}>Duration</Text>
                </View>
                <Text style={styles.detailValue}>{request.duration}</Text>
              </View>
              <View style={[styles.detailItem, { width: '100%' }]}>
                <View style={styles.detailIconRow}>
                  <MaterialIcons name="agriculture" size={18} color={COLORS.brand.primary} />
                  <Text style={styles.detailLabel}>Availability Type</Text>
                </View>
                <View style={styles.typeBadgeContainer}>
                  <View style={[
                    styles.typeBadge,
                    request.type === 'Machine Only' ? styles.typeBadgeBlue : styles.typeBadgeGreen
                  ]}>
                    <Text style={[
                      request.type === 'Machine Only' ? styles.typeTextBlue : styles.typeTextGreen
                    ]}>{request.type}</Text>
                  </View>
                </View>
              </View>
            </View>


            {/* Reason for Rejection (Only for Rejected) */}
            {filter === 'rejected' && request.note && (
              <View style={styles.reasonContainer}>
                <Text style={styles.reasonText}>
                  <Text style={styles.reasonLabel}>Reason: </Text>
                  {request.note || "Machine already booked."}
                </Text>
              </View>
            )}

            {/* Actions */}
            {filter === 'pending' && (
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

            {filter === 'accepted' && (
              <View style={styles.acceptedActionsContainer}>
                <TouchableOpacity style={styles.callBtn}>
                  <MaterialIcons name="call" size={20} color="#000" />
                  <Text style={styles.callBtnText}>Call Renter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whatsappBtn}>
                  <MaterialIcons name="chat" size={20} color="#25D366" />
                  <Text style={styles.whatsappBtnText}>Message on WhatsApp</Text>
                </TouchableOpacity>
                <Text style={styles.handoverText}>Machine ready for handover</Text>
              </View>
            )}
            {filter === 'rejected' && (
              <View style={styles.rejectedActionsRow}>
                <TouchableOpacity style={styles.archiveBtn}>
                  <Text style={styles.archiveBtnText}>Move to Archive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.restoreBtn}
                  onPress={() => handleAction(request.id, 'restore' as any)}
                >
                  <Text style={styles.restoreBtnText}>Restore</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        {/* Empty State could go here if requests.length === 0 */}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Using simplified background for now, can be sophisticated
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101b0d',
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.05)', // hover style simulation
  },

  // Stats
  statsContainer: {
    padding: 16,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 60 : 80,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statPending: {
    backgroundColor: 'rgba(55, 236, 19, 0.2)',
    borderColor: 'rgba(55, 236, 19, 0.4)',
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

  // Scroll Content
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    backgroundColor: '#ffedd5', // orange-100
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#c2410c', // orange-700
    textTransform: 'uppercase',
  },
  timeBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  timeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  userVillage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },

  // Details
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

  // Note
  noteContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  noteText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  noteLabel: {
    fontWeight: '600',
    color: '#111827',
  },

  // Actions
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
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  acceptBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.brand.primary,
    shadowColor: '#bbf7d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  acceptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  // Accepted State Styles
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dcfce7', // green-100
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  unlockedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#15803d', // green-700
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
    shadowColor: '#bbf7d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
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

  // Rejected State Styles
  declinedBadge: {
    backgroundColor: '#fee2e2', // red-100
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  declinedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#b91c1c', // red-700
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reasonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(254, 226, 226, 0.5)', // red-50/50
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  reasonText: {
    fontSize: 14,
    color: '#b91c1c', // red-700
    lineHeight: 20,
  },
  reasonLabel: {
    fontWeight: '700',
    color: '#b91c1c',
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
});
