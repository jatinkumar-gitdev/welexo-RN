import { View, Text, Pressable, Platform } from "react-native";
import { STATS_DATA } from "../../constants/statsData";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

function Card({ item, index }) {
  if (!item || !item.Icon) return null;
  const Icon = item.Icon;
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.05, { damping: 15, stiffness: 200 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1">
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={animatedStyle}>
          {/* ENHANCED CARD WITH GRADIENT BORDER */}
          <View className="bg-white h-auto rounded-2xl px-3 py-4 shadow-sm border border-gray-100">
            <View className="flex-1 justify-between">
              {/* Icon with gradient background */}
              <View
                className={`w-12 h-12 mb-3 ${item.iconBg} rounded-xl items-center justify-center shadow-sm`}
              >
                <Icon name={item.name} size={20} color="#111827" />
              </View>

              {/* Text */}
              <View>
                <Text
                  numberOfLines={1}
                  className="text-gray-900 text-base font-semibold"
                >
                  {item.value}
                </Text>
                <Text
                  numberOfLines={2}
                  className="text-gray-500 text-[9px] uppercase font-semibold mt-1"
                >
                  {item.label}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default function StatsCard() {
  if (!STATS_DATA || STATS_DATA.length < 6) return null;

  return (
    <View className="px-2 mb-2">
      {/* ROW 1 */}
      <View className="flex-row gap-3 mb-3">
        <Card item={STATS_DATA[0]} index={0} />
        <Card item={STATS_DATA[1]} index={1} />
        <Card item={STATS_DATA[2]} index={2} />
      </View>

      {/* ROW 2 */}
      <View className="flex-row gap-3 mb-5">
        <Card item={STATS_DATA[3]} index={3} />
        <Card item={STATS_DATA[4]} index={4} />
        <Card item={STATS_DATA[5]} index={5} />
      </View>
    </View>
  );
}
