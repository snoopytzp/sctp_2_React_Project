// src/contexts/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const FAKE_USERS = {
  admin: { name: "Alice Tan", role: "admin" },
  user: { name: "Bob Lim", role: "user" },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    if (password !== "password") return false;
    const user = FAKE_USERS[username];
    if (!user) return false;
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}