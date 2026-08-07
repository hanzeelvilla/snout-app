import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  Platform,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useFocusEffect, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

import { useAlert } from "../contexts/AlertContext";

export default function TrackPetPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const styles = useThemedStyles(createStyles);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const promptUserToEnableLocation = useCallback(() => {
    setTimeout(() => {
      showAlert({
        title: "GPS Desactivado",
        message: "Por favor, activa el GPS para ver tu ubicación.",
        type: "warning",
        buttons: [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Ir a Configuración",
            onPress: () => {
              if (Platform.OS === "ios") {
                Linking.openURL("app-settings:");
              } else {
                Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
              }
            },
          },
        ],
      });
    }, 500);
  }, [showAlert]);

  const requestPermissions = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionGranted(status === "granted");

    if (status === "granted") {
      let isEnabled = await Location.hasServicesEnabledAsync();
      setLocationEnabled(isEnabled);

      if (!isEnabled) {
        promptUserToEnableLocation();
      }
    } else {
      showAlert({
        title: "Permiso Necesario",
        message: "Por favor, otorga el permiso de ubicación para usar el mapa.",
        type: "warning",
      });
    }
  }, [promptUserToEnableLocation, showAlert]);

  const checkLocationStatus = useCallback(async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    let isGranted = status === "granted";
    setPermissionGranted(isGranted);

    if (isGranted) {
      let isEnabled = await Location.hasServicesEnabledAsync();
      setLocationEnabled(isEnabled);

      if (!isEnabled) {
        promptUserToEnableLocation();
      }
    } else {
      requestPermissions();
    }
  }, [promptUserToEnableLocation, requestPermissions]);

  useFocusEffect(
    useCallback(() => {
      checkLocationStatus();
    }, [checkLocationStatus]),
  );

  if (!permissionGranted && permissionGranted !== false) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando mapa y permisos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Floating Header & Back Button */}
      <View style={styles.headerOverlay}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.navigationBarColor}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Rastreador</Text>
        <View style={{ width: 44 }} />
      </View>

      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 19.2453,
          longitude: -103.72409,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
          {/* Styled Premium Marker Pin */}
          <View style={styles.markerContainer}>
            <View style={styles.pinCircle}>
              <Image
                style={styles.markerAvatar}
                source={{
                  uri: "https://media.tryfi.com/pet/avatar/6d83d6f402df805659f43981a81726c58c55a3df16e3d5a378648034304097ad.jpg",
                }}
              />
            </View>
            <View style={styles.pinArrow} />
          </View>
        </Marker>
      </MapView>

      {/* Floating Bottom Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <View>
            <Text style={styles.petName}>Diego</Text>
            <Text style={styles.petSubText}>Beagle • En rango de casa</Text>
          </View>
          <View style={styles.statusBadge}>
            <MaterialCommunityIcons name="wifi" size={14} color="#319795" />
            <Text style={styles.statusBadgeText}>Conectado</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.collarDetails}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="battery-80"
              size={20}
              color={theme.buttonColor}
            />
            <Text style={styles.detailText}>84% Batería</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="walk"
              size={20}
              color={theme.buttonColor}
            />
            <Text style={styles.detailText}>1,420 Pasos</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="signal"
              size={20}
              color={theme.buttonColor}
            />
            <Text style={styles.detailText}>Excelente</Text>
          </View>
        </View>

        <Pressable
          style={styles.actionButton}
          onPress={() =>
            showAlert({
              title: "Localizar Collar",
              message: "Enviando señal sonora al collar...",
              type: "info",
            })
          }
        >
          <MaterialCommunityIcons
            name="volume-high"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.actionButtonText}>Sonar Collar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    loadingText: {
      fontFamily: "Montserrat_500Medium",
      fontSize: 16,
      color: theme.navigationBarColor,
    },
    headerOverlay: {
      position: "absolute",
      top: Platform.OS === "ios" ? 54 : 34,
      left: 20,
      right: 20,
      zIndex: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    markerContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    pinCircle: {
      width: 35,
      height: 35,
      borderRadius: 25,
      backgroundColor: "#fff",
      borderWidth: 3,
      borderColor: theme.buttonColor,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    markerAvatar: {
      width: 27,
      height: 27,
      borderRadius: 21,
    },
    pinArrow: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderTopWidth: 5,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.buttonColor,
      marginTop: -1,
    },
    infoCard: {
      position: "absolute",
      bottom: Platform.OS === "ios" ? 40 : 24,
      left: 20,
      right: 20,
      backgroundColor: "#fff",
      borderRadius: 24,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
    infoCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    petName: {
      fontSize: 22,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
    },
    petSubText: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
      marginTop: 2,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E6FFFA",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    statusBadgeText: {
      fontSize: 12,
      fontFamily: "Montserrat_600SemiBold",
      color: "#234E52",
      marginLeft: 4,
    },
    divider: {
      height: 1,
      backgroundColor: "#E2E8F0",
      marginVertical: 14,
    },
    collarDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    detailText: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#4A5568",
      marginLeft: 6,
    },
    actionButton: {
      flexDirection: "row",
      backgroundColor: theme.buttonColor,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    actionButtonText: {
      color: "#fff",
      fontSize: 15,
      fontFamily: "Montserrat_700Bold",
    },
  });
