import AgregarMascotaPage from "../components/AgregarMascotaPage";
import { Stack } from "expo-router";
import { MenuIcon } from "../components/Icons";

export default function AgregarMascota() {
  return (
    <>
      <Stack.Screen
        name="agregar-mascota"
        options={{ headerRight: () => <MenuIcon /> }}
      />
      <AgregarMascotaPage />
    </>
  );
}
