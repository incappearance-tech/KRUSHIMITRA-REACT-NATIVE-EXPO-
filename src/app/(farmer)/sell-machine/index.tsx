import { useSellingStore } from '@/src/store/selling.store';
import { MaterialIcons } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const THEME = {
    primary: '#37ec13',
    backgroundLight: '#f6f8f6',
    surfaceLight: '#ffffff',
    textMainLight: '#101b0d',
    textSecondaryLight: '#4b5563',
    borderLight: '#d3e7cf',
};

export default function SellMachineInventory() {
    const router = useRouter();
    const { machines, toggleVisibility, removeMachine } = useSellingStore();

    if (machines.length === 0) {
        return <Redirect href="/(farmer)/sell-machine/add-details" />;
    }

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Machine',
            'Are you sure you want to remove this listing? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => removeMachine(id) },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.backgroundLight} />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <MaterialIcons name="arrow-back-ios" size={20} color={THEME.textMainLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Selling Inventory</Text>
                <TouchableOpacity style={styles.headerBtn}>
                    <MaterialIcons name="more-horiz" size={24} color={THEME.textMainLight} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* SUMMARY SECTION */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View>
                            <Text style={styles.summaryLabel}>ACTIVE LISTINGS</Text>
                            <Text style={styles.summaryValue}>{machines.filter(m => m.visible).length}</Text>
                        </View>
                        <View style={styles.walletIconWrap}>
                            <MaterialIcons name="inventory" size={28} color={THEME.primary} />
                        </View>
                    </View>
                    <View style={styles.activeListingRow}>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>{machines.length}</Text>
                        </View>
                        <Text style={styles.activeText}>Machines listed in your inventory</Text>
                    </View>
                </View>

                {/* LISTINGS SECTION */}
                <View style={styles.listingsContainer}>
                    <Text style={styles.sectionTitle}>LISTED MACHINES</Text>

                    {machines.map((machine) => (
                        <View key={machine.id} style={[styles.card, machine.expired && styles.cardExpired]}>
                            <View style={styles.cardContent}>
                                {/* IMAGE */}
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: machine.media[0]?.uri }}
                                        style={[styles.machineImage, machine.expired && styles.grayscale]}
                                    />
                                    <View style={[styles.statusBadge, machine.expired ? styles.bgGray : styles.bgGreen]}>
                                        <Text style={styles.statusText}>{machine.status}</Text>
                                    </View>
                                </View>

                                {/* DETAILS */}
                                <View style={styles.detailsContainer}>
                                    <View>
                                        <Text style={styles.machineName}>{machine.brand} {machine.model}</Text>
                                        <View style={styles.expiryRow}>
                                            <MaterialIcons name="event" size={14} color={THEME.textSecondaryLight} />
                                            <Text style={styles.expiryText}>Expiry Date: {machine.expiry}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.priceRow}>
                                        <Text style={[styles.price, machine.expired && styles.textGray]}>{`₹${Number(machine.askingPrice).toLocaleString()}`}</Text>
                                        <View style={styles.toggleRow}>
                                            <Text style={styles.visibleLabel}>{machine.visible ? 'VISIBLE' : 'HIDDEN'}</Text>
                                            <Switch
                                                trackColor={{ false: '#e5e7eb', true: THEME.primary }}
                                                thumbColor={'#ffffff'}
                                                onValueChange={() => toggleVisibility(machine.id)}
                                                value={machine.visible}
                                                disabled={machine.expired}
                                                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* ACTIONS */}
                            <View style={styles.cardFooter}>
                                <TouchableOpacity
                                    style={styles.actionBtnMain}
                                    onPress={() => machine.expired
                                        ? console.log('Relist')
                                        : router.push({ pathname: '/(farmer)/sell-machine/add-details', params: { id: machine.id } })
                                    }
                                >
                                    <MaterialIcons
                                        name={machine.expired ? "refresh" : "edit-square"}
                                        size={18}
                                        color={THEME.textSecondaryLight}
                                    />
                                    <Text style={styles.actionBtnText}>
                                        {machine.expired ? 'Relist' : 'Edit'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(machine.id)}>
                                    <MaterialIcons name="delete" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* FAB */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/(farmer)/sell-machine/add-details')}
                >
                    <MaterialIcons name="add" size={24} color="#000" />
                    <Text style={styles.fabText}>Sell One More Machine</Text>
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
        backgroundColor: 'rgba(246, 248, 246, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: THEME.borderLight,
    },
    headerBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: THEME.textMainLight,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    summaryCard: {
        backgroundColor: THEME.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: THEME.borderLight,
        // Add shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: THEME.textSecondaryLight,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 28,
        fontWeight: '800',
        color: THEME.textMainLight,
    },
    walletIconWrap: {
        backgroundColor: 'rgba(55, 236, 19, 0.2)', // primary with opacity
        padding: 10,
        borderRadius: 12,
    },
    activeListingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    activeBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: THEME.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    activeBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    activeText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.textSecondaryLight,
    },

    listingsContainer: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: THEME.textSecondaryLight,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 4,
    },
    card: {
        backgroundColor: THEME.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.borderLight,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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
        width: 96,
        height: 96,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        position: 'relative',
    },
    machineImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    grayscale: {
        tintColor: 'gray', // Simple grayscale effect for demo, or remove for full color
        opacity: 0.5,
    },
    statusBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100,
    },
    bgGreen: { backgroundColor: '#22c55e' },
    bgGray: { backgroundColor: '#6b7280' },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    machineName: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.textMainLight,
        lineHeight: 20,
        marginBottom: 4,
    },
    expiryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    expiryText: {
        fontSize: 12,
        color: THEME.textSecondaryLight,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.primary,
    },
    textGray: {
        color: THEME.textSecondaryLight,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    visibleLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: THEME.textSecondaryLight,
    },
    cardFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: THEME.borderLight,
    },
    actionBtnMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
        borderRightWidth: 1,
        borderRightColor: THEME.borderLight,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.textSecondaryLight,
    },
    deleteBtn: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    fabText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
    }
});
