import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditIcon, AddIcon, TriangleIcon } from "../components/Icons";
import { Link, useRouter } from "expo-router";
import useMascotas from "../hooks/useMascotas";
import { useState } from "react";
import { calcularEdad } from "../utils/dates";
import Loader from "../components/Loader";

function MascotaPage() {
  //const { isPending, isError, data, error } = useMascotas();
  const router = useRouter();
  const data = [
    {
      nombre: "Diego",
      especie: "Beagle",
      fechaDeNacimiento: "23/09/2018",
      avatar:
        "https://media.tryfi.com/pet/avatar/6d83d6f402df805659f43981a81726c58c55a3df16e3d5a378648034304097ad.jpg",
    },
    {
      nombre: "Candy",
      especie: "Gato persa",
      fechaDeNacimiento: "26/07/2017",
      avatar:
        "https://icons.iconarchive.com/icons/iconsmind/outline/512/Cat-icon.png",
    },
  ];

  const [index, setIndex] = useState(0);

  /*if (isPending) {
    return <Loader />;
  }

  if (isError) {
    Alert.alert("Error", error.message);
    router.back();
  }*/

  const handleNext = () => {
    if (index === data.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Pressable style={styles.prevButton} onPress={handlePrevious}>
        <TriangleIcon style={{ transform: "rotate(-90deg)" }} />
      </Pressable>
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "55%" }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: data[index].avatar,
            }}
          />
          <Pressable style={styles.editButton}>
            <EditIcon size={40} color="#000" />
          </Pressable>
        </View>
        <Text style={styles.petName}>{data[index].nombre}</Text>
        <View style={styles.info}>
          <Text style={styles.subtitle}>INFORMACIÓN</Text>
          <Text style={styles.text}>Especie: {data[index].especie}</Text>
          <Text style={styles.text}>
            Edad: {calcularEdad(data[index].fechaDeNacimiento)}
          </Text>
        </View>
        <Link href={"/(mascotas)/track-mascota"} asChild>
          <Pressable style={styles.button}>
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Montserrat_400Regular",
              }}
            >
              Rastrear
            </Text>
          </Pressable>
        </Link>
      </View>
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <TriangleIcon style={{ transform: "rotate(90deg)" }} />
      </Pressable>

      <Link href={"/(mascotas)/agregar-mascota"} asChild>
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
    flexDirection: "row",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: 75,
    height: 75,
    backgroundColor: theme.buttonColor,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -10,
    right: -30,
  },
  button: {
    width: "60%",
    height: 50,
    backgroundColor: theme.buttonColor,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    height: 75,
    position: "absolute",
    right: 20,
    bottom: 45,
  },
  nextButton: {
    marginLeft: 35,
  },
  prevButton: {
    marginRight: 35,
  },
});

export default MascotaPage;
