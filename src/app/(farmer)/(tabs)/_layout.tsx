import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

/**
 * Farmer Tab Navigation Layout
 * Consolidates Home, Listings, Orders, and Profile into a persistent bottom bar.
 */
export default function FarmerTabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.brand.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('navigation.home'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="listings"
                options={{
                    title: t('dashboard.my_ads'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="campaign" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: t('dashboard.orders'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="receipt-long" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('navigation.profile'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="account-circle" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderFocus,
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '700',
    },
});
