import { useEffect, useRef, useState } from 'react';

import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from 'react-i18next';

import BackButton from '@/src/components/BackButton';

import { COLORS } from '../../constants/colors';

const OTP_LENGTH = 4;

export default function OtpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  // States
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(117); // 1:57 in seconds

  // Animation Refs
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(0)).current;

  // 1. Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Blinking Cursor Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [cursorOpacity]);

  // 3. Auto-focus
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const shake = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOtpChange = (text: string) => {
    const value = text.replace(/[^0-9]/g, '');
    setOtp(value);
    if (value.length > 0) Haptics.selectionAsync();

    if (value.length === OTP_LENGTH) {
      Keyboard.dismiss();
    }
  };

  const handleVerify = () => {
    if (otp.length !== OTP_LENGTH) return;

    // Simulate verification check
    if (otp !== '1234') {
      // Example: 1234 is the "correct" code
      shake();
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(auth)/role-select');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <BackButton />
      <View style={styles.main}>
        <View style={styles.iconWrap}>
          <Ionicons name="lock-closed" size={36} color={COLORS.brand.primary} />
        </View>

        <Text style={styles.title}>{t('auth.verification_code')}</Text>
        <Text style={styles.subtitle}>
          {t('auth.otp_sent_to')}
          {'\n'}
          <Text style={styles.bold}>+1 805 *** 8947</Text>
        </Text>

        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          >
            <View style={styles.otpRow}>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const digit = otp[index];
                const isActive = index === otp.length;
                return (
                  <View
                    key={index}
                    style={[styles.otpBox, isActive && styles.otpActive]}
                  >
                    <Text style={styles.otpText}>{digit || ''}</Text>
                    {isActive && !digit && (
                      <Animated.View
                        style={[styles.cursor, { opacity: cursorOpacity }]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          style={styles.hiddenInput}
          textContentType="oneTimeCode"
        />

        <View style={styles.timerPill}>
          <Ionicons
            name="time-outline"
            size={14}
            color={COLORS.brand.primary}
          />
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>

        <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(117)}>
          <Text style={styles.resendText}>
            {t('auth.didnt_receive_otp')}
            <Text
              style={[
                styles.resendLink,
                timer > 0 && { color: COLORS.textLight },
              ]}
            >
              {' '}
              {t('auth.resend_otp')}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.verifyBtn,
            otp.length < OTP_LENGTH && { opacity: 0.5 },
          ]}
          onPress={handleVerify}
          disabled={otp.length < OTP_LENGTH}
        >
          <Text style={styles.verifyText}>{t('auth.verify_account')}</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  backWrap: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconWrap: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: COLORS.brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  bold: {
    fontWeight: '600',
    color: COLORS.text,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpActive: {
    backgroundColor: COLORS.brand.muted,
    borderWidth: 2,
    borderColor: COLORS.brand.primary,
  },
  otpText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.brand.primary,
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: COLORS.brand.primary,
  },
  timerPill: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: COLORS.brand.muted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  timerText: {
    color: COLORS.brand.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  resendText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  resendLink: {
    color: COLORS.brand.primary,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: COLORS.background,
    padding: 20,
    paddingBottom: 20, // Reset to standard padding to move it lower
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    width: '100%',
  },
  verifyBtn: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: COLORS.white,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verifyText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
