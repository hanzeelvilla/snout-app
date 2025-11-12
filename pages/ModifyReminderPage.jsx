import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../styles/theme";
import Input from "../components/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import reminderService from "../services/reminders";
import { useAuth } from "../contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";

function ModifyReminderPage() {
  const queryClient = useQueryClient();
  const { userToken } = useAuth();
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const reminders = queryClient.getQueryData(["reminders", userToken]) || [];
  const reminder = reminders.find((reminder) => reminder.id === id);

  const [title, setTitle] = useState(reminder?.title ?? "");
  const [description, setDescription] = useState(reminder?.description ?? "");
  const [date, setDate] = useState(() => {
    const dueDate = reminder?.dueDate;
    return dueDate ? new Date(dueDate) : new Date();
  });
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const { mutate: updateReminder } = useMutation({
    mutationKey: ["updateReminder", userToken],
    mutationFn: (updatedReminder) =>
      reminderService.updateReminder(
        updatedReminder.id,
        updatedReminder,
        userToken,
      ),
    onSuccess: (updatedReminder) => {
      const reminders =
        queryClient.getQueryData(["reminders", userToken]) || [];
      queryClient.setQueryData(
        ["reminders", userToken],
        reminders.map((reminder) =>
          reminder.id === updatedReminder.id ? updatedReminder : reminder,
        ),
      );
      router.back();
    },
    onError: (error) => console.log(error),
  });

  const { mutate: deleteReminder } = useMutation({
    mutationKey: ["deleteReminder", userToken],
    mutationFn: (id) => reminderService.deleteReminder(id, userToken),
    onSuccess: (_, id) => {
      const reminders =
        queryClient.getQueryData(["reminders", userToken]) || [];
      queryClient.setQueryData(
        ["reminders", userToken],
        reminders.filter((reminder) => reminder.id !== id),
      );
      router.back();
    },
    onError: (error) => console.log(error),
  });

  if (!reminder) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Recordatorio no encontrado</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text>Volver</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTime(Platform.OS === "ios");
    if (selectedTime) setDate(selectedTime);
  };

  const validateTitle = (value) => {
    if (!value) return "Este campo es obligatorio";
    return null;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>MODIFICAR RECORDATORIO</Text>
      <View style={{ width: "80%" }}>
        <Input
          value={title}
          label="Título"
          onChange={(text) => setTitle(text)}
          validatorFn={validateTitle}
        />
        <Input
          value={description}
          label="Descripción"
          onChange={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={3}
        />
        <Pressable onPress={() => setShowDate(true)}>
          <Input
            value={date.toLocaleDateString()}
            label="Fecha"
            editable={false}
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
        <Pressable onPress={() => setShowTime(true)}>
          <Input
            value={date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            label="Hora"
            editable={false}
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
      <Pressable
        style={styles.button}
        onPress={() => {
          updateReminder({
            id: reminder.id,
            title,
            description,
            dueDate: date,
          });
        }}
      >
        <Text style={{ fontSize: 18 }}>Modificar recordatorio</Text>
      </Pressable>
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          deleteReminder(reminder.id);
        }}
      >
        <Text style={{ fontSize: 18 }}>Eliminar recordatorio</Text>
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
  deleteButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginTop: 25,
  },
});

export default ModifyReminderPage;
