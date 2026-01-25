import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MyDriversScreen() {
    const router = useRouter();
    const { profile } = useTransporterStore();

    const vehicles = profile?.vehicles || [];

    return (
        <View style={styles.container}>
            <AppBar title="My Drivers" onBackPress={() => router.back()} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {vehicles.length > 0 ? (
                    vehicles.map((v) => (
                        <View key={v.id} style={styles.driverCard}>
                            <View style={styles.cardTop}>
                                <View style={styles.driverInfo}>
                                    <View style={styles.avatarWrap}>
                                        {v.driver.photo ? (
                                            <Image source={{ uri: v.driver.photo }} style={styles.avatar} />
                                        ) : (
                                            <View style={styles.avatarPlaceholder}>
                                                <MaterialIcons name="person" size={24} color="#94a3b8" />
                                            </View>
                                        )}
                                        <View style={styles.verifiedBadge}>
                                            <MaterialIcons name="verified" size={10} color="#fff" />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.driverName}>{v.driver.name}</Text>
                                        <Text style={styles.licenseText}>DL: {v.driver.licenseNo || 'Verified'}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.callBtn} onPress={() => { }}>
                                    <MaterialIcons name="call" size={20} color={COLORS.brand.primary} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardDivider} />

                            <View style={styles.footerRow}>
                                <View style={styles.assignedTo}>
                                    <MaterialIcons name="local-shipping" size={16} color="#64748b" />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.assignLabel} numberOfLines={1}>
                                            Assigned: <Text style={styles.assignValue}>{v.model} ({v.number})</Text>
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.editBtn}
                                    onPress={() => router.push({ pathname: '/(transporter)/edit-driver', params: { vehicleId: v.id } })}
                                >
                                    <MaterialIcons name="edit" size={16} color={COLORS.brand.primary} />
                                    <Text style={styles.editBtnText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="people-outline" size={64} color="#e2e8f0" />
                        <Text style={styles.emptyTitle}>No Drivers Added</Text>
                        <Text style={styles.emptySub}>Add a vehicle to assign and manage your drivers here.</Text>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => router.push('/(transporter)/add-vehicle')}
                        >
                            <Text style={styles.addBtnText}>Add New Vehicle</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    scroll: { padding: 16 },
    driverCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 2,
        shadowColor: '#000',
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
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3b82f6',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    driverName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    licenseText: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    callBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#f0fdf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#f1f5f9',
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
        color: '#64748b',
        fontWeight: '500',
    },
    assignValue: {
        fontSize: 13,
        color: '#0f172a',
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
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0f172a',
        marginTop: 16,
    },
    emptySub: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    addBtn: {
        marginTop: 32,
        backgroundColor: COLORS.brand.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 100,
    },
    addBtnText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 14,
    },
});
