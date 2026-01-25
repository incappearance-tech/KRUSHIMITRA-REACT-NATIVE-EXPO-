import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

// --- Mock Data ---
const MOCK_LISTINGS = [
    { id: '1', title: 'John Deere 5050D', type: 'Rent Out', status: 'Active', views: 45, date: '22 Jan' },
    { id: '2', title: 'Wheat Thresher', type: 'Sell', status: 'Pending', views: 12, date: '20 Jan' },
];

const MOCK_ORDERS = [
    { id: '1', title: 'Harvester Booking', type: 'Rent In', status: 'Confirmed', date: '25 Jan', provider: 'Ramesh Patil' },
    { id: '2', title: 'Labour Request', type: 'Labour', status: 'Completed', date: '18 Jan', provider: 'Suresh G.' },
];

export default function MyFarmScreen() {
    const layout = useWindowDimensions();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'listings' | 'orders'>('listings');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Farm Info</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <MaterialIcons name="search" size={24} color="#0f172a" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Custom Tabs */}
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'listings' && styles.tabItemActive]}
                    onPress={() => setActiveTab('listings')}
                >
                    <Text style={[styles.tabLabel, activeTab === 'listings' && styles.tabLabelActive]}>My Listings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'orders' && styles.tabItemActive]}
                    onPress={() => setActiveTab('orders')}
                >
                    <Text style={[styles.tabLabel, activeTab === 'orders' && styles.tabLabelActive]}>My Orders</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.tabContent}>
                {activeTab === 'listings' ? (
                    MOCK_LISTINGS.length > 0 ? (
                        <FlatList
                            data={MOCK_LISTINGS}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.cardRow}>
                                        <View style={styles.iconBox}>
                                            <MaterialIcons name={item.type === 'Rent Out' ? 'schedule' : 'sell'} size={20} color={COLORS.brand.primary} />
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                            <Text style={styles.cardSub}>{item.type} • Posted {item.date}</Text>
                                        </View>
                                        <View style={[styles.badge, item.status === 'Active' ? styles.badgeGreen : styles.badgeOrange]}>
                                            <Text style={[styles.badgeText, item.status === 'Active' ? styles.textGreen : styles.textOrange]}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardFooter}>
                                        <View style={styles.viewRow}>
                                            <MaterialIcons name="visibility" size={16} color="#64748b" />
                                            <Text style={styles.viewText}>{item.views} Views</Text>
                                        </View>
                                        <TouchableOpacity style={styles.manageBtn}>
                                            <Text style={styles.manageText}>Manage</Text>
                                            <MaterialIcons name="chevron-right" size={16} color={COLORS.brand.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={{ gap: 12, padding: 16 }}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <MaterialIcons name="inventory" size={48} color="#cbd5e1" />
                            <Text style={styles.emptyText}>No listings yet.</Text>
                            <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/(farmer)/sell-machine')}>
                                <Text style={styles.addBtnText}>+ Add Listing</Text>
                            </TouchableOpacity>
                        </View>
                    )
                ) : (
                    MOCK_ORDERS.length > 0 ? (
                        <FlatList
                            data={MOCK_ORDERS}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.cardRow}>
                                        <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
                                            <MaterialIcons name="shopping-bag" size={20} color="#16a34a" />
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                            <Text style={styles.cardSub}>{item.type} • {item.date}</Text>
                                        </View>
                                        <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
                                    </View>
                                    <View style={styles.orderFooter}>
                                        <Text style={styles.providerText}>Provider: {item.provider}</Text>
                                        <Text style={[styles.statusText, item.status === 'Confirmed' ? styles.textGreen : styles.textGray]}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={{ gap: 12, padding: 16 }}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <MaterialIcons name="history" size={48} color="#cbd5e1" />
                            <Text style={styles.emptyText}>No active orders.</Text>
                        </View>
                    )
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
    headerRight: { flexDirection: 'row', gap: 16 },
    iconBtn: { padding: 4 },

    // Tabs
    tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    tabItem: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
    tabItemActive: { borderBottomColor: COLORS.brand.primary },
    tabLabel: { fontSize: 14, fontWeight: '600', color: '#64748b' },
    tabLabelActive: { color: COLORS.brand.primary, fontWeight: '700' },

    tabContent: { flex: 1, backgroundColor: '#f8fafc' },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    cardRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
    cardInfo: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    cardSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    badgeGreen: { backgroundColor: '#dcfce7' },
    badgeOrange: { backgroundColor: '#ffedd5' },
    badgeText: { fontSize: 10, fontWeight: '700' },
    textGreen: { color: '#16a34a' },
    textOrange: { color: '#fb923c' },
    textGray: { color: '#64748b' },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    viewRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    viewText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
    manageBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    manageText: { fontSize: 12, color: COLORS.brand.primary, fontWeight: '700' },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    providerText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
    statusText: { fontSize: 12, fontWeight: '700' },
    emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    emptyText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },
    addBtn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.brand.primary, borderRadius: 100 },
    addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
