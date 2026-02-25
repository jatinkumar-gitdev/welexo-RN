import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ChartCard, { MetricBadge } from "../../common/ChartCard";
import { tradeValueData, chartConfig } from "../../../constants/chartData";

const screenWidth = Dimensions.get("window").width;

export default function TradeTrendChart() {
  return (
    <ChartCard title="Trade Value Trends" subtitle="Financial Year 2025-2026">
      <LineChart
        data={tradeValueData}
        width={screenWidth - 60}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        segments={4}
        withShadow={true}
        yAxisLabel="$"
        yAxisSuffix="M"
      />
    </ChartCard>
  );
}
