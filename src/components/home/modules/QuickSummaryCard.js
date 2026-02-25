import React from 'react';
import { View, Text } from 'react-native';

export default function QuickSummaryCard() {
  return (
    <View className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 mb-6">
      <Text className="text-white text-lg font-bold mb-4">Quick Summary</Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-100 text-sm">Total Transactions</Text>
          <Text className="text-white text-lg font-bold">1,247</Text>
        </View>
        
        <View className="h-px bg-blue-400" />
        
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-100 text-sm">Active Partners</Text>
          <Text className="text-white text-lg font-bold">156</Text>
        </View>
        
        <View className="h-px bg-blue-400" />
        
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-100 text-sm">Pending Shipments</Text>
          <Text className="text-white text-lg font-bold">23</Text>
        </View>
      </View>
    </View>
  );
}
