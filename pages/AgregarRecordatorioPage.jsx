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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";
import Input from "../components/Input";
import reminderService from "../services/reminders";
import { useAuth } from "../contexts/AuthContext";

function AgregarRecordatorioPage() {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const { userToken } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: createReminder,
    isPending,
    isLoading,
  } = useMutation({
    mutationKey: ["createReminder", userToken],
    mutationFn: (newReminder) =>
      reminderService.createReminder(newReminder, userToken),
    onSuccess: (newReminder) => {
      const reminders =
        queryClient.getQueryData(["reminders", userToken]) || [];
      queryClient.setQueryData(
        ["reminders", userToken],
        reminders.concat(newReminder),
      );
      router.back();
    },
    onError: (error) => console.log(error),
  });

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

  const handleSave = () => {
    if (!title.trim()) {
      alert("Por favor ingresa un título para el recordatorio");
      return;
    }
    createReminder({ title, description, dueDate: date });
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
            {/* Header row */}
            <View style={styles.header}>
              <Text style={styles.title}>Nuevo Recordatorio</Text>
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

              <Pressable
                style={styles.button}
                onPress={handleSave}
                disabled={isPending || isLoading}
              >
                {isPending || isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Agregar recordatorio</Text>
                )}
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
    backButton: {
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
  });

export default AgregarRecordatorioPage;
