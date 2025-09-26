import { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { ErrorIcon } from "./Icons";

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
  const [error, setError] = useState(null);

  const handleBlur = (value) => {
    const validationResult = validatorFn ? validatorFn(value) : null;
    setError(validationResult);
  };

  const multilineStyle = multiline ? { height: 85 } : {};

  return (
    <>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, multilineStyle]}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        onChangeText={onChange}
        onBlur={() => handleBlur(value)}
        value={value}
        placeholder={placeholder || ""}
        editable={editable}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onFocus={onFocus}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <ErrorIcon />
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  error: {
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
    height: 36,
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
