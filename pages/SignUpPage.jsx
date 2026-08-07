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
  ActivityIndicator,
} from "react-native";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import authService from "../services/auth";
import Input from "../components/Input";
import ErrorModal from "../components/ErrorModal";

function SignUpPage() {
  const styles = useThemedStyles(createStyles);
  const [formInfo, setFormInfo] = useState({});
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (formInfo.password === formInfo.confirmPassword) {
      try {
        setIsLoading(true);
        const { user, token } = await authService.signUp(formInfo);
        await signIn({ user, token });
        router.replace("/");
      } catch (e) {
        console.log(e.response?.data || e);
        setError("Hubo un error al intentar crear tu cuenta");
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Las contraseñas no coinciden");
      setShowError(true);
    }
  };

  const validateName = (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!value) return "Este campo es obligatorio";
    if (value.length < 2)
      return "Este campo debe de contener al menos 2 caracteres";
    if (!regex.test(value)) return "Este campo solo puede contener letras";
    return null;
  };

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9@#/\-._]+$/;
    if (!value) return "Este campo es obligatorio";
    if (value.length < 5)
      return "Este campo debe de contener al menos 5 caracteres";
    if (!regex.test(value))
      return "Caracteres permitidos: a-z, A-Z, 0-9 y @ # / - _ .";
    return null;
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Este campo es obligatorio";
    if (!regex.test(value)) return "Correo no válido";
    return null;
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#/\-._])[a-zA-Z0-9@#/\-._]+$/;
    if (!value) return "Este campo es obligatorio";
    if (value.length < 8) return "Debe contener al menos 8 caracteres";
    if (!regex.test(value))
      return "Debe incluir una mayúscula, un número y un caracter especial (@#/-._)";
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
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Decorative shapes */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            <View style={styles.headerContainer}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>
                Únete y empieza a cuidar de tus mascotas
              </Text>
            </View>

            <View style={styles.card}>
              <Input
                value={formInfo.name}
                label="Nombre"
                labelColor="#fff"
                onChange={(text) => setFormInfo({ ...formInfo, name: text })}
                validatorFn={validateName}
                placeholder="Tu nombre"
              />

              <Input
                value={formInfo.lastName}
                label="Apellidos"
                labelColor="#fff"
                onChange={(text) =>
                  setFormInfo({ ...formInfo, lastName: text })
                }
                validatorFn={validateName}
                placeholder="Tus apellidos"
              />

              <Input
                value={formInfo.username}
                label="Nombre de usuario"
                labelColor="#fff"
                onChange={(text) =>
                  setFormInfo({ ...formInfo, username: text })
                }
                validatorFn={validateUsername}
                placeholder="Elige un usuario único"
              />

              <Input
                value={formInfo.email}
                label="Correo electrónico"
                labelColor="#fff"
                keyboardType="email-address"
                onChange={(text) => setFormInfo({ ...formInfo, email: text })}
                validatorFn={validateEmail}
                placeholder="ejemplo@correo.com"
              />

              <Input
                value={formInfo.password}
                label="Contraseña"
                labelColor="#fff"
                secureText={true}
                onChange={(text) =>
                  setFormInfo({ ...formInfo, password: text })
                }
                validatorFn={validatePassword}
                placeholder="Crea una contraseña segura"
              />

              <Input
                value={formInfo.confirmPassword}
                label="Confirmar contraseña"
                labelColor="#fff"
                secureText={true}
                onChange={(text) =>
                  setFormInfo({ ...formInfo, confirmPassword: text })
                }
                validatorFn={validateConfirmPassword}
                placeholder="Repite la contraseña"
              />

              <Pressable
                style={styles.button}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrarse</Text>
                )}
              </Pressable>

              <View style={styles.loginLinkContainer}>
                <Text style={styles.hasAccountText}>
                  ¿Ya tienes una cuenta?{" "}
                </Text>
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.loginText}>Iniciar Sesión</Text>
                </Pressable>
              </View>
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
      backgroundColor: theme.authColor,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    decorativeCircle1: {
      position: "absolute",
      top: -50,
      right: -50,
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    decorativeCircle2: {
      position: "absolute",
      bottom: -80,
      left: -80,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    headerContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 36,
      fontFamily: "Montserrat_700Bold",
      color: "#fff",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
      color: "rgba(255, 255, 255, 0.6)",
      marginTop: 4,
      textAlign: "center",
    },
    card: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.07)",
      borderWidth: 1.5,
      borderColor: "rgba(255, 255, 255, 0.12)",
      borderRadius: 28,
      paddingHorizontal: 24,
      paddingVertical: 32,
    },
    button: {
      backgroundColor: theme.buttonColor,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
      letterSpacing: 0.5,
    },
    loginLinkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    hasAccountText: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
    },
    loginText: {
      color: theme.selectedColor,
      fontSize: 14,
      fontFamily: "Montserrat_700Bold",
      textDecorationLine: "underline",
    },
  });

export default SignUpPage;
