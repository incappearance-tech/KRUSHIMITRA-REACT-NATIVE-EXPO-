const ACTIONS = [
    { title: 'Sell Machine', sub: 'List used equipment', icon: 'sell' ,navigate:"/(farmer)/sell-machine/add-details"},
    { title: 'Buy Machine', sub: 'Find used equipment', icon: 'shopping-cart' },
    { title: 'Rent Out', sub: 'List for rental', icon: 'output' },
    { title: 'Take on Rent', sub: 'Find equipment for hire', icon: 'schedule' },
    { title: 'Find Labour', sub: 'Hire skilled workers', icon: 'engineering' },
    { title: 'Find Transport', sub: 'Book vehicles', icon: 'local-shipping' },
];

const LISTINGS = [
    {
        title: 'Mahindra 575 DI',
        sub: 'Rent • ₹800/hr',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-DZ-2zfLCmMDmyrmCK-LZKZRjnbJw9DJ4pKF7Thtfn6SBe02gT3B8j8dAiyS9tZbLTJ95J1hcAdKB28QcmqR-gWPGOsCjhFxlv2YljwgNbhLhnNExVq_GTchMGfkJFVeFuXGrK8IenB9UVwNn6wqTHNSkNlMatBBn9wWP2gdK_8AMaL24JbbLr2hRJIKmFVs5_cksEwIIIwWMkxujIZQiYv6-EjgRgR4p0x9iSc-Di0pQwvNj_F1ikgycPXiwYF2uHxk7nzFBZk4',
    },
    {
        title: 'Harvester',
        sub: 'Sell • ₹12,50,000',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgOfgGvrRtuE4kOnjqFaKHEbXfPnxoWmGAyUOohSs2_j-B4BqH8wjMmvVWtf-yq_-zneCeKbJVmMxXs3U6RHuhgEY9C4v9rdiN-XzFTc__In92T8szfA0ymHnVTQWioR9_Hl7j3gNPNUrO7Hfjdtl6ML-t0WGdv-zgjuuH5X9nbTOywHcUcBCnB0hm81e-oLxI_XGQJVzYi53S6-iXYvpzVtAOAxN1VCwAIyUs06i2Zeyz-kFUQ0KctHR0NtGxU_KZSDhhlsVj88Y',
    },
];

const TABS = [
    { label: 'Home', icon: 'home', active: true },
    { label: 'My Listings', icon: 'view-list' },
    { label: 'Orders', icon: 'assignment' },
    { label: 'Profile', icon: 'account-circle' },
];
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';

