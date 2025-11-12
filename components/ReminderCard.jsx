import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function ReminderCard({ reminder }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={{ width: "100%", alignItems: "center" }}
        onPress={() =>
          router.push({
            pathname: "/modify-reminder",
            params: {
              id: reminder.id,
            },
          })
        }
      >
        <View style={styles.card} key={reminder.id}>
          <Text style={styles.cardTitle}>{reminder.title}</Text>
          <Text style={styles.cardDescription}>{reminder.description}</Text>
          <Text style={styles.cardDate}>
            {new Date(reminder.dueDate).toLocaleTimeString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    width: "100%",
    padding: 15,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    paddingVertical: 10,
    borderRadius: 15,
    boxShadow: "1px 1px 6px 0px rgba(0,0,0,0.45)",
    zIndex: 0,
  },
  cardInfo: {
    marginLeft: 5,
    width: "80%",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "#000",
  },
  cardDescription: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  cardDate: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#555",
  },
});
