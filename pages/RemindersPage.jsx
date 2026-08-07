import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemedStyles } from "../hooks/useThemedStyles";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import useReminders from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";
import Loader from "../components/Loader";
import { useEffect, useState, useRef } from "react";
import { useAlert } from "../contexts/AlertContext";

function RecordatoriosPage() {
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const styles = useThemedStyles(createStyles);
  const { isPending, isError, data, error, refetch, isFetching } =
    useReminders();
  const alertShown = useRef(false);

  // Modal Visibility State
  const [modalVisible, setModalVisible] = useState(false);

  // Temporary States inside Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "upcoming" | "past"
  const [sortBy, setSortBy] = useState("soonest"); // "soonest" | "farthest" | "alphabetical"

  // Applied States
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [appliedStatusFilter, setAppliedStatusFilter] = useState("all");
  const [appliedSortBy, setAppliedSortBy] = useState("soonest");

  useEffect(() => {
    if (isError) {
      if (!alertShown.current) {
        showAlert({
          title: "Error de Conexión",
          message:
            error?.message || "Hubo un error al conectarse con el servidor.",
          type: "danger",
          buttons: [
            { text: "Reintentar", onPress: () => refetch() },
            { text: "Cerrar", style: "cancel" },
          ],
        });
        alertShown.current = true;
      }
    } else {
      alertShown.current = false;
    }
  }, [isError, error, refetch, showAlert]);

  const handleApplyFilters = () => {
    setAppliedSearchQuery(searchQuery);
    setAppliedStatusFilter(statusFilter);
    setAppliedSortBy(sortBy);
    setModalVisible(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("soonest");
    setAppliedSearchQuery("");
    setAppliedStatusFilter("all");
    setAppliedSortBy("soonest");
    setModalVisible(false);
  };

  const handleOpenFilters = () => {
    setSearchQuery(appliedSearchQuery);
    setStatusFilter(appliedStatusFilter);
    setSortBy(appliedSortBy);
    setModalVisible(true);
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError && !data) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.errorContent}>
          <MaterialCommunityIcons
            name="cloud-off-outline"
            size={60}
            color="#E53E3E"
          />
          <Text style={styles.errorText}>
            No se pudieron cargar los recordatorios.
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              alertShown.current = false;
              refetch();
            }}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Filter and sort data in memory
  const filteredData = Array.isArray(data)
    ? data
        .filter((reminder) => {
          // Search query filter
          if (appliedSearchQuery.trim() !== "") {
            const query = appliedSearchQuery.toLowerCase();
            const matchesTitle = reminder.title?.toLowerCase().includes(query);
            const matchesDesc = reminder.description
              ?.toLowerCase()
              .includes(query);
            if (!matchesTitle && !matchesDesc) return false;
          }

          // Status filter (upcoming vs past)
          const now = new Date();
          const dueDate = new Date(reminder.dueDate);
          if (appliedStatusFilter === "upcoming") {
            return dueDate >= now;
          } else if (appliedStatusFilter === "past") {
            return dueDate < now;
          }
          return true;
        })
        .sort((a, b) => {
          if (appliedSortBy === "soonest") {
            return new Date(a.dueDate) - new Date(b.dueDate);
          } else if (appliedSortBy === "farthest") {
            return new Date(b.dueDate) - new Date(a.dueDate);
          } else if (appliedSortBy === "alphabetical") {
            return a.title.localeCompare(b.title);
          }
          return 0;
        })
    : [];

  const hasActiveFilters =
    appliedSearchQuery !== "" ||
    appliedStatusFilter !== "all" ||
    appliedSortBy !== "soonest";

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>Recordatorios</Text>
        <Pressable
          style={[
            styles.filterButton,
            hasActiveFilters && styles.filterButtonActive,
          ]}
          onPress={handleOpenFilters}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={hasActiveFilters ? "#fff" : theme.navigationBarColor}
          />
          {hasActiveFilters && <View style={styles.filterDot} />}
        </Pressable>
      </View>

      {/* Reminders List */}
      <View style={styles.listContainer}>
        {filteredData.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => refetch()}
                colors={[theme.buttonColor]}
                tintColor={theme.buttonColor}
              />
            }
          >
            {filteredData.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name={
                hasActiveFilters
                  ? "filter-remove-outline"
                  : "calendar-multiselect"
              }
              size={64}
              color="#CBD5E0"
            />
            <Text style={styles.emptyTitle}>
              {hasActiveFilters ? "Sin Resultados" : "Sin Recordatorios"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {hasActiveFilters
                ? "No hay recordatorios que coincidan con los filtros de búsqueda aplicados."
                : "Crea alertas para recordar vacunas, citas o comidas de tu mascota."}
            </Text>
            {hasActiveFilters ? (
              <Pressable
                style={styles.createButton}
                onPress={handleClearFilters}
              >
                <Text style={styles.createButtonText}>Limpiar Filtros</Text>
              </Pressable>
            ) : (
              <Link href={"/(reminders)/agregar-reminder"} asChild>
                <Pressable style={styles.createButton}>
                  <Text style={styles.createButtonText}>
                    Crear Recordatorio
                  </Text>
                </Pressable>
              </Link>
            )}
          </View>
        )}
      </View>

      {/* Filter Modal */}
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
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar y Ordenar</Text>
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

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}
            >
              {/* Search input */}
              <Text style={styles.sectionLabel}>Buscar</Text>
              <View style={styles.searchBarContainer}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color="#A0AEC0"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar por título o descripción..."
                  placeholderTextColor="#A0AEC0"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery !== "" && (
                  <Pressable
                    onPress={() => setSearchQuery("")}
                    style={styles.clearSearchBtn}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={16}
                      color="#A0AEC0"
                    />
                  </Pressable>
                )}
              </View>

              {/* Status Section */}
              <Text style={styles.sectionLabel}>Estado del Recordatorio</Text>
              <View style={styles.chipContainer}>
                {[
                  { key: "all", label: "Todos" },
                  { key: "upcoming", label: "Próximos" },
                  { key: "past", label: "Vencidos" },
                ].map((item) => {
                  const isActive = statusFilter === item.key;
                  return (
                    <Pressable
                      key={item.key}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => setStatusFilter(item.key)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Sorting Section */}
              <Text style={styles.sectionLabel}>Ordenar por</Text>
              <View style={styles.chipContainer}>
                {[
                  { key: "soonest", label: "Próximos" },
                  { key: "farthest", label: "Lejanos" },
                  { key: "alphabetical", label: "A - Z" },
                ].map((item) => {
                  const isActive = sortBy === item.key;
                  return (
                    <Pressable
                      key={item.key}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => setSortBy(item.key)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <Pressable
                style={styles.resetButton}
                onPress={handleClearFilters}
              >
                <Text style={styles.resetButtonText}>Limpiar</Text>
              </Pressable>
              <Pressable
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button (FAB) */}
      <Link href={"/(reminders)/agregar-reminder"} asChild>
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
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 16,
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
    },
    filterButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      position: "relative",
    },
    filterButtonActive: {
      backgroundColor: theme.buttonColor,
    },
    filterDot: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#EF4444",
      borderWidth: 1,
      borderColor: "#fff",
    },
    listContainer: {
      flex: 1,
      width: "100%",
    },
    scrollContent: {
      paddingTop: 4,
      paddingBottom: 90, // Leave space for FAB
    },
    errorContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    errorText: {
      fontSize: 16,
      fontFamily: "Montserrat_500Medium",
      color: "#4A5568",
      marginTop: 16,
      textAlign: "center",
      marginBottom: 24,
    },
    retryButton: {
      backgroundColor: theme.buttonColor,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 12,
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    retryButtonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat_700Bold",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
      paddingBottom: 80,
    },
    emptyTitle: {
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      color: theme.navigationBarColor,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
      color: "#718096",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 24,
    },
    createButton: {
      backgroundColor: theme.buttonColor,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 14,
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
    },
    createButtonText: {
      color: "#fff",
      fontSize: 15,
      fontFamily: "Montserrat_700Bold",
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

    // Modal Styles
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
      maxHeight: "85%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 10,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      color: "#1A202C",
    },
    closeButton: {
      padding: 4,
    },
    modalScroll: {
      marginBottom: 24,
    },
    sectionLabel: {
      fontSize: 14,
      fontFamily: "Montserrat_600SemiBold",
      color: "#4A5568",
      marginBottom: 10,
      marginTop: 8,
    },
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F7FAFC",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#E2E8F0",
      paddingHorizontal: 12,
      height: 48,
      marginBottom: 20,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: "100%",
      fontSize: 15,
      fontFamily: "Montserrat_500Medium",
      color: "#1A202C",
    },
    clearSearchBtn: {
      padding: 4,
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    chip: {
      backgroundColor: "#F7FAFC",
      borderWidth: 1.5,
      borderColor: "#E2E8F0",
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    chipActive: {
      backgroundColor: theme.buttonColor,
      borderColor: theme.buttonColor,
    },
    chipText: {
      fontSize: 13,
      fontFamily: "Montserrat_500Medium",
      color: "#4A5568",
    },
    chipTextActive: {
      color: "#fff",
      fontFamily: "Montserrat_700Bold",
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    resetButton: {
      flex: 1,
      height: 48,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#CBD5E0",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    resetButtonText: {
      fontSize: 15,
      fontFamily: "Montserrat_700Bold",
      color: "#718096",
    },
    applyButton: {
      flex: 2,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.buttonColor,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.buttonColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    applyButtonText: {
      fontSize: 15,
      fontFamily: "Montserrat_700Bold",
      color: "#fff",
    },
  });

export default RecordatoriosPage;
