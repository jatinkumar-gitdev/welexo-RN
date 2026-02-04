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

const Blob = memo(({ color, size, initialPos, duration, delay = 0, opacity = 0.08 }) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { 
        duration, 
        easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
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
      [0, 0.5, 1],
      [initialPos.x, initialPos.x + 40, initialPos.x]
    );
    const translateY = interpolate(
      progress.value,
      [0, 0.5, 1],
      [initialPos.y, initialPos.y - 50, initialPos.y]
    );
    const scale = interpolate(
      progress.value,
      [0, 0.5, 1],
      [1, 1.08, 1]
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
          opacity: opacity,
        },
        animatedStyle,
      ]}
    />
  );
});

const InteractiveBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill} className="bg-white overflow-hidden">
      {/* Large ambient blobs */}
      <Blob 
        color="#0176FF" 
        size={width * 0.85} 
        initialPos={{ x: -width * 0.25, y: -height * 0.08 }} 
        duration={12000}
        opacity={0.06}
      />
      <Blob 
        color="#0176FF" 
        size={width * 0.75} 
        initialPos={{ x: width * 0.4, y: height * 0.5 }} 
        duration={14000} 
        delay={2000}
        opacity={0.07}
      />
      <Blob 
        color="#0176FF" 
        size={width * 0.65} 
        initialPos={{ x: -width * 0.15, y: height * 0.75 }} 
        duration={11000} 
        delay={1500}
        opacity={0.05}
      />
      
      {/* Subtle accent blobs */}
      <Blob 
        color="#4A9EFF" 
        size={width * 0.4} 
        initialPos={{ x: width * 0.6, y: height * 0.15 }} 
        duration={9000} 
        delay={3000}
        opacity={0.04}
      />
      <Blob 
        color="#0062CC" 
        size={width * 0.35} 
        initialPos={{ x: width * 0.1, y: height * 0.4 }} 
        duration={10000} 
        delay={500}
        opacity={0.05}
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