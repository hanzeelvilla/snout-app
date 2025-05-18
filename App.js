import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { Screen } from "./components/Screen";
import { useFonts } from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#fff"/>
      <Screen>
        <Text style={styles.titulo}>Título</Text>
        <Text style={styles.subtitulo}>Subtítulo</Text>
        <Text style={styles.contenido}>Contenido</Text>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
  },
  subtitulo: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
  },
  contenido: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
});
