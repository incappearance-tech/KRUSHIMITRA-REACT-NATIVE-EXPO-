import { COLORS } from '@/src/constants/colors';
import { RentalRequest, useRentalStore } from '@/src/store/rental.store';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DATES = Array.from({ length: 11 }, (_, i) => i + 1); // Mock 1-11 dates

export default function RentInRequestScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { rentals, addRequest } = useRentalStore();

    const [selectedDate, setSelectedDate] = useState(5);
    const [durationUnit, setDurationUnit] = useState<'Hours' | 'Days'>('Hours');
    const [durationValue, setDurationValue] = useState(4);
    const [note, setNote] = useState('');

    const machine = rentals.find(m => m.id === id) || rentals[0];

    const incrementDuration = () => setDurationValue(prev => prev + 1);
    const decrementDuration = () => setDurationValue(prev => Math.max(1, prev - 1));

    // Calculation logic
    const totalCost = durationUnit === 'Hours'
        ? (durationValue * (Number(machine.price) || 0))
        : (durationValue * (Number(machine.price) * 8 || 0));

    const handleSendRequest = () => {
        const newRequest: RentalRequest = {
            id: Math.random().toString(36).substring(7),
            machineId: machine.id,
            machineName: machine.name,
            machineImage: machine.image,
            borrowerName: 'Sopan Phadtare', // Mock borrower
            requestDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            startDate: `Oct ${selectedDate < 10 ? '0' + selectedDate : selectedDate}, 2023`,
            endDate: `Oct ${selectedDate + (durationUnit === 'Days' ? durationValue : 0)}, 2023`,
            totalPrice: totalCost.toFixed(0),
            status: 'PENDING',
            paymentStatus: 'UNPAID'
        };

        addRequest(newRequest);
        Alert.alert('Success', 'Booking Request Sent Successfully!', [
            { text: 'OK', onPress: () => router.push('/(farmer)/rent-in/') }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.95)" />

            {/* Top App Bar */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Request Rental</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Machine Summary Card */}
                <View style={styles.section}>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Image source={{ uri: machine.image }} style={styles.thumbImage} />
                            <View style={styles.summaryInfo}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.summaryTitle}>{machine.name}</Text>
                                </View>
                                <Text style={styles.summaryOwner}>Owner: {machine.ownerName}</Text>
                                <View style={styles.summaryMetaRow}>
                                    <View style={styles.availBadge}>
                                        <Text style={styles.availText}>Available</Text>
                                    </View>
                                    <Text style={styles.summaryPrice}>₹{machine.price}/hr</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Date Selector */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>When do you need it?</Text>
                    <View style={styles.card}>
                        <View style={styles.calendarHeader}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <MaterialIcons name="chevron-left" size={24} color="#0f172a" />
                            </TouchableOpacity>
                            <Text style={styles.monthText}>October 2023</Text>
                            <TouchableOpacity style={styles.iconBtn}>
                                <MaterialIcons name="chevron-right" size={24} color="#0f172a" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.calendarGrid}>
                            {DAYS.map((day, i) => (
                                <Text key={i} style={styles.dayLabel}>{day}</Text>
                            ))}
                            {/* Empty placeholders for alignment mockup */}
                            <View style={styles.dateCell} />
                            <View style={styles.dateCell} />
                            <View style={styles.dateCell} />

                            {DATES.map((date) => (
                                <TouchableOpacity
                                    key={date}
                                    style={[
                                        styles.dateCell,
                                        selectedDate === date && styles.dateCellSelected
                                    ]}
                                    onPress={() => setSelectedDate(date)}
                                >
                                    <Text style={[
                                        styles.dateText,
                                        selectedDate === date && styles.dateTextSelected
                                    ]}>{date}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Duration */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>For how long?</Text>
                    <View style={styles.card}>
                        <View style={styles.toggleRow}>
                            <TouchableOpacity
                                style={[styles.toggleBtn, durationUnit === 'Hours' && styles.toggleBtnActive]}
                                onPress={() => setDurationUnit('Hours')}
                            >
                                <Text style={[styles.toggleText, durationUnit === 'Hours' && styles.toggleTextActive]}>Hours</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleBtn, durationUnit === 'Days' && styles.toggleBtnActive]}
                                onPress={() => setDurationUnit('Days')}
                            >
                                <Text style={[styles.toggleText, durationUnit === 'Days' && styles.toggleTextActive]}>Days</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.stepperRow}>
                            <View style={styles.stepperControls}>
                                <TouchableOpacity style={styles.stepperBtn} onPress={decrementDuration}>
                                    <MaterialIcons name="remove" size={24} color="#6b7280" />
                                </TouchableOpacity>
                                <Text style={styles.stepperValue}>{durationValue}</Text>
                                <TouchableOpacity style={styles.stepperBtnPrimary} onPress={incrementDuration}>
                                    <MaterialIcons name="add" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.costColumn}>
                                <Text style={styles.estLabel}>EST. TOTAL</Text>
                                <Text style={styles.estValue}>₹{totalCost.toFixed(0)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Note */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Add a Note <Text style={styles.optionalText}>(Optional)</Text></Text>
                    <TextInput
                        style={styles.noteInput}
                        placeholder="e.g., Specific crop type, field location instructions..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={note}
                        onChangeText={setNote}
                    />
                </View>

                <View style={{ height: 160 }} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <Text style={styles.totalLabel}>Total payable</Text>
                    <Text style={styles.totalValue}>₹{totalCost.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.sendBtn} onPress={handleSendRequest}>
                    <Text style={styles.sendBtnText}>Send Request</Text>
                    <MaterialIcons name="send" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    appBarTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    summaryCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 16,
    },
    thumbImage: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#e5e7eb',
    },
    summaryInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    summaryOwner: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    summaryMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    availBadge: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(22, 163, 74, 0.2)',
    },
    availText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#15803d',
    },
    summaryPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        elevation: 2,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBtn: {
        padding: 4,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 8,
    },
    dayLabel: {
        width: '13%',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#9ca3af',
        marginBottom: 4,
    },
    dateCell: {
        width: '13%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    dateCellSelected: {
        backgroundColor: COLORS.brand.primary,
        elevation: 3,
    },
    dateText: {
        fontSize: 14,
        color: '#0f172a',
    },
    dateTextSelected: {
        fontWeight: '700',
        color: '#000',
    },
    toggleRow: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        padding: 4,
        marginBottom: 24,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleBtnActive: {
        backgroundColor: '#fff',
        elevation: 1,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    toggleTextActive: {
        fontWeight: '600',
        color: '#000',
    },
    stepperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepperControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    stepperBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepperBtnPrimary: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.brand.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    stepperValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        minWidth: 32,
        textAlign: 'center',
    },
    costColumn: {
        alignItems: 'flex-end',
    },
    estLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
        letterSpacing: 0.5,
    },
    estValue: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.brand.primary,
    },
    optionalText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#6b7280',
    },
    noteInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#0f172a',
        minHeight: 120,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.98)',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        paddingBottom: 32,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    sendBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.brand.primary,
        height: 56,
        borderRadius: 16,
        elevation: 4,
    },
    sendBtnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
});
