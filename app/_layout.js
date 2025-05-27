import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "../styles/theme";
import { MenuIcon } from "../components/Icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // o un indicador de carga
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerLeft: () => {},
            headerTitle: "",
            headerStyle: {
              backgroundColor: theme.navigationBarColor,
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <View
                style={{
                  paddingRight: 10,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MenuIcon />
              </View>
            ),
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
