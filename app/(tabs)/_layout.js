import { Tabs } from "expo-router";
import { BellIcon, DogIcon, HomeIcon } from "../../components/Icons";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.navigationBarColor },
        tabBarActiveTintColor: theme.selectedColor,
        tabBarInactiveTintColor: theme.backgroundColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="mascotas"
        options={{
          title: "Mascotas",
          tabBarIcon: ({ color }) => <DogIcon color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="monitoreo"
        options={{
          title: "Monitoreo",
          tabBarIcon: ({ color }) => <MarkerIcon />,
        }}
      />*/}
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Recordatorios",
          tabBarIcon: ({ color }) => <BellIcon color={color} />,
        }}
      />
      {/*}
      <Tabs.Screen
        name="emergencias"
        options={{
          title: "Emergencias",
          tabBarIcon: ({ color }) => <HospitalIcon />,
        }}
      /> */}
    </Tabs>
  );
}
