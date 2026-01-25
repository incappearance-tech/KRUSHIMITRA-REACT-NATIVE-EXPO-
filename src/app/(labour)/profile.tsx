import BackButton from '@/src/components/BackButton';
import { COLORS } from '@/src/constants/colors';
import { useLabourStore } from '@/src/store/labour.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LabourProfile() {
    const router = useRouter();
    const { profile } = useLabourStore();

    React.useEffect(() => {
        if (!profile) {
            router.replace('/(labour)/register');
        }
    }, [profile]);

    if (!profile) return null;

    const menuItems = [
        {
            icon: 'person',
            title: 'Edit Profile',
            subtitle: 'Update details & skills',
            action: () => router.push('/(labour)/edit'),
        },
        {
            icon: 'history',
            title: 'Work History',
            subtitle: 'View your completed jobs',
            action: () => Alert.alert('Work History', 'No jobs completed yet.'),
        },
        {
            icon: 'language',
            title: 'Language Settings',
            subtitle: 'Change app language',
            action: () => router.push('/(auth)/language'),
        },
        {
            icon: 'help-outline',
            title: 'Help & Support',
            subtitle: 'Contact us for help',
            action: () => Alert.alert('Support', 'Call us at: +91 1800-123-456'),
        },
        {
            icon: 'logout',
            title: 'Logout',
            subtitle: 'Sign out of your account',
            action: () => {
                Alert.alert('Logout', 'Are you sure?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Logout', style: 'destructive', onPress: () => router.replace('/') },
                ]);
            },
            destructive: true,
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.headerTitle}>My Account</Text>
                    <TouchableOpacity onPress={() => router.push('/(labour)/edit')}>
                        <MaterialIcons name="edit" size={24} color={COLORS.brand.primary} />
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtbS_uvvRIPfkAPYsl7xYrbH0IpXVSbUO1I3BktIYTSKAh8fz-F71mFhwlwZXT9Y9ERSEcwbcYL-clZYBVAOAD2fOSIIAeHbdDJ3f_13eQ_t3vhp20lk27OB3-CJ_XueC0W5Kv6FLpUWP_pbfRL6UzX4htFygc6hiG9nyVySPasYaofS7wcikpdkIBbgWjBfytu6MT96DND1onCXYVh9bJ0L_bD70WzcmtMUzE2KKABsmG19F93cZlDUWdY8OvPltgZIdU4j2KULg' }}
                            style={styles.avatar}
                        />
                        {profile.verified && (
                            <View style={styles.verifiedBadge}>
                                <MaterialIcons name="verified" size={16} color="#fff" />
                            </View>
                        )}
                    </View>
                    <Text style={styles.name}>{profile.name}</Text>
                    <View style={styles.metaRow}>
                        <MaterialIcons name="location-on" size={16} color="#6b7280" />
                        <Text style={styles.metaText}>{profile.location}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                        <MaterialIcons name="star" size={18} color="#eab308" />
                        <Text style={styles.ratingText}>{profile.rating} Rating</Text>
                    </View>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>{profile.jobsCompleted}</Text>
                        <Text style={styles.statLab}>Jobs</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>₹{profile.pricePerDay}</Text>
                        <Text style={styles.statLab}>Daily Rate</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>{profile.experience || 'New'}</Text>
                        <Text style={styles.statLab}>Exp.</Text>
                    </View>
                </View>

                {/* Specialist Types */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Working As</Text>
                    <View style={styles.chipRow}>
                        {profile.labourTypes.map((t) => (
                            <View key={t} style={styles.chip}>
                                <Text style={styles.chipText}>{t}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.prefBox}>
                        <MaterialIcons name="event" size={18} color={COLORS.brand.primary} />
                        <Text style={styles.prefText}>Preference: {profile.workPreference}</Text>
                    </View>
                </View>

                {/* Settings Menu */}
                <View style={styles.menuSection}>
                    {menuItems.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.menuItem} onPress={item.action}>
                            <View style={[styles.menuIcon, item.destructive && { backgroundColor: '#fee2e2' }]}>
                                <MaterialIcons name={item.icon as any} size={22} color={item.destructive ? '#dc2626' : COLORS.brand.primary} />
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={[styles.menuTitle, item.destructive && { color: '#dc2626' }]}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#d1d5db" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    profileCard: { alignItems: 'center', paddingVertical: 20 },
    avatarContainer: { position: 'relative', marginBottom: 12 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e5e7eb' },
    verifiedBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.brand.primary, padding: 4, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
    name: { fontSize: 22, fontWeight: '800', color: COLORS.text },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    metaText: { fontSize: 14, color: '#6b7280' },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
    ratingText: { fontSize: 15, fontWeight: '600', color: '#4b5563' },
    statsRow: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', elevation: 2 },
    statBox: { flex: 1, alignItems: 'center' },
    statVal: { fontSize: 18, fontWeight: '800', color: COLORS.text },
    statLab: { fontSize: 11, color: '#9ca3af', marginTop: 2, textTransform: 'uppercase' },
    section: { padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { backgroundColor: COLORS.brand.muted, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1, borderColor: COLORS.brand.primary },
    chipText: { fontSize: 13, color: COLORS.brand.primary, fontWeight: '600' },
    prefBox: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, backgroundColor: '#f9fafb', padding: 12, borderRadius: 12 },
    prefText: { fontSize: 14, color: '#4b5563', fontWeight: '500' },
    menuSection: { paddingHorizontal: 20 },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6' },
    menuIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.brand.muted, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    menuContent: { flex: 1 },
    menuTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
    menuSubtitle: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
});
