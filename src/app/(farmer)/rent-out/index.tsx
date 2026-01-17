import { MaterialIcons } from '@expo/vector-icons';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MOCK_RENTAL_MACHINES } from './data';

const THEME = {
    primary: '#37ec13',
    primaryDark: '#2ec210',
    backgroundLight: '#f6f8f6',
    surfaceLight: '#ffffff',
    textMain: '#101b0d',
    textSecondary: '#4b5563',
    border: '#d3e7cf',
    danger: '#ef4444',
    white: '#ffffff',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
};

export default function RentOutInventory() {
    const router = useRouter();
    const [machines, setMachines] = useState(MOCK_RENTAL_MACHINES);
    const [loading, setLoading] = useState(true);

    // Simulate loading / checking logic
    useFocusEffect(
        useCallback(() => {
            setLoading(false);
        }, [])
    );

    // If we wanted to enforce the "First time -> Add Form" rule:
    if (!loading && machines.length === 0) {
        return <Redirect href="/(farmer)/rent-out/add-machine" />;
    }

    const toggleVisibility = (id: string) => {
        setMachines(prev => prev.map(m =>
            m.id === id ? { ...m, visible: !m.visible } : m
        ));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.backgroundLight} />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <MaterialIcons name="arrow-back-ios" size={20} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Rental Inventory</Text>
                <TouchableOpacity style={styles.headerBtn}>
                    <MaterialIcons name="info-outline" size={24} color={THEME.primaryDark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* DASHBOARD CARD */}
                <View style={styles.dashboardCard}>
                    <View style={styles.dashboardHeader}>
                        <View>
                            <Text style={styles.dashboardTitle}>Manage Your Fleet</Text>
                            <Text style={styles.dashboardSubtitle}>INVENTORY OVERVIEW</Text>
                        </View>
                        <View style={styles.dashboardIconWrap}>
                            <MaterialIcons name="agriculture" size={28} color={THEME.textMain} />
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <TouchableOpacity
                            style={styles.statBox}
                            onPress={() => router.push('/(farmer)/rent-out/requests')}
                        >
                            <Text style={styles.statLabel}>ACTIVE RENTALS</Text>
                            <View style={styles.statValueRow}>
                                <Text style={styles.statValue}>04</Text>
                                <Text style={styles.statSub}>Live</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>TOTAL MACHINES</Text>
                            <View style={styles.statValueRow}>
                                <Text style={styles.statValue}>06</Text>
                                <Text style={styles.statSub}>Fleet</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* LISTINGS SECTION */}
                <View style={styles.listingsContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Listings</Text>
                        <View style={styles.sortBadge}>
                            <Text style={styles.sortText}>Sort: Newest</Text>
                        </View>
                    </View>

                    {machines.map((machine) => (
                        <View key={machine.id} style={[styles.card, machine.expired && styles.cardExpired]}>
                            <View style={styles.cardContent}>
                                {/* IMAGE */}
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: machine.image }}
                                        style={[styles.machineImage, machine.expired && styles.grayscale]}
                                    />
                                </View>

                                {/* DETAILS */}
                                <View style={styles.detailsContainer}>
                                    <View style={styles.cardRowBetween}>
                                        <Text style={styles.machineName} numberOfLines={1}>{machine.name}</Text>
                                        <View style={[styles.statusBadge, machine.expired ? styles.bgGray : styles.bgGreen]}>
                                            <Text style={[styles.statusText, machine.expired ? styles.textGrayDark : styles.textGreenDark]}>
                                                {machine.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoBlock}>
                                        <View style={styles.infoRow}>
                                            <MaterialIcons name="sell" size={14} color={THEME.textSecondary} />
                                            <Text style={styles.infoLabel}>Rent Price: </Text>
                                            <Text style={styles.infoValue}>₹{machine.price}/{machine.period}</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <MaterialIcons name="event" size={14} color={THEME.textSecondary} />
                                            <Text style={styles.infoLabel}>Expiry: </Text>
                                            <Text style={styles.infoValue}>{machine.expiry}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* ACTIONS */}
                            <View style={styles.cardFooter}>
                                <View style={styles.visibilityRow}>
                                    <Text style={styles.visibilityLabel}>Visibility</Text>
                                    <Switch
                                        trackColor={{ false: '#e5e7eb', true: THEME.primary }}
                                        thumbColor={'#ffffff'}
                                        onValueChange={() => toggleVisibility(machine.id)}
                                        value={machine.visible}
                                        disabled={machine.expired}
                                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                    />
                                </View>

                                <View style={styles.actionsRow}>
                                    <TouchableOpacity
                                        style={styles.editBtn}
                                        onPress={() => router.push({ pathname: '/(farmer)/rent-out/add-machine', params: { id: machine.id } })}
                                    >
                                        <MaterialIcons name="edit" size={16} color={THEME.textMain} />
                                        <Text style={styles.editBtnText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteBtn}>
                                        <MaterialIcons name="delete" size={18} color={THEME.danger} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* FAB */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/(farmer)/rent-out/add-machine')}
                >
                    <MaterialIcons name="add" size={24} color={THEME.textMain} />
                    <Text style={styles.fabText}>Rent One More Machine</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: THEME.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    headerBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: THEME.textMain,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },

    // Dashboard Card
    dashboardCard: {
        backgroundColor: THEME.primary, // Fallback if no gradient
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#22c55e',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    dashboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dashboardTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#000',
        letterSpacing: -0.5,
    },
    dashboardSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.6)',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    dashboardIconWrap: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 12,
        padding: 8,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 4,
    },
    statValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    statSub: {
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.5)',
    },

    // Listings
    listingsContainer: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: THEME.textMain,
    },
    sortBadge: {
        backgroundColor: THEME.gray100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 100,
    },
    sortText: {
        fontSize: 10,
        fontWeight: '600',
        color: THEME.textSecondary,
    },

    card: {
        backgroundColor: THEME.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.gray200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
    },
    cardExpired: {
        opacity: 0.8,
    },
    cardContent: {
        padding: 16,
        flexDirection: 'row',
        gap: 16,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: THEME.gray100,
    },
    machineImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    grayscale: {
        opacity: 0.5,
        tintColor: 'gray',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    machineName: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.textMain,
        flex: 1,
        marginRight: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100,
    },
    bgGreen: { backgroundColor: '#dcfce7' }, // green-100
    bgGray: { backgroundColor: '#f3f4f6' },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    textGreenDark: { color: '#15803d' },
    textGrayDark: { color: '#6b7280' },

    infoBlock: {
        gap: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoLabel: {
        fontSize: 12,
        color: THEME.textSecondary,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '700',
        color: THEME.textMain,
    },

    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f9fafb', // gray-50
    },
    visibilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    visibilityLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: THEME.textSecondary,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.gray200,
    },
    editBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: THEME.textMain,
    },
    deleteBtn: {
        padding: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fee2e2', // red-100
        backgroundColor: '#fef2f2', // red-50
    },

    fabContainer: {
        position: 'absolute',
        bottom: 32,
        right: 16,
    },
    fab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: THEME.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 100,
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    fabText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
    }
});
