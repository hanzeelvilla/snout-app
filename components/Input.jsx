import { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { ErrorIcon } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";

export default function Input({
  value,
  label,
  keyboardType = "default",
  validatorFn,
  onChange,
  secureText = false,
  placeholder,
  editable = true,
  numberOfLines = 1,
  multiline = false,
  labelColor = "#000",
  onFocus,
}) {
  const { theme } = useTheme();
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const validationResult = validatorFn ? validatorFn(value) : null;
    setError(validationResult);
  };

  const isDarkTheme = labelColor === "#fff";

  const customInputStyle = {
    backgroundColor: isDarkTheme ? "rgba(255, 255, 255, 0.08)" : "#fff",
    color: isDarkTheme ? "#fff" : "#1F2937",
    borderColor: error
      ? "#EF4444"
      : isFocused
        ? isDarkTheme
          ? theme.selectedColor
          : theme.buttonColor
        : isDarkTheme
          ? "rgba(255, 255, 255, 0.15)"
          : "#D1D5DB",
    height: multiline ? 90 : 48,
    paddingVertical: multiline ? 12 : 0,
    textAlignVertical: multiline ? "top" : "center",
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, customInputStyle]}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        onChangeText={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        placeholder={placeholder || ""}
        placeholderTextColor={
          isDarkTheme ? "rgba(255, 255, 255, 0.4)" : "#9CA3AF"
        }
        editable={editable}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <ErrorIcon size={16} color="#EF4444" />
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 6,
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginLeft: 6,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    borderWidth: 1.5,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
});
