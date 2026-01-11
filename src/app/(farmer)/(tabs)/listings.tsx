import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../../../constants/colors";

/**
 * LISTINGS TAB - OWNER MODE
 * Manage machine sales and rentals.
 */
export default function ListingsTab() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('dashboard.my_ads')}</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* STATUS CARD */}
                <View style={styles.mainCard}>
                    <View style={styles.overviewRow}>
                        <View style={styles.overviewItem}>
                            <Text style={styles.overviewLabel}>{t('dashboard.my_listings')}</Text>
                            <View style={styles.valueRow}>
                                <Text style={styles.overviewValue}>12</Text>
                                <View style={styles.badgeGreen}>
                                    <Text style={styles.badgeText}>{t('dashboard.active')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.overviewItem}>
                            <Text style={styles.overviewLabel}>{t('dashboard.machines_listed')}</Text>
                            <Text style={styles.overviewValue}>2</Text>
                        </View>
                    </View>
                </View>

                {/* ACTIVE SELLING REQUESTS */}
                <Text style={styles.sectionTitle}>{t('dashboard.active_requests').toUpperCase()}</Text>

                <RequestItem
                    color={COLORS.success}
                    icon="check-circle"
                    title="Your tractor listing is live"
                    subtitle="Visible to farmers within 50km"
                />
                <RequestItem
                    color={COLORS.info}
                    icon="group"
                    title="2 farmers requested rotavator"
                    subtitle="Review requests to confirm"
                    count="2"
                />

                {/* SUMMARY BOXES */}
                <Text style={[styles.sectionTitle, { marginTop: 12 }]}>{t('dashboard.summary').toUpperCase()}</Text>
                <View style={styles.summaryGrid}>
                    <SummaryBox label={t('dashboard.rented_out')} value="1" highlight />
                    <SummaryBox label={t('dashboard.machines_listed')} value="2" />
                </View>

                {/* EMPTY STATE (MOCK) */}
                {/* If no listings, show this: */}
                {/* 
                <View style={styles.emptyState}>
                    <MaterialIcons name="campaign" size={64} color={COLORS.gray[200]} />
                    <Text style={styles.emptyText}>{t('dashboard.no_listings_yet') || 'No active listings'}</Text>
                </View> 
                */}
            </ScrollView>
        </View>
    );
}

const RequestItem = ({ icon, title, subtitle, color, count }: any) => (
    <View style={[styles.requestCard, { borderLeftColor: color }]}>
        <MaterialIcons name={icon} size={22} color={color} />
        <View style={{ flex: 1 }}>
            <Text style={styles.reqTitle}>{title}</Text>
            <Text style={styles.reqSub}>{subtitle}</Text>
        </View>
        {count && (
            <View style={styles.countBadge}>
                <Text style={styles.countText}>{count}</Text>
            </View>
        )}
    </View>
);

const SummaryBox = ({ label, value, highlight }: any) => (
    <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>{label.toUpperCase()}</Text>
        <Text style={[styles.summaryValue, highlight && styles.highlightText]}>
            {value}
        </Text>
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

    mainCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        marginTop: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    overviewRow: { flexDirection: 'row', alignItems: 'center' },
    overviewItem: { flex: 1 },
    overviewLabel: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
    valueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    overviewValue: { fontSize: 28, fontWeight: '800', color: COLORS.text },
    badgeGreen: { backgroundColor: COLORS.successLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    badgeText: { fontSize: 11, fontWeight: '800', color: COLORS.success },
    divider: { width: 1, height: 40, backgroundColor: COLORS.gray[100], marginHorizontal: 20 },

    sectionTitle: { fontSize: 12, fontWeight: "800", color: COLORS.gray[400], letterSpacing: 1, marginBottom: 12 },

    requestCard: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: COLORS.white,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        alignItems: 'center',
    },
    reqTitle: { fontWeight: "700", color: COLORS.text, fontSize: 15 },
    reqSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    countBadge: { backgroundColor: COLORS.danger, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
    countText: { color: COLORS.white, fontSize: 11, fontWeight: "800" },

    summaryGrid: { flexDirection: "row", gap: 12, marginTop: 4 },
    summaryBox: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    summaryLabel: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '700' },
    summaryValue: { fontSize: 22, fontWeight: "800", marginTop: 4 },
    highlightText: { color: COLORS.brand.primary },
});
