// App.js
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthContext, { AuthProvider } from "./contexts/AuthContext";
import AppStackNavigator from "./navigation/AppStackNavigator";
import AuthStackNavigator from "./navigation/AuthStackNavigator";

function NavigationApp() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationApp />
    </AuthProvider>
  );
}