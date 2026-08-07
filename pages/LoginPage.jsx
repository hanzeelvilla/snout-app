import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import authService from "../services/auth";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useRouter } from "expo-router";
import Input from "../components/Input";
import ErrorModal from "../components/ErrorModal";

function LoginPage() {
  const styles = useThemedStyles(createStyles);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const credentials = { username, password };
      const { user, token } = await authService.login(credentials);
      await signIn({ user, token });
      router.replace("/");
    } catch {
      setError("Usuario o contraseña incorrectos");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInput = (value) => {
    if (!value) return "Este campo es obligatorio";
    return null;
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Decorative shapes to break the flat brown background */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          <View style={styles.logoContainer}>
            <Image
              style={styles.icon}
              source={require("../assets/adaptive-icon.png")}
              resizeMode="contain"
            />
            <Text style={styles.title}>Snout</Text>
            <Text style={styles.subtitle}>
              El cuidado de tu mascota en tus manos
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Iniciar Sesión</Text>

            <Input
              value={username}
              label="Nombre de usuario"
              labelColor="#fff"
              onChange={(text) => setUsername(text)}
              validatorFn={validateInput}
              placeholder="Ingresa tu usuario"
            />

            <Input
              value={password}
              label="Contraseña"
              labelColor="#fff"
              onChange={(text) => setPassword(text)}
              validatorFn={validateInput}
              secureText={true}
              placeholder="Ingresa tu contraseña"
            />

            <Pressable
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </Pressable>

            <View style={styles.signUpLinkContainer}>
              <Text style={styles.noAccountText}>¿No tienes una cuenta? </Text>
              <Link href="/sign-up" asChild>
                <Pressable>
                  <Text style={styles.signUpText}>Registrarse</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
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
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    decorativeCircle1: {
      position: "absolute",
      top: -50,
      left: -50,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    decorativeCircle2: {
      position: "absolute",
      bottom: -80,
      right: -80,
      width: 250,
      height: 250,
      borderRadius: 125,
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    icon: {
      width: 120,
      height: 120,
      marginBottom: 8,
    },
    title: {
      fontSize: 48,
      fontFamily: "Montserrat_700Bold",
      color: "#fff",
      letterSpacing: 1,
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
    cardHeader: {
      fontSize: 22,
      fontFamily: "Montserrat_700Bold",
      color: "#fff",
      marginBottom: 24,
      textAlign: "center",
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
    signUpLinkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    noAccountText: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
    },
    signUpText: {
      color: theme.selectedColor,
      fontSize: 14,
      fontFamily: "Montserrat_700Bold",
      textDecorationLine: "underline",
    },
  });

export default LoginPage;
