import { Stack } from "expo-router";
import { MenuIcon } from "../../components/Icons";
import { theme } from "../../styles/theme";
import { View } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="agregar-reminder"
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
      />
      <Stack.Screen
        name="modify-reminder"
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
      />
    </Stack>
  );
}
