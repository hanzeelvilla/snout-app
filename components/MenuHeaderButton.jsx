import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MenuIcon } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";

export default function MenuHeaderButton() {
  const { setIsMenuOpen } = useTheme();

  return (
    <Pressable
      onPress={() => setIsMenuOpen(true)}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <MenuIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingRight: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
