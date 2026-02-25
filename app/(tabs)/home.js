import React, { useState, useCallback, useEffect } from "react";
import { View, Text, RefreshControl, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import StatsCard from "../../src/components/home/StatsCard";
import CustomRefreshHeader from "../../src/components/common/CustomRefreshHeader";
import { SkeletonHomeScreen } from "../../src/components/common/SkeletonLoader";

// Import Chart Modules
import TradeTrendChart from "../../src/components/home/modules/TradeTrendChart";
import ImportExportPieChart from "../../src/components/home/modules/ImportExportPieChart";
import MonthlyComparisonChart from "../../src/components/home/modules/MonthlyComparisonChart";
import CompanyValueDonutChart from "../../src/components/home/modules/CompanyValueDonutChart";
import QuickSummaryCard from "../../src/components/home/modules/QuickSummaryCard";

const SECTIONS = [
  { id: "header", type: "header" },
  { id: "stats", type: "stats" },
  { id: "chart-trends", type: "chart-trends" },
  { id: "chart-pie", type: "chart-pie" },
  { id: "chart-bar", type: "chart-bar" },
  { id: "chart-donut", type: "chart-donut" },
  { id: "summary", type: "summary" },
  { id: "spacing", type: "spacing" },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const skeletonOpacity = useSharedValue(1);
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      skeletonOpacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(setIsSkeletonVisible)(false);
        }
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Show skeleton immediately for refresh
    setIsSkeletonVisible(true);
    skeletonOpacity.value = 1;

    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);

      // Fade out skeleton
      skeletonOpacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(setIsSkeletonVisible)(false);
        }
      });
      console.log("Data refreshed!");
    }, 2000);
  }, []);

  const renderItem = useCallback(({ item }) => {
    switch (item.type) {
      case "header":
        return (
          <View className="px-6 pt-2 pb-4">
            <View className="flex-row items-end justify-between">
              <View>
                <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                  Overview
                </Text>
                <Text className="text-gray-900 text-3xl font-bold">
                  Dashboard
                </Text>
              </View>
              <View className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <Text className="text-emerald-600 text-sm font-semibold">
                  {new Date().toDateString()}
                </Text>
              </View>
            </View>
          </View>
        );

      case "stats":
        return (
          <View className="px-6 py-2">
            <StatsCard />
          </View>
        );

      case "chart-trends":
        return (
          <View className="px-6">
            <TradeTrendChart />
          </View>
        );

      case "chart-pie":
        return (
          <View className="px-6">
            <ImportExportPieChart />
          </View>
        );

      case "chart-bar":
        return (
          <View className="px-6">
            <MonthlyComparisonChart />
          </View>
        );

      case "chart-donut":
        return (
          <View className="px-6">
            <CompanyValueDonutChart />
          </View>
        );

      case "summary":
        return (
          <View className="px-6">
            <QuickSummaryCard />
          </View>
        );

      case "spacing":
        return <View className="h-24" />;

      default:
        return null;
    }
  }, []);

  const skeletonStyle = useAnimatedStyle(() => {
    return {
      opacity: skeletonOpacity.value,
    };
  });

  return (
    <View className="flex-1 bg-gray-50 relative">
      <CustomRefreshHeader refreshing={refreshing} />

      {/* Real Content - Always rendered behind skeleton initially */}
      <FlashList
        data={SECTIONS}
        renderItem={renderItem}
        estimatedItemSize={250}
        keyExtractor={(item) => item.id}
        overScrollMode="always"
        bounces={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
            colors={["transparent"]}
            progressBackgroundColor="transparent"
          />
        }
      />

      {/* Skeleton Overlay */}
      {isSkeletonVisible && (
        <Animated.View
          style={[StyleSheet.absoluteFill, skeletonStyle]}
          pointerEvents="none"
        >
          <View className="flex-1 bg-gray-50">
            <SkeletonHomeScreen />
          </View>
        </Animated.View>
      )}
    </View>
  );
}
