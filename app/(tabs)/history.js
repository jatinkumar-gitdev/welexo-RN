import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ChartCard from '../../src/components/common/ChartCard';
import CustomRefreshHeader from '../../src/components/common/CustomRefreshHeader';
import { SkeletonHistoryScreen } from '../../src/components/common/SkeletonLoader';
import { historicalTradeData, recentTrades, chartConfig } from '../../src/constants/chartData';

const screenWidth = Dimensions.get('window').width;

export default function HistoryScreen() {
  const [filter, setFilter] = useState('all'); // all, export, import
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
      console.log('History data refreshed!');
    }, 2000);
  }, []);

  const filteredTrades = recentTrades.filter(trade => {
    const matchesFilter = filter === 'all' || trade.type === filter;
    const matchesSearch = trade.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trade.hsCode.includes(searchQuery) ||
                         trade.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-transit': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <CustomRefreshHeader refreshing={refreshing} />
      
      {loading ? (
        <ScrollView className="flex-1">
          <SkeletonHistoryScreen />
        </ScrollView>
      ) : (
        <ScrollView 
          className="flex-1"
          overScrollMode="always"
          bounces={true}
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="transparent"
              colors={['transparent']}
              progressBackgroundColor="transparent"
            />
          }
        >
      {/* Header */}
      <View className="bg-white px-6 pt-16 pb-6 rounded-b-3xl shadow-sm">
        <Text className="text-gray-900 text-2xl font-bold mb-2">Trade History</Text>
        <Text className="text-gray-500 text-sm">Track your import/export transactions</Text>
      </View>

      <View className="px-6 py-6">
        {/* Historical Timeline Chart */}
        <ChartCard
          title="12-Month Trade Timeline"
          subtitle="Total trade value over time"
        >
          <LineChart
            data={historicalTradeData}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 16,
            }}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            fromZero={true}
            segments={4}
          />
        </ChartCard>

        {/* Filter Tabs */}
        <View className="flex-row gap-3 mb-4">
          <TouchableOpacity
            onPress={() => setFilter('all')}
            className={`flex-1 py-3 rounded-2xl ${filter === 'all' ? 'bg-blue-600' : 'bg-white'}`}
          >
            <Text className={`text-center font-semibold ${filter === 'all' ? 'text-white' : 'text-gray-700'}`}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setFilter('export')}
            className={`flex-1 py-3 rounded-2xl ${filter === 'export' ? 'bg-orange-500' : 'bg-white'}`}
          >
            <Text className={`text-center font-semibold ${filter === 'export' ? 'text-white' : 'text-gray-700'}`}>
              Export
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setFilter('import')}
            className={`flex-1 py-3 rounded-2xl ${filter === 'import' ? 'bg-blue-500' : 'bg-white'}`}
          >
            <Text className={`text-center font-semibold ${filter === 'import' ? 'text-white' : 'text-gray-700'}`}>
              Import
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-2xl px-4 py-3 mb-4 flex-row items-center">
          <FontAwesome5 name="search" size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search by product, HS code, or country..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-gray-700"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Trade List */}
        <View className="bg-white rounded-3xl p-4 mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-4">Recent Transactions</Text>
          
          {filteredTrades.map((trade, index) => (
            <TouchableOpacity
              key={trade.id}
              className={`p-4 rounded-2xl mb-3 ${trade.type === 'export' ? 'bg-orange-50' : 'bg-blue-50'}`}
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold text-base">{trade.product}</Text>
                  <Text className="text-gray-600 text-xs mt-1">HS Code: {trade.hsCode}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${getStatusColor(trade.status)}`}>
                  <Text className="text-xs font-semibold capitalize">{trade.status}</Text>
                </View>
              </View>
              
              <View className="flex-row justify-between items-center mt-2">
                <View className="flex-row items-center">
                  <FontAwesome5 
                    name="flag" 
                    size={12} 
                    color={trade.type === 'export' ? '#F59E0B' : '#0176FF'} 
                  />
                  <Text className="text-gray-600 text-sm ml-2">{trade.country}</Text>
                </View>
                
                <View className="flex-row items-center gap-4">
                  <Text className="text-gray-500 text-xs">{trade.date}</Text>
                  <Text className="text-gray-900 font-bold">{trade.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {/* Empty State */}
          {filteredTrades.length === 0 && (
            <View className="items-center justify-center py-12">
              <FontAwesome5 name="inbox" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 text-base mt-4">No transactions found</Text>
            </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </View>
    </ScrollView>
      )}
    </View>
  );
}
