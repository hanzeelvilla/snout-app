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
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MainLayout() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        {userToken ? (
          [
            <Stack.Screen
              key="tabs"
              name="(tabs)"
              options={{
                headerShown: true,
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
            />,
            <Stack.Screen
              key="mascotas"
              name="(mascotas)"
              options={{ headerShown: false }}
            />,
            <Stack.Screen
              key="reminders"
              name="(reminders)"
              options={{ headerShown: false }}
            />,
          ]
        ) : (
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

  const queryClient = new QueryClient();

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <MainLayout />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
