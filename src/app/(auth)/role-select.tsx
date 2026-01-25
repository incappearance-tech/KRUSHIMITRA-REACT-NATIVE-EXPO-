import { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import { UserRole } from '@/src/types/models/user';

import { COLORS } from '../../constants/colors';

type IRole = UserRole;
type IRoleCardProps = {
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
    icon: 'agriculture',
    iconBg: COLORS.primary[100],
    iconColor: COLORS.primary[800],
    route: '/(farmer)/profile',
  },
  {
    key: 'labour',
    icon: 'engineering',
    iconBg: '#FEF9C3',
    iconColor: '#A16207',
    route: '/(labour)/register',
  },
  {
    key: 'transporter',
    icon: 'local-shipping',
    iconBg: '#DBEAFE',
    iconColor: '#1D4ED8',
    route: '/(transporter)/register',
  },
] as const;

export default function RoleSelectScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [role, setRole] = useState<IRole>('farmer');

  const selectedRole = ROLES.find((r) => r.key === role);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <View style={styles.languagePill}>
          <MaterialIcons name="language" size={16} color={COLORS.borderFocus} />
          <Text style={styles.languageText}>
            {t(`language.${i18n.language}`)}
          </Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.borderFocus} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{t('roles.who_are_you')}</Text>
        <Text style={styles.subtitle}>{t('roles.role_subtitle')}</Text>

        {ROLES.map((item) => (
          <RoleCard
            key={item.key}
            data={{
              ...item,
              title: t(`roles.${item.key}`),
              desc: t(`roles.${item.key}_desc`),
            }}
            selected={role === item.key}
            onPress={() => setRole(item.key)}
          />
        ))}
      </View>

      {/* Footer */}
      <Button
        label={t('common.continue')}
        icon="arrow-forward"
        onPress={() => selectedRole && router.push(selectedRole.route)}
      />

      <Text style={styles.terms}>
        {t('roles.agree_terms')}{' '}
        <Text style={styles.link}>{t('common.terms_service')}</Text> &{' '}
        <Text style={styles.link}>{t('common.privacy_policy')}</Text>.
      </Text>
    </View>
  );
}

function RoleCard({ data, selected, onPress }: IRoleCardProps) {
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    padding: 16,
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
