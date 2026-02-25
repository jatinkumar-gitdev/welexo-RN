import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ChartCard from '../../common/ChartCard';
import { monthlyComparisonData, barChartConfig } from '../../../constants/chartData';

const screenWidth = Dimensions.get('window').width;

export default function MonthlyComparisonChart() {
  return (
    <ChartCard
      title="Monthly Trade Comparison"
      subtitle="Last 6 Months Performance"
    >
      <BarChart
        data={monthlyComparisonData}
        width={screenWidth - 80}
        height={220}
        chartConfig={barChartConfig}
        style={{ borderRadius: 16 }}
        showValuesOnTopOfBars={true}
        fromZero={true}
        withInnerLines={false}
        yAxisLabel="$"
        yAxisSuffix="K"
      />
      
      <View className="mt-4 bg-green-50 rounded-2xl p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-700 font-semibold">Average Growth</Text>
          <Text className="text-green-600 text-lg font-bold">↗ 15.2%</Text>
        </View>
      </View>
    </ChartCard>
  );
}
