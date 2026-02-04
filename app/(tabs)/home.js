import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// Components
import TradeSearchBox from '../../src/components/home/TradeSearchBox';
import MarketTrendCard from '../../src/components/home/MarketTrendCard';
import CountryVolumeTicker from '../../src/components/home/CountryVolumeTicker';

const DataUpdateItem = ({ title, category, date, records }) => (
  <View className="flex-row items-center justify-between py-4 border-b border-slate-100 last:border-0">
    <View className="flex-row items-center gap-4 flex-1">
      <View className="w-10 h-10 bg-primary-50 rounded-full items-center justify-center">
        <Ionicons name="document-text-outline" size={20} color="#0176FF" />
      </View>
      <View>
        <Text className="text-slate-900 font-bold text-sm">{title}</Text>
        <Text className="text-slate-500 text-xs">{category} • {records} Records</Text>
      </View>
    </View>
    <View className="items-end">
      <View className="bg-slate-100 px-2 py-1 rounded-md mb-1">
         <Text className="text-slate-600 font-bold text-[10px] uppercase">New</Text>
      </View>
      <Text className="text-slate-400 text-[10px]">{date}</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#0176FF" />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-white" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* ===== HEADER SECTION ===== */}
      <View className="bg-white px-6 pt-14 pb-6 rounded-b-[32px] shadow-sm shadow-slate-200 z-10">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Market Intelligence</Text>
            <Text className="text-slate-900 text-2xl font-bold tracking-tight">Trade Data Hub</Text>
          </View>
          <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center border border-slate-200">
             <Image 
                source={require('../../assets/logo/welexo.png')} 
                className="w-6 h-6 opacity-80" 
                resizeMode="contain" 
            />
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TradeSearchBox onSearch={(q) => console.log('Searching for:', q)} />
        </Animated.View>
      </View>

      {/* ===== MARKET TRENDS ===== */}
      <View className="px-6 mt-8">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-slate-900 text-lg font-bold">Market Trends</Text>
          <Text className="text-primary-500 text-xs font-bold">Real-time Updates</Text>
        </View>
        
        <View className="flex-row gap-3">
          <MarketTrendCard 
            title="Cotton Imports" 
            value="2.4M Tons" 
            change="+12.4%" 
            isPositive={true} 
            delay={300}
          />
          <MarketTrendCard 
            title="Steel Exports" 
            value="850K Tons" 
            change="-4.2%" 
            isPositive={false} 
            delay={400}
          />
        </View>
      </View>

      {/* ===== TOP TRADING PARTNERS ===== */}
      <View className="mt-8">
        <Text className="px-6 text-slate-900 text-lg font-bold mb-2">Top Trading Partners</Text>
        <CountryVolumeTicker />
      </View>

      {/* ===== LATEST DATA UPDATES ===== */}
      <Animated.View 
        entering={FadeInUp.delay(600).duration(600)}
        className="mx-6 mt-6 bg-white rounded-[24px] p-5 shadow-sm shadow-slate-200 border border-slate-100"
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-slate-900 font-bold text-base">Latest Data Updates</Text>
          <Pressable>
            <Ionicons name="arrow-forward-circle" size={24} color="#0176FF" />
          </Pressable>
        </View>

        <DataUpdateItem 
          title="US Import Data"
          category="Customs Data"
          records="1.2M+"
          date="Updated Today"
        />
        <DataUpdateItem 
          title="India Export Bills"
          category="Port Data"
          records="850k+"
          date="Updated Yesterday"
        />
        <DataUpdateItem 
          title="China Trade Balance"
          category="Macro Reports"
          records="Report"
          date="2 days ago"
        />
        
        <Pressable className="mt-4 bg-slate-50 py-3 rounded-xl items-center border border-slate-100">
          <Text className="text-slate-500 font-bold text-xs uppercase tracking-wider">Access Full Database</Text>
        </Pressable>
      </Animated.View>

    </ScrollView>
  );
}
