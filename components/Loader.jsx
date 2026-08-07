import { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LoadingIcon } from "./Icons";
import { useThemedStyles } from "../hooks/useThemedStyles";

export default function Loader() {
  const styles = useThemedStyles(createStyles);
  const [spinValue] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
    return () => spinValue.stopAnimation();
  }, [spinValue]);

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spinRotation }] }}>
        <LoadingIcon size={32} />
      </Animated.View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundColor: theme.backgroundColor,
    },
  });