export default function FarmerDashboard() {
    return (
        <View style={styles.root}>
            {/* ===== HEADER ===== */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0BLK6jieq-0qGKrUjGHm9i9TUta_HpfT3fTvcPF30zYNQwWFd5ul5zcBscQob5j29TA6m4csFy0SPBH3z8MpNYAHHH2RtejW8BbV78fvYbejn8c13pDPw_YjGQ1xlDpD0smL5_AI6atviN0V4vnYd2u0tg1AmAba2bUSwHBqlKQOOtInQ5exVU2XttNLQi8QtJpQsnbC9RqfjSrBdB1sXNsa_nYss7M-yzvHOO6y3PEKZkcpgxLn1dAI0QdAkJlEY__P1E7AslQ',
                        }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.welcome}>Welcome back,</Text>
                        <Text style={styles.name}>Namaste, Kishan</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.notification}>
                    <Ionicons name="notifications-outline" size={22} />
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>

            {/* ===== CONTENT ===== */}
            <ScrollView contentContainerStyle={styles.content}>
                {/* WEATHER + PRICE */}
                <View style={styles.topCards}>
                    <View style={[styles.card, styles.weather]}>
                        <View style={styles.cardRow}>
                            <View>
                                <Text style={styles.cardLabel}>Weather</Text>
                                <Text style={styles.cardSub}>Pune, MH</Text>
                            </View>
                            <Ionicons name="sunny" size={28} color="#f97316" />
                        </View>
                        <Text style={styles.temp}>28°C</Text>
                        <Text style={styles.cardValue}>Sunny</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardRow}>
                            <View>
                                <Text style={styles.cardLabel}>Wheat Price</Text>
                                <Text style={styles.cardSub}>Mandi Live</Text>
                            </View>
                            <MaterialIcons name="trending-up" size={24} color="#22C55E" />
                        </View>
                        <Text style={styles.price}>₹2,125<Text style={styles.unit}>/qtl</Text></Text>
                        <Text style={styles.growth}>+2.5% <Text style={styles.muted}>vs yesterday</Text></Text>
                    </View>
                </View>

                {/* OVERVIEW */}
                <View style={styles.overviewSection}>
                    <Text style={styles.overviewTitle}>Overview</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* My Listings */}
                        <View style={styles.overviewCard}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 8 }}>
                                <View style={styles.iconCircleBlue}>
                                    <MaterialIcons name="list-alt" size={20} color="#2563EB" />
                                </View>

                                <Text style={styles.cardLabel}>My Listings</Text>
                            </View>
                            <View style={styles.valueRow}>
                                <Text style={styles.value}>12</Text>
                                <View style={styles.activeBadge}>
                                    <Text style={styles.activeText}>Active</Text>
                                </View>
                            </View>
                        </View>

                        {/* Rent Requests */}
                        <View style={styles.overviewCard}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 8 }}>

                                <View style={styles.iconCircleOrange}>
                                    <MaterialIcons name="pending-actions" size={20} color="#F97316" />
                                </View>

                                <Text style={styles.cardLabel}>Rent Requests</Text>
                            </View>
                            <View style={styles.valueRow}>
                                <Text style={styles.value}>5</Text>
                                <View style={styles.pendingBadge}>
                                    <Text style={styles.pendingText}>Pending</Text>
                                </View>
                            </View>
                        </View>

                        {/* Contacts Used */}
                        <View style={styles.overviewCard}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 8 }}>

                                <View style={styles.iconCirclePurple}>
                                    <MaterialIcons name="perm-contact-calendar" size={20} color="#9333EA" />
                                </View>

                                <Text style={styles.cardLabel}>Contacts Used</Text>
                            </View>
                            <View style={styles.valueRow}>
                                <Text style={styles.value}>24</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>


                {/* QUICK ACTIONS */}
                <Text style={styles.section}>Quick Actions</Text>
                <Text style={styles.sub}>Buy, sell, rent, or hire services</Text>

                <View style={styles.grid}>
                    {ACTIONS.map((a, i) => (
                        <TouchableOpacity key={i} style={styles.actionCard} onPress={() => navigate(a.navigate!)}>
                            <View style={styles.iconBox}>
                                <MaterialIcons name={a.icon} size={24} color="#15803D" />
                            </View>
                            <Text style={styles.actionTitle}>{a.title}</Text>
                            <Text style={styles.actionSub}>{a.sub}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* RECENT LISTINGS */}
                <View style={styles.rowBetween}>
                    <Text style={styles.section}>Recent Listings</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {LISTINGS.map((l, i) => (
                        <View key={i} style={styles.listing}>
                            <Image source={{ uri: l.img }} style={styles.listingImg} />
                            <Text style={styles.listingTitle}>{l.title}</Text>
                            <Text style={styles.listingSub}>{l.sub}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>

            {/* ===== BOTTOM TAB ===== */}
            <View style={styles.tabBar}>
                {TABS.map((t, i) => (
                    <View key={i} style={styles.tab}>
                        <MaterialIcons
                            name={t.icon}
                            size={24}
                            color={t.active ? '#22C55E' : '#9CA3AF'}
                        />
                        <Text style={t.active ? styles.tabActive : styles.tabText}>
                            {t.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    /* ROOT */
    root: {
        flex: 1,
        backgroundColor: '#F5F7F6',
    },

    /* HEADER */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#EEF2F0',
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },

    welcome: {
        fontSize: 12,
        color: '#6B7280',
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    notification: {
        position: 'relative',
    },

    dot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
    },

    /* CONTENT */
    content: {
        padding: 16,
        paddingBottom: 80,
    },

    /* TOP CARDS */
    topCards: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },

    card: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    weather: {
        backgroundColor: '#DFF3E3',
    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    cardLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
    },

    cardSub: {
        fontSize: 12,
        color: '#6B7280',
    },

    temp: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        marginTop: 6,
    },

    cardValue: {
        fontSize: 14,
        color: '#374151',
    },

    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },

    unit: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280',
    },

    growth: {
        fontSize: 13,
        color: '#22C55E',
        marginTop: 4,
    },

    muted: {
        color: '#6B7280',
    },

    /* SECTION HEADINGS */
    section: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginTop: 8,
        marginBottom: 10,
    },

    sub: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 14,
    },

    /* OVERVIEW */
    overviewSection: {
        marginTop: 8,
    },

    overviewTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 14,
    },

    overviewCard: {
        width: 170,
        padding: 16,
        marginRight: 12,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
    },

    iconCircleBlue: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    iconCircleOrange: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF7ED',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    iconCirclePurple: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    value: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
    },

    activeBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    activeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#16A34A',
    },

    pendingBadge: {
        backgroundColor: '#FFEDD5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    pendingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#F97316',
    },

    /* QUICK ACTIONS */
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    actionCard: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F0FDF4',
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionTitle: { fontWeight: '700', marginTop: 8 },
    actionSub: { fontSize: 12, color: '#6B7280' },


    /* RECENT LISTINGS */
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    viewAll: {
        fontSize: 13,
        color: '#22C55E',
        fontWeight: '700',
    },

    listing: {
        width: 220,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginRight: 12,
        // overflow: 'hidden',
    },

    listingImg: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    listingTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginTop: 8,
        paddingHorizontal: 10,
    },

    listingSub: {
        fontSize: 13,
        color: '#6B7280',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },

    /* BOTTOM TAB */
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 8,
    },

    tab: {
        flex: 1,
        alignItems: 'center',
    },

    tabText: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
    },

    tabActive: {
        fontSize: 11,
        color: '#22C55E',
        fontWeight: '700',
        marginTop: 2,
    },
});
