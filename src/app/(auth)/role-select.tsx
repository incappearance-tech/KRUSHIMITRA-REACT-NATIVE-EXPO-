import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Role = 'farmer' | 'labour' | 'transporter';

export default function RoleSelectScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('farmer');

  return (
    <View style={styles.container}>
      {/* Top bar */}
      {/* Back + Language */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <View style={styles.languagePill}>
          <MaterialIcons name="language" size={16} color="#15803D" />
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-down" size={16} color="#15803D" />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.subtitle}>
          Choose your account type to get started with the tailored experience.
        </Text>

        {/* Farmer */}
        <TouchableOpacity
          style={[
            styles.card,
            role === 'farmer' && styles.cardSelected,
          ]}
          onPress={() => setRole('farmer')}
          activeOpacity={0.9}
        >
          <View style={styles.iconCircleGreen}>
            <MaterialIcons name="agriculture" size={26} color="#15803D" />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Farmer</Text>
            <Text style={styles.cardDesc}>
              Manage crops, track harvest, and connect with markets.
            </Text>
          </View>

          <View style={styles.radioOuter}>
            {role === 'farmer' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Labour */}
        <TouchableOpacity
          style={[
            styles.card,
            role === 'labour' && styles.cardSelected,
          ]}
          onPress={() => setRole('labour')}
          activeOpacity={0.9}
        >
          <View style={styles.iconCircleYellow}>
            <MaterialIcons name="engineering" size={26} color="#A16207" />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Labour</Text>
            <Text style={styles.cardDesc}>
              Find daily work, manage schedule, and receive payments.
            </Text>
          </View>

          <View style={styles.radioOuter}>
            {role === 'labour' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Transporter */}
        <TouchableOpacity
          style={[
            styles.card,
            role === 'transporter' && styles.cardSelected,
          ]}
          onPress={() => setRole('transporter')}
          activeOpacity={0.9}
        >
          <View style={styles.iconCircleBlue}>
            <MaterialIcons name="local-shipping" size={26} color="#1D4ED8" />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Transporter</Text>
            <Text style={styles.cardDesc}>
              Logistics, route planning, and delivery tracking.
            </Text>
          </View>

          <View style={styles.radioOuter}>
            {role === 'transporter' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={()=>router.push("(farmer)/profile")}>
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: { fontSize: 12 },
  statusIcons: { flexDirection: 'row', gap: 6 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
  },
  languageText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#15803D',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  cardSelected: {
    borderColor: '#16A34A',
    backgroundColor: 'rgba(22,163,74,0.05)',
  },

  iconCircleGreen: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleYellow: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#FEF9C3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBlue: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardText: { flex: 1 },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },

  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
  },

  footer: {
    padding: 20,
    paddingBottom: 28,
  },

  continueBtn: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  terms: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#16A34A',
    fontWeight: '600',
  },
});
