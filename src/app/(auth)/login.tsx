import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [mobile, setMobile] = useState('');
  const isValid = mobile.length === 10;

  const handleGetOtp = () => {
    if (!isValid) return;
    router.push('/(auth)/otp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Curved Header */}
      <View style={styles.headerCurve} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* App Icon */}
        <View style={styles.iconWrap}>
          <Ionicons name="leaf" size={44} color="#5BCF54" />
        </View>

        {/* Title */}
        <Text style={styles.appName}>FarmConnect</Text>
        <Text style={styles.tagline}>
          The platform for farmers, laborers, and transporters.
        </Text>

        {/* Mobile Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('auth.mobile_number')}</Text>

          <View style={styles.inputBox}>
            <View style={styles.countryCode}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              value={mobile}
onChangeText={(text) => {
    setMobile(text);
    if (text.length === 10) {
      Keyboard.dismiss();
    }
  }}              placeholder={t('auth.enter_mobile')}
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
            />
        <Ionicons name="call-outline" size={18} color="#4CAF50" />

          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons (UI only) */}
        <View style={styles.socialRow}>
          <View style={styles.socialBtn}>
            <Ionicons name="logo-google" size={18} />
            <Text style={styles.socialText}>Google</Text>
          </View>
          <View style={styles.socialBtn}>
            <Ionicons name="logo-apple" size={18} />
            <Text style={styles.socialText}>Apple</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity
          style={[styles.otpButton, !isValid && styles.disabledBtn]}
          disabled={!isValid}
          onPress={handleGetOtp}
          activeOpacity={0.85}
        >
          <Text style={styles.otpText}>Get OTP</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* Header */
  headerCurve: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 220,
    backgroundColor: '#DCFCE7',
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },

  topBar: {
    paddingTop: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: { fontSize: 12 },
  statusIcons: { flexDirection: 'row', gap: 6 },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },

  iconWrap: {
    backgroundColor: '#EAF9E9',
    padding: 18,
    borderRadius: 999,
    marginBottom: 16,
  },

  appName: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },

  inputGroup: { width: '100%', marginBottom: 24 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 14,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
  },
  countryCode: {
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  countryText: { fontWeight: '600' },

  input: {
    flex: 1,
    fontSize: 16,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { fontSize: 12, color: '#6B7280' },

  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialBtn: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#F5F5F7',
  },
  socialText: { fontSize: 13, fontWeight: '600' },

  footer: {
    padding: 20,
  },
  terms: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#5BCF54',
    fontWeight: '600',
  },

  otpButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#5BCF54',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledBtn: { opacity: 0.5 },
  otpText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
