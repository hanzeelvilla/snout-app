import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { ErrorIcon } from "./Icons";

export default function ErrorModal({ error, isVisible, onClose }) {
  const styles = useThemedStyles(createStyles);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <ErrorIcon size={40} color="#EF4444" />
          </View>
          <Text style={styles.errorTitle}>¡Ocurrió un error!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalContent: {
      backgroundColor: "#FFFFFF",
      padding: 24,
      borderRadius: 20,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
    iconContainer: {
      backgroundColor: "#FEE2E2",
      padding: 12,
      borderRadius: 50,
      marginBottom: 16,
    },
    errorTitle: {
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      color: "#1F2937",
      marginBottom: 8,
      textAlign: "center",
    },
    errorText: {
      fontSize: 15,
      fontFamily: "Montserrat_400Regular",
      marginBottom: 24,
      textAlign: "center",
      color: "#4B5563",
      lineHeight: 22,
    },
    button: {
      backgroundColor: theme.buttonColor,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      width: "100%",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
      textAlign: "center",
    },
  });
