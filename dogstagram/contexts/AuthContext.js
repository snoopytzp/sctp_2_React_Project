// contexts/AuthContext.js
import { createContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    // Call your API here in a real app.
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const biometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) return false;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Biometrics",
    });
    if (result.success) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, biometricLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
