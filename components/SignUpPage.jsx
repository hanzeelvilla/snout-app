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
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import authService from "../services/auth";
import ErrorModal from "./ErrorModal";

function SignUpPage() {
  const [formInfo, setFormInfo] = useState({});
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (formInfo.password === formInfo.confirmPassword) {
      try {
        const { user, token } = await authService.signUp(formInfo);
        await signIn({ user, token });
        router.replace("/");
      } catch (e) {
        console.log(e.response.data);
        setError("Hubo un error al intentar crear tu cuenta");
        setShowError(true);
      }
    } else {
      setError("Las contraseñas no coinciden");
      setShowError(true);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ErrorModal
        isVisible={showError}
        error={error}
        onClose={() => setShowError(false)}
      />
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
              <TextInput
                style={styles.input}
                value={formInfo.name}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, name: text })
                }
              />

              <Text style={styles.label}>Apellidos</Text>
              <TextInput
                style={styles.input}
                value={formInfo.lastName}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, lastName: text })
                }
              />

              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                value={formInfo.username}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, username: text })
                }
              />

              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={formInfo.email}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, email: text })
                }
              />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={formInfo.password}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, password: text })
                }
              />

              <Text style={styles.label}>Confirmar contraseña</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={formInfo.confirmPassword}
                onChangeText={(text) =>
                  setFormInfo({ ...formInfo, confirmPassword: text })
                }
              />

              <Pressable style={styles.button} onPress={handleSignUp}>
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
