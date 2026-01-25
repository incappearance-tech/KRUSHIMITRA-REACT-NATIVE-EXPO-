import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import { useAuthStore } from '@/src/store/auth.store';
import { useTransporterStore } from '@/src/store/transporter.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function TransporterRegistration() {
    const router = useRouter();
    const { setProfile } = useTransporterStore();
    const { user } = useAuthStore();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        location: '',
        radius: '',
        experience: '',
    });

    const handleSubmit = () => {
        if (!formData.name.trim() || !formData.location.trim() || !formData.radius) {
            Alert.alert('Error', 'Please fill all mandatory fields');
            return;
        }

        const profile = {
            id: user?.id || Math.random().toString(36).substring(7),
            name: formData.name,
            phone: user?.phone || '9527189774',
            location: formData.location,
            operatingRadius: formData.radius,
            experience: formData.experience,
            verified: true,
            rating: 4.8,
            tripsCompleted: 0,
            leadsReceived: 0,
            vehicles: [],
            payments: [],
        };

        setProfile(profile);
        router.replace('/(transporter)/');
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.headerTitle}>Transporter Onboarding</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={[styles.heroSection]}>
                    <View style={styles.heroIconBox}>
                        <MaterialIcons name="local-shipping" size={40} color={COLORS.brand.primary} />
                    </View>
                    <Text style={styles.heroTitle}>Grow Your Transport Business</Text>
                    <Text style={styles.heroDesc}>Register your business to start receiving transport inquiries from local farmers.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Business Details</Text>
                    <LabeledInput
                        label="Owner / Business Name *"
                        placeholder="Enter name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        icon="person"
                    />
                    <LabeledInput
                        label="Base Location (Village/City) *"
                        placeholder="e.g. Rampur, Pune"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        icon="location-on"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Service Coverage</Text>
                    <LabeledInput
                        label="Operating Radius (km) *"
                        placeholder="e.g. 50"
                        value={formData.radius}
                        onChangeText={(text) => setFormData({ ...formData, radius: text })}
                        icon="explore"
                        keyboardType="numeric"
                    />
                    <LabeledInput
                        label="Experience"
                        placeholder="e.g. 8 years"
                        value={formData.experience}
                        onChangeText={(text) => setFormData({ ...formData, experience: text })}
                        icon="workspace-premium"
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footer}>
                <Button label="Complete Onboarding" onPress={handleSubmit} icon="arrow-forward" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scroll: { paddingBottom: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    heroSection: { alignItems: 'center', padding: 24, paddingBottom: 32 },
    heroIconBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.brand.muted, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    heroTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 8, textAlign: 'center' },
    heroDesc: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
    section: { paddingHorizontal: 16, marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, color: COLORS.textSecondary },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6', elevation: 10 },
});
