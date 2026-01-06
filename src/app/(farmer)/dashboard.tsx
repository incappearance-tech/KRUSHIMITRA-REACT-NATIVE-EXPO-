import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";

/* ================= MOCK DATA ================= */

const user = {
  name: "Rajesh Kumar",
  location: "Village Rampur, Dist. Lucknow",
  farmerId: "XXXX-8921",
  trustScore: 85,
  profileImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoI1aexhIhVEdTBySd1Eh6_onePyb5eegkRmSHmmwVhsbN6BPl4xi2PRDz0oUbUPg03xu2EtiBIOL1U5ayQZe82uSJ0o4DlGVTfvBCsK8XqQ7a-MhBNB9r4PfP9Phl5n6-3-dbPyN0chEN2AW3R3Qa0tP_rKFtlPr7R0VXQJSXejYzDCaLOZksBncFh9HBAL_O9avRUyVNI78t5TaGOL3DsA_y78j6CTBrag9TnzqHIED4ZFiltfc6QG4s6J6yeK5Ok6okJ2tFw8Wv",
};

/* ================= APP ================= */

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="agriculture" size={22} color="#16a34a" />
          <Text style={styles.headerTitle}>KisanConnect</Text>
        </View>
        <View>
          <MaterialIcons name="notifications" size={22} />
          <View style={styles.notificationDot} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* PROFILE CARD */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: user.profileImage }} style={styles.avatar} />
              <View style={styles.verifiedIcon}>
                <MaterialIcons name="check" size={12} color="#fff" />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{user.name}</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>VERIFIED</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color="#6b7280" />
                <Text style={styles.location}>{user.location}</Text>
              </View>

              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>FARMER ID</Text>
                  <Text style={styles.infoMono}>{user.farmerId}</Text>
                </View>

                <View style={styles.divider} />

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.infoLabel}>TRUST SCORE</Text>
                  <Text style={styles.trustScore}>
                    {user.trustScore}% Complete
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <Section title="Quick Actions">
          <View style={styles.grid}>
        
            <ActionCard
              icon="sell"
              title="Sell Old"
              subtitle="Machine"
              badge="2 active listings"
              badgeStyle={styles.badgeGreen}
              onPress={() => navigate("/sell-machine/add-details")}
            />
            <ActionCard
              icon="shopping-cart"
              title="Buy Old"
              subtitle="Machine"
              badge="15+ new"
              onPress={() => navigate("/buy-machine/list")}
            />
            <ActionCard
              icon="storefront"
              title="Rent Out"
              subtitle="Machine"
              badge="1 pending req"
              badgeStyle={styles.badgeOrange}
            />
            <ActionCard
              icon="agriculture"
              title="Take on"
              subtitle="Rent"
              badge="Available near"
            />
            <ActionCard
              icon="engineering"
              title="Find"
              subtitle="Labour"
              badge="1 contact open"
              badgeStyle={styles.badgeBlue}
            />
            <ActionCard
              icon="local-shipping"
              title="Find"
              subtitle="Transport"
              badge="Enquiry pending"
            />
          </View>
        </Section>

        {/* ACTIVE REQUESTS */}
        <SectionRow title="My Active Requests" action="View all">
          <RequestItem
            color="#22c55e"
            icon="check-circle"
            title="Your tractor listing is live"
            subtitle="Visible to farmers within 50km"
          />
          <RequestItem
            color="#3b82f6"
            icon="group"
            title="2 farmers requested rotavator"
            subtitle="Review requests to confirm"
            count="2"
          />
          <RequestItem
            color="#eab308"
            icon="pending"
            title="Transport enquiry pending"
            subtitle="Waiting for response from driver"
          />
        </SectionRow>

        {/* SUMMARY */}
        <Section title="Summary">
          <View style={styles.summaryGrid}>
            <SummaryBox label="Machines Listed" value="2" />
            <SummaryBox label="Rented Out" value="1" highlight />
            <SummaryBox label="Taken on Rent" value="1" />
            <SummaryBox label="Labour Req" value="3" />
            <SummaryBox label="Transport Searches" value="2" wide />
          </View>
        </Section>

        {/* ALERTS */}
        <Section title="Alerts">
          <AlertItem
            icon="warning"
            color="#ef4444"
            title="PROFILE INCOMPLETE"
            text="Please add a photo to increase trust."
            action="Add"
            danger
          />
          <AlertItem
            icon="schedule"
            color="#eab308"
            title="EXPIRING SOON"
            text='Listing "Mahindra 575" expires in 2 days.'
            action="Renew"
          />
          <AlertItem
            icon="visibility"
            color="#3b82f6"
            title="PERFORMANCE"
            text="15 people viewed your harvester today."
          />
        </Section>

        {/* SUPPORT */}
        <Section title="Support & Settings">
          <SupportItem icon="support-agent" label="Call Support" />
          <SupportItem icon="play-circle" label="How it works (Video)" />
          <SupportItem
            icon="translate"
            label="Change Language"
            right="English"
          />
          <SupportItem icon="logout" label="Logout" />
        </Section>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" active />
        <NavItem icon="campaign" label="My Ads" />
        <NavItem icon="receipt-long" label="Orders" />
        <NavItem icon="account-circle" label="Profile" />
      </View>
    </SafeAreaView>
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

