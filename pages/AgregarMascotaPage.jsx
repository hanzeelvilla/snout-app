import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../styles/theme";

function AgregarMascotaPage() {
  const [selectedSpecies, setSelectedSpecies] = useState();
  const [selectedRace, setSelectedRace] = useState();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // En iOS sigue visible, en Android se oculta
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>AGREGAR MASCOTA</Text>
      <View style={{ width: "80%" }}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Especie</Text>
        <Picker
          selectedValue={selectedSpecies}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSpecies(itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label="Perro" value="perro" />
          <Picker.Item label="Gato" value="gato" />
        </Picker>
        <Text style={styles.label}>Raza</Text>
        <Picker
          selectedValue={selectedRace}
          onValueChange={(itemValue, itemIndex) => setSelectedRace(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Labrador" value="labrador" />
          <Picker.Item label="Bulldog" value="bulldog" />
          <Picker.Item label="Beagle" value="beagle" />
          <Picker.Item label="Persa" value="persa" />
        </Picker>
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => setShow(true)} style={{ flex: 1 }}>
            <TextInput
              style={styles.dateInput}
              value={date.toLocaleDateString()}
              editable={false}
              placeholder="Selecciona una fecha"
              pointerEvents="none" // Opcional, para evitar el teclado
            />
          </Pressable>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text style={{ fontSize: 18 }}>Agregar mascota</Text>
      </Pressable>
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
    fontSize: 28,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 20,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
    height: 36,
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: 36,
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    width: "40%",
  },
  picker: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 5,
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

export default AgregarMascotaPage;
