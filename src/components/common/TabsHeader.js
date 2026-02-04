import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <View 
      style={{ paddingTop: Math.max(insets.top, 20) }}
      className="bg-white rounded-b-[40px] shadow-sm shadow-slate-200"
    >
      <View className="px-6 pb-6 pt-2 flex-row items-center justify-between">
        <View>
          <Text className="text-slate-900 text-2xl font-bold tracking-tight">Home</Text>
          <Text className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-0.5">Dashboard</Text>
        </View>

        {/* Profile Section */}
        <TouchableOpacity 
          activeOpacity={0.7}
          className="flex-row items-center gap-3"
          onPress={handleProfile}
        >
          <View className="items-end">
            <Text className="text-slate-900 text-sm font-bold tracking-tight">{user?.name || 'User'}</Text>
            <View className="flex-row items-center gap-1">
              <View className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active</Text>
            </View>
          </View>
          <View 
            className="w-11 h-11 bg-primary-600 rounded-2xl items-center justify-center border-2 border-white"
            style={{
              shadowColor: '#0176FF',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <Ionicons name="person" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
