import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings Section</Text>
    </View>
  );
}
