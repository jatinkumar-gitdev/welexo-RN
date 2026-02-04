import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue,
  interpolateColor 
} from 'react-native-reanimated';

const TradeSearchBox = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  
  const focusAnim = useSharedValue(0);

  React.useEffect(() => {
    focusAnim.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        focusAnim.value,
        [0, 1],
        ['#E2E8F0', '#0176FF']
      ),
      borderWidth: 1.5,
      shadowOpacity: withTiming(isFocused ? 0.1 : 0.05),
      transform: [{ scale: withTiming(isFocused ? 1.02 : 1) }]
    };
  });

  return (
    <View className="w-full">
      <Animated.View 
        style={[animatedStyle]}
        className="flex-row items-center bg-white h-[60px] rounded-2xl px-4 shadow-sm shadow-slate-200"
      >
        <Ionicons 
          name="search" 
          size={22} 
          color={isFocused ? '#0176FF' : '#94A3B8'} 
        />
        
        <TextInput
          className="flex-1 ml-3 text-base text-slate-800 font-medium h-full"
          placeholder="Search by HS Code, Product, Company..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={() => onSearch && onSearch(query)}
        />

        {query.length > 0 && (
          <TouchableOpacity 
            onPress={() => setQuery('')}
            className="p-1 rounded-full bg-slate-100"
          >
            <Ionicons name="close" size={16} color="#64748B" />
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {/* Quick Suggestions / Tags */}
      <View className="flex-row gap-2 mt-3 flex-wrap">
        {['HS Code 6109', 'Cotton Yarn', 'Top Exporters'].map((tag, index) => (
          <TouchableOpacity 
            key={index}
            className="bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200"
            onPress={() => setQuery(tag)}
          >
            <Text className="text-xs text-slate-600 font-medium">{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TradeSearchBox;
