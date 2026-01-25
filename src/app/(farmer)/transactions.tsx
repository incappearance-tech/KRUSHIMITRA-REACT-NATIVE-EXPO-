import AppBar from '@/src/components/AppBar';
import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const TRANSACTIONS = [
    {
        id: 'T1',
        title: 'Rental Booking: John Deere 5050D',
        date: '24 Jan 2026',
        amount: '- ₹2,400',
        type: 'debit',
        status: 'Completed'
    },
    {
        id: 'T2',
        title: 'Selling Machine: Harvester',
        date: '22 Jan 2026',
        amount: '+ ₹15,000',
        type: 'credit',
        status: 'Holding'
    },
    {
        id: 'T3',
        title: 'Seed Purchase: Mahyco Hybrid',
        date: '20 Jan 2026',
        amount: '- ₹1,200',
        type: 'debit',
        status: 'Completed'
    }
];

export default function TransactionsScreen() {
    return (
        <View style={styles.container}>
            <AppBar title="Transaction History" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>₹12,450.00</Text>
                </View>

                <Text style={styles.sectionTitle}>Recent Transactions</Text>

                {TRANSACTIONS.map(item => (
                    <View key={item.id} style={styles.card}>
                        <View style={[styles.iconBox, { backgroundColor: item.type === 'credit' ? '#f0fdf4' : '#fef2f2' }]}>
                            <MaterialIcons
                                name={item.type === 'credit' ? 'arrow-downward' : 'arrow-upward'}
                                size={20}
                                color={item.type === 'credit' ? '#16a34a' : '#ef4444'}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.date}>{item.date} • {item.status}</Text>
                        </View>
                        <Text style={[styles.amount, { color: item.type === 'credit' ? '#16a34a' : '#0f172a' }]}>
                            {item.amount}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
    scrollContent: { paddingBottom: 40 },
    balanceCard: {
        backgroundColor: COLORS.brand.primary,
        padding: 24,
        borderRadius: 24,
        marginTop: 16,
        marginBottom: 32,
        elevation: 4
    },
    balanceLabel: { fontSize: 13, fontWeight: '700', color: '#000', opacity: 0.6, textTransform: 'uppercase' },
    balanceAmount: { fontSize: 32, fontWeight: '900', color: '#000', marginTop: 8 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9'
    },
    iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    info: { flex: 1, marginLeft: 12 },
    title: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
    date: { fontSize: 12, color: '#64748b', marginTop: 2 },
    amount: { fontSize: 16, fontWeight: '800' }
});
