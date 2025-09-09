import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "../styles/theme";
import { MenuIcon } from "../components/Icons";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function MainLayout() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        {userToken ? (
          // If the user has a token, show the tabs group
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true, // Habilitar el header solo para esta pantalla
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
        ) : (
          // If not, show the auth group
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </View>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <MainLayout />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
