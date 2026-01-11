import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/colors';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isValid = mobile.length === 10;

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(t);
  }, []);

  const onChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setMobile(cleaned);
      if (cleaned.length === 10) {
        Keyboard.dismiss();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <View style={styles.heroWrap}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000' }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.badge}>
            <View style={styles.badgeIcon}>
              <MaterialIcons name="agriculture" size={18} color={COLORS.brand.primary} />
            </View>
            <Text style={styles.badgeText}>KrushiMitra</Text>
          </View>
        </ImageBackground>
      </View>

      {/* CARD */}
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('auth.welcome_back')}</Text>
          <Text style={styles.subtitle}>
            {t('auth.login_subtitle')}
          </Text>

          {/* IMPROVED INPUT BOX */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={[
              styles.inputBox,
              focused && styles.inputFocused,
            ]}
          >
            <View style={styles.country}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.code}>+91</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.textSecondary} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[
                styles.label,
                (focused || mobile) && styles.labelActive
              ]}>
                {t('auth.mobile_number')}
              </Text>
              <TextInput
                ref={inputRef}
                value={mobile}
                onChangeText={onChange}
                keyboardType="number-pad"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={styles.input}
                maxLength={10}
                selectionColor={COLORS.brand.primary}
              />
            </View>

            {isValid && (
              <View style={styles.successIcon}>
                <MaterialIcons name="check-circle" size={24} color={COLORS.brand.primary} />
              </View>
            )}
          </TouchableOpacity>

          {/* IMPROVED CTA */}
          <TouchableOpacity
            style={[styles.cta, !isValid && { opacity: 0.7 }]}
            onPress={() => isValid && router.push("/otp")}
            activeOpacity={0.8}
          >
            <View style={styles.ctaIcon}>
              <Ionicons name="lock-open" size={20} color="#fff" />
            </View>
            <Text style={styles.ctaText}>{t('auth.get_otp')}</Text>
            {/* Spacer for visual balance against the icon */}
            <View style={{ width: 44 }} />
          </TouchableOpacity>

          {/* REGISTER */}
          <TouchableOpacity onPress={() => { }} style={styles.registerBtn}>
            <Text style={styles.register}>
              {t('common.new_user')} <Text style={styles.registerLink}>{t('common.register')}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>{t('auth.secure_network')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  heroWrap: {
    height: height * 0.4,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeIcon: {
    backgroundColor: COLORS.brand.muted,
    padding: 6,
    borderRadius: 100,
    marginRight: 10,
  },
  badgeText: {
    fontWeight: '800',
    letterSpacing: 0.5,
    fontSize: 14,
    color: COLORS.text,
  },
  cardWrap: {
    flex: 1,
    marginTop: -50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 32,
  },
  /* --- INPUT IMPROVEMENTS --- */
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.surfaceHighlight,
    height: 72,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: COLORS.brand.primary,
    backgroundColor: COLORS.surface,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderColor: COLORS.border,
    height: '60%',
  },
  flag: { fontSize: 20, marginRight: 6 },
  code: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginRight: 4 },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    position: 'absolute',
    left: 16,
    top: 24,
    fontSize: 16,
    color: COLORS.textLight,
  },
  labelActive: {
    top: 8,
    fontSize: 12,
    color: COLORS.brand.primary,
    fontWeight: '700',
  },
  input: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
    padding: 0, // Remove default padding for better label alignment
  },
  successIcon: {
    marginRight: 16,
  },
  /* --- BUTTON IMPROVEMENTS --- */
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.brand.primary,
    height: 64,
    borderRadius: 20,
    paddingHorizontal: 6, // Reduced to make the icon look like a "fab" inside
    marginBottom: 24,
    elevation: 4,
    shadowColor: COLORS.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaIcon: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    color: "#fff",
    textAlign: 'center',
  },
  registerBtn: {
    alignItems: 'center',
  },
  register: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  registerLink: {
    fontWeight: '800',
    color: COLORS.text,
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.textLight,
    marginBottom: 20,
    marginTop: 'auto',
  },
});