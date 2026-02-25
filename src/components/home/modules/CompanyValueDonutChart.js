import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ChartCard, { ChartLegend } from '../../common/ChartCard';
import { categoryDistributionData, pieChartConfig } from '../../../constants/chartData';

const screenWidth = Dimensions.get('window').width;

export default function CategoryDonutChart() {
  const chartSize = 220;
  // Dynamic padding to center the chart since legend is hidden
  const chartWidth = screenWidth - 80;
  const paddingLeft = (chartWidth) / 4;

  return (
    <ChartCard
      title="Company Total Value"
      subtitle="Product Category Breakdown"
    >
      <View className="items-center justify-center relative" style={{ height: chartSize }}>
        <PieChart
          data={categoryDistributionData}
          width={chartWidth}
          height={chartSize}
          chartConfig={pieChartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={paddingLeft}
          center={[0, 0]}
          absolute={false}
          hasLegend={false}
        />
        
        {/* Donut Hole & Center Text */}
        <View 
          className="absolute bg-white rounded-full items-center justify-center shadow-sm"
          style={{
            width: 120,
            height: 120,
            // Center is calculated based on container
            left: (chartWidth - 120) / 2,     
            top: (chartSize - 120) / 2
          }}
        >
          <Text className="text-gray-400 text-xs font-medium mb-1">Total Value</Text>
          <Text className="text-blue-600 text-2xl font-bold">350.5K</Text>
        </View>
      </View>

      <View className="mt-6">
        <ChartLegend items={categoryDistributionData.map(item => ({
          label: item.name,
          color: item.color
        }))} />
      </View>
    </ChartCard>
  );
}
