import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const countries = [
  { code: 'US', name: 'USA', volume: '$2.4T', flag: '🇺🇸' },
  { code: 'CN', name: 'China', volume: '$3.1T', flag: '🇨🇳' },
  { code: 'IN', name: 'India', volume: '$1.8T', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', volume: '$1.5T', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', volume: '$1.2T', flag: '🇯🇵' },
];

const CountryVolumeTicker = () => {
  return (
    <View className="py-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
      >
        {countries.map((country, index) => (
          <Animated.View 
            key={country.code}
            entering={FadeIn.delay(index * 100).duration(500)}
            className="flex-row items-center bg-white/60 border border-slate-200 rounded-full px-4 py-2"
          >
            <Text className="text-lg mr-2">{country.flag}</Text>
            <View>
              <Text className="text-slate-900 font-bold text-xs">{country.name}</Text>
              <Text className="text-slate-500 text-[10px] font-medium">{country.volume}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CountryVolumeTicker;
