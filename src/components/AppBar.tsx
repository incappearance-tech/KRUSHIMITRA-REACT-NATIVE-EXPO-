import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colors';
import BackButton from './BackButton';

interface AppBarProps {
    title: string;
    onBackPress?: () => void;
    style?: ViewStyle;
}

export default function AppBar({ title, onBackPress, style }: AppBarProps) {
    return (
        <View style={[styles.appBar, style]}>
            <View style={styles.backButtonContainer}>
                <BackButton onPress={onBackPress} />
            </View>
            <Text style={styles.appBarTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appBar: {
        height: 65,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
    },
    backButtonContainer: {
        position: 'absolute',
        left: 1,
        zIndex: 10,
    },
    appBarTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },
});
