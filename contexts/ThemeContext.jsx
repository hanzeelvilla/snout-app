import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { themes } from "../styles/themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeNameState] = useState("themeOriginal");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("userTheme").then((savedTheme) => {
      if (savedTheme && themes[savedTheme]) {
        setThemeNameState(savedTheme);
      }
    });
  }, []);

  const setThemeName = async (name) => {
    if (themes[name]) {
      setThemeNameState(name);
      await SecureStore.setItemAsync("userTheme", name);
    }
  };

  const theme = themes[themeName] || themes.themeOriginal;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setThemeName,
        themes,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
