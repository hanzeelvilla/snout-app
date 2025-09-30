import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../styles/theme";
import { AddIcon, FilterIcon } from "./Icons";
import { Link } from "expo-router";
import useReminders from "../hooks/useReminders";
import ReminderCard from "./ReminderCard";

function RecordatoriosPage() {
  const { isPending, isError, data, error } = useReminders();

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Ocurrió un error: {error?.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Text style={styles.title}>RECORDATORIOS</Text>
        <Pressable>
          <FilterIcon color={"#000"} size={50} />
        </Pressable>
      </View>
      <View style={{ width: "100%", marginTop: 10, alignItems: "center" }}>
        {data.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ alignItems: "center", paddingTop: 10 }}
            style={{ flexGrow: 0, height: "96%" }}
          >
            {data.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </ScrollView>
        ) : (
          <Text>No hay recordatorios</Text>
        )}
      </View>
      <Link href={"/(reminders)/agregar-reminder"} asChild>
        <Pressable style={styles.addButton}>
          <AddIcon color={"#000"} size={70} />
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    color: "#000",
  },
  addButton: {
    height: 75,
    position: "absolute",
    right: 20,
    bottom: 45,
  },
  button: {
    width: "50%",
    height: 50,
    backgroundColor: theme.buttonColor,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 40,
    alignSelf: "center",
  },
});

export default RecordatoriosPage;
