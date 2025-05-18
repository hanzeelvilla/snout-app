import { StatusBar, } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import Constant from "expo-constants";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
        <Text>Contenido</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constant.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});