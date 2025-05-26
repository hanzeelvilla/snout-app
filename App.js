import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import HomePage from "./components/HomePage";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import MascotaPage from "./components/MascotaPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AgregarMascotaPage from "./components/AgregarMascotaPage";
import RecordatoriosPage from "./components/RecordatoriosPage";
import AgregarRecordatorioPage from "./components/AgregarRecordatorioPage";

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
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#fff" />
      {/* <MascotaPage /> */}
      {/* <LoginPage /> */}
      {/* <HomePage /> */}
      {/* <AgregarMascotaPage /> */}
      {/* <RecordatoriosPage /> */}
      <AgregarRecordatorioPage />
    </SafeAreaProvider>
  );
}
