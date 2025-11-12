import { Tabs } from "expo-router";
import {
  BellIcon,
  DogIcon,
  HomeIcon,
  HospitalIcon,
  MarkerIcon,
  MenuIcon,
} from "../../components/Icons";
import { theme } from "../../styles/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.navigationBarColor },
        tabBarActiveTintColor: theme.buttonColor,
        tabBarInactiveTintColor: "#fff",
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