const ActionCard = ({ icon, title, subtitle, badge, badgeStyle, onPress }: any) => (
  <View style={styles.actionCard} onTouchEnd={onPress}>
    <MaterialIcons name={icon} size={28} color="#16a34a" />
    <Text style={styles.actionTitle}>
      {title}{"\n"}
      {subtitle}
    </Text>
    <View style={[styles.badge, badgeStyle]}>
      <Text style={styles.badgeText}>{badge}</Text>
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
    {count ? (
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    ) : (
      <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
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
    <MaterialIcons name={icon} size={20} color="#16a34a" />
    <Text style={styles.supportText}>{label}</Text>
    {right && <Text style={styles.supportRight}>{right}</Text>}
    <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
  </View>
);

const NavItem = ({ icon, label, active }: any) => (
  <View style={styles.navItem}>
    <MaterialIcons
      name={icon}
      size={24}
      color={active ? "#16a34a" : "#6b7280"}
    />
    <Text style={[styles.navText, active && styles.navActive]}>
      {label}
    </Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f6" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
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
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  profileRow: { flexDirection: "row", gap: 12 },
  avatarWrap: { position: "relative" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  verifiedIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#3b82f6",
    padding: 4,
    borderRadius: 10,
  },

  nameRow: { flexDirection: "row", gap: 6 },
  name: { fontSize: 16, fontWeight: "700" },

  verifiedBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  verifiedText: { fontSize: 10, fontWeight: "700", color: "#166534" },

  locationRow: { flexDirection: "row", gap: 4 },
  location: { fontSize: 12, color: "#6b7280" },

  infoRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    padding: 8,
    borderRadius: 10,
  },
  infoLabel: { fontSize: 10, color: "#6b7280" },
  infoMono: { fontFamily: "monospace", fontSize: 12 },
  trustScore: { color: "#16a34a", fontWeight: "700" },
  divider: { width: 1, backgroundColor: "#e5e7eb" },

  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  link: { fontSize: 12, color: "#16a34a", fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
  },
  actionCard: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  actionTitle: { fontWeight: "700", textAlign: "center" },

  badge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  badgeText: { fontSize: 10, fontWeight: "700" },
  badgeGreen: { backgroundColor: "#dcfce7" },
  badgeOrange: { backgroundColor: "#ffedd5" },
  badgeBlue: { backgroundColor: "#dbeafe" },

  requestCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  reqTitle: { fontWeight: "700" },
  reqSub: { fontSize: 12, color: "#6b7280" },

  countBadge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  countText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
  },
  summaryBox: {
    width: "48%",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  summaryLabel: { fontSize: 10, color: "#6b7280" },
  summaryValue: { fontSize: 18, fontWeight: "700" },

  alertRow: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  alertDanger: { backgroundColor: "#fef2f2" },
  alertTitle: { fontSize: 10, fontWeight: "700" },
  alertText: { fontSize: 12 },

  alertBtn: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  alertBtnText: { fontSize: 10, fontWeight: "700" },

  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  supportText: { flex: 1, fontWeight: "600" },
  supportRight: { fontSize: 12, color: "#6b7280" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, color: "#6b7280" },
  navActive: { color: "#16a34a", fontWeight: "700" },
});
