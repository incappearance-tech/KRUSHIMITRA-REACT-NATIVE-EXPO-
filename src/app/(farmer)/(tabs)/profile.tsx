import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../../../constants/colors";
import { useLanguage } from "../../../context/LanguageContext";

/**
 * PROFILE TAB - Enhanced Design
 * Identity verification, settings, wallet, and support.
 */

const user = {
    name: "Suresh Patil",
    role: "Farmer",
    farmerId: "****4321",
    profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuASIiOZT_VVAtYP7KlgyW2mTWDQA9n2XQlwMU3pyDqQnGi1f5Yj9XlRDleIzOPz_05DQCISg5BbtrY1ncNrjXCkfYXtTeH9fJoASy7b-1e2flTkvyn_jg3p6BnTmZTzOp5cxmdMXRFDox6QhtNXHXZ7Do8Re50q8DWxfbOBjTYRxiMJ4z0EQcXXJmdDv4hHVCwatlTKDcXLLoPePoNyRn4P31TAUdtQJ7KT1EjCQJo-lSxcKF42ugo6HWiFKv4S5VfijcQSptO1VTop",
    kycDate: "12 Oct 2023",
    profileCompleteness: 85,
    walletBalance: "₹2,450",
};

const LANGUAGE_NAMES: Record<string, string> = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी',
};

export default function ProfileTab() {
    const { t } = useTranslation();
    const router = useRouter();
    const { currentLanguage } = useLanguage();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('navigation.profile')}</Text>
            </View> 

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: user.profileImage }} style={styles.avatar} />
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                    <Text style={styles.farmerId}>Farmer ID: {user.farmerId}</Text>
                </View>

                {/* Section Header */}
                <Text style={styles.sectionTitle}>Account Settings</Text>

                {/* Menu Items */}
                <View style={styles.menuList}>
                    <MenuItem icon="person-outline" label="Edit Profile" onPress={() => router.push('/(farmer)/profile')} />
                    <MenuItem icon="inventory-2" label="My Listings / Jobs" onPress={() => { }} />
                    <MenuItem icon="history" label="Transaction History" onPress={() => { }} />
                    <MenuItem
                        icon="language"
                        label="Language Settings"
                        rightText={LANGUAGE_NAMES[currentLanguage]}
                        onPress={() => router.push('/(farmer)/language-settings')}
                    />
                    <MenuItem icon="help-center" label="Help & Support" onPress={() => { }} />
                </View>

                {/* Logout Button */}
                <Pressable style={styles.logoutBtn}>
                    <MaterialIcons name="logout" size={20} color={COLORS.danger} />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerVersion}>KrushiMitra App v2.4.1</Text>
                    <Text style={styles.footerTagline}>Made with ❤️ for Indian Agriculture</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const MenuItem = ({ icon, label, rightText, onPress }: any) => (
    <Pressable
        style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed
        ]}
        onPress={onPress}
    >
        <View style={styles.menuLeft}>
            <MaterialIcons name={icon} size={22} color={COLORS.brand.primary} />
            <Text style={styles.menuLabel}>{label}</Text>
        </View>
        <View style={styles.menuRight}>
            {rightText && <Text style={styles.menuRightText}>{rightText}</Text>}
            <MaterialIcons name="chevron-right" size={20} color={COLORS.gray[400]} />
        </View>
    </Pressable>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { paddingBottom: 30 },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: COLORS.background,
    },
    backBtn: { width: 48, height: 48, justifyContent: 'center' },
    headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, flex: 1, textAlign: 'center' },
    settingsBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'flex-end' },

    // Profile Header
    profileHeader: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 },
    avatarContainer: {
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 4,
        borderColor: COLORS.brand.primary,
        padding: 4,
        backgroundColor: COLORS.background,
        marginBottom: 16,
    },
    avatar: { width: '100%', height: '100%', borderRadius: 60 },
    userName: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
    userRole: { fontSize: 16, fontWeight: '600', color: COLORS.brand.primary, marginBottom: 2 },
    farmerId: { fontSize: 13, color: COLORS.textSecondary },

    // Verification Card
    verificationCard: {
        marginHorizontal: 16,
        marginBottom: 24,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    verificationHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    verificationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.brand.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
    verifiedSubtitle: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
    divider: { height: 1, backgroundColor: COLORS.gray[100], marginBottom: 16 },

    // Progress
    progressSection: { gap: 8 },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    progressLabel: { fontSize: 13, fontWeight: '500', color: COLORS.text },
    progressValue: { fontSize: 13, fontWeight: '800', color: COLORS.text },
    progressBarBg: { height: 8, backgroundColor: COLORS.brand.muted, borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: COLORS.brand.primary, borderRadius: 4 },
    progressHint: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    progressHintText: { fontSize: 11, fontWeight: '500', color: COLORS.brand.primary },

    // Section
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 8,
    },

    // Menu
    menuList: { paddingHorizontal: 16, gap: 8 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    menuItemPressed: { backgroundColor: COLORS.gray[50] },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    menuLabel: { fontSize: 15, fontWeight: '600', color: COLORS.text },
    menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    menuRightText: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 24,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    logoutText: { fontSize: 16, fontWeight: '700', color: COLORS.danger },

    // Footer
    footer: { alignItems: 'center', paddingVertical: 16, gap: 4 },
    footerVersion: { fontSize: 11, fontWeight: '500', color: COLORS.gray[400] },
    footerTagline: { fontSize: 10, color: COLORS.gray[300] },
});
