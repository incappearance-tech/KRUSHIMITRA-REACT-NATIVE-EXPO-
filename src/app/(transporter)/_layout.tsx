import { Stack } from 'expo-router';
import React from 'react';

export default function TransporterLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        />
    );
}
