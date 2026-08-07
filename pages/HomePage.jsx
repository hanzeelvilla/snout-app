import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import useMascotas from "../hooks/useMascotas";
import useReminders from "../hooks/useReminders";

const { width } = Dimensions.get("window");

function HomePage() {
  const { userInfo } = useAuth();
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  // Fetch data to make statistics and dashboard feel alive
  const { data: mascotas } = useMascotas();
  const { data: reminders } = useReminders();

  const countMascotas = mascotas?.length || 0;
  const countReminders = reminders?.length || 0;

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Get up to 2 upcoming reminders
  const upcomingReminders = reminders
    ? [...reminders]
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 2)
    : [];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hola,</Text>
            <Text style={styles.usernameText}>
              {userInfo?.username?.toUpperCase() || "USUARIO"} 👋
            </Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://i.pinimg.com/236x/7f/27/e4/7f27e42ab2681ab071f3cf3b04eccea5.jpg",
              }}
            />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "rgba(113, 169, 247, 0.12)" },
              ]}
            >
              <MaterialCommunityIcons
                name="dog"
                size={24}
                color={theme.selectedColor}
              />
            </View>
            <Text style={styles.statNumber}>{countMascotas}</Text>
            <Text style={styles.statLabel}>Mascotas</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "rgba(56, 134, 151, 0.12)" },
              ]}
            >
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color={theme.buttonColor}
              />
            </View>
            <Text style={styles.statNumber}>{countReminders}</Text>
            <Text style={styles.statLabel}>Recordatorios</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsContainer}>
          <Link href="/(mascotas)/track-mascota" asChild>
            <Pressable style={styles.actionCard}>
              <View
                style={[
                  styles.actionIconBg,
                  { backgroundColor: "rgba(113, 169, 247, 0.15)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={24}
                  color={theme.selectedColor}
                />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Rastrear Mascota</Text>
                <Text style={styles.actionSubtitle}>
                  Localiza a tu mascota en tiempo real
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#CBD5E0"
              />
            </Pressable>
          </Link>

          <Link href="/(mascotas)/agregar-mascota" asChild>
            <Pressable style={styles.actionCard}>
              <View
                style={[
                  styles.actionIconBg,
                  { backgroundColor: "rgba(56, 134, 151, 0.15)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={24}
                  color={theme.buttonColor}
                />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Agregar Mascota</Text>
                <Text style={styles.actionSubtitle}>
                  Registra una nueva mascota en tu perfil
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#CBD5E0"
              />
            </Pressable>
          </Link>

          <Link href="/(reminders)/agregar-reminder" asChild>
            <Pressable style={styles.actionCard}>
              <View
                style={[
                  styles.actionIconBg,
                  { backgroundColor: "rgba(8, 65, 92, 0.15)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-plus"
                  size={24}
                  color={theme.navigationBarColor}
                />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Nuevo Recordatorio</Text>
                <Text style={styles.actionSubtitle}>
                  Crea una alerta de vacuna, comida o cita
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#CBD5E0"
              />
            </Pressable>
          </Link>
        </View>

        {/* Upcoming Reminders */}
        <View style={styles.remindersHeaderRow}>
          <Text style={styles.sectionTitle}>Próximos Recordatorios</Text>
          <Link href="/(tabs)/reminders" asChild>
            <Pressable>
              <Text style={styles.viewAllText}>Ver todos</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.upcomingContainer}>
          {upcomingReminders.length > 0 ? (
            upcomingReminders.map((reminder) => (
              <Pressable
                key={reminder.id}
                style={styles.upcomingCard}
                onPress={() =>
                  router.push({
                    pathname: "/modify-reminder",
                    params: { id: reminder.id },
                  })
                }
              >
                <View style={styles.upcomingIndicator} />
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingTitle} numberOfLines={1}>
                    {reminder.title}
                  </Text>
                  <Text style={styles.upcomingTime}>
                    {new Date(reminder.dueDate).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    •{" "}
                    {new Date(reminder.dueDate).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#CBD5E0"
                />
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={40}
                color="#A0AEC0"
              />
              <Text style={styles.emptyText}>
                ¡Todo al día! No tienes recordatorios próximos.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
      marginBottom: 24,
    },
    welcomeText: {
      fontSize: 16,
      fontFamily: "Montserrat_400Regular",
      color: "#718096",
    },
    usernameText: {
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
    },
    dateText: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#A0AEC0",
      textTransform: "capitalize",
      marginTop: 2,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 65,
      height: 65,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: theme.buttonColor,
    },
    signOutButton: {
      backgroundColor: "#E53E3E",
      padding: 8,
      borderRadius: 8,
      marginLeft: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 28,
    },
    statCard: {
      width: (width - 56) / 2,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 16,
      alignItems: "center",
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    },
    statIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    statNumber: {
      fontSize: 28,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
    },
    statLabel: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
      marginTop: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
      marginBottom: 14,
    },
    actionsContainer: {
      marginBottom: 24,
    },
    actionCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 18,
      padding: 14,
      marginBottom: 12,
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 1,
    },
    actionIconBg: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    actionTextContainer: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
      color: "#2D3748",
    },
    actionSubtitle: {
      fontSize: 12,
      fontFamily: "Montserrat_400Regular",
      color: "#A0AEC0",
      marginTop: 2,
    },
    remindersHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    viewAllText: {
      fontSize: 14,
      fontFamily: "Montserrat_700Bold",
      color: theme.buttonColor,
    },
    upcomingContainer: {
      marginBottom: 20,
    },
    upcomingCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 10,
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 1,
    },
    upcomingIndicator: {
      width: 4,
      height: 32,
      borderRadius: 2,
      backgroundColor: theme.buttonColor,
      marginRight: 12,
    },
    upcomingInfo: {
      flex: 1,
    },
    upcomingTitle: {
      fontSize: 15,
      fontFamily: "Montserrat_700Bold",
      color: "#2D3748",
    },
    upcomingTime: {
      fontSize: 12,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
      marginTop: 2,
    },
    emptyContainer: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 1,
    },
    emptyText: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#A0AEC0",
      marginTop: 8,
      textAlign: "center",
    },
  });

export default HomePage;
