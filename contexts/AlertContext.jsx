import { createContext, useContext, useState, useCallback } from "react";
import CustomAlert from "../components/CustomAlert";

const AlertContext = createContext({
  showAlert: () => {},
  hideAlert: () => {},
});

export function AlertProvider({ children }) {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info",
    buttons: [],
  });

  const showAlert = useCallback(
    ({ title, message, type = "info", buttons = [] }) => {
      setAlertConfig({
        visible: true,
        title,
        message,
        type,
        buttons,
      });
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={alertConfig.buttons}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe utilizarse dentro de un AlertProvider");
  }
  return context;
}

export default AlertContext;
