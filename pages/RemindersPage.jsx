import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../styles/theme";
import { AddIcon, FilterIcon } from "../components/Icons";
import { Link } from "expo-router";
import useReminders from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

function RecordatoriosPage() {
  const { isPending, isError, data, error, refetch, isFetching } =
    useReminders();
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (isError && !alertShown) {
      // mostrar alerta con opción de reintentar; no navegar automáticamente
      Alert.alert(
        "Error",
        error?.message ?? "Hubo un error al conectarse con el servidor.",
        [
          { text: "Reintentar", onPress: () => refetch() },
          { text: "Cerrar", style: "cancel" },
        ],
      );
      setAlertShown(true);
    }
  }, [isError, error, refetch, alertShown]);

  if (isPending) {
    return <Loader />;
  }

  if (isError && !data) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={{ marginTop: 40, fontSize: 18, textAlign: "center" }}>
          No se pudieron cargar los recordatorios.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            setAlertShown(false);
            refetch();
          }}
        >
          <Text>Reintentar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-around",
          width: "90%",
        }}
      >
        <Text style={styles.title}>RECORDATORIOS</Text>
        <Pressable>
          <FilterIcon color={"#000"} size={50} />
        </Pressable>
      </View>
      <View
        style={{ width: "100%", marginTop: 10, alignItems: "center", flex: 1 }}
      >
        {Array.isArray(data) && data.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 170,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => refetch()}
              />
            }
          >
            {data.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </ScrollView>
        ) : (
          <Text style={{ marginTop: 20 }}>No hay recordatorios</Text>
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
    width: "40%",
    height: 50,
    backgroundColor: theme.buttonColor,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 40,
  },
});

export default RecordatoriosPage;
