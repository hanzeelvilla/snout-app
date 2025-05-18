import { View, StyleSheet } from "react-native";

export function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FBF2C0",
    justifyContent: "center",
    alignItems: "center",
  },
});
