import { Stack } from "expo-router";
import MenuHeaderButton from "../../components/MenuHeaderButton";
import { useTheme } from "../../contexts/ThemeContext";

export default function Layout() {
  const { theme } = useTheme();

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
          headerRight: () => <MenuHeaderButton />,
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
          headerRight: () => <MenuHeaderButton />,
        }}
      />
    </Stack>
  );
}
