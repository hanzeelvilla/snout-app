import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import authService from "../services/auth";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useRouter } from "expo-router";
import ErrorModal from "./ErrorModal";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");
      const credentials = { username, password };
      const { user, token } = await authService.login(credentials);
      await signIn({ user, token });
      router.replace("/");
    } catch {
      setError("Usuario o contraseña incorrectos");
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
      <View>
        <Image
          style={styles.icon}
          source={require("../assets/adaptive-icon.png")}
          resizeMode="contain"
        ></Image>
        <Text style={styles.title}>Snout</Text>
      </View>
      <View style={{ width: "80%" }}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        ></TextInput>
      </View>
      <Link href="/sign-up" asChild>
        <Pressable style={styles.link}>
          <Text
            style={{
              color: "#fff",
              textDecorationLine: "underline",
              fontFamily: "Montserrat_400Regular",
              fontSize: 16,
            }}
          >
            Registrarse
          </Text>
        </Pressable>
      </Link>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 18 }}>Iniciar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.navigationBarColor,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 80,
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
  link: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: "10%",
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

export default LoginPage;
