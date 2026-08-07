import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75 > 300 ? 300 : width * 0.75;

export default function HamburgerMenu() {
  const { isMenuOpen, setIsMenuOpen, theme, themeName, setThemeName } =
    useTheme();
  const { signOut, userInfo } = useAuth();
  const router = useRouter();

  const [slideAnim] = useState(() => new Animated.Value(DRAWER_WIDTH));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (isMenuOpen) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMenuOpen, slideAnim, fadeAnim]);

  const closeMenu = () => {
    // Animate out, then close modal
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsMenuOpen(false);
    });
  };

  const handleNavigate = (path) => {
    closeMenu();
    // Use setTimeout to ensure transition starts after drawer hides
    setTimeout(() => {
      router.push(path);
    }, 150);
  };

  const handleSignOut = () => {
    closeMenu();
    setTimeout(() => {
      signOut();
    }, 150);
  };

  const themeOptions = [
    {
      key: "themeOriginal",
      name: "Océano (Original)",
      colors: ["#08415C", "#388697", "#EFEDF7"],
    },
    {
      key: "themeNature",
      name: "Naturaleza",
      colors: ["#2D4233", "#4A7C59", "#F4F7F2"],
    },
    {
      key: "themeSunset",
      name: "Atardecer",
      colors: ["#3D405B", "#E07A5F", "#FFF5F0"],
    },
    {
      key: "themeBerry",
      name: "Lavanda",
      colors: ["#38294F", "#8367C7", "#F7F5FA"],
    },
  ];

  return (
    <Modal
      transparent
      visible={isMenuOpen}
      animationType="none"
      onRequestClose={closeMenu}
    >
      <View style={styles.overlay}>
        {/* Backdrop press closes the menu */}
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Drawer container */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
              backgroundColor: theme.backgroundColor,
            },
          ]}
        >
          {/* User Profile Header */}
          <View
            style={[
              styles.drawerHeader,
              { backgroundColor: theme.navigationBarColor },
            ]}
          >
            <MaterialCommunityIcons
              name="account-circle"
              size={48}
              color="#fff"
            />
            <View style={styles.headerInfo}>
              <Text style={styles.usernameText}>
                {userInfo?.username || "Usuario Snout"}
              </Text>
              <Text style={styles.emailText}>
                {userInfo?.email || "usuario@snout.com"}
              </Text>
            </View>
          </View>

          {/* Navigation Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Navegación</Text>

            <Pressable
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
              onPress={() => handleNavigate("/(tabs)")}
            >
              <MaterialCommunityIcons
                name="home-outline"
                size={22}
                color={theme.navigationBarColor}
              />
              <Text
                style={[styles.navText, { color: theme.navigationBarColor }]}
              >
                Inicio
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
              onPress={() => handleNavigate("/(tabs)/mascotas")}
            >
              <MaterialCommunityIcons
                name="dog"
                size={22}
                color={theme.navigationBarColor}
              />
              <Text
                style={[styles.navText, { color: theme.navigationBarColor }]}
              >
                Mis Mascotas
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.navItemPressed,
              ]}
              onPress={() => handleNavigate("/(tabs)/reminders")}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={22}
                color={theme.navigationBarColor}
              />
              <Text
                style={[styles.navText, { color: theme.navigationBarColor }]}
              >
                Recordatorios
              </Text>
            </Pressable>
          </View>

          {/* Theme Selector Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Temas</Text>
            {themeOptions.map((opt) => {
              const isSelected = themeName === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  style={[
                    styles.themeItem,
                    isSelected && {
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      borderColor: theme.selectedColor,
                    },
                  ]}
                  onPress={() => setThemeName(opt.key)}
                >
                  <View style={styles.themeInfo}>
                    <Text
                      style={[
                        styles.themeNameText,
                        { color: theme.navigationBarColor },
                        isSelected && { fontFamily: "Montserrat_700Bold" },
                      ]}
                    >
                      {opt.name}
                    </Text>

                    {/* Color Swatch Circle Previews */}
                    <View style={styles.swatchContainer}>
                      {opt.colors.map((color, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.swatchCircle,
                            { backgroundColor: color },
                          ]}
                        />
                      ))}
                    </View>
                  </View>

                  {isSelected && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={theme.selectedColor}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Bottom Actions (Sign Out) */}
          <View style={[styles.bottomSection, { borderTopColor: "#E2E8F0" }]}>
            <Pressable
              style={({ pressed }) => [
                styles.signOutButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleSignOut}
            >
              <MaterialCommunityIcons name="logout" size={20} color="#E53E3E" />
              <Text style={styles.signOutText}>Cerrar Sesión</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 16,
    paddingBottom: 30,
  },
  drawerHeader: {
    padding: 24,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    marginLeft: 14,
    flex: 1,
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  emailText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Montserrat_700Bold",
    color: "#A0AEC0",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  navItemPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  navText: {
    fontSize: 15,
    fontFamily: "Montserrat_500Medium",
    marginLeft: 14,
  },
  themeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
    marginBottom: 6,
  },
  themeInfo: {
    flexDirection: "column",
    flex: 1,
  },
  themeNameText: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },
  swatchContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  swatchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  bottomSection: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  signOutText: {
    color: "#E53E3E",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 14,
  },
});
