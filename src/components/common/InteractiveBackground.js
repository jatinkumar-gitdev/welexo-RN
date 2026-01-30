import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  interpolate,
  ReduceMotion
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const Blob = memo(({ color, size, initialPos, duration, delay = 0 }) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { 
        duration, 
        easing: Easing.inOut(Easing.sin),
        delay,
        reduceMotion: ReduceMotion.Never
      }),
      -1,
      true,
      undefined,
      ReduceMotion.Never
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [initialPos.x, initialPos.x + 60]
    );
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [initialPos.y, initialPos.y - 40]
    );
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 1.1]
    );

    return {
      transform: [
        { translateX },
        { translateY },
        { scale }
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.blob,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
});

const InteractiveBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill} className="bg-[#0176FF] overflow-hidden">
      <Blob 
        color="rgba(255, 255, 255, 0.15)" 
        size={width * 0.8} 
        initialPos={{ x: -width * 0.2, y: -height * 0.1 }} 
        duration={8000} 
      />
      <Blob 
        color="rgba(255, 255, 255, 0.1)" 
        size={width * 0.9} 
        initialPos={{ x: width * 0.3, y: height * 0.4 }} 
        duration={10000} 
        delay={1000}
      />
      <Blob 
        color="rgba(255, 255, 255, 0.08)" 
        size={width * 0.6} 
        initialPos={{ x: -width * 0.1, y: height * 0.7 }} 
        duration={7000} 
        delay={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
  },
});

export default memo(InteractiveBackground);
