import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function ChartCard({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  onMenuPress,
  className = '',
}) {
  return (
    <View className={`bg-white rounded-3xl p-5 mb-6 shadow-sm border border-gray-100 ${className}`}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-bold tracking-tight">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 text-xs mt-1 font-medium">{subtitle}</Text>
          )}
        </View>
        {onMenuPress && (
          <TouchableOpacity onPress={onMenuPress} className="w-8 h-8 items-end justify-center">
            <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator size="large" color="#0176FF" />
          <Text className="text-gray-500 text-sm mt-3">Loading chart...</Text>
        </View>
      ) : error ? (
        <View className="items-center justify-center py-12">
          <FontAwesome5 name="exclamation-circle" size={32} color="#EF4444" />
          <Text className="text-gray-600 text-sm mt-3">{error}</Text>
        </View>
      ) : (
        children
      )}
    </View>
  );
}

/**
 * ChartLegend - Reusable legend component for charts
 */
export function ChartLegend({ items }) {
  return (
    <View className="flex-row flex-wrap justify-center mt-4 gap-4">
      {items.map((item, index) => (
        <View key={index} className="flex-row items-center">
          <View
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: item.color }}
          />
          <Text className="text-gray-600 text-xs">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * MetricBadge - Shows a metric value with icon
 */
export function MetricBadge({ value, label, icon, color = '#0176FF' }) {
  return (
    <View className="items-center">
      <View
        className="px-6 py-3 rounded-2xl"
        style={{ backgroundColor: color }}
      >
        <Text className="text-white text-xl font-bold">{value}</Text>
      </View>
      {label && (
        <Text className="text-gray-500 text-xs mt-2 uppercase tracking-wide">
          {label}
        </Text>
      )}
    </View>
  );
}
