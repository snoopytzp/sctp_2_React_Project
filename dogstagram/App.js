// App.js
import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import TabNavigator from "./navigation/TabNavigator";
import AuthStackNavigator from "./navigation/AuthStackNavigator";
import LoadingOverlay from "./components/LoadingOverlay";

function NavigationApp() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <TabNavigator /> : <AuthStackNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <NavigationApp />
      </NavigationContainer>
    </AuthProvider>
  );
}