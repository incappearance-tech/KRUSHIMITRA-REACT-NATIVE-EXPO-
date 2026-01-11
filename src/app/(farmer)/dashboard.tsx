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
import { COLORS } from "../../constants/colors";

/* ================= DATA ================= */

const user = {
  name: "Rajesh Kumar",
  location: "Village Rampur, Dist. Lucknow",
  farmerId: "XXXX-8921",
  trustScore: 85,
  profileImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoI1aexhIhVEdTBySd1Eh6_onePyb5eegkRmSHmmwVhsbN6BPl4xi2PRDz0oUbUPg03xu2EtiBIOL1U5ayQZe82uSJ0o4DlGVTfvBCsK8XqQ7a-MhBNB9r4PfP9Phl5n6-3-dbPyN0chEN2AW3R3Qa0tP_rKFtlPr7R0VXQJSXejYzDCaLOZksBncFh9HBAL_O9avRUyVNI78t5TaGOL3DsA_y78j6CTBrag9TnzqHIED4ZFiltfc6QG4s6J6yeK5Ok6okJ2tFw8Wv",
};

/* ================= SCREEN ================= */

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useRouter();

  const actions = [
    { title: t('farmer.sell_machine'), subtitle: t('dashboard.quick_actions_sub'), icon: "sell", link: "/(farmer)/sell-machine/add-details" },
    { title: t('farmer.buy_machine'), subtitle: t('dashboard.quick_actions_sub'), icon: "shopping-cart", link: "/(farmer)/buy-machine/list" },
    { title: t('farmer.rent_out'), subtitle: t('dashboard.quick_actions_sub'), icon: "output", link: "" },
    { title: t('farmer.rent_in'), subtitle: t('dashboard.quick_actions_sub'), icon: "schedule", link: "" },
    { title: t('farmer.labour'), subtitle: t('dashboard.quick_actions_sub'), icon: "engineering", link: "" },
    { title: t('farmer.transport'), subtitle: t('dashboard.quick_actions_sub'), icon: "local-shipping", link: "" },
  ];
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="agriculture" size={22} color={COLORS.success} />
          <Text style={styles.headerTitle}>KrushiMitra</Text>
        </View>
        <View>
          <MaterialIcons name="notifications" size={22} />
          <View style={styles.notificationDot} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}
      >
        {/* PROFILE */}
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

        <SectionTitle title={t('dashboard.overview')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <OverviewCard icon="list-alt" label={t('dashboard.my_listings')} value="12" badge={t('dashboard.active')} badgeStyle={styles.badgeGreen} />
          <OverviewCard icon="pending-actions" label={t('dashboard.rent_requests')} value="5" badge={t('dashboard.pending')} badgeStyle={styles.badgeOrange} />
          <OverviewCard icon="perm-contact-calendar" label={t('dashboard.contacts_used')} value="24" subText={t('dashboard.total')} />
        </ScrollView>

        {/* QUICK ACTIONS */}
        <View style={styles.quickHeader}>
          <Text style={styles.title}>{t('dashboard.quick_actions')}</Text>
          <Text style={styles.subtitle}>{t('dashboard.quick_actions_sub')}</Text>
        </View>

        <View style={styles.gridAction}>
          {actions.map((action, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.cardAction,
                pressed && styles.cardPressed,
              ]}
              onPress={() => action.link && router.push(action.link)}
            >
              <View style={styles.iconWrap}>
                <MaterialIcons name={action.icon as any} size={24} color={COLORS.brand.primary} />
              </View>

              <View>
                <Text style={styles.cardTitle}>{action.title}</Text>
                <Text style={styles.cardSubtitle}>{action.subtitle}</Text>
              </View>

              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={COLORS.gray[400]}
                style={styles.arrow}
              />
            </Pressable>
          ))}
        </View>

        {/* ACTIVE REQUESTS */}
        <SectionRow title={t('dashboard.active_requests')} action={t('dashboard.view_all')}>
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
          <RequestItem
            color={COLORS.warning}
            icon="pending"
            title="Transport enquiry pending"
            subtitle="Waiting for response from driver"
          />
        </SectionRow>

        {/* SUMMARY */}
        <Section title={t('dashboard.summary')}>
          <View style={styles.summaryGrid}>
            <SummaryBox label={t('dashboard.machines_listed')} value="2" />
            <SummaryBox label={t('dashboard.rented_out')} value="1" highlight />
            <SummaryBox label={t('dashboard.taken_on_rent')} value="1" />
            <SummaryBox label={t('dashboard.labour_req')} value="3" />
            <SummaryBox label={t('dashboard.transport_searches')} value="2" wide />
          </View>
        </Section>

        {/* ALERTS */}
        <Section title={t('dashboard.alerts')}>
          <AlertItem
            icon="warning"
            color={COLORS.danger}
            title={t('dashboard.profile_incomplete')}
            text={t('dashboard.profile_incomplete_desc')}
            action={t('dashboard.add')}
            danger
          />
          <AlertItem
            icon="schedule"
            color={COLORS.warning}
            title={t('dashboard.expiring_soon')}
            text={t('dashboard.expiring_soon_desc')}
            action={t('dashboard.renew')}
          />
          <AlertItem
            icon="visibility"
            color={COLORS.info}
            title={t('dashboard.performance')}
            text={`15 ${t('dashboard.performance_desc')}`}
          />
        </Section>

        {/* SUPPORT */}
        <Section title={t('dashboard.support_settings')}>
          <SupportItem icon="support-agent" label={t('dashboard.call_support')} />
          <SupportItem icon="play-circle" label={t('dashboard.how_it_works')} />
          <SupportItem icon="translate" label={t('dashboard.change_language')} right={t('language.english')} />
          <SupportItem icon="logout" label={t('common.logout')} />
        </Section>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label={t('navigation.home')} active />
        <NavItem icon="campaign" label={t('dashboard.my_ads')} />
        <NavItem icon="receipt-long" label={t('dashboard.orders')} />
        <NavItem icon="account-circle" label={t('navigation.profile')} />
      </View>
    </View>
  );
}

