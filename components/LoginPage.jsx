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

function LoginPage() {
  return (
    <SafeAreaView style={styles.screen}>
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
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} secureTextEntry={true}></TextInput>
      </View>
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
      <Pressable style={styles.button}>
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
