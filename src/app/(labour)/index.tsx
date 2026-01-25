import { COLORS } from '@/src/constants/colors';
import { useLabourStore } from '@/src/store/labour.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LabourDashboard() {
    const router = useRouter();
    const { profile, leads } = useLabourStore();

    useEffect(() => {
        if (!profile) {
            router.replace('/(labour)/register');
        }
    }, [profile]);

    if (!profile) return null;

    const handleCallLead = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* Header Profile Info */}
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.greeting}>Namaste, {profile.name.split(' ')[0]}</Text>
                        <Text style={styles.subGreeting}>Helping farmers grow better</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/(labour)/profile')}>
                        <MaterialIcons name="account-circle" size={48} color={COLORS.brand.primary} />
                    </TouchableOpacity>
                </View>

                {/* Stats Dashboard */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <MaterialIcons name="call" size={24} color="#3b82f6" />
                        <Text style={styles.statValue}>{profile.callsReceived || leads.length}</Text>
                        <Text style={styles.statLabel}>Farmer Leads</Text>
                    </View>
                    <View style={styles.statCard}>
                        <MaterialIcons name="work" size={24} color="#22c55e" />
                        <Text style={styles.statValue}>{profile.jobsCompleted}</Text>
                        <Text style={styles.statLabel}>Jobs Done</Text>
                    </View>
                    <View style={styles.statCard}>
                        <MaterialIcons name="star" size={24} color="#eab308" />
                        <Text style={styles.statValue}>{profile.rating}</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* Recent Leads Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Inquiries</Text>
                        <MaterialIcons name="history" size={20} color="#9ca3af" />
                    </View>

                    {leads.length > 0 ? (
                        leads.map((lead) => (
                            <View key={lead.id} style={styles.leadCard}>
                                <View style={styles.leadInfo}>
                                    <View style={styles.leadHeader}>
                                        <Text style={styles.farmerName}>{lead.farmerName}</Text>
                                        <Text style={styles.leadDate}>{lead.date}</Text>
                                    </View>
                                    <View style={styles.leadDetails}>
                                        <MaterialIcons name="location-on" size={14} color="#6b7280" />
                                        <Text style={styles.leadLocText}>{lead.location}</Text>
                                    </View>
                                    <View style={styles.workTag}>
                                        <Text style={styles.workTagText}>{lead.type}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.callBtn}
                                    onPress={() => handleCallLead(lead.farmerPhone)}
                                >
                                    <MaterialIcons name="call" size={20} color="#fff" />
                                    <Text style={styles.callBtnText}>Call Back</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <MaterialIcons name="notifications-none" size={48} color="#d1d5db" />
                            <Text style={styles.emptyText}>No farmer inquiries yet.</Text>
                            <Text style={styles.emptySubText}>Your profile is visible. Farmers will call you soon.</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scroll: { paddingBottom: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 30 },
    headerInfo: { flex: 1 },
    greeting: { fontSize: 24, fontWeight: '800', color: COLORS.text },
    subGreeting: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
    statsGrid: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginBottom: 24 },
    statCard: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#f3f4f6', elevation: 2 },
    statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginTop: 8 },
    statLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
    section: { paddingHorizontal: 16 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    leadCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f3f4f6', elevation: 1 },
    leadInfo: { flex: 1 },
    leadHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    farmerName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
    leadDate: { fontSize: 12, color: '#9ca3af' },
    leadDetails: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
    leadLocText: { fontSize: 14, color: '#6b7280' },
    workTag: { alignSelf: 'flex-start', backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    workTagText: { fontSize: 12, fontWeight: '600', color: '#16a34a' },
    callBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.brand.primary, paddingVertical: 12, borderRadius: 12, marginTop: 12 },
    callBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
    emptyContainer: { alignItems: 'center', paddingVertical: 60 },
    emptyText: { fontSize: 18, fontWeight: '700', color: COLORS.textSecondary, marginTop: 16 },
    emptySubText: { fontSize: 14, color: '#9ca3af', textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
});
