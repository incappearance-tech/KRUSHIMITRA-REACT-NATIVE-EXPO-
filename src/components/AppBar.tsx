import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import BackButton from './BackButton';

import { IAppBarProps } from '@/src/types/components/AppBar';

export default function AppBar({ title, onBackPress, style }: IAppBarProps) {
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
