import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import PantallaDeCarga from "./components/PantallaDeCarga";
import Constant from "expo-constants";

export default function App() {

  return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <PantallaDeCarga />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constant.statusBarHeight,
  },
});