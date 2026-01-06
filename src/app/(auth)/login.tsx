import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isValid = mobile.length === 10;

  useEffect(() => {
    inputRef.current?.focus();
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
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HERO */}
        <View style={styles.heroWrap}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Hq6kWROjPA6yyfJcZXrqhuCLJJCXalZLNcugCUGOGMs8HY6SuiVLitBM4ddxoeIRBkOO3GnWX-eUshxRePjWjxvgf9BCRmr8fZLh-iWz-wFVsutNQeYwK71t2AvnaFxmnmhcotAROTidx9h5J0bSwDOqPTHMKuHpSCtmqkhFtvvXqoMGgi82p3WeTZrxhEbrMIEX4izBxfV8usPFjHQDkRHiFzHJt4r3H_SvaR3BGD5B8x2hFQJAzl5o4Gh44ChXellIXhX_dKP3',
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            {/* Floating badge */}
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <MaterialIcons name="agriculture" size={18} color="#37ec13" />
              </View>
              <Text style={styles.badgeText}>AgriConnect</Text>
            </View>
          </ImageBackground>
        </View>

        {/* CARD */}
        <View style={styles.cardWrap}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Enter your mobile number to access your farming dashboard safely.
            </Text>

            {/* INPUT */}
            <View
              style={[
                styles.inputBox,
                focused && styles.inputFocused,
              ]}
            >
              <View style={styles.country}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.code}>+91</Text>
                <Ionicons name="chevron-down" size={16} color="#6b7280" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.label, (focused || mobile) && styles.labelActive]}>
                  Mobile Number
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
                />
              </View>

              {isValid && (
                <MaterialIcons
                  name="check-circle"
                  size={22}
                  color="#37ec13"
                  style={{ marginRight: 16 }}
                />
              )}
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.cta} onPress={()=>router.push("/otp")}>
              <View style={styles.ctaIcon}>
                <Ionicons name="lock-open" size={22} color="#000" />
              </View>
              <Text style={styles.ctaText}>GET OTP</Text>
            </TouchableOpacity>

            {/* REGISTER */}
            <Text style={styles.register}>
              New user? <Text style={styles.registerLink}>Register Here</Text>
            </Text>
          </View>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>SECURE FARMING NETWORK</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  container: {
    flex: 1,
  },
  heroWrap: {
    height: height * 0.45,
  },
  hero: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  heroImage: {
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  badge: {
    marginTop: 32,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  badgeIcon: {
    backgroundColor: 'rgba(55,236,19,0.2)',
    padding: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  badgeText: {
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardWrap: {
    flex: 1,
    marginTop: -64,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 24,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 28,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#f6f8f6',
    height: 72,
    marginBottom: 28,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#37ec13',
    backgroundColor: '#fff',
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    height: '100%',
  },
  flag: {
    fontSize: 22,
    marginRight: 6,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 26,
    fontSize: 16,
    color: '#9ca3af',
  },
  labelActive: {
    top: 10,
    fontSize: 12,
    color: '#37ec13',
    fontWeight: '700',
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    paddingTop: 28,
    paddingHorizontal: 16,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#37ec13',
    height: 68,
    borderRadius: 999,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  ctaIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 2,
    color: '#052e00',
    marginRight: 52,
  },
  register: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
  },
  registerLink: {
    fontWeight: '800',
    textDecorationLine: 'underline',
    color: '#111827',
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 3,
    color: '#9ca3af',
    marginBottom: 24,
  },
});
