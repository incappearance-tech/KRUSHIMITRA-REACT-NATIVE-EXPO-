import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const WORK_TYPES = [
    { id: 'harvesting', label: 'Harvesting', icon: 'agriculture' },
    { id: 'sowing', label: 'Sowing', icon: 'yard' }, // potted_plant map
    { id: 'spraying', label: 'Spraying', icon: 'water-drop' },
    { id: 'loading', label: 'Loading', icon: 'forklift' }, // forklift might not exist, using generic or text
    { id: 'general', label: 'General', icon: 'engineering' },
];

export default function LabourFiltersScreen() {
    const router = useRouter();
    const [selectedWork, setSelectedWork] = useState('harvesting');
    const [avail, setAvail] = useState('Today');
    const [timePref, setTimePref] = useState('Day');
    const [distance, setDistance] = useState(15);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,0.95)" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Work Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What kind of work?</Text>
                    <View style={styles.chipContainer}>
                        {WORK_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.chip,
                                    selectedWork === type.id ? styles.chipActive : styles.chipInactive
                                ]}
                                onPress={() => setSelectedWork(type.id)}
                            >
                                <MaterialIcons
                                    name={type.icon as any || 'construction'}
                                    size={20}
                                    color={selectedWork === type.id ? '#000' : '#6b7280'}
                                />
                                <Text style={[
                                    styles.chipText,
                                    selectedWork === type.id ? styles.chipTextActive : styles.chipTextInactive
                                ]}>{type.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Distance */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How far?</Text>
                    <View style={styles.card}>
                        <View style={[styles.rowBetween, { marginBottom: 16 }]}>
                            <Text style={styles.distLabel}>Maximum Distance</Text>
                            <Text style={styles.distValue}>{distance} km</Text>
                        </View>

                        {/* Slider Sim */}
                        <View style={styles.sliderTrack}>
                            <View style={[styles.sliderFill, { width: '30%' }]} />
                            <View style={[styles.sliderThumb, { left: '30%' }]} />
                        </View>
                        <View style={styles.sliderLabels}>
                            <Text style={styles.sliderLabelSm}>1 km</Text>
                            <Text style={styles.sliderLabelSm}>50 km</Text>
                        </View>
                    </View>
                </View>

                {/* Availability */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>When do you need them?</Text>
                    <View style={styles.segmentContainer}>
                        <TouchableOpacity
                            style={[styles.segmentBtn, avail === 'Today' && styles.segmentBtnActive]}
                            onPress={() => setAvail('Today')}
                        >
                            <Text style={[styles.segmentText, avail === 'Today' && styles.segmentTextActive]}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.segmentBtn, avail === 'Tomorrow' && styles.segmentBtnActive]}
                            onPress={() => setAvail('Tomorrow')}
                        >
                            <Text style={[styles.segmentText, avail === 'Tomorrow' && styles.segmentTextActive]}>Tomorrow</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Preference */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Time Preference</Text>
                    <View style={styles.grid3}>
                        <TouchableOpacity
                            style={[styles.prefCard, timePref === 'Day' && styles.prefCardActive]}
                            onPress={() => setTimePref('Day')}
                        >
                            <MaterialIcons name="wb-sunny" size={32} color={timePref === 'Day' ? '#15803d' : '#9ca3af'} />
                            <Text style={[styles.prefText, timePref === 'Day' && styles.prefTextActive]}>Day</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.prefCard, timePref === 'Night' && styles.prefCardActive]}
                            onPress={() => setTimePref('Night')}
                        >
                            <MaterialIcons name="bedtime" size={32} color={timePref === 'Night' ? '#4338ca' : '#9ca3af'} />
                            <Text style={[styles.prefText, timePref === 'Night' && styles.prefTextActive]}>Night</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.prefCard, timePref === 'Both' && styles.prefCardActive]}
                            onPress={() => setTimePref('Both')}
                        >
                            <MaterialIcons name="contrast" size={32} color={timePref === 'Both' ? '#000' : '#9ca3af'} />
                            <Text style={[styles.prefText, timePref === 'Both' && styles.prefTextActive]}>Both</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.showBtn} onPress={() => router.back()}>
                    <Text style={styles.showBtnText}>Show 24 Laborers</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    resetText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#15803d',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 12,
    },

    // Work Type Chips
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    chipActive: {
        backgroundColor: COLORS.brand.primary,
        borderColor: COLORS.brand.primary,
    },
    chipInactive: {
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    chipTextActive: {
        color: '#000',
    },
    chipTextInactive: {
        color: '#374151',
    },

    // Distance Card
    card: {
        // Container for Distance only in this design? Or reuse container?
        // Design has slider inside a container-less look, but I'll wrap for consistency or match design exactly.
        // Design: "How far?" -> Card-ish look? No, it's just content.
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    distLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    distValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    sliderTrack: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        position: 'relative',
        marginVertical: 12,
    },
    sliderFill: {
        height: '100%',
        backgroundColor: 'rgba(55, 236, 19, 0.8)',
        borderRadius: 4,
    },
    sliderThumb: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: COLORS.brand.primary,
        top: -8,
        transform: [{ translateX: -12 }], // center thumb
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderLabelSm: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '500',
    },

    // Availability Segment
    segmentContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6', // or e5e7eb
        borderRadius: 12,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    segmentBtnActive: {
        backgroundColor: COLORS.brand.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    segmentTextActive: {
        fontWeight: '700',
        color: '#000',
    },

    // Pref Grid
    grid3: {
        flexDirection: 'row',
        gap: 12,
    },
    prefCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingVertical: 16,
    },
    prefCardActive: {
        backgroundColor: '#f0fdf4', // generic active light bg? Or specific depending on type
        // Design: Day (primary border, primary/10 bg), Night (white, border gray), Both (white, border gray)
        borderColor: COLORS.brand.primary,
        borderWidth: 2,
    },
    prefText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    prefTextActive: {
        fontWeight: '700',
        color: '#0f172a',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    showBtn: {
        height: 56,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#bbf7d0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    showBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
});
