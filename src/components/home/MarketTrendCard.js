import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';

const MarketTrendCard = ({ title, value, change, isPositive, delay = 0 }) => {
  return (
    <Animated.View 
      entering={FadeInRight.delay(delay).duration(600).springify()}
      className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200 min-w-[150px]"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${
          isPositive ? 'bg-emerald-50' : 'bg-red-50'
        }`}>
          <Ionicons 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={20} 
            color={isPositive ? '#10B981' : '#EF4444'} 
          />
        </View>
        <View className={`px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-100' : 'bg-red-100'
        }`}>
          <Text className={`text-[10px] font-bold ${
            isPositive ? 'text-emerald-700' : 'text-red-700'
          }`}>
            {change}
          </Text>
        </View>
      </View>
      
      <Text className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
        {title}
      </Text>
      <Text className="text-slate-900 text-xl font-bold tracking-tight">
        {value}
      </Text>
    </Animated.View>
  );
};

export default MarketTrendCard;
