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
 * ORDERS TAB - SEEKER MODE
 * Track buying, renting, and service requests.
 */
export default function OrdersTab() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('dashboard.orders')}</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* OVERVIEW CARDS */}
                <View style={styles.statRow}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconWrap}>
                            <MaterialIcons name="pending-actions" size={20} color={COLORS.warning} />
                        </View>
                        <Text style={styles.statLabel}>{t('dashboard.rent_requests')}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.statValue}>5</Text>
                            <View style={styles.badgeOrange}>
                                <Text style={styles.badgeText}>{t('dashboard.pending')}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconWrap}>
                            <MaterialIcons name="perm-contact-calendar" size={20} color={COLORS.info} />
                        </View>
                        <Text style={styles.statLabel}>{t('dashboard.contacts_used')}</Text>
                        <Text style={styles.statValue}>24</Text>
                        <Text style={styles.statSubText}>{t('dashboard.total')}</Text>
                    </View>
                </View>

                {/* SEEKER REQUESTS */}
                <Text style={styles.sectionTitle}>{t('dashboard.active_requests').toUpperCase()}</Text>

                <RequestItem
                    color={COLORS.warning}
                    icon="pending"
                    title="Transport enquiry pending"
                    subtitle="Waiting for response from driver"
                />

                {/* SUMMARY GRID */}
                <Text style={[styles.sectionTitle, { marginTop: 12 }]}>{t('dashboard.summary').toUpperCase()}</Text>
                <View style={styles.summaryGrid}>
                    <SummaryBox label={t('dashboard.taken_on_rent')} value="1" />
                    <SummaryBox label={t('dashboard.labour_req')} value="3" />
                    <SummaryBox label={t('dashboard.transport_searches')} value="2" wide />
                </View>

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

const SummaryBox = ({ label, value, wide }: any) => (
    <View style={[styles.summaryBox, wide && { width: '100%' }]}>
        <Text style={styles.summaryLabel}>{label.toUpperCase()}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
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

    statRow: { flexDirection: 'row', gap: 12, marginBottom: 24, marginTop: 8 },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    statIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.gray[50],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },
    statValue: { fontSize: 24, fontWeight: '800', color: COLORS.text },
    statSubText: { fontSize: 10, color: COLORS.textLight, marginTop: 2 },
    badgeOrange: { backgroundColor: COLORS.warningLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    badgeText: { fontSize: 9, fontWeight: '800', color: COLORS.warning },

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

    summaryGrid: { flexDirection: "row", flexWrap: 'wrap', gap: 12, marginTop: 4 },
    summaryBox: {
        width: "48%",
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    summaryLabel: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '700' },
    summaryValue: { fontSize: 22, fontWeight: "800", marginTop: 4 },
});
