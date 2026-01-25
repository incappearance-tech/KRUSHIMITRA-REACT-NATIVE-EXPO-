import AppBar from '@/src/components/AppBar';
import Button from '@/src/components/Button';
import LabeledInput from '@/src/components/LabeledInput';
import { COLORS } from '@/src/constants/colors';
import { useTransporterStore, VehicleDriver } from '@/src/store/transporter.store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

export default function EditDriverScreen() {
    const { vehicleId } = useLocalSearchParams();
    const router = useRouter();
    const { profile, updateVehicle } = useTransporterStore();

    const [driverData, setDriverData] = useState<VehicleDriver>({
        name: '',
        phone: '',
        licenseNo: '',
    });

    useEffect(() => {
        const vehicle = profile?.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            setDriverData(vehicle.driver);
        }
    }, [vehicleId, profile]);

    const handleSave = () => {
        if (!driverData.name || !driverData.phone) {
            Alert.alert('Error', 'Please fill driver name and phone');
            return;
        }

        updateVehicle(vehicleId as string, {
            driver: driverData,
        });

        Alert.alert('Success', 'Driver details updated!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <View style={styles.container}>
            <AppBar title="Edit Driver Details" onBackPress={() => router.back()} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    <LabeledInput
                        label="Driver Name *"
                        placeholder="Enter full name"
                        value={driverData.name}
                        onChangeText={(text) => setDriverData({ ...driverData, name: text })}
                        icon="person"
                    />
                    <LabeledInput
                        label="Driver Phone *"
                        placeholder="10-digit number"
                        value={driverData.phone}
                        onChangeText={(text) => setDriverData({ ...driverData, phone: text })}
                        icon="call"
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                    <LabeledInput
                        label="License Number"
                        placeholder="e.g. MH1220120001234"
                        value={driverData.licenseNo}
                        onChangeText={(text) => setDriverData({ ...driverData, licenseNo: text })}
                        icon="badge"
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button label="Update Driver" onPress={handleSave} icon="check" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scroll: { padding: 16, paddingTop: 20 },
    section: { gap: 20 },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});
