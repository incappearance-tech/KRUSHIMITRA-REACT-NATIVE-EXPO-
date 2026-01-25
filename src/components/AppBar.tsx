import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IAppBarProps } from '@/src/types/components/AppBar';

import { COLORS } from '../constants/colors';
import BackButton from './BackButton';

interface ExtendedAppBarProps extends IAppBarProps {
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
}

export default function AppBar({
  title,
  onBackPress,
  style,
  rightIcon,
  onRightPress,
}: ExtendedAppBarProps) {
  return (
    <View style={[styles.appBar, style]}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={onBackPress} />
      </View>
      <Text style={styles.appBarTitle}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity
          style={styles.rightButtonContainer}
          onPress={onRightPress}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
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
  rightButtonContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
