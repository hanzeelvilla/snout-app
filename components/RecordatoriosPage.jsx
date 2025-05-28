import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../styles/theme";
import { AddIcon, FilterIcon } from "./Icons";
import { Link } from "expo-router";

function RecordatoriosPage() {
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
      <View style={{ width: "80%", marginTop: 20 }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "flex-start" }}
          style={{ flexGrow: 0, maxHeight: 480 }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sacar a pasear a Diego</Text>
            <Text style={styles.cardDate}>Hoy - 8:00am</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sacar a pasear a Diego</Text>
            <Text style={styles.cardDate}>Hoy - 8:00am</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sacar a pasear a Diego</Text>
            <Text style={styles.cardDate}>Hoy - 8:00am</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sacar a pasear a Diego</Text>
            <Text style={styles.cardDate}>Hoy - 8:00am</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sacar a pasear a Diego</Text>
            <Text style={styles.cardDate}>Hoy - 8:00am</Text>
          </View>
        </ScrollView>
        <Pressable style={styles.button}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Recordatorios recientes
          </Text>
        </Pressable>
      </View>
      <Link href={"/agregar-recordatorio"} asChild>
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
  card: {
    width: "100%",
    borderWidth: 1,
    borderTopColor: "#000",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "#000",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#555",
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
