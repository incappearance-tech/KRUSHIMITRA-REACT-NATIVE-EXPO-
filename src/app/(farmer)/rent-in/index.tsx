import { COLORS } from '@/src/constants/colors';
import { useRentalStore } from '@/src/store/rental.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { RENTAL_MACHINES } from './data';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: 'all', label: 'All', icon: 'grid-view' },
    { id: 'tractor', label: 'Tractors', icon: 'agriculture' },
    { id: 'harvester', label: 'Harvesters', icon: 'local-shipping' },
    { id: 'implement', label: 'Implements', icon: 'handyman' },
];

export default function RentInBrowseScreen() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { rentals: globalRentals } = useRentalStore();

    // Merge mock data with dynamic global rentals
    const allRentals: any[] = [
        ...RENTAL_MACHINES,
        ...globalRentals
            .filter(r => r.visible && !r.expired)
            .map(r => ({
                id: r.id,
                name: r.name,
                type: r.type,
                owner: r.ownerName,
                location: r.location,
                distance: r.distance,
                rating: r.rating,
                pricePerHour: r.period === 'hr' ? r.price : (Number(r.price) / 8).toFixed(0),
                pricePerDay: r.period === 'day' ? r.price : (Number(r.price) * 8).toFixed(0),
                availability: r.expiry,
                minDuration: 'Min. 4 Hours',
                image: r.image,
                category: r.category,
                addons: ['Verified Machine'],
                operator: true
            }))
    ];

    const filteredMachines = allRentals.filter(machine => {
        const matchesCategory = selectedCategory === 'all' || machine.category.toLowerCase() === selectedCategory;
        const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.95)" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerTitle}>Browse Rental Machines</Text>
                        <View style={styles.locationRow}>
                            <MaterialIcons name="location-on" size={14} color="#6b7280" />
                            <Text style={styles.locationText}>Near Rampur Village</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notifBtn}>
                        <MaterialIcons name="notifications" size={24} color="#374151" />
                        <View style={styles.notifDot} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search tractors for rent..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.filterBtn}
                        onPress={() => router.push('/(farmer)/rent-in/filters')}
                    >
                        <MaterialIcons name="tune" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat.id ? styles.categoryActive : styles.categoryInactive
                            ]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            <MaterialIcons
                                name={cat.icon as any}
                                size={20}
                                color={selectedCategory === cat.id ? '#000' : '#4b5563'}
                            />
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat.id ? styles.categoryTextActive : styles.categoryTextInactive
                            ]}>{cat.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                <View style={styles.sortRow}>
                    <Text style={styles.sortText}>Sorted by: <Text style={styles.sortBold}>Distance & Availability</Text></Text>
                    <Text style={styles.sortText}>{filteredMachines.length} Machines</Text>
                </View>

                {filteredMachines.map((machine) => (
                    <TouchableOpacity
                        key={machine.id}
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => router.push({ pathname: '/(farmer)/rent-in/request', params: { id: machine.id } })}
                    >
                        {/* Image Section */}
                        <View style={styles.cardImageContainer}>
                            <Image source={{ uri: machine.image }} style={styles.cardImage} />
                            <View style={styles.badgeLabel}>
                                <Text style={styles.badgeText}>{machine.type}</Text>
                            </View>
                            <TouchableOpacity style={styles.favBtn}>
                                <MaterialIcons name="favorite-border" size={20} color="#fff" />
                            </TouchableOpacity>
                            <View style={styles.distanceBadge}>
                                <MaterialIcons name="near-me" size={16} color={COLORS.brand.primary} />
                                <Text style={styles.distanceText}>{machine.distance}</Text>
                            </View>
                        </View>

                        {/* Content Section */}
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.machineName}>{machine.name}</Text>
                                    <View style={styles.ownerRow}>
                                        <MaterialIcons name="person" size={14} color="#9ca3af" />
                                        <Text style={styles.ownerText}>{machine.owner} • {machine.location}</Text>
                                    </View>
                                </View>
                                <View style={styles.ratingBadge}>
                                    <MaterialIcons name="star" size={16} color="#f59e0b" />
                                    <Text style={styles.ratingText}>{machine.rating}</Text>
                                </View>
                            </View>

                            <View style={styles.metaRow}>
                                <View style={styles.metaBadgeGreen}>
                                    <MaterialIcons name="calendar-today" size={16} color="#16a34a" />
                                    <Text style={styles.metaTextGreen}>{machine.availability}</Text>
                                </View>
                                <View style={styles.metaBadgeGray}>
                                    <MaterialIcons name="hourglass-bottom" size={16} color="#9ca3af" />
                                    <Text style={styles.metaTextGray}>{machine.minDuration}</Text>
                                </View>
                            </View>

                            <View style={styles.footerRow}>
                                <View>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.priceMain}>${machine.pricePerHour}</Text>
                                        <Text style={styles.priceSub}>/ hour</Text>
                                    </View>
                                    {machine.pricePerDay && (
                                        <Text style={styles.priceAlt}>or ${machine.pricePerDay} / day</Text>
                                    )}
                                    {machine.addons.length > 0 && (
                                        <Text style={styles.priceAlt}>{machine.addons[0]}</Text>
                                    )}
                                </View>
                                <TouchableOpacity style={styles.bookBtn}>
                                    <MaterialIcons name="call" size={18} color="#000" />
                                    <Text style={styles.bookBtnText}>Book</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Bottom Nav Simulation (Optional, assuming standard tabs are present) */}
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
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
        paddingHorizontal: 16,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent', // Can animate this if needed
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
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
        fontWeight: '500',
        color: '#6b7280',
    },
    notifBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'transparent', // hover effect simulation tricky in rn without pressable state
    },
    notifDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.brand.primary,
        borderWidth: 2,
        borderColor: '#fff',
    },
    searchRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    filterBtn: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },

    // Categories
    categoriesContainer: {
        backgroundColor: COLORS.background, // Match bg to blend
        paddingVertical: 12,
        zIndex: 10,
    },
    categoriesContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        borderWidth: 1,
    },
    categoryActive: {
        backgroundColor: COLORS.brand.primary,
        borderColor: COLORS.brand.primary,
        shadowColor: COLORS.brand.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryInactive: {
        backgroundColor: '#fff',
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: '#000',
    },
    categoryTextInactive: {
        color: '#4b5563',
    },

    // List
    listContent: {
        paddingHorizontal: 16,
        gap: 20,
    },
    sortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -4,
    },
    sortText: {
        fontSize: 12,
        color: '#6b7280',
    },
    sortBold: {
        color: '#374151',
        fontWeight: '700',
    },

    // Card
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardImageContainer: {
        height: 200,
        backgroundColor: '#e5e7eb',
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgeLabel: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#1e293b',
    },
    favBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
    },
    distanceBadge: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    distanceText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },

    // Card Content
    cardContent: {
        padding: 16,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    machineName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    ownerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    ownerText: {
        fontSize: 12,
        color: '#4b5563',
        fontWeight: '500',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#fffbeb', // amber-50
        borderWidth: 1,
        borderColor: '#fef3c7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#b45309', // amber-700
    },

    metaRow: {
        flexDirection: 'row',
        gap: 8,
    },
    metaBadgeGreen: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#f0fdf4', // green-50
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
    },
    metaTextGreen: {
        fontSize: 12,
        fontWeight: '500',
        color: '#334155',
    },
    metaBadgeGray: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#f9fafb', // gray-50
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
    },
    metaTextGray: {
        fontSize: 12,
        fontWeight: '500',
        color: '#334155',
    },

    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    priceMain: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    priceSub: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
    },
    priceAlt: {
        fontSize: 10,
        color: '#64748b',
    },
    bookBtn: {
        backgroundColor: COLORS.brand.primary,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        shadowColor: '#bbf7d0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    bookBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
});
