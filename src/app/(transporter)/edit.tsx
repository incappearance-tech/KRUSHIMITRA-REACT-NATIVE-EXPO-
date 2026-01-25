import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore } from '@/src/store/transporter.store';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function TransporterEdit() {
    const router = useRouter();
    const { profile, updateProfile } = useTransporterStore();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        radius: '',
        experience: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                location: profile.location,
                radius: profile.operatingRadius,
                experience: profile.experience,
            });
        } else {
            router.replace('/(transporter)/register');
        }
    }, [profile]);

    if (!profile) return null;

    const handleUpdate = () => {
        if (!formData.name.trim() || !formData.location.trim() || !formData.radius) {
            Alert.alert('Error', 'Please fill all mandatory fields');
            return;
        }

        updateProfile({
            name: formData.name,
            location: formData.location,
            operatingRadius: formData.radius,
            experience: formData.experience,
        });

        Alert.alert('Success', 'Business info updated successfully!', [
            { text: 'OK', onPress: () => router.back() },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.headerTitle}>Edit Business Info</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Business Details</Text>
                    <LabeledInput
                        label="Owner / Business Name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        icon="person"
                    />
                    <LabeledInput
                        label="Base Location (Village/City)"
                        placeholder="e.g. Rampur, Pune"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        icon="location-on"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Service Coverage</Text>
                    <LabeledInput
                        label="Operating Radius (km)"
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
                <Button label="Save Changes" onPress={handleUpdate} icon="check" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scroll: { paddingBottom: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    section: { paddingHorizontal: 16, marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, color: COLORS.textSecondary },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});
