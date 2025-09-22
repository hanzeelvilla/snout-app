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
}) {
  const [error, setError] = useState(null);

  const handleBlur = (value) => {
    const validationResult = validatorFn ? validatorFn(value) : null;
    setError(validationResult);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        onChangeText={onChange}
        onBlur={() => handleBlur(value)}
        value={value}
      />
      {error ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
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
    color: "#fff",
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
});
