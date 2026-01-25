import { COLORS } from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaymentModalProps {
    visible: boolean;
    amount: string;
    title: string;
    onSuccess: () => void;
    onClose: () => void;
}

export default function PaymentModal({ visible, amount, title, onSuccess, onClose }: PaymentModalProps) {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    useEffect(() => {
        if (visible) setStatus('idle');
    }, [visible]);

    const handlePay = () => {
        setStatus('processing');
        // Simulate Gateway
        setTimeout(() => {
            setStatus('success');
            // Auto close after success
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1000); // 1.5s delay to show success
        }, 2000);
    };

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Review & Pay</Text>
                        <TouchableOpacity onPress={onClose} disabled={status !== 'idle'}>
                            <MaterialIcons name="close" size={24} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        {status === 'processing' ? (
                            <View style={styles.centerBox}>
                                <ActivityIndicator size="large" color={COLORS.brand.primary} />
                                <Text style={styles.processingText}>Processing Payment...</Text>
                                <Text style={styles.secureText}>Do not press back or close.</Text>
                            </View>
                        ) : status === 'success' ? (
                            <View style={styles.centerBox}>
                                <View style={styles.successIcon}>
                                    <MaterialIcons name="check" size={40} color="#fff" />
                                </View>
                                <Text style={styles.successTitle}>Payment Successful!</Text>
                                <Text style={styles.successSub}>Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
                            </View>
                        ) : (
                            <>
                                <View style={styles.billRow}>
                                    <Text style={styles.billLabel}>Item:</Text>
                                    <Text style={styles.billVal}>{title}</Text>
                                </View>
                                <View style={styles.billRow}>
                                    <Text style={styles.billLabel}>Service Fee:</Text>
                                    <Text style={styles.billVal}>{amount}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.totalRow}>
                                    <Text style={styles.totalLabel}>Total Payable</Text>
                                    <Text style={styles.totalAmt}>{amount}</Text>
                                </View>

                                {/* Mock Methods */}
                                <Text style={styles.methodLabel}>Payment Method</Text>
                                <View style={styles.methodBox}>
                                    <MaterialIcons name="account-balance-wallet" size={24} color="#0f172a" />
                                    <View>
                                        <Text style={styles.methodTitle}>UPI / Wallet</Text>
                                        <Text style={styles.methodSub}>GooglePay, PhonePe, Paytm</Text>
                                    </View>
                                    <MaterialIcons name="radio-button-checked" size={20} color={COLORS.brand.primary} />
                                </View>

                                <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
                                    <Text style={styles.payBtnText}>Pay {amount}</Text>
                                    <MaterialIcons name="lock" size={16} color="#fff" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {/* Footer Trust */}
                    {status === 'idle' && (
                        <View style={styles.footer}>
                            <MaterialIcons name="verified-user" size={14} color="#64748b" />
                            <Text style={styles.footerText}>100% Secure Payment powered by Stripe</Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
    content: { padding: 24 },

    // Status
    centerBox: { alignItems: 'center', paddingVertical: 20, gap: 12 },
    processingText: { fontSize: 16, fontWeight: '600', color: '#0f172a', marginTop: 12 },
    secureText: { fontSize: 13, color: '#64748b' },
    successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    successTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
    successSub: { fontSize: 13, color: '#64748b', fontFamily: 'monospace' },

    // Bill
    billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    billLabel: { fontSize: 14, color: '#64748b' },
    billVal: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    totalLabel: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    totalAmt: { fontSize: 24, fontWeight: '800', color: COLORS.brand.primary },

    methodLabel: { fontSize: 12, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 },
    methodBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1, borderColor: COLORS.brand.primary, borderRadius: 12, backgroundColor: '#f0fdf4', marginBottom: 24 },
    methodTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
    methodSub: { fontSize: 12, color: '#64748b' },

    payBtn: { backgroundColor: '#0f172a', paddingVertical: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
    payBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

    footer: { flexDirection: 'row', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', gap: 6, marginBottom: 20 },
    footerText: { fontSize: 11, color: '#64748b', fontWeight: '500' },
});
