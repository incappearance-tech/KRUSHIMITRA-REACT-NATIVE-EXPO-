import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { LABOURERS } from './data';

export default function LabourUnlockScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const labour = LABOURERS.find(l => l.id === id) || LABOURERS[0];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.9)" />

            {/* App Bar */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Confirm Unlock</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: labour.image }} style={styles.avatar} />
                        <View style={styles.checkBadge}>
                            <MaterialIcons name="check" size={16} color="#000" />
                        </View>
                    </View>
                    <Text style={styles.name}>{labour.name}</Text>
                    <View style={styles.locationRow}>
                        <MaterialIcons name="location-on" size={18} color="#6b7280" />
                        <Text style={styles.locationText}>Village: {labour.location}</Text>
                    </View>
                </View>

                {/* Details Grid */}
                <View style={styles.grid2}>
                    <View style={styles.detailCard}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="agriculture" size={20} color={COLORS.brand.primary} />
                        </View>
                        <Text style={styles.detailLabel}>Work Type</Text>
                        <Text style={styles.detailValue}>{labour.role}</Text>
                    </View>
                    <View style={styles.detailCard}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="schedule" size={20} color={COLORS.brand.primary} />
                        </View>
                        <Text style={styles.detailLabel}>Availability</Text>
                        <Text style={styles.detailValue}>{labour.availability}</Text>
                    </View>
                </View>

                {/* Pricing Card */}
                <View style={styles.priceCard}>
                    <MaterialIcons name="payments" size={120} color={COLORS.brand.primary} style={styles.bgIcon} />

                    <View style={styles.cardHeader}>
                        <Text style={styles.feeLabel}>Contact Unlock Fee</Text>
                        <View style={styles.feeRow}>
                            <Text style={styles.feeAmount}>₹50</Text>
                            <View style={styles.oneTimeBadge}>
                                <Text style={styles.oneTimeText}>One-time fee</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.features}>
                        <View style={styles.featureRow}>
                            <MaterialIcons name="check-circle" size={20} color={COLORS.brand.primary} />
                            <Text style={styles.featureText}>Instant mobile number access</Text>
                        </View>
                        <View style={styles.featureRow}>
                            <MaterialIcons name="check-circle" size={20} color={COLORS.brand.primary} />
                            <Text style={styles.featureText}>Direct calling allowed</Text>
                        </View>
                    </View>
                </View>

                {/* Disclaimer */}
                <View style={styles.warningCard}>
                    <MaterialIcons name="info" size={20} color="#ea580c" style={{ marginTop: 2 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.warningTitle}>Important Notice</Text>
                        <Text style={styles.warningText}>Payment is only for unlocking contact details. Actual wages and work terms must be negotiated directly with the labourer.</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.payBtn}
                    onPress={() => router.push({ pathname: '/(farmer)/labour/contact', params: { id: labour.id } })}
                >
                    <Text style={styles.payBtnText}>Pay to Unlock</Text>
                    <View style={styles.payBtnContent}>
                        <Text style={styles.payBtnAmount}>₹50</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#000" />
                    </View>
                </TouchableOpacity>

                <View style={styles.footerMeta}>
                    <View style={styles.metaItem}>
                        <MaterialIcons name="lock" size={14} color="#6b7280" />
                        <Text style={styles.metaText}>Secure Payment</Text>
                    </View>
                    <View style={styles.dot} />
                    <View style={styles.metaItem}>
                        <MaterialIcons name="verified-user" size={14} color="#6b7280" />
                        <Text style={styles.metaText}>Verified Profile</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Design uses light bg
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    iconBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    appBarTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 120,
        gap: 24,
    },

    header: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: 'rgba(55, 236, 19, 0.2)',
    },
    checkBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.brand.primary,
        padding: 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        textAlign: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },

    grid2: {
        flexDirection: 'row',
        gap: 12,
    },
    detailCard: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8fafc', // slate-50
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    iconBox: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(55, 236, 19, 0.1)',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    detailValue: {
        fontSize: 14,
        color: '#475569',
        marginTop: 2,
    },

    priceCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        borderRadius: 12,
        padding: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    bgIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0.1,
        transform: [{ translateX: 20 }, { translateY: -20 }],
    },
    cardHeader: {
        gap: 4,
    },
    feeLabel: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: '#64748b',
        letterSpacing: 1,
    },
    feeRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    feeAmount: {
        fontSize: 36,
        fontWeight: '900',
        color: '#0f172a',
    },
    oneTimeBadge: {
        backgroundColor: 'rgba(55, 236, 19, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100,
    },
    oneTimeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1e293b',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 16,
    },
    features: {
        gap: 12,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    featureText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#334155',
    },

    warningCard: {
        flexDirection: 'row',
        gap: 16,
        backgroundColor: '#fff7ed', // orange-50
        borderColor: '#ffedd5',
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    warningTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    warningText: {
        fontSize: 12,
        color: '#475569',
        marginTop: 2,
        lineHeight: 18,
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingBottom: 32, // Safe area ish
    },
    payBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.brand.primary,
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 24,
        shadowColor: '#bbf7d0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    payBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    payBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    payBtnAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    footerMeta: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        opacity: 0.6,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#6b7280',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#cbd5e1',
    },
});
