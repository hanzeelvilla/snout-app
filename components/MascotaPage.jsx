import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditIcon, AddIcon } from "./Icons";
import { Link } from "expo-router";

function MascotaPage() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ position: "relative" }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/194/194279.png",
          }}
        />
        <Pressable style={styles.editButton}>
          <EditIcon size={40} color="#000" />
        </Pressable>
      </View>
      <Text style={styles.petName}>DIEGO</Text>
      <View style={styles.info}>
        <Text style={styles.subtitle}>INFORMACIÓN</Text>
        <Text style={styles.text}>Especie: Pitbull</Text>
        <Text style={styles.text}>Edad: 5</Text>
      </View>
      <Pressable style={styles.button}>
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: 20,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          Historial
        </Text>
      </Pressable>
      <Link href={"/agregar-mascota"} asChild>
        <Pressable style={styles.addButton}>
          <AddIcon size={70} color="#000" />
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },
  petName: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 48,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
    marginBottom: 10,
  },
  info: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  editButton: {
    width: 75,
    height: 75,
    backgroundColor: theme.buttonColor,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
  },
  button: {
    width: "30%",
    height: 50,
    backgroundColor: theme.buttonColor,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  addButton: {
    height: 75,
    position: "absolute",
    right: 20,
    bottom: 45,
  },
});

export default MascotaPage;
