import { View, Text, ScrollView } from "react-native";
import GlobalSearchForm from "../../src/components/global-search/GlobalSearchForm";

export default function GlobalSearchShipmentScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-4 shadow-sm border-b border-gray-100 flex-row items-center">
          <Text className="text-gray-400 mr-2 text-sm font-medium">Home /</Text>
          <Text className="text-gray-900 text-md font-bold">
            Global Search Shipments
          </Text>
        </View>

        <View className="px-4 py-6">
          <GlobalSearchForm />
        </View>

        {/* Bottom Spacing for tabs */}
        <View className="h-40" />
      </ScrollView>
    </View>
  );
}
