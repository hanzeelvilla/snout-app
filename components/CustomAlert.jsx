import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemedStyles } from "../hooks/useThemedStyles";

const TYPE_CONFIGS = {
  info: {
    icon: "information-outline",
    iconColor: "#3182CE",
    bgColor: "rgba(49, 130, 206, 0.12)",
  },
  success: {
    icon: "check-circle-outline",
    iconColor: "#38A169",
    bgColor: "rgba(56, 161, 105, 0.12)",
  },
  warning: {
    icon: "alert-circle-outline",
    iconColor: "#DD6B20",
    bgColor: "rgba(221, 107, 32, 0.12)",
  },
  danger: {
    icon: "alert-octagon-outline",
    iconColor: "#E53E3E",
    bgColor: "rgba(229, 62, 62, 0.12)",
  },
};

export default function CustomAlert({
  visible,
  title,
  message,
  type = "info",
  buttons = [],
  onClose,
}) {
  const styles = useThemedStyles(createStyles);

  if (!visible) return null;

  const typeConfig = TYPE_CONFIGS[type] || TYPE_CONFIGS.info;

  // Default button if none provided
  const alertButtons =
    buttons.length > 0
      ? buttons
      : [{ text: "Aceptar", style: "default", onPress: onClose }];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.alertCard}>
          {/* Icon Badge */}
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: typeConfig.bgColor },
            ]}
          >
            <MaterialCommunityIcons
              name={typeConfig.icon}
              size={36}
              color={typeConfig.iconColor}
            />
          </View>

          {/* Title & Message */}
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {/* Actions Container */}
          <View
            style={[
              styles.buttonsContainer,
              alertButtons.length > 2 && styles.buttonsColumn,
            ]}
          >
            {alertButtons.map((btn, idx) => {
              const isDestructive = btn.style === "destructive";
              const isCancel = btn.style === "cancel";

              let btnStyle = [styles.button, styles.defaultButton];
              let textStyle = [styles.buttonText, styles.defaultButtonText];

              if (isDestructive) {
                btnStyle = [styles.button, styles.destructiveButton];
                textStyle = [styles.buttonText, styles.destructiveButtonText];
              } else if (isCancel) {
                btnStyle = [styles.button, styles.cancelButton];
                textStyle = [styles.buttonText, styles.cancelButtonText];
              }

              return (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    ...btnStyle,
                    pressed && styles.pressed,
                    alertButtons.length === 2 && styles.flexButton,
                  ]}
                  onPress={() => {
                    onClose();
                    if (btn.onPress) {
                      btn.onPress();
                    }
                  }}
                >
                  <Text style={textStyle}>{btn.text}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    alertCard: {
      width: "100%",
      maxWidth: 340,
      backgroundColor: "#ffffff",
      borderRadius: 24,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      color: "#1A202C",
      textAlign: "center",
      marginBottom: 8,
    },
    message: {
      fontSize: 14,
      fontFamily: "Montserrat_500Medium",
      color: "#718096",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 24,
    },
    buttonsContainer: {
      flexDirection: "row",
      width: "100%",
      gap: 10,
    },
    buttonsColumn: {
      flexDirection: "column",
    },
    flexButton: {
      flex: 1,
    },
    button: {
      height: 46,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    pressed: {
      opacity: 0.8,
    },
    defaultButton: {
      backgroundColor: theme.buttonColor,
    },
    defaultButtonText: {
      color: "#FFFFFF",
      fontFamily: "Montserrat_700Bold",
      fontSize: 15,
    },
    cancelButton: {
      backgroundColor: "#EDF2F7",
    },
    cancelButtonText: {
      color: "#4A5568",
      fontFamily: "Montserrat_600SemiBold",
      fontSize: 15,
    },
    destructiveButton: {
      backgroundColor: "#FFF5F5",
      borderWidth: 1,
      borderColor: "#FEB2B2",
    },
    destructiveButtonText: {
      color: "#E53E3E",
      fontFamily: "Montserrat_700Bold",
      fontSize: 15,
    },
    buttonText: {
      textAlign: "center",
    },
  });
