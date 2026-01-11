import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { COLORS } from "../../../constants/colors";

/**
 * PROFILE TAB
 * Identity, verification, support and settings.
 */

const user = {
    name: "Rajesh Kumar",
    location: "Village Rampur, Dist. Lucknow",
    farmerId: "XXXX-8921",
    trustScore: 85,
    profileImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBoI1aexhIhVEdTBySd1Eh6_onePyb5eegkRmSHmmwVhsbN6BPl4xi2PRDz0oUbUPg03xu2EtiBIOL1U5ayQZe82uSJ0o4DlGVTfvBCsK8XqQ7a-MhBNB9r4PfP9Phl5n6-3-dbPyN0chEN2AW3R3Qa0tP_rKFtlPr7R0VXQJSXejYzDCaLOZksBncFh9HBAL_O9avRUyVNI78t5TaGOL3DsA_y78j6CTBrag9TnzqHIED4ZFiltfc6QG4s6J6yeK5Ok6okJ2tFw8Wv",
};

export default function ProfileTab() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('navigation.profile')}</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* PROFILE CARD */}
                <View style={styles.card}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatarWrap}>
                            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
                            <View style={styles.verifiedIcon}>
                                <MaterialIcons name="check" size={12} color={COLORS.white} />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.nameRow}>
                                <Text style={styles.name}>{user.name}</Text>
                                <View style={styles.verifiedBadge}>
                                    <Text style={styles.verifiedText}>{t('dashboard.verified')}</Text>
                                </View>
                            </View>

                            <View style={styles.locationRow}>
                                <MaterialIcons name="location-on" size={14} color={COLORS.textSecondary} />
                                <Text style={styles.location}>{user.location}</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.infoLabel}>{t('dashboard.farmer_id')}</Text>
                                    <Text style={styles.infoMono}>{user.farmerId}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={styles.infoLabel}>{t('dashboard.trust_score')}</Text>
                                    <Text style={styles.trustScore}>{user.trustScore}% {t('dashboard.complete')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* SUPPORT & SETTINGS */}
                <Text style={styles.sectionTitle}>{t('dashboard.support_settings').toUpperCase()}</Text>

                <SupportItem icon="support-agent" label={t('dashboard.call_support')} />
                <SupportItem icon="play-circle" label={t('dashboard.how_it_works')} />
                <SupportItem icon="translate" label={t('dashboard.change_language')} right={t('language.english')} />

                <View style={{ marginTop: 24 }}>
                    <SupportItem icon="logout" label={t('common.logout')} color={COLORS.danger} />
                </View>
            </ScrollView>
        </View>
    );
}

const SupportItem = ({ icon, label, right, color = COLORS.success }: any) => (
    <View style={styles.supportItem}>
        <View style={[styles.supportIconWrap, { backgroundColor: color + '10' }]}>
            <MaterialIcons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.supportText, color === COLORS.danger && { color: COLORS.danger }]}>{label}</Text>
        {right && <Text style={styles.supportRight}>{right}</Text>}
        <MaterialIcons name="chevron-right" size={20} color={COLORS.gray[300]} />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { padding: 16, paddingBottom: 40 },

    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: COLORS.background,
    },
    headerTitle: { fontSize: 24, fontWeight: "800", color: COLORS.text },

    card: {
        backgroundColor: COLORS.white,
        marginVertical: 16,
        padding: 20,
        borderRadius: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    profileRow: { flexDirection: "row", gap: 16, alignItems: 'center' },
    avatarWrap: { position: "relative" },
    avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: COLORS.brand.muted },
    verifiedIcon: {
        position: "absolute",
        bottom: 4,
        right: 0,
        backgroundColor: COLORS.brand.primary,
        padding: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    nameRow: { flexDirection: "row", gap: 8, alignItems: 'center' },
    name: { fontSize: 20, fontWeight: "800", color: COLORS.text },
    verifiedBadge: {
        backgroundColor: COLORS.brand.muted,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    verifiedText: { fontSize: 10, fontWeight: "800", color: COLORS.brand.primary },
    locationRow: { flexDirection: "row", gap: 4, marginTop: 4 },
    location: { fontSize: 13, color: COLORS.textSecondary },
    infoRow: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.gray[50],
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    infoLabel: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '700' },
    infoMono: { fontFamily: "monospace", fontSize: 13, fontWeight: '700', color: COLORS.text, marginTop: 2 },
    trustScore: { color: COLORS.brand.primary, fontWeight: "800", fontSize: 13, marginTop: 2 },
    divider: { width: 1, backgroundColor: COLORS.gray[200] },

    sectionTitle: { fontSize: 12, fontWeight: "800", color: COLORS.gray[400], letterSpacing: 1, marginBottom: 16, marginTop: 8 },

    supportItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    supportIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    supportText: { flex: 1, fontWeight: "700", color: COLORS.text, fontSize: 15 },
    supportRight: { fontSize: 13, color: COLORS.textSecondary, marginRight: 4 },
});
