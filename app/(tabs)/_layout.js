import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
  interpolate,
  Extrapolate,
  useSharedValue,
  withSequence,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import { View, Dimensions, Pressable, Platform, StyleSheet } from 'react-native';
import TabsHeader from '../../src/components/common/TabsHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

// Design System Constants - Polished Pro Tokens
const DESIGN_TOKENS = {
  barWidth: width * 0.92,
  barHeight: 70,
  barRadius: 40,
  tabSpacing: 6,
  
  background: {
    primary: '#0F172A', // Deep Slate
    secondary: '#1E293B', // Border/Highlight
    accent: '#0176FF', // Welexo Blue
    accentGlow: 'rgba(1, 118, 255, 0.4)',
    accentFaded: 'rgba(1, 118, 255, 0.1)',
  },
  
  text: {
    active: '#FFFFFF',
    inactive: '#94A3B8',
  },

  springs: {
    pro: { damping: 18, stiffness: 120, mass: 0.6 }, // Snappy but organic
    soft: { damping: 25, stiffness: 100 },
    bounce: { damping: 12, stiffness: 200 },
  }
};

const TAB_WIDTH = (DESIGN_TOKENS.barWidth - (DESIGN_TOKENS.tabSpacing * 2)) / 5;

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  
  const indicatorPosition = useDerivedValue(() => {
    return withSpring(state.index * TAB_WIDTH, DESIGN_TOKENS.springs.pro);
  });

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value + DESIGN_TOKENS.tabSpacing }],
  }));

  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 20) }]}>
      <View style={styles.tabBar}>
        {/* Active Ambient Glow */}
        <Animated.View style={[styles.glow, glowStyle]} />
        

        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const isCenter = index === 2;

            const onPress = () => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }

              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconMap = {
              home: 'home',
              history: 'time',
              scan: 'globe',
              settings: 'settings',
              profile: 'person',
            };

            return (
              <TabButton
                key={route.key}
                isFocused={isFocused}
                isCenter={isCenter}
                onPress={onPress}
                iconName={iconMap[route.name] || 'circle'}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TabButton({ isFocused, isCenter, onPress, iconName }) {
  const scale = useSharedValue(1);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isCenter) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ),
        -1,
        true
      );
    }
  }, [isCenter]);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, DESIGN_TOKENS.springs.bounce);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, DESIGN_TOKENS.springs.pro);
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const centerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * (isFocused ? 1.05 : 1) }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.1], [0.3, 0], Extrapolate.CLAMP),
  }));

  if (isCenter) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.centerWrapper}
      >
        <Animated.View style={[styles.centerButton, centerAnimStyle]}>
          <Ionicons name={iconName} size={32} color="#FFFFFF" />
          
          {/* Animated Pulse Ring */}
          <Animated.View style={[styles.pulseRing, pulseStyle]} />
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabButton}
    >
      <Animated.View style={[styles.buttonInner, animStyle]}>
        <Ionicons
          name={isFocused ? iconName : `${iconName}-outline`}
          size={24}
          color={isFocused ? DESIGN_TOKENS.text.active : DESIGN_TOKENS.text.inactive}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    width: DESIGN_TOKENS.barWidth,
    height: DESIGN_TOKENS.barHeight,
    backgroundColor: DESIGN_TOKENS.background.primary,
    borderRadius: DESIGN_TOKENS.barRadius,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: DESIGN_TOKENS.background.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_TOKENS.tabSpacing,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: DESIGN_TOKENS.background.accent,
    borderRadius: 30,
    top: -24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: DESIGN_TOKENS.background.primary,
    shadowColor: DESIGN_TOKENS.background.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  pulseRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: DESIGN_TOKENS.background.accent,
  },
  glow: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: 40,
    backgroundColor: DESIGN_TOKENS.background.accentFaded,
    borderRadius: 20,
    top: 15,
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          header: () => <TabsHeader />, 
          headerShown: true 
        }} 
      />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}