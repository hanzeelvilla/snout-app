import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useTheme } from "../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import useMascotas from "../hooks/useMascotas";
import { useState } from "react";
import { calcularEdad } from "../utils/dates";
import Loader from "../components/Loader";

import { useAlert } from "../contexts/AlertContext";

function MascotaPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const styles = useThemedStyles(createStyles);
  const { data: serverMascotas, isPending } = useMascotas();

  const defaultMascotas = [
    {
      id: "diego",
      nombre: "Diego",
      especie: "Beagle",
      fechaDeNacimiento: "23/09/2018",
      avatar:
        "https://media.tryfi.com/pet/avatar/6d83d6f402df805659f43981a81726c58c55a3df16e3d5a378648034304097ad.jpg",
    },
    {
      id: "candy",
      nombre: "Candy",
      especie: "Gato persa",
      fechaDeNacimiento: "26/07/2017",
      avatar:
        "https://icons.iconarchive.com/icons/iconsmind/outline/512/Cat-icon.png",
    },
  ];

  const data =
    serverMascotas && serverMascotas.length > 0
      ? serverMascotas
      : defaultMascotas;

  // Selected pet and modal visibility state
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (isPending) {
    return <Loader />;
  }

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleTrack = () => {
    setModalVisible(false);
    // Navigate after modal closes
    setTimeout(() => {
      router.push("/(mascotas)/track-mascota");
    }, 150);
  };

  const handleEdit = () => {
    setModalVisible(false);
    setTimeout(() => {
      showAlert({
        title: "Editar Mascota",
        message: `La edición de ${selectedPet?.nombre} estará disponible próximamente.`,
        type: "info",
      });
    }, 150);
  };

  const handleDelete = () => {
    setModalVisible(false);
    setTimeout(() => {
      showAlert({
        title: "Eliminar Mascota",
        message: `¿Estás seguro de que deseas eliminar a ${selectedPet?.nombre}?`,
        type: "danger",
        buttons: [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => {
              showAlert({
                title: "Eliminado",
                message: `${selectedPet?.nombre} ha sido eliminado.`,
                type: "success",
              });
            },
          },
        ],
      });
    }, 150);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Mis Mascotas</Text>

      <ScrollView
        style={styles.scrollList}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data.map((pet) => {
          const age = pet.fechaDeNacimiento
            ? calcularEdad(pet.fechaDeNacimiento)
            : "Desconocida";

          return (
            <Pressable
              key={pet.id || pet.nombre}
              style={styles.petCard}
              onPress={() => handleSelectPet(pet)}
            >
              <Image
                style={styles.petAvatar}
                source={{
                  uri:
                    pet.avatar ||
                    "https://icons.iconarchive.com/icons/iconsmind/outline/512/Cat-icon.png",
                }}
              />
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.nombre}</Text>
                <Text style={styles.petDetail}>
                  {pet.especie} • {age}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={theme.navigationBarColor}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Action Sheet Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.dismissOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            {/* Pet Info Header */}
            {selectedPet && (
              <View style={styles.modalHeader}>
                <Image
                  style={styles.modalAvatar}
                  source={{
                    uri:
                      selectedPet.avatar ||
                      "https://icons.iconarchive.com/icons/iconsmind/outline/512/Cat-icon.png",
                  }}
                />
                <View style={styles.modalHeaderInfo}>
                  <Text style={styles.modalPetName}>{selectedPet.nombre}</Text>
                  <Text style={styles.modalPetDetail}>
                    {selectedPet.especie}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#718096"
                  />
                </Pressable>
              </View>
            )}

            {/* Options List */}
            <View style={styles.optionsList}>
              <Pressable style={styles.optionItem} onPress={handleTrack}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "rgba(113, 169, 247, 0.15)" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={22}
                    color={theme.buttonColor}
                  />
                </View>
                <Text style={styles.optionText}>Rastrear Ubicación</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#A0AEC0"
                />
              </Pressable>

              <Pressable style={styles.optionItem} onPress={handleEdit}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "rgba(237, 242, 247, 1)" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={22}
                    color="#4A5568"
                  />
                </View>
                <Text style={styles.optionText}>Editar Información</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#A0AEC0"
                />
              </Pressable>

              <Pressable style={styles.optionItem} onPress={handleDelete}>
                <View
                  style={[styles.iconContainer, { backgroundColor: "#FFF5F5" }]}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={22}
                    color="#E53E3E"
                  />
                </View>
                <Text style={[styles.optionText, { color: "#E53E3E" }]}>
                  Eliminar Mascota
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#A0AEC0"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button for Adding Pet */}
      <Link href={"/(mascotas)/agregar-mascota"} asChild>
        <Pressable style={styles.fabButton}>
          <MaterialCommunityIcons name="plus" size={32} color="#fff" />
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    screenTitle: {
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
      marginTop: 20,
      marginBottom: 20,
    },
    scrollList: {
      width: "100%",
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 100, // Safe space for FAB
    },
    petCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 16,
      marginBottom: 14,
      shadowColor: "#08415C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
    petAvatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: theme.buttonColor,
      marginRight: 16,
    },
    petInfo: {
      flex: 1,
    },
    petName: {
      fontSize: 18,
      fontFamily: "Montserrat_700Bold",
      color: "#1A202C",
      marginBottom: 4,
    },
    petDetail: {
      fontSize: 14,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
    },
    fabButton: {
      position: "absolute",
      right: 24,
      bottom: 24,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.navigationBarColor,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },

    // Modal Action Sheet Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      justifyContent: "flex-end",
    },
    dismissOverlay: {
      flex: 1,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 24,
      paddingBottom: 34,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 10,
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    modalAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: theme.buttonColor,
      marginRight: 16,
    },
    modalHeaderInfo: {
      flex: 1,
    },
    modalPetName: {
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      color: "#1A202C",
      marginBottom: 2,
    },
    modalPetDetail: {
      fontSize: 14,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
    },
    closeButton: {
      padding: 4,
    },
    optionsList: {
      gap: 12,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F7FAFC",
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E2E8F0",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      fontFamily: "Montserrat_600SemiBold",
      color: "#2D3748",
    },
  });

export default MascotaPage;
