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

export default function LabourDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const labour = LABOURERS.find(l => l.id === id) || LABOURERS[0]; // Fallback

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.9)" />

            {/* App Bar */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Labour Profile</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <MaterialIcons name="share" size={24} color="#0f172a" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header Profile */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: labour.image }} style={styles.avatarLg} />
                        <View style={styles.onlineBadge}>
                            <View style={styles.onlineDot} />
                        </View>
                    </View>
                    <View style={styles.nameSection}>
                        <Text style={styles.profileName}>{labour.name}</Text>
                        <View style={styles.activeRow}>
                            <View style={styles.activeDotAnim} />
                            <Text style={styles.activeText}>Active 2 hours ago</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingNum}>{labour.rating}</Text>
                            <MaterialIcons name="star" size={16} color="#facc15" />
                        </View>
                        <Text style={styles.statLabel}>{labour.reviews} Reviews</Text>
                    </View>

                    <View style={[styles.statCard, styles.statCardExp]}>
                        <MaterialIcons name="workspace-premium" size={24} color="#16a34a" style={{ marginBottom: 4 }} />
                        <Text style={styles.statValue}>{labour.experience}</Text>
                        <Text style={styles.statLabel}>Level</Text>
                    </View>

                    <View style={styles.statCard}>
                        <MaterialIcons name="location-on" size={24} color="#ef4444" style={{ marginBottom: 4 }} />
                        <Text style={styles.statValue} numberOfLines={1}>{labour.location}</Text>
                        <Text style={styles.statLabel}>Village</Text>
                    </View>
                </View>

                {/* Expertise */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="agriculture" size={24} color={COLORS.brand.primary} />
                        <Text style={styles.sectionTitle}>Expertise</Text>
                    </View>
                    <View style={styles.tagsContainer}>
                        {labour.expertise.map(skill => (
                            <View key={skill} style={styles.skillChip}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Availability */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="schedule" size={24} color={COLORS.brand.primary} />
                        <Text style={styles.sectionTitle}>Availability</Text>
                    </View>

                    <View style={styles.availCard}>
                        <View style={styles.shiftRow}>
                            <View style={styles.shiftBoxDay}>
                                <MaterialIcons name="wb-sunny" size={24} color="#f97316" />
                                <Text style={styles.shiftTextDay}>Day Shift</Text>
                            </View>
                            <View style={styles.shiftBoxNight}>
                                <MaterialIcons name="bedtime" size={24} color="#818cf8" />
                                <Text style={styles.shiftTextNight}>Night Shift</Text>
                            </View>
                        </View>
                        <View style={styles.hoursRow}>
                            <MaterialIcons name="info-outline" size={20} color="#6b7280" />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.hoursTitle}>Preferred Hours</Text>
                                <Text style={styles.hoursDesc}>{labour.preferredHours}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Trust/Verification */}
                <View style={styles.trustSection}>
                    <View style={styles.trustRow}>
                        <MaterialIcons name="verified-user" size={20} color="#16a34a" />
                        <Text style={styles.trustTitle}>Community Trusted Member</Text>
                    </View>
                    <Text style={styles.trustDesc}>This profile is verified by community ratings. No ID documents required.</Text>
                </View>

            </ScrollView>

            {/* Footer Action */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => router.push({ pathname: '/(farmer)/labour/unlock', params: { id: labour.id } })}
                >
                    <MaterialIcons name="call" size={24} color="#000" />
                    <Text style={styles.actionBtnText}>Call {labour.name.split(' ')[0]}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    scrollContent: {
        paddingBottom: 100,
    },

    // Profile Header
    profileHeader: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarLg: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: '#e5e7eb',
        borderWidth: 4,
        borderColor: '#fff',
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#22c55e',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    onlineDot: {
        // already styled via container
    },
    nameSection: {
        alignItems: 'center',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    activeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    activeDotAnim: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.brand.primary,
    },
    activeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#15803d',
    },

    // Stats
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        minHeight: 90,
    },
    statCardExp: {
        position: 'relative',
        overflow: 'hidden',
        // bg-primary/5 shim handled via basic bg here
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    ratingNum: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    statLabel: {
        fontSize: 12,
        color: '#6b7280',
    },
    statValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },

    // Section Generic
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },

    // Tags
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillChip: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dcfce7',
    },
    skillText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#166534',
    },

    // Availability Card
    availCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    shiftRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    shiftBoxDay: {
        flex: 1,
        backgroundColor: '#fff7ed',
        borderWidth: 1,
        borderColor: '#ffedd5',
        borderRadius: 12,
        alignItems: 'center',
        padding: 12,
        gap: 8,
    },
    shiftTextDay: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    shiftBoxNight: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderRadius: 12,
        alignItems: 'center',
        padding: 12,
        gap: 8,
        opacity: 0.6, // Inactive shim
    },
    shiftTextNight: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    hoursRow: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 12,
        alignItems: 'flex-start',
    },
    hoursTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0f172a',
    },
    hoursDesc: {
        fontSize: 14,
        color: '#4b5563',
        marginTop: 2,
    },

    // Trust
    trustSection: {
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    trustRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    trustTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    trustDesc: {
        fontSize: 12,
        color: '#9ca3af',
        textAlign: 'center',
        paddingHorizontal: 32,
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    actionBtn: {
        backgroundColor: COLORS.brand.primary,
        height: 56,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#bbf7d0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    actionBtnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
});
