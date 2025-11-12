import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Image,
  Linking,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { theme } from "../styles/theme";

export default function TrackPetPage() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const checkLocationStatus = useCallback(async () => {
    // 1. Verificar Permisos
    let { status } = await Location.getForegroundPermissionsAsync();
    let isGranted = status === "granted";
    setPermissionGranted(isGranted);

    if (isGranted) {
      // 2. Verificar Servicio (GPS)
      let isEnabled = await Location.hasServicesEnabledAsync();
      setLocationEnabled(isEnabled);

      if (!isEnabled) {
        // Llama a la alerta DENTRO del handler (¡CRÍTICO!)
        promptUserToEnableLocation();
      }
    } else {
      // Si el permiso no está otorgado, se debe pedir
      requestPermissions();
    }
  }, [requestPermissions, promptUserToEnableLocation]); // Dependencia de requestPermissions

  // 1. Función para solicitar permisos (llamada por checkLocationStatus)
  const requestPermissions = useCallback(async () => {
    // Pedir el permiso
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionGranted(status === "granted");

    // Si se otorgó, volver a verificar el estado completo del GPS
    if (status === "granted") {
      checkLocationStatus();
    } else {
      // Mostrar alerta si el usuario lo niega
      Alert.alert(
        "Permiso Necesario",
        "Por favor, otorga el permiso de ubicación para usar el mapa.",
      );
    }
  }, [checkLocationStatus]);

  // 2. Función para alertar sobre GPS desactivado
  const promptUserToEnableLocation = useCallback(() => {
    // CRÍTICO: Añadir un pequeño delay para evitar la supresión de la alerta
    setTimeout(() => {
      Alert.alert(
        "GPS Desactivado",
        "Por favor, activa el GPS para ver tu ubicación.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Ir a Configuración", // Botón para guiar al usuario
            onPress: () => {
              // Abrir la configuración del dispositivo
              if (Platform.OS === "ios") {
                // Abre los ajustes de la app en iOS
                Linking.openURL("app-settings:");
              } else {
                // Opción general para Android
                Linking.openSettings();
              }
            },
          },
        ],
      );
    }, 500); // <-- Delay de 500ms
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkLocationStatus();
    }, [checkLocationStatus]),
  );

  // --- Renderizado Condicional del Mapa o Mensajes ---

  // Mientras se obtienen los estados, puedes mostrar un Loader (no incluido)
  if (!permissionGranted && permissionGranted !== false) {
    return (
      <View style={styles.container}>
        <Text>Cargando estado de permisos...</Text>
      </View>
    );
  }

  // Si todo es TRUE, renderizar el Mapa
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 19.2453,
          longitude: -103.72409,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: 19.2452342,
            longitude: -103.7240868,
          }}
          title="Viejon"
        >
          <Image
            style={styles.icon}
            source={{
              uri: "https://media.tryfi.com/pet/avatar/6d83d6f402df805659f43981a81726c58c55a3df16e3d5a378648034304097ad.jpg",
            }}
          />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderColor: theme.buttonColor,
    borderWidth: 2,
  },
  iconContainer: {
    borderColor: theme.buttonColor,
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
  },
});
