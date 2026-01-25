import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { useRentalStore } from '@/src/store/rental.store';
import { MaterialIcons } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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
    const { rentals, requests, removeRental, toggleRentalVisibility } = useRentalStore();

    if (rentals.length === 0) {
        return <Redirect href="/(farmer)/rent-out/add-machine" />;
    }

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Rental',
            'Are you sure you want to remove this rental listing?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => removeRental(id) },
            ]
        );
    };

    const getMachineStatus = (machine: any) => {
        if (machine.expired) return { label: 'EXPIRED', color: 'gray' };
        if (!machine.visible) return { label: 'HIDDEN', color: 'secondary' };

        const machineRequests = requests.filter(r => r.machineId === machine.id);
        const hasAccepted = machineRequests.some(r => r.status === 'ACCEPTED');
        if (hasAccepted) return { label: 'BOOKED', color: 'blue' };

        const hasPending = machineRequests.some(r => r.status === 'PENDING');
        if (hasPending) return { label: 'REQUESTED', color: 'orange' };

        return { label: 'AVAILABLE', color: 'green' };
    };

    const liveListingsCount = rentals.filter(r => r.visible && !r.expired).length;
    const bookingCount = requests.filter(r => r.status === 'ACCEPTED').length;

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <AppBar title="My Rental Inventory" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* DASHBOARD CARD */}
                <View style={styles.dashboardCard}>
                    <View style={styles.dashboardHeader}>
                        <View>
                            <Text style={styles.dashboardTitle}>Manage Your Fleet</Text>
                            <Text style={styles.dashboardSubtitle}>INVENTORY OVERVIEW</Text>
                        </View>
                        <View style={styles.dashboardIconWrap}>
                            <MaterialIcons name="agriculture" size={28} color={COLORS.white} />
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <TouchableOpacity
                            style={styles.statBox}
                            onPress={() => router.push('/(farmer)/rent-out/requests')}
                        >
                            <Text style={styles.statLabel}>MARKET LIVE</Text>
                            <View style={styles.statValueRow}>
                                <Text style={styles.statValue}>{liveListingsCount < 10 ? `0${liveListingsCount}` : liveListingsCount}</Text>
                                <Text style={styles.statSub}>Active</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>BOOKED NOW</Text>
                            <View style={styles.statValueRow}>
                                <Text style={styles.statValue}>{bookingCount < 10 ? `0${bookingCount}` : bookingCount}</Text>
                                <Text style={styles.statSub}>Hired</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* LISTINGS SECTION */}
                <View style={styles.listingsContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Listings ({rentals.length})</Text>
                        <View style={styles.sortBadge}>
                            <Text style={styles.sortText}>Sort: Newest</Text>
                        </View>
                    </View>

                    {rentals.map((machine: any) => {
                        const status = getMachineStatus(machine);
                        return (
                            <View key={machine.id} style={[styles.card, machine.expired && styles.cardExpired]}>
                                <View style={styles.cardContent}>
                                    {/* IMAGE */}
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: machine.image }}
                                            style={[
                                                styles.machineImage,
                                                (machine.expired || !machine.visible) && styles.grayscale
                                            ]}
                                        />
                                    </View>

                                    {/* DETAILS */}
                                    <View style={styles.detailsContainer}>
                                        <View style={styles.cardRowBetween}>
                                            <Text style={styles.machineName} numberOfLines={1}>{machine.name}</Text>
                                            <View style={[
                                                styles.statusBadge,
                                                status.color === 'green' && styles.bgGreen,
                                                status.color === 'orange' && styles.bgOrange,
                                                status.color === 'blue' && styles.bgBlue,
                                                status.color === 'gray' && styles.bgGray,
                                                status.color === 'secondary' && styles.bgGray,
                                            ]}>
                                                <Text style={[
                                                    styles.statusText,
                                                    status.color === 'green' && styles.textGreenDark,
                                                    status.color === 'orange' && styles.textOrangeDark,
                                                    status.color === 'blue' && styles.textBlueDark,
                                                    status.color === 'gray' && styles.textGrayDark,
                                                    status.color === 'secondary' && styles.textGrayDark,
                                                ]}>
                                                    {status.label}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoBlock}>
                                            <View style={styles.infoRow}>
                                                <MaterialIcons name="sell" size={14} color={THEME.textSecondary} />
                                                <Text style={styles.infoLabel}>Rate: </Text>
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
                                        <Text style={styles.visibilityLabel}>Show on Market</Text>
                                        <Switch
                                            trackColor={{ false: '#e5e7eb', true: THEME.primary }}
                                            thumbColor={'#ffffff'}
                                            onValueChange={() => toggleRentalVisibility(machine.id)}
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
                                        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(machine.id)}>
                                            <MaterialIcons name="delete" size={18} color={THEME.danger} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* FAB */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/(farmer)/rent-out/add-machine')}
                >
                    <MaterialIcons name="add" size={24} color={THEME.textMain} />
                    <Text style={styles.fabText}>Rent More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16
    },
    scrollContent: {
        paddingBottom: 120,
    },
    dashboardCard: {
        backgroundColor: THEME.primary,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        marginTop: 16,
        elevation: 8,
        shadowColor: THEME.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    dashboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dashboardTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.white,
    },
    dashboardSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 1,
    },
    dashboardIconWrap: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 8,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: COLORS.white,
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
        color: COLORS.white,
    },
    statSub: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.white,
    },
    listingsContainer: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
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
        elevation: 2,
        overflow: 'hidden',
        marginBottom: 16,
    },
    cardExpired: {
        opacity: 0.6,
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
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100,
    },
    bgGreen: { backgroundColor: '#dcfce7' },
    bgGray: { backgroundColor: '#f3f4f6' },
    bgOrange: { backgroundColor: '#ffedd5' },
    bgBlue: { backgroundColor: '#dbeafe' },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    textGreenDark: { color: '#15803d' },
    textGrayDark: { color: '#6b7280' },
    textOrangeDark: { color: '#9a3412' },
    textBlueDark: { color: '#1e40af' },
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
        borderTopColor: '#f9fafb',
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
        borderColor: '#fee2e2',
        backgroundColor: '#fef2f2',
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
        elevation: 6,
    },
    fabText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
    }
});
