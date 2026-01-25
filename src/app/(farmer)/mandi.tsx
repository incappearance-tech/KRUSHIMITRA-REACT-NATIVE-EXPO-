import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const MANDI_RATES = [
    { id: '1', crop: 'Wheat (Gehu)', variety: 'Lokwan', price: '₹2,450', change: '+₹50', trend: 'up' },
    { id: '2', crop: 'Soybean', variety: 'Yellow', price: '₹4,800', change: '-₹120', trend: 'down' },
    { id: '3', crop: 'Onion (Kanda)', variety: 'Red', price: '₹1,800', change: '+₹200', trend: 'up' },
    { id: '4', crop: 'Cotton (Kapas)', variety: 'Long Staple', price: '₹7,200', change: '0', trend: 'neutral' },
];

export default function MandiScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Mandi Bhav (Live)</Text>
                    <Text style={styles.headerSub}>Rampur Market Yard</Text>
                </View>
                <TouchableOpacity style={styles.changeMandiBtn}>
                    <Text style={styles.changeText}>Change Mandi</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={16} color={COLORS.brand.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.tickerStrip}>
                <MaterialIcons name="trending-up" size={16} color="#fff" />
                <Text style={styles.tickerText}>Market is BULLISH today. Soybean rates up by 2%.</Text>
            </View>

            <FlatList
                data={MANDI_RATES}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rateCard}>
                        <View style={styles.cropInfo}>
                            <Text style={styles.cropName}>{item.crop}</Text>
                            <Text style={styles.varietyText}>{item.variety}</Text>
                        </View>
                        <View style={styles.priceInfo}>
                            <Text style={styles.priceText}>{item.price}/qt</Text>
                            <View style={[styles.trendBadge, item.trend === 'up' ? styles.trendUp : item.trend === 'down' ? styles.trendDown : styles.trendNeutral]}>
                                <MaterialIcons
                                    name={item.trend === 'up' ? 'arrow-upward' : item.trend === 'down' ? 'arrow-downward' : 'remove'}
                                    size={12}
                                    color={item.trend === 'up' ? '#16a34a' : item.trend === 'down' ? '#ef4444' : '#64748b'}
                                />
                                <Text style={[styles.changeTextSmall, item.trend === 'up' ? styles.textGreen : item.trend === 'down' ? styles.textRed : styles.textGray]}>
                                    {item.change}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ padding: 16, gap: 12 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
    headerSub: { fontSize: 13, color: '#64748b', marginTop: 2 },
    changeMandiBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8, backgroundColor: '#f0fdf4', borderRadius: 8 },
    changeText: { fontSize: 12, fontWeight: '700', color: COLORS.brand.primary },
    tickerStrip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#15803d', padding: 10, paddingHorizontal: 16 },
    tickerText: { color: '#fff', fontSize: 12, fontWeight: '600' },
    rateCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    cropInfo: { gap: 2 },
    cropName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    varietyText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
    priceInfo: { alignItems: 'flex-end', gap: 4 },
    priceText: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
    trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    trendUp: { backgroundColor: '#dcfce7' },
    trendDown: { backgroundColor: '#fee2e2' },
    trendNeutral: { backgroundColor: '#f1f5f9' },
    changeTextSmall: { fontSize: 11, fontWeight: '700' },
    textGreen: { color: '#16a34a' },
    textRed: { color: '#ef4444' },
    textGray: { color: '#64748b' },
});
