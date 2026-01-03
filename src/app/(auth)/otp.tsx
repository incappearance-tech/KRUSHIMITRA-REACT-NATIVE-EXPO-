import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OTP_LENGTH = 4;

export default function OtpScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [otp, setOtp] = useState('');

  // Open keyboard automatically on screen load
  useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleOtpChange = (text: string) => {
    const value = text.replace(/[^0-9]/g, '');
    setOtp(value);

    if (value.length === OTP_LENGTH) {
      Keyboard.dismiss(); // close keyboard
      // optional: navigate next
      router.replace('/(auth)/role-select');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backWrap}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Lock Icon */}
        <View style={styles.iconWrap}>
          <Ionicons name="lock-closed" size={36} color="#39D353" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Verification Code</Text>

        <Text style={styles.subtitle}>
          We have sent a 4-digit verification code to{'\n'}
          <Text style={styles.bold}>+1 805 *** 8947</Text>
        </Text>

        {/* OTP Boxes (Clickable) */}
        <TouchableOpacity activeOpacity={1} onPress={focusInput}>
          <View style={styles.otpRow}>
            {Array.from({ length: OTP_LENGTH }).map((_, index) => {
              const digit = otp[index];
              const isActive = index === otp.length;

              return (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    isActive && styles.otpActive,
                  ]}
                >
                  <Text style={styles.otpText}>
                    {digit || ''}
                  </Text>

                  {isActive && !digit && <View style={styles.cursor} />}
                </View>
              );
            })}
          </View>
        </TouchableOpacity>

        {/* Hidden Input */}
        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          style={styles.hiddenInput}
        />

        {/* Timer */}
        <View style={styles.timerPill}>
          <Ionicons name="time-outline" size={14} color="#39D353" />
          <Text style={styles.timerText}>01:57</Text>
        </View>

        {/* Resend */}
        <Text style={styles.resendText}>
          Didn’t receive the code?
          <Text style={styles.resendLink}> Resend Code</Text>
        </Text>

        {/* Verify Button (kept as-is, optional action) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.verifyBtn}>
            <Text style={styles.verifyText}>Verify Account</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FCFA',
  },

  statusBar: {
    paddingTop: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  time: { fontSize: 12 },

  statusIcons: {
    flexDirection: 'row',
    gap: 6,
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
    backgroundColor: 'rgba(57,211,83,0.12)',
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
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },

  bold: {
    fontWeight: '600',
    color: '#0f172a',
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
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpActive: {
    backgroundColor: 'rgba(57,211,83,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(57,211,83,0.4)',
  },

  otpText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#39D353',
  },

  cursor: {
    position: 'absolute',
    right: 30,
    top: 12,
    bottom: 12,
    width: 2,
    backgroundColor: '#39D353',
  },

  timerPill: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'rgba(57,211,83,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },

  timerText: {
    color: '#39D353',
    fontWeight: '600',
    fontSize: 13,
  },

  resendText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 24,
  },

  resendLink: {
    color: '#39D353',
    fontWeight: '600',
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: 24,
    width: '100%',
  },

  verifyBtn: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#39D353',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
