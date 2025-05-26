import {
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";

function SignUpPage() {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.inner}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ width: "80%", marginTop: 50 }}>
              <Text style={styles.title}>Sign Up</Text>

              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Apellidos</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Correo</Text>
              <TextInput style={styles.input} keyboardType="email-address" />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput style={styles.input} secureTextEntry />

              <Text style={styles.label}>Confirmar contraseña</Text>
              <TextInput style={styles.input} secureTextEntry />

              <Pressable style={styles.button}>
                <Text style={{ fontSize: 18 }}>Registrarse</Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.navigationBarColor,
  },
  inner: {
    flexGrow: 1, // importante
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: theme.navigationBarColor,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#fff",
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
  button: {
    backgroundColor: theme.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
});

export default SignUpPage;