/* ================= COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    {children}
  </View>
);

const SectionRow = ({ title, action, children }: any) => (
  <View style={{ marginTop: 20 }}>
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <Text style={styles.link}>{action}</Text>
    </View>
    {children}
  </View>
);

const SectionTitle = ({ title }: any) => (
  <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
);

const OverviewCard = ({ icon, label, value, badge, badgeStyle, subText }: any) => (
  <View style={styles.overviewCard}>
    <MaterialIcons name={icon} size={20} color={COLORS.brand.primary} />
    <Text style={styles.overviewLabel}>{label}</Text>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Text style={styles.overviewValue}>{value}</Text>
      {badge && (
        <View style={[styles.badge, badgeStyle]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      {subText && <Text style={styles.subText}>{subText}</Text>}
    </View>
  </View>
);

const RequestItem = ({ icon, title, subtitle, color, count }: any) => (
  <View style={[styles.requestCard, { borderLeftColor: color }]}>
    <MaterialIcons name={icon} size={20} color={color} />
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

const SummaryBox = ({ label, value, highlight, wide }: any) => (
  <View style={[styles.summaryBox, wide && { flex: 1 }]}>
    <Text style={styles.summaryLabel}>{label.toUpperCase()}</Text>
    <Text style={[styles.summaryValue, highlight && styles.trustScore]}>
      {value}
    </Text>
  </View>
);

const AlertItem = ({ icon, title, text, action, color, danger }: any) => (
  <View style={[styles.alertRow, danger && styles.alertDanger]}>
    <MaterialIcons name={icon} size={18} color={color} />
    <View style={{ flex: 1 }}>
      <Text style={[styles.alertTitle, { color }]}>{title}</Text>
      <Text style={styles.alertText}>{text}</Text>
    </View>
    {action && (
      <View style={styles.alertBtn}>
        <Text style={styles.alertBtnText}>{action}</Text>
      </View>
    )}
  </View>
);

const SupportItem = ({ icon, label, right }: any) => (
  <View style={styles.supportItem}>
    <MaterialIcons name={icon} size={20} color={COLORS.success} />
    <Text style={styles.supportText}>{label}</Text>
    {right && <Text style={styles.supportRight}>{right}</Text>}
    <MaterialIcons name="chevron-right" size={20} color={COLORS.textLight} />
  </View>
);

const NavItem = ({ icon, label, active }: any) => (
  <View style={styles.navItem}>
    <MaterialIcons
      name={icon}
      size={24}
      color={active ? COLORS.success : COLORS.textSecondary}
    />
    <Text style={[styles.navText, active && styles.navActive]}>{label}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: { flexDirection: "row", gap: 8, alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },

  card: {
    backgroundColor: COLORS.white,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
  },

  profileRow: { flexDirection: "row", gap: 12 },
  avatarWrap: { position: "relative" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  verifiedIcon: {
    position: "absolute",
    bottom: 28,
    right: -2,
    backgroundColor: COLORS.brand.primary,
    padding: 4,
    borderRadius: 10,
  },

  nameRow: { flexDirection: "row", gap: 6 },
  name: { fontSize: 16, fontWeight: "700" },

  verifiedBadge: {
    backgroundColor: COLORS.brand.muted,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedText: { fontSize: 10, fontWeight: "700", color: COLORS.brand.primary },

  locationRow: { flexDirection: "row", gap: 4 },
  location: { fontSize: 12, color: COLORS.textSecondary },

  infoRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray[100],
    padding: 8,
    borderRadius: 10,
  },
  infoLabel: { fontSize: 10, color: COLORS.textSecondary },
  infoMono: { fontFamily: "monospace", fontSize: 12 },
  trustScore: { color: COLORS.brand.primary, fontWeight: "700" },
  divider: { width: 1, backgroundColor: COLORS.borderFocus },

  sectionTitle: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: { fontSize: 12, color: COLORS.success, fontWeight: "600" },

  overviewCard: {
    width: 150,
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginRight: 8
  },
  overviewLabel: { fontSize: 12, color: COLORS.textSecondary },
  overviewValue: { fontSize: 22, fontWeight: "700" },
  subText: { fontSize: 10, color: COLORS.textSecondary },

  quickHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#111812" },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },

  gridAction: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingTop: 8,
  },
  cardAction: {
    width: "48%",
    height: 140,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    justifyContent: "space-between",
  },
  cardPressed: { transform: [{ scale: 0.97 }] },

  iconWrap: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.brand.muted,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111812" },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  arrow: { position: "absolute", top: 16, right: 16 },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: COLORS.gray[100],
  },
  badgeText: { fontSize: 10, fontWeight: "700" },
  badgeGreen: { backgroundColor: COLORS.successLight },
  badgeOrange: { backgroundColor: COLORS.warningLight },

  requestCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.white,
    // marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  reqTitle: { fontWeight: "700" },
  reqSub: { fontSize: 12, color: COLORS.textSecondary },

  countBadge: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  countText: { color: COLORS.white, fontSize: 10, fontWeight: "700" },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  summaryBox: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  summaryLabel: { fontSize: 10, color: COLORS.textSecondary },
  summaryValue: { fontSize: 18, fontWeight: "700" },

  alertRow: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  alertDanger: { backgroundColor: COLORS.dangerLight },
  alertTitle: { fontSize: 10, fontWeight: "700" },
  alertText: { fontSize: 12 },

  alertBtn: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  alertBtnText: { fontSize: 10, fontWeight: "700" },

  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  supportText: { flex: 1, fontWeight: "600" },
  supportRight: { fontSize: 12, color: COLORS.textSecondary },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, color: COLORS.textSecondary },
  navActive: { color: COLORS.success, fontWeight: "700" },
});
