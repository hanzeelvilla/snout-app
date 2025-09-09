import { Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

function HomePage() {
  const { userInfo } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.titulo}>¡BIENVENIDO!</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://images.genius.com/74495d63df3c91ea6d8fc43c43b71395.598x598x1.png",
        }}
      />
      <Text style={styles.usuario}>{userInfo.username.toUpperCase()}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FBF2C0",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
  usuario: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomePage;
