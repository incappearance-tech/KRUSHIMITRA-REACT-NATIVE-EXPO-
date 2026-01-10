import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import Button from '@/src/components/Button';

type Role = 'farmer' | 'labour' | 'transporter';
type RoleCardProps = {
  data: {
    title: string;
    desc: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconBg: string;
    iconColor: string;
  };
  selected: boolean;
  onPress: () => void;
};

const ROLES = [
  {
    key: 'farmer',
    title: 'Farmer',
    desc: 'Manage crops, track harvest, and connect with markets.',
    icon: 'agriculture',
    iconBg: COLORS.primary[100],
    iconColor: COLORS.primary[800],
    route: '(farmer)/profile',
  },
  {
    key: 'labour',
    title: 'Labour',
    desc: 'Find daily work, manage schedule, and receive payments.',
    icon: 'engineering',
    iconBg: '#FEF9C3',
    iconColor: '#A16207',
    route: '(labour)/profile',
  },
  {
    key: 'transporter',
    title: 'Transporter',
    desc: 'Logistics, route planning, and delivery tracking.',
    icon: 'local-shipping',
    iconBg: '#DBEAFE',
    iconColor: '#1D4ED8',
    route: '(transporter)/profile',
  },
] as const;

export default function RoleSelectScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('farmer');

  const selectedRole = ROLES.find(r => r.key === role);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={router.back}>
          <Ionicons name="arrow-back" size={22} color={COLORS.borderFocus} />
        </TouchableOpacity>

        <View style={styles.languagePill}>
          <MaterialIcons name="language" size={16} color={COLORS.borderFocus} />
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.borderFocus} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.subtitle}>
          Choose your account type to get started with the tailored experience.
        </Text>

        {ROLES.map(item => (
          <RoleCard
            key={item.key}
            data={item}
            selected={role === item.key}
            onPress={() => setRole(item.key)}
          />
        ))}
      </View>

      {/* Footer */}
      {/* <View> */}
        <Button
          label="Continue"
          icon="arrow-forward"
          onPress={() => selectedRole && router.push(selectedRole.route)}
        />

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      {/* </View> */}
    </View>
  );
}

function RoleCard({ data, selected, onPress }: RoleCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={[styles.iconCircle, { backgroundColor: data.iconBg }]}>
        <MaterialIcons name={data.icon} size={26} color={data.iconColor} />
      </View>

      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        <Text style={styles.cardDesc}>{data.desc}</Text>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioActive]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
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
    // padding: 24,
    marginBottom:24
  },

  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderFocus,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.borderFocus,
    backgroundColor: COLORS.brand.muted,
  },

  languageText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.borderFocus,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },

  card: {
    flexDirection: 'row',
    padding:16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },

  cardSelected: {
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.brand.muted,
  },

  iconCircle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },

  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  radioActive: {
    borderColor: COLORS.brand.primary,
  },

  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.brand.primary,
  },

  terms: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },

  link: {
    color: COLORS.brand.primary,
    fontWeight: '600',
  },
});
