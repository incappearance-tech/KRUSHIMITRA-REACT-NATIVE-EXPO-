import { COLORS } from '@/src/constants/colors';
import { useLabourStore } from '@/src/store/labour.store';
import { useRentalStore } from '@/src/store/rental.store';
import { useSellingStore } from '@/src/store/selling.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MyFarmScreen() {
    const router = useRouter();
    const { rentals, requests } = useRentalStore();
    const { machines: sellingMachines } = useSellingStore();
    const { leads: labourLeads } = useLabourStore();

    // Consolidate listings
    const activeSelling = sellingMachines.filter(m => !m.expired);
    const activeRentals = rentals.filter(r => !r.expired);

    const combinedListings = [
        ...activeSelling.map(m => ({
            id: m.id,
            title: `${m.brand} ${m.model}`,
            type: 'Sell',
            status: m.visible ? 'Live' : 'Hidden',
            price: `₹${m.askingPrice}`,
            image: m.media[0]?.uri,
            route: '/(farmer)/sell-machine'
        })),
        ...activeRentals.map(r => ({
            id: r.id,
            title: r.name,
            type: 'Rent Out',
            status: r.visible ? 'Live' : 'Hidden',
            price: `₹${r.price}/${r.period}`,
            image: r.image,
            route: '/(farmer)/rent-out'
        }))
    ].slice(0, 4); // Show top 4

    const totalMachines = sellingMachines.length + rentals.length;
    const activeBookings = requests.filter(r => r.status === 'ACCEPTED').length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerSubtitle}>GOOD MORNING,</Text>
                    <Text style={styles.headerTitle}>My Farm Dashboard</Text>
                </View>
                <TouchableOpacity style={styles.notifBtn}>
                    <MaterialIcons name="notifications-none" size={24} color="#0f172a" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            >
                {/* Farm Overview Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <View style={[styles.statIcon, { backgroundColor: '#f0fdf4' }]}>
                            <MaterialIcons name="agriculture" size={20} color="#16a34a" />
                        </View>
                        <Text style={styles.statVal}>{totalMachines}</Text>
                        <Text style={styles.statLab}>Total Fleet</Text>
                    </View>
                    <View style={styles.statBox}>
                        <View style={[styles.statIcon, { backgroundColor: '#eff6ff' }]}>
                            <MaterialIcons name="event-available" size={20} color="#1d4ed8" />
                        </View>
                        <Text style={styles.statVal}>{activeBookings}</Text>
                        <Text style={styles.statLab}>Active Bookings</Text>
                    </View>
                </View>

                {/* Quick Shortcuts */}
                <View style={styles.shortcutsRow}>
                    <TouchableOpacity style={styles.shortBtn} onPress={() => router.push('/(farmer)/rent-out/add-machine')}>
                        <MaterialIcons name="add-circle-outline" size={24} color="#000" />
                        <Text style={styles.shortText}>Rent Machine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shortBtn} onPress={() => router.push('/(farmer)/sell-machine')}>
                        <MaterialIcons name="sell" size={24} color="#000" />
                        <Text style={styles.shortText}>Sell Machine</Text>
                    </TouchableOpacity>
                </View>

                {/* Listings Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>My Inventory Highlights</Text>
                    <TouchableOpacity onPress={() => router.push('/(farmer)/sell-machine')}>
                        <Text style={styles.manageBtnText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {combinedListings.length === 0 ? (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="inventory" size={48} color="#e5e7eb" />
                        <Text style={styles.emptyText}>No active listings found</Text>
                    </View>
                ) : combinedListings.map((item, idx) => (
                    <TouchableOpacity
                        key={`${item.type}-${item.id}-${idx}`}
                        style={styles.card}
                        onPress={() => router.push(item.route as any)}
                    >
                        <View style={styles.cardRow}>
                            <Image source={{ uri: item.image }} style={styles.thumb} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <View style={styles.tagRow}>
                                    <View style={[styles.tag, { backgroundColor: item.type === 'Sell' ? '#fef2f2' : '#f0fdf4' }]}>
                                        <Text style={[styles.tagText, { color: item.type === 'Sell' ? '#b91c1c' : '#16a34a' }]}>{item.type}</Text>
                                    </View>
                                    <Text style={styles.priceText}>{item.price}</Text>
                                </View>
                            </View>
                            <View style={[styles.badge, item.status === 'Live' ? styles.badgeGreen : styles.badgeGray]}>
                                <Text style={[styles.badgeText, item.status === 'Live' ? styles.textGreen : styles.textGray]}>{item.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Recent Activity / Hired Help */}
                <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                    <Text style={styles.sectionTitle}>Recent Business Activity</Text>
                </View>

                {requests.length === 0 ? (
                    <View style={styles.activityEmpty}>
                        <Text style={styles.activityEmptyText}>No recent rental activity</Text>
                    </View>
                ) : requests.slice(0, 3).map((req) => (
                    <View key={req.id} style={styles.activityCard}>
                        <View style={styles.activityIcon}>
                            <MaterialIcons name="request-page" size={20} color="#6b7280" />
                        </View>
                        <View style={styles.activityMain}>
                            <Text style={styles.activityTitle}>{req.borrowerName} requested {req.machineName}</Text>
                            <Text style={styles.activityDate}>{req.requestDate} • <Text style={{ color: req.status === 'ACCEPTED' ? '#16a34a' : '#f59e0b' }}>{req.status}</Text></Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerSubtitle: { fontSize: 10, fontWeight: '800', color: '#64748b', letterSpacing: 1.5 },
    headerTitle: { fontSize: 24, fontWeight: '900', color: '#0f172a' },
    notifBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#f1f5f9' },

    statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    statBox: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', elevation: 2, gap: 12 },
    statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    statVal: { fontSize: 28, fontWeight: '900', color: '#0f172a' },
    statLab: { fontSize: 13, color: '#64748b', fontWeight: '600' },

    shortcutsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    shortBtn: { flex: 1, height: 100, backgroundColor: COLORS.brand.primary, borderRadius: 24, padding: 16, justifyContent: 'center', gap: 8 },
    shortText: { fontWeight: '800', fontSize: 14, color: '#000' },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
    manageBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.brand.primary },

    card: { backgroundColor: '#fff', padding: 12, borderRadius: 20, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 12, elevation: 1 },
    cardRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    thumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#f8fafc' },
    cardInfo: { flex: 1, gap: 4 },
    cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
    tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    tagText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
    priceText: { fontSize: 14, fontWeight: '700', color: '#64748b' },

    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    badgeGreen: { backgroundColor: '#dcfce7' },
    badgeGray: { backgroundColor: '#f1f5f9' },
    badgeText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
    textGreen: { color: '#16a34a' },
    textGray: { color: '#94a3b8' },

    emptyState: { padding: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', borderRadius: 24, gap: 12 },
    emptyText: { color: '#94a3b8', fontWeight: '600' },

    activityCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f8fafc', gap: 12 },
    activityIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
    activityMain: { flex: 1 },
    activityTitle: { fontSize: 14, fontWeight: '700', color: '#334155' },
    activityDate: { fontSize: 12, color: '#94a3b8', fontWeight: '500', marginTop: 2 },

    activityEmpty: { padding: 24, alignItems: 'center' },
    activityEmptyText: { color: '#94a3b8', fontSize: 13, fontWeight: '500' }
});
