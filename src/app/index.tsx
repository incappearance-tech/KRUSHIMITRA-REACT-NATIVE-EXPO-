import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ width: 40 }} />
          <Text style={styles.headerTitle}>AgriConnect</Text>
          <TouchableOpacity>
            <Ionicons name="language" size={24} color="#101b0d" />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          {/* HERO */}
          <View style={styles.heroWrapper}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZtsddcU1SSAAdF5R6Ce9976Fh-SW6TlpuIPmvWFOlwGMoLA_-7oHCQ-uzbVZoO5xKnCL_KDonSNEeYI1ZY9cTCTC08tkUYW__9LQ3g9gRxxRCmf1Tj4EtMSetn3OhfojrtXwFhWZFjRc6dwXJspWRpguguSdE1FTMONVtgIgbZM0paY5xX9KMjNdXAKSlwPiV_ZnKYPcGtbDt7dWIW8dDm80GhgFpw8nj_IrKGl3Kv2w6rJdMl4n1lpSDF-SxN-xzocDi-z-4yda',
              }}
              style={styles.hero}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay} />
              <View style={styles.betaBadge}>
                <Text style={styles.betaText}>Beta v1.0</Text>
              </View>
            </ImageBackground>
          </View>

          {/* HEADLINE */}
          <View style={styles.headline}>
            <Text style={styles.headlineTitle}>
              Connecting Farms{'\n'}to Markets
            </Text>
            <Text style={styles.headlineSub}>
              The all-in-one platform for farmers, laborers, and transporters to
              work better, together.
            </Text>
          </View>

          {/* BENEFITS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.benefitsRow}
          >
            {BENEFITS.map((b, i) => (
              <View key={i} style={styles.benefitCard}>
                <Image source={{ uri: b.image }} style={styles.benefitImage} />
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.description}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>

        {/* STICKY FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace('/(auth)/language')}
          >
            <Text style={styles.primaryText}>Get Started</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.footerLink}>Log in</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const BENEFITS = [
  {
    title: 'Find Work',
    description: 'Locate jobs nearby effortlessly',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NVKu32EmTHgxHZ2Piwon2BqeJKpjnlB69YKcYNduXbkuAR8MdywmZ36AjpAgmyVXNwxDlHC6M1TZQS3ErxCFS1dr-O_kZkXCPJbqvmAoX3Vo2UzxoxzDsg1xL0AnQct1vlh0zZC8y3cLh1Rcbh34atG6aRqb8gm0wCGmArpoASSA2P39WRh6MSGsBAaBkxE905By9AX-uF3WYF5sL41HqEu3VUF-Sm3L8IK2L8Wsbhac0HtCrjUWcM0pRpVj0Mprt23YvdsD3k_w',
  },
  {
    title: 'Hire Help',
    description: 'Find reliable workers quickly',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOx4UhiNrnjez-BnoMImVvmUTsNbDZjSycNWBsDtWyONdr9sbYxIaue_TlFwi9advVBxTIsXIfvKmyHDy4tlgP9YrgZTluFDQuCyxvhHQyz6Lffpv73yvo0xuPJAsKoNJNwbE-rrm3APc1tr6NOWOUHJtjj0RX3d0QEAVztqtJCkhA1iLxJhlv27UCgcTkzXrU1cyaGJAFRvTLNEVQ5n8u29aUmC2wOJnm9DFb-5-wRE8fnkrqY1gH3T2G9ZvE1uz-o6k1KZWVg9s3',
  },
  {
    title: 'Transport',
    description: 'Move produce efficiently',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OQ05eD2slEL4HORSH6wrTZVHTXxtCWi1v4hK8_A2USzOK2YGCkgQgSSidsjcbu2_9V2E3PRkt9ni8KH4wKbLAmS_PND3k_MwCvgqhoTjL_Mp2ohlnhswoMsSLsubOhZE6xa9vZMQPBMfoui8I-jpE5D-jCnNwJi3_ZO3TY3zMxJy2jtPELQOxCPK4V6sbCwD6MhmYfkHlCOM-9H1J6HbabNRpC_4oYXvMRRJVLAcCpnoWvMzdzrxXEasPl5_eSK_sXE4VjmwGmoR',
  },
];

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  container: {
    flex: 1,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f8f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  heroWrapper: {
    paddingHorizontal: 16,
  },
  hero: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 16,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  betaBadge: {
    margin: 16,
    backgroundColor: '#37ec13',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  betaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headline: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  headlineTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  headlineSub: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
  benefitsRow: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  benefitCard: {
    width: 160,
  },
  benefitImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  benefitDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#f6f8f6',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#37ec13',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    fontWeight: '700',
    color: '#111827',
  },
});
