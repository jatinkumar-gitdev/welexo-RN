import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  const [hsCode, setHsCode] = useState('');
  const [recentScans, setRecentScans] = useState([
    { id: 1, code: '8542.31', product: 'Electronic Components', date: '2026-02-09' },
    { id: 2, code: '5208.12', product: 'Cotton Fabric', date: '2026-02-08' },
    { id: 3, code: '3004.90', product: 'Pharmaceutical Products', date: '2026-02-07' },
    { id: 4, code: '8479.89', product: 'Industrial Machinery', date: '2026-02-06' },
  ]);

  const handleSearch = () => {
    if (hsCode.trim()) {
      // Add to recent scans
      const newScan = {
        id: Date.now(),
        code: hsCode,
        product: 'Product Details',
        date: new Date().toISOString().split('T')[0],
      };
      setRecentScans([newScan, ...recentScans.slice(0, 9)]);
      setHsCode('');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-16 pb-6 rounded-b-3xl shadow-sm">
        <Text className="text-gray-900 text-2xl font-bold mb-2">HS Code Scanner</Text>
        <Text className="text-gray-500 text-sm">Search products by HS code</Text>
      </View>

      <View className="px-6 py-6">
        {/* Scanner Card */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          {/* Camera Scanner Placeholder */}
          <View className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 mb-6 items-center justify-center" style={{ height: 250 }}>
            <View className="w-48 h-48 border-4 border-white border-dashed rounded-3xl items-center justify-center">
              <FontAwesome5 name="qrcode" size={64} color="white" />
              <Text className="text-white text-sm mt-4 font-semibold">Camera Scanner</Text>
              <Text className="text-blue-100 text-xs mt-2">Coming Soon</Text>
            </View>
          </View>

          <View className="items-center mb-4">
            <Text className="text-gray-500 text-sm">or</Text>
          </View>

          {/* Manual Input */}
          <View>
            <Text className="text-gray-700 font-semibold mb-3">Enter HS Code Manually</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
                <FontAwesome5 name="barcode" size={18} color="#6B7280" />
                <TextInput
                  placeholder="e.g., 8542.31"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-gray-700 text-base"
                  value={hsCode}
                  onChangeText={setHsCode}
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                onPress={handleSearch}
                className="bg-blue-600 rounded-2xl px-6 items-center justify-center"
                activeOpacity={0.8}
              >
                <FontAwesome5 name="search" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-3xl p-4 mb-6 shadow-sm">
          <Text className="text-gray-900 text-lg font-bold mb-4">Quick Actions</Text>
          
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-purple-50 rounded-2xl p-4 items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                <FontAwesome5 name="book" size={20} color="#8B5CF6" />
              </View>
              <Text className="text-gray-700 text-xs font-semibold text-center">HS Code Directory</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-green-50 rounded-2xl p-4 items-center">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <FontAwesome5 name="star" size={20} color="#10B981" />
              </View>
              <Text className="text-gray-700 text-xs font-semibold text-center">Saved Codes</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-orange-50 rounded-2xl p-4 items-center">
              <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                <FontAwesome5 name="history" size={20} color="#F59E0B" />
              </View>
              <Text className="text-gray-700 text-xs font-semibold text-center">Recent Scans</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Scans */}
        <View className="bg-white rounded-3xl p-4 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 text-lg font-bold">Recent Scans</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          {recentScans.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              className="flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl mb-3"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-3">
                  <FontAwesome5 name="box" size={18} color="#0176FF" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold">{scan.code}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{scan.product}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs">{scan.date}</Text>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View className="bg-blue-50 rounded-3xl p-5 mb-6">
          <View className="flex-row items-start">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="information-circle" size={24} color="#0176FF" />
            </View>
            <View className="flex-1">
              <Text className="text-blue-900 font-bold mb-2">What is an HS Code?</Text>
              <Text className="text-blue-700 text-sm leading-5">
                The Harmonized System (HS) Code is a standardized numerical method of classifying traded products. It's used by customs authorities worldwide to identify products for taxation and regulation.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </View>
    </ScrollView>
  );
}
