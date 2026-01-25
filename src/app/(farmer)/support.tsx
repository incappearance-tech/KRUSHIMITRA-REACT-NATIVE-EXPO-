import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function SupportScreen() {
    const handleCall = () => Linking.openURL('tel:18004567890');
    const handleEmail = () => Linking.openURL('mailto:support@krushimitra.com');
    const handleWhatsApp = () => Linking.openURL('https://wa.me/919876543210');

    return (
        <View style={styles.container}>
            <AppBar title="Help & Support" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="contact-support" size={48} color={COLORS.brand.primary} />
                    </View>
                    <Text style={styles.title}>How can we help?</Text>
                    <Text style={styles.subtitle}>Our team is available 24/7 to support your farming business needs.</Text>
                </View>

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.supportCard} onPress={handleCall}>
                        <View style={[styles.cardIcon, { backgroundColor: '#eff6ff' }]}>
                            <MaterialIcons name="call" size={24} color="#1d4ed8" />
                        </View>
                        <Text style={styles.cardLabel}>Helpline</Text>
                        <Text style={styles.cardValue}>1800-456-7890</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.supportCard} onPress={handleWhatsApp}>
                        <View style={[styles.cardIcon, { backgroundColor: '#f0fdf4' }]}>
                            <MaterialIcons name="chat" size={24} color="#16a34a" />
                        </View>
                        <Text style={styles.cardLabel}>WhatsApp</Text>
                        <Text style={styles.cardValue}>+91 98765...</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.supportCard, { width: '100%' }]} onPress={handleEmail}>
                        <View style={[styles.cardIcon, { backgroundColor: '#fef2f2' }]}>
                            <MaterialIcons name="email" size={24} color="#ef4444" />
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>Email Support</Text>
                            <Text style={styles.cardValue}>support@krushimitra.com</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

                <View style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>How do I rent out my machine?</Text>
                    <Text style={styles.faqAnswer}>Go to 'Sell/Rent' tab, choose 'Rent Out', and follow the 3-step wizard.</Text>
                </View>

                <View style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>Is my payment secure?</Text>
                    <Text style={styles.faqAnswer}>Yes, all payments are held in escrow until the service is completed.</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
    scrollContent: { paddingBottom: 40 },
    header: { alignItems: 'center', paddingVertical: 40 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.brand.muted, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: '900', color: '#0f172a' },
    subtitle: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 8, paddingHorizontal: 20 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
    supportCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 24,
        width: '48%',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        flexDirection: 'column',
        gap: 8
    },
    cardIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    cardLabel: { fontSize: 12, color: '#64748b', fontWeight: '600' },
    cardValue: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
    faqTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginTop: 32, marginBottom: 16 },
    faqCard: { backgroundColor: '#fff', padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' },
    faqQuestion: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
    faqAnswer: { fontSize: 13, color: '#64748b', marginTop: 6, lineHeight: 18 }
});
