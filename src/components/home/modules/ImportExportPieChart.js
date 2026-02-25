import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ChartCard from '../../common/ChartCard';
import { importExportData, pieChartConfig } from '../../../constants/chartData';

const screenWidth = Dimensions.get('window').width;

export default function ImportExportPieChart() {
  return (
    <ChartCard
      title="Import/Export Distribution"
      subtitle="Total Trade Value: $330K"
    >
      <View className="items-center">
        <PieChart
          data={importExportData}
          width={screenWidth - 80}
          height={220}
          chartConfig={pieChartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={(screenWidth - 80) / 4}
          absolute
          hasLegend={false}
        />
      </View>

      <View className="flex-row justify-around mt-6">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mr-3">
            <Text className="text-orange-600 text-lg">↗</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Export</Text>
            <Text className="text-gray-900 text-xl font-bold">65%</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mr-3">
            <Text className="text-blue-600 text-lg">↙</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Import</Text>
            <Text className="text-gray-900 text-xl font-bold">35%</Text>
          </View>
        </View>
      </View>
    </ChartCard>
  );
}
