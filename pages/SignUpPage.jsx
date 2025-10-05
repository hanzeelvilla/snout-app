import {
  Text,
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
import Input from "../components/Input";
import ErrorModal from "../components/ErrorModal";

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

  const validateName = (value) => {
    const regex = /^[a-zA-Z]+$/;
    if (!value) return "Este campo es obligatorio";
    if (value.length < 2)
      return "Este campo debe de contener al menos 2 caracteres";
    if (!regex.test(value))
      return "Este campo solo puede contener mayúsculas y minúsculas";
    return null;
  };

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9@#/\-._]+$/;
    if (!value) return "Este campo es obligatorio";
    if (value.length < 5)
      return "Este campo debe de contener al menos 5 caracteres";
    if (!regex.test(value))
      return "Este campo solo puede contener letras (a-z, A-Z), números (0-9) y los caracteres especiales: @ # / - _ . ";
    return null;
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Este campo es obligatorio";
    if (!regex.test(value)) return "Correo no valido";
    return null;
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#/\-._])[a-zA-Z0-9@#/\-._]+$/;
    if (!value) return "Esta campo es obligatorio";
    if (value.length < 8)
      return "Este campo debe contener al menos 8 caracteres";
    if (!regex.test(value))
      return "Este campo debe contener al menos una letra mayúscula, un número y uno de los siguientes caracteres especiales: @ # / - _ . ";
    return null;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Este campo es obligatorio";
    if (value !== formInfo.password) return "Las contraseñas no coinciden";
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
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.inner}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ width: "80%", paddingTop: 50, height: "100%" }}>
              <Text style={styles.title}>Sign Up</Text>

              <Input
                value={formInfo.name}
                label="Nombre"
                onChange={(text) => setFormInfo({ ...formInfo, name: text })}
                validatorFn={validateName}
              />

              <Input
                value={formInfo.lastName}
                label="Apellidos"
                onChange={(text) =>
                  setFormInfo({ ...formInfo, lastName: text })
                }
                validatorFn={validateName}
              />

              <Input
                value={formInfo.username}
                label="Nombre de usuario"
                onChange={(text) =>
                  setFormInfo({ ...formInfo, username: text })
                }
                validatorFn={validateUsername}
              />

              <Input
                value={formInfo.email}
                label="Correo"
                keyboardType="email-address"
                onChange={(text) => setFormInfo({ ...formInfo, email: text })}
                validatorFn={validateEmail}
              />

              <Input
                value={formInfo.password}
                label="Contraseña"
                secureText={true}
                onChange={(text) =>
                  setFormInfo({ ...formInfo, password: text })
                }
                validatorFn={validatePassword}
              />

              <Input
                value={formInfo.confirmPassword}
                label="Confirmar contraseña"
                secureText={true}
                onChange={(text) =>
                  setFormInfo({ ...formInfo, confirmPassword: text })
                }
                validatorFn={validateConfirmPassword}
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
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: theme.navigationBarColor,
    justifyContent: "center",
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
