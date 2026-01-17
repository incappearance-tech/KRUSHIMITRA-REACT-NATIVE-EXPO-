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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { LABOURERS } from './data';

const FILTERS = ['All', 'Harvesting', 'Sowing', 'Tractor Driver', 'Day Shift'];

export default function LabourBrowsingScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLabourers = LABOURERS.filter(l => {
        const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' ||
            l.role.includes(selectedFilter) ||
            (selectedFilter === 'Day Shift' && l.availability === 'Day Shift'); // simplistic mapping
        return matchesSearch && matchesFilter;
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.95)" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.headerTitle}>Find Laborers</Text>
                        <View style={styles.locationRow}>
                            <MaterialIcons name="location-on" size={14} color="#6b7280" />
                            <Text style={styles.locationText}>Near Rampur (5km)</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.profileBtn}>
                        <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB9ln3Vpct6yeyFcvFxKgGlJs-3Xr7PEvqMTJOpy1iLYhgCO7zNLeJA5-INB-VwhU9SYIZr8reh4hYyGp13MqV8OQEkH8v-VIyijaj2jyl7-Nuk1iNXYOno_tN2CjCFuWO6sAf_jLA5LkweB-V4ObuQ8Qu1ILIRFHDWb5KuTLPIi0yUMaAPTU60mXIAwFv3t95pX5xgedZO_BR9kWImid8mpVL-SMIHtgQb5WjlHPGruydU7oF0Q3r05h_jc0KqEH43wfcfNqChkex' }} style={styles.profileImg} />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name or skill..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.tuneBtn}
                        onPress={() => router.push('/(farmer)/labour/filters')}
                    >
                        <MaterialIcons name="tune" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {FILTERS.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterChip,
                                selectedFilter === filter ? styles.filterChipActive : styles.filterChipInactive
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedFilter === filter ? styles.filterTextActive : styles.filterTextInactive
                            ]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {filteredLabourers.map((labour) => {
                    const isBusy = (labour as any).busy;
                    return (
                        <View key={labour.id} style={[styles.card, isBusy && styles.cardBusy]}>
                            <View style={styles.cardHeader}>
                                <View style={styles.avatarContainer}>
                                    <Image source={{ uri: labour.image }} style={[styles.avatar, isBusy && styles.avatarBusy]} />
                                    {labour.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <MaterialIcons name="workspace-premium" size={12} color="#fff" />
                                        </View>
                                    )}
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.name}>{labour.name}</Text>
                                        <View style={styles.ratingBadge}>
                                            <Text style={styles.ratingValue}>{labour.rating}</Text>
                                            <MaterialIcons name="star" size={12} color="#b45309" />
                                        </View>
                                    </View>
                                    <Text style={styles.roleText}>{labour.role} • {labour.location}</Text>
                                    <View style={styles.tagsRow}>
                                        {labour.tags.map(tag => (
                                            <View key={tag} style={[
                                                styles.tag,
                                                tag.includes('Night') ? styles.tagIndigo :
                                                    tag.includes('Both') ? styles.tagPrimary : styles.tagGreen
                                            ]}>
                                                <MaterialIcons
                                                    name={tag.includes('Night') ? 'bedtime' : tag.includes('Both') ? 'schedule' : 'wb-sunny'}
                                                    size={12}
                                                    color={tag.includes('Night') ? '#4338ca' : tag.includes('Both') ? '#000' : '#15803d'}
                                                />
                                                <Text style={[
                                                    styles.tagText,
                                                    tag.includes('Night') ? styles.tagTextIndigo : tag.includes('Both') ? styles.tagTextBlack : styles.tagTextGreen
                                                ]}>{tag}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.actionsRow}>
                                <TouchableOpacity
                                    style={styles.viewBtn}
                                    onPress={() => router.push({ pathname: '/(farmer)/labour/details', params: { id: labour.id } })}
                                >
                                    <MaterialIcons name="visibility" size={20} color="#1a3b12" />
                                    <Text style={styles.viewBtnText}>View Profile</Text>
                                </TouchableOpacity>

                                {isBusy ? (
                                    <TouchableOpacity style={styles.busyBtn} disabled>
                                        <MaterialIcons name="call-end" size={20} color="#6b7280" />
                                        <Text style={styles.busyBtnText}>Busy</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.callBtn}
                                        onPress={() => router.push({ pathname: '/(farmer)/labour/details', params: { id: labour.id } })}
                                    >
                                        <MaterialIcons name="call" size={20} color="#000" />
                                        <Text style={styles.callBtnText}>Call</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    );
                })}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Nav Simulation */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingBottom: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    locationText: {
        fontSize: 12,
        color: '#6b7280',
    },
    profileBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    profileImg: {
        width: '100%',
        height: '100%',
    },
    searchRow: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f8f0', // e9f3e7 approx
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#0f172a',
    },
    tuneBtn: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.brand.primary,
        borderRadius: 10,
    },
    filterScroll: {
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 4,
    },
    filterChip: {
        paddingHorizontal: 16,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    filterChipActive: {
        backgroundColor: COLORS.brand.primary,
        borderColor: COLORS.brand.primary,
    },
    filterChipInactive: {
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#000',
    },
    filterTextInactive: {
        color: '#374151',
    },

    listContent: {
        padding: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardBusy: {
        opacity: 0.9,
    },
    cardHeader: {
        flexDirection: 'row',
        gap: 16,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e5e7eb',
    },
    avatarBusy: {
        opacity: 0.5, // grayscale shim
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: '#eab308', // goldish
        padding: 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    infoContainer: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 2,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#fefce8',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fef08a',
    },
    ratingValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#b45309',
    },
    roleText: {
        fontSize: 14,
        color: '#64748b', // secondary
        marginBottom: 8,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 100,
        borderWidth: 1,
    },
    tagGreen: {
        backgroundColor: '#f0fdf4',
        borderColor: '#dcfce7',
    },
    tagIndigo: {
        backgroundColor: '#eef2ff',
        borderColor: '#e0e7ff',
    },
    tagPrimary: {
        backgroundColor: COLORS.brand.primary,
        borderColor: COLORS.brand.primary,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
    },
    tagTextGreen: {
        color: '#15803d',
    },
    tagTextIndigo: {
        color: '#4338ca',
    },
    tagTextBlack: {
        color: '#000',
    },

    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    viewBtn: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#f1f8f0',
        borderRadius: 8,
    },
    viewBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a3b12',
    },
    callBtn: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 8,
    },
    callBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    busyBtn: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
    },
    busyBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6b7280',
    },
});
