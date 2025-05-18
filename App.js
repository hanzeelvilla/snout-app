import { StatusBar, } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { Screen } from "./components/Screen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
        <Screen>
          <Text>Contenido</Text>
         </Screen> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});