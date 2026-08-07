import { useState } from "react";
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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../contexts/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useAlert } from "../contexts/AlertContext";
import Input from "../components/Input";

function AgregarMascotaPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const styles = useThemedStyles(createStyles);
  const [name, setName] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("perro");
  const [selectedRace, setSelectedRace] = useState("beagle");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleSelectImageSource = () => {
    showAlert({
      title: "Foto de la mascota",
      message: "Selecciona de dónde deseas obtener la imagen",
      type: "info",
      buttons: [
        {
          text: "Tomar foto",
          onPress: takePhoto,
        },
        {
          text: "Galería",
          onPress: pickImageFromLibrary,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
    });
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      showAlert({
        title: "Permiso Denegado",
        message:
          "Necesitamos acceso a la cámara para tomar la foto de tu mascota.",
        type: "warning",
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showAlert({
        title: "Permiso Denegado",
        message:
          "Necesitamos acceso a tu galería para elegir la foto de tu mascota.",
        type: "warning",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddPet = async () => {
    // Basic validation
    if (!name.trim()) {
      showAlert({
        title: "Campo requerido",
        message: "Por favor ingresa el nombre de la mascota.",
        type: "warning",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({
        name,
        species: selectedSpecies,
        race: selectedRace,
        dob: date,
        imageUri,
      });
      router.back();
    } finally {
      setIsLoading(false);
    }
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
            {/* Header */}
            <View style={styles.header}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color={theme.navigationBarColor}
                />
              </Pressable>
              <Text style={styles.title}>Nueva Mascota</Text>
              <View style={{ width: 44 }} />
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              {/* Photo Upload Area */}
              <View style={styles.photoContainer}>
                <Pressable
                  style={styles.avatarPicker}
                  onPress={handleSelectImageSource}
                >
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={36}
                        color={theme.buttonColor}
                      />
                      <Text style={styles.avatarPlaceholderText}>
                        Agregar Foto
                      </Text>
                    </View>
                  )}
                  <View style={styles.cameraIconBadge}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={16}
                      color="#fff"
                    />
                  </View>
                </Pressable>
              </View>

              <Input
                value={name}
                label="Nombre"
                onChange={(text) => setName(text)}
                placeholder="Nombre de tu mascota"
                labelColor="#2D3748"
              />

              <Text style={styles.label}>Especie</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedSpecies}
                  onValueChange={(itemValue) => setSelectedSpecies(itemValue)}
                  dropdownIconColor={theme.navigationBarColor}
                  style={styles.picker}
                >
                  <Picker.Item label="Perro" value="perro" />
                  <Picker.Item label="Gato" value="gato" />
                </Picker>
              </View>

              <Text style={styles.label}>Raza</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRace}
                  onValueChange={(itemValue) => setSelectedRace(itemValue)}
                  dropdownIconColor={theme.navigationBarColor}
                  style={styles.picker}
                >
                  <Picker.Item label="Beagle" value="beagle" />
                  <Picker.Item label="Labrador" value="labrador" />
                  <Picker.Item label="Bulldog" value="bulldog" />
                  <Picker.Item label="Persa" value="persa" />
                </Picker>
              </View>

              <Text style={styles.label}>Fecha de nacimiento</Text>
              <Pressable
                onPress={() => setShow(true)}
                style={styles.datePickerTrigger}
              >
                <Text style={styles.dateText}>
                  {date.toLocaleDateString("es-ES")}
                </Text>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={theme.buttonColor}
                />
              </Pressable>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                  maximumDate={new Date()}
                />
              )}

              <Pressable
                style={styles.button}
                onPress={handleAddPet}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrar Mascota</Text>
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
      justifyContent: "space-between",
      width: "90%",
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
    photoContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    avatarPicker: {
      position: "relative",
      width: 110,
      height: 110,
      borderRadius: 55,
      borderWidth: 2,
      borderColor: theme.buttonColor,
      borderStyle: "dashed",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F7FAFC",
    },
    avatarImage: {
      width: 106,
      height: 106,
      borderRadius: 53,
    },
    avatarPlaceholder: {
      alignItems: "center",
      justifyContent: "center",
    },
    avatarPlaceholderText: {
      fontSize: 11,
      fontFamily: "Montserrat_600SemiBold",
      color: theme.buttonColor,
      marginTop: 2,
    },
    cameraIconBadge: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.buttonColor,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "#fff",
    },
    label: {
      fontSize: 14,
      fontFamily: "Montserrat_500Medium",
      color: "#2D3748",
      marginBottom: 6,
      marginTop: 4,
    },
    pickerContainer: {
      backgroundColor: "#fff",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#D1D5DB",
      marginBottom: 16,
      overflow: "hidden",
      height: 48,
      justifyContent: "center",
    },
    picker: {
      fontFamily: "Montserrat_400Regular",
      fontSize: 16,
      color: "#1F2937",
      width: "100%",
    },
    datePickerTrigger: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#D1D5DB",
      paddingHorizontal: 16,
      height: 48,
      marginBottom: 24,
    },
    dateText: {
      fontSize: 16,
      fontFamily: "Montserrat_400Regular",
      color: "#1F2937",
    },
    button: {
      backgroundColor: theme.buttonColor,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
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

export default AgregarMascotaPage;
