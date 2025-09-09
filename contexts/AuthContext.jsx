import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("userSession").then((session) => {
      if (session) {
        const parsed = JSON.parse(session);
        setUserToken(parsed.token);
        setUserInfo(parsed.user);
      }
      setLoading(false);
    });
  }, []);

  const signIn = async (session) => {
    await SecureStore.setItemAsync("userSession", JSON.stringify(session));
    setUserToken(session.token);
    setUserInfo(session.user);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userSession");
    setUserToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userInfo, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
