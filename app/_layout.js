import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AlertProvider } from "../contexts/AlertContext";
import MenuHeaderButton from "../components/MenuHeaderButton";
import HamburgerMenu from "../components/HamburgerMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

function MainLayout() {
  const { userToken, loading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userToken) {
      router.replace("/login");
    }
  }, [userToken, loading, router]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
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
                headerRight: () => <MenuHeaderButton />,
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
      <HamburgerMenu />
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
        <ThemeProvider>
          <AlertProvider>
            <SafeAreaProvider>
              <StatusBar style="light" />
              <MainLayout />
            </SafeAreaProvider>
          </AlertProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
