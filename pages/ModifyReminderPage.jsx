import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";
import Input from "../components/Input";
import reminderService from "../services/reminders";
import { useAuth } from "../contexts/AuthContext";

function ModifyReminderPage() {
  const queryClient = useQueryClient();
  const { userToken } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);

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
        <View style={styles.notFoundContent}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={60}
            color="#E53E3E"
          />
          <Text style={styles.notFoundText}>Recordatorio no encontrado</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === "ios");
    if (selectedDate) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      setDate(updatedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTime(Platform.OS === "ios");
    if (selectedTime) {
      const updatedDate = new Date(date);
      updatedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setDate(updatedDate);
    }
  };

  const validateTitle = (value) => {
    if (!value) return "Este campo es obligatorio";
    return null;
  };

  const handleUpdate = () => {
    if (!title.trim()) {
      alert("Por favor ingresa un título");
      return;
    }
    updateReminder({
      id: reminder.id,
      title,
      description,
      dueDate: date,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header with Back Button */}
            <View style={styles.header}>
              <Text style={styles.title}>Modificar Recordatorio</Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              <Input
                value={title}
                label="Título"
                onChange={(text) => setTitle(text)}
                validatorFn={validateTitle}
                placeholder="Título del recordatorio"
                labelColor="#2D3748"
              />

              <Input
                value={description}
                label="Descripción"
                onChange={(text) => setDescription(text)}
                multiline={true}
                numberOfLines={3}
                placeholder="Detalles del recordatorio (opcional)"
                labelColor="#2D3748"
              />

              {/* Custom Date Selector */}
              <Text style={styles.label}>Fecha</Text>
              <Pressable
                onPress={() => setShowDate(true)}
                style={styles.selectorTrigger}
              >
                <Text style={styles.selectorText}>
                  {date.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={theme.buttonColor}
                />
              </Pressable>
              {showDate && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              )}

              {/* Custom Time Selector */}
              <Text style={styles.label}>Hora</Text>
              <Pressable
                onPress={() => setShowTime(true)}
                style={styles.selectorTrigger}
              >
                <Text style={styles.selectorText}>
                  {date.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={theme.buttonColor}
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

              {/* Primary Update Button */}
              <Pressable style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
              </Pressable>

              {/* Danger Delete Button */}
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  deleteReminder(reminder.id);
                }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.deleteButtonText}>
                  Eliminar Recordatorio
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
      flexGrow: 1,
      alignItems: "center",
      paddingBottom: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 16,
      marginBottom: 20,
    },
    backButtonCircular: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 22,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
      textAlign: "center",
    },
    card: {
      width: "90%",
      backgroundColor: "#fff",
      borderRadius: 24,
      paddingHorizontal: 24,
      paddingVertical: 28,
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
      elevation: 4,
    },
    label: {
      fontSize: 14,
      fontFamily: "Montserrat_500Medium",
      color: "#2D3748",
      marginBottom: 6,
      marginTop: 4,
    },
    selectorTrigger: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#D1D5DB",
      paddingHorizontal: 16,
      height: 48,
      marginBottom: 16,
    },
    selectorText: {
      fontSize: 15,
      fontFamily: "Montserrat_400Regular",
      color: "#1F2937",
      textTransform: "capitalize",
    },
    button: {
      backgroundColor: theme.buttonColor,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
    },
    deleteButton: {
      flexDirection: "row",
      backgroundColor: "#E53E3E",
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
      shadowColor: "#E53E3E",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 3,
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
    },
    notFoundContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    notFoundText: {
      fontSize: 18,
      fontFamily: "Montserrat_600SemiBold",
      color: "#4A5568",
      marginTop: 16,
      marginBottom: 24,
    },
    backButton: {
      backgroundColor: theme.buttonColor,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 12,
    },
    backButtonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
    },
  });

export default ModifyReminderPage;
