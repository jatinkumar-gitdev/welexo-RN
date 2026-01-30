import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({ children, className = "", safe = true }) => {
  const Component = safe ? SafeAreaView : View;
  return (
    <Component className={`flex-1 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
