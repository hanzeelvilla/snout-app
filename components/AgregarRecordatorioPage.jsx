import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../styles/theme";

function AgregarRecordatorioPage() {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTime(Platform.OS === "ios");
    if (selectedTime) setDate(selectedTime);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>AGREGAR RECORDATORIO</Text>
      <View style={{ width: "80%" }}>
        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 85 }]}
          multiline
          numberOfLines={3}
        />
        <Text style={styles.label}>Fecha</Text>
        <Pressable onPress={() => setShowDate(true)}>
          <TextInput
            style={styles.input}
            value={date.toLocaleDateString()}
            editable={false}
            pointerEvents="none"
            placeholder="Selecciona una fecha"
          />
        </Pressable>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.label}>Hora</Text>
        <Pressable onPress={() => setShowTime(true)}>
          <TextInput
            style={styles.input}
            value={date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            editable={false}
            pointerEvents="none"
            placeholder="Selecciona una hora"
          />
        </Pressable>
        {showTime && (
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeTime}
          />
        )}
      </View>
      <Pressable style={styles.button}>
        <Text style={{ fontSize: 18 }}>Agregar recordatorio</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 21,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    marginTop: 80,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginTop: 25,
  },
});

export default AgregarRecordatorioPage;
