import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useTheme } from "../contexts/ThemeContext";

export default function ReminderCard({ reminder }) {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);

  const formattedDate = new Date(reminder.dueDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(reminder.dueDate).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() =>
          router.push({
            pathname: "/modify-reminder",
            params: {
              id: reminder.id,
            },
          })
        }
      >
        <View style={styles.card}>
          <View style={styles.accentBar} />
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {reminder.title}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#A0AEC0"
              />
            </View>

            {reminder.description ? (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {reminder.description}
              </Text>
            ) : null}

            <View style={styles.dateContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color={theme.buttonColor}
                style={styles.clockIcon}
              />
              <Text style={styles.cardDate}>
                {formattedDate} • {formattedTime}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginBottom: 14,
      alignSelf: "center",
    },
    pressable: {
      width: "100%",
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
    accentBar: {
      width: 6,
      backgroundColor: theme.buttonColor,
    },
    cardContent: {
      flex: 1,
      padding: 16,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 18,
      fontFamily: "Montserrat_700Bold",
      color: "#1A202C",
      flex: 1,
      marginRight: 8,
    },
    cardDescription: {
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
      color: "#4A5568",
      marginBottom: 10,
      lineHeight: 20,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    clockIcon: {
      marginRight: 6,
    },
    cardDate: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
    },
  });
